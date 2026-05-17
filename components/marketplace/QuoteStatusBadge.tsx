import type { QuoteStatus } from "@/lib/marketplace/types";

const MAP: Record<QuoteStatus, { label: string; cls: string }> = {
  pending: { label: "En attente de devis", cls: "bg-amber-100 text-amber-800" },
  quoted: { label: "Devis envoyé", cls: "bg-blue-100 text-blue-800" },
  accepted: { label: "Devis accepté", cls: "bg-emerald-100 text-emerald-800" },
  refused: { label: "Devis refusé", cls: "bg-rose-100 text-rose-700" },
  ordered: { label: "Commandé en France", cls: "bg-neutral-900 text-white" },
  cancelled: { label: "Annulé", cls: "bg-neutral-200 text-neutral-600" },
};

export default function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  const s = MAP[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
