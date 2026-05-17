import type { Category, Product, ProductSource } from "./types";

// Catalogue de démonstration. En production, ces produits sont alimentés par
// le back-office (import à la demande / scraping des tendances / API AliExpress).

const CLOTHES = ["XS", "S", "M", "L", "XL"];
const PANTS = ["34", "36", "38", "40", "42"];
const SHOES = ["36", "37", "38", "39", "40", "41"];
const KIDS = ["3-6M", "6-12M", "1-2A", "2-3A", "3-4A"];

const BASE = Date.UTC(2026, 3, 20);
let seq = 0;

function img(id: string, n: number): string {
  return `https://picsum.photos/seed/colis-${id}-${n}/700/900`;
}

function mk(
  id: string,
  title: string,
  category: Category,
  costPrice: number,
  source: ProductSource,
  opts: Partial<Product> = {},
): Product {
  seq += 1;
  return {
    id,
    title,
    category,
    costPrice,
    source,
    description: opts.description ?? "",
    images: opts.images ?? [img(id, 1), img(id, 2), img(id, 3)],
    sizes: opts.sizes ?? [],
    colors: opts.colors ?? [],
    trending: opts.trending ?? false,
    rating: opts.rating ?? 4.6,
    reviews: opts.reviews ?? 120,
    sourceUrl: opts.sourceUrl ?? `https://www.${source}.com/p/${id}`,
    createdAt: BASE - seq * 86_400_000,
  };
}

export const seedProducts: Product[] = [
  mk("robe-fleurie", "Robe d'été fleurie", "Femme", 6.2, "shein", {
    trending: true,
    sizes: CLOTHES,
    colors: ["Rose", "Bleu ciel", "Blanc"],
    rating: 4.7,
    reviews: 2143,
    description:
      "Robe fluide à imprimé fleuri, coupe légère idéale pour l'été. Tissu doux et respirant.",
  }),
  mk("blazer-oversize", "Blazer oversize beige", "Femme", 11.5, "shein", {
    trending: true,
    sizes: CLOTHES,
    colors: ["Beige", "Noir", "Camel"],
    reviews: 876,
    description:
      "Blazer oversize structuré, parfait pour un look chic décontracté en toute saison.",
  }),
  mk("top-cotele", "Top côtelé basique", "Femme", 3.4, "shein", {
    sizes: CLOTHES,
    colors: ["Blanc", "Noir", "Lilas", "Vert sauge"],
    reviews: 540,
    description: "Top côtelé près du corps, basique indispensable à superposer.",
  }),
  mk("jean-mom", "Jean mom taille haute", "Femme", 9.8, "shein", {
    trending: true,
    sizes: PANTS,
    colors: ["Bleu clair", "Bleu brut", "Noir"],
    reviews: 1320,
    description:
      "Jean mom taille haute, coupe ample et confortable qui flatte la silhouette.",
  }),
  mk("hoodie-oversize", "Hoodie oversize uni", "Homme", 8.9, "shein", {
    trending: true,
    sizes: CLOTHES,
    colors: ["Gris chiné", "Noir", "Crème"],
    reviews: 990,
    description: "Sweat à capuche oversize en molleton épais, ultra confortable.",
  }),
  mk("tshirt-pack", "Pack 3 t-shirts coton", "Homme", 7.5, "aliexpress", {
    sizes: CLOTHES,
    colors: ["Assortis"],
    reviews: 410,
    description: "Lot de 3 t-shirts en coton, coupe droite, coloris assortis.",
  }),
  mk("chemise-lin", "Chemise en lin manches courtes", "Homme", 7.1, "shein", {
    sizes: CLOTHES,
    colors: ["Blanc", "Bleu", "Olive"],
    reviews: 233,
    description: "Chemise légère en lin mélangé, idéale pour les fortes chaleurs.",
  }),
  mk("sneakers-chunky", "Sneakers chunky", "Accessoires", 13.4, "shein", {
    trending: true,
    sizes: SHOES,
    colors: ["Blanc", "Noir / Blanc"],
    reviews: 1502,
    description: "Baskets chunky à semelle épaisse, tendance et confortables.",
  }),
  mk("sac-matelasse", "Sac bandoulière matelassé", "Accessoires", 8.2, "shein", {
    trending: true,
    colors: ["Noir", "Beige", "Bordeaux"],
    reviews: 1788,
    description:
      "Sac bandoulière matelassé avec chaîne dorée, format compact et élégant.",
  }),
  mk("lunettes-ovales", "Lunettes de soleil ovales", "Accessoires", 2.3, "temu", {
    colors: ["Noir", "Écaille", "Transparent"],
    reviews: 654,
    description: "Lunettes de soleil ovales rétro, protection UV400.",
  }),
  mk("montre-mesh", "Montre bracelet mesh", "Accessoires", 6.7, "aliexpress", {
    colors: ["Argent", "Or", "Or rose"],
    reviews: 921,
    description: "Montre fine à bracelet milanais mesh, cadran minimaliste.",
  }),
  mk("palette-nude", "Palette 18 fards nude", "Beauté", 4.9, "shein", {
    trending: true,
    rating: 4.8,
    reviews: 3104,
    description:
      "Palette de 18 fards à paupières, finis mats et nacrés, tons nude chauds.",
  }),
  mk("serum-eclat", "Sérum éclat acide hyaluronique", "Beauté", 5.6, "aliexpress", {
    reviews: 712,
    description: "Sérum hydratant à l'acide hyaluronique pour un teint repulpé.",
  }),
  mk("coffret-pinceaux", "Coffret 12 pinceaux maquillage", "Beauté", 6.3, "temu", {
    colors: ["Rose", "Noir"],
    reviews: 845,
    description: "Set de 12 pinceaux de maquillage avec pochette de rangement.",
  }),
  mk("plaid-maille", "Plaid en grosse maille", "Maison", 12.0, "shein", {
    trending: true,
    colors: ["Crème", "Gris", "Terracotta"],
    reviews: 560,
    description: "Plaid douillet en grosse maille tricotée, parfait pour le canapé.",
  }),
  mk("guirlande-led", "Guirlande LED 10 m", "Maison", 3.1, "temu", {
    colors: ["Blanc chaud", "Multicolore"],
    reviews: 1290,
    description: "Guirlande lumineuse LED de 10 m avec télécommande et minuteur.",
  }),
  mk("organisateur-bureau", "Organisateur de bureau", "Maison", 5.4, "aliexpress", {
    colors: ["Blanc", "Noir"],
    reviews: 388,
    description: "Organisateur multi-compartiments pour ranger le bureau avec style.",
  }),
  mk("ensemble-bebe", "Ensemble bébé 3 pièces", "Enfant", 5.9, "shein", {
    sizes: KIDS,
    colors: ["Beige", "Bleu", "Rose poudré"],
    reviews: 432,
    description: "Ensemble bébé 3 pièces en coton doux : body, pantalon et bonnet.",
  }),
  mk("veilleuse-lune", "Veilleuse lune rechargeable", "Enfant", 7.8, "temu", {
    trending: true,
    colors: ["Blanc", "Lunaire"],
    reviews: 1654,
    description: "Veilleuse en forme de lune, intensité réglable, rechargeable USB.",
  }),
  mk("ecouteurs-bt", "Écouteurs sans fil Bluetooth", "Tech", 9.2, "aliexpress", {
    trending: true,
    colors: ["Blanc", "Noir"],
    reviews: 2890,
    description: "Écouteurs sans fil Bluetooth 5.3 avec boîtier de charge compact.",
  }),
  mk("support-voiture", "Support téléphone voiture", "Tech", 3.7, "temu", {
    reviews: 970,
    description: "Support smartphone pour voiture, fixation grille d'aération.",
  }),
  mk("ring-light", "Ring light 26 cm + trépied", "Tech", 11.3, "aliexpress", {
    trending: true,
    reviews: 1422,
    description:
      "Anneau lumineux LED 26 cm avec trépied réglable, 3 températures de lumière.",
  }),
];
