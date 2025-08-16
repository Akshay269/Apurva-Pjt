import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface RocketSwipeAnimationProps {
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export const RocketSwipeAnimation = ({ 
  className = '', 
  delay = 0,
  triggerOnScroll = true 
}: RocketSwipeAnimationProps) => {
  const [showRocket, setShowRocket] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showSwipeText, setShowSwipeText] = useState(false);
  const { ref, isInView } = useScrollAnimation();
  
  const rocketControls = useAnimation();
  const explosionControls = useAnimation();

  useEffect(() => {
    if ((triggerOnScroll && isInView) || !triggerOnScroll) {
      const startAnimation = async () => {
        // Wait for delay
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
        
        // Show rocket
        setShowRocket(true);
        
        // Animate rocket from bottom to center
        await rocketControls.start({
          y: [-100, -250],
          scale: [0.5, 1, 1.2],
          rotate: [0, -5, 5, 0],
          transition: { duration: 1.5, ease: "easeOut" }
        });

        // Trigger explosion effect
        setShowExplosion(true);
        await explosionControls.start({
          scale: [0, 2, 0],
          opacity: [0, 1, 0],
          transition: { duration: 0.8, ease: "easeOut" }
        });

        // Hide rocket and show SWIPE text
        setShowRocket(false);
        setShowSwipeText(true);
      };

      startAnimation();
    }
  }, [isInView, triggerOnScroll, delay, rocketControls, explosionControls]);

  const swipeLetters = ['S', 'W', 'I', 'P', 'E'];

  return (
    <div 
      ref={triggerOnScroll ? ref : null}
      className={`rocket-swipe-container ${className}`}
    >
      <AnimatePresence>
        {/* Rocket */}
        {showRocket && (
          <motion.div
            className="rocket"
            animate={rocketControls}
            initial={{ y: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="rocket-body">
              🚀
            </div>
            {/* Rocket trail */}
            <motion.div
              className="rocket-trail"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        )}

        {/* Explosion Effect */}
        {showExplosion && (
          <motion.div
            className="explosion"
            animate={explosionControls}
            initial={{ scale: 0, opacity: 0 }}
          >
            {/* Explosion particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="explosion-particle"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(i * 45 * Math.PI / 180) * 60,
                  y: Math.sin(i * 45 * Math.PI / 180) * 60,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}

        {/* SWIPE Text */}
        {showSwipeText && (
          <motion.div
            className="swipe-text-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {swipeLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="swipe-letter"
                initial={{ 
                  opacity: 0, 
                  scale: 0, 
                  rotateY: 180,
                  y: 50
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  y: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "backOut",
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.2,
                  rotateY: 360,
                  color: "#ff4444",
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive hint */}
      {showSwipeText && (
        <motion.div
          className="swipe-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            className="swipe-arrow"
            animate={{
              x: [-10, 10, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ← Swipe to explore →
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Manual trigger version for demos
export const RocketSwipeDemo = ({ className = '' }: { className?: string }) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <div className={`rocket-demo ${className}`}>
      <button 
        className="demo-button"
        onClick={() => {
          setTrigger(false);
          setTimeout(() => setTrigger(true), 100);
        }}
      >
        🚀 Launch Rocket
      </button>
      
      {trigger && (
        <RocketSwipeAnimation 
          triggerOnScroll={false}
          delay={0.5}
        />
      )}
    </div>
  );
};
