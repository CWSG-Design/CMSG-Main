import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { installation } from "@/lib/mock";
import { ArrowLeft, ArrowRight, PlayCircle, AlertTriangle, Zap } from "lucide-react";

export default function InstallationPage() {
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
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-forest mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Product Information</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest leading-[1.04] max-w-4xl">
            LED letter <span className="italic text-sage">installation</span> guide.
          </h1>
          <p className="mt-6 max-w-3xl text-stone-700 leading-relaxed text-lg">{installation.intro}</p>
          <div className="mt-7 inline-flex items-start gap-3 bg-sage/15 border border-sage/30 rounded-xl p-4 max-w-2xl">
            <AlertTriangle className="h-5 w-5 text-forest shrink-0 mt-0.5" />
            <p className="text-sm text-forest leading-relaxed">
              <strong>Code reference:</strong> CSA C22.1 Section 34 (Signs) governs LED channel-letter installations in Canada. Always cross-check with your local authority having jurisdiction.
            </p>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="pb-8">
        <div className="max-w-site mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-5">
            {installation.videos.map((v) => (
              v.url ? (
                <a
                  key={v.label}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-white rounded-2xl border border-stone-200 p-5 hover:border-forest hover:shadow-lg transition-all"
                >
                  <span className="h-14 w-14 rounded-xl bg-forest group-hover:bg-sage text-bone flex items-center justify-center transition-colors">
                    <PlayCircle className="h-7 w-7" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-sage font-semibold">Watch video</div>
                    <div className="font-serif text-lg text-forest mt-1">{v.label}</div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-stone-400 group-hover:text-forest transition-colors" />
                </a>
              ) : (
                <div
                  key={v.label}
                  className="flex items-center gap-4 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 p-5 opacity-60"
                >
                  <span className="h-14 w-14 rounded-xl bg-stone-200 text-stone-400 flex items-center justify-center">
                    <PlayCircle className="h-7 w-7" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold">Video Coming Soon</div>
                    <div className="font-serif text-lg text-stone-500 mt-1">{v.label}</div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-28">
        <div className="max-w-site mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">The Process</div>
              <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-xl">
                Seven steps to a <span className="italic text-sage">clean install</span>.
              </h2>
            </div>
            <p className="text-stone-600 max-w-sm">Follow the steps below in order. Every letter set ships with a colour-coded wiring diagram and a transformer breakdown sheet.</p>
          </div>
          <ol className="relative border-l-2 border-sage/40 ml-3 space-y-10">
            {installation.steps.map((s, i) => (
              <li key={s.title} className="pl-8 relative">
                <span className="absolute -left-[19px] top-1 h-9 w-9 rounded-full bg-forest text-bone flex items-center justify-center font-serif text-sm font-semibold ring-4 ring-cream">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-sage hover:shadow-xl hover:shadow-forest/5 transition-all">
                  <h3 className="font-serif text-2xl text-forest">{s.title}</h3>
                  <p className="mt-3 text-stone-700 leading-relaxed">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety callout */}
      <section className="py-16 lg:py-20 bg-forest text-bone">
        <div className="max-w-5xl mx-auto px-6 lg:px-6 text-center">
          <div className="inline-flex h-14 w-14 rounded-full bg-sage/20 items-center justify-center mb-5">
            <Zap className="h-6 w-6 text-sage" />
          </div>
          <h3 className="font-serif text-3xl md:text-4xl leading-tight">
            Install at least one disconnect within <span className="italic text-sage">line of sight</span> of the transformers.
          </h3>
          <p className="mt-5 max-w-2xl mx-auto text-bone/80 leading-relaxed">
            Required on the primary 'hot' lead and rated for the application. Signs cannot be connected to a branch circuit exceeding 30 amperes.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link to="/quote">
              <Button size="lg" className="bg-bone text-forest hover:bg-sage hover:text-bone rounded-full px-7">
                Start a project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/shipping">
              <Button size="lg" className="bg-transparent border border-bone text-bone hover:bg-bone hover:text-forest rounded-full px-7">
                View shipping info
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
