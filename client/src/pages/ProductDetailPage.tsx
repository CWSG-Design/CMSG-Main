import { Link, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Ruler, Zap, Shield, Layers } from "lucide-react";
import ShareBar from "@/components/ShareBar";
import { products } from "@/lib/mock";

/* ─── Per-product rich content ─────────────────────────────────────────────── */
const productDetails: Record<string, {
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  useCases: string[];
  relatedSlugs: string[];
}> = {
  "front-lit-channel-letters": {
    tagline: "Every exterior channel letter style — built for Canadian weather, engineered for visibility.",
    description:
      "Exterior channel letters from CMSG cover the full range of styles used on building facades, storefronts, and freestanding structures: front-lit, halo-lit, combination front-and-halo, and raceway-mounted sets. Every style is fabricated from heavy-gauge aluminum returns powder-coated inside and out for corrosion resistance, with UV-stabilised polycarbonate or acrylic faces rated for continuous outdoor exposure across the full Canadian climate range — from -40 °C prairie winters to high-humidity coastal summers. Weep holes and sealed wiring compartments prevent moisture ingress, and every unit ships with a UL-listed Class 2 LED driver rated for outdoor installation. Front-lit letters deliver a bright, even face glow; halo letters cast a dramatic backlit halo against the building surface; combination letters do both simultaneously; and raceway-mounted sets simplify installation for multi-unit rollouts. One supplier, every exterior channel letter style, to the same tight tolerances.",
    specs: [
      { label: "Return depth", value: "3\" – 8\" standard; custom depths available" },
      { label: "Face material", value: "Polycarbonate or acrylic, 3mm standard" },
      { label: "Return material", value: "0.040\" – 0.063\" aluminum" },
      { label: "LED module", value: "UL-listed LED modules, 50,000 hr rated" },
      { label: "Power supply", value: "UL-listed Class 2 LED driver, included" },
      { label: "Mounting", value: "Flush-to-wall or raceway; template provided" },
      { label: "Finish", value: "Custom powder coat, any RAL or Pantone" },
      { label: "Lead time", value: "10 business days from approved artwork" },
    ],
    features: [
      "Bright, even face illumination — no hot spots",
      "Full custom letter sizing and font",
      "Polycarbonate faces resist impact and UV fade",
      "Concealed wiring through raceway or wall",
      "CSA-certified electrical components throughout",
      "5-year LED warranty standard",
    ],
    useCases: ["Retail storefronts", "Restaurant & QSR fascia", "Mall tenant signage", "Office building identification", "Hotel & hospitality"],
    relatedSlugs: ["halo-illuminated-channel-letters", "face-halo-combination", "trimless-channel-letters"],
  },
  "front-lit-vertical-supports": {
    tagline: "Channel letters elevated — freestanding, canopy-mounted, or structure-supported.",
    description:
      "Front-lit channel letters on vertical supports bring full illuminated signage to locations where direct wall mounting is not an option. Custom-fabricated steel or aluminum support structures — single posts, twin-post frames, or canopy-integrated brackets — are engineered to your site conditions and wind-load requirements. The channel letters themselves are identical in quality to our wall-mounted product: aluminum returns, polycarbonate faces, and UL-listed LED modules throughout. The result is a freestanding illuminated sign that commands attention from the street, parking lot, or building approach.",
    specs: [
      { label: "Letter return depth", value: "3\" – 8\" standard; custom depths available" },
      { label: "Face material", value: "Polycarbonate or acrylic, 3mm standard" },
      { label: "Return material", value: "0.040\" – 0.063\" aluminum" },
      { label: "LED module", value: "UL-listed LED modules, 50,000 hr rated" },
      { label: "Support structure", value: "Powder-coated steel or aluminum; engineered to local wind-load code" },
      { label: "Post finish", value: "Custom powder coat to match or contrast letters" },
      { label: "Footing", value: "Structural drawings provided; concrete footing by installer" },
      { label: "Lead time", value: "12–15 business days from approved artwork & engineering" },
    ],
    features: [
      "Full illuminated channel letters — same quality as wall-mounted product",
      "Engineered support structures rated to local wind-load requirements",
      "Single-post, twin-post, canopy bracket, and custom frame configurations",
      "Concealed wiring routed through post for clean finish",
      "CSA-certified electrical components throughout",
      "5-year LED warranty standard",
    ],
    useCases: ["Freestanding retail pad signage", "Drive-through canopy identification", "Gas station & convenience store forecourts", "Industrial & warehouse entrance signs", "Parking structure wayfinding"],
    relatedSlugs: ["front-lit-channel-letters", "pylon-ground-signs", "channel-letters-on-raceways"],
  },
  "halo-illuminated-channel-letters": {
    tagline: "Sophisticated back-glow for an architectural finish.",
    description:
      "Halo-illuminated (reverse-lit) channel letters are mounted proud of the wall surface, with LED modules directed rearward. The light washes the wall behind each letter, creating a soft, elegant halo effect. Particularly effective on brick, stone, and textured substrates where the glow adds depth and warmth.",
    specs: [
      { label: "Return depth", value: "3\" – 5\" (deeper = wider halo spread)" },
      { label: "Face material", value: "Solid aluminum — no translucent face" },
      { label: "Return material", value: "0.063\" aluminum" },
      { label: "LED module", value: "Rear-facing UL-listed LED strip" },
      { label: "Standoff", value: "1.5\" – 3\" aluminum standoffs included" },
      { label: "Finish", value: "Custom powder coat; halo colour via LED colour temp" },
      { label: "Lead time", value: "10 business days from approved artwork" },
    ],
    features: [
      "Warm or cool halo — choose LED colour temperature",
      "Solid aluminum face — no face fade or cracking",
      "Standoffs create precise wall clearance for halo spread",
      "Ideal for premium retail, hospitality, and corporate lobbies",
      "CSA-certified components",
      "5-year LED warranty",
    ],
    useCases: ["Luxury retail", "Hotel lobbies", "Corporate HQ signage", "Restaurant feature walls", "Medical & professional offices"],
    relatedSlugs: ["front-lit-channel-letters", "face-halo-combination", "flat-cut-out-letters"],
  },
  "face-halo-combination": {
    tagline: "Maximum visual impact — front and back illumination combined.",
    description:
      "Face & halo combination letters deliver the best of both worlds: a bright illuminated face for daytime readability combined with a rear halo glow for dramatic nighttime presence. The dual-circuit design allows independent dimming of face and halo, giving your clients full control over the look at any hour.",
    specs: [
      { label: "Return depth", value: "4\" – 8\" to accommodate dual LED circuits" },
      { label: "Face material", value: "Polycarbonate or acrylic, 3mm" },
      { label: "Rear LED", value: "Independent rear-facing LED strip" },
      { label: "Power supply", value: "Dual UL-listed Class 2 drivers" },
      { label: "Dimming", value: "0–10V or PWM dimming on both circuits" },
      { label: "Finish", value: "Custom powder coat" },
      { label: "Lead time", value: "12 business days from approved artwork" },
    ],
    features: [
      "Dual illumination circuits — face and halo independently controlled",
      "Dramatic day-to-night visual transition",
      "Compatible with smart dimming systems",
      "Polycarbonate face + solid aluminum returns",
      "CSA-certified throughout",
      "5-year LED warranty",
    ],
    useCases: ["High-end retail flagship stores", "Entertainment venues", "Hotel & resort exteriors", "Stadium & arena signage"],
    relatedSlugs: ["front-lit-channel-letters", "halo-illuminated-channel-letters", "push-through-faux-neon"],
  },
  "trimless-channel-letters": {
    tagline: "Every interior channel letter style — one supplier, one standard.",
    description:
      "Interior channel letters from CMSG cover the full range of styles used in lobbies, retail interiors, showrooms, and architectural feature walls. Whether you need a trimless face for a luxury retail client, an open-face letter for an industrial-chic restaurant, a halo-lit letter for a corporate reception, or a combination front-and-halo letter for maximum visual impact — every style is fabricated to the same tight tolerances and finished to your exact specification. Because interior letters are not exposed to weather, they can be built with lighter returns, tighter radii, and a wider range of face materials than their exterior counterparts, giving you more design freedom.",
    specs: [
      { label: "Return depth", value: "2\" – 6\" standard; shallower profiles available for interior" },
      { label: "Return material", value: "0.040\" – 0.063\" aluminum, precision-formed" },
      { label: "Face material", value: "Acrylic or polycarbonate; trimless, standard, or open-face" },
      { label: "Halo option", value: "Routed returns with rear-facing LED for halo glow" },
      { label: "LED module", value: "UL-listed LED modules, 50,000 hr rated" },
      { label: "Finish", value: "Custom powder coat — any RAL or Pantone; brushed or anodised available" },
      { label: "Mounting", value: "Flush-to-wall, standoff, or suspended cable systems" },
      { label: "Lead time", value: "10–12 business days from approved artwork" },
    ],
    features: [
      "Trimless option: seamless face-to-return transition, no visible trim cap",
      "Open-face option: exposed LED modules for an industrial or vintage aesthetic",
      "Halo option: rear-facing LEDs cast a glow against the mounting surface",
      "Combination option: front-lit face plus halo glow in a single letter",
      "Lighter interior-grade returns allow tighter radii and more complex letterforms",
      "CSA-certified components; 5-year LED warranty",
    ],
    useCases: ["Corporate lobbies and reception areas", "Luxury and fashion retail interiors", "Restaurant and hospitality feature walls", "Showrooms and trade-show displays", "Healthcare and institutional wayfinding"],
    relatedSlugs: ["front-lit-channel-letters", "flat-cut-out-letters", "interior-hanging-signs"],
  },
  "fascia-storefront-signs": {
    tagline: "Your core storefront solution — built for Canadian conditions.",
    description:
      "Fascia and storefront signs are the backbone of retail exterior branding. CWS fabricates aluminum composite panel (ACM) fascia systems, illuminated cabinet signs, and full storefront letter sets engineered for Canadian winters — freeze-thaw cycles, heavy snow loads, and UV exposure. Every unit ships with full installation hardware and a wiring diagram.",
    specs: [
      { label: "Panel material", value: "ACM (aluminum composite), 4mm or 6mm" },
      { label: "Illumination", value: "LED-backlit or surface-mounted LED modules" },
      { label: "Frame", value: "Extruded aluminum frame system" },
      { label: "Finish", value: "Custom powder coat or vinyl wrap" },
      { label: "Max single-piece size", value: "Up to 10' × 4' standard; larger on request" },
      { label: "Lead time", value: "12–15 business days from approved artwork" },
    ],
    features: [
      "Engineered for Canadian freeze-thaw and snow-load conditions",
      "Full ACM panel or letter-only configurations",
      "Integrated LED lighting options",
      "Custom powder coat to any RAL or Pantone",
      "Ships flat-packed with full installation hardware",
      "CSA-certified electrical components",
    ],
    useCases: ["Strip mall tenants", "Standalone retail", "Restaurant & QSR", "Service businesses", "Medical & dental offices"],
    relatedSlugs: ["front-lit-channel-letters", "tenant-panels", "pylon-ground-signs"],
  },
  "interior-hanging-signs": {
    tagline: "Elevate your interior environment with dimensional signage.",
    description:
      "Custom interior and hanging signs transform retail floors, corporate lobbies, and hospitality spaces. CWS produces hanging channel letter sets, suspended aisle markers, illuminated ceiling signs, and dimensional wall letters — all engineered for interior mounting with concealed suspension hardware.",
    specs: [
      { label: "Materials", value: "Aluminum, acrylic, PVC foam, or composite" },
      { label: "Illumination", value: "LED edge-lit, halo, or face-lit options" },
      { label: "Suspension", value: "Aircraft cable, rigid rod, or direct-mount" },
      { label: "Finish", value: "Powder coat, vinyl, or raw brushed aluminum" },
      { label: "Lead time", value: "10–14 business days from approved artwork" },
    ],
    features: [
      "Concealed suspension hardware for a clean finish",
      "Illuminated and non-illuminated options",
      "Custom sizing — from small wayfinding to large feature signs",
      "Lightweight construction for ceiling load compliance",
      "Full installation hardware and ceiling anchor kit included",
    ],
    useCases: ["Retail store interiors", "Corporate lobbies & reception", "Restaurant & hospitality", "Healthcare wayfinding", "Trade show displays"],
    relatedSlugs: ["3d-printed-signs", "flat-cut-out-letters", "open-face-channel-letters"],
  },
  "3d-printed-signs": {
    tagline: "CWS's house specialty — precision 3D printed illuminated signage.",
    description:
      "Our 3D printed illuminated sign program is our most distinctive product. Using industrial FDM printing, we produce letter forms and logo shapes with crisp edges, tight radii, and complex geometries that are impossible to achieve with traditional aluminum fabrication. The result is a minimalist, premium sign with a floating aesthetic and concealed wiring.",
    specs: [
      { label: "Print material", value: "ASA or ABS (UV-stable, outdoor-rated)" },
      { label: "Wall thickness", value: "3mm – 5mm standard" },
      { label: "Illumination", value: "Internal LED strip — face-lit or halo" },
      { label: "Max letter height", value: "36\" standard; larger on request" },
      { label: "Finish", value: "Painted or raw; custom colour matching" },
      { label: "Lead time", value: "10–14 business days from approved artwork" },
    ],
    features: [
      "Complex geometries and tight radii — impossible in aluminum",
      "Concealed wiring through letter body",
      "UV-stable ASA material rated for outdoor use",
      "Lightweight — ideal for interior and exterior mounting",
      "Available in any colour — painted or vinyl-wrapped",
      "5-year LED warranty",
    ],
    useCases: ["Boutique retail", "Restaurant & café branding", "Corporate lobby feature walls", "Hospitality & hotel signage", "Trade show & event displays"],
    relatedSlugs: ["interior-hanging-signs", "flat-cut-out-letters", "halo-illuminated-channel-letters"],
  },
  "pylon-ground-signs": {
    tagline: "Command attention from the road — engineered for Canadian winters.",
    description:
      "Pylon and ground signs are the highest-visibility sign type for any property. CWS fabricates single-tenant and multi-tenant pylon cabinets, monument signs, and post-and-panel systems — all engineered for Canadian wind and snow loads. LED-illuminated faces with aluminum cabinet construction ensure decades of reliable service.",
    specs: [
      { label: "Cabinet material", value: "Aluminum extrusion frame, ACM or polycarbonate faces" },
      { label: "Illumination", value: "Internal LED — even face illumination" },
      { label: "Height", value: "Up to 20' standard pylon; taller on engineering review" },
      { label: "Tenants", value: "Single or multi-tenant configurations" },
      { label: "Foundation", value: "Engineering drawings provided for permit" },
      { label: "Lead time", value: "15–20 business days from approved artwork" },
    ],
    features: [
      "Engineered for Canadian wind and snow loads",
      "Multi-tenant configurations with individual changeable panels",
      "Full permit documentation package included",
      "LED illumination — low energy, long life",
      "Custom cabinet colours and finishes",
      "5-year LED warranty",
    ],
    useCases: ["Shopping centres", "Strip malls", "Gas stations & automotive", "Hotels & motels", "Industrial & office parks"],
    relatedSlugs: ["fascia-storefront-signs", "tenant-panels", "channel-letters-on-raceways"],
  },
  "push-through-faux-neon": {
    tagline: "Aluminum face, acrylic push-through graphics — bold illumination built into the cabinet.",
    description:
      "Acrylic push-through letters are precision-routed from solid acrylic sheet and set flush into a fabricated aluminum cabinet face. When backlit with LED modules, the acrylic letters glow evenly while the surrounding aluminum face remains dark — creating a high-contrast, architectural look that reads clearly day and night. Because the letters are integral to the cabinet face rather than applied on top, the finished sign is exceptionally clean, durable, and weather-resistant. CMSG fabricates push-through faces in any letter style, size, or colour, with cabinet depths and finishes matched to your specification.",
    specs: [
      { label: "Push-through letter material", value: "Cast acrylic, 10mm standard; 6mm or 12mm available" },
      { label: "Cabinet face material", value: "0.063\" aluminum, CNC-routed" },
      { label: "Cabinet depth", value: "3\" – 8\" standard; custom depths available" },
      { label: "Cabinet finish", value: "Powder coat — any RAL or Pantone colour" },
      { label: "Illumination", value: "UL-listed LED modules, 50,000 hr rated" },
      { label: "Power supply", value: "UL-listed Class 2 LED driver, included" },
      { label: "Acrylic colours", value: "Full Rowmark / 3M acrylic palette; custom tints available" },
      { label: "Lead time", value: "10 business days from approved artwork" },
    ],
    features: [
      "Letters routed flush into the aluminum face — no exposed edges or gaps",
      "Even, diffused LED glow through the full acrylic depth",
      "High-contrast day/night readability — dark face, luminous letters",
      "Powder-coated aluminum cabinet resists corrosion and UV fade",
      "Available in single-face or double-face cabinet configurations",
      "Custom cabinet shapes — rectangular, shaped, or contour-cut",
    ],
    useCases: ["Retail fascia and storefront signs", "Restaurant and hospitality identification", "Corporate building signs", "Interior feature walls and reception signs", "Multi-tenant directory cabinets"],
    relatedSlugs: ["open-face-channel-letters", "face-halo-combination", "fascia-storefront-signs"],
  },
  "flat-cut-out-letters": {
    tagline: "Precision-routed dimensional letters — clean, architectural, built to last.",
    description:
      "Flat cut-out letters are non-illuminated dimensional letters precision-routed from aluminum or acrylic sheet. They mount flush to the wall or on standoffs for a floating effect. The result is a clean, architectural sign that works equally well indoors and outdoors — and pairs beautifully with halo illumination when combined with a backlit system.",
    specs: [
      { label: "Material", value: "0.125\" – 0.25\" aluminum or 10mm acrylic" },
      { label: "Finish", value: "Powder coat, anodize, brushed, or vinyl wrap" },
      { label: "Mounting", value: "Flush or standoff (1\" – 3\" aluminum standoffs)" },
      { label: "Max letter height", value: "48\" standard; larger on request" },
      { label: "Lead time", value: "8–10 business days from approved artwork" },
    ],
    features: [
      "CNC-routed for precision edges and tight radii",
      "Available in aluminum or acrylic",
      "Standoff mounting creates a floating shadow effect",
      "Any powder coat colour — RAL or Pantone matched",
      "Lightweight — suitable for interior and exterior",
      "No electrical required — no permits needed in most jurisdictions",
    ],
    useCases: ["Corporate lobbies", "Office building identification", "Retail interior wayfinding", "Architectural feature walls", "Monument sign lettering"],
    relatedSlugs: ["halo-illuminated-channel-letters", "interior-hanging-signs", "3d-printed-signs"],
  },
  "channel-letters-on-raceways": {
    tagline: "Simplified installation — letters and wiring on a single painted raceway.",
    description:
      "Channel letters on raceways are pre-assembled at our facility — each letter is mounted and wired to a painted aluminum raceway before shipping. The installer simply anchors the raceway to the wall and connects power. This approach dramatically reduces on-site installation time and is the preferred method for multi-unit rollouts where consistency and speed are critical.",
    specs: [
      { label: "Raceway material", value: "Extruded aluminum, custom depth" },
      { label: "Raceway finish", value: "Powder coat — colour-matched to building or letters" },
      { label: "Letter type", value: "Any CWS channel letter type" },
      { label: "Pre-wired", value: "Yes — fully wired and tested before shipping" },
      { label: "Power entry", value: "Single power entry point on raceway" },
      { label: "Lead time", value: "12 business days from approved artwork" },
    ],
    features: [
      "Pre-assembled and pre-wired at factory — faster site installation",
      "Single power connection on-site",
      "Consistent letter spacing locked in at factory",
      "Ideal for multi-unit rollouts",
      "Raceway colour-matched to building or brand standard",
      "CSA-certified components throughout",
    ],
    useCases: ["National retail rollouts", "Franchise signage programs", "Industrial & commercial buildings", "Multi-unit residential", "Warehouse & logistics facilities"],
    relatedSlugs: ["front-lit-channel-letters", "fascia-storefront-signs", "tenant-panels"],
  },
  "tenant-panels": {
    tagline: "Durable pylon and monument panels for multi-tenant properties.",
    description:
      "Tenant panels are the individual sign cabinets that slot into a pylon or monument structure to identify each tenant. CWS produces aluminum-framed tenant panels with polycarbonate or acrylic faces, internal LED illumination, and a changeable-copy option for properties with high tenant turnover. Engineered for Canadian winters — freeze-thaw, snow load, and UV rated.",
    specs: [
      { label: "Frame", value: "Extruded aluminum, powder coated" },
      { label: "Face", value: "Polycarbonate or acrylic" },
      { label: "Illumination", value: "Internal LED — even face illumination" },
      { label: "Copy change", value: "Fixed or changeable-copy configurations" },
      { label: "Standard sizes", value: "Custom to fit existing pylon structure" },
      { label: "Lead time", value: "10–14 business days from approved artwork" },
    ],
    features: [
      "Engineered for Canadian freeze-thaw and snow-load",
      "Changeable-copy option for high-turnover properties",
      "Internal LED illumination — low energy",
      "Custom colours and finishes",
      "Fits standard pylon structures or custom frames",
      "5-year LED warranty",
    ],
    useCases: ["Shopping centres", "Strip malls", "Office parks", "Medical & professional buildings", "Industrial complexes"],
    relatedSlugs: ["pylon-ground-signs", "fascia-storefront-signs", "channel-letters-on-raceways"],
  },
  "open-face-channel-letters": {
    tagline: "Exposed LED strips — retro-modern look with contemporary efficiency.",
    description:
      "Open-face channel letters have no polycarbonate or acrylic face — the LED modules inside are fully visible, creating a warm, exposed-bulb aesthetic reminiscent of vintage neon and marquee signs. The look is bold, graphic, and increasingly popular with restaurants, bars, and entertainment venues seeking a retro-modern identity.",
    specs: [
      { label: "Return depth", value: "3\" – 5\"" },
      { label: "Face", value: "Open — no face material" },
      { label: "LED module", value: "Exposed LED strip or individual LED modules" },
      { label: "Return material", value: "0.063\" aluminum" },
      { label: "Finish", value: "Custom powder coat" },
      { label: "Lead time", value: "10 business days from approved artwork" },
    ],
    features: [
      "Exposed LED modules — visible from the front",
      "Warm, retro-modern aesthetic",
      "Available with warm white, cool white, or colour LEDs",
      "No face to crack, fade, or replace",
      "Custom return depth and letter sizing",
      "5-year LED warranty",
    ],
    useCases: ["Bars & restaurants", "Entertainment venues", "Retail with a vintage aesthetic", "Breweries & distilleries", "Event spaces"],
    relatedSlugs: ["push-through-faux-neon", "front-lit-channel-letters", "face-halo-combination"],
  },
  "illuminated-hanging-window-signs": {
    tagline: "3D printed custom shapes — bold illuminated window signs that stop foot traffic cold.",
    description:
      "3D Printed Illuminated Hanging Window Signs are our house specialty taken to the storefront window. Using industrial FDM printing, we produce custom letter forms, logos, and mascot shapes with crisp edges and complex geometries — then backlight them with internal LEDs for a vivid glow visible from the street. Suspended from ceiling hardware or mounted directly to the interior of a window, these signs communicate instantly day or night and are impossible to ignore.",
    specs: [
      { label: "Print material", value: "ASA or ABS (UV-stable, indoor/window-rated)" },
      { label: "Wall thickness", value: "3mm – 5mm standard" },
      { label: "Illumination", value: "Internal LED strip — face-lit or edge-lit" },
      { label: "Graphics", value: "Full-colour UV-printed face or painted finish" },
      { label: "Max size", value: "36\" standard; larger on request" },
      { label: "Mounting", value: "Ceiling suspension hardware or window suction mount" },
      { label: "Power", value: "Low-voltage LED driver, standard outlet" },
      { label: "Lead time", value: "10–14 business days from approved artwork" },
    ],
    features: [
      "Complex geometries and tight radii — impossible in aluminum",
      "Custom shape — any logo, mascot, or graphic",
      "Internal LED backlighting for day and night window visibility",
      "UV-stable ASA material — colour-fast near windows",
      "Lightweight construction — easy to hang and reposition",
      "Low-voltage LED driver — energy efficient and safe",
      "5-year LED warranty",
    ],
    useCases: ["Restaurants & quick-service", "Retail storefronts", "Bars & entertainment venues", "Pop-up shops & events", "Franchise locations"],
    relatedSlugs: ["3d-printed-signs", "interior-hanging-signs", "push-through-faux-neon"],
  },
};

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const detail = productDetails[slug ?? ""];

  if (!product || !detail) {
    return (
      <main className="bg-cream min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="font-serif text-4xl text-forest mb-4">Product not found</h1>
          <p className="text-stone-600 mb-8">We couldn't find that product. Browse all products below.</p>
          <Link to="/products">
            <Button className="bg-forest text-bone hover:bg-sage hover:text-forest rounded-full px-8">View All Products</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const related = products.filter((p) => detail.relatedSlugs.includes(p.slug));

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
          <div className="absolute top-20 -right-40 h-[500px] w-[500px] rounded-full bg-sage/15 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-12 lg:pb-16">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-forest mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> All Products
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Product Detail</div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest leading-[1.06]">{product.title}</h1>
              <p className="mt-4 text-lg text-sage font-medium italic">{detail.tagline}</p>
              <p className="mt-5 text-stone-700 leading-relaxed text-base max-w-xl">{detail.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/quote?product=${slug}`}>
                  <Button className="bg-forest text-bone hover:bg-sage hover:text-forest rounded-full px-7 py-3 text-sm font-semibold transition-all active:scale-[0.97]">
                    Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="rounded-full px-7 py-3 text-sm font-semibold border-forest text-forest hover:bg-forest hover:text-bone transition-all active:scale-[0.97]">
                    Talk to Our Team
                  </Button>
                </Link>
              </div>
              <div className="mt-6">
                <ShareBar
                  variant="full"
                  title={`${product.title} — Canadian Wholesale Sign Group`}
                  description={detail.description}
                />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-forest text-bone rounded-2xl px-5 py-3 shadow-xl">
                <div className="text-xs text-sage uppercase tracking-wider font-semibold">Lead Time</div>
                <div className="text-lg font-serif font-semibold">10 days or less</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs + Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Specs table */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-sage/15 flex items-center justify-center">
                  <Ruler className="h-5 w-5 text-forest" />
                </div>
                <h2 className="font-serif text-2xl text-forest">Specifications</h2>
              </div>
              <div className="rounded-2xl border border-stone-200 overflow-hidden">
                {detail.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                  >
                    <span className="text-stone-500 w-36 shrink-0">{spec.label}</span>
                    <span className="text-forest font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features + Use Cases */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-sage/15 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-forest" />
                  </div>
                  <h2 className="font-serif text-2xl text-forest">Key Features</h2>
                </div>
                <ul className="space-y-3">
                  {detail.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone-700">
                      <CheckCircle2 className="h-4 w-4 text-sage shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-sage/15 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-forest" />
                  </div>
                  <h2 className="font-serif text-2xl text-forest">Ideal For</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detail.useCases.map((u) => (
                    <span key={u} className="bg-sage/15 text-forest text-xs font-medium px-3 py-1.5 rounded-full">{u}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CWS */}
      <section className="py-16 lg:py-24 bg-forest text-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Why CWS</div>
          <h2 className="font-serif text-3xl md:text-4xl text-bone mb-10 max-w-2xl">
            Wholesale quality. Direct pricing. Ships anywhere in Canada.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Zap, title: "10-Day Lead Time", desc: "From approved artwork to crate — faster than any other Canadian wholesaler." },
              { icon: Shield, title: "5-Year LED Warranty", desc: "Every LED module and driver we ship carries a 5-year warranty, standard." },
              { icon: Ruler, title: "CSA Certified", desc: "All electrical components are CSA-certified for Canadian code compliance." },
              { icon: Layers, title: "B2B Only", desc: "We sell exclusively to sign shops and installers — no retail, no middleman." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 rounded-2xl p-6">
                <Icon className="h-6 w-6 text-sage mb-4" />
                <h3 className="font-serif text-lg text-bone mb-2">{title}</h3>
                <p className="text-sm text-bone/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Related Products</div>
            <h2 className="font-serif text-3xl text-forest mb-10">You may also be interested in</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-forest hover:shadow-lg transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-forest group-hover:text-sage transition-colors">{p.title}</h3>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed line-clamp-2">{p.blurb}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-sage font-semibold uppercase tracking-wider">
                      View product <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-bone border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">Ready to get a quote?</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            Send us your artwork and specs — we'll have a detailed quote back to you within one business day.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to={`/quote?product=${slug}`}>
              <Button className="bg-forest text-bone hover:bg-sage hover:text-forest rounded-full px-8 py-3 text-sm font-semibold transition-all active:scale-[0.97]">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="rounded-full px-8 py-3 text-sm font-semibold border-forest text-forest hover:bg-forest hover:text-bone transition-all active:scale-[0.97]">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
