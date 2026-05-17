import Link from "next/link";
import type { PublicProduct } from "@/lib/marketplace/types";
import Stars from "./Stars";

export default function ProductCard({ product }: { product: PublicProduct }) {
  return (
    <Link
      href={`/marketplace/produit/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.trending && (
          <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white">
            Tendance
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[11px] uppercase tracking-wide text-neutral-400">
          {product.category}
        </p>
        <h3 className="line-clamp-1 text-sm font-medium text-neutral-900">
          {product.title}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <Stars rating={product.rating} reviews={product.reviews} />
          <span className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-700">
            Prix sur devis
          </span>
        </div>
      </div>
    </Link>
  );
}
