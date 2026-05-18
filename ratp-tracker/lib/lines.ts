import type { Network } from "./types";

/** Couleurs officielles des lignes de metro. */
const METRO_COLORS: Record<string, string> = {
  "1": "#FFCD00",
  "2": "#003CA6",
  "3": "#837902",
  "3bis": "#6EC4E8",
  "4": "#CF009E",
  "5": "#FF7E2E",
  "6": "#6ECA97",
  "7": "#FA9ABA",
  "7bis": "#6ECA97",
  "8": "#E19BDF",
  "9": "#B6BD00",
  "10": "#C9910D",
  "11": "#704B1C",
  "12": "#007852",
  "13": "#6EC4E8",
  "14": "#62259D",
};

/** Couleurs officielles des lignes de RER. */
const RER_COLORS: Record<string, string> = {
  A: "#E2231A",
  B: "#7BA3DC",
  C: "#FFCE00",
  D: "#00A88F",
  E: "#C04191",
};

/** Couleurs des principales lignes de tramway. */
const TRAM_COLORS: Record<string, string> = {
  T1: "#003CA6",
  T2: "#CF009E",
  T3A: "#FF7E2E",
  T3B: "#00A88F",
  T4: "#FF7E2E",
  T5: "#662483",
  T6: "#E2231A",
  T7: "#704B1C",
  T8: "#837902",
  T9: "#E2231A",
  T10: "#6ECA97",
  T11: "#B6BD00",
  T12: "#003CA6",
  T13: "#6EC4E8",
};

const NETWORK_FALLBACK: Record<Network, string> = {
  metro: "#2563eb",
  rer: "#e2231a",
  transilien: "#8a6d3b",
  tram: "#f7931e",
  bus: "#2c8eff",
  noctilien: "#1f2a44",
  autre: "#4b5563",
};

const NETWORK_LABEL: Record<Network, string> = {
  metro: "Metro",
  rer: "RER",
  transilien: "Transilien",
  tram: "Tram",
  bus: "Bus",
  noctilien: "Noctilien",
  autre: "Reseau",
};

/** Calcule une couleur de texte lisible (noir ou blanc) sur un fond donne. */
export function contrastText(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#ffffff";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  // Luminance perceptuelle (sRGB).
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#11151c" : "#ffffff";
}

/** Devine le reseau a partir d'un libelle libre ("RER A", "Metro 4", "T3a"...). */
export function detectNetwork(raw: string): Network {
  const s = raw.toLowerCase();
  if (/\brer\b/.test(s)) return "rer";
  if (/\b(metro|métro)\b/.test(s)) return "metro";
  if (/\b(tram|tramway)\b/.test(s) || /^t\d/.test(s)) return "tram";
  if (/\bnoctilien\b/.test(s) || /^n\d/.test(s)) return "noctilien";
  if (/\b(transilien|train)\b/.test(s) || /^[hjklpru]\b/.test(s)) return "transilien";
  if (/\bbus\b/.test(s)) return "bus";
  return "autre";
}

/** Normalise un code de ligne ("ligne 4" -> "4", "rer a" -> "A"). */
export function normalizeLineCode(raw: string): string {
  return raw
    .replace(/ligne/gi, "")
    .replace(/m[eé]tro/gi, "")
    .replace(/\brer\b/gi, "")
    .replace(/tramway|tram/gi, "")
    .replace(/transilien|train/gi, "")
    .replace(/noctilien/gi, "")
    .replace(/\bbus\b/gi, "")
    .trim()
    .toUpperCase();
}

export interface LineMeta {
  network: Network;
  code: string;
  label: string;
  color: string;
  textColor: string;
}

/** Resout les metadonnees d'affichage d'une ligne. */
export function getLineMeta(network: Network, rawCode: string): LineMeta {
  const code = normalizeLineCode(rawCode) || rawCode.trim().toUpperCase();
  let color = NETWORK_FALLBACK[network];

  if (network === "metro") {
    color = METRO_COLORS[code.toLowerCase()] ?? color;
  } else if (network === "rer") {
    color = RER_COLORS[code] ?? color;
  } else if (network === "tram") {
    color = TRAM_COLORS[code.replace(/\s/g, "")] ?? color;
  }

  const label = `${NETWORK_LABEL[network]} ${code}`.trim();
  return { network, code, label, color, textColor: contrastText(color) };
}

export function networkLabel(network: Network): string {
  return NETWORK_LABEL[network];
}
