// Modèle de données du marketplace « prix cachés ».
// Les champs marqués PRIVÉS ne doivent jamais être affichés au client.

export type ProductSource = "shein" | "aliexpress" | "temu";

export type Category =
  | "Femme"
  | "Homme"
  | "Beauté"
  | "Accessoires"
  | "Maison"
  | "Enfant"
  | "Tech";

export interface Product {
  id: string;
  title: string;
  category: Category;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  trending: boolean;
  rating: number;
  reviews: number;
  createdAt: number;
  // ----- Champs PRIVÉS : réservés au back-office, jamais exposés au client -----
  source: ProductSource;
  sourceUrl: string;
  costPrice: number; // coût d'achat réel en France, en EUR
}

// Vue publique d'un produit : aucune information de prix ni de source.
export type PublicProduct = Omit<Product, "source" | "sourceUrl" | "costPrice">;

export function toPublicProduct(p: Product): PublicProduct {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    images: p.images,
    sizes: p.sizes,
    colors: p.colors,
    trending: p.trending,
    rating: p.rating,
    reviews: p.reviews,
    createdAt: p.createdAt,
  };
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  size: string | null;
  color: string | null;
  quantity: number;
  note: string;
}

export type QuoteStatus =
  | "pending" // demande reçue, pas encore chiffrée
  | "quoted" // devis envoyé au client
  | "accepted" // client a accepté le devis
  | "refused" // client a refusé le devis
  | "ordered" // commande passée en France
  | "cancelled"; // demande annulée

export interface QuoteLine {
  cartItemId: string;
  unitPrice: number; // prix client unitaire fixé par l'admin, en DT
}

export interface Quote {
  lines: QuoteLine[];
  shipping: number; // frais de livraison, en DT
  serviceFee: number; // frais de service, en DT
  total: number; // total client calculé, en DT
  message: string;
  quotedAt: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  city: string;
  note: string;
}

export interface QuoteRequest {
  id: string;
  ref: string; // référence courte affichée (ex. CT-7K2D)
  ownerKey: string; // identifie le navigateur du client
  items: CartItem[];
  customer: Customer;
  status: QuoteStatus;
  quote: Quote | null;
  createdAt: number;
  updatedAt: number;
}
