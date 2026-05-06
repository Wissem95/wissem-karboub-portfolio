# Portfolio — Wissem Karboub

🚀 **Live demo** : [portfolio-zeta-rose-10.vercel.app](https://portfolio-zeta-rose-10.vercel.app)

Portfolio personnel développé en Next.js 14, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, GSAP et Lenis.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** strict
- **Tailwind CSS** (dark mode uniquement, palette custom)
- **Framer Motion** — animations
- **React Three Fiber + Three.js** — particules 3D dans le hero
- **GSAP / scroll** — timeline d'expériences
- **Lenis** — smooth scroll global
- Polices : Syne, Inter, JetBrains Mono (Google Fonts via next/font)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx          # Polices + metadata SEO
  page.tsx            # Composition des sections
  globals.css         # Tailwind + curseur custom
components/
  Navbar.tsx          # Nav fixe avec backdrop blur
  Hero.tsx            # Particules 3D + animation lettre par lettre + typewriter
  About.tsx           # Présentation + compteurs animés
  Experience.tsx      # Timeline verticale animée au scroll
  Projects.tsx        # Grille avec filtre + hover 3D tilt
  Skills.tsx          # Catégories de tech avec hover stagger
  Contact.tsx         # Formulaire mailto + liens sociaux
  CustomCursor.tsx    # Curseur doré avec lag
  PageLoader.tsx      # Animation initiales WK
  ParticleBackground.tsx
  SmoothScroll.tsx    # Provider Lenis
lib/
  data.ts             # Expériences, projets, skills, stats
```

## Personnalisation

Tout le contenu se trouve dans [`lib/data.ts`](lib/data.ts). Les couleurs sont définies dans [`tailwind.config.ts`](tailwind.config.ts) :

| Token            | Valeur     |
| ---------------- | ---------- |
| `bg`             | `#0D0D0D`  |
| `sidebar`        | `#141414`  |
| `accent`         | `#C8B89A`  |
| `accent-dark`    | `#8B7355`  |
| `text`           | `#F5F3EE`  |
| `text-muted`     | `#BBBBBB`  |
| `card`           | `#1A1A1A`  |
| `border`         | `#2E2E2E`  |
