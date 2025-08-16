import { useEffect, useMemo, useRef, useState } from "react";

export const ScrollCube = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [useSwipe, setUseSwipe] = useState(false);
  const autoRotateRAFRef = useRef<number | null>(null);
  const autoRotateStartTimestampRef = useRef<number | null>(null);
  const isAutoRotateActiveRef = useRef(false);
  const hasAutoRotatePlayedRef = useRef(false);
  const AUTO_ROTATE_DURATION_MS = 5000;

  const steps = useMemo(
    () => [
      "Concept to reality",
      "Architecture that breathes",
      "Interiors with intent",
      "Visualize before you build",
      "Design. Build. Deliver.",
      "Collaboration with purpose",
    ],
    []
  );

  // Decide when to prefer swipe (mobile)
  useEffect(() => {
    const check = () => setUseSwipe(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Start a 5s auto-rotate and block page scroll while active
  const startAutoRotate = () => {
    const cube = cubeRef.current;
    if (!cube) return;
    if (isAutoRotateActiveRef.current) return;
    isAutoRotateActiveRef.current = true;
    hasAutoRotatePlayedRef.current = true;
    autoRotateStartTimestampRef.current = null;

    const animate = (timestamp: number) => {
      if (autoRotateStartTimestampRef.current == null) {
        autoRotateStartTimestampRef.current = timestamp;
      }
      const elapsedMs = timestamp - autoRotateStartTimestampRef.current;
      const clampedMs = Math.min(elapsedMs, AUTO_ROTATE_DURATION_MS);
      const progress = clampedMs / AUTO_ROTATE_DURATION_MS;
      const angleY = 720 * progress; // two full spins over 5s
      const angleX = 432 * progress; // 1.2 spins for depth
      cube.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;

      if (elapsedMs < AUTO_ROTATE_DURATION_MS) {
        autoRotateRAFRef.current = requestAnimationFrame(animate);
      } else {
        isAutoRotateActiveRef.current = false;
        autoRotateRAFRef.current = null;
      }
    };

    autoRotateRAFRef.current = requestAnimationFrame(animate);
  };

  // Intercept scroll gestures on the section: block page scroll and run auto-rotate once
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      if (!hasAutoRotatePlayedRef.current || isAutoRotateActiveRef.current) {
        e.preventDefault();
      }
      if (!hasAutoRotatePlayedRef.current && !isAutoRotateActiveRef.current) {
        startAutoRotate();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!hasAutoRotatePlayedRef.current || isAutoRotateActiveRef.current) {
        e.preventDefault();
      }
      if (!hasAutoRotatePlayedRef.current && !isAutoRotateActiveRef.current) {
        startAutoRotate();
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Cancel any pending rAF on unmount
  useEffect(() => {
    return () => {
      if (autoRotateRAFRef.current != null) {
        cancelAnimationFrame(autoRotateRAFRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (useSwipe) return;
    const onScroll = () => {
      const section = sectionRef.current;
      const cube = cubeRef.current;
      if (!section || !cube) return;
      if (isAutoRotateActiveRef.current) return; // do not override while auto-rotating

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewH - rect.top) / rect.height)
      );
      const rotation = progress * 360;
      cube.style.transform = `rotateX(${rotation * 0.6}deg) rotateY(${rotation}deg)`;

      const idx = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(progress * steps.length))
      );
      setStepIndex(idx);
    };

    onScroll();
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        onScroll();
      });
    };

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [steps, useSwipe]);

  // Mobile: rotate by swipe steps
  useEffect(() => {
    if (!useSwipe) return;
    const cube = cubeRef.current;
    const scene = sceneRef.current;
    if (!cube || !scene) return;

    // apply rotation for current step
    const applyRotation = (idx: number) => {
      const rotation = (idx / steps.length) * 360;
      cube.style.transform = `rotateX(${rotation * 0.6}deg) rotateY(${rotation}deg)`;
    };
    applyRotation(stepIndex);

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onPointerDown = (e: PointerEvent) => {
      tracking = true;
      startX = e.clientX;
      startY = e.clientY;
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
        // horizontal swipe
        setStepIndex((idx) => {
          const next = Math.min(
            steps.length - 1,
            Math.max(0, idx + (dx < 0 ? 1 : -1))
          );
          applyRotation(next);
          return next;
        });
      }
      try {
        (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore errors
      }
    };

    scene.addEventListener("pointerdown", onPointerDown);
    scene.addEventListener("pointerup", onPointerUp);

    return () => {
      scene.removeEventListener("pointerdown", onPointerDown);
      scene.removeEventListener("pointerup", onPointerUp);
    };
  }, [useSwipe, stepIndex, steps.length]);
  return (
    <section id="scroll-cube" className="section scroll-cube" ref={sectionRef}>
      <div className="scroll-cube__sticky">
        <div className="cube-scene" ref={sceneRef}>
          <div className="cube" ref={cubeRef}>
            <div className="face face--front" />
            <div className="face face--back" />
            <div className="face face--right" />
            <div className="face face--left" />
            <div className="face face--top" />
            <div className="face face--bottom" />
          </div>
        </div>
      </div>
    </section>
  );
};
