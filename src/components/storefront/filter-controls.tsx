import { CategoryButton } from "./category-button";

export interface FilterControlsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  className?: string;
  sortClassName?: string;
}

export function FilterControls({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  className,
  sortClassName = "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none",
}: Readonly<FilterControlsProps>) {
  return (
    <>
      <div className={className ?? "flex flex-wrap gap-2"}>
        <CategoryButton
          label="All"
          isActive={selectedCategory === "All"}
          onClick={() => onCategoryChange("All")}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category}
            label={category}
            isActive={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
          />
        ))}
      </div>

      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        className={sortClassName}
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </>
  );
}

export const SORT_LABELS: Record<string, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  rating: "Top Rated",
};
