"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 8;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sphere, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#6366f1"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </points>
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none mix-blend-screen dark:mix-blend-lighten opacity-60">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <ParticleSwarm />
        </Float>
      </Canvas>
    </div>
  );
}
