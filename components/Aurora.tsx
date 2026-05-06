"use client";

import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-1/4 top-0 h-[700px] w-[700px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(200,184,154,0.18), transparent 70%)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 220, 100, 0],
          y: [0, 120, -90, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(139,115,85,0.22), transparent 70%)",
          willChange: "transform",
        }}
        animate={{
          x: [0, -180, 60, 0],
          y: [0, -130, 100, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200,184,154,0.14), transparent 70%)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 120, -160, 0],
          y: [0, 220, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,184,154,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,184,154,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
