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
  image: string;
  accent?: string;
};

const PIC = (seed: string) => `https://picsum.photos/seed/${seed}/1200/1500`;

export const projects: Project[] = [
  {
    name: "HuntZenJobs",
    description:
      "Plateforme B2C d'emploi avec matching IA. Recommandations personnalisées, paiement Stripe, scoring sémantique via Groq.",
    stack: ["Next.js", "FastAPI", "Supabase", "Groq", "Stripe"],
    category: "SaaS",
    live: "https://jobs.huntzen.co",
    featured: true,
    image: PIC("huntzenjobs-2026"),
  },
  {
    name: "FlotteQ",
    description:
      "SaaS Fleet Management multi-tenant. Gestion de flotte, facturation Stripe Connect, dashboard temps réel.",
    stack: ["NestJS", "React", "Stripe Connect", "Docker"],
    category: "SaaS",
    featured: true,
    image: PIC("flotteq-fleet-2026"),
  },
  {
    name: "ShowroomBaby",
    description:
      "Marketplace mobile peer-to-peer dédiée aux articles bébé d'occasion. Chat, paiement, modération.",
    stack: ["Flutter", "Firebase"],
    category: "Mobile",
    image: PIC("showroombaby-mobile"),
  },
  {
    name: "SeneRentCar",
    description:
      "Plateforme de location de voitures au Sénégal. Réservation, paiement local, back-office agence.",
    stack: ["Next.js", "Laravel", "MySQL"],
    category: "Freelance",
    image: PIC("senerentcar-dakar"),
  },
  {
    name: "ComoRide",
    description:
      "Application taxi aux Comores opérée via WhatsApp. Bot conversationnel et dispatch automatique.",
    stack: ["React", "Node.js", "WhatsApp API"],
    category: "Freelance",
    image: PIC("comoride-taxi"),
  },
  {
    name: "Mentarys",
    description:
      "Site vitrine premium dark mode pour cabinet de conseil. Animations Framer Motion, performances 95+ Lighthouse.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    category: "Freelance",
    image: PIC("mentarys-conseil"),
  },
  {
    name: "EcoComfort",
    description:
      "Solution IoT de monitoring énergétique en temps réel. Capteurs RuuviTag, MQTT, dashboard analytique.",
    stack: ["Laravel", "React", "MQTT", "RuuviTag"],
    category: "Académique",
    image: PIC("ecocomfort-iot"),
  },
  {
    name: "RobLaude",
    description:
      "Robot autonome avec vision embarquée. Pilotage ROS2 sur Jetson Nano, interface de supervision web.",
    stack: ["ROS2", "Node.js", "React", "Jetson Nano"],
    category: "Académique",
    image: PIC("roblaude-robot"),
  },
];

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Infra & Data"
  | "Paiement & IA"
  | "Mobile"
  | "Outils";

export const skills: Record<SkillCategory, string[]> = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind"],
  Backend: ["NestJS", "FastAPI", "Node.js", "Laravel", "Python", "Strapi", "PHP"],
  "Infra & Data": [
    "Supabase",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "GitHub Actions",
    "Vercel",
  ],
  "Paiement & IA": [
    "Stripe",
    "Stripe Connect",
    "Groq",
    "Modal Labs",
    "OpenAI API",
  ],
  Mobile: ["React Native", "Expo", "Expo Go", "Flutter", "Firebase"],
  Outils: ["Git", "Figma", "Agile/Scrum"],
};

export type Stat = { value: number; label: string; suffix?: string };

export const stats: Stat[] = [
  { value: 3, label: "alternances" },
  { value: 7, label: "projets livrés", suffix: "+" },
  { value: 10, label: "technologies", suffix: "+" },
  { value: 1, label: "SaaS en production" },
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
  "Disney Ready",
  "SaaS · IA · Mobile",
  "Architecture",
  "Motion · 3D · WebGL",
  "Stripe · Supabase · FastAPI",
  "Open to Opportunities",
];
