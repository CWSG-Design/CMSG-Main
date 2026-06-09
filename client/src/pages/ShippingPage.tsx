import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { shipping, brand } from "@/lib/mock";
import { ArrowRight, Truck, DollarSign, PackageCheck, Leaf, Clock, MapPin } from "lucide-react";

const ICONS = [Truck, DollarSign, PackageCheck, Leaf];

export default function ShippingPage() {
  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
          <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-sage/20 blur-3xl" />
        </div>
        <div className="w-full pt-16 lg:pt-24 pb-12 lg:pb-16">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Logistics</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest leading-[1.04] max-w-4xl">
            Canada-wide <span className="italic text-sage">shipping</span>, one flat rate.
          </h1>
          <p className="mt-6 max-w-2xl text-stone-700 leading-relaxed text-lg">{shipping.intro}</p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 lg:py-24">
        <div className="w-full">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-serif text-3xl md:text-4xl text-forest">What's included</h2>
            <div className="text-sm text-stone-500 max-w-md">Every quote bakes in our packaging, crating, and freight — no add-ons at delivery.</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {shipping.highlights.map((h, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={h.title} className="bg-white rounded-2xl p-7 border border-stone-200">
                  <div className="h-12 w-12 rounded-xl bg-sage/15 flex items-center justify-center text-forest mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl text-forest">{h.title}</h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{h.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transit times */}
      <section className="py-20 lg:py-28 bg-bone">
        <div className="w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Transit Map</div>
              <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
                Estimated <span className="italic text-sage">transit times</span>.
              </h2>
              <p className="mt-5 text-stone-700 leading-relaxed">
                Transit windows below are typical for ground freight from our facility in Guelph, ON. We'll confirm the exact ETA the day your crate leaves the dock.
              </p>
              <div className="mt-8 relative aspect-[5/4] rounded-2xl overflow-hidden border border-stone-200 bg-white">
                <img
                  src="https://picsum.photos/seed/cws-canada-map/900/720"
                  alt="CWS one-rate shipping map of Canada"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-forest text-bone text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <MapPin className="h-3.5 w-3.5" /> One-Rate Map
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="px-7 py-5 border-b border-stone-100 flex items-center justify-between bg-forest text-bone">
                  <div className="font-serif text-xl">Region</div>
                  <div className="text-xs uppercase tracking-[0.18em] opacity-80">Typical Transit</div>
                </div>
                <ul>
                  {shipping.transit.map((t, i) => (
                    <li
                      key={t.region}
                      className={`flex items-center justify-between px-7 py-5 hover:bg-cream/60 transition-colors ${
                        i !== shipping.transit.length - 1 ? "border-b border-stone-100" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-full bg-sage/15 text-forest flex items-center justify-center">
                          <Truck className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-stone-800">{t.region}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-600">
                        <Clock className="h-4 w-4 text-sage" />
                        {t.days}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-xs text-stone-500">
                * Transit times exclude production lead time and customs processing for cross-border shipments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production timeline CTA */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-3xl bg-forest text-bone p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center">
            <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sage/25 blur-3xl" />
            <div className="relative">
              <h3 className="font-serif text-3xl md:text-4xl leading-tight">
                See our <span className="italic text-sage">production timeline</span>.
              </h3>
              <p className="mt-4 text-bone/80 max-w-md">From approved artwork to crate on the truck in 10 business days or less.</p>
            </div>
            <div className="relative flex md:justify-end">
              <Link to="/quote">
                <Button size="lg" className="bg-bone text-forest hover:bg-sage hover:text-bone rounded-full px-7">
                  Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <p className="mt-6 text-xs text-stone-500">Questions about shipping to a specific postal code? Call {brand.phone}.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
