"use client";

import { useEffect, useState } from "react";
import { ADMIN_PASSPHRASE } from "@/lib/marketplace/config";

const FLAG = "wk_market_admin_v1";

export default function AdminGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setUnlocked(window.sessionStorage.getItem(FLAG) === "1");
    setReady(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim() === ADMIN_PASSPHRASE) {
      window.sessionStorage.setItem(FLAG, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24">
      <div className="w-full rounded-2xl border border-neutral-200 bg-white p-8">
        <h1 className="font-syne text-xl font-bold text-neutral-900">
          Espace admin
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Accès réservé à l&rsquo;équipe. Saisis le mot de passe pour continuer.
        </p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Mot de passe"
            className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-900"
          />
          {error && (
            <p className="text-sm text-rose-600">Mot de passe incorrect.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Déverrouiller
          </button>
        </form>
        <p className="mt-4 rounded-lg bg-neutral-100 px-3 py-2 text-xs text-neutral-500">
          Démo : mot de passe <span className="font-mono">{ADMIN_PASSPHRASE}</span>.
          À remplacer par une authentification serveur en production.
        </p>
      </div>
    </div>
  );
}
