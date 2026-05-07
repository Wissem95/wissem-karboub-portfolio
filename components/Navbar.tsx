"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "À propos", href: "#about" },
  { label: "Expériences", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", "about", "experience", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 2.4 }}
      className={`fixed left-0 right-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/70 py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#hero"
          className="group flex items-center gap-2 font-syne text-2xl font-extrabold tracking-tight"
          aria-label="Wissem Karboub — Accueil"
        >
          <span className="relative">
            <span className="text-accent">W</span>
            <span className="text-text">K</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? "text-bg" : "text-text-muted hover:text-accent"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                  />
                )}
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur">
            <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-green-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Available
            </span>
          </span>
        </div>

        <button
          aria-label="Menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`h-0.5 w-6 bg-text transition-all duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text transition-all duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur md:hidden"
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-text-muted transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <span className="mt-2 inline-flex items-center gap-2">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-green-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Available · Master 2026
            </span>
          </span>
        </div>
      </motion.div>
    </motion.nav>
  );
}
