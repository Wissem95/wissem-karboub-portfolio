"use client";

import { CartProvider } from "@/lib/marketplace/cart-context";
import MarketHeader from "./MarketHeader";
import MarketFooter from "./MarketFooter";

export default function MarketplaceShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="mk-root flex min-h-screen flex-col bg-white font-inter text-neutral-900">
        <MarketHeader />
        <main className="flex-1">{children}</main>
        <MarketFooter />
      </div>
    </CartProvider>
  );
}
