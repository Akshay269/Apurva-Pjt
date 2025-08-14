import { useEffect, useRef, useState } from "react";
import about from "/assets/images/about.png";
export const About = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="about" className="section section--light">
      <div className="container grid grid--2">
        <div
          ref={contentRef}
          className={`prose about__content ${visible ? "is-visible" : ""}`}
        >
          <h2>About Us</h2>
          <p>
            I'm Ar. Apurva Wasule, founder of AW Designers — a studio built on a
            single vision: turning ideas into impactful spaces and visuals. With
            3+ years of experience and over 50 completed projects in 3D
            visualization and façade designing, I combine architectural
            precision with visual storytelling to shape spaces that resonate.
          </p>
          <p>
            At AW Designers, we craft thoughtful, functional designs that
            respond to context and client aspirations. Under this umbrella, AW
            Renders brings those designs to life through high‑end 3D
            visualization — translating concepts into compelling, photorealistic
            experiences.
          </p>
          <p>
            Together, both reflect my belief that good design isn't just seen —
            it's felt.
          </p>
        </div>
        <div className="about__image">
          <img src={about} alt="Studio / project collage" />
        </div>
      </div>
    </section>
  );
};
