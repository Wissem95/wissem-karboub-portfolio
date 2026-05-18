import type { Disruption } from "@/lib/types";
import { severityColor, severityLabel } from "@/lib/severity";
import { formatRange, formatRelative } from "@/lib/format";

function LineBadge({ disruption }: { disruption: Disruption }) {
  const { line, lineColor, lineTextColor } = disruption;
  const size =
    line.length <= 2 ? "text-lg" : line.length === 3 ? "text-sm" : "text-xs";
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-bold ${size}`}
      style={{ backgroundColor: lineColor, color: lineTextColor }}
      title={disruption.lineLabel}
    >
      {line}
    </span>
  );
}

const SOURCE_LABEL: Record<Disruption["source"], string> = {
  idfm: "API IDFM",
  scrape: "Scraping",
  demo: "Demo",
};

export default function DisruptionCard({
  disruption,
}: {
  disruption: Disruption;
}) {
  const color = severityColor(disruption.severity);

  return (
    <article
      className="animate-fade-up rounded-xl border border-border bg-card p-4 transition-colors hover:border-[#34405a]"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-start gap-3">
        <LineBadge disruption={disruption} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-wide"
              style={{ color }}
            >
              {disruption.effect}
            </span>
            <span className="ml-auto shrink-0 text-[11px] text-muted">
              {disruption.lineLabel}
            </span>
          </div>
          <h3 className="mt-1 text-sm font-semibold leading-snug text-text">
            {disruption.title}
          </h3>
        </div>
      </div>

      <p className="clamp-3 mt-3 text-sm leading-relaxed text-muted">
        {disruption.message}
      </p>

      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
        <div className="flex items-center gap-1.5">
          <dt className="text-muted">Cause</dt>
          <dd className="font-medium text-text">{disruption.cause}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="text-muted">Horaire</dt>
          <dd className="font-medium text-text">
            {formatRange(disruption.startTime, disruption.endTime)}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-[11px] text-muted">
        <span className="rounded border border-border px-1.5 py-0.5">
          {SOURCE_LABEL[disruption.source]}
        </span>
        {disruption.updatedAt && (
          <span>Mis a jour {formatRelative(disruption.updatedAt)}</span>
        )}
      </div>
    </article>
  );
}
