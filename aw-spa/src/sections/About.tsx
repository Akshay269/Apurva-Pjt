import about from "/assets/images/about.png";
import { SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from "../components/ScrollAnimations";
import { SwipeReveal, SwipeTextReveal, MagneticSwipe } from "../components/SwipeAnimations";

export const About = () => {
  return (
    <section id="about" className="section section--light">
      <div className="container grid grid--2">
        <SwipeReveal direction="left" className="prose about__content" duration={1.2}>
          <StaggerContainer staggerDelay={0.2}>
            <StaggerItem>
              <SwipeTextReveal text="About Us" className="h2" />
            </StaggerItem>
            <StaggerItem>
              <p>
                I'm Ar. Apurva Wasule, founder of AW Designers — a studio built on a
                single vision: turning ideas into impactful spaces and visuals. With
                3+ years of experience and over 50 completed projects in 3D
                visualization and façade designing, I combine architectural
                precision with visual storytelling to shape spaces that resonate.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                At AW Designers, we craft thoughtful, functional designs that
                respond to context and client aspirations. Under this umbrella, AW
                Renders brings those designs to life through high‑end 3D
                visualization — translating concepts into compelling, photorealistic
                experiences.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Together, both reflect my belief that good design isn't just seen —
                it's felt.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </SwipeReveal>
        
        <SwipeReveal direction="right" className="about__image" delay={0.4} duration={1.2}>
          <MagneticSwipe strength={0.15}>
            <img src={about} alt="Studio / project collage" />
          </MagneticSwipe>
        </SwipeReveal>
      </div>
    </section>
  );
};
