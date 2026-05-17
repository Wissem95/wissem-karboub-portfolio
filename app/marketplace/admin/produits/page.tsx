"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/marketplace/AdminGate";
import {
  addProduct,
  deleteProduct,
  genId,
  getProducts,
  isCustomProduct,
} from "@/lib/marketplace/store";
import { CATEGORIES } from "@/lib/marketplace/config";
import { formatEUR } from "@/lib/marketplace/format";
import type {
  Category,
  Product,
  ProductSource,
} from "@/lib/marketplace/types";

export default function AdminProduitsPage() {
  return (
    <AdminGate>
      <AdminProduits />
    </AdminGate>
  );
}

const SOURCES: ProductSource[] = ["shein", "aliexpress", "temu"];

function num(s: string): number {
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function parseList(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function detectSource(url: string): ProductSource | null {
  const u = url.toLowerCase();
  if (u.includes("shein")) return "shein";
  if (u.includes("aliexpress")) return "aliexpress";
  if (u.includes("temu")) return "temu";
  return null;
}

const EMPTY = {
  sourceUrl: "",
  title: "",
  category: "Femme" as Category,
  source: "shein" as ProductSource,
  description: "",
  costPrice: "",
  sizes: "",
  colors: "",
  images: "",
  rating: "4.6",
  reviews: "150",
  trending: false,
};

function AdminProduits() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState("");

  const reload = useCallback(() => {
    setProducts(getProducts());
    setLoaded(true);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function prefill() {
    const detected = detectSource(form.sourceUrl);
    if (!form.sourceUrl.trim()) {
      setInfo("Colle d'abord le lien du produit (Shein, AliExpress ou Temu).");
      return;
    }
    if (detected) {
      set("source", detected);
      setInfo(
        `Source détectée : ${detected}. L'import automatique des photos et infos sera branché à un service de scraping en production — complète les champs manuellement pour l'instant.`,
      );
    } else {
      setInfo(
        "Source non reconnue. Sélectionne-la manuellement et renseigne les champs.",
      );
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Le titre est requis.");
      return;
    }
    if (num(form.costPrice) <= 0) {
      setError("Le coût d'achat (privé) doit être supérieur à 0.");
      return;
    }
    const id = `${slugify(form.title) || "produit"}-${genId().slice(0, 4)}`;
    const imgs = parseList(form.images);
    const product: Product = {
      id,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      images:
        imgs.length > 0
          ? imgs
          : [1, 2, 3].map(
              (n) => `https://picsum.photos/seed/colis-${id}-${n}/700/900`,
            ),
      sizes: parseList(form.sizes),
      colors: parseList(form.colors),
      trending: form.trending,
      rating: num(form.rating) || 4.6,
      reviews: Math.round(num(form.reviews)) || 100,
      source: form.source,
      sourceUrl: form.sourceUrl.trim(),
      costPrice: num(form.costPrice),
      createdAt: Date.now(),
    };
    addProduct(product);
    setForm({ ...EMPTY });
    setError("");
    setInfo("");
    setSuccess(`« ${product.title} » ajouté au catalogue.`);
    reload();
  }

  function remove(id: string) {
    deleteProduct(id);
    reload();
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900";

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-syne text-2xl font-extrabold tracking-tight text-neutral-900">
            Gestion des produits
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Ajoute des produits au catalogue. Le lien source et le coût restent
            privés.
          </p>
        </div>
        <Link
          href="/marketplace/admin"
          className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-900"
        >
          ← Tableau de bord
        </Link>
      </div>

      {/* Formulaire d'ajout */}
      <form
        onSubmit={submit}
        className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5"
      >
        <h2 className="font-syne text-lg font-bold text-neutral-900">
          Ajouter un produit
        </h2>

        <div className="mt-4">
          <label className="text-xs font-medium text-neutral-700">
            Lien source — privé, jamais visible par le client
          </label>
          <div className="mt-1 flex gap-2">
            <input
              value={form.sourceUrl}
              onChange={(e) => set("sourceUrl", e.target.value)}
              placeholder="https://www.shein.com/…"
              className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
            />
            <button
              type="button"
              onClick={prefill}
              className="shrink-0 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-900"
            >
              Pré-remplir
            </button>
          </div>
        </div>

        {info && (
          <p className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
            {info}
          </p>
        )}

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-neutral-700">
              Titre du produit *
            </label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
              placeholder="Ex. Robe d'été fleurie"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Catégorie
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as Category)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Source
            </label>
            <select
              value={form.source}
              onChange={(e) => set("source", e.target.value as ProductSource)}
              className={inputCls}
            >
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Coût d&apos;achat en France — privé (EUR) *
            </label>
            <input
              value={form.costPrice}
              onChange={(e) => set("costPrice", e.target.value)}
              inputMode="decimal"
              className={inputCls}
              placeholder="Ex. 6.20"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={form.trending}
                onChange={(e) => set("trending", e.target.checked)}
                className="h-4 w-4"
              />
              Mettre en tendance
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-neutral-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="Courte description visible par le client"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Tailles (séparées par des virgules)
            </label>
            <input
              value={form.sizes}
              onChange={(e) => set("sizes", e.target.value)}
              className={inputCls}
              placeholder="S, M, L, XL"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Couleurs (séparées par des virgules)
            </label>
            <input
              value={form.colors}
              onChange={(e) => set("colors", e.target.value)}
              className={inputCls}
              placeholder="Noir, Beige, Rose"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-neutral-700">
              Images (URLs séparées par des virgules — vide = images de démo)
            </label>
            <input
              value={form.images}
              onChange={(e) => set("images", e.target.value)}
              className={inputCls}
              placeholder="https://…/photo1.jpg, https://…/photo2.jpg"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Note (sur 5)
            </label>
            <input
              value={form.rating}
              onChange={(e) => set("rating", e.target.value)}
              inputMode="decimal"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Nombre d&apos;avis
            </label>
            <input
              value={form.reviews}
              onChange={(e) => set("reviews", e.target.value)}
              inputMode="numeric"
              className={inputCls}
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
        {success && (
          <p className="mt-3 text-sm font-medium text-emerald-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Ajouter au catalogue
        </button>
      </form>

      {/* Liste */}
      <h2 className="mt-10 font-syne text-lg font-bold text-neutral-900">
        Catalogue {loaded && `(${products.length})`}
      </h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-neutral-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Coût (privé)</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-neutral-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-12 w-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-neutral-900">{p.title}</p>
                      {p.trending && (
                        <span className="text-[11px] text-amber-600">
                          ★ Tendance
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-600">{p.category}</td>
                <td className="px-4 py-3 text-neutral-600">{p.source}</td>
                <td className="px-4 py-3 text-neutral-600">
                  {formatEUR(p.costPrice)}
                </td>
                <td className="px-4 py-3 text-right">
                  {isCustomProduct(p.id) ? (
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="text-xs text-neutral-400 hover:text-rose-600"
                    >
                      Supprimer
                    </button>
                  ) : (
                    <span className="text-xs text-neutral-300">démo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
