"use client";

import { motion } from "framer-motion";

type Props = {
  items: string[];
  speed?: number;
  reverse?: boolean;
};

export default function Marquee({ items, speed = 40, reverse = false }: Props) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border/60 bg-card/30 py-6 backdrop-blur-md"
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((it, i) => (
          <span key={i} className="flex shrink-0 items-center gap-12">
            <span className="font-syne text-3xl font-extrabold uppercase tracking-tight text-text-muted/40 transition-colors hover:text-accent md:text-5xl">
              {it}
            </span>
            <span className="text-2xl text-accent">✦</span>
          </span>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
