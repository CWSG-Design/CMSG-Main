import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "wouter";
import { brand, navLinks } from "@/lib/mock";
import { Button } from "@/components/ui/button";

// Official CWS logos — use light version on cream/white backgrounds
const LOGO_LIGHT = "/manus-storage/logo-black-transparent_b82614d3.webp";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur border-b border-stone-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src={LOGO_LIGHT}
            alt="Canadian Wholesale Sign Group"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-stone-700 hover:text-forest transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sage hover:after:w-full after:transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${brand.phone}`} className="flex items-center gap-2 text-sm text-stone-700 hover:text-forest">
            <Phone className="h-4 w-4" /> {brand.phone}
          </a>
          <Link to="/quote">
            <Button className="bg-forest hover:bg-forest-dark text-bone rounded-full px-5">Get a Quote</Button>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-forest"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-stone-200">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-stone-800 border-b border-stone-100"
              >
                {l.label}
              </a>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)}>
              <Button className="w-full bg-forest hover:bg-forest-dark text-bone rounded-full mt-2">Get a Quote</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
