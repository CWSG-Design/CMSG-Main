import { useState } from "react";
import { gallery } from "@/lib/mock";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryItem { id: number; src: string; alt: string; }

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const visible = gallery.slice(0, 12);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream">
      <div className="w-full px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Our Work</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-xl">
              A portfolio shaped by <span className="italic text-sage">thousands</span> of installs.
            </h2>
          </div>
          <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-bone rounded-full self-start md:self-end">
            View full gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {visible.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightbox(img)}
              className={`group relative overflow-hidden rounded-xl ${
                i % 7 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/30 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-forest-dark/95 flex items-center justify-center p-4 fade-up"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 h-11 w-11 rounded-full bg-bone/10 text-bone hover:bg-bone/20 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox.src} alt={lightbox.alt} className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}
