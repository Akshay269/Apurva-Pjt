import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
}

// Fade In Animation
export const FadeIn = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  margin = "0px 0px -100px 0px"
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

// Slide Up Animation
export const SlideUp = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  margin = "0px 0px -100px 0px"
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 60
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Slide In from Left
export const SlideInLeft = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  margin = "0px 0px -100px 0px"
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: -60 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : -60
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Slide In from Right
export const SlideInRight = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  margin = "0px 0px -100px 0px"
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: 60 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : 60
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Scale In Animation
export const ScaleIn = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  margin = "0px 0px -100px 0px"
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container for animating children in sequence
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  margin?: string;
}

export const StaggerContainer = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  threshold = 0.1,
  margin = "0px 0px -100px 0px"
}: StaggerContainerProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold, margin });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item (to be used inside StaggerContainer)
export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Parallax Component
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export const Parallax = ({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up'
}: ParallaxProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: isInView ? (direction === 'up' ? -speed * 100 : speed * 100) : 0
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
