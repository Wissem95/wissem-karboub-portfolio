"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Sphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 3]} />
      <meshBasicMaterial color="#C8B89A" wireframe transparent opacity={0.32} />
    </mesh>
  );
}

function InnerCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = -t * 0.25;
    ref.current.rotation.x = t * 0.15;
    ref.current.scale.setScalar(0.85 + Math.sin(t * 0.6) * 0.06);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.0, 1]} />
      <meshBasicMaterial color="#8B7355" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function Ring({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 16, 200]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const positions = (() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 2.4 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  })();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#C8B89A"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function OrbScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Sphere />
        <InnerCore />
        <Ring radius={2.0} tilt={[Math.PI / 3, 0, 0]} speed={0.15} color="#C8B89A" />
        <Ring radius={2.4} tilt={[Math.PI / 4, Math.PI / 6, 0]} speed={-0.1} color="#8B7355" />
        <Ring radius={2.8} tilt={[0, Math.PI / 3, Math.PI / 8]} speed={0.07} color="#C8B89A" />
        <Particles />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,17,13,0.7)_85%)]" />
    </div>
  );
}
