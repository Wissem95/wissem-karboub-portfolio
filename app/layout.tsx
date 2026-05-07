import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/seo";
import { faqs } from "@/lib/faqs";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Développeur Full-Stack & Tech Lead`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} — Portfolio`,
  generator: "Next.js",
  keywords: [
    "Wissem Karboub",
    "Wissem",
    "Karboub",
    "wissemkarboub",
    "Wissem Karboub développeur",
    "Wissem Karboub portfolio",
    "Wissem Karboub freelance",
    "Wissem Karboub HETIC",
    "Wissem Karboub Tech Lead",
    "Développeur Full-Stack",
    "Développeur Full Stack",
    "Developpeur Full Stack",
    "Full-Stack Developer",
    "Tech Lead",
    "Tech Lead Paris",
    "Développeur Next.js",
    "Développeur React",
    "Développeur TypeScript",
    "Développeur FastAPI",
    "Développeur NestJS",
    "Développeur Laravel",
    "Développeur Flutter",
    "Développeur SaaS",
    "Architecte SaaS",
    "Freelance développeur Paris",
    "Développeur web Paris",
    "Alternance Tech Lead",
    "Master CTO HETIC",
    "Master CTO & Tech Lead HETIC",
    "Stripe Connect",
    "Supabase",
    "Next.js 14",
    "React 18",
    "Three.js",
    "WebGL",
    "Framer Motion",
    "Portfolio développeur",
    "Portfolio Tech Lead",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "fr-FR": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — Développeur Full-Stack & Tech Lead`,
    description: siteConfig.description,
    firstName: "Wissem",
    lastName: "Karboub",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Développeur Full-Stack & Tech Lead`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Développeur Full-Stack & Tech Lead`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "any" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "AuTsPeSX1Wm9NIbYCNeir2dtkjrtV6x7332ZnKjkl2g",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  givenName: "Wissem",
  familyName: "Karboub",
  alternateName: ["Wissem", "Karboub", "wissemkarboub"],
  url: siteConfig.url,
  image: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  logo: `${siteConfig.url}/icon`,
  jobTitle: "Développeur Full-Stack & Tech Lead",
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  nationality: "FR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  worksFor: {
    "@type": "Organization",
    name: "CoZetik",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "HETIC",
      sameAs: "https://www.hetic.net",
    },
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "FastAPI",
    "NestJS",
    "Laravel",
    "Python",
    "Stripe",
    "Stripe Connect",
    "Supabase",
    "PostgreSQL",
    "Docker",
    "Flutter",
    "SaaS multi-tenant",
    "Architecture logicielle",
    "WebGL",
    "Three.js",
  ],
  knowsLanguage: ["fr", "en"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Développeur Full-Stack & Tech Lead",
    occupationLocation: {
      "@type": "City",
      name: "Paris",
    },
    skills:
      "Next.js, React, TypeScript, FastAPI, NestJS, Laravel, Stripe Connect, Supabase, PostgreSQL, Docker, Flutter, architecture SaaS multi-tenant",
  },
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin].filter(Boolean),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: `${siteConfig.name} — Portfolio`,
  description: siteConfig.description,
  inLanguage: "fr-FR",
  publisher: { "@id": `${siteConfig.url}/#person` },
};

const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#service`,
  name: `${siteConfig.name} — Développement Full-Stack & Tech Lead`,
  description:
    "Conception et développement de SaaS, applications web et mobiles, architectures multi-tenant, intégrations Stripe et IA.",
  provider: { "@id": `${siteConfig.url}/#person` },
  areaServed: ["FR", "EU"],
  url: siteConfig.url,
  serviceType: [
    "Développement Full-Stack",
    "Tech Lead",
    "Architecture SaaS",
    "Développement Next.js",
    "Développement Mobile Flutter",
    "Intégration Stripe",
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [personLd, websiteLd, professionalServiceLd, faqLd],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
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
