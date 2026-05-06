"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { social } from "@/lib/data";
import Aurora from "./Aurora";
import RevealText from "./RevealText";

const OrbScene = dynamic(() => import("./OrbScene"), { ssr: false });

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Contact portfolio — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${social.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", message: "" });
      }, 2500);
    }, 600);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-sidebar to-bg" />
      <OrbScene />
      <Aurora />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            05 — Contact
          </p>
          <h2 className="mt-4 font-syne text-5xl font-extrabold md:text-7xl">
            <RevealText>Travaillons</RevealText>{" "}
            <RevealText
              delay={0.08}
              className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent"
            >
              ensemble
            </RevealText>
            <RevealText delay={0.16} className="text-accent">
              .
            </RevealText>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-text-muted">
            Disponible en alternance — Master CTO &amp; Tech Lead HETIC 2026.
            Une idée, un projet, une opportunité ? Écrivez-moi.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Nom
              </label>
              <input
                required
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="vous@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
              Message
            </label>
            <textarea
              required
              rows={6}
              placeholder="Parlez-moi de votre projet..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-accent"
            />
          </div>

          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-text-muted">
              Réponse sous 24h ouvrées.
            </p>
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-full bg-accent px-8 py-3 font-syne text-sm font-bold text-bg transition-colors hover:bg-accent-dark disabled:opacity-60"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="block"
                  >
                    ✓ Message envoyé
                  </motion.span>
                ) : sending ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="block"
                  >
                    Envoi...
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="block"
                  >
                    Envoyer →
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex justify-center gap-6">
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-text-muted transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <span className="text-border">·</span>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-text-muted transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <span className="text-border">·</span>
            <a
              href={`mailto:${social.email}`}
              className="font-mono text-sm text-text-muted transition-colors hover:text-accent"
            >
              Email
            </a>
          </div>

          <p className="mt-12 text-center font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Wissem Karboub — Conçu et développé
            avec Next.js
          </p>
        </motion.div>
      </div>
    </section>
  );
}
