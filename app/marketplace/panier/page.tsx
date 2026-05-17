"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/marketplace/cart-context";
import { createQuoteRequest } from "@/lib/marketplace/store";
import type { Customer } from "@/lib/marketplace/types";

export default function PanierPage() {
  const { items, ready, count, updateItem, removeItem, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    note: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function set(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!form.name.trim()) errs.push("Ton nom est requis.");
    if (!form.phone.trim()) errs.push("Ton numéro de téléphone est requis.");
    if (!form.city.trim()) errs.push("Ta ville est requise.");
    if (items.length === 0) errs.push("Ton panier est vide.");
    setErrors(errs);
    if (errs.length > 0) return;

    setSubmitting(true);
    const customer: Customer = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      email: form.email.trim(),
      note: form.note.trim(),
    };
    const request = createQuoteRequest(items, customer);
    clear();
    router.push(`/marketplace/mes-devis?ref=${request.ref}`);
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="h-6 w-40 animate-pulse rounded bg-neutral-100" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="font-syne text-2xl font-bold text-neutral-900">
          Ton panier est vide
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Ajoute des produits pour demander ton devis personnalisé.
        </p>
        <Link
          href="/marketplace/catalogue"
          className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Parcourir le catalogue
        </Link>
      </div>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900";

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-syne text-3xl font-extrabold tracking-tight text-neutral-900">
        Mon panier
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        {count} article{count > 1 ? "s" : ""} — envoie ta demande pour recevoir
        ton devis.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Articles */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex gap-4 rounded-2xl border border-neutral-200 p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={it.title}
                className="h-24 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-neutral-900">
                    {it.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    className="shrink-0 text-xs text-neutral-400 hover:text-rose-600"
                  >
                    Retirer
                  </button>
                </div>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {[it.size && `Taille ${it.size}`, it.color]
                    .filter(Boolean)
                    .join(" · ") || "Sans variante"}
                </p>
                {it.note && (
                  <p className="mt-0.5 text-xs italic text-neutral-400">
                    “{it.note}”
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="inline-flex items-center rounded-lg border border-neutral-300">
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(it.id, {
                          quantity: Math.max(1, it.quantity - 1),
                        })
                      }
                      className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900"
                      aria-label="Réduire"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">
                      {it.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(it.id, {
                          quantity: Math.min(99, it.quantity + 1),
                        })
                      }
                      className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900"
                      aria-label="Augmenter"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-medium text-neutral-400">
                    Prix sur devis
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire de demande */}
        <div className="lg:col-span-1">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
          >
            <h2 className="font-syne text-lg font-bold text-neutral-900">
              Demander mon devis
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Aucun paiement maintenant. Tu recevras un prix à valider.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-700">
                  Nom complet *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                  placeholder="Ex. Yasmine Ben Salah"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700">
                  Téléphone / WhatsApp *
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputCls}
                  placeholder="+216 …"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700">
                  Ville *
                </label>
                <input
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className={inputCls}
                  placeholder="Ex. Tunis, Sfax, Sousse…"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700">
                  E-mail (facultatif)
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls}
                  placeholder="pour recevoir le devis aussi par e-mail"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700">
                  Message (facultatif)
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => set("note", e.target.value)}
                  rows={2}
                  className={inputCls}
                  placeholder="Disponibilités, précisions…"
                />
              </div>
            </div>

            {errors.length > 0 && (
              <ul className="mt-3 space-y-1">
                {errors.map((er) => (
                  <li key={er} className="text-xs text-rose-600">
                    {er}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
            >
              {submitting ? "Envoi…" : "Envoyer ma demande de devis"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
