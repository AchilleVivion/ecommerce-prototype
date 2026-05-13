"use client";

import { SlidersHorizontal } from "lucide-react";
import { SORT_LABELS } from "./filter-controls";
import { MobileFiltersSheet } from "./mobile-filters-sheet";

interface MobileFiltersBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MobileFiltersBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  isOpen,
  onOpen,
  onClose,
}: Readonly<MobileFiltersBarProps>) {
  const summary = `${selectedCategory} · ${SORT_LABELS[sortBy] ?? sortBy}`;

  return (
    <div className="flex items-center gap-3 md:hidden">
      <button
        type="button"
        aria-label="Open filters"
        onClick={onOpen}
        className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      <span className="truncate text-sm text-slate-600">{summary}</span>
      {isOpen ? (
        <MobileFiltersSheet
          isOpen={isOpen}
          onClose={onClose}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      ) : null}
    </div>
  );
}
