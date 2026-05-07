// Configuration centrale SEO. Ajuster `url` et `email` une fois le domaine acheté.
// Surcharge possible via la variable d'environnement NEXT_PUBLIC_SITE_URL.

const FALLBACK_URL = "https://wissemkarboub.com";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL;
const normalizedUrl = rawUrl.replace(/\/+$/, "");

export const siteConfig = {
  name: "Wissem Karboub",
  url: normalizedUrl,
  email: "wissemkarboub@gmail.com",
  description:
    "Portfolio de Wissem Karboub, Développeur Full-Stack & Tech Lead à Paris. SaaS multi-tenant, Next.js, FastAPI, NestJS, Stripe Connect, Flutter. Master CTO & Tech Lead HETIC 2026.",
  shortDescription:
    "Développeur Full-Stack & Tech Lead — Next.js, FastAPI, SaaS multi-tenant.",
  locale: "fr_FR",
  links: {
    github: "https://github.com/wissemkarboub",
    linkedin: "https://www.linkedin.com/in/wissem-karboub",
    twitter: "https://twitter.com/wissemkarboub",
  },
} as const;

export type SiteConfig = typeof siteConfig;
