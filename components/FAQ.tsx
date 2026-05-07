import { siteConfig } from "@/lib/seo";

export const faqs: { q: string; a: string }[] = [
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
    a: `Vous pouvez contacter Wissem Karboub par email à ${siteConfig.email}, via LinkedIn, ou directement depuis le formulaire de contact en bas de cette page.`,
  },
  {
    q: "Quels projets a réalisé Wissem Karboub ?",
    a: "Parmi ses projets : HuntZenJobs (plateforme B2C d'emploi avec matching IA), FlotteQ (SaaS Fleet Management multi-tenant avec Stripe Connect), ShowroomBaby (marketplace mobile peer-to-peer), SeneRentCar (location de voitures au Sénégal), ComoRide (taxi via WhatsApp aux Comores), EcoComfort (IoT monitoring énergétique) et RobLaude (robot autonome avec vision embarquée).",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative border-t border-border bg-bg py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          06 — Questions fréquentes
        </p>
        <h2
          id="faq-title"
          className="mt-4 font-syne text-4xl font-extrabold md:text-5xl"
        >
          On vous explique<span className="text-accent">.</span>
        </h2>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="font-syne text-lg font-bold text-text md:text-xl">
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-block flex-shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-xs text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
