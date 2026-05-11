import React, { useRef } from "react";
import { products } from "../mock/mock";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function ProductsSection() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="products" className="relative py-24 lg:py-32 bg-forest text-bone overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ece8dc 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Products</div>
            <h2 className="font-serif text-4xl md:text-5xl text-bone leading-tight max-w-2xl">
              Custom <span className="italic text-sage">business signs</span> — crafted to spec.
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
            <a
              key={p.slug}
              href={`#${p.slug}`}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
