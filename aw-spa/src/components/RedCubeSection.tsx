import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface RedCubeSectionProps {
  onRotationComplete?: () => void;
}

export const RedCubeSection = ({ onRotationComplete }: RedCubeSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInSection, setIsInSection] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [allowScroll, setAllowScroll] = useState(false);

  // Use scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  

  // Scale and glow effect based on progres
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.8]);

  // Track section visibility and rotation completion
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionInView = rect.top < windowHeight && rect.bottom > 0;
      
      setIsInSection(sectionInView);
      
      // Calculate rotation progress (0 to 1)
      const progress = Math.max(0, Math.min(1, scrollYProgress.get()));
      setRotationProgress(progress);
      
      // Allow scroll to continue after 95% completion
      if (progress >= 0.95 && !allowScroll) {
        setAllowScroll(true);
        onRotationComplete?.();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYProgress, allowScroll, onRotationComplete]);

  // Prevent body scroll when in cube section and rotation not complete
  useEffect(() => {
    if (isInSection && !allowScroll && rotationProgress < 0.95) {
      // Temporarily lock scroll position to force interaction with cube
      const preventScroll = (e: WheelEvent) => {
        if (rotationProgress < 0.95) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('wheel', preventScroll, { passive: false });
      return () => document.removeEventListener('wheel', preventScroll);
    }
  }, [isInSection, allowScroll, rotationProgress]);

  return (
    <section 
      ref={sectionRef}
      id="cube-section"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff4444 0%, #ee3333 50%, #ff5555 100%)',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        position: 'relative',
zIndex: 1
      }}
    >
      {/* Background effects */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, rgba(255, 68, 68, ${glowIntensity.get() * 0.1}) 0%, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Title and CTA text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isInSection ? 1 : 0, y: isInSection ? 0 : -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            position: 'absolute',
            top: '20%',
            left: '10%',
            right: '10%',
            zIndex: 10
          }}
        >
          <h1 
            style={{ 
              fontSize: '90px',
              fontWeight: 800,
              color: '#fff',
              lineHeight: '0.9',
              marginBottom: '20px',
              textAlign: 'left'
            }}
          >
            Ready to start?
          </h1>
        </motion.div>

        {/* 3D Cube - TRUE 3D with proper depth */}
        <motion.div
          style={{
            position: 'absolute',
            top: '40%',
            right: '20%',
            transform: 'translateY(-50%)',
            perspective: '1500px',
            perspectiveOrigin: 'center center'
          }}
        >
          <motion.div
            style={{
              width: '250px',
              height: '250px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center center',
              rotateX: 15, // Initial tilt to show 3D
              rotateY: -25, // Initial rotation to show depth
            }}
            animate={{
              rotateX: [15, 375, 375, 375],
              rotateY: [-25, -25, 335, 335],
              rotateZ: [0, 0, 0, 360],
              scale: [0.8, 1.1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {/* Front face */}
            <div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                backgroundColor: '#1a1a1a',
                border: '3px solid #000',
                transform: 'translateZ(125px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#ffffff',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              EXPERIENCE
            </div>
            
            {/* Back face */}
            <div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                backgroundColor: '#2a2a2a',
                border: '3px solid #000',
                transform: 'rotateY(180deg) translateZ(125px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                color: '#ffffff',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              DESIGN
            </div>
            
            {/* Right face */}
            <div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                backgroundColor: '#333333',
                border: '3px solid #000',
                transform: 'rotateY(90deg) translateZ(125px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#ffffff',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              CREATIVE
            </div>
            
            {/* Left face */}
            <div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                backgroundColor: '#111111',
                border: '3px solid #000',
                transform: 'rotateY(-90deg) translateZ(125px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              STUDIO
            </div>
            
            {/* Top face */}
            <div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                backgroundColor: '#444444',
                border: '3px solid #000',
                transform: 'rotateX(90deg) translateZ(125px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: '#ffffff',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              INNOVATION
            </div>
            
            {/* Bottom face */}
            <div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                backgroundColor: '#000000',
                border: '3px solid #000',
                transform: 'rotateX(-90deg) translateZ(125px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: '#ffffff',
                fontWeight: 900,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              CUUB
            </div>
          </motion.div>
        </motion.div>


        {/* CUUB Logo - bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInSection ? 1 : 0, y: isInSection ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '10%',
            zIndex: 10
          }}
        >
    
      
        </motion.div>



        {/* Scroll hint */}
        {rotationProgress < 0.05 && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: '120px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px'
            }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ↓ Scroll to rotate ↓
          </motion.div>
        )}
      </div>
    </section>
  );
};
