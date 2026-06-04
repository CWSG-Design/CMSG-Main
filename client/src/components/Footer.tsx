import { Link } from "wouter";
import { brand, navLinks, products } from "@/lib/mock";
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";

// White+green logo for dark forest-dark background
const LOGO_WHITE = "/manus-storage/logo-white-transparent_9b8ef757.webp";

export default function Footer() {
  return (
    <footer id="contact" className="bg-forest-dark text-bone">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center">
              <img
                src={LOGO_WHITE}
                alt="Canadian Wholesale Sign Group"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mt-5 text-bone/70 leading-relaxed max-w-sm">
              Canada's dedicated wholesale signage partner since {brand.founded}. Premium LED channel letters, fascia signs, pylon signs, and custom interior signage — shipped coast-to-coast.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-bone/20 flex items-center justify-center hover:bg-sage hover:border-sage transition-colors"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-bone/75 hover:text-bone transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-4">Products</div>
            <ul className="space-y-2.5">
              {products.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`} className="text-sm text-bone/75 hover:text-bone transition-colors">{p.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-4">Contact</div>
            <ul className="space-y-3 text-sm text-bone/80">
              <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-sage" /> {brand.phone}</li>
              <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-sage" /> {brand.email}</li>
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-sage" /> {brand.address}</li>
            </ul>
            <Link to="/quote" className="inline-block mt-6 rounded-full bg-sage hover:bg-bone hover:text-forest text-forest px-5 py-2.5 text-sm font-semibold transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-bone/15 flex flex-col md:flex-row gap-3 justify-between text-xs text-bone/55">
          <div>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-bone">Privacy</a>
            <a href="#" className="hover:text-bone">Terms</a>
            <a href="#" className="hover:text-bone">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
