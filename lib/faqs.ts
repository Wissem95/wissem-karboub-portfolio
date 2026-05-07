import { siteConfig } from "./seo";

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "Qui est Wissem Karboub ?",
    a: "Wissem Karboub est un Développeur Full-Stack et Tech Lead basé à Paris. Il pilote 3 projets SaaS chez CoZetik et intègre le Master CTO & Tech Lead à HETIC en 2026. Spécialisé en Next.js, FastAPI, NestJS, Stripe Connect et architectures SaaS multi-tenant.",
  },
  {
    q: "Quelles technologies maîtrise Wissem Karboub ?",
    a: "Stack principale : Next.js, React, TypeScript côté frontend ; FastAPI, NestJS, Laravel et Node.js côté backend ; PostgreSQL, Supabase, Redis, Docker côté infra ; Stripe et Stripe Connect pour les paiements ; Flutter et React Native pour le mobile ; Three.js et WebGL pour les expériences 3D.",
  },
  {
    q: "Wissem Karboub est-il disponible en alternance ou freelance ?",
    a: "Oui, Wissem Karboub est disponible en alternance dans le cadre de son Master CTO & Tech Lead à HETIC pour 2026, ainsi qu'en freelance pour des missions de développement Full-Stack, de Tech Lead, ou d'architecture SaaS.",
  },
  {
    q: "Comment contacter Wissem Karboub ?",
    a: `Vous pouvez contacter Wissem Karboub par email à ${siteConfig.email}, via LinkedIn (${siteConfig.links.linkedin}), ou directement depuis le formulaire de contact sur ${siteConfig.url}.`,
  },
  {
    q: "Quels projets a réalisé Wissem Karboub ?",
    a: "Parmi ses projets : HuntZenJobs (plateforme B2C d'emploi avec matching IA), FlotteQ (SaaS Fleet Management multi-tenant avec Stripe Connect), ShowroomBaby (marketplace mobile peer-to-peer), SeneRentCar (location de voitures au Sénégal), ComoRide (taxi via WhatsApp aux Comores), EcoComfort (IoT monitoring énergétique) et RobLaude (robot autonome avec vision embarquée).",
  },
];
