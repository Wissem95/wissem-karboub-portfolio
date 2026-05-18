"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TraficResult } from "@/lib/types";
import DisruptionCard from "@/components/DisruptionCard";
import BotConsole from "@/components/BotConsole";
import SourceBadges from "@/components/SourceBadges";
import NetworkFilter, { type NetworkChoice } from "@/components/NetworkFilter";

const REFRESH_MS = 60_000;

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState<TraficResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [network, setNetwork] = useState<NetworkChoice>("all");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/trafic", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData((await res.json()) as TraficResult);
      setError(null);
    } catch {
      setError(
        "Impossible de contacter le bot. Nouvelle tentative au prochain cycle.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [autoRefresh, load]);

  const disruptions = useMemo(() => data?.disruptions ?? [], [data]);

  const counts = useMemo(() => {
    const c = { all: disruptions.length } as Record<NetworkChoice, number>;
    for (const d of disruptions) {
      c[d.network] = (c[d.network] ?? 0) + 1;
    }
    return c;
  }, [disruptions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return disruptions.filter((d) => {
      if (network !== "all" && d.network !== network) return false;
      if (!q) return true;
      return [d.line, d.lineLabel, d.title, d.cause, d.message]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [disruptions, network, query]);

  const stats = useMemo(() => {
    let critical = 0;
    let major = 0;
    for (const d of disruptions) {
      if (d.severity === "critical") critical += 1;
      else if (d.severity === "major") major += 1;
    }
    return { total: disruptions.length, critical, major };
  }, [disruptions]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
          En direct
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          RATP Trafic
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Un bot scrute en continu le reseau francilien — metro, RER, Transilien,
          tram et bus — et liste les retards, incidents et perturbations en cours,
          avec leurs horaires et leurs causes.
        </p>
      </header>

      <div className="mt-8 space-y-3">
        <BotConsole
          log={data?.log ?? []}
          generatedAt={data?.generatedAt ?? null}
          loading={loading}
          autoRefresh={autoRefresh}
          onToggleAuto={() => setAutoRefresh((v) => !v)}
          onRefresh={load}
        />
        {data && <SourceBadges sources={data.sources} />}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard label="Perturbations" value={stats.total} color="#e8eaf0" />
        <StatCard label="Trafic interrompu" value={stats.critical} color="#ef4444" />
        <StatCard label="Fortement perturbe" value={stats.major} color="#f97316" />
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-2.5 text-sm text-[#f87171]">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <NetworkFilter value={network} counts={counts} onChange={setNetwork} />
        <div className="flex items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une ligne, une cause, un mot-cle..."
            className="w-full rounded-lg border border-border bg-card px-3.5 py-2 text-sm text-text placeholder:text-muted/70 focus:border-accent/50 focus:outline-none"
          />
          <span className="shrink-0 text-xs text-muted">
            {filtered.length} resultat{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <section className="mt-5">
        {loading && !data ? (
          <p className="py-16 text-center text-sm text-muted">
            Le bot collecte l&apos;info-trafic...
          </p>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-14 text-center">
            {disruptions.length === 0 ? (
              <>
                <p className="text-base font-semibold text-[#22c55e]">
                  Trafic normal sur l&apos;ensemble du reseau
                </p>
                <p className="mt-1 text-sm text-muted">
                  Aucune perturbation signalee pour le moment.
                </p>
              </>
            ) : (
              <p className="text-sm text-muted">
                Aucune perturbation ne correspond a votre recherche.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((d) => (
              <DisruptionCard key={d.id} disruption={d} />
            ))}
          </div>
        )}
      </section>

      <footer className="mt-14 border-t border-border pt-6 text-xs leading-relaxed text-muted">
        <p>
          Sources : API Ile-de-France Mobilites (plateforme PRIM) et scraping de
          l&apos;info-trafic publique. En l&apos;absence de source joignable, des
          donnees de demonstration sont affichees.
        </p>
        <p className="mt-2">
          Projet personnel a vocation pedagogique — non affilie a la RATP ni a
          Ile-de-France Mobilites. Developpe par Wissem Karboub.
        </p>
      </footer>
    </main>
  );
}
