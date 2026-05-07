import { siteConfig } from "@/lib/seo";

const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#experience", label: "Expériences" },
  { href: "#projects", label: "Projets" },
  { href: "#skills", label: "Compétences" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const expertiseLinks = [
  "Développeur Full-Stack",
  "Tech Lead",
  "Architecture SaaS",
  "Next.js & React",
  "FastAPI & NestJS",
  "Stripe Connect",
  "Flutter Mobile",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-border bg-sidebar"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-syne text-2xl font-extrabold">
            Wissem Karboub<span className="text-accent">.</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">
            Développeur Full-Stack & Tech Lead basé à Paris. Conception de
            SaaS multi-tenant, applications web et mobiles. Tech Lead chez
            CoZetik, Master CTO & Tech Lead à HETIC 2026. Disponible en
            alternance et freelance.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer me"
              className="text-text-muted transition-colors hover:text-accent"
            >
              GitHub →
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="text-text-muted transition-colors hover:text-accent"
            >
              LinkedIn →
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-text-muted transition-colors hover:text-accent"
            >
              Email →
            </a>
          </div>
        </div>

        <nav aria-label="Navigation principale">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Expertises
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {expertiseLinks.map((label) => (
              <li key={label} className="text-text-muted">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="font-mono text-xs text-text-muted">
            © {year} Wissem Karboub — Tous droits réservés
          </p>
          <p className="font-mono text-xs text-text-muted">
            Conçu et développé par Wissem Karboub à Paris · Next.js · Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
