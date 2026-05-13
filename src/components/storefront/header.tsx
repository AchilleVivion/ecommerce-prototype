"use client";

import { HeaderBrand } from "./header-brand";
import { HeaderToolbar } from "./header-toolbar";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header(props: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <HeaderBrand />
        <HeaderToolbar {...props} />
      </div>
    </header>
  );
}
