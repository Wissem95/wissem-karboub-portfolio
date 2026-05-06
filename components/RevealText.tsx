"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export default function RevealText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: Props) {
  return (
    <span className="inline-block overflow-hidden align-bottom leading-[1.05]">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, ease: [0.2, 0.8, 0.2, 1], delay }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
