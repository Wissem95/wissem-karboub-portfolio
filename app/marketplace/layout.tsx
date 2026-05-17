import type { Metadata } from "next";
import MarketplaceShell from "@/components/marketplace/MarketplaceShell";
import { BRAND } from "@/lib/marketplace/config";
import "./marketplace.css";

export const metadata: Metadata = {
  title: { absolute: `${BRAND.name} — Boutique` },
  description: BRAND.tagline,
  robots: { index: false, follow: false },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketplaceShell>{children}</MarketplaceShell>;
}
