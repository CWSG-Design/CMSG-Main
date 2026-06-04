import { Link } from "wouter";
import { Truck, Wrench, ArrowUpRight } from "lucide-react";

const cards = [
  {
    to: "/shipping",
    eyebrow: "Logistics",
    title: "Canada-wide shipping, one flat rate.",
    body: "Coast-to-coast freight from Guelph, ON. Enclosed crates, peanut-free packaging, all-inclusive pricing to every province.",
    Icon: Truck,
    bg: "bg-forest text-bone",
    arrowBg: "bg-bone text-forest",
    accent: "text-sage",
    bodyClass: "text-bone/80",
  },
  {
    to: "/installation",
    eyebrow: "Installation",
    title: "A clean install, every time.",
    body: "Step-by-step LED channel-letter wiring guide, Canadian Electrical Code references, and instructional videos for your crew.",
    Icon: Wrench,
    bg: "bg-bone text-forest",
    arrowBg: "bg-forest text-bone",
    accent: "text-sage",
    bodyClass: "text-stone-700",
  },
];

export default function ShippingInstallSection() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Logistics & Install</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-xl">
              We ship it. <span className="italic text-sage">You install it.</span> Beautifully.
            </h2>
          </div>
          <p className="text-stone-600 max-w-sm">
            From the crate yard to the wall, we make sure every CWS sign arrives ready and goes up clean.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className={`group relative overflow-hidden rounded-3xl p-10 md:p-12 ${c.bg} transition-transform hover:-translate-y-1`}
            >
              <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-sage/15 blur-3xl group-hover:bg-sage/25 transition-colors" />
              <div className="relative flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold mb-5">
                    <c.Icon className={`h-4 w-4 ${c.accent}`} />
                    <span className={c.accent}>{c.eyebrow}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight">{c.title}</h3>
                  <p className={`mt-5 leading-relaxed max-w-md ${c.bodyClass}`}>{c.body}</p>
                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]">
                    Learn more
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center ${c.arrowBg} group-hover:translate-x-1 transition-transform`}>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
