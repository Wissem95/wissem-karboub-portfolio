# RATP Trafic — Traqueur de retards & incidents

Mini-site qui suit **en temps reel les retards, incidents et perturbations**
du reseau RATP / Ile-de-France Mobilites (metro, RER, Transilien, tram, bus),
avec les **horaires** et les **causes**.

> Projet **independant** : il n'a aucun lien avec le portfolio. Il vit dans son
> propre dossier, possede son propre `package.json` et se deploie separement.

## Comment ca marche

Un « bot » cote serveur (route `app/api/trafic/route.ts`) interroge a chaque
requete **deux sources** en parallele puis fusionne les resultats :

1. **API officielle IDFM** — plateforme PRIM (Navitia `disruptions`). Donnees
   fiables avec causes et horaires. Necessite une cle gratuite.
2. **Scraping de l'info-trafic publique** — endpoint JSON public puis, en repli,
   extraction du JSON embarque dans `ratp.fr/infos-trafic`. Aucune cle requise.

Si les deux sources sont injoignables, le site bascule automatiquement sur un
**jeu de donnees de demonstration** (clairement signale dans l'interface) pour
rester fonctionnel.

L'interface rafraichit les donnees toutes les 60 s, affiche le **journal du
bot**, l'etat des sources, des statistiques et permet de filtrer par reseau
ou par mot-cle.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Aucune dependance runtime hors React/Next

## Demarrage local

```bash
cd ratp-tracker
npm install
cp .env.example .env.local   # optionnel : ajouter la cle IDFM
npm run dev
```

Ouvrir http://localhost:3000

Sans cle ni acces reseau, le site affiche les donnees de demonstration.

## Variable d'environnement

| Variable               | Role                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `IDFM_API_KEY`         | Cle de l'API IDFM (PRIM). Sans elle, seul le scraping sert.  |
| `IDFM_DISRUPTIONS_URL` | (Optionnel) URL de l'endpoint « disruptions ».              |
| `RATP_TRAFFIC_URL`     | (Optionnel) Page d'info-trafic scrappee en repli.           |

### Obtenir une cle IDFM (gratuit)

1. Creer un compte sur https://prim.iledefrance-mobilites.fr/
2. Generer une cle dans « Mes jetons d'authentification ».
3. La renseigner dans `IDFM_API_KEY`.

## Deploiement (Vercel)

Ce dossier est un projet a part entiere :

1. Sur Vercel, « New Project » sur ce depot.
2. Definir **Root Directory** = `ratp-tracker`.
3. Ajouter la variable `IDFM_API_KEY` (recommande).
4. Deployer. Le scraping et l'API tournent cote serveur, sans souci de CORS.

## Structure

```
app/
  api/trafic/route.ts   # le bot : agrege les sources et renvoie le JSON
  page.tsx              # tableau de bord (client)
  layout.tsx, globals.css
components/
  BotConsole, SourceBadges, NetworkFilter, DisruptionCard
lib/
  aggregate.ts          # orchestration + fusion + tri
  sources/idfm.ts       # API officielle IDFM (PRIM / Navitia)
  sources/scrape.ts     # scraping info-trafic
  sources/demo.ts       # donnees de demonstration
  lines.ts, severity.ts, cause.ts, format.ts, http.ts, types.ts
```
