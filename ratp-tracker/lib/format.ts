const TZ = "Europe/Paris";

function toDate(iso: string | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Heure courte au format parisien : "08h12". */
export function formatClock(iso: string | null): string {
  const d = toDate(iso);
  if (!d) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(d)
    .replace(":", "h");
}

/** Jour court au format parisien : "18/05". */
function formatDay(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
  }).format(d);
}

function isToday(d: Date): boolean {
  return formatDay(d) === formatDay(new Date());
}

function stamp(d: Date): string {
  return isToday(d) ? formatClock(d.toISOString()) : `${formatDay(d)} ${formatClock(d.toISOString())}`;
}

/** Plage horaire lisible d'une perturbation. */
export function formatRange(start: string | null, end: string | null): string {
  const s = toDate(start);
  const e = toDate(end);
  if (s && e) return `${stamp(s)} → ${stamp(e)}`;
  if (s) return `Depuis ${stamp(s)}`;
  if (e) return `Jusqu'a ${stamp(e)}`;
  return "Horaire non communique";
}

/** Date + heure complete : "18/05 a 08h12". */
export function formatDateTime(iso: string | null): string {
  const d = toDate(iso);
  if (!d) return "";
  return `${formatDay(d)} a ${formatClock(iso)}`;
}

/** Anciennete relative : "a l'instant", "il y a 3 min", "il y a 2 h". */
export function formatRelative(iso: string | null): string {
  const d = toDate(iso);
  if (!d) return "";
  const diffMs = Date.now() - d.getTime();
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "a l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.round(h / 24);
  return `il y a ${j} j`;
}
