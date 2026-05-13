interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryButton({ label, isActive, onClick }: Readonly<CategoryButtonProps>) {
  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "bg-slate-100 text-slate-700 hover:bg-slate-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {label}
    </button>
  );
}
