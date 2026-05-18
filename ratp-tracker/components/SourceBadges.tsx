import type { TraficResult } from "@/lib/types";

const META: Record<"idfm" | "scrape", { label: string }> = {
  idfm: { label: "API officielle IDFM" },
  scrape: { label: "Scraping info-trafic" },
};

export default function SourceBadges({
  sources,
}: {
  sources: TraficResult["sources"];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["idfm", "scrape"] as const).map((key) => {
        const s = sources[key];
        return (
          <span
            key={key}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                s.ok ? "bg-[#22c55e]" : "bg-[#4b5563]"
              }`}
            />
            <span className="font-medium text-text">{META[key].label}</span>
            <span className="text-muted">
              {s.ok ? `${s.count} perturbation(s)` : "hors ligne"}
            </span>
          </span>
        );
      })}
      {sources.demo.ok && (
        <span className="flex items-center gap-2 rounded-lg border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-3 py-1.5 text-xs font-medium text-[#f5b942]">
          <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
          Donnees de demonstration — sources reelles momentanement injoignables
        </span>
      )}
    </div>
  );
}
