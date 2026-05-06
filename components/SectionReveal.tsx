"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionReveal({ children, className = "", id }: Props) {
  return (
    <motion.div
      id={id}
      initial={{ clipPath: "inset(8% 4% 8% 4% round 28px)", opacity: 0.6 }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        opacity: 1,
      }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
