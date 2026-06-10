import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Package, Image, Truck, Wrench, Users, BookOpen, ClipboardList, MessageSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import { brand } from "@/lib/mock";
import { Button } from "@/components/ui/button";

// Official CWS logos
const LOGO_LIGHT = "/manus-storage/logo-black-transparent_b82614d3.webp";

/* ─── Nav item definitions ─────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    icon: <Package className="h-5 w-5" />,
    description: "15 sign types",
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: <Image className="h-5 w-5" />,
    description: "Real projects",
  },
  {
    label: "Shipping",
    href: "/shipping",
    icon: <Truck className="h-5 w-5" />,
    badge: "10-day",
    badgeColor: "bg-sage text-white",
    description: "Coast-to-coast",
  },
  {
    label: "Installation",
    href: "/installation",
    icon: <Wrench className="h-5 w-5" />,
    description: "Guides & tips",
  },
  {
    label: "Installer Directory",
    href: "/installation-directory",
    icon: <Users className="h-5 w-5" />,
    description: "Find a pro",
  },
  {
    label: "Resources",
    href: "/resources",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Specs & docs",
  },
  {
    label: "Sign Assessment",
    href: "/assessment",
    icon: <ClipboardList className="h-5 w-5" />,
    badge: "New",
    badgeColor: "bg-forest text-bone",
    description: "Find your sign",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <MessageSquare className="h-5 w-5" />,
    description: "Get in touch",
  },
];

/* ─── Mobile nav item ──────────────────────────────────────────────────────── */
function MobileNavItem({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-forest text-bone"
          : "text-stone-800 hover:bg-stone-100"
      }`}
    >
      <span className={`flex-shrink-0 ${active ? "text-bone" : "text-forest"}`}>
        {item.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{item.label}</span>
          {item.badge && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${item.badgeColor}`}>
              {item.badge}
            </span>
          )}
        </div>
        <p className={`text-xs mt-0.5 ${active ? "text-bone/70" : "text-stone-500"}`}>{item.description}</p>
      </div>
    </Link>
  );
}

/* ─── Component ────────────────────────────────────────────────────────────── */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className="sticky top-0 z-50">

      {/* ── Tier 1: Logo bar ─────────────────────────────────────────────── */}
      <div className={`transition-all duration-300 ${scrolled ? "bg-forest-dark" : "bg-forest-dark"}`}>
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-between py-3.5">
            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src={LOGO_LIGHT}
                alt="Canadian Wholesale Sign Group"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>

            {/* Contact info — desktop only */}
            <div className="hidden lg:flex items-center gap-6 text-bone/75">
              <a
                href={`tel:${brand.phone}`}
                className="flex items-center gap-2 text-sm hover:text-bone transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-sage" />
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-2 text-sm hover:text-bone transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-sage" />
                {brand.email}
              </a>
              <Link to="/quote">
                <Button
                  size="sm"
                  className="bg-sage hover:bg-sage/90 text-forest font-semibold rounded-full px-5 h-9 text-sm animate-quote-pulse"
                >
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              className="lg:hidden p-2 text-bone hover:text-sage transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Tier 2: Nav bar ──────────────────────────────────────────────── */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
          scrolled
            ? "bg-cream/97 backdrop-blur-md border-b border-stone-200 shadow-sm"
            : "bg-cream border-b border-stone-200"
        }`}
      >
        <div className="w-full px-6 lg:px-10">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group relative flex flex-col items-center gap-1 px-4 py-3.5 rounded-lg transition-all duration-150 ${
                    isActive
                      ? "text-forest"
                      : "text-stone-600 hover:text-forest hover:bg-stone-50"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sage rounded-full" />
                  )}

                  {/* Icon + badge row */}
                  <div className="flex items-center gap-1.5">
                    <span className={`transition-colors ${isActive ? "text-sage" : "text-stone-400 group-hover:text-sage"}`}>
                      {item.icon}
                    </span>
                    <span className={`text-[15px] font-semibold leading-none ${isActive ? "text-forest" : ""}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Description sub-label */}
                  <span className={`text-xs leading-none transition-colors ${
                    isActive ? "text-sage" : "text-stone-400 group-hover:text-stone-500"
                  }`}>
                    {item.description}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-stone-200 shadow-lg">
          <div className="w-full px-4 py-4">
            {/* Contact strip */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone-200">
              <a href={`tel:${brand.phone}`} className="flex items-center gap-1.5 text-sm text-stone-600">
                <Phone className="h-3.5 w-3.5 text-sage" /> {brand.phone}
              </a>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-1.5 text-sm text-stone-600 truncate">
                <Mail className="h-3.5 w-3.5 text-sage" /> {brand.email}
              </a>
            </div>

            {/* Nav items grid */}
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                return (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    active={isActive}
                    onClick={() => setOpen(false)}
                  />
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-4 pt-4 border-t border-stone-200">
              <Link to="/quote" onClick={() => setOpen(false)}>
                <Button className="w-full bg-forest hover:bg-forest-dark text-bone rounded-full font-semibold">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
