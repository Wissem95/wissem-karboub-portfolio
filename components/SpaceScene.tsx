"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Trail } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Planet({
  position,
  radius,
  color,
  hasRing = false,
  ringColor = "#C8B89A",
  ringTilt = 0,
  rotationSpeed = 0.05,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  hasRing?: boolean;
  ringColor?: string;
  ringTilt?: number;
  rotationSpeed?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * rotationSpeed;
    ref.current.rotation.x = t * rotationSpeed * 0.4;
    ref.current.position.y =
      position[1] + Math.sin(t * 0.2 + position[0]) * 0.25;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <icosahedronGeometry args={[radius, 2]} />
        <meshStandardMaterial
          color={color}
          flatShading
          roughness={0.85}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[radius * 1.06, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh scale={1.35}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      {hasRing && (
        <>
          <mesh rotation={[Math.PI / 2.2 + ringTilt, ringTilt * 0.5, 0]}>
            <ringGeometry args={[radius * 1.5, radius * 1.95, 96]} />
            <meshBasicMaterial
              color={ringColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.2 + ringTilt, ringTilt * 0.5, 0]}>
            <ringGeometry args={[radius * 2.05, radius * 2.3, 96]} />
            <meshBasicMaterial
              color={ringColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.45}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

function ShipMesh({
  hullColor = "#E0D6BE",
  glowColor = "#C8B89A",
}: {
  hullColor?: string;
  glowColor?: string;
}) {
  return (
    <group>
      {/* Fuselage cylindrique allongé sur l'axe X */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.3, 1.6, 10]} />
        <meshStandardMaterial
          color={hullColor}
          flatShading
          metalness={0.4}
          roughness={0.45}
        />
      </mesh>

      {/* Nez pointu */}
      <mesh position={[0.85, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.16, 0.4, 10]} />
        <meshStandardMaterial
          color={hullColor}
          flatShading
          metalness={0.4}
          roughness={0.45}
        />
      </mesh>

      {/* Cockpit (dôme sombre) */}
      <mesh position={[0.2, 0.12, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color="#1A1612"
          metalness={0.85}
          roughness={0.15}
          emissive={glowColor}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Ailes principales (delta) */}
      <mesh position={[-0.1, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.45, 0.04, 1.8]} />
        <meshStandardMaterial
          color={hullColor}
          flatShading
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>

      {/* Pylônes de bout d'aile */}
      <mesh position={[-0.1, 0, 0.85]}>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial
          color={hullColor}
          flatShading
          metalness={0.4}
        />
      </mesh>
      <mesh position={[-0.1, 0, -0.85]}>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial
          color={hullColor}
          flatShading
          metalness={0.4}
        />
      </mesh>

      {/* Aileron vertical arrière */}
      <mesh position={[-0.55, 0.22, 0]}>
        <boxGeometry args={[0.25, 0.4, 0.05]} />
        <meshStandardMaterial
          color={hullColor}
          flatShading
          metalness={0.4}
        />
      </mesh>

      {/* Tuyère moteur principale */}
      <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.18, 0.18, 10]} />
        <meshStandardMaterial color="#3A332A" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Glow du moteur (additive) */}
      <mesh position={[-0.95, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.95} />
      </mesh>

      {/* Halo extérieur du moteur */}
      <mesh position={[-1.0, 0, 0]}>
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

function Spaceship({
  delay,
  height,
  depth,
  speed,
  scale,
  trailColor = "#C8B89A",
  trailWidth = 2.4,
  trailLength = 12,
  reverse = false,
  hullColor = "#E0D6BE",
}: {
  delay: number;
  height: number;
  depth: number;
  speed: number;
  scale: number;
  trailColor?: string;
  trailWidth?: number;
  trailLength?: number;
  reverse?: boolean;
  hullColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const tAbs = state.clock.getElapsedTime() + delay;
    if (tAbs < 0) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const period = 22 / speed;
    const phase = (tAbs % period) / period;

    let x: number;
    let y: number;
    if (phase < 0.55) {
      const local = phase / 0.55;
      const startX = reverse ? 16 : -16;
      const endX = reverse ? -16 : 16;
      x = startX + (endX - startX) * local;
      y = height + Math.sin(local * Math.PI) * 0.25;
    } else {
      const local = (phase - 0.55) / 0.45;
      const startX = reverse ? -16 : 16;
      const endX = reverse ? 16 : -16;
      x = startX + (endX - startX) * local;
      y = height + Math.sin(local * Math.PI) * 18;
    }

    ref.current.position.x = x;
    ref.current.position.y = y;
    ref.current.position.z = depth;
  });

  return (
    <Trail
      width={trailWidth}
      length={trailLength}
      color={new THREE.Color(trailColor)}
      attenuation={(w) => w * w}
      decay={1.0}
    >
      <group
        ref={ref}
        scale={scale}
        rotation={[0, reverse ? Math.PI : 0, 0]}
      >
        <ShipMesh hullColor={hullColor} glowColor={trailColor} />
      </group>
    </Trail>
  );
}

function ShootingStar({
  delay,
  period,
  fromY,
  toY,
  fromX = -10,
  toX = 12,
  trailLength = 16,
  trailWidth = 3,
  size = 0.13,
}: {
  delay: number;
  period: number;
  fromY: number;
  toY: number;
  fromX?: number;
  toX?: number;
  trailLength?: number;
  trailWidth?: number;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const tAbs = state.clock.getElapsedTime() + delay;
    if (tAbs < 0) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const t = tAbs % period;
    const phase = t / period;

    let x: number;
    let y: number;
    let visibleAlpha = 1;
    if (phase < 0.4) {
      const local = phase / 0.4;
      x = fromX + (toX - fromX) * local;
      y = fromY + (toY - fromY) * local;
      visibleAlpha =
        local < 0.05 ? local / 0.05 : local > 0.92 ? (1 - local) / 0.08 : 1;
    } else {
      const local = (phase - 0.4) / 0.6;
      const cx = (toX + fromX) / 2;
      const cy = (toY + fromY) / 2 + 80;
      const u = local;
      const v = 1 - u;
      x = v * v * toX + 2 * v * u * cx + u * u * fromX;
      y = v * v * toY + 2 * v * u * cy + u * u * fromY;
      visibleAlpha = 0;
    }

    ref.current.position.x = x;
    ref.current.position.y = y;
    ref.current.position.z = -1.5;

    const m = ref.current.material as THREE.MeshBasicMaterial;
    if (m) m.opacity = visibleAlpha;
  });

  return (
    <Trail
      width={trailWidth}
      length={trailLength}
      color={new THREE.Color("#FFFFFF")}
      attenuation={(w) => w * w * w}
      decay={0.85}
    >
      <mesh ref={ref} scale={size}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" transparent />
      </mesh>
    </Trail>
  );
}

function Nebula() {
  const ref = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grd = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grd.addColorStop(0, "rgba(200, 184, 154, 0.7)");
    grd.addColorStop(0.3, "rgba(139, 115, 85, 0.4)");
    grd.addColorStop(0.7, "rgba(64, 50, 38, 0.12)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = t * 0.02;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    if (m) m.opacity = 0.85 + Math.sin(t * 0.4) * 0.12;
  });

  if (!texture) return null;

  return (
    <mesh ref={ref} position={[0, 0, -7]}>
      <planeGeometry args={[36, 22]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Asteroid({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * speed;
    ref.current.rotation.y = t * speed * 0.7;
    ref.current.position.x = position[0] + Math.sin(t * 0.15) * 0.3;
    ref.current.position.y = position[1] + Math.cos(t * 0.18) * 0.25;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#7A6243"
        flatShading
        roughness={1}
        emissive="#3D2F1F"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function MouseDriftGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.12;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.04;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

export default function SpaceScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 30% 30%, rgba(200,184,154,0.10), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(139,115,85,0.08), transparent 55%), #14110D",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[8, 5, 4]} intensity={1.6} color="#C8B89A" />
        <pointLight position={[-6, -4, -2]} intensity={1.0} color="#8B7355" />
        <pointLight position={[0, 0, 4]} intensity={0.7} color="#F5F3EE" />

        <MouseDriftGroup>
          <Stars
            radius={70}
            depth={50}
            count={6000}
            factor={6}
            saturation={0.7}
            fade
            speed={1.2}
          />

          <Nebula />

          {/* Planètes — 5, calmes, en arrière-plan */}
          <Planet
            position={[-3.8, 1.8, -2.5]}
            radius={0.55}
            color="#D2BC9A"
            hasRing
            ringColor="#8B7355"
            ringTilt={0.25}
            rotationSpeed={0.03}
          />
          <Planet
            position={[4.0, -1.6, -3]}
            radius={0.65}
            color="#8B7355"
            rotationSpeed={0.025}
          />
          <Planet
            position={[-4.8, -2.0, -2]}
            radius={0.4}
            color="#A89070"
            rotationSpeed={0.05}
          />
          <Planet
            position={[4.4, 2.0, -3.5]}
            radius={0.5}
            color="#C8B89A"
            hasRing
            ringColor="#C8B89A"
            ringTilt={-0.35}
            rotationSpeed={0.03}
          />
          <Planet
            position={[0, -3.0, -4.5]}
            radius={0.6}
            color="#9A8060"
            rotationSpeed={0.02}
          />

          <Asteroid position={[1.8, 1.4, -1]} scale={0.12} speed={0.5} />
          <Asteroid position={[-3.0, -1.0, -0.5]} scale={0.10} speed={0.6} />

          {/* Vaisseaux — 4 lents, espacés dans le temps */}
          <Spaceship
            delay={0}
            height={2.5}
            depth={-0.5}
            speed={0.7}
            scale={0.18}
            trailWidth={2.4}
            trailLength={10}
          />
          <Spaceship
            delay={4}
            height={-2.0}
            depth={-1}
            speed={0.6}
            scale={0.16}
            trailWidth={2.0}
            trailLength={9}
            reverse
          />
          <Spaceship
            delay={9}
            height={1.2}
            depth={-0.3}
            speed={0.85}
            scale={0.20}
            trailColor="#F5F3EE"
            trailWidth={2.6}
            trailLength={11}
          />
          <Spaceship
            delay={14}
            height={-1.4}
            depth={-1.5}
            speed={0.55}
            scale={0.14}
            trailWidth={1.8}
            trailLength={8}
            reverse
          />

          {/* 3 étoiles filantes — lentes et espacées */}
          <ShootingStar
            delay={2}
            period={14}
            fromY={4.5}
            toY={-1.5}
            trailLength={14}
            trailWidth={2.5}
            size={0.11}
          />
          <ShootingStar
            delay={8}
            period={18}
            fromY={3.5}
            toY={-3.0}
            fromX={-12}
            toX={12}
            trailLength={16}
            trailWidth={2.8}
            size={0.13}
          />
          <ShootingStar
            delay={15}
            period={22}
            fromY={4.0}
            toY={-2.5}
            fromX={14}
            toX={-12}
            trailLength={18}
            trailWidth={3.0}
            size={0.14}
          />
        </MouseDriftGroup>
      </Canvas>
    </div>
  );
}
