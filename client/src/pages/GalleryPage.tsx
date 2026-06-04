import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ZoomIn } from "lucide-react";
import { gallery } from "@/lib/mock";

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Channel Letters", value: "channel" },
  { label: "3D Printed", value: "3d" },
  { label: "Interior", value: "interior" },
  { label: "Exterior", value: "exterior" },
  { label: "Installation", value: "install" },
];

// Tag each gallery item so filters work
const taggedGallery = gallery.map((item) => {
  const alt = item.alt.toLowerCase();
  const tags: string[] = [];
  if (alt.includes("channel") || alt.includes("front lit") || alt.includes("halo") || alt.includes("raceway") || alt.includes("open face")) tags.push("channel");
  if (alt.includes("3d") || alt.includes("printed") || alt.includes("hanging") || alt.includes("interior") || alt.includes("dimensional")) tags.push("3d");
  if (alt.includes("interior") || alt.includes("hanging") || alt.includes("lobby") || alt.includes("wall")) tags.push("interior");
  if (alt.includes("exterior") || alt.includes("storefront") || alt.includes("night") || alt.includes("fascia") || alt.includes("pylon") || alt.includes("snow") || alt.includes("mall") || alt.includes("daytime") || alt.includes("building")) tags.push("exterior");
  if (alt.includes("install") || alt.includes("crew") || alt.includes("truck") || alt.includes("ladder")) tags.push("install");
  if (tags.length === 0) tags.push("exterior");
  return { ...item, tags };
});

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "all" ? taggedGallery : taggedGallery.filter((i) => i.tags.includes(active));

  const currentLightboxItem = lightbox !== null ? filtered[lightbox] : null;

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
          <div className="absolute top-20 -right-40 h-[420px] w-[420px] rounded-full bg-sage/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-12 lg:pb-16">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Project Gallery</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest leading-[1.04] max-w-4xl">
            Real projects.<br />
            <span className="italic text-sage">Real results.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-stone-700 leading-relaxed text-lg">
            Every image in this gallery is a real CWS project — fabricated at our Guelph, Ontario facility and installed across Canada. From national retail brands to independent boutiques, our work speaks for itself.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === f.value
                  ? "bg-forest text-bone"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-forest hover:text-forest"
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-xs opacity-60">
                {f.value === "all" ? taggedGallery.length : taggedGallery.filter((i) => i.tags.includes(f.value)).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in"
                onClick={() => setLightbox(idx)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-forest/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-bone text-xs leading-snug line-clamp-2">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-24 text-stone-500">
              <p className="text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-bone">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-bone mb-4">Want your project featured here?</h2>
          <p className="text-bone/75 mb-8 leading-relaxed max-w-xl mx-auto">
            Send us photos of completed CWS installations and we'll add them to the gallery. Great for showcasing your work to potential clients.
          </p>
          <Link to="/contact">
            <Button className="bg-sage text-forest hover:bg-bone hover:text-forest rounded-full px-8 py-3 text-sm font-semibold transition-all active:scale-[0.97]">
              Submit Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentLightboxItem.src}
              alt={currentLightboxItem.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-3 text-center text-white/80 text-sm">{currentLightboxItem.alt}</div>
            <div className="absolute inset-y-0 left-0 flex items-center -translate-x-14">
              <button
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={() => setLightbox((prev) => prev !== null ? Math.max(0, prev - 1) : null)}
              >
                ←
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center translate-x-14">
              <button
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={() => setLightbox((prev) => prev !== null ? Math.min(filtered.length - 1, prev + 1) : null)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
