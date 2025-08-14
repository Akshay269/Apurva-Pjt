//import Animated Text
import TypingText from "../components/TypingText";

export const Intro = () => {
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
          <source src="/src/assets/videos/Hero.mp4" type="video/mp4" />
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
    </section>
  );
};
