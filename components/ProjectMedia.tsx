"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data";

type Props = {
  project: Project;
  variant?: "card" | "modal";
};

export default function ProjectMedia({ project, variant = "card" }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const hasVideo = Boolean(project.video);
  const gallery = project.gallery ?? [];
  const hasGallery = gallery.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImage = Boolean(project.image) && project.captureStatus !== "missing";
  const activeAsset =
    hasGallery ? gallery[activeIndex % gallery.length] : undefined;

  useEffect(() => {
    setActiveIndex(0);
  }, [project.name]);

  useEffect(() => {
    if (!hasGallery || gallery.length < 2 || variant === "modal" || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % gallery.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [gallery.length, hasGallery, prefersReducedMotion, variant]);

  const motionProps = prefersReducedMotion || variant === "modal"
    ? {}
    : {
        animate: { y: [0, -8, 0], rotateZ: [0, -0.45, 0.45, 0] },
        transition: {
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
    };

  if (!hasVideo && hasImage) {
    const imageSrc = activeAsset?.src ?? (project.image as string);
    const imageAlt = activeAsset?.alt ?? project.imageAlt ?? project.name;

    const isModal = variant === "modal";

    return (
      <motion.div
        {...motionProps}
        className={`relative h-full w-full overflow-hidden ${isModal ? "bg-bg" : ""}`}
        whileHover={prefersReducedMotion || isModal ? undefined : { scale: 1.04 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={
            variant === "modal"
              ? "(min-width: 768px) 896px, 100vw"
              : "(min-width: 1280px) 36vw, (min-width: 1024px) 42vw, (min-width: 768px) 55vw, 80vw"
          }
          className={isModal ? "object-contain p-3 md:p-4" : "object-cover"}
          priority={project.featured}
        />
        {!isModal && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,184,154,0.35), transparent 50%, rgba(139,115,85,0.4))",
              }}
            />
          </>
        )}

        {hasGallery && gallery.length > 1 && (
          <div className="absolute inset-x-4 bottom-4 z-10">
            {variant === "modal" ? (
              <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-bg/70 p-2 backdrop-blur-md">
                {gallery.map((asset, index) => (
                  <button
                    key={asset.src}
                    type="button"
                    aria-label={`Afficher la capture ${asset.label ?? index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                      index === activeIndex
                        ? "border-accent"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={asset.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-bg/80 px-1 py-0.5 text-center font-mono text-[9px] uppercase tracking-wider text-text">
                      {asset.label ?? index + 1}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                {gallery.map((asset, index) => (
                  <span
                    key={asset.src}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-accent"
                        : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  if (!hasVideo && !hasImage) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-card via-bg to-card px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,184,154,0.18),transparent_55%)]" />
        <div className="relative max-w-xs rounded-2xl border border-dashed border-accent/30 bg-bg/60 p-6 text-center backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
            {project.captureLabel ?? "Capture à fournir"}
          </p>
          <h3 className="mt-3 font-syne text-2xl font-extrabold leading-tight text-text">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Aucun visuel authentique n&apos;est encore disponible pour ce projet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-zinc-950 via-card to-card">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_52%)]" />

      <motion.div
        {...motionProps}
        className={`relative mx-auto flex h-full items-center justify-center px-6 py-5 ${
          variant === "modal"
            ? "w-[46%] min-w-[240px] max-w-[340px]"
            : "w-[72%] max-w-[250px] sm:max-w-[280px]"
        }`}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
        style={{ perspective: 1200 }}
      >
        <div className="relative h-full w-full rounded-[2.5rem] border border-white/10 bg-zinc-950 p-[0.35rem] shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
          <div className="absolute left-1/2 top-[0.45rem] z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-zinc-900/90 shadow-inner shadow-black/40" />
          <div className="absolute left-1/2 top-[0.45rem] z-30 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/8" />
          <div className="absolute inset-x-5 bottom-3 z-20 h-1 rounded-full bg-white/14" />

          <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-black">
            <video
              aria-label={project.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.videoPoster ?? project.image}
            >
              <source src={project.video} type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/8" />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,184,154,0.28), transparent 50%, rgba(139,115,85,0.28))",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
