"use client";

import { useState } from "react";
import { HeaderBrand } from "./header-brand";
import { HeaderToolbar } from "./header-toolbar";
import { MobileNavDrawer } from "./mobile-nav-drawer";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header(props: Readonly<HeaderProps>) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <HeaderBrand />
          <HeaderToolbar
            {...props}
            onMenuClick={() => setIsMobileNavOpen(true)}
          />
        </div>
      </header>
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        searchQuery={props.searchQuery}
        onSearchChange={props.onSearchChange}
      />
    </>
  );
}
