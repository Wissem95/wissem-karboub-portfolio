"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/data";

type Props = {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
};

export default function ProjectModal({ project, index, total, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-md"
          />

          <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="absolute left-6 top-6 z-20 flex items-center gap-3">
              <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur-md">
                {project.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/60 font-mono text-sm text-text-muted backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent"
            >
              ✕
            </button>

            <div className="relative h-[32vh] shrink-0 overflow-hidden md:h-[36vh]">
              <img
                src={project.image}
                alt={`${project.name} — ${project.category}`}
                className="h-full w-full object-cover"
                style={{
                  filter:
                    "brightness(0.65) contrast(1.05) saturate(0.55) hue-rotate(8deg)",
                }}
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

            <div
              data-lenis-prevent
              className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-10"
            >
              <header>
                <h3 className="font-syne text-3xl font-extrabold leading-tight md:text-5xl">
                  {project.name}
                  {project.featured && (
                    <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-widest text-accent">
                      ★ Featured
                    </span>
                  )}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
                  {project.description}
                </p>
              </header>

              {(project.role || project.duration || project.year) && (
                <dl className="grid grid-cols-1 gap-4 border-y border-border py-5 sm:grid-cols-3">
                  {project.role && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        Rôle
                      </dt>
                      <dd className="mt-1 font-syne text-sm font-semibold md:text-base">
                        {project.role}
                      </dd>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        Durée
                      </dt>
                      <dd className="mt-1 font-syne text-sm font-semibold md:text-base">
                        {project.duration}
                      </dd>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        Année
                      </dt>
                      <dd className="mt-1 font-syne text-sm font-semibold md:text-base">
                        {project.year}
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              {project.features && project.features.length > 0 && (
                <section>
                  <h4 className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    Fonctionnalités clés
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-sm text-text-muted md:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h4 className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    Défis techniques
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {project.challenges.map((c) => (
                      <li
                        key={c}
                        className="flex gap-3 text-sm text-text-muted md:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.results && project.results.length > 0 && (
                <section>
                  <h4 className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    Résultats
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {project.results.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-sm text-text-muted md:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  Stack
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-text-muted backdrop-blur"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              <footer className="mt-2 flex items-center justify-between border-t border-border pt-5">
                <div className="flex gap-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-text-muted transition-colors hover:text-accent"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-accent transition-colors hover:text-accent-dark"
                    >
                      Voir le live →
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <span className="font-mono text-[11px] text-text-muted/50">
                      Projet privé
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="font-mono text-[11px] uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
                >
                  Fermer (Esc)
                </button>
              </footer>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
