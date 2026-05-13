"use client";

import { Menu, Search, ShoppingCart } from "lucide-react";

interface HeaderToolbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeaderToolbar({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
}: HeaderToolbarProps) {
  return (
<div className="flex items-center gap-4">
        <div className="hidden w-64 items-center gap-2 rounded-full bg-slate-100 px-4 py-2 sm:flex">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        <button
          type="button"
          onClick={onCartClick}
          className="relative rounded-full p-2 transition-colors hover:bg-slate-100"
        >
          <ShoppingCart className="h-6 w-6 text-slate-700" />
          {cartItemCount > 0 ? (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {cartItemCount}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          className="rounded-full p-2 hover:bg-slate-100 md:hidden"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>
      </div>
);
}
