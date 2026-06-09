import { Link } from "wouter";
import { Truck, Wrench, ArrowUpRight } from "lucide-react";

const cards = [
  {
    to: "/shipping",
    eyebrow: "Logistics",
    title: "Canada-wide shipping, one flat rate.",
    body: "North America-wide freight from Guelph, ON. Enclosed crates, peanut-free packaging, all-inclusive flat rates to every Canadian province — plus the U.S. Lower 48. Professional results delivered on time.",
    Icon: Truck,
    arrowBg: "bg-sage text-forest",
    photo: "/manus-storage/install_delivery_truck_50851248.jpg",
    photoAlt: "Channel letters on delivery truck ready for installation",
  },
  {
    to: "/installation",
    eyebrow: "Installation",
    title: "A clean install, every time.",
    body: "All CWS signs ship with full installation documentation, Canadian Electrical Code references, and instructional videos. Our installer partner network is available across Canada for end-to-end project support.",
    Icon: Wrench,
    arrowBg: "bg-bone text-forest",
    photo: "/manus-storage/install_action_ladders_d567f9bd.jpg",
    photoAlt: "Installation crew mounting channel letters on ladders",
  },
];

export default function ShippingInstallSection() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Logistics &amp; Install</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight max-w-xl">
              We ship it. <span className="italic text-sage">You install it.</span> Beautifully.
            </h2>
          </div>
          <p className="text-stone-600 max-w-sm">
            End-to-end management from initial design to final installation — efficient, cost-effective, and reliable at every stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative overflow-hidden rounded-3xl min-h-[340px] transition-transform hover:-translate-y-1"
            >
              {/* Real photo background */}
              <div className="absolute inset-0">
                <img
                  src={c.photo}
                  alt={c.photoAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark overlay for text legibility */}
                <div className="absolute inset-0 bg-forest/72 group-hover:bg-forest/62 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="relative p-10 md:p-12 text-bone h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold mb-5">
                    <c.Icon className="h-4 w-4 text-sage" />
                    <span className="text-sage">{c.eyebrow}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight">{c.title}</h3>
                  <p className="mt-5 leading-relaxed max-w-md text-bone/85">{c.body}</p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]">
                  Learn more
                  <span className={`h-7 w-7 rounded-full flex items-center justify-center ${c.arrowBg} group-hover:translate-x-1 transition-transform`}>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
