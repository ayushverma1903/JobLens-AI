"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const pts = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 12;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function FloatingParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
