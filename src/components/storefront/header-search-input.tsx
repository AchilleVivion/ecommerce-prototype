import { Search } from "lucide-react";

interface HeaderSearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
  onSearchSubmit?: () => void;
}

export function HeaderSearchInput({
  searchQuery,
  onSearchChange,
  className = "flex w-full items-center gap-2 rounded-full bg-slate-100 px-4 py-2",
  onSearchSubmit,
}: Readonly<HeaderSearchInputProps>) {
  const searchIcon = (
    <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
  );

  return (
    <div className={className}>
      {onSearchSubmit ? (
        <button
          type="button"
          aria-label="Search"
          onClick={onSearchSubmit}
          className="shrink-0 rounded-full p-0.5 hover:bg-slate-200"
        >
          {searchIcon}
        </button>
      ) : (
        searchIcon
      )}
      <input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSearchSubmit?.();
          }
        }}
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
      />
    </div>
  );
}
