"use client";

import { X } from "lucide-react";
import { HeaderNavLinks } from "./header-nav-links";
import { HeaderSearchInput } from "./header-search-input";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
}: Readonly<MobileNavDrawerProps>) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      ) : null}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 sm:w-80 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold text-slate-900">Menu</h2>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="rounded-full p-2 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="border-b p-4">
            {isOpen ? (
              <HeaderSearchInput
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSearchSubmit={onClose}
              />
            ) : null}
          </div>
          <HeaderNavLinks
            className="flex flex-col gap-4 p-4"
            linkClassName="text-base py-2 font-medium text-slate-700 hover:text-slate-900"
            onLinkClick={onClose}
          />
        </div>
      </div>
    </>
  );
}
