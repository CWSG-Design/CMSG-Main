import { resources } from "@/lib/mock";
import { BookOpen, Info, Library, ShieldCheck, PlayCircle, HelpCircle, Rss, ArrowUpRight } from "lucide-react";

const ICONS = [BookOpen, Info, Library, ShieldCheck, PlayCircle, HelpCircle, Rss];

export default function ResourcesSection() {
  return (
    <section id="resources" className="relative py-24 lg:py-32 bg-bone overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Resources</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-xl">
              You have questions. <span className="italic text-sage">We have answers.</span>
            </h2>
          </div>
          <p className="text-stone-600 max-w-sm">
            Specs, install guides, warranties and the deep technical knowledge to help you sell, design and install with confidence.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((r, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <a
                key={r.title}
                href="#"
                className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-forest hover:bg-forest hover:text-bone transition-all duration-300 flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <div className="h-11 w-11 rounded-lg bg-cream group-hover:bg-bone/15 flex items-center justify-center text-forest group-hover:text-bone transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl mt-5 text-forest group-hover:text-bone transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 group-hover:text-bone/80 leading-relaxed transition-colors">
                    {r.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-sage group-hover:text-bone transition-colors">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
