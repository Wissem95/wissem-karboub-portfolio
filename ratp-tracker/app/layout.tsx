import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RATP Trafic — Retards & incidents en temps reel",
  description:
    "Suivi en temps reel des retards, incidents et perturbations du reseau RATP et Ile-de-France Mobilites : metro, RER, Transilien, tram et bus, avec horaires et causes.",
  keywords: [
    "RATP",
    "trafic",
    "retard",
    "metro",
    "RER",
    "Ile-de-France",
    "info trafic",
    "perturbation",
  ],
  authors: [{ name: "Wissem Karboub" }],
  openGraph: {
    title: "RATP Trafic — Retards & incidents en temps reel",
    description:
      "Le bot scrute le reseau francilien et liste les perturbations en cours avec horaires et causes.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
