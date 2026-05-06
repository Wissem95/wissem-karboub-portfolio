"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent via-accent-dark to-accent"
    />
  );
}
