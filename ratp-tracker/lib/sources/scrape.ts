import type { Disruption, Network, Severity, SourceResult } from "../types";
import { getLineMeta } from "../lines";
import { fromRatpSlug, severityLabel } from "../severity";
import { fetchWithTimeout, stripHtml } from "../http";
import { inferCause, errLabel } from "../cause";

/**
 * Source "scraping" : info-trafic publique RATP, sans cle d'API.
 * 1) endpoint JSON public de l'info-trafic RATP ;
 * 2) repli : extraction du JSON embarque dans la page ratp.fr/infos-trafic.
 */
const TRAFFIC_API = "https://api-ratp.pierre-grimaud.fr/v4/traffic";
const RATP_PAGE = "https://www.ratp.fr/infos-trafic";

interface RawLine {
  line?: string | number;
  slug?: string;
  title?: string;
  message?: string;
}

const CATEGORY_NETWORK: Record<string, Network> = {
  metros: "metro",
  rers: "rer",
  tramways: "tram",
};

function normalizeCode(network: Network, raw: string): string {
  const code = String(raw).trim().toUpperCase();
  if (network === "tram" && /^\d/.test(code)) return `T${code}`;
  return code;
}

function toDisruption(
  network: Network,
  raw: RawLine,
  idHint: string,
): Disruption | null {
  const code = normalizeCode(network, String(raw.line ?? "").trim());
  if (!code) return null;

  const slug = String(raw.slug ?? "").toLowerCase();
  if (!slug || slug === "normal") return null;

  const severity: Severity = fromRatpSlug(slug);
  const title = stripHtml(String(raw.title ?? "")) || severityLabel(severity);
  const message = stripHtml(String(raw.message ?? "")) || "Aucun detail communique.";
  const meta = getLineMeta(network, code);

  return {
    id: `scrape:${idHint}:${network}:${code}`,
    network,
    line: meta.code,
    lineLabel: meta.label,
    lineColor: meta.color,
    lineTextColor: meta.textColor,
    title,
    cause: inferCause(`${title} ${message}`) || "Cause non communiquee",
    message,
    severity,
    effect: severityLabel(severity),
    startTime: null,
    endTime: null,
    updatedAt: new Date().toISOString(),
    source: "scrape",
  };
}

/** Etape 1 : endpoint JSON public de l'info-trafic. Leve une erreur si indisponible. */
async function fetchTrafficApi(log: string[]): Promise<Disruption[]> {
  const res = await fetchWithTimeout(TRAFFIC_API, {
    headers: { Accept: "application/json" },
    timeoutMs: 7000,
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as { result?: Record<string, RawLine[]> };
  const result = data.result ?? {};
  const out: Disruption[] = [];
  let scanned = 0;

  for (const [category, network] of Object.entries(CATEGORY_NETWORK)) {
    for (const raw of result[category] ?? []) {
      scanned += 1;
      const d = toDisruption(network, raw, "api");
      if (d) out.push(d);
    }
  }
  log.push(
    `Scraping info-trafic : ${scanned} ligne(s) analysee(s), ${out.length} perturbation(s).`,
  );
  return out;
}

/** Recherche recursive de noeuds de trafic dans un JSON arbitraire. */
function collectRawLines(node: unknown, depth: number, acc: RawLine[]): void {
  if (depth > 8 || acc.length > 400 || node === null) return;
  if (Array.isArray(node)) {
    for (const child of node) collectRawLines(child, depth + 1, acc);
    return;
  }
  if (typeof node !== "object") return;
  const obj = node as Record<string, unknown>;
  if ("slug" in obj && ("title" in obj || "message" in obj) && "line" in obj) {
    acc.push({
      line: obj.line as string,
      slug: obj.slug as string,
      title: obj.title as string,
      message: obj.message as string,
    });
  }
  for (const value of Object.values(obj)) collectRawLines(value, depth + 1, acc);
}

/** Etape 2 (repli) : extraction du JSON embarque dans la page RATP. */
async function scrapeRatpPage(log: string[]): Promise<Disruption[]> {
  const url = process.env.RATP_TRAFFIC_URL?.trim() || RATP_PAGE;
  const res = await fetchWithTimeout(url, {
    headers: { Accept: "text/html" },
    timeoutMs: 8000,
  });
  if (!res.ok) {
    log.push(`Scraping ratp.fr : reponse HTTP ${res.status}.`);
    return [];
  }
  const html = await res.text();
  const match = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!match) {
    log.push("Scraping ratp.fr : aucune donnee exploitable dans la page.");
    return [];
  }
  try {
    const acc: RawLine[] = [];
    collectRawLines(JSON.parse(match[1]), 0, acc);
    const network: Network = "metro";
    const out = acc
      .map((raw, i) => toDisruption(network, raw, `page-${i}`))
      .filter((d): d is Disruption => d !== null);
    log.push(`Scraping ratp.fr : ${out.length} perturbation(s) extraite(s) de la page.`);
    return out;
  } catch {
    log.push("Scraping ratp.fr : JSON embarque illisible.");
    return [];
  }
}

export async function fetchScrape(log: string[]): Promise<SourceResult> {
  try {
    return { ok: true, disruptions: await fetchTrafficApi(log) };
  } catch (err) {
    log.push(`Scraping info-trafic : indisponible (${errLabel(err)}) — repli sur ratp.fr.`);
  }
  try {
    const fallback = await scrapeRatpPage(log);
    return { ok: fallback.length > 0, disruptions: fallback };
  } catch (err) {
    log.push(`Scraping ratp.fr : echec (${errLabel(err)}).`);
    return { ok: false, disruptions: [] };
  }
}
