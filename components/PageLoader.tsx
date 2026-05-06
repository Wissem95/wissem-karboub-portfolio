"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg"
    >
      <div aria-hidden className="absolute inset-0">
        {[18, 36, 54, 72].map((top, i) => (
          <motion.div
            key={top}
            className="absolute left-0 right-0 h-px bg-accent/15"
            style={{ top: `${top}%` }}
            initial={{ scaleX: 0, originX: i % 2 === 0 ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.08,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,184,154,0.10), transparent 60%)",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative inline-block overflow-hidden leading-none">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="font-syne text-[140px] font-extrabold leading-[0.85] tracking-tight md:text-[220px]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #F5F3EE 0%, #C8B89A 50%, #8B7355 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              padding: "0 0.05em",
            }}
          >
            WK
          </motion.h1>

          <motion.div
            className="absolute inset-y-0 right-0 w-[2px] bg-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.0, times: [0, 0.05, 0.95, 1], delay: 0.1 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-text-muted md:text-xs">
            Wissem · Karboub
          </p>
          <div className="h-px w-56 overflow-hidden bg-border md:w-72">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.3,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="h-full bg-gradient-to-r from-accent via-accent to-accent-dark"
            />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-muted/60">
            Loading portfolio · 2026
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-text-muted/60"
      >
        v1.0
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-widest text-text-muted/60"
      >
        Paris · FR
      </motion.div>
    </motion.div>
  );
}
