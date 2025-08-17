import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { motion, useScroll, MotionValue, useSpring } from "framer-motion";

// Cube that rotates with scroll
const RedCube: React.FC<{ scrollYProgress: MotionValue<number>; scale: number }> = ({
  scrollYProgress,
  scale,
}) => {
  const meshRef = useRef<Mesh>(null);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  useFrame(() => {
    if (meshRef.current) {
      const progress = smoothProgress.get();
      meshRef.current.rotation.y = progress * Math.PI * 6;
      meshRef.current.rotation.x = progress * Math.PI * 3;
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

// Hook to detect screen size
const useResponsiveScale = () => {
  const [scale, setScale] = useState(2);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640) {
        // mobile
        setScale(1.2);
      } else if (window.innerWidth < 1024) {
        // tablet
        setScale(1.6);
      } else {
        // desktop
        setScale(2);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
};

const RedScrollCube: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useResponsiveScale();

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Overlay text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.h1
          style={{
            color: "#fff",
            fontSize: "clamp(18px, 4vw, 42px)",
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 5vw",
            lineHeight: 1.2,
          }}
        >
          We don&apos;t follow trends. We design for the next horizon.
        </motion.h1>
      </div>

      {/* Cube */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <RedCube scrollYProgress={scrollYProgress} scale={scale} />
      </Canvas>
    </div>
  );
};

export default RedScrollCube;
