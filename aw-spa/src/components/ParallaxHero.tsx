import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FadeIn, SlideUp } from './ScrollAnimations';
import TypingText from './TypingText';

interface ParallaxHeroProps {
  videoSrc: string;
}

export const ParallaxHero = ({ videoSrc }: ParallaxHeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Create parallax transformations
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="section section--hero"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <motion.div 
        className="hero__media"
        style={{ y, scale }}
      >
        <motion.video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          style={{ opacity }}
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
      </motion.div>
      
      <div className="hero__overlay" />
      
      <motion.div 
        className="container hero__content"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
      >
        <FadeIn duration={1} delay={0.3}>
          <motion.h1 
            className="hero__title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            A.W Designers
          </motion.h1>
        </FadeIn>
        
        <SlideUp duration={1} delay={0.8}>
          <TypingText texts={["Envision", "Design", "Build"]} speed={100} />
        </SlideUp>
        
        {/* Floating animation elements */}
        <motion.div
          className="hero-decoration"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '100px',
            height: '100px',
            background: 'rgba(108, 139, 253, 0.1)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            zIndex: -1
          }}
        />
        
        <motion.div
          className="hero-decoration"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '15%',
            width: '80px',
            height: '80px',
            background: 'rgba(156, 108, 251, 0.15)',
            borderRadius: '50%',
            filter: 'blur(15px)',
            zIndex: -1
          }}
        />
      </motion.div>
    </section>
  );
};
