"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;

    vec2 q = vec2(fbm(uv * 1.4 + vec2(t, t * 0.7)), fbm(uv * 1.4 + vec2(-t * 0.6, t * 0.5)));
    vec2 r = vec2(fbm(uv * 2.0 + q + uMouse * 0.4 + vec2(1.7 + t, 9.2)), fbm(uv * 2.0 + q + vec2(8.3 - t, 2.8)));
    float blend = fbm(uv * 1.2 + r + uScroll * 0.3);
    blend = clamp(blend * 0.6 + 0.5, 0.0, 1.0);

    vec3 cDeep   = vec3(0.075, 0.062, 0.050);
    vec3 cBlack  = vec3(0.045, 0.038, 0.033);
    vec3 cWarm   = vec3(0.155, 0.115, 0.082);
    vec3 cAccent = vec3(0.82,  0.74,  0.60);
    vec3 cAccent2= vec3(0.62,  0.50,  0.36);

    vec3 color = mix(cBlack, cDeep, smoothstep(0.0, 0.3, blend));
    color = mix(color, cWarm,    smoothstep(0.3, 0.55, blend));
    color = mix(color, cAccent2, smoothstep(0.55, 0.8, blend) * 0.65);
    color = mix(color, cAccent,  smoothstep(0.8, 1.0, blend) * 0.28);

    float dist = distance(uv, vec2(0.5, 0.5));
    color *= 1.0 - smoothstep(0.5, 1.0, dist) * 0.42;

    float scan = sin(uv.y * 720.0 + uTime * 0.5) * 0.005;
    color += scan;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const scrollRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.05,
    );
    if (typeof window !== "undefined") {
      const target =
        window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current += (target - scrollRef.current) * 0.05;
      matRef.current.uniforms.uScroll.value = scrollRef.current;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function MeshGradient() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  if (prefersReducedMotion || isMobile) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(200,184,154,0.10), transparent 35%), radial-gradient(circle at 80% 80%, rgba(139,115,85,0.08), transparent 40%), #14110D",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ willChange: "auto" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <GradientPlane />
      </Canvas>
    </div>
  );
}
