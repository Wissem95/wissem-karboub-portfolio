import Link from "next/link";
import { BRAND } from "@/lib/marketplace/config";

export default function MarketFooter() {
  return (
    <footer className="mt-20 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-syne text-lg font-extrabold text-neutral-900">
            {BRAND.name}
          </p>
          <p className="max-w-xs text-sm text-neutral-500">{BRAND.tagline}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium text-neutral-900">Boutique</p>
          <Link href="/marketplace/catalogue" className="block text-neutral-500 hover:text-neutral-900">
            Catalogue
          </Link>
          <Link href="/marketplace#comment" className="block text-neutral-500 hover:text-neutral-900">
            Comment ça marche
          </Link>
          <Link href="/marketplace/mes-devis" className="block text-neutral-500 hover:text-neutral-900">
            Suivre mes devis
          </Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium text-neutral-900">Contact</p>
          <a href={BRAND.whatsappLink} className="block text-neutral-500 hover:text-neutral-900">
            WhatsApp {BRAND.whatsapp}
          </a>
          <a href={`mailto:${BRAND.email}`} className="block text-neutral-500 hover:text-neutral-900">
            {BRAND.email}
          </a>
          <p className="text-neutral-500">Service disponible en {BRAND.zone}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium text-neutral-900">Bon à savoir</p>
          <p className="text-neutral-500">
            Aucun prix n&rsquo;est affiché en ligne : chaque commande fait
            l&rsquo;objet d&rsquo;un devis personnalisé.
          </p>
          <p className="text-neutral-500">Paiement en main propre à la livraison.</p>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-5 py-5">
        <p className="mx-auto max-w-6xl text-xs text-neutral-400">
          {BRAND.name} — prototype de démonstration. Catalogue à titre
          d&rsquo;exemple. © {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
