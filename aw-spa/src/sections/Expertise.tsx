import expertise from "/assets/images/expertise.png";
import { StaggerContainer, StaggerItem } from "../components/ScrollAnimations";
import { SwipeReveal, MagneticSwipe, SwipeTextReveal } from "../components/SwipeAnimations";

export const Expertise = () => {
  return (
    <section id="expertise" className="section">
      <div className="container grid grid--2">
        <SwipeReveal direction="left" className="expertise__image" delay={0.2} duration={1.2}>
          <MagneticSwipe strength={0.2}>
            <img src={expertise} alt="Expertise visual" />
          </MagneticSwipe>
        </SwipeReveal>
        
        <SwipeReveal direction="right" className="prose expertise__content" duration={1.2}>
          <StaggerContainer staggerDelay={0.15}>
            <StaggerItem>
              <SwipeTextReveal text="Our Expertise" className="h2" />
              <p>Design is our language. Execution is our promise.</p>
            </StaggerItem>

            <StaggerItem>
              <div className="feature">
                <h3>Visualize Before You Build</h3>
                <p>
                  Stunning 3D renders & facade concepts that help you see the
                  future.
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="feature">
                <h3>Architecture that Breathes</h3>
                <p>
                  Thoughtfully planned spaces — from urban homes to countryside
                  retreats.
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="feature">
                <h3>Design. Build. Deliver.</h3>
                <p>End‑to‑end turnkey solutions tailored to your vision.</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="feature">
                <h3>Interiors with Intent</h3>
                <p>Spaces that don't just look good — they feel right.</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="feature">
                <h3>Collaboration with Purpose</h3>
                <p>
                  Working closely with clients to co‑create, not just deliver.
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
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
            </StaggerItem>
          </StaggerContainer>
        </SwipeReveal>
      </div>
    </section>
  );
};
