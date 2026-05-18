export type Network =
  | "metro"
  | "rer"
  | "transilien"
  | "tram"
  | "bus"
  | "noctilien"
  | "autre";

export type Severity = "normal" | "info" | "minor" | "major" | "critical";

export type SourceId = "idfm" | "scrape" | "demo";

export interface Disruption {
  /** Identifiant stable (sert au dedoublonnage et aux clefs React). */
  id: string;
  network: Network;
  /** Code court de la ligne : "4", "A", "T3a", "95". */
  line: string;
  /** Libelle affichable : "Metro 4", "RER A", "Tram T3a". */
  lineLabel: string;
  lineColor: string;
  lineTextColor: string;
  /** Titre court de la perturbation. */
  title: string;
  /** Cause identifiee : "Incident technique", "Travaux"... */
  cause: string;
  /** Message detaille destine aux voyageurs. */
  message: string;
  severity: Severity;
  /** Effet sur le trafic : "Retards", "Trafic interrompu"... */
  effect: string;
  /** Debut de la perturbation (ISO 8601) ou null. */
  startTime: string | null;
  /** Fin prevue (ISO 8601) ou null si indeterminee. */
  endTime: string | null;
  /** Derniere mise a jour de l'info (ISO 8601) ou null. */
  updatedAt: string | null;
  source: SourceId;
}

export interface SourceStatus {
  ok: boolean;
  count: number;
}

/** Resultat brut renvoye par une source de donnees (API ou scraping). */
export interface SourceResult {
  /** true si la source a repondu et a pu etre exploitee. */
  ok: boolean;
  disruptions: Disruption[];
}

export interface TraficResult {
  /** Horodatage de la collecte (ISO 8601). */
  generatedAt: string;
  sources: Record<SourceId, SourceStatus>;
  /** Journal d'execution du bot, affiche dans l'interface. */
  log: string[];
  count: number;
  disruptions: Disruption[];
}
