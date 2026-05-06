"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField({
  count,
  radius,
  color,
  size,
  opacity,
  speed,
}: {
  count: number;
  radius: number;
  color: string;
  size: number;
  opacity: number;
  speed: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.6 + Math.random() * 0.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    const t = state.clock.getElapsedTime();
    points.rotation.y = t * speed;
    points.rotation.x = t * speed * 0.4;

    const targetY = state.pointer.x * 0.5;
    const targetX = -state.pointer.y * 0.5;
    points.position.x += (targetY * 0.5 - points.position.x) * 0.02;
    points.position.y += (targetX * 0.5 - points.position.y) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.22;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.4, 0.18, 128, 16]} />
      <meshBasicMaterial
        color="#C8B89A"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function Icosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = t * 0.1;
    ref.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial
        color="#8B7355"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function Nebula() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = t * 0.04;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.18 + Math.sin(t * 0.6) * 0.04;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        color="#C8B89A"
        transparent
        opacity={0.15}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={useMemo(() => {
          const c = document.createElement("canvas");
          c.width = c.height = 256;
          const ctx = c.getContext("2d")!;
          const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
          grd.addColorStop(0, "rgba(200,184,154,0.6)");
          grd.addColorStop(0.5, "rgba(139,115,85,0.2)");
          grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, 256, 256);
          const tex = new THREE.CanvasTexture(c);
          tex.needsUpdate = true;
          return tex;
        }, [])}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <Nebula />
        <Icosahedron />
        <GlowTorus />
        <ParticleField
          count={2000}
          radius={5}
          color="#C8B89A"
          size={0.022}
          opacity={0.85}
          speed={0.04}
        />
        <ParticleField
          count={800}
          radius={7}
          color="#8B7355"
          size={0.045}
          opacity={0.5}
          speed={-0.025}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,13,13,0.5)_80%)]" />
    </div>
  );
}
