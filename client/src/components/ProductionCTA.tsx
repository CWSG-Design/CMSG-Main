import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductionCTA() {
  return (
    <section className="py-24 lg:py-28 bg-cream">
      <div className="w-full px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-forest text-bone p-10 md:p-16">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sage/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-3 py-1 text-xs uppercase tracking-[0.18em] mb-5">
                <Clock className="h-3.5 w-3.5" /> Production Timeline
              </div>
              <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                Channel letter signs in <span className="italic text-sage">10 days</span> or less.
              </h3>
              <p className="mt-5 text-bone/80 max-w-md leading-relaxed">
                From the initial design phase to final delivery, clients receive efficient, cost-effective, and reliable support at every stage. CNC precision cutting and automated bending — no shortcuts, no compromises.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:justify-end gap-3">
              <Button size="lg" className="bg-bone text-forest hover:bg-sage hover:text-bone rounded-full px-7">
                Learn about timeline
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/quote">
                <Button size="lg" className="bg-transparent border border-bone text-bone hover:bg-bone hover:text-forest rounded-full px-7 w-full">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
