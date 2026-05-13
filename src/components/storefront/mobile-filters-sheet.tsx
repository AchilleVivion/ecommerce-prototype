"use client";

import { X } from "lucide-react";
import { FilterControls, type FilterControlsProps } from "./filter-controls";

interface MobileFiltersSheetProps extends FilterControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

function FiltersSheetHeader({ onClose }: Readonly<{ onClose: () => void }>) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <h2 className="text-xl font-bold text-slate-900">Filters</h2>
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="rounded-full p-2 hover:bg-slate-100"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export function MobileFiltersSheet({
  isOpen,
  onClose,
  ...filterProps
}: Readonly<MobileFiltersSheetProps>) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close filters overlay"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      ) : null}

      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[80vh] transform rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex max-h-[80vh] flex-col">
          <FiltersSheetHeader onClose={onClose} />
          <div className="overflow-y-auto p-4">
            <FilterControls
              {...filterProps}
              className="flex flex-wrap gap-2"
              sortClassName="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
