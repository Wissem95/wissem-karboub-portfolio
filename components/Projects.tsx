"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import RevealText from "./RevealText";
import ProjectModal from "./ProjectModal";
import ProjectMedia from "./ProjectMedia";

function ProjectCard({
  p,
  index,
  onOpen,
  layout = "rail",
}: {
  p: Project;
  index: number;
  onOpen: () => void;
  layout?: "rail" | "stack";
}) {
  const isStack = layout === "stack";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      role="button"
      tabIndex={0}
      aria-label={`Ouvrir les détails du projet ${p.name}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`group relative flex shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-card ${
        isStack
          ? "min-h-[620px] w-full"
          : "h-[78vh] w-[80vw] max-w-[600px] md:h-[72vh] md:w-[55vw] lg:w-[42vw] xl:w-[36vw]"
      }`}
    >
      <div className="absolute left-6 top-6 z-20 flex items-center gap-3">
        <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur-md">
          {p.category}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className={`relative overflow-hidden ${isStack ? "h-[280px]" : "h-[55%]"}`}>
        <ProjectMedia project={p} variant="card" />
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

          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <div className="flex flex-wrap gap-4">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="shrink-0 rounded-full border border-accent/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:border-accent hover:bg-accent hover:text-bg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card"
            >
              Détails
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-px rounded-3xl border border-accent/0 transition-colors duration-500 group-hover:border-accent/40" />
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            par l&apos;app mobile, le robot autonome et quelques petits projets
            vitrines. Les projets vérifiés utilisent une capture réelle ; les
            autres sont explicitement marqués comme capture à fournir.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:hidden">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.name}
            p={p}
            index={i}
            layout="stack"
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      <div ref={ref} className="relative hidden h-[420vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="relative flex flex-1 items-center">
            <motion.div
              style={{ x }}
              className="flex gap-6 pl-[5vw] pr-[10vw] will-change-transform"
            >
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.name}
                  p={p}
                  index={i}
                  onOpen={() => setOpenIndex(i)}
                />
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

      <ProjectModal
        project={openIndex !== null ? projects[openIndex] : null}
        index={openIndex ?? 0}
        total={totalProjects}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}
