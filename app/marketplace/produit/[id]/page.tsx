"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Stars from "@/components/marketplace/Stars";
import { getProduct } from "@/lib/marketplace/store";
import { toPublicProduct, type PublicProduct } from "@/lib/marketplace/types";
import { useCart } from "@/lib/marketplace/cart-context";

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<PublicProduct | null | undefined>(
    undefined,
  );
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const p = getProduct(params.id);
    setProduct(p ? toPublicProduct(p) : null);
  }, [params.id]);

  if (product === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[3/4] animate-pulse rounded-2xl bg-neutral-100" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 animate-pulse rounded bg-neutral-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
          </div>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="font-syne text-2xl font-bold text-neutral-900">
          Produit introuvable
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Ce produit n&apos;existe plus ou le lien est incorrect.
        </p>
        <Link
          href="/marketplace/catalogue"
          className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  function handleAdd() {
    if (!product) return;
    if (product.sizes.length > 0 && !size) {
      setError("Choisis une taille.");
      return;
    }
    if (product.colors.length > 0 && !color) {
      setError("Choisis une couleur.");
      return;
    }
    addItem({
      productId: product.id,
      title: product.title,
      image: product.images[0],
      size,
      color,
      quantity,
      note: note.trim(),
    });
    setError("");
    setAdded(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <nav className="text-xs text-neutral-400">
        <Link href="/marketplace/catalogue" className="hover:text-neutral-700">
          Catalogue
        </Link>{" "}
        / <span className="text-neutral-600">{product.category}</span>
      </nav>

      <div className="mt-5 grid gap-10 lg:grid-cols-2">
        {/* Galerie */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImg]}
              alt={product.title}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImg === i
                      ? "border-neutral-900"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${product.title} ${i + 1}`}
                    className="h-20 w-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div>
          <p className="text-[11px] uppercase tracking-wide text-neutral-400">
            {product.category}
          </p>
          <h1 className="mt-1 font-syne text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            {product.title}
          </h1>
          <div className="mt-2">
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
            <p className="text-sm font-semibold text-neutral-900">
              Prix sur devis
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Ajoute ce produit à ton panier : tu recevras un prix total
              personnalisé, livraison comprise.
            </p>
          </div>

          {product.description && (
            <p className="mt-5 text-sm leading-relaxed text-neutral-600">
              {product.description}
            </p>
          )}

          {/* Tailles */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-neutral-900">Taille</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                    className={`min-w-[3rem] rounded-lg border px-3 py-2 text-sm transition ${
                      size === s
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Couleurs */}
          {product.colors.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium text-neutral-900">Couleur</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setColor(c);
                      setError("");
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      color === c
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantité */}
          <div className="mt-5">
            <p className="text-sm font-medium text-neutral-900">Quantité</p>
            <div className="mt-2 inline-flex items-center rounded-lg border border-neutral-300">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg text-neutral-600 hover:text-neutral-900"
                aria-label="Réduire la quantité"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                className="px-3 py-2 text-lg text-neutral-600 hover:text-neutral-900"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>
          </div>

          {/* Note */}
          <div className="mt-5">
            <label className="text-sm font-medium text-neutral-900">
              Précision (facultatif)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Ex. variante précise, détail souhaité…"
              className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
            />
          </div>

          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

          {added ? (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-800">
                Ajouté à ton panier.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  href="/marketplace/panier"
                  className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
                >
                  Voir mon panier
                </Link>
                <button
                  type="button"
                  onClick={() => setAdded(false)}
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-900"
                >
                  Continuer mes achats
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="mt-6 w-full rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-700 sm:w-auto sm:px-10"
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
