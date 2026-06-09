import { useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/mock";

export default function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "next" ? 360 : -360, behavior: "smooth" });
  };

  return (
    <section id="products" className="py-24 lg:py-32 bg-forest overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Products</div>
            <h2 className="font-serif text-4xl md:text-5xl text-bone leading-tight max-w-2xl">
              Full-range custom <span className="italic text-sage">signage solutions</span> — crafted to spec.
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              aria-label="Previous"
              onClick={() => scroll("prev")}
              className="h-12 w-12 rounded-full border border-bone/30 text-bone hover:bg-sage hover:border-sage transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => scroll("next")}
              className="h-12 w-12 rounded-full border border-bone/30 text-bone hover:bg-sage hover:border-sage transition-colors flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {products.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className="group flex-shrink-0 w-[280px] md:w-[340px] snap-start bg-cream text-forest rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-bone/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-forest" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-forest">{p.title}</h3>
                <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{p.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
