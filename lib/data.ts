export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Tech Lead Fullstack",
    company: "CoZetik",
    period: "Oct. 2025 → Aujourd'hui",
    description:
      "Pilotage de 3 projets SaaS simultanément, de la conception architecturale à la mise en production. Mise en place de pipelines CI/CD, encadrement technique et delivery continu.",
    stack: ["Next.js", "FastAPI", "Supabase", "Stripe"],
  },
  {
    role: "Développeur Full-Stack",
    company: "3W Cabinet comptable",
    period: "2024 → 2025",
    description:
      "Conception et développement d'un système complet de gestion : dossiers clients, devis, factures, suivi comptable. Refonte UX et automatisation des flux métier.",
    stack: ["Laravel", "MySQL", "React", "Tailwind"],
  },
  {
    role: "Développeur Full-Stack",
    company: "Data2Innov",
    period: "2023 → 2024",
    description:
      "Site web institutionnel et back-office Strapi pour un organisme de formation. Architecture headless, gestion de contenu dynamique et SEO technique.",
    stack: ["Next.js", "Strapi", "Node.js"],
  },
];

export type ProjectCategory = "SaaS" | "Mobile" | "Freelance" | "Académique";

export type Project = {
  name: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  github?: string;
  live?: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  gallery?: { src: string; alt: string; label?: string }[];
  video?: string;
  videoPoster?: string;
  captureStatus?: "verified" | "missing";
  captureLabel?: string;
  accent?: string;
  role?: string;
  duration?: string;
  year?: string;
  features?: string[];
  challenges?: string[];
  results?: string[];
};

export const verifiedProjects: Project[] = [
  {
    name: "HuntZenJobs",
    description:
      "SaaS de matching emploi par IA avec scoring, quotas, paiement Stripe et traitement CV. Front Next.js, API FastAPI, Supabase Auth/PostgreSQL et pipeline IA en production.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "Supabase",
      "PostgreSQL",
      "Groq",
      "Stripe",
      "Vercel",
      "Railway",
      "Modal Labs",
      "Upstash Redis",
      "Resend",
    ],
    category: "SaaS",
    live: "https://huntzenjobs.com",
    featured: true,
    image: "/projects/huntzenjobs-hero.jpg",
    imageAlt:
      "Page d'accueil HuntZenJobs affichant le hero principal, la proposition de valeur et les appels à l'action.",
    role: "Tech Lead Fullstack",
    duration: "6 mois",
    year: "2025",
    features: [
      "Matching sémantique CV ↔ offres via embeddings",
      "Recherche d'offres, favoris et suivi de candidatures",
      "Gestion de quotas freemium/premium et paiement Stripe",
      "Dashboard candidat connecté à Supabase",
      "Traitement CV asynchrone via Modal Labs",
      "Emailing transactionnel avec Resend",
    ],
    challenges: [
      "Orchestration Next.js + FastAPI pour séparer produit et IA",
      "Architecture hybride Next.js (front) + FastAPI (IA)",
      "Row Level Security Supabase pour isolation des données",
      "Cache et limites d'usage avec Upstash Redis",
    ],
    results: [
      "Application publique vérifiée sur huntzenjobs.com",
      "600+ utilisateurs annoncés côté projet",
      "Flux paiement et portail client Stripe intégrés",
      "Infra Vercel + Railway + Supabase + Modal Labs",
      "Produit SaaS complet présenté avec capture réelle",
    ],
  },
  {
    name: "FlotteQ",
    description:
      "SaaS de fleet management multi-tenant avec applications séparées clients, partenaires et admin. RBAC 6 rôles, paiements Stripe Connect et déploiement Docker sur VPS OVH.",
    stack: [
      "NestJS",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Redis",
      "Stripe Connect",
      "Docker",
      "Docker Compose",
      "Nginx",
      "Let's Encrypt",
      "GitHub Actions",
      "VPS OVH",
    ],
    category: "SaaS",
    live: "https://flotteq.fr",
    featured: true,
    image: "/projects/flotteq-home.jpg",
    imageAlt:
      "Hero FlotteQ présentant la gestion de flotte, le bloc de présentation et les appels à l'action principaux.",
    role: "Tech Lead Fullstack",
    duration: "8 mois",
    year: "2024 → 2025",
    features: [
      "Architecture multi-tenant (1 base, isolation par tenant)",
      "Stripe Connect pour la facturation des partenaires",
      "RBAC 6 rôles et parcours séparés selon les profils",
      "Dashboard temps réel (véhicules, conducteurs, KPIs)",
      "Apps séparées client / interne / partenaire",
    ],
    challenges: [
      "Isolation stricte des données entre tenants",
      "Synchronisation temps réel multi-écran",
      "CI/CD multi-app (NestJS + 3 fronts React)",
      "Reverse proxy Nginx + SSL Let's Encrypt sur VPS",
    ],
    results: [
      "Architecture découpée en API NestJS et trois fronts React",
      "Déploiement Docker Compose sur VPS OVH Ubuntu",
      "Parcours multi-rôles documenté dans le dépôt local",
      "Capture authentique de l'application client disponible",
    ],
  },
  {
    name: "3W Digital",
    description:
      "Site vitrine de mon agence 3W Digital, orienté acquisition, services web et IA. Landing rapide, responsive, avec SEO technique et déploiement Vercel.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel", "SEO"],
    category: "Freelance",
    live: "https://3w-digital.fr",
    image: "/projects/3w-digital/01-hero-desktop.png",
    imageAlt:
      "Hero desktop du site 3W Digital avec le positionnement d'agence web et IA.",
    gallery: [
      {
        src: "/projects/3w-digital/01-hero-desktop.png",
        alt: "Hero desktop du site 3W Digital avec le positionnement d'agence web et IA.",
        label: "Hero",
      },
      {
        src: "/projects/3w-digital/03-services.png",
        alt: "Section services du site 3W Digital présentant les offres web et IA.",
        label: "Services",
      },
      {
        src: "/projects/3w-digital/05-contact.png",
        alt: "Section contact du site 3W Digital avec appel à l'action et formulaire.",
        label: "Contact",
      },
    ],
    captureStatus: "verified",
    role: "Freelance Frontend",
    duration: "1 mois",
    year: "2025",
    features: [
      "Landing page commerciale",
      "Sections services et contact",
      "SEO technique + métadonnées",
      "Navigation mobile responsive",
      "Déploiement continu sur Vercel",
    ],
    challenges: [
      "Rester léger et crédible pour une petite vitrine",
      "Conserver une navigation simple sur mobile",
    ],
    results: [
      "Site public disponible sur 3w-digital.fr",
      "Captures desktop authentiques intégrées",
      "Vitrine d'acquisition pour services web et IA",
      "Projet volontairement compact mais présenté avec preuves visuelles",
    ],
  },
  {
    name: "LocalCoder",
    description:
      "Agent de codage multi-LLM avec routage automatique entre modèles, chat, terminaux, monitoring du flow et interface technique dense.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Multi-LLM",
      "LLM Routing",
      "Agentic Workflow",
    ],
    category: "Freelance",
    image: "/projects/localcoder.jpg",
    imageAlt:
      "Interface LocalCoder affichant le chat, les terminaux, le routing flow et le monitoring d'un agent multi-LLM.",
    captureStatus: "verified",
    role: "Développeur fullstack",
    features: [
      "Chat central pour piloter les tâches",
      "Routage multi-LLM avec sélection automatique",
      "Vue terminaux, routing flow et monitoring",
      "Interface sombre optimisée pour les usages techniques",
      "Démo privée possible en live",
    ],
    challenges: [
      "Afficher plusieurs couches d'information sans surcharger l'écran",
      "Conserver une lecture claire du workflow agentique",
    ],
    results: [
      "Prototype visuel crédible d'un agent de codage moderne",
      "Preuve d'une UI technique dense mais lisible",
    ],
  },
  {
    name: "ShowroomBaby",
    description:
      "Marketplace mobile d'articles bébé. Design imposé par un designer, développement Flutter, intégration Laravel, stockage local SQLite et services Firebase.",
    stack: ["Flutter", "Dart", "Laravel", "PHP", "SQLite", "Firebase"],
    category: "Mobile",
    image: "/projects/showroombaby-app.png",
    imageAlt:
      "Application mobile ShowroomBaby sur iPhone 17 Pro affichant la page d'accueil, les catégories et la grille de produits.",
    video: "/projects/showroombaby-simulator.mp4",
    videoPoster: "/projects/showroombaby-app.png",
    captureStatus: "verified",
    role: "Développeur Mobile Fullstack",
    duration: "4 mois",
    year: "2024",
    features: [
      "Annonces avec photos + géolocalisation",
      "Catalogue mobile avec catégories et produits favoris",
      "Backend Laravel avec API REST",
      "Configuration Firebase pour les plateformes mobiles",
      "Développement et intégration à partir d'un design fourni",
    ],
    challenges: [
      "Connexion Flutter ↔ API Laravel en environnement local",
      "Gestion des assets produits via storage Laravel",
      "Diagnostic d'un backend de production Railway indisponible",
    ],
    results: [
      "Application lancée et capturée sur iPhone 17 Pro",
      "Capture et enregistrement d'écran authentiques disponibles",
    ],
  },
  {
    name: "SeneRentCar",
    description:
      "Plateforme de location de voitures au Sénégal avec catalogue, tunnel de réservation et back-office agence. Front Next.js, backend Laravel et base MySQL.",
    stack: ["Next.js", "TypeScript", "React", "Laravel", "PHP", "MySQL"],
    category: "Freelance",
    image: "/projects/senerentcar-platform.png",
    imageAlt:
      "Page d'accueil SeneRentCar présentant la recherche de véhicules et les offres de location.",
    captureStatus: "verified",
    role: "Freelance Fullstack",
    duration: "3 mois",
    year: "2024",
    features: [
      "Catalogue véhicules + disponibilités",
      "Tunnel de réservation + paiement local",
      "Back-office agence (flotte, contrats, clients)",
      "Multi-langue FR / EN",
    ],
    challenges: [
      "Intégration moyens de paiement africains",
      "Gestion offline-friendly pour zones à faible débit",
    ],
    results: [
      "Interface publique lancée et capturée localement",
      "Parcours de réservation présenté côté utilisateur",
    ],
  },
  {
    name: "RobLaude",
    description:
      "Robot autonome d'assistance aux personnes en situation de handicap, avec navigation autonome et supervision web temps réel pour la télémétrie et les missions.",
    stack: ["ROS2", "Python", "React", "TypeScript", "Node.js", "Jetson Nano"],
    category: "Académique",
    image: "/projects/roblaude-supervision.png",
    imageAlt:
      "Dashboard de supervision RobLaude avec télémétrie, état système et contrôles de mission.",
    captureStatus: "verified",
    role: "Dev embarqué + supervision web",
    duration: "5 mois",
    year: "2024",
    features: [
      "Pilotage ROS2 sur Jetson Nano",
      "Vision embarquée (détection + suivi)",
      "Interface web de supervision temps réel",
      "Téléopération + télémétrie",
      "Scénarios d'assistance : apporter un document ou récupérer un objet",
    ],
    challenges: [
      "Latence vidéo + commandes < 200 ms",
      "Pont ROS2 ↔ Web (WebSocket sécurisé)",
    ],
    results: [
      "Interface de supervision web capturée localement",
      "Projet académique démontrant embarqué, temps réel et frontend",
    ],
  },
];

export const moreProjects: Project[] = [];

export const projects: Project[] = [...verifiedProjects, ...moreProjects];

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Infra & Data"
  | "Déploiement"
  | "Paiement & Services"
  | "IA & Agents"
  | "Mobile"
  | "Outils";

export const skills: Record<SkillCategory, string[]> = {
  Frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Three.js",
    "React Three Fiber",
    "Accessibility",
    "Performance",
  ],
  Backend: ["NestJS", "FastAPI", "Node.js", "Laravel", "Python", "Strapi", "PHP"],
  "Infra & Data": [
    "Supabase",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Upstash Redis",
    "pgvector",
    "SQLite",
  ],
  Déploiement: [
    "Vercel",
    "Railway",
    "Modal Labs",
    "VPS OVH",
    "Docker",
    "Docker Compose",
    "Nginx",
    "SSL Let's Encrypt",
    "GitHub Actions",
  ],
  "Paiement & Services": [
    "Stripe",
    "Stripe Connect",
    "Resend",
    "Firebase",
    "Supabase Auth",
    "Supabase Storage",
  ],
  "IA & Agents": [
    "OpenAI",
    "Anthropic",
    "Groq",
    "LLM APIs",
    "Multi-LLM Routing",
    "Mastra",
    "RAG",
    "Embeddings",
    "Prompt Engineering",
  ],
  Mobile: ["React Native", "Expo", "Expo Go", "Flutter", "Dart", "Firebase"],
  Outils: ["Git", "GitHub", "Figma", "Claude Code", "Turborepo", "Agile/Scrum"],
};

export type Stat = { value: number; label: string; suffix?: string };

export const stats: Stat[] = [
  { value: 3, label: "alternances" },
  { value: 7, label: "projets vérifiés" },
  { value: 30, label: "technologies & services", suffix: "+" },
  { value: 2, label: "SaaS en production" },
];

import { siteConfig } from "./seo";

export const social = {
  github: siteConfig.links.github,
  linkedin: siteConfig.links.linkedin,
  email: siteConfig.email,
};

export const marqueeItems = [
  "Disponible pour Master 2026",
  "Tech Lead",
  "Full-Stack",
  "Next.js · React · TypeScript",
  "SaaS · IA · Mobile",
  "Architecture",
  "Motion · 3D · WebGL",
  "Stripe · Supabase · FastAPI",
  "Open to Opportunities",
];
