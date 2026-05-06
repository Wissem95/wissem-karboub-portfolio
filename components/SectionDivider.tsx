"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex h-24 w-full max-w-7xl items-center justify-center px-6"
    >
      <motion.svg
        width="100%"
        height="2"
        viewBox="0 0 1200 2"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke="url(#dividerGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="dividerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#C8B89A" stopOpacity="0" />
            <stop offset="0.5" stopColor="#C8B89A" stopOpacity="0.7" />
            <stop offset="1" stopColor="#C8B89A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="text-accent"
        >
          ✦
        </motion.div>
      </motion.div>
    </div>
  );
}
