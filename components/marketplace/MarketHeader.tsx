"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/marketplace/cart-context";
import { BRAND } from "@/lib/marketplace/config";

const LINKS = [
  { href: "/marketplace", label: "Accueil" },
  { href: "/marketplace/catalogue", label: "Catalogue" },
  { href: "/marketplace/mes-devis", label: "Mes devis" },
];

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h8.7a2 2 0 0 0 2-1.6L22 8H6" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

export default function MarketHeader() {
  const { count, ready } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link
          href="/marketplace"
          className="font-syne text-lg font-extrabold tracking-tight text-neutral-900"
        >
          {BRAND.name}
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                  active
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/marketplace/admin"
            className="hidden rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900 sm:block"
          >
            Espace admin
          </Link>
          <Link
            href="/marketplace/panier"
            aria-label="Voir le panier"
            className="relative rounded-full border border-neutral-200 p-2 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <CartIcon />
            {ready && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neutral-900 px-1 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 px-5 py-2 sm:hidden">
        {[...LINKS, { href: "/marketplace/admin", label: "Admin" }].map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
