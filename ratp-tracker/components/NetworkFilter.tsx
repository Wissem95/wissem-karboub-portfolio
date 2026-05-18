"use client";

import type { Network } from "@/lib/types";

export type NetworkChoice = Network | "all";

const ORDER: NetworkChoice[] = [
  "all",
  "metro",
  "rer",
  "transilien",
  "tram",
  "bus",
  "noctilien",
  "autre",
];

const LABELS: Record<NetworkChoice, string> = {
  all: "Tout",
  metro: "Metro",
  rer: "RER",
  transilien: "Transilien",
  tram: "Tram",
  bus: "Bus",
  noctilien: "Noctilien",
  autre: "Autres",
};

interface Props {
  value: NetworkChoice;
  counts: Record<NetworkChoice, number>;
  onChange: (value: NetworkChoice) => void;
}

export default function NetworkFilter({ value, counts, onChange }: Props) {
  const visible = ORDER.filter((n) => n === "all" || (counts[n] ?? 0) > 0);

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((choice) => {
        const active = choice === value;
        return (
          <button
            key={choice}
            type="button"
            onClick={() => onChange(choice)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-border bg-card text-muted hover:border-[#34405a] hover:text-text"
            }`}
          >
            {LABELS[choice]}
            <span className={active ? "ml-1.5 text-accent/70" : "ml-1.5 text-muted/70"}>
              {counts[choice] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
