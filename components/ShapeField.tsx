"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ShapeProps = {
  position: [number, number, number];
  type: number;
  scale: number;
  color: string;
};

function Shape({ position, type, scale, color }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);
  const speed = useMemo(() => 0.2 + Math.random() * 0.4, []);
  const drift = useMemo(() => 0.3 + Math.random() * 0.6, []);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.getElapsedTime();
    m.rotation.x = t * speed + seed;
    m.rotation.y = t * (speed * 1.4) + seed * 0.5;
    m.position.y = position[1] + Math.sin(t * 0.4 + seed) * drift;
    m.position.x = position[0] + Math.cos(t * 0.3 + seed) * (drift * 0.6);
  });

  let geometry: React.ReactElement;
  switch (type) {
    case 0:
      geometry = <icosahedronGeometry args={[1, 0]} />;
      break;
    case 1:
      geometry = <octahedronGeometry args={[1, 0]} />;
      break;
    case 2:
      geometry = <torusGeometry args={[0.7, 0.18, 16, 48]} />;
      break;
    case 3:
      geometry = <tetrahedronGeometry args={[1.1, 0]} />;
      break;
    case 4:
      geometry = <torusKnotGeometry args={[0.55, 0.16, 64, 16]} />;
      break;
    default:
      geometry = <dodecahedronGeometry args={[0.9, 0]} />;
  }

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function Field() {
  const shapes = useMemo<ShapeProps[]>(() => {
    const list: ShapeProps[] = [];
    const colors = ["#C8B89A", "#8B7355", "#C8B89A"];
    for (let i = 0; i < 14; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2,
        ],
        type: Math.floor(Math.random() * 6),
        scale: 0.35 + Math.random() * 0.55,
        color: colors[i % colors.length],
      });
    }
    return list;
  }, []);

  return (
    <>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} />
      ))}
    </>
  );
}

export default function ShapeField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <Field />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,13,13,0.6)_85%)]" />
    </div>
  );
}
