"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MagneticButton from "./MagneticButton";

const SpaceScene = dynamic(() => import("./SpaceScene"), {
  ssr: false,
});

const NAME = "Wissem Karboub";
const TITLE = "Développeur Full-Stack & Tech Lead";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const t = setInterval(() => {
        i++;
        setTyped(TITLE.slice(0, i));
        if (i >= TITLE.length) clearInterval(t);
      }, 50);
    }, 2700);
    return () => clearTimeout(start);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <SpaceScene />

      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          Portfolio · 2026
        </motion.p>

        <motion.h1
          className="hero-shimmer font-syne text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-[8rem]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 2.2 },
            },
          }}
        >
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60, rotateX: -90 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
                },
              }}
              className="inline-block"
              style={{ display: ch === " " ? "inline" : "inline-block" }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.h1>

        <p className="mt-8 min-h-[2rem] font-mono text-base text-accent md:text-lg">
          {typed}
          <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-accent align-middle" />
        </p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-sm text-text-muted md:text-base"
        >
          Bachelor Dev Web @ HETIC · Master CTO &amp; Tech Lead 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="#projects"
            className="group relative inline-block overflow-hidden rounded-full bg-accent px-8 py-4 font-syne text-sm font-bold text-bg shadow-[0_10px_40px_-10px_rgba(200,184,154,0.6)]"
          >
            Voir mes projets →
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="rounded-full border border-accent px-8 py-4 font-syne text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            Me contacter
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-accent/60 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
