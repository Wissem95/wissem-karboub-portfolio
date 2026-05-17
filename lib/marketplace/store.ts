// Couche d'accès aux données — adossée à localStorage pour ce prototype.
// En production : remplacer ces fonctions par des appels API vers une base de
// données. La signature des fonctions est volontairement conçue pour ça.

import { seedProducts } from "./products";
import type {
  CartItem,
  Customer,
  Product,
  Quote,
  QuoteRequest,
  QuoteStatus,
} from "./types";

const PRODUCTS_KEY = "wk_market_products_v1";
const QUOTES_KEY = "wk_market_quotes_v1";
const OWNER_KEY = "wk_market_owner_v1";

export const MARKET_EVENT = "wk-market-change";

export function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function genRef(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i += 1) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CT-${s}`;
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(MARKET_EVENT));
  } catch {
    /* quota dépassé ou stockage indisponible — ignoré pour le prototype */
  }
}

/* ----------------------------- Produits ----------------------------- */

export function getProducts(): Product[] {
  const custom = readJSON<Product[]>(PRODUCTS_KEY, []);
  return [...custom, ...seedProducts].sort((a, b) => b.createdAt - a.createdAt);
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function isCustomProduct(id: string): boolean {
  return readJSON<Product[]>(PRODUCTS_KEY, []).some((p) => p.id === id);
}

export function addProduct(product: Product): void {
  const custom = readJSON<Product[]>(PRODUCTS_KEY, []);
  writeJSON(PRODUCTS_KEY, [product, ...custom]);
}

export function deleteProduct(id: string): boolean {
  const custom = readJSON<Product[]>(PRODUCTS_KEY, []);
  const next = custom.filter((p) => p.id !== id);
  if (next.length === custom.length) return false; // produit de démo : non supprimable
  writeJSON(PRODUCTS_KEY, next);
  return true;
}

/* --------------------------- Clé client ----------------------------- */

export function getOwnerKey(): string {
  if (typeof window === "undefined") return "";
  let key = window.localStorage.getItem(OWNER_KEY);
  if (!key) {
    key = genId();
    window.localStorage.setItem(OWNER_KEY, key);
  }
  return key;
}

/* -------------------------- Demandes de devis ------------------------ */

function buildSeedQuotes(): QuoteRequest[] {
  const now = Date.now();
  return [
    {
      id: genId(),
      ref: "CT-7K2D",
      ownerKey: "demo",
      items: [
        {
          id: genId(),
          productId: "robe-fleurie",
          title: "Robe d'été fleurie",
          image: "https://picsum.photos/seed/colis-robe-fleurie-1/700/900",
          size: "M",
          color: "Rose",
          quantity: 1,
          note: "",
        },
        {
          id: genId(),
          productId: "ecouteurs-bt",
          title: "Écouteurs sans fil Bluetooth",
          image: "https://picsum.photos/seed/colis-ecouteurs-bt-1/700/900",
          size: null,
          color: "Blanc",
          quantity: 2,
          note: "Pour offrir",
        },
      ],
      customer: {
        name: "Yasmine Ben Salah",
        phone: "+216 22 345 678",
        email: "yasmine@example.tn",
        city: "Tunis",
        note: "Disponible le week-end pour la remise.",
      },
      status: "pending",
      quote: null,
      createdAt: now - 3 * 3_600_000,
      updatedAt: now - 3 * 3_600_000,
    },
  ];
}

export function getQuotes(): QuoteRequest[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(QUOTES_KEY);
  if (raw === null) {
    const seeded = buildSeedQuotes();
    writeJSON(QUOTES_KEY, seeded);
    return seeded;
  }
  try {
    return (JSON.parse(raw) as QuoteRequest[]).sort(
      (a, b) => b.createdAt - a.createdAt,
    );
  } catch {
    return [];
  }
}

export function getQuote(id: string): QuoteRequest | undefined {
  return getQuotes().find((q) => q.id === id);
}

export function getQuotesForOwner(ownerKey: string): QuoteRequest[] {
  return getQuotes().filter((q) => q.ownerKey === ownerKey);
}

export function createQuoteRequest(
  items: CartItem[],
  customer: Customer,
): QuoteRequest {
  const now = Date.now();
  const request: QuoteRequest = {
    id: genId(),
    ref: genRef(),
    ownerKey: getOwnerKey(),
    items,
    customer,
    status: "pending",
    quote: null,
    createdAt: now,
    updatedAt: now,
  };
  writeJSON(QUOTES_KEY, [request, ...getQuotes()]);
  return request;
}

function mutateQuote(
  id: string,
  fn: (q: QuoteRequest) => QuoteRequest,
): QuoteRequest | undefined {
  const all = getQuotes();
  let updated: QuoteRequest | undefined;
  const next = all.map((q) => {
    if (q.id !== id) return q;
    updated = fn({ ...q, updatedAt: Date.now() });
    return updated;
  });
  if (updated) writeJSON(QUOTES_KEY, next);
  return updated;
}

export function setQuote(id: string, quote: Quote): QuoteRequest | undefined {
  return mutateQuote(id, (q) => ({ ...q, quote, status: "quoted" }));
}

export function setQuoteStatus(
  id: string,
  status: QuoteStatus,
): QuoteRequest | undefined {
  return mutateQuote(id, (q) => ({ ...q, status }));
}
