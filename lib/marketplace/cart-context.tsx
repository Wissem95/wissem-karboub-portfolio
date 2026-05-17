"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "./types";
import { genId } from "./store";

const CART_KEY = "wk_market_cart_v1";

export type NewCartItem = Omit<CartItem, "id">;

interface CartContextValue {
  items: CartItem[];
  count: number;
  ready: boolean;
  addItem: (item: NewCartItem) => void;
  updateItem: (id: string, patch: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* stockage indisponible — panier vide */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignoré */
    }
  }, [items, ready]);

  const addItem = useCallback((item: NewCartItem) => {
    setItems((prev) => {
      const match = prev.find(
        (it) =>
          it.productId === item.productId &&
          it.size === item.size &&
          it.color === item.color,
      );
      if (match) {
        return prev.map((it) =>
          it.id === match.id
            ? { ...it, quantity: it.quantity + item.quantity }
            : it,
        );
      }
      return [...prev, { ...item, id: genId() }];
    });
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, ready, addItem, updateItem, removeItem, clear }),
    [items, count, ready, addItem, updateItem, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
