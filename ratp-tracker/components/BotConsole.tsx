"use client";

import { formatClock } from "@/lib/format";

interface Props {
  log: string[];
  generatedAt: string | null;
  loading: boolean;
  autoRefresh: boolean;
  onToggleAuto: () => void;
  onRefresh: () => void;
}

export default function BotConsole({
  log,
  generatedAt,
  loading,
  autoRefresh,
  onToggleAuto,
  onRefresh,
}: Props) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border bg-[#10141d] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-1 font-mono text-xs text-muted">
          bot@ratp-trafic — journal de collecte
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span
            className={`h-2 w-2 rounded-full ${
              loading ? "animate-pulse-dot bg-accent" : "bg-[#28c840]"
            }`}
          />
          {loading ? "collecte..." : "en veille"}
        </span>
      </div>

      <div className="thin-scroll max-h-44 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed">
        {log.length === 0 ? (
          <p className="text-muted">En attente du premier passage du bot...</p>
        ) : (
          log.map((line, i) => (
            <p key={i} className="flex gap-2 text-text/90">
              <span className="select-none text-accent">$</span>
              <span>{line}</span>
            </p>
          ))
        )}
        {loading && (
          <p className="flex gap-2 text-accent">
            <span className="select-none">$</span>
            <span className="animate-pulse-dot">_</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted">
          {generatedAt
            ? `derniere collecte a ${formatClock(generatedAt)}`
            : "aucune collecte"}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleAuto}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
              autoRefresh
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border text-muted hover:text-text"
            }`}
          >
            Auto 60s {autoRefresh ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-text transition-colors hover:border-[#34405a] disabled:opacity-50"
          >
            Rafraichir
          </button>
        </div>
      </div>
    </section>
  );
}
