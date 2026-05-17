import type { Category } from "./types";

// Identité de la boutique — tout est centralisé ici pour un renommage en un point.
export const BRAND = {
  name: "COLIS·TN",
  short: "COLIS",
  tagline:
    "Tes produits Shein, AliExpress & Temu — commandés depuis la France, payés en main propre.",
  zone: "Tunisie",
  whatsapp: "+216 00 000 000",
  whatsappLink: "https://wa.me/21600000000",
  email: "contact@colis-tn.example",
};

// DÉMO UNIQUEMENT — à remplacer par une vraie authentification côté serveur.
export const ADMIN_PASSPHRASE = "colis2026";

export const CATEGORIES: Category[] = [
  "Femme",
  "Homme",
  "Beauté",
  "Accessoires",
  "Maison",
  "Enfant",
  "Tech",
];

// Taux indicatif (1 EUR -> DT) pour aider l'admin à proposer un prix client.
export const EUR_TO_TND = 3.4;

// Marge cible suggérée par défaut dans le back-office.
export const DEFAULT_MARGIN = 1.6;
