"use client";

import { SlidersHorizontal } from "lucide-react";
import { CategoryButton } from "./category-button";

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
<div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-slate-700" />
              <span className="font-semibold text-slate-900">Filters:</span>
            </div>
<div className="flex flex-wrap gap-2">
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
            className="ml-auto rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
