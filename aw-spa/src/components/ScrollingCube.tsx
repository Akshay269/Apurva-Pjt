import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ScrollingCubeProps {
  className?: string;
  color?: string;
  size?: number;
  position?: 'left' | 'right' | 'center';
  offset?: number;
}

export const ScrollingCube = ({ 
  className = '',
  color = '#ff4444',
  size = 60,
  position = 'right',
  offset = 100
}: ScrollingCubeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to cube position and rotation
  const y = useTransform(scrollYProgress, [0, 1], [0, 2000]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360 * 5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360 * 3]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360 * 2]);

  // Add some floating animation
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.02);
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, []);

  const floatY = Math.sin(time) * 10;
  const floatX = Math.cos(time * 0.7) * 5;

  const getPositionStyle = () => {
    const baseStyle = {
      position: 'fixed' as const,
      top: '50%',
      transform: `translateY(-50%)`,
      pointerEvents: 'none' as const,
      zIndex: 5,
    };

    switch (position) {
      case 'left':
        return { ...baseStyle, left: `${offset}px` };
      case 'right':
        return { ...baseStyle, right: `${offset}px` };
      case 'center':
        return { ...baseStyle, left: '50%', transform: 'translateX(-50%) translateY(-50%)' };
      default:
        return { ...baseStyle, right: `${offset}px` };
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`scrolling-cube-container ${className}`}
      style={getPositionStyle()}
    >
      <motion.div
        className="scrolling-cube"
        style={{
          y,
          rotateX,
          rotateY,
          rotateZ,
          x: floatX,
          width: size,
          height: size,
        }}
      >
        {/* Cube faces */}
        <div 
          className="cube-face cube-front" 
          style={{ 
            backgroundColor: color,
            width: size,
            height: size,
            transform: `translateZ(${size/2}px)`
          }} 
        />
        <div 
          className="cube-face cube-back" 
          style={{ 
            backgroundColor: color,
            width: size,
            height: size,
            transform: `rotateY(180deg) translateZ(${size/2}px)`
          }} 
        />
        <div 
          className="cube-face cube-right" 
          style={{ 
            backgroundColor: color,
            width: size,
            height: size,
            transform: `rotateY(90deg) translateZ(${size/2}px)`
          }} 
        />
        <div 
          className="cube-face cube-left" 
          style={{ 
            backgroundColor: color,
            width: size,
            height: size,
            transform: `rotateY(-90deg) translateZ(${size/2}px)`
          }} 
        />
        <div 
          className="cube-face cube-top" 
          style={{ 
            backgroundColor: color,
            width: size,
            height: size,
            transform: `rotateX(90deg) translateZ(${size/2}px)`
          }} 
        />
        <div 
          className="cube-face cube-bottom" 
          style={{ 
            backgroundColor: color,
            width: size,
            height: size,
            transform: `rotateX(-90deg) translateZ(${size/2}px)`
          }} 
        />
      </motion.div>

      {/* Shadow effect */}
      <motion.div
        className="cube-shadow"
        style={{
          y: useTransform(y, (latest) => latest + size + 20),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.6]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.4, 0.1]),
          x: floatX * 0.5,
        }}
      />

      {/* Particle trail */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="cube-particle"
          style={{
            y: useTransform(y, (latest) => latest - (i * 30) - 10),
            x: floatX * (1 - i * 0.1),
            opacity: useTransform(scrollYProgress, [0, 1], [0.8 - i * 0.15, 0.2 - i * 0.05]),
            scale: 1 - i * 0.15,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

// Multiple cubes with different properties
export const CubeCluster = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`cube-cluster ${className}`}>
      <ScrollingCube 
        color="#ff4444" 
        size={60} 
        position="right" 
        offset={80}
      />
      <ScrollingCube 
        color="#ff6666" 
        size={40} 
        position="right" 
        offset={160}
      />
      <ScrollingCube 
        color="#ff8888" 
        size={30} 
        position="left" 
        offset={120}
      />
    </div>
  );
};

// Interactive cube that responds to mouse
interface InteractiveCubeProps {
  className?: string;
}

export const InteractiveCube = ({ className = '' }: InteractiveCubeProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.1,
          y: (e.clientY - rect.top - rect.height / 2) * 0.1,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`interactive-cube-container ${className}`}
    >
      <ScrollingCube 
        color="#ff4444" 
        size={80} 
        position="center"
      />
      <motion.div
        className="interactive-overlay"
        style={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      >
        <div 
          className="magnetic-field"
          style={{
            width: '200px',
            height: '200px',
            border: '2px solid rgba(255, 68, 68, 0.3)',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </div>
  );
};
