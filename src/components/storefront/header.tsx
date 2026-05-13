"use client";

import { Menu, Search, ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-slate-900">ShopHub</h1>
          <nav className="hidden gap-6 md:flex">
            <a
              href="#"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              All Products
            </a>
            <a
              href="#"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Deals
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden w-64 items-center gap-2 rounded-full bg-slate-100 px-4 py-2 sm:flex">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </div>

            <button
              type="button"
              onClick={onCartClick}
              className="relative rounded-full p-2 transition-colors hover:bg-slate-100"
            >
              <ShoppingCart className="h-6 w-6 text-slate-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="rounded-full p-2 hover:bg-slate-100 md:hidden"
            >
              <Menu className="h-6 w-6 text-slate-700" />
            </button>
        </div>
      </div>
    </header>
  );
}