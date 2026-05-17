"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/marketplace/ProductCard";
import { getProducts } from "@/lib/marketplace/store";
import { toPublicProduct, type PublicProduct } from "@/lib/marketplace/types";
import { BRAND, CATEGORIES } from "@/lib/marketplace/config";

const STEPS = [
  {
    n: "01",
    title: "Choisis tes produits",
    text: "Parcours le catalogue Shein, AliExpress et Temu et ajoute à ton panier tout ce qui te plaît.",
  },
  {
    n: "02",
    title: "Demande ton devis",
    text: "Envoie ton panier. Aucun prix n'est affiché : tu reçois une offre personnalisée.",
  },
  {
    n: "03",
    title: "Reçois ton prix",
    text: "L'équipe te répond avec le prix total, livraison comprise. Tu acceptes ou non, sans engagement.",
  },
  {
    n: "04",
    title: "Paie en main propre",
    text: "On commande depuis la France. Tu règles en espèces, à la livraison, une fois ta commande arrivée.",
  },
];

const TRUST = [
  "Commandé depuis la France",
  "Devis sous 24 h",
  "Paiement à la livraison",
  "Sans engagement",
];

export default function MarketplaceHome() {
  const [trending, setTrending] = useState<PublicProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const list = getProducts()
      .filter((p) => p.trending)
      .slice(0, 8)
      .map(toPublicProduct);
    setTrending(list);
    setLoaded(true);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
              Shein · AliExpress · Temu — livrés en {BRAND.zone}
            </span>
            <h1 className="mt-5 font-syne text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl">
              Commande ce que tu veux.
              <br />
              On s&apos;occupe du reste.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600">
              Tu ne peux pas commander depuis la Tunisie ? Choisis tes produits
              ici, demande ton devis, et reçois ta commande achetée pour toi
              depuis la France. Paiement en main propre.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/marketplace/catalogue"
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Parcourir le catalogue
              </Link>
              <Link
                href="#comment"
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-900"
              >
                Comment ça marche
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-1.5 text-xs text-neutral-500"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 fill-emerald-500"
                    aria-hidden="true"
                  >
                    <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm-1 14.4l-4-4 1.4-1.4L9 11.6l5.6-5.6L16 7.4l-7 7z" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(loaded ? trending.slice(0, 4) : [null, null, null, null]).map(
              (p, i) => (
                <div
                  key={p ? p.id : i}
                  className={`overflow-hidden rounded-2xl bg-neutral-100 ${
                    i % 2 === 1 ? "mt-6" : ""
                  }`}
                >
                  {p && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  )}
                  {!p && <div className="aspect-[3/4] w-full animate-pulse" />}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Bandeau prix cachés */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-2xl bg-neutral-900 px-6 py-8 text-white sm:px-10">
          <p className="font-syne text-xl font-bold sm:text-2xl">
            Ici, pas de prix affiché.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-neutral-300">
            Chaque commande est unique : produits, quantités, livraison. Tu
            composes ton panier, on te prépare un devis clair et personnalisé.
            Tu décides ensuite, en toute liberté.
          </p>
        </div>
      </section>

      {/* Tendances */}
      <section className="mx-auto max-w-6xl px-5 py-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-syne text-2xl font-bold text-neutral-900">
              Tendances du moment
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Les produits les plus demandés cette semaine.
            </p>
          </div>
          <Link
            href="/marketplace/catalogue"
            className="hidden text-sm font-medium text-neutral-700 hover:text-neutral-900 sm:block"
          >
            Tout voir →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
          {loaded
            ? trending.map((p) => <ProductCard key={p.id} product={p} />)
            : Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[3/4] animate-pulse rounded-2xl bg-neutral-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-100" />
                </div>
              ))}
        </div>
      </section>

      {/* Catégories */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-syne text-2xl font-bold text-neutral-900">
          Explore par catégorie
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/marketplace/catalogue?cat=${encodeURIComponent(c)}`}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section
        id="comment"
        className="scroll-mt-24 border-y border-neutral-100 bg-neutral-50"
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-syne text-2xl font-bold text-neutral-900">
            Comment ça marche
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Quatre étapes, zéro mauvaise surprise.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <span className="font-syne text-2xl font-extrabold text-neutral-300">
                  {s.n}
                </span>
                <h3 className="mt-3 text-base font-semibold text-neutral-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center sm:px-10">
          <h2 className="font-syne text-2xl font-bold text-neutral-900 sm:text-3xl">
            Prêt à composer ton panier ?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            Ajoute tes produits, envoie ta demande, reçois ton devis. C&apos;est
            gratuit et sans engagement.
          </p>
          <Link
            href="/marketplace/catalogue"
            className="mt-6 inline-block rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Voir le catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
