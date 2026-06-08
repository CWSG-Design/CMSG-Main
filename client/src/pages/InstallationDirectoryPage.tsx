import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapView } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Phone, Mail, MapPin, Wrench, Truck, Search, Users, Globe, X, ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import ShareBar from "@/components/ShareBar";
import { trpc } from "@/lib/trpc";

type InstallerRow = {
  id: number;
  companyName: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  capabilities: string | null;
  equipment: string | null;
  areasServed: string | null;
  maxTravelDistance: string | null;
};

function InstallerCard({
  inst,
  compact = false,
  onClick,
  selected = false,
}: {
  inst: InstallerRow;
  compact?: boolean;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "bg-white rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-150",
        onClick ? "cursor-pointer hover:shadow-md hover:border-sage/60" : "",
        selected ? "border-forest shadow-md ring-1 ring-forest/20" : "border-stone-200",
        compact ? "p-4" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className={`font-serif text-forest leading-tight ${compact ? "text-base" : "text-xl"}`}>
            {inst.companyName}
          </h3>
          {inst.city && (
            <div className="flex items-center gap-1 mt-0.5 text-xs text-stone-500">
              <MapPin className="h-3 w-3 text-sage shrink-0" />
              {inst.city}{inst.province ? `, ${inst.province}` : ""}
            </div>
          )}
        </div>
        {selected && <ChevronRight className="h-4 w-4 text-sage shrink-0 mt-1" />}
      </div>

      <div className="space-y-1">
        {inst.phone && (
          <a href={`tel:${inst.phone}`} onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-forest transition-colors">
            <Phone className="h-3.5 w-3.5 text-sage shrink-0" />{inst.phone}
          </a>
        )}
        {inst.email && (
          <a href={`mailto:${inst.email}`} onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-forest transition-colors truncate">
            <Mail className="h-3.5 w-3.5 text-sage shrink-0" />{inst.email}
          </a>
        )}
        {inst.website && (
          <a
            href={inst.website.startsWith("http") ? inst.website : `https://${inst.website}`}
            target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-sm text-sage hover:underline truncate">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            {inst.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>

      {!compact && (
        <div className="border-t border-stone-100 pt-3 space-y-2.5">
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
          {inst.maxTravelDistance && (
            <p className="text-xs text-stone-400 italic">{inst.maxTravelDistance}</p>
          )}
        </div>
      )}
    </div>
  );
}

function MapPopup({ inst, onClose }: { inst: InstallerRow; onClose: () => void }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[340px] max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 relative">
        <button onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <InstallerCard inst={inst} />
      </div>
    </div>
  );
}

export default function InstallationDirectoryPage() {
  const { data: installerList = [], isLoading } = trpc.installer.list.useQuery();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const selectedInstaller = installerList.find(i => i.id === selectedId) ?? null;

  const filtered = installerList.filter(i => {
    const q = search.toLowerCase();
    return !q || [i.companyName, i.city ?? "", i.province ?? "", i.areasServed ?? ""].some(f =>
      f.toLowerCase().includes(q)
    );
  });

  const buildMarkers = useCallback((map: google.maps.Map, list: typeof installerList) => {
    markersRef.current.forEach(m => (m.map = null));
    markersRef.current = [];

    list.forEach(inst => {
      if (inst.lat == null || inst.lng == null) return;

      const pin = document.createElement("div");
      pin.style.cssText = [
        "width:32px;height:32px;border-radius:50% 50% 50% 0;",
        "background:#2D4A2D;border:2px solid #F5F0E8;",
        "transform:rotate(-45deg);cursor:pointer;",
        "box-shadow:0 2px 6px rgba(0,0,0,0.35);",
        "transition:transform 0.15s ease,background 0.15s ease;",
      ].join("");
      pin.onmouseenter = () => {
        pin.style.background = "#7A9E7E";
        pin.style.transform = "rotate(-45deg) scale(1.15)";
      };
      pin.onmouseleave = () => {
        pin.style.background = "#2D4A2D";
        pin.style.transform = "rotate(-45deg) scale(1)";
      };

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: inst.lat!, lng: inst.lng! },
        title: inst.companyName,
        content: pin,
      });

      marker.addListener("click", () => {
        setSelectedId(inst.id);
        map.panTo({ lat: inst.lat!, lng: inst.lng! });
      });

      markersRef.current.push(marker);
    });
  }, []);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    buildMarkers(map, installerList);
  }, [buildMarkers, installerList]);

  useEffect(() => {
    if (mapRef.current && installerList.length > 0) {
      buildMarkers(mapRef.current, installerList);
    }
  }, [installerList, buildMarkers]);

  const handleListSelect = (inst: InstallerRow) => {
    setSelectedId(inst.id);
    if (mapRef.current && inst.lat != null && inst.lng != null) {
      mapRef.current.panTo({ lat: inst.lat, lng: inst.lng });
      mapRef.current.setZoom(10);
    }
  };

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-bone border-b border-stone-200">
        <div className="max-w-site mx-auto pt-16 pb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Find an Installer</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-forest leading-tight">
                Installation <span className="italic text-sage">Directory</span>
              </h1>
              <p className="mt-4 max-w-xl text-stone-600 leading-relaxed">
                Looking for a sign installation company in your area? Browse our directory of vetted
                installers across Canada. Click a pin on the map or search the list below.
              </p>
              <p className="mt-3 text-xs text-stone-500 italic">
                Please note: This listing is not an endorsement. CWS does not guarantee the work of
                these companies. Please conduct your own due diligence when selecting a vendor.
              </p>
              <div className="mt-5">
                <ShareBar
                  variant="full"
                  title="Sign Installer Directory — Canadian Wholesale Sign Group"
                  description="Find vetted sign installation companies across Canada. Browse our interactive map directory."
                />
              </div>
            </div>
            <Link href="/installer-sign-up">
              <Button className="bg-forest hover:bg-forest/90 text-bone rounded-full px-7 shrink-0">
                <Users className="h-4 w-4 mr-2" />
                Add Your Company
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Map + Sidebar */}
      <section className="max-w-site mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map */}
          <div className="lg:flex-1 relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <MapView
              className="w-full h-[480px] lg:h-[600px]"
              initialCenter={{ lat: 56.1304, lng: -106.3468 }}
              initialZoom={4}
              onMapReady={handleMapReady}
            />
            {selectedInstaller && (
              <MapPopup inst={selectedInstaller} onClose={() => setSelectedId(null)} />
            )}
          </div>

          {/* Sidebar list */}
          <div className="lg:w-[360px] flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by company, city, or province…"
                className="pl-10 bg-white border-stone-200"
              />
            </div>

            {!isLoading && (
              <Badge variant="secondary" className="bg-sage/15 text-forest border-0 font-normal w-fit">
                {filtered.length} installer{filtered.length !== 1 ? "s" : ""}{search ? " found" : " listed"}
              </Badge>
            )}

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[520px] pr-1">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 animate-pulse">
                    <div className="h-5 bg-stone-100 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-stone-100 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-stone-100 rounded w-2/3" />
                  </div>
                ))
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <Users className="h-10 w-10 mx-auto mb-3 text-stone-300" />
                  {search ? (
                    <>
                      <p>No installers found matching "{search}".</p>
                      <button onClick={() => setSearch("")} className="mt-2 text-sm text-forest underline">
                        Clear search
                      </button>
                    </>
                  ) : (
                    <p>
                      No approved installers yet.{" "}
                      <Link href="/installer-sign-up" className="text-forest underline">
                        Be the first to list your company.
                      </Link>
                    </p>
                  )}
                </div>
              ) : (
                filtered.map(inst => (
                  <InstallerCard
                    key={inst.id}
                    inst={inst}
                    compact
                    selected={selectedId === inst.id}
                    onClick={() => handleListSelect(inst)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full card grid below map */}
      {!isLoading && filtered.length > 0 && (
        <section className="max-w-site mx-auto pb-16">
          <h2 className="font-serif text-3xl text-forest mb-6">
            All Installers
            {search && (
              <span className="text-lg font-sans text-stone-500 ml-3">— results for "{search}"</span>
            )}
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(inst => (
              <InstallerCard
                key={inst.id}
                inst={inst}
                selected={selectedId === inst.id}
                onClick={() => handleListSelect(inst)}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
