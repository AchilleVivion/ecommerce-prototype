import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviews: number;
  size?: "card" | "modal";
}

const STAR_INDICES = [0, 1, 2, 3, 4];

function StarRow({ rating, starClass }: { rating: number; starClass: string }) {
  return STAR_INDICES.map((index) => (
    <Star
      key={index}
      className={`${starClass} ${
        index < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-slate-300"
      }`}
    />
  ));
}

export function ProductRating({
  rating,
  reviews,
  size = "card",
}: ProductRatingProps) {
  const starClass = size === "modal" ? "h-5 w-5" : "h-4 w-4";
  const reviewLabel =
    size === "modal" ? `(${reviews} reviews)` : `(${reviews})`;

  if (size === "card") {
    return (
<div className="mb-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-slate-700">{rating}</span>
          <span className="text-xs text-slate-500">{reviewLabel}</span>
        </div>
);
  }

  return (
    <div className="mb-6 flex items-center gap-2">
      <div className="flex items-center gap-1">
        <StarRow rating={rating} starClass={starClass} />
      </div>
      <span className="text-sm font-medium text-slate-700">{rating}</span>
      <span className="text-sm text-slate-500">{reviewLabel}</span>
    </div>
  );
}
