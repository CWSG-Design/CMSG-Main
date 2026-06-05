import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ShareBar from "@/components/ShareBar";
import { products } from "@/lib/mock";

const categories = [
  { label: "All Products", value: "all" },
  { label: "Illuminated", value: "illuminated" },
  { label: "Non-Illuminated", value: "non-illuminated" },
  { label: "Interior", value: "interior" },
  { label: "Exterior", value: "exterior" },
];

const productCategories: Record<string, string[]> = {
  "front-lit-channel-letters": ["illuminated", "exterior"],
  "halo-illuminated-channel-letters": ["illuminated", "exterior"],
  "face-halo-combination": ["illuminated", "exterior"],
  "trimless-channel-letters": ["illuminated", "exterior"],
  "fascia-storefront-signs": ["illuminated", "exterior"],
  "interior-hanging-signs": ["illuminated", "interior"],
  "3d-printed-signs": ["illuminated", "interior", "exterior"],
  "pylon-ground-signs": ["illuminated", "exterior"],
  "push-through-faux-neon": ["illuminated", "interior", "exterior"],
  "flat-cut-out-letters": ["non-illuminated", "interior", "exterior"],
  "channel-letters-on-raceways": ["illuminated", "exterior"],
  "tenant-panels": ["illuminated", "exterior"],
  "open-face-channel-letters": ["illuminated", "exterior"],
};

export default function ProductsPage() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? products
    : products.filter((p) => (productCategories[p.slug] ?? []).includes(active));

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
          <div className="absolute top-20 -left-40 h-[420px] w-[420px] rounded-full bg-sage/20 blur-3xl" />
        </div>
        <div className="max-w-site mx-auto px-4 lg:px-6 pt-16 lg:pt-24 pb-12 lg:pb-16">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Product Catalogue</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest leading-[1.04] max-w-4xl">
            Premium signage,<br />
            <span className="italic text-sage">built in Canada.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-stone-700 leading-relaxed text-lg">
            Thirteen product types. Every one fabricated at our Guelph, Ontario facility using CNC precision routing, automated letter bending, and CSA-certified LED components. B2B wholesale pricing — shipped coast-to-coast in 10 days or less.
          </p>
          <div className="mt-6">
            <ShareBar
              variant="full"
              title="Product Catalogue — Canadian Wholesale Sign Group"
              description="13 premium signage product types fabricated in Canada. Channel letters, 3D printed signs, fascia signs, pylon signs, and more. B2B wholesale pricing shipped coast-to-coast."
            />
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b border-stone-200 py-3">
        <div className="max-w-site mx-auto px-4 lg:px-6 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat.value
                  ? "bg-forest text-bone"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-forest hover:text-forest"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-site mx-auto px-4 lg:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((product) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-forest hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(productCategories[product.slug] ?? []).map((cat) => (
                      <span key={cat} className="text-[10px] uppercase tracking-wider font-semibold bg-sage/15 text-forest px-2 py-0.5 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-xl text-forest group-hover:text-sage transition-colors">{product.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed line-clamp-3">{product.blurb}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs text-sage font-semibold uppercase tracking-wider">
                    View specs & details <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 bg-forest text-bone">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-bone mb-4">
            Don't see exactly what you need?
          </h2>
          <p className="text-bone/75 mb-8 leading-relaxed max-w-xl mx-auto">
            We fabricate custom signage solutions beyond our standard catalogue. Send us your project brief and we'll work with you to spec the right product.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/quote">
              <Button className="bg-sage text-forest hover:bg-bone hover:text-forest rounded-full px-8 py-3 text-sm font-semibold transition-all active:scale-[0.97]">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="rounded-full px-8 py-3 text-sm font-semibold border-bone text-bone hover:bg-bone hover:text-forest transition-all active:scale-[0.97]">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
