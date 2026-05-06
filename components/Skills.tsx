"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { skills, type SkillCategory } from "@/lib/data";
import FloatingOrbs from "./FloatingOrbs";
import AnimatedGrid from "./AnimatedGrid";
import RevealText from "./RevealText";

const ShapeField = dynamic(() => import("./ShapeField"), { ssr: false });

const order: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Infra & Data",
  "Paiement & IA",
  "Mobile",
  "Outils",
];

const categoryAccent: Record<SkillCategory, string> = {
  Frontend: "from-accent/30 to-transparent",
  Backend: "from-accent-dark/30 to-transparent",
  "Infra & Data": "from-accent/20 to-transparent",
  "Paiement & IA": "from-accent/30 to-transparent",
  Mobile: "from-accent-dark/20 to-transparent",
  Outils: "from-accent/20 to-transparent",
};

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <ShapeField />
      <FloatingOrbs preset="warm" />
      <AnimatedGrid size={36} fade="radial" intensity={0.08} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            04 — Stack
          </p>
          <h2 className="mt-4 font-syne text-4xl font-extrabold md:text-6xl">
            <RevealText>Compétences techniques</RevealText>
            <RevealText delay={0.05} className="text-accent">
              .
            </RevealText>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {order.map((category, idx) => {
            const list = skills[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${categoryAccent[category]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="flex items-center justify-between">
                  <h3 className="font-syne text-lg font-bold text-accent">
                    {category}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {list.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="cursor-default rounded-full border border-border bg-bg px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
