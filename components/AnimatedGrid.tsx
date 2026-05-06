"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type Props = {
  size?: number;
  fade?: "top" | "bottom" | "both" | "radial";
  intensity?: number;
};

export default function AnimatedGrid({
  size = 28,
  fade = "both",
  intensity = 0.18,
}: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 30, stiffness: 80, mass: 0.8 });
  const sy = useSpring(my, { damping: 30, stiffness: 80, mass: 0.8 });
  const tx = useTransform(sx, (v) => v * -0.025);
  const ty = useTransform(sy, (v) => v * -0.025);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX - window.innerWidth / 2);
      my.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const fadeMask =
    fade === "top"
      ? "linear-gradient(to bottom, transparent, black 30%)"
      : fade === "bottom"
        ? "linear-gradient(to top, transparent, black 30%)"
        : fade === "radial"
          ? "radial-gradient(ellipse at center, black 40%, transparent 80%)"
          : "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    >
      <motion.div
        style={{
          x: tx,
          y: ty,
          backgroundImage: `radial-gradient(circle, rgba(200,184,154,${intensity}) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
        }}
        className="absolute -inset-32"
      />
    </div>
  );
}
