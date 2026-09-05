# Portfolio Audit Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le portfolio en vitrine technique crédible en corrigeant d'abord les problèmes bloquants, puis les améliorations premium, puis une refonte ciblée des zones les plus coûteuses.

**Architecture:** Les corrections restent dans le portfolio Next.js existant. Les données de projets restent centralisées dans `lib/data.ts`, les captures authentiques sont servies depuis `public/projects`, et les composants existants sont conservés sauf quand l'accessibilité ou la performance exige un ajustement.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Lenis, Three.js / React Three Fiber, scripts Node sans nouvelle dépendance.

## Global Constraints

- Toujours répondre en français.
- Ne jamais lancer de commit ni créer de pull request directement.
- Ne pas modifier `tsconfig.tsbuildinfo`, déjà modifié avant cette intervention.
- Ne pas ajouter de dépendance si les dépendances existantes suffisent.
- Utiliser uniquement de vraies captures d'applications pour les projets.
- Ne pas inventer de métriques, d'utilisateurs, de fonctionnalités ni de visuels produit.
- Vérifier lint, TypeScript, build, smoke tests et contrôles visuels avant clôture.

---

### Task 1: Garde-fous De Crédibilité

**Files:**
- Create: `scripts/portfolio-smoke-test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: fichiers source existants.
- Produces: commande `npm run test:portfolio`.

- [ ] **Step 1: Write the failing test**

Create `scripts/portfolio-smoke-test.mjs` with assertions that currently fail because the code still uses `picsum.photos`, the old HuntZen URL, raw project images, card role misuse and fake contact success.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:portfolio`
Expected: FAIL with at least one message mentioning `picsum.photos`.

- [ ] **Step 3: Keep the test minimal**

The script must use only Node built-ins and must not require Jest, Vitest or Playwright.

- [ ] **Step 4: Use it as regression gate**

Run it after every lot that touches project data, images, contact, modals or reduced motion.

### Task 2: Lot A - Bugs Et Crédibilité

**Files:**
- Modify: `lib/data.ts`
- Modify: `components/Contact.tsx`
- Modify: `components/Projects.tsx`
- Modify: `components/ProjectModal.tsx`
- Modify: `next.config.mjs`

**Interfaces:**
- Consumes: authentic image paths under `/projects/*`.
- Produces: project records with local images and precise `imageAlt` text.

- [ ] **Step 1: Replace random project images**

Remove the `IMG()` helper and replace every project image with a local `/projects/<project>.png` or `/projects/<project>.jpg` path backed by a real capture.

- [ ] **Step 2: Correct external URLs**

Set HuntZenJobs live URL to `https://huntzenjobs.com`.

- [ ] **Step 3: Remove unverifiable claims**

Rewrite results that cannot be proven from the repository or live applications into factual delivery statements.

- [ ] **Step 4: Fix contact feedback**

Change the mailto form so it does not claim that a message was sent after opening the local mail client.

- [ ] **Step 5: Fix project image rendering and card semantics**

Use `next/image` for project images and remove invalid `article role="button"` semantics by adding an explicit detail button.

- [ ] **Step 6: Verify**

Run: `npm run test:portfolio`, `npm run lint`, `npx tsc --noEmit --incremental false`.

### Task 3: Lot A - Captures Authentiques

**Files:**
- Create: `public/projects/huntzenjobs-desktop.png`
- Create: `public/projects/flotteq-dashboard.png`
- Create: `public/projects/showroombaby-app.png`
- Create: `public/projects/senerentcar-platform.png`
- Create: `public/projects/comoride-dashboard.png`
- Create: `public/projects/mentarys-site.jpg`
- Create: `public/projects/ecocomfort-dashboard.png`
- Create: `public/projects/roblaude-supervision.png`

**Interfaces:**
- Consumes: local app sources and existing screenshots from sibling project folders.
- Produces: real images referenced by `lib/data.ts`.

- [ ] **Step 1: Reuse existing verified screenshots first**

Copy existing screenshots for HuntZenJobs and any project with a real app capture already present.

- [ ] **Step 2: Launch local apps where needed**

Run local frontends only when their existing source and dependencies allow it without destructive commands.

- [ ] **Step 3: Capture desktop and mobile where useful**

Use Playwright for browser apps; use existing mobile captures/assets only if they are actual app screens.

- [ ] **Step 4: Refuse fake replacements**

If a project cannot be captured, mark it as needing capture in content and do not use stock, random, generated or misleading UI.

### Task 4: Lot B - UX, Accessibilité Et Études De Cas

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/ProjectModal.tsx`
- Modify: `components/Projects.tsx`
- Modify: `components/Contact.tsx`
- Modify: `app/globals.css`
- Modify: `lib/data.ts`

**Interfaces:**
- Consumes: verified project metadata.
- Produces: faster first impression, keyboard-safe modal, clearer project proof.

- [ ] **Step 1: Make the hero readable immediately**

Remove the delayed typewriter dependency for identity and role. Keep motion decorative, not required for comprehension.

- [ ] **Step 2: Add reduced-motion behavior**

Disable non-essential motion, cursor trail, smooth scroll and WebGL decoration when `prefers-reduced-motion: reduce` is active.

- [ ] **Step 3: Improve project proof**

Use concise case-study sections: contexte, rôle, décisions techniques, résultat vérifiable.

- [ ] **Step 4: Strengthen modal keyboard behavior**

Move focus into the modal, close with Escape, and keep focus cycling inside while open.

- [ ] **Step 5: Verify responsive**

Retest 320x568, 390x844, 768x1024, 1440x900 and 1920x1080 before expanding to all requested viewports.

### Task 5: Lot C Ciblé - Performance Et Architecture Client

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/Hero.tsx`
- Modify: `components/SpaceScene.tsx`
- Modify: `components/MeshGradient.tsx`
- Modify: `components/SmoothScroll.tsx`
- Modify: `components/CursorTrail.tsx`

**Interfaces:**
- Consumes: existing animation components.
- Produces: lower mobile main-thread cost without losing the visual identity on capable desktop devices.

- [ ] **Step 1: Remove the blocking 2.2s loader**

Do not block scrolling or content visibility for an artificial delay.

- [ ] **Step 2: Gate expensive WebGL**

Do not mount heavy canvases on mobile, reduced-motion, or before first content is visible.

- [ ] **Step 3: Simplify cursor listeners**

Avoid re-subscribing global listeners whenever cursor visibility changes.

- [ ] **Step 4: Verify Lighthouse before/after**

Measure mobile and desktop production-like builds and record LCP, TBT, main-thread work and accessibility.

### Task 6: Final Verification

**Files:**
- No new feature files unless required by fixes found during verification.

**Interfaces:**
- Consumes: implemented lots A, B and C.
- Produces: final before/after report.

- [ ] **Step 1: Run static gates**

Run: `npm run test:portfolio`, `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build`.

- [ ] **Step 2: Run browser checks**

Use Playwright to test navigation, project modal, contact form, keyboard focus, reduced motion and all requested viewports.

- [ ] **Step 3: Run Lighthouse**

Measure local production build mobile and desktop. Compare against audited baseline.

- [ ] **Step 4: Report remaining risks**

List any project whose real capture, URL, claim or deployment status remains unresolved.
