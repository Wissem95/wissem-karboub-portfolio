import type { Disruption, Network, SourceResult } from "../types";
import { getLineMeta } from "../lines";
import { fromNavitiaEffect } from "../severity";
import { fetchWithTimeout, stripHtml } from "../http";
import { inferCause, errLabel } from "../cause";

/**
 * Source officielle : API Ile-de-France Mobilites (plateforme PRIM),
 * via le proxy Navitia "disruptions". Necessite une cle (IDFM_API_KEY).
 */
const DEFAULT_URL =
  "https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/coverage/fr-idf/disruptions";

interface NavLine {
  name?: string;
  code?: string;
  color?: string;
  commercial_mode?: { name?: string };
}
interface NavPtObject {
  embedded_type?: string;
  name?: string;
  line?: NavLine;
  route?: { line?: NavLine };
}
interface NavDisruption {
  id?: string;
  disruption_id?: string;
  status?: string;
  cause?: string;
  severity?: { name?: string; effect?: string; color?: string };
  application_periods?: { begin?: string; end?: string }[];
  messages?: { text?: string }[];
  impacted_objects?: { pt_object?: NavPtObject }[];
  updated_at?: string;
}

/** Convertit une date Navitia ("20260518T080000", heure de Paris) en ISO 8601. */
function navitiaDateToISO(value?: string): string | null {
  if (!value) return null;
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/.exec(value);
  if (!m) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  const [, y, mo, da, h, mi, se] = m;
  // L'heure est exprimee en heure locale de Paris : on calcule le decalage
  // reel (gere l'heure d'ete) pour obtenir l'instant UTC exact.
  const naive = Date.UTC(+y, +mo - 1, +da, +h, +mi, +se);
  const offset = parisOffsetMs(new Date(naive));
  return new Date(naive - offset).toISOString();
}

/** Decalage Europe/Paris (ms) pour un instant donne. */
function parisOffsetMs(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const p: Record<string, string> = {};
  for (const part of parts) p[part.type] = part.value;
  const asUTC = Date.UTC(
    +p.year,
    +p.month - 1,
    +p.day,
    +p.hour === 24 ? 0 : +p.hour,
    +p.minute,
    +p.second,
  );
  return asUTC - date.getTime();
}

function modeToNetwork(mode?: string): Network {
  const s = (mode ?? "").toLowerCase();
  if (s.includes("rer")) return "rer";
  if (s.includes("metro") || s.includes("métro")) return "metro";
  if (s.includes("tram")) return "tram";
  if (s.includes("noctilien")) return "noctilien";
  if (s.includes("train") || s.includes("transilien")) return "transilien";
  if (s.includes("bus")) return "bus";
  return "autre";
}

function lineOf(obj?: NavPtObject): NavLine | undefined {
  if (!obj) return undefined;
  if (obj.line) return obj.line;
  if (obj.route?.line) return obj.route.line;
  return undefined;
}

function buildTitle(message: string, effect: string): string {
  if (!message) return effect;
  const sentence = message.split(/(?<=[.!?])\s/)[0] ?? message;
  return sentence.length > 110 ? `${sentence.slice(0, 107)}...` : sentence;
}

function parseNavitia(data: unknown): Disruption[] {
  const disruptions = (data as { disruptions?: NavDisruption[] })?.disruptions;
  if (!Array.isArray(disruptions)) return [];
  const out: Disruption[] = [];

  for (const d of disruptions) {
    if (d.status === "past") continue;

    const { severity, effect } = fromNavitiaEffect(d.severity?.effect ?? "");
    const message = stripHtml(
      (d.messages ?? [])
        .map((m) => m.text ?? "")
        .filter(Boolean)
        .join(" "),
    );
    const period = d.application_periods?.[0];
    const cause =
      (d.cause && d.cause.trim()) ||
      inferCause(message) ||
      "Cause non communiquee";

    const seenLines = new Set<string>();
    for (const imp of d.impacted_objects ?? []) {
      const line = lineOf(imp.pt_object);
      if (!line) continue;
      const code = (line.code || line.name || "").trim();
      if (!code) continue;

      const network = modeToNetwork(line.commercial_mode?.name);
      const dedupeKey = `${network}:${code}`;
      if (seenLines.has(dedupeKey)) continue;
      seenLines.add(dedupeKey);

      const meta = getLineMeta(network, code);
      const baseId = d.id || d.disruption_id || `${Date.now()}`;
      out.push({
        id: `idfm:${baseId}:${dedupeKey}`,
        network,
        line: meta.code,
        lineLabel: meta.label,
        lineColor: meta.color,
        lineTextColor: meta.textColor,
        title: buildTitle(message, effect),
        cause,
        message: message || "Aucun detail communique.",
        severity,
        effect,
        startTime: navitiaDateToISO(period?.begin),
        endTime: navitiaDateToISO(period?.end),
        updatedAt: navitiaDateToISO(d.updated_at),
        source: "idfm",
      });
    }
  }
  return out;
}

export async function fetchIDFM(log: string[]): Promise<SourceResult> {
  const key = process.env.IDFM_API_KEY?.trim();
  if (!key) {
    log.push("API IDFM : aucune cle configuree (IDFM_API_KEY) — source ignoree.");
    return { ok: false, disruptions: [] };
  }
  const base = process.env.IDFM_DISRUPTIONS_URL?.trim() || DEFAULT_URL;
  const url = `${base}${base.includes("?") ? "&" : "?"}count=200`;

  try {
    const res = await fetchWithTimeout(url, {
      headers: { apikey: key, Accept: "application/json" },
      timeoutMs: 8000,
    });
    if (!res.ok) {
      log.push(`API IDFM : reponse HTTP ${res.status} — source indisponible.`);
      return { ok: false, disruptions: [] };
    }
    const data = await res.json();
    const list = parseNavitia(data);
    log.push(`API IDFM : ${list.length} perturbation(s) officielle(s) recuperee(s).`);
    return { ok: true, disruptions: list };
  } catch (err) {
    log.push(`API IDFM : echec (${errLabel(err)}).`);
    return { ok: false, disruptions: [] };
  }
}
