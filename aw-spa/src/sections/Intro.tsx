//import Animated Text
import TypingText from "../components/TypingText";
import herovideo from "/assets/videos/Hero.mp4";
import { useEffect, useState } from "react";
import { SwipeHint } from "../components/SwipeHint";

export const Intro = () => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const dismiss = () => setShowHint(false);
    const t = window.setTimeout(dismiss, 4000);
    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("touchstart", dismiss, { passive: true });
    window.addEventListener("wheel", dismiss, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", dismiss as any);
      window.removeEventListener("touchstart", dismiss as any);
      window.removeEventListener("wheel", dismiss as any);
    };
  }, []);

  return (
    <section
      id="intro"
      className="section section--hero"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src={herovideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero__overlay" />
      <div className="container hero__content">
        <h1 className="hero__title">A.W Designers</h1>

        <TypingText texts={["Envision", "Design", "Build"]} speed={100} />

        <a href="#work" className="btn--dark">
          See Work
        </a>
      </div>
      <SwipeHint
        direction="up-down"
        text="Swipe to explore"
        className="swipe-hint--hero"
        visible={showHint}
      />
    </section>
  );
};
