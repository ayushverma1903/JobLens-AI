"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Ring } from "@react-three/drei";
import * as THREE from "three";

function NeuralCluster() {
  const ref = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate a network mesh inside a sphere
  const { positions, lineGeometry } = useMemo(() => {
    const numPoints = 120;
    const pts = new Float32Array(numPoints * 3);
    const coords: THREE.Vector3[] = [];

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.4;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pts[i * 3] = x;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = z;
      coords.push(new THREE.Vector3(x, y, z));
    }

    // Connect close points with lines
    const lineIndices: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dist = coords[i].distanceTo(coords[j]);
        if (dist < 0.6) {
          lineIndices.push(i, j);
        }
      }
    }

    const linePositions = new Float32Array(lineIndices.length * 3);
    for (let k = 0; k < lineIndices.length; k++) {
      const idx = lineIndices[k];
      linePositions[k * 3] = pts[idx * 3];
      linePositions[k * 3 + 1] = pts[idx * 3 + 1];
      linePositions[k * 3 + 2] = pts[idx * 3 + 2];
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    return { positions: pts, lineGeometry: geom };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
      ref.current.rotation.x += delta * 0.05;
    }
    
    // Breathing motion
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 2) * 0.03;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={ref}>
      {/* Network Nodes */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>

      {/* Network Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.25} linewidth={1} />
      </lineSegments>

    </group>
  );
}

export default function HologramNode() {
  return (
    <div className="w-full h-full min-h-[220px] relative overflow-hidden bg-gradient-to-br from-indigo-950/20 to-cyan-950/20 rounded-2xl border border-border/50">
      {/* Glare effects */}
      <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <NeuralCluster />
      </Canvas>
    </div>
  );
}
