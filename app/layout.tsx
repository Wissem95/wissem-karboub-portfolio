import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wissem Karboub — Développeur Full-Stack & Tech Lead",
  description:
    "Portfolio de Wissem Karboub. Développeur Full-Stack & Tech Lead spécialisé en Next.js, FastAPI, NestJS et SaaS multi-tenant. Master CTO & Tech Lead HETIC 2026.",
  keywords: [
    "Wissem Karboub",
    "Développeur Full-Stack",
    "Tech Lead",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "NestJS",
    "Stripe",
    "Supabase",
    "HETIC",
    "Portfolio",
  ],
  authors: [{ name: "Wissem Karboub" }],
  openGraph: {
    title: "Wissem Karboub — Développeur Full-Stack & Tech Lead",
    description:
      "Tech Lead à 23 ans. SaaS, applications mobiles, outils métier. Master CTO & Tech Lead HETIC 2026.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ("scrollRestoration" in history) {
                  history.scrollRestoration = "manual";
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-bg text-text">{children}</body>
    </html>
  );
}
