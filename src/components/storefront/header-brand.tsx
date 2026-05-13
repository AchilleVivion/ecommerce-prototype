export function HeaderBrand() {
  return (
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
  );
}
