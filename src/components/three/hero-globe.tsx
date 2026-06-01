"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlobePoints() {
  const ref = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const pts = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + (Math.random() - 0.5) * 0.1;
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1.8, 64, 64]}>
      <MeshDistortMaterial
        color="#4f46e5"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        transparent
        opacity={0.15}
      />
    </Sphere>
  );
}

function CityDots() {
  // Major Indian tech cities (approximate lat/lng mapped to sphere)
  const cities = useMemo(() => {
    const cityCoords = [
      { lat: 12.97, lng: 77.59, size: 0.06 }, // Bangalore
      { lat: 17.39, lng: 78.49, size: 0.05 }, // Hyderabad
      { lat: 19.08, lng: 72.88, size: 0.05 }, // Mumbai
      { lat: 18.52, lng: 73.86, size: 0.04 }, // Pune
      { lat: 28.70, lng: 77.10, size: 0.05 }, // Delhi
      { lat: 13.08, lng: 80.27, size: 0.04 }, // Chennai
      { lat: 28.54, lng: 77.39, size: 0.03 }, // Noida
    ];

    return cityCoords.map((c) => {
      const phi = (90 - c.lat) * (Math.PI / 180);
      const theta = (c.lng + 180) * (Math.PI / 180);
      const r = 2.01;
      return {
        position: [
          -(r * Math.sin(phi) * Math.cos(theta)),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ] as [number, number, number],
        size: c.size,
      };
    });
  }, []);

  return (
    <>
      {cities.map((city, i) => (
        <mesh key={i} position={city.position}>
          <sphereGeometry args={[city.size, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.9} />
        </mesh>
      ))}
    </>
  );
}

function OrbitingRing() {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 6, 0, 0]}>
      <torusGeometry args={[2.5, 0.005, 16, 100]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
    </mesh>
  );
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <GlowingSphere />
        <GlobePoints />
        <CityDots />
        <OrbitingRing />
      </Canvas>
    </div>
  );
}
