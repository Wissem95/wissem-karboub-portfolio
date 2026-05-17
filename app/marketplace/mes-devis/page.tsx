"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import QuoteStatusBadge from "@/components/marketplace/QuoteStatusBadge";
import {
  getOwnerKey,
  getQuotesForOwner,
  setQuoteStatus,
} from "@/lib/marketplace/store";
import { formatDT, formatDateTime } from "@/lib/marketplace/format";
import type { QuoteRequest } from "@/lib/marketplace/types";

export default function MesDevisPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(() => {
    setQuotes(getQuotesForOwner(getOwnerKey()));
    setLoaded(true);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  function decide(id: string, status: "accepted" | "refused") {
    setQuoteStatus(id, status);
    reload();
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="font-syne text-3xl font-extrabold tracking-tight text-neutral-900">
        Mes devis
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Suis ici l&apos;état de tes demandes et valide tes devis.
      </p>

      {searchParams.ref && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Ta demande <span className="font-mono font-semibold">
            {searchParams.ref}
          </span>{" "}
          a bien été envoyée. L&apos;équipe te prépare un devis.
        </div>
      )}

      {!loaded ? (
        <div className="mt-8 h-24 animate-pulse rounded-2xl bg-neutral-100" />
      ) : quotes.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-12 text-center">
          <p className="text-sm text-neutral-500">
            Tu n&apos;as encore aucune demande de devis.
          </p>
          <Link
            href="/marketplace/catalogue"
            className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Composer un panier
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {quotes.map((q) => (
            <QuoteCard key={q.id} quote={q} onDecide={decide} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuoteCard({
  quote,
  onDecide,
}: {
  quote: QuoteRequest;
  onDecide: (id: string, status: "accepted" | "refused") => void;
}) {
  const q = quote.quote;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="font-mono text-sm font-semibold text-neutral-900">
            {quote.ref}
          </span>
          <span className="ml-2 text-xs text-neutral-400">
            {formatDateTime(quote.createdAt)}
          </span>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <div className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
        {quote.items.map((it) => {
          const line = q?.lines.find((l) => l.cartItemId === it.id);
          return (
            <div key={it.id} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={it.title}
                className="h-14 w-12 shrink-0 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">
                  {it.title}
                </p>
                <p className="text-xs text-neutral-500">
                  {[it.size && `Taille ${it.size}`, it.color, `×${it.quantity}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              {line && (
                <span className="text-sm font-medium text-neutral-900">
                  {formatDT(line.unitPrice * it.quantity)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {q ? (
        <div className="mt-4 rounded-xl bg-neutral-50 p-4">
          <div className="space-y-1 text-sm">
            <Row label="Livraison" value={formatDT(q.shipping)} />
            <Row label="Frais de service" value={formatDT(q.serviceFee)} />
            <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2">
              <span className="font-semibold text-neutral-900">
                Total à payer
              </span>
              <span className="font-syne text-lg font-extrabold text-neutral-900">
                {formatDT(q.total)}
              </span>
            </div>
          </div>
          {q.message && (
            <p className="mt-3 border-t border-neutral-200 pt-3 text-xs italic text-neutral-500">
              Message de l&apos;équipe : {q.message}
            </p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-xs text-neutral-400">
          Devis en cours de préparation par l&apos;équipe.
        </p>
      )}

      {quote.status === "quoted" && (
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onDecide(quote.id, "accepted")}
            className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Accepter le devis
          </button>
          <button
            type="button"
            onClick={() => onDecide(quote.id, "refused")}
            className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:border-rose-400 hover:text-rose-600"
          >
            Refuser
          </button>
        </div>
      )}

      {(quote.status === "accepted" || quote.status === "ordered") && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {quote.status === "accepted"
            ? "Devis accepté. On commande tes produits depuis la France — tu règles en main propre à la livraison."
            : "Ta commande a été passée en France. Tu seras contacté pour la remise et le paiement en main propre."}
        </p>
      )}

      {quote.status === "refused" && (
        <p className="mt-4 text-xs text-neutral-400">
          Devis refusé. Tu peux composer un nouveau panier quand tu veux.
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-neutral-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
