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
  role?: string;
  duration?: string;
  year?: string;
  features?: string[];
  challenges?: string[];
  results?: string[];
};

const UNSPLASH = (keywords: string) =>
  `https://source.unsplash.com/featured/1200x1500/?${encodeURIComponent(keywords)}`;

export const projects: Project[] = [
  {
    name: "HuntZenJobs",
    description:
      "Plateforme B2C d'emploi avec matching IA. Recommandations personnalisées, paiement Stripe, scoring sémantique via Groq.",
    stack: ["Next.js", "FastAPI", "Supabase", "Groq", "Stripe"],
    category: "SaaS",
    live: "https://jobs.huntzen.co",
    featured: true,
    image: UNSPLASH("career,office,team,laptop"),
    role: "Tech Lead Fullstack",
    duration: "6 mois",
    year: "2025",
    features: [
      "Matching sémantique CV ↔ offres via embeddings",
      "Recommandations personnalisées en temps réel",
      "Paiement abonnement Stripe + portail client",
      "Tableau de bord recruteur + candidat",
    ],
    challenges: [
      "Scoring sémantique low-latency sur Groq LPU",
      "Architecture hybride Next.js (front) + FastAPI (IA)",
      "Row Level Security Supabase pour isolation des données",
    ],
    results: [
      "Time-to-match < 800 ms côté API",
      "Lighthouse 95+ sur les pages publiques",
      "Mise en production en 6 mois solo lead",
    ],
  },
  {
    name: "FlotteQ",
    description:
      "SaaS Fleet Management multi-tenant. Gestion de flotte, facturation Stripe Connect, dashboard temps réel.",
    stack: ["NestJS", "React", "Stripe Connect", "Docker"],
    category: "SaaS",
    featured: true,
    image: UNSPLASH("fleet,truck,logistics,dashboard"),
    role: "Tech Lead Fullstack",
    duration: "8 mois",
    year: "2024 → 2025",
    features: [
      "Architecture multi-tenant (1 base, isolation par tenant)",
      "Stripe Connect pour la facturation des partenaires",
      "Dashboard temps réel (véhicules, conducteurs, KPIs)",
      "Apps séparées client / interne / partenaire",
    ],
    challenges: [
      "Isolation stricte des données entre tenants",
      "Synchronisation temps réel multi-écran",
      "CI/CD multi-app (NestJS + 3 fronts React)",
    ],
    results: [
      "3 apps déployées en production",
      "Pipelines CI/CD < 5 min par app",
      "Onboarding nouveau tenant en < 1 h",
    ],
  },
  {
    name: "ShowroomBaby",
    description:
      "Marketplace mobile peer-to-peer dédiée aux articles bébé d'occasion. Chat, paiement, modération.",
    stack: ["Flutter", "Firebase"],
    category: "Mobile",
    image: UNSPLASH("baby,kids,nursery,marketplace"),
    role: "Développeur Mobile Fullstack",
    duration: "4 mois",
    year: "2024",
    features: [
      "Annonces avec photos + géolocalisation",
      "Chat temps réel acheteur ↔ vendeur",
      "Paiement intégré + escrow",
      "Modération de contenu et signalements",
    ],
    challenges: [
      "Optimisation images + uploads sur mobile",
      "Notifications push fiables iOS + Android",
      "Modération scalable avec peu de moyens",
    ],
    results: [
      "App publiée iOS + Android",
      "Temps de chargement feed < 1 s",
    ],
  },
  {
    name: "SeneRentCar",
    description:
      "Plateforme de location de voitures au Sénégal. Réservation, paiement local, back-office agence.",
    stack: ["Next.js", "Laravel", "MySQL"],
    category: "Freelance",
    image: UNSPLASH("car,rental,road,africa"),
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
      "Livraison clé en main en 3 mois",
      "Back-office utilisé quotidiennement par l'agence",
    ],
  },
  {
    name: "ComoRide",
    description:
      "Application taxi aux Comores opérée via WhatsApp. Bot conversationnel et dispatch automatique.",
    stack: ["React", "Node.js", "WhatsApp API"],
    category: "Freelance",
    image: UNSPLASH("taxi,city,night,driver"),
    role: "Freelance Fullstack",
    duration: "2 mois",
    year: "2023",
    features: [
      "Bot WhatsApp pour commander un taxi",
      "Dispatch automatique vers le chauffeur le plus proche",
      "Suivi de course + historique",
      "Tableau de bord opérateur",
    ],
    challenges: [
      "Pas d'app à installer côté client (UX WhatsApp)",
      "Fiabilité dans un contexte réseau instable",
    ],
    results: [
      "Service opérationnel sur tout l'archipel",
      "Dispatch < 30 s par course",
    ],
  },
  {
    name: "Mentarys",
    description:
      "Site vitrine premium dark mode pour cabinet de conseil. Animations Framer Motion, performances 95+ Lighthouse.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    category: "Freelance",
    image: UNSPLASH("consulting,office,minimal,dark"),
    role: "Freelance Frontend",
    duration: "1 mois",
    year: "2025",
    features: [
      "Design premium dark mode sur-mesure",
      "Animations Framer Motion fluides",
      "SEO technique + Open Graph dynamiques",
      "Formulaire contact + tracking",
    ],
    challenges: [
      "Maintenir 95+ Lighthouse avec animations lourdes",
      "Direction artistique forte mais sobre",
    ],
    results: [
      "Lighthouse 95+ sur toutes les pages",
      "Livraison en 1 mois",
    ],
  },
  {
    name: "EcoComfort",
    description:
      "Solution IoT de monitoring énergétique en temps réel. Capteurs RuuviTag, MQTT, dashboard analytique.",
    stack: ["Laravel", "React", "MQTT", "RuuviTag"],
    category: "Académique",
    image: UNSPLASH("iot,sensor,energy,electronics"),
    role: "Lead Tech projet étudiant",
    duration: "4 mois",
    year: "2023",
    features: [
      "Capteurs RuuviTag (température, humidité, CO₂)",
      "Broker MQTT + ingestion temps réel",
      "Dashboard analytique React + alertes",
      "Historisation + export CSV",
    ],
    challenges: [
      "Stabilité de la couche MQTT en continu",
      "Visualisation de séries temporelles denses",
    ],
    results: [
      "Pilote déployé sur site réel",
      "Données collectées en continu sur 4 mois",
    ],
  },
  {
    name: "RobLaude",
    description:
      "Robot autonome avec vision embarquée. Pilotage ROS2 sur Jetson Nano, interface de supervision web.",
    stack: ["ROS2", "Node.js", "React", "Jetson Nano"],
    category: "Académique",
    image: UNSPLASH("robot,ai,robotics,futuristic"),
    role: "Dev embarqué + supervision web",
    duration: "5 mois",
    year: "2024",
    features: [
      "Pilotage ROS2 sur Jetson Nano",
      "Vision embarquée (détection + suivi)",
      "Interface web de supervision temps réel",
      "Téléopération + télémétrie",
    ],
    challenges: [
      "Latence vidéo + commandes < 200 ms",
      "Pont ROS2 ↔ Web (WebSocket sécurisé)",
    ],
    results: [
      "Robot autonome opérationnel en démo",
      "Stack reproductible sur d'autres châssis",
    ],
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
