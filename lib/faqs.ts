import { siteConfig } from "./seo";

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "Qui est Wissem Karboub ?",
    a: "Wissem Karboub est un Développeur Full-Stack et Tech Lead basé à Paris. Il travaille sur des produits SaaS, des interfaces React/Next.js et des architectures backend avec FastAPI, NestJS, Laravel, Stripe et Supabase. Il intègre le Master CTO & Tech Lead à HETIC en 2026.",
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
    a: "Les projets mis en avant combinent 5 captures authentiques et 3 projets encore marqués capture à fournir. Chaque fiche privilégie le contexte, le rôle, les choix techniques et la transparence sur les visuels disponibles.",
  },
];
