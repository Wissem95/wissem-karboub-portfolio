export default function Stars({
  rating,
  reviews,
}: {
  rating: number;
  reviews?: number;
}) {
  return (
    <span className="flex items-center gap-1 text-xs text-neutral-500">
      <svg
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5 fill-amber-400"
        aria-hidden="true"
      >
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15.9 4.8 18.7l1-5.9L1.5 8.6l5.9-.9L10 1.5z" />
      </svg>
      <span className="font-medium text-neutral-700">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-neutral-400">({reviews.toLocaleString("fr-FR")})</span>
      )}
    </span>
  );
}
