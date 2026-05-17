"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/marketplace/AdminGate";
import QuoteStatusBadge from "@/components/marketplace/QuoteStatusBadge";
import {
  getProduct,
  getQuotes,
  setQuote,
  setQuoteStatus,
} from "@/lib/marketplace/store";
import { DEFAULT_MARGIN, EUR_TO_TND } from "@/lib/marketplace/config";
import { formatDT, formatEUR, timeAgo } from "@/lib/marketplace/format";
import type { Quote, QuoteRequest, QuoteStatus } from "@/lib/marketplace/types";

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}

function num(s: string): number {
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const FILTERS: { key: QuoteStatus | "all"; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "pending", label: "À chiffrer" },
  { key: "quoted", label: "Devis envoyés" },
  { key: "accepted", label: "Acceptés" },
  { key: "ordered", label: "Commandés" },
];

function AdminDashboard() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<QuoteStatus | "all">("all");

  const reload = useCallback(() => {
    setQuotes(getQuotes());
    setLoaded(true);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const stats = useMemo(
    () => ({
      total: quotes.length,
      pending: quotes.filter((q) => q.status === "pending").length,
      quoted: quotes.filter((q) => q.status === "quoted").length,
      done: quotes.filter(
        (q) => q.status === "accepted" || q.status === "ordered",
      ).length,
    }),
    [quotes],
  );

  const visible = useMemo(
    () => (filter === "all" ? quotes : quotes.filter((q) => q.status === filter)),
    [quotes, filter],
  );

  const selected = quotes.find((q) => q.id === selectedId) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-syne text-2xl font-extrabold tracking-tight text-neutral-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Demandes de devis reçues — chiffre et réponds aux clients.
          </p>
        </div>
        <Link
          href="/marketplace/admin/produits"
          className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-900"
        >
          Gérer les produits
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Demandes" value={stats.total} />
        <Stat label="À chiffrer" value={stats.pending} accent="amber" />
        <Stat label="Devis envoyés" value={stats.quoted} accent="blue" />
        <Stat label="Validés" value={stats.done} accent="emerald" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === f.key
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Liste */}
        <div className="space-y-2 lg:col-span-5">
          {!loaded ? (
            <div className="h-24 animate-pulse rounded-2xl bg-neutral-100" />
          ) : visible.length === 0 ? (
            <p className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-10 text-center text-sm text-neutral-500">
              Aucune demande dans cette catégorie.
            </p>
          ) : (
            visible.map((q) => {
              const active = q.id === selectedId;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedId(q.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-semibold text-neutral-900">
                      {q.ref}
                    </span>
                    <QuoteStatusBadge status={q.status} />
                  </div>
                  <p className="mt-1.5 text-sm text-neutral-700">
                    {q.customer.name} · {q.customer.city}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    {q.items.length} article
                    {q.items.length > 1 ? "s" : ""} · {timeAgo(q.createdAt)}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Détail */}
        <div className="lg:col-span-7">
          {selected ? (
            <QuotePanel
              key={selected.id}
              quote={selected}
              onChange={reload}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center text-sm text-neutral-400">
              Sélectionne une demande pour la chiffrer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "amber" | "blue" | "emerald";
}) {
  const dot =
    accent === "amber"
      ? "bg-amber-400"
      : accent === "blue"
        ? "bg-blue-400"
        : accent === "emerald"
          ? "bg-emerald-400"
          : "bg-neutral-300";
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-xs text-neutral-500">{label}</span>
      </div>
      <p className="mt-1 font-syne text-2xl font-extrabold text-neutral-900">
        {value}
      </p>
    </div>
  );
}

function QuotePanel({
  quote,
  onChange,
}: {
  quote: QuoteRequest;
  onChange: () => void;
}) {
  const [prices, setPrices] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    quote.items.forEach((it) => {
      const existing = quote.quote?.lines.find((l) => l.cartItemId === it.id);
      if (existing) {
        map[it.id] = String(existing.unitPrice);
        return;
      }
      const cost = getProduct(it.productId)?.costPrice ?? 0;
      const suggested = Math.round(cost * EUR_TO_TND * DEFAULT_MARGIN);
      map[it.id] = suggested > 0 ? String(suggested) : "";
    });
    return map;
  });
  const [shipping, setShipping] = useState(
    quote.quote ? String(quote.quote.shipping) : "0",
  );
  const [serviceFee, setServiceFee] = useState(
    quote.quote ? String(quote.quote.serviceFee) : "0",
  );
  const [message, setMessage] = useState(quote.quote?.message ?? "");
  const [feedback, setFeedback] = useState("");

  const itemsTotal = quote.items.reduce(
    (sum, it) => sum + num(prices[it.id] ?? "") * it.quantity,
    0,
  );
  const total = itemsTotal + num(shipping) + num(serviceFee);
  const estCost = quote.items.reduce((sum, it) => {
    const cost = getProduct(it.productId)?.costPrice ?? 0;
    return sum + cost * it.quantity * EUR_TO_TND;
  }, 0);
  const margin = total - estCost;

  const editable = quote.status === "pending" || quote.status === "quoted";

  function sendQuote() {
    const newQuote: Quote = {
      lines: quote.items.map((it) => ({
        cartItemId: it.id,
        unitPrice: num(prices[it.id] ?? ""),
      })),
      shipping: num(shipping),
      serviceFee: num(serviceFee),
      total,
      message: message.trim(),
      quotedAt: Date.now(),
    };
    setQuote(quote.id, newQuote);
    setFeedback("Devis envoyé au client.");
    onChange();
  }

  function changeStatus(status: QuoteStatus, msg: string) {
    setQuoteStatus(quote.id, status);
    setFeedback(msg);
    onChange();
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-base font-semibold text-neutral-900">
          {quote.ref}
        </span>
        <QuoteStatusBadge status={quote.status} />
      </div>

      {/* Client */}
      <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-sm">
        <p className="font-medium text-neutral-900">{quote.customer.name}</p>
        <p className="mt-0.5 text-neutral-600">
          {quote.customer.phone} · {quote.customer.city}
        </p>
        {quote.customer.email && (
          <p className="text-neutral-600">{quote.customer.email}</p>
        )}
        {quote.customer.note && (
          <p className="mt-1 text-xs italic text-neutral-500">
            “{quote.customer.note}”
          </p>
        )}
      </div>

      {/* Lignes */}
      <div className="mt-4 space-y-3">
        {quote.items.map((it) => {
          const product = getProduct(it.productId);
          return (
            <div
              key={it.id}
              className="flex flex-wrap items-center gap-3 border-b border-neutral-100 pb-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={it.title}
                className="h-14 w-12 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-[8rem] flex-1">
                <p className="text-sm font-medium text-neutral-900">
                  {it.title}
                </p>
                <p className="text-xs text-neutral-500">
                  {[it.size && `T. ${it.size}`, it.color, `×${it.quantity}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  {product
                    ? `${product.source} · coût ${formatEUR(product.costPrice)}/u`
                    : "source inconnue"}
                </p>
                {it.note && (
                  <p className="text-[11px] italic text-neutral-400">
                    “{it.note}”
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <input
                  value={prices[it.id] ?? ""}
                  onChange={(e) =>
                    setPrices((p) => ({ ...p, [it.id]: e.target.value }))
                  }
                  disabled={!editable}
                  inputMode="decimal"
                  placeholder="0"
                  className="w-20 rounded-lg border border-neutral-300 px-2 py-1.5 text-right text-sm outline-none focus:border-neutral-900 disabled:bg-neutral-100"
                />
                <span className="text-xs text-neutral-400">DT/u</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frais */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-neutral-700">
          Livraison (DT)
          <input
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            disabled={!editable}
            inputMode="decimal"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-neutral-900 disabled:bg-neutral-100"
          />
        </label>
        <label className="text-xs font-medium text-neutral-700">
          Frais de service (DT)
          <input
            value={serviceFee}
            onChange={(e) => setServiceFee(e.target.value)}
            disabled={!editable}
            inputMode="decimal"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-neutral-900 disabled:bg-neutral-100"
          />
        </label>
      </div>

      {/* Récap */}
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 text-white">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-300">Total client</span>
          <span className="font-syne text-xl font-extrabold">
            {formatDT(total)}
          </span>
        </div>
        <div className="mt-2 flex justify-between border-t border-neutral-700 pt-2 text-xs text-neutral-400">
          <span>Coût estimé ≈ {formatDT(estCost)}</span>
          <span className={margin >= 0 ? "text-emerald-400" : "text-rose-400"}>
            Marge brute ≈ {formatDT(margin)}
          </span>
        </div>
      </div>

      {/* Message */}
      {editable && (
        <div className="mt-4">
          <label className="text-xs font-medium text-neutral-700">
            Message au client (facultatif)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Délai estimé, précision sur un produit…"
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
          />
        </div>
      )}

      {feedback && (
        <p className="mt-3 text-sm font-medium text-emerald-700">{feedback}</p>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        {editable && (
          <button
            type="button"
            onClick={sendQuote}
            className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            {quote.status === "quoted"
              ? "Mettre à jour le devis"
              : "Envoyer le devis"}
          </button>
        )}
        {quote.status === "accepted" && (
          <button
            type="button"
            onClick={() =>
              changeStatus("ordered", "Commande marquée comme passée.")
            }
            className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Marquer comme commandé
          </button>
        )}
        {(quote.status === "pending" || quote.status === "quoted") && (
          <button
            type="button"
            onClick={() => changeStatus("cancelled", "Demande annulée.")}
            className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-600 hover:border-rose-400 hover:text-rose-600"
          >
            Annuler la demande
          </button>
        )}
      </div>

      {quote.status === "quoted" && (
        <p className="mt-3 text-xs text-neutral-400">
          Devis envoyé — en attente de la réponse du client.
        </p>
      )}
    </div>
  );
}
