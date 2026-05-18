import type { Disruption, Network, SourceId, SourceStatus, TraficResult } from "./types";
import { severityRank } from "./severity";
import { fetchIDFM } from "./sources/idfm";
import { fetchScrape } from "./sources/scrape";
import { getDemoDisruptions } from "./sources/demo";

const NETWORK_ORDER: Record<Network, number> = {
  metro: 0,
  rer: 1,
  transilien: 2,
  tram: 3,
  bus: 4,
  noctilien: 5,
  autre: 6,
};

/** Tri : gravite decroissante, puis reseau, puis numero de ligne. */
function sortDisruptions(list: Disruption[]): Disruption[] {
  return [...list].sort((a, b) => {
    const sev = severityRank(a.severity) - severityRank(b.severity);
    if (sev !== 0) return sev;
    const net = NETWORK_ORDER[a.network] - NETWORK_ORDER[b.network];
    if (net !== 0) return net;
    return a.line.localeCompare(b.line, "fr", { numeric: true });
  });
}

/**
 * Cœur du bot : interroge en parallele l'API officielle et le scraping,
 * fusionne les resultats (priorite a l'API), et bascule sur des donnees
 * de demonstration si aucune source n'est joignable.
 */
export async function buildTrafic(): Promise<TraficResult> {
  const log: string[] = [];
  log.push("Bot info-trafic : demarrage de la collecte.");

  const [idfmRes, scrapeRes] = await Promise.allSettled([
    fetchIDFM(log),
    fetchScrape(log),
  ]);

  const idfm =
    idfmRes.status === "fulfilled" ? idfmRes.value : { ok: false, disruptions: [] };
  const scrape =
    scrapeRes.status === "fulfilled" ? scrapeRes.value : { ok: false, disruptions: [] };
  if (idfmRes.status === "rejected") log.push("API IDFM : exception inattendue.");
  if (scrapeRes.status === "rejected") log.push("Scraping : exception inattendue.");

  // Fusion : on ecarte les lignes deja couvertes par l'API officielle.
  const idfmLines = new Set(idfm.disruptions.map((d) => `${d.network}:${d.line}`));
  const scrapeKept = scrape.disruptions.filter(
    (d) => !idfmLines.has(`${d.network}:${d.line}`),
  );
  const removed = scrape.disruptions.length - scrapeKept.length;
  if (removed > 0) {
    log.push(`Fusion : ${removed} doublon(s) ecarte(s), priorite a l'API officielle.`);
  }

  let disruptions = [...idfm.disruptions, ...scrapeKept];
  let usedDemo = false;
  if (disruptions.length === 0 && !idfm.ok && !scrape.ok) {
    disruptions = getDemoDisruptions();
    usedDemo = true;
    log.push("Aucune source en ligne — affichage des donnees de demonstration.");
  }

  disruptions = sortDisruptions(disruptions);

  const sources: Record<SourceId, SourceStatus> = {
    idfm: { ok: idfm.ok, count: idfm.disruptions.length },
    scrape: { ok: scrape.ok, count: scrape.disruptions.length },
    demo: { ok: usedDemo, count: usedDemo ? disruptions.length : 0 },
  };

  if (!usedDemo && disruptions.length === 0) {
    log.push("Collecte terminee : trafic normal sur l'ensemble du reseau.");
  } else {
    log.push(`Collecte terminee : ${disruptions.length} perturbation(s) au total.`);
  }

  return {
    generatedAt: new Date().toISOString(),
    sources,
    log,
    count: disruptions.length,
    disruptions,
  };
}
