import { processSteps } from "@/lib/mock";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#1a2e1a]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#8dc63f] mb-3">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Concept to Installation
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base leading-relaxed">
            Six disciplined steps — every project, every time. No shortcuts,
            no surprises.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((s, idx) => (
            <div
              key={s.step}
              className="relative group rounded-xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition-colors duration-200"
              style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
            >
              {/* Step number — large background numeral */}
              <span
                className="absolute top-4 right-5 text-7xl font-black text-white/5 select-none leading-none"
                aria-hidden="true"
              >
                {s.step}
              </span>

              {/* Green step indicator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#8dc63f] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#1a2e1a]">{idx + 1}</span>
                </div>
                <div className="h-px flex-1 bg-[#8dc63f]/30" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm">
            Ready to start a project?{" "}
            <a
              href="/contact"
              className="text-[#8dc63f] font-semibold hover:underline transition-colors"
            >
              Get in touch with our team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
