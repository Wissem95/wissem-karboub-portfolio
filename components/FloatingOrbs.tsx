"use client";

import { motion } from "framer-motion";

type Orb = {
  size: number;
  color: string;
  left: string;
  top: string;
  duration: number;
  opacity: number;
  delay?: number;
  range?: number;
};

const presets: Record<string, Orb[]> = {
  default: [
    {
      size: 520,
      color: "#C8B89A",
      left: "8%",
      top: "10%",
      duration: 22,
      opacity: 0.07,
      range: 120,
    },
    {
      size: 420,
      color: "#8B7355",
      left: "70%",
      top: "55%",
      duration: 28,
      opacity: 0.09,
      delay: 4,
      range: 100,
    },
    {
      size: 360,
      color: "#C8B89A",
      left: "40%",
      top: "75%",
      duration: 32,
      opacity: 0.05,
      delay: 8,
      range: 140,
    },
  ],
  warm: [
    {
      size: 600,
      color: "#C8B89A",
      left: "20%",
      top: "30%",
      duration: 26,
      opacity: 0.08,
      range: 150,
    },
    {
      size: 500,
      color: "#8B7355",
      left: "60%",
      top: "20%",
      duration: 30,
      opacity: 0.06,
      delay: 5,
      range: 130,
    },
  ],
  subtle: [
    {
      size: 440,
      color: "#C8B89A",
      left: "15%",
      top: "20%",
      duration: 30,
      opacity: 0.04,
      range: 100,
    },
    {
      size: 380,
      color: "#8B7355",
      left: "75%",
      top: "70%",
      duration: 36,
      opacity: 0.05,
      delay: 6,
      range: 120,
    },
  ],
};

type Props = {
  preset?: keyof typeof presets;
};

export default function FloatingOrbs({ preset = "default" }: Props) {
  const orbs = presets[preset];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle at 30% 30%, ${orb.color}, transparent 70%)`,
            opacity: orb.opacity,
            willChange: "transform",
          }}
          animate={{
            x: [0, orb.range ?? 100, -((orb.range ?? 100) / 2), 0],
            y: [0, -((orb.range ?? 100) * 0.7), (orb.range ?? 100) * 0.5, 0],
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay ?? 0,
          }}
        />
      ))}
    </div>
  );
}
