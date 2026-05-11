import React from "react";
import { values } from "../mock/mock";
import { Hammer, Handshake, BadgeCheck, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const ICONS = [BadgeCheck, Handshake, Sparkles, Hammer];

export default function ValuesSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">About Us</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
              Products that <span className="italic text-sage">align</span> with our values.
            </h2>
            <p className="mt-6 text-stone-700 leading-relaxed max-w-md">
              For more than two decades we’ve focused on one thing — making the best wholesale channel letters in North America. No distractions. Just relentless craft.
            </p>
            <Button className="mt-8 bg-forest hover:bg-forest-dark text-bone rounded-full px-6">
              About CWS
            </Button>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={v.title}
                  className="group relative bg-white rounded-2xl p-7 border border-stone-200 hover:border-sage hover:shadow-xl hover:shadow-forest/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-xl bg-forest text-bone flex items-center justify-center mb-5 group-hover:bg-sage transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-forest">{v.title}</h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
