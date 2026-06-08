import { values, about } from "@/lib/mock";
import { Star, Settings2, Zap, Users } from "lucide-react";

const ICONS = [Star, Settings2, Zap, Users];

export default function ValuesSection() {
  return (
    <section className="py-20 lg:py-28 bg-forest text-bone">
      <div className="max-w-site mx-auto">

        {/* About intro */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 mb-16 pb-16 border-b border-bone/10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Who We Are</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Canada's dedicated <span className="italic text-sage">wholesale signage</span> partner.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <p className="text-bone/80 leading-relaxed">{about.body}</p>
            <p className="text-bone/60 text-sm leading-relaxed">{about.manufacturing}</p>
          </div>
        </div>

        {/* Four pillars */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Our Four Pillars</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-xl">
              Built on principles that <span className="italic text-sage">last.</span>
            </h2>
          </div>
          <p className="text-bone/70 max-w-sm">
            Every decision we make — from materials to manufacturing to shipping — reflects these four commitments.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={v.title} className="bg-white/5 rounded-2xl p-7 border border-bone/10 hover:bg-white/10 transition-colors">
                <div className="h-11 w-11 rounded-lg bg-sage/20 flex items-center justify-center text-sage mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl">{v.title}</h3>
                <p className="mt-3 text-sm text-bone/70 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
