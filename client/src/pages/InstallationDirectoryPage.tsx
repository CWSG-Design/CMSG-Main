import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Wrench, Truck, Search, Users } from "lucide-react";
import { Link } from "wouter";

type Installer = {
  companyName: string; website: string;
  firstName: string; lastName: string;
  email: string; phone: string;
  city: string; province: string; country: string;
  capabilities: string; equipment: string;
  areasServed: string; maxTravel: string;
  ts: number;
};

// Sample seed data so the directory isn't empty on first load
const SEED: Installer[] = [
  {
    companyName: "Northern Lights Sign Service",
    website: "northernlightssigns.ca",
    firstName: "Mike", lastName: "Tremblay",
    email: "mike@northernlightssigns.ca",
    phone: "613-555-0182",
    city: "Ottawa", province: "Ontario", country: "Canada",
    capabilities: "Permits, installs, removals, electrical and non-electrical, interior and exterior signage",
    equipment: "35'–65' vehicle reach, boom truck, scissor lift",
    areasServed: "Ottawa, Kingston, Brockville, Smiths Falls",
    maxTravel: "Up to 300 km from Ottawa, ON",
    ts: Date.now() - 86400000 * 5,
  },
  {
    companyName: "Prairie Sign Installations",
    website: "prairiesigns.ca",
    firstName: "Sandra", lastName: "Kowalski",
    email: "sandra@prairiesigns.ca",
    phone: "204-555-0247",
    city: "Winnipeg", province: "Manitoba", country: "Canada",
    capabilities: "Channel letter installs, removals, electrical work, permits",
    equipment: "40'–80' vehicle reach, crane, trailer",
    areasServed: "Winnipeg, Brandon, Portage la Prairie",
    maxTravel: "Province-wide Manitoba, SE Saskatchewan",
    ts: Date.now() - 86400000 * 12,
  },
  {
    companyName: "Pacific Coast Sign Crew",
    website: "pacificcoastsigns.ca",
    firstName: "James", lastName: "Wong",
    email: "james@pacificcoastsigns.ca",
    phone: "604-555-0319",
    city: "Vancouver", province: "British Columbia", country: "Canada",
    capabilities: "Full-service installs, removals, electrical, non-electrical, permits, surveys",
    equipment: "35'–85' vehicle reach, articulating boom, scissor lift, trailer",
    areasServed: "Metro Vancouver, Fraser Valley, Vancouver Island, Whistler",
    maxTravel: "Up to 400 km from Vancouver, BC",
    ts: Date.now() - 86400000 * 20,
  },
];

export default function InstallationDirectoryPage() {
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored: Installer[] = JSON.parse(localStorage.getItem("cws_installers") || "[]");
    setInstallers([...stored, ...SEED]);
  }, []);

  const filtered = installers.filter(i => {
    const q = search.toLowerCase();
    return !q || [i.companyName, i.city, i.province, i.areasServed].some(f => f.toLowerCase().includes(q));
  });

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-bone border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Find an Installer</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-forest leading-tight">
                Installation <span className="italic text-sage">Directory</span>
              </h1>
              <p className="mt-4 max-w-xl text-stone-600 leading-relaxed">
                Looking for a sign installation company in your area? Browse our directory of vetted installers across Canada. This listing is updated frequently — check back for new additions.
              </p>
              <p className="mt-3 text-xs text-stone-500 italic">
                Please note: This listing is not an endorsement. CWS does not guarantee the work of these companies. Please conduct your own due diligence when selecting a vendor.
              </p>
            </div>
            <Link href="/installer-sign-up">
              <Button className="bg-forest hover:bg-forest/90 text-bone rounded-full px-7 shrink-0">
                <Users className="h-4 w-4 mr-2" />
                Add Your Company
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by company, city, or province…"
              className="pl-10 bg-white border-stone-200"
            />
          </div>
        </div>
      </section>

      {/* Directory listing */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-stone-300" />
            <p className="text-lg">No installers found matching "{search}".</p>
            <p className="mt-2 text-sm">Try a different search term or <Link href="/installer-sign-up" className="text-forest underline">add your company</Link>.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((inst, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                {/* Header */}
                <div>
                  <h3 className="font-serif text-xl text-forest">{inst.companyName}</h3>
                  {inst.website && (
                    <a href={inst.website.startsWith("http") ? inst.website : `https://${inst.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-sage hover:underline mt-0.5 block">
                      {inst.website}
                    </a>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-1.5">
                  {inst.phone && (
                    <a href={`tel:${inst.phone}`} className="flex items-center gap-2 text-sm text-stone-600 hover:text-forest transition-colors">
                      <Phone className="h-3.5 w-3.5 text-sage shrink-0" />
                      {inst.phone}
                    </a>
                  )}
                  {inst.email && (
                    <a href={`mailto:${inst.email}`} className="flex items-center gap-2 text-sm text-stone-600 hover:text-forest transition-colors">
                      <Mail className="h-3.5 w-3.5 text-sage shrink-0" />
                      {inst.email}
                    </a>
                  )}
                  {inst.city && (
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <MapPin className="h-3.5 w-3.5 text-sage shrink-0" />
                      {inst.city}, {inst.province}
                    </div>
                  )}
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-3">
                  {inst.capabilities && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-sage font-semibold mb-1">
                        <Wrench className="h-3 w-3" /> Capabilities
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">{inst.capabilities}</p>
                    </div>
                  )}
                  {inst.equipment && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-sage font-semibold mb-1">
                        <Truck className="h-3 w-3" /> Equipment
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">{inst.equipment}</p>
                    </div>
                  )}
                  {inst.areasServed && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-sage font-semibold mb-1">
                        <MapPin className="h-3 w-3" /> Areas Served
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">{inst.areasServed}</p>
                    </div>
                  )}
                  {inst.maxTravel && (
                    <p className="text-xs text-stone-400 italic">{inst.maxTravel}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
