import { useEffect, useRef, useState } from "react";
import expertise from "/assets/images/expertise.png";

export const Expertise = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="expertise" className="section">
      <div className="container grid grid--2">
        <div className="expertise__image">
          <img src={expertise} alt="Expertise visual" />
        </div>
        <div
          ref={contentRef}
          className={`prose expertise__content ${visible ? "is-visible" : ""}`}
        >
          <div>
            <h2>Our Expertise</h2>
            <p>Design is our language. Execution is our promise.</p>

            <div className="feature">
              <h3>Visualize Before You Build</h3>
              <p>
                Stunning 3D renders & facade concepts that help you see the
                future.
              </p>
            </div>
            <div className="feature">
              <h3>Architecture that Breathes</h3>
              <p>
                Thoughtfully planned spaces — from urban homes to countryside
                retreats.
              </p>
            </div>
            <div className="feature">
              <h3>Design. Build. Deliver.</h3>
              <p>End‑to‑end turnkey solutions tailored to your vision.</p>
            </div>
            <div className="feature">
              <h3>Interiors with Intent</h3>
              <p>Spaces that don’t just look good — they feel right.</p>
            </div>
            <div className="feature">
              <h3>Collaboration with Purpose</h3>
              <p>
                Working closely with clients to co‑create, not just deliver.
              </p>
            </div>
          </div>
          <div style={{ marginTop: "85px" }}>
            <h2>Our Vision</h2>
            <p>
              To craft spaces that speak, visuals that breathe, and designs that
              connect.
            </p>
            <div className="feature">
              <p>
                At AW Designers, we turn imagination into built reality — one
                thoughtful detail at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
