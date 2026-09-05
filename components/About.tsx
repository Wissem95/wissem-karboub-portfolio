"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/data";
import AnimatedGrid from "./AnimatedGrid";
import FloatingOrbs from "./FloatingOrbs";
import RevealText from "./RevealText";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.floor(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [inView, value, mv]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}

const techTags = [
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "FastAPI", icon: "API" },
  { name: "NestJS", icon: "NX" },
  { name: "Flutter", icon: "FL" },
  { name: "Stripe", icon: "$" },
  { name: "Supabase", icon: "DB" },
  { name: "Docker", icon: "DK" },
  { name: "Groq", icon: "AI" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-32">
      <FloatingOrbs preset="subtle" />
      <AnimatedGrid fade="both" intensity={0.14} />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            01 — À propos
          </p>
          <h2 className="mt-4 font-syne text-4xl font-extrabold md:text-6xl">
            <RevealText>Qui suis-je</RevealText>
            <RevealText delay={0.05} className="text-accent">
              .
            </RevealText>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Je conçois des produits web complets, de l&apos;architecture à la
              mise en production : interfaces React, APIs métier, paiements,
              données, automatisations et parcours utilisateur.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
              Actuellement en alternance chez{" "}
              <span className="text-accent">CoZetik</span>, je travaille sur des
              projets SaaS où le frontend, le backend et l&apos;architecture
              doivent rester cohérents. En 2026, j&apos;intègre le{" "}
              <span className="text-accent">
                Master CTO &amp; Tech Lead à HETIC
              </span>
              .
            </p>

            <div className="mt-10">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
                Stack quotidienne
              </p>
              <div className="flex flex-wrap gap-2">
                {techTags.map((t) => (
                  <motion.span
                    key={t.name}
                    whileHover={{ y: -3, borderColor: "#C8B89A" }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-text-muted"
                  >
                    <span className="text-accent">{t.icon}</span>
                    {t.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 lg:col-span-2"
          >
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="font-syne text-4xl font-extrabold text-accent md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-2 text-xs text-text-muted md:text-sm">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
