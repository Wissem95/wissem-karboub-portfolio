"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/lib/data";
import FloatingOrbs from "./FloatingOrbs";
import RevealText from "./RevealText";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);

  return (
    <section id="experience" className="relative overflow-hidden py-32">
      <FloatingOrbs preset="warm" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            02 — Parcours
          </p>
          <h2 className="mt-4 font-syne text-4xl font-extrabold md:text-6xl">
            <RevealText>Expériences</RevealText>
            <RevealText delay={0.05} className="text-accent">
              .
            </RevealText>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-accent via-accent to-accent-dark md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: left ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div
                      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent ${
                        left ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <p className="font-mono text-xs uppercase tracking-wider text-accent">
                        {exp.period}
                      </p>
                      <h3 className="mt-2 font-syne text-xl font-bold md:text-2xl">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">
                        {exp.company}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-text-muted">
                        {exp.description}
                      </p>
                      <div
                        className={`mt-4 flex flex-wrap gap-2 ${
                          left ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {exp.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-bg shadow-[0_0_15px_rgba(200,184,154,0.5)] md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
