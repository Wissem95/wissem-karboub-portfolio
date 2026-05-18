import type { Severity } from "./types";

/** Ordre de gravite, du plus grave au plus benin. */
const RANK: Record<Severity, number> = {
  critical: 0,
  major: 1,
  minor: 2,
  info: 3,
  normal: 4,
};

export function severityRank(s: Severity): number {
  return RANK[s];
}

export function severityLabel(s: Severity): string {
  switch (s) {
    case "critical":
      return "Trafic interrompu";
    case "major":
      return "Fortement perturbe";
    case "minor":
      return "Perturbe";
    case "info":
      return "Information";
    default:
      return "Trafic normal";
  }
}

/** Couleur d'accent associee a un niveau de gravite. */
export function severityColor(s: Severity): string {
  switch (s) {
    case "critical":
      return "#ef4444";
    case "major":
      return "#f97316";
    case "minor":
      return "#f59e0b";
    case "info":
      return "#3b82f6";
    default:
      return "#22c55e";
  }
}

/**
 * Traduit un "effect" Navitia (API IDFM) en niveau de gravite + libelle FR.
 */
export function fromNavitiaEffect(effect: string): {
  severity: Severity;
  effect: string;
} {
  switch (effect) {
    case "NO_SERVICE":
      return { severity: "critical", effect: "Trafic interrompu" };
    case "SIGNIFICANT_DELAYS":
      return { severity: "major", effect: "Retards importants" };
    case "REDUCED_SERVICE":
      return { severity: "major", effect: "Service reduit" };
    case "DETOUR":
      return { severity: "minor", effect: "Itineraire devie" };
    case "MODIFIED_SERVICE":
      return { severity: "minor", effect: "Service modifie" };
    case "ADDITIONAL_SERVICE":
      return { severity: "info", effect: "Service renforce" };
    case "STOP_MOVED":
      return { severity: "minor", effect: "Arret deplace" };
    case "OTHER_EFFECT":
    case "UNKNOWN_EFFECT":
      return { severity: "info", effect: "Perturbation" };
    default:
      return { severity: "minor", effect: "Perturbation" };
  }
}

/** Deduit une gravite a partir d'un "slug" de statut RATP (scraping). */
export function fromRatpSlug(slug: string): Severity {
  const s = slug.toLowerCase();
  if (/critical|interrompu|critique/.test(s)) return "critical";
  if (/alerte|perturb|delayed|retard/.test(s)) return "major";
  if (/travaux|works/.test(s)) return "minor";
  if (/normal|ok/.test(s)) return "normal";
  return "minor";
}
