import type { Disruption, Network, Severity } from "../types";
import { getLineMeta } from "../lines";

/**
 * Jeu de donnees de demonstration. Utilise uniquement lorsque ni l'API
 * officielle ni le scraping ne renvoient de resultat, afin que le site
 * reste fonctionnel et lisible. Les horaires sont calcules par rapport
 * a l'instant courant pour rester credibles.
 */
interface Seed {
  network: Network;
  code: string;
  title: string;
  cause: string;
  message: string;
  severity: Severity;
  effect: string;
  startMinAgo: number;
  endInMin: number | null;
  updatedMinAgo: number;
}

const SEEDS: Seed[] = [
  {
    network: "metro",
    code: "4",
    title: "Trafic interrompu entre Chatelet et Montparnasse-Bienvenue",
    cause: "Colis suspect",
    message:
      "En raison de la decouverte d'un colis suspect a la station Les Halles, le trafic est interrompu entre Chatelet et Montparnasse-Bienvenue. Intervention en cours, reprise estimee dans l'heure.",
    severity: "critical",
    effect: "Trafic interrompu",
    startMinAgo: 38,
    endInMin: 35,
    updatedMinAgo: 6,
  },
  {
    network: "rer",
    code: "A",
    title: "Retards importants sur l'ensemble de la ligne",
    cause: "Incident technique",
    message:
      "Un incident technique sur un train a Vincennes entraine des retards pouvant atteindre 20 minutes sur l'ensemble de la ligne. Le trafic reprend progressivement.",
    severity: "major",
    effect: "Retards importants",
    startMinAgo: 72,
    endInMin: null,
    updatedMinAgo: 11,
  },
  {
    network: "rer",
    code: "B",
    title: "Retards entre Gare du Nord et Aeroport CDG",
    cause: "Incident voyageur",
    message:
      "A la suite d'un incident voyageur a la gare du Nord, le trafic est ralenti en direction de l'aeroport Charles-de-Gaulle. Prevoir un temps de parcours allonge.",
    severity: "major",
    effect: "Retards",
    startMinAgo: 24,
    endInMin: 20,
    updatedMinAgo: 4,
  },
  {
    network: "metro",
    code: "13",
    title: "Service reduit aux heures de pointe",
    cause: "Forte affluence",
    message:
      "En raison d'une forte affluence, des mesures de regulation sont mises en place. Le temps d'attente entre deux rames est allonge sur la branche Saint-Denis.",
    severity: "minor",
    effect: "Service reduit",
    startMinAgo: 95,
    endInMin: 60,
    updatedMinAgo: 14,
  },
  {
    network: "tram",
    code: "T3a",
    title: "Itineraire devie entre Porte d'Italie et Porte de Choisy",
    cause: "Travaux",
    message:
      "Des travaux de voirie imposent une deviation. Une station est temporairement non desservie, un cheminement pieton est balise.",
    severity: "minor",
    effect: "Itineraire devie",
    startMinAgo: 210,
    endInMin: 180,
    updatedMinAgo: 33,
  },
  {
    network: "metro",
    code: "9",
    title: "Trafic perturbe en direction de Mairie de Montreuil",
    cause: "Incident technique",
    message:
      "Un incident d'exploitation perturbe le trafic. Des trains peuvent etre supprimes ou limites a Republique. Retour a la normale estime sous 30 minutes.",
    severity: "minor",
    effect: "Trafic perturbe",
    startMinAgo: 17,
    endInMin: 25,
    updatedMinAgo: 3,
  },
  {
    network: "bus",
    code: "95",
    title: "Deviation entre Montparnasse et Porte de Vanves",
    cause: "Travaux",
    message:
      "En raison de travaux, plusieurs arrets sont reportes ou non desservis. Consultez l'affichage aux points d'arret concernes.",
    severity: "info",
    effect: "Deviation",
    startMinAgo: 320,
    endInMin: null,
    updatedMinAgo: 52,
  },
  {
    network: "metro",
    code: "1",
    title: "Travaux de nuit : fermeture anticipee a 23h30",
    cause: "Travaux",
    message:
      "Des travaux de modernisation entrainent une fermeture anticipee de la ligne. Un service de bus de substitution est mis en place en fin de service.",
    severity: "info",
    effect: "Information travaux",
    startMinAgo: 5,
    endInMin: null,
    updatedMinAgo: 5,
  },
];

export function getDemoDisruptions(): Disruption[] {
  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();

  return SEEDS.map((seed, index) => {
    const meta = getLineMeta(seed.network, seed.code);
    return {
      id: `demo:${index}:${seed.network}:${seed.code}`,
      network: seed.network,
      line: meta.code,
      lineLabel: meta.label,
      lineColor: meta.color,
      lineTextColor: meta.textColor,
      title: seed.title,
      cause: seed.cause,
      message: seed.message,
      severity: seed.severity,
      effect: seed.effect,
      startTime: iso(now - seed.startMinAgo * 60000),
      endTime: seed.endInMin === null ? null : iso(now + seed.endInMin * 60000),
      updatedAt: iso(now - seed.updatedMinAgo * 60000),
      source: "demo",
    };
  });
}
