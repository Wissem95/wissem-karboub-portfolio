"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/marketplace/ProductCard";
import { getProducts } from "@/lib/marketplace/store";
import { toPublicProduct, type PublicProduct } from "@/lib/marketplace/types";
import { CATEGORIES } from "@/lib/marketplace/config";

type SortKey = "trending" | "recent" | "rating";

const FILTERS = ["Tous", ...CATEGORIES];

export default function CataloguePage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState<string>(
    searchParams.cat && (FILTERS as string[]).includes(searchParams.cat)
      ? searchParams.cat
      : "Tous",
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("trending");

  useEffect(() => {
    setProducts(getProducts().map(toPublicProduct));
    setLoaded(true);
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "Tous") {
      list = list.filter((p) => p.category === category);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === "trending") {
      sorted.sort(
        (a, b) => Number(b.trending) - Number(a.trending) || b.reviews - a.reviews,
      );
    } else if (sort === "recent") {
      sorted.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, category, query, sort]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-syne text-3xl font-extrabold tracking-tight text-neutral-900">
        Catalogue
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Ajoute ce qui te plaît à ton panier — le prix te sera communiqué par
        devis.
      </p>

      {/* Barre de filtres */}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                category === c
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="w-40 rounded-full border border-neutral-300 px-4 py-1.5 text-sm outline-none focus:border-neutral-900"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:border-neutral-900"
          >
            <option value="trending">Tendances</option>
            <option value="recent">Nouveautés</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>
      </div>

      {/* Résultats */}
      {!loaded ? (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-neutral-500">
          Aucun produit ne correspond à ta recherche.
        </p>
      ) : (
        <>
          <p className="mt-6 text-xs text-neutral-400">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
