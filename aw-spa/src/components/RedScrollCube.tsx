import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

// 3D Cube component
const RedCube: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollPosition.current * 0.01;
      meshRef.current.rotation.x = scrollPosition.current * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 2]} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2f1389ff" />
    </mesh>
  );
};

const RedScrollCube: React.FC = () => (
  <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#0e0e0eff", overflow: "hidden" }}>
    {/* Overlaid text */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        pointerEvents: "none", // allows mouse events to pass to canvas
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontWeight: 1000,
          fontFamily: "MyFont1",
          fontSize: "4vw",
          marginLeft: "5vw",
          lineHeight: 1.1,
          position: "relative",
          display: "inline-block",
        }}
      >
       We don’t follow trends. We design for the next horizon. <span style={{ whiteSpace: "nowrap" }}></span>
        <span
          style={{
            display: "block",
            height: 6,
            width: "100%",
            background: "#fff",
            position: "absolute",
            left: 0,
            bottom: -12,
          }}
        ></span>
      </h1>
    </div>
    {/* 3D Cube */}
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <RedCube />
    </Canvas>
  </div>
);

export default RedScrollCube;