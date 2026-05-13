"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterControls } from "./filter-controls";
import { MobileFiltersBar } from "./mobile-filters-bar";

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
}: Readonly<FiltersProps>) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <MobileFiltersBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          isOpen={isFiltersOpen}
          onOpen={() => setIsFiltersOpen(true)}
          onClose={() => setIsFiltersOpen(false)}
        />

        <div className="hidden flex-wrap items-center gap-4 md:flex">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-slate-700" />
            <span className="font-semibold text-slate-900">Filters:</span>
          </div>
          <FilterControls
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
            className="flex flex-wrap gap-2"
            sortClassName="ml-auto rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
