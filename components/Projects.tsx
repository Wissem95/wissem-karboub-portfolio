"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import RevealText from "./RevealText";

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative flex h-[78vh] w-[80vw] max-w-[600px] shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-card md:h-[72vh] md:w-[55vw] lg:w-[42vw] xl:w-[36vw]"
    >
      <div className="absolute left-6 top-6 z-20 flex items-center gap-3">
        <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur-md">
          {p.category}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative h-[55%] overflow-hidden">
        <motion.img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.65) contrast(1.05) saturate(0.55) hue-rotate(8deg)",
          }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(135deg, rgba(200,184,154,0.35), transparent 50%, rgba(139,115,85,0.4))",
          }}
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <h3 className="font-syne text-2xl font-extrabold leading-tight md:text-3xl">
            {p.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            {p.description}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-text-muted backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex gap-4">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-text-muted transition-colors hover:text-accent"
                >
                  GitHub →
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-accent transition-colors hover:text-accent-dark"
                >
                  Voir le live →
                </a>
              )}
              {!p.github && !p.live && (
                <span className="font-mono text-[11px] text-text-muted/50">
                  Projet privé
                </span>
              )}
            </div>
            {p.featured && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                ★ Featured
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-px rounded-3xl border border-accent/0 transition-colors duration-500 group-hover:border-accent/40" />
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const totalProjects = projects.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            03 — Réalisations
          </p>
          <h2 className="mt-4 font-syne text-4xl font-extrabold md:text-7xl">
            <RevealText className="bg-gradient-to-br from-text via-accent to-accent-dark bg-clip-text text-transparent">
              Projets
            </RevealText>
            <RevealText delay={0.05} className="text-accent">
              .
            </RevealText>
          </h2>
          <p className="mt-6 max-w-2xl text-text-muted">
            {totalProjects} projets — du SaaS multi-tenant à l&apos;IoT, en passant
            par l&apos;app mobile et le robot autonome. Scroll pour parcourir.
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="relative flex flex-1 items-center">
            <motion.div
              style={{ x }}
              className="flex gap-6 pl-[5vw] pr-[10vw] will-change-transform"
            >
              {projects.map((p, i) => (
                <ProjectCard key={p.name} p={p} index={i} />
              ))}
              <div className="flex w-[40vw] shrink-0 items-center justify-center pr-12">
                <a
                  href="#contact"
                  className="group relative flex h-[78vh] w-[300px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-accent/40 bg-card/40 p-8 text-center transition-colors hover:border-accent md:h-[72vh]"
                >
                  <span className="font-syne text-3xl font-extrabold leading-tight">
                    Et le prochain ?
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    On en parle ?
                  </span>
                  <span className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 mx-auto mb-8 flex w-full max-w-7xl items-center justify-between px-6 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            <span>← Scroll vertical = défilement horizontal</span>
            <span>{totalProjects} projets</span>
          </div>
          <div className="relative h-px w-full bg-border">
            <motion.div
              style={{ width: progressWidth }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-accent-dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
