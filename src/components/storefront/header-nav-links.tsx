export const NAV_LINKS = [
  { label: "All Products", href: "#" },
  { label: "Categories", href: "#" },
  { label: "Deals", href: "#" },
] as const;

interface HeaderNavLinksProps {
  className?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
}

export function HeaderNavLinks({
  className,
  linkClassName = "text-sm font-medium text-slate-700 hover:text-slate-900",
  onLinkClick,
}: Readonly<HeaderNavLinksProps>) {
  return (
    <nav className={className}>
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={linkClassName}
          onClick={onLinkClick}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
