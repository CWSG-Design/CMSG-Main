import { useState } from "react";
import { testimonials } from "@/lib/mock";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const perView = 3;
  const total = testimonials.length;
  const next = () => setIdx((idx + 1) % total);
  const prev = () => setIdx((idx - 1 + total) % total);
  const visible = Array.from({ length: perView }).map((_, i) => testimonials[(idx + i) % total]);

  return (
    <section className="py-24 lg:py-32 bg-bone">
      <div className="max-w-site mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Testimonials</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-xl">
              What our <span className="italic text-sage">clients</span> say.
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={prev} aria-label="Previous" className="h-12 w-12 rounded-full border border-forest/30 text-forest hover:bg-forest hover:text-bone transition-colors flex items-center justify-center">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Next" className="h-12 w-12 rounded-full border border-forest/30 text-forest hover:bg-forest hover:text-bone transition-colors flex items-center justify-center">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div
              key={`${t.name}-${idx}-${i}`}
              className="bg-white rounded-2xl p-7 border border-stone-200 flex flex-col fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Quote className="h-7 w-7 text-sage mb-4" />
              <p className="text-stone-700 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-6 pt-6 border-t border-stone-100">
                <div className="font-serif text-lg text-forest">{t.name}</div>
                <div className="text-xs uppercase tracking-wider text-stone-500 mt-1">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
