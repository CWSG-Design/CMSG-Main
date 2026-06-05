import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { brand, stats } from "@/lib/mock";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
        <div className="absolute -top-32 -right-20 h-[520px] w-[520px] rounded-full bg-sage/25 blur-3xl" />
        <div className="absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-forest/10 blur-3xl" />
      </div>

      <div className="max-w-site mx-auto px-4 lg:px-6 pt-16 lg:pt-24 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/60 backdrop-blur px-3 py-1 text-xs uppercase tracking-[0.18em] text-forest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Canada's Dedicated Wholesale Partner
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-forest leading-[1.02]">
              Premium LED
              <span className="block italic font-normal text-sage">Channel Letters</span>
              made in Canada.
            </h1>
            <p className="mt-7 max-w-xl text-base md:text-lg text-stone-700 leading-relaxed">
              Since {brand.founded}, {brand.fullName} has been a trusted B2B partner for high-quality custom business signage across North America. We provide a dependable, innovative alternative to traditional wholesale suppliers — specializing in premium LED channel letters, fascia signs, pylon signs, and custom interior signage.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/quote">
                <Button size="lg" className="bg-forest hover:bg-forest-dark text-bone rounded-full px-7 group">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-forest text-forest hover:bg-forest hover:text-bone rounded-full px-7"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Resources
                </Button>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-stone-200 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl text-forest font-semibold">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-stone-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-forest/20">
              <img
                src="/manus-storage/hero_bone_biscuit_night_41fdab16.jpg"
                alt="The Bone & Biscuit Co. illuminated channel letters at night"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-bone">
                <div className="text-xs uppercase tracking-[0.2em] opacity-80">Featured Project</div>
                <div className="font-serif text-2xl mt-1">The Bone &amp; Biscuit Co. — Front Lit</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-white rounded-2xl shadow-xl p-5 max-w-[220px] border border-stone-100">
              <div className="text-xs uppercase tracking-wider text-sage font-semibold">Lead Time</div>
              <div className="font-serif text-2xl text-forest mt-1">10 days or less</div>
              <div className="text-xs text-stone-500 mt-1">From approved artwork to crate.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
