import React, { useEffect, useMemo, useState } from "react";

export type SwipeDirection =
  | "left-right"
  | "up-down"
  | "up"
  | "down"
  | "left"
  | "right";

type SwipeHintProps = {
  direction?: SwipeDirection;
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean;
  autoHideMs?: number;
  touchOnly?: boolean;
  onDismiss?: () => void;
};

export const SwipeHint: React.FC<SwipeHintProps> = ({
  direction = "left-right",
  text = "Swipe",
  className,
  style,
  visible,
  autoHideMs = 3500,
  touchOnly = true,
  onDismiss,
}) => {
  const [internalVisible, setInternalVisible] = useState(true);
  const shouldRender = visible ?? internalVisible;

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      (navigator as any).maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    if ((touchOnly && !isTouchDevice) || visible === false) return;

    const dismiss = () => {
      if (visible === undefined) setInternalVisible(false);
      if (onDismiss) onDismiss();
    };

    const t = window.setTimeout(dismiss, autoHideMs);

    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("touchstart", dismiss, { passive: true });
    window.addEventListener("pointerdown", dismiss as any, { passive: true } as any);
    window.addEventListener("wheel", dismiss, { passive: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", dismiss as any);
      window.removeEventListener("touchstart", dismiss as any);
      window.removeEventListener("pointerdown", dismiss as any);
      window.removeEventListener("wheel", dismiss as any);
    };
  }, [autoHideMs, isTouchDevice, onDismiss, touchOnly, visible]);

  if (touchOnly && !isTouchDevice) return null;
  if (!shouldRender) return null;

  return (
    <div
      className={`swipe-hint swipe-hint--${direction} ${className || ""}`}
      style={style}
      aria-hidden="true"
    >
      <div className="swipe-hint__icon">
        <span className="swipe-hint__dot" />
        <span className="swipe-hint__chev swipe-hint__chev--left">‹</span>
        <span className="swipe-hint__chev swipe-hint__chev--right">›</span>
      </div>
      <span className="swipe-hint__label">{text}</span>
    </div>
  );
};

export default SwipeHint;