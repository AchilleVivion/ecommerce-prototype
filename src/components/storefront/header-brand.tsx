import { HeaderNavLinks } from "./header-nav-links";

export function HeaderBrand() {
  return (
    <div className="flex items-center gap-8">
      <h1 className="text-2xl font-bold text-slate-900">ShopHub</h1>
      <HeaderNavLinks className="hidden gap-6 md:flex" />
    </div>
  );
}
