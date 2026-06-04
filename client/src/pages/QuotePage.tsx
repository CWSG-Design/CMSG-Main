import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle2, ChevronRight, ChevronLeft, ZoomIn, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ─── Data ────────────────────────────────────────────────────────────────────

const ACRYLIC_FACED = [
  "(AF) Front Lit Trimmed", "(AF) Front/Back Lit Trimmed",
  "(AF) Front Lit Trimless", "(AF) Front/Back Lit Trimless",
  "Blade (AF) Front Lit Trimmed", "Blade (AF) Front Lit Trimless",
];
const METAL_FACED = [
  "(MF) Reverse (Halo) Lit", "(MF) Reverse Edgelit",
  "(MF) Reverse Edgelit FCO", "(MF) Push-Thru Letters",
  "(MF) Push-Thru Logos", "Blade (MF) Push-Thru",
  "Blade (MF) Acrylic Backed",
];
const SPECIALTY = ["(SPE) Open Faced Letters", "(SPE) Marquee Letters"];
const SUPPLEMENTARY = ["(SUP) Tenant Panel *", "(SUP) FCOs - Flat Cut Outs *"];
const MOUNTING = [
  "Raceway", "Dimensional Backer – W/ Back", "Flush / Direct Mount",
  "Blade – (MF) Push-Thru / Acrylic Backed", "Wireway",
  "Dimensional Backer – No Back", "Flat Backer",
  "Blade – (AF) Trimmed / Trimless",
];
const FACE_GRAPHICS = [
  "No Graphics – Acrylic Only", "3M Vinyl – Single Color",
  "3M Vinyl – Multi-Color", "Digital Print",
];
const LED_OPTIONS = ["Standard White LED", "Standard Color LED", "RGBw LED", "Other"];
const LOGO_BOX_STYLES = [
  "Contour / Cloud Logo", "Circle / Oval Logo Box",
  "Square Logo Box", "Rectangle Logo Box", "Other",
];
const ACRYLIC_COLORS = [
  "#2447 White (Standard)", "SG #2447 White (Sign Grade)", "#7328 White",
  "SG #7328 White", "#2406 White", "#2283 Red", "SG #2283 Red (Sign Grade)",
  "#2793 Red", "SG #2793 Red (Sign Grade)", "#2415 Red",
  "#2662 Orange – Diffuser Needed", "#2157 Red – Diffuser Needed",
  "#2051 Blue – Diffuser Needed", "#2114 Blue", "#2648 Blue – Diffuser Needed",
  "#2030 Hunter Green – Diffuser Needed", "#2108 Holly Green",
  "#2146 Ivory", "#2016 Yellow – Diffuser Needed", "#2037 Yellow",
  "#2119 Orange", "#2412 Bronze", "Day/Night – Diffuser Needed",
  "Subway Green", "Subway Yellow", "#0000 Clear", "Custom (specify below)",
];
const INSTALLATION_TYPES = [
  "Flush Mount", "Standard Raceway (5\"×6\")", "Custom Raceway",
  "Extruded Raceway", "Wireway", "Remote Raceway",
  "Flush Mount & Standard Raceway", "Flush Mount & Custom Raceway",
  "Flush Mount & Extruded Raceway", "Flush Mount & Wireway", "Existing Raceway",
];
const PROVINCES_STATES = [
  "Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador",
  "Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island",
  "Quebec","Saskatchewan","Yukon",
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const STEPS = ["Your Info", "Product Type", "Sign Details", "Colors", "Extras & Files"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif text-xl text-forest mb-4">{children}</h3>;
}
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <Label className="text-stone-700 mb-1.5 block">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </Label>
  );
}
function CheckGroup({ items, selected, onChange }: { items: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (item: string) =>
    onChange(selected.includes(item) ? selected.filter(x => x !== item) : [...selected, item]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map(item => (
        <label key={item} className="flex items-center gap-2.5 cursor-pointer group">
          <Checkbox
            checked={selected.includes(item)}
            onCheckedChange={() => toggle(item)}
            className="border-stone-300 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
          />
          <span className="text-sm text-stone-700 group-hover:text-forest transition-colors">{item}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Step 0 — Info
  const [companyName, setCompanyName] = useState("");
  const [isTradeCustomer, setIsTradeCustomer] = useState<"yes" | "no" | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("Canada");
  const [numSigns, setNumSigns] = useState("");
  const [inHandDate, setInHandDate] = useState("");
  const [installDate, setInstallDate] = useState("");

  // Step 1 — Product Type
  const [illumination, setIllumination] = useState<string[]>([]);
  const [acrylicFaced, setAcrylicFaced] = useState<string[]>([]);
  const [metalFaced, setMetalFaced] = useState<string[]>([]);
  const [specialty, setSpecialty] = useState<string[]>([]);
  const [supplementary, setSupplementary] = useState<string[]>([]);
  const [mounting, setMounting] = useState<string[]>([]);

  // Step 2 — Sign Details
  const [signText, setSignText] = useState("");
  const [overallW, setOverallW] = useState("");
  const [overallH, setOverallH] = useState("");
  const [logoW, setLogoW] = useState("");
  const [logoH, setLogoH] = useState("");
  const [mainLetterH, setMainLetterH] = useState("");
  const [secLetterH, setSecLetterH] = useState("");
  const [installationType, setInstallationType] = useState("");
  const [installLocation, setInstallLocation] = useState("");
  const [faceGraphics, setFaceGraphics] = useState<string[]>([]);
  const [ledType, setLedType] = useState<string[]>([]);
  const [logoBoxStyle, setLogoBoxStyle] = useState("");

  // Step 3 — Colors
  const [acrylicColor, setAcrylicColor] = useState("");
  const [acrylicColorCustom, setAcrylicColorCustom] = useState("");
  const [graphicsColor, setGraphicsColor] = useState("");
  const [trimCapColor, setTrimCapColor] = useState("");
  const [returnColor, setReturnColor] = useState("");
  const [racewayColor, setRacewayColor] = useState("");

  // Color chart lightbox
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  // Step 4 — Extras
  const [hangerBar, setHangerBar] = useState("");
  const [racewayLocation, setRacewayLocation] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const validate = () => {
    if (step === 0 && (!companyName || !firstName || !email || !isTradeCustomer)) {
      toast.error("Please fill in Company Name, Contact Name, Email, and confirm trade status.");
      return false;
    }
    return true;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      companyName, isTradeCustomer, firstName, lastName, jobRole, email, phone,
      street, street2, city, province, postal, country,
      numSigns, inHandDate, installDate,
      illumination, acrylicFaced, metalFaced, specialty, supplementary, mounting,
      signText, overallW, overallH, logoW, logoH, mainLetterH, secLetterH,
      installationType, installLocation, faceGraphics, ledType, logoBoxStyle,
      acrylicColor, acrylicColorCustom, graphicsColor, trimCapColor, returnColor, racewayColor,
      hangerBar, racewayLocation, extras, additionalNotes,
      ts: Date.now(),
    };
    const list = JSON.parse(localStorage.getItem("cws_quotes") || "[]");
    list.push(data);
    localStorage.setItem("cws_quotes", JSON.stringify(list));
    setSubmitted(true);
    toast.success("Quote request submitted! We'll be in touch within 1 business day.");
  };

  if (submitted) {
    return (
      <main className="bg-cream min-h-screen">
        <Header />
        <div className="max-w-xl mx-auto px-6 py-32 text-center">
          <CheckCircle2 className="h-16 w-16 text-sage mx-auto mb-6" />
          <h2 className="font-serif text-4xl text-forest">Quote Request Received!</h2>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Thanks, <strong>{firstName}</strong>! We've received your quote request for <strong>{companyName}</strong> and will get back to you within 1 business day.
          </p>
          <p className="mt-3 text-sm text-stone-500">
            For urgent requests, email us at{" "}
            <a href="mailto:sales@cwsg.ca" className="text-forest underline">sales@cwsg.ca</a>.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(0); }} className="mt-8 bg-forest hover:bg-forest/90 text-bone rounded-full px-8">
            Submit another quote
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-bone border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Free Estimate</div>
          <h1 className="font-serif text-5xl md:text-6xl text-forest leading-tight">
            Request a <span className="italic text-sage">Quote</span>
          </h1>
          <p className="mt-4 max-w-2xl text-stone-600 leading-relaxed">
            Please note this quote is for a rough estimate only. The quoted price is subject to change upon receipt of complete project information. CWS sells wholesale to the trade only — we partner with sign shops and brokers, not retail customers.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center overflow-x-auto py-4 gap-1">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    i === step
                      ? "bg-forest text-bone"
                      : i < step
                      ? "bg-sage/20 text-forest cursor-pointer hover:bg-sage/30"
                      : "text-stone-400 cursor-default"
                  }`}
                >
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${i === step ? "bg-white/20" : i < step ? "bg-sage/30" : "bg-stone-200"}`}>
                    {i + 1}
                  </span>
                  {label}
                </button>
                {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-stone-300 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12 space-y-8">

          {/* ── Step 0: Your Info ── */}
          {step === 0 && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Company Information</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <FieldLabel required>Company Name</FieldLabel>
                    <Input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Acme Sign Co." />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel required>Are you a sign company or broker? (Trade only)</FieldLabel>
                    <div className="flex gap-6 mt-2">
                      {(["yes", "no"] as const).map(v => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="trade" value={v} checked={isTradeCustomer === v} onChange={() => setIsTradeCustomer(v)} className="accent-forest" />
                          <span className="text-sm text-stone-700">{v === "yes" ? "Yes — I'm a sign company / broker" : "No — I'm a retail customer"}</span>
                        </label>
                      ))}
                    </div>
                    {isTradeCustomer === "no" && (
                      <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                        CWS sells wholesale to the trade only. We partner with sign shops and brokers who resell to their customers. We're unable to process retail orders directly.
                      </p>
                    )}
                  </div>
                  <div>
                    <FieldLabel required>First Name</FieldLabel>
                    <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" />
                  </div>
                  <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" />
                  </div>
                  <div>
                    <FieldLabel required>Job Role</FieldLabel>
                    <Input value={jobRole} onChange={e => setJobRole(e.target.value)} placeholder="Owner, Sales Rep, Project Manager…" />
                  </div>
                  <div>
                    <FieldLabel required>Email Address</FieldLabel>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@signco.ca" />
                  </div>
                  <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="416-555-0100" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Company Address</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <FieldLabel>Street Address</FieldLabel>
                    <Input value={street} onChange={e => setStreet(e.target.value)} placeholder="123 Main Street" />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel>Address Line 2</FieldLabel>
                    <Input value={street2} onChange={e => setStreet2(e.target.value)} placeholder="Suite, Unit, etc." />
                  </div>
                  <div>
                    <FieldLabel>City</FieldLabel>
                    <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Toronto" />
                  </div>
                  <div>
                    <FieldLabel>Province / State</FieldLabel>
                    <Select value={province} onValueChange={setProvince}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent className="max-h-60">
                        {PROVINCES_STATES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Postal / ZIP Code</FieldLabel>
                    <Input value={postal} onChange={e => setPostal(e.target.value)} placeholder="M5V 3A8" />
                  </div>
                  <div>
                    <FieldLabel>Country</FieldLabel>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Project Timeline</SectionTitle>
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <FieldLabel>Number of Signs</FieldLabel>
                    <Input type="number" min="1" value={numSigns} onChange={e => setNumSigns(e.target.value)} placeholder="1" />
                  </div>
                  <div>
                    <FieldLabel>In-Hand Date</FieldLabel>
                    <Input type="date" value={inHandDate} onChange={e => setInHandDate(e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Installation Date</FieldLabel>
                    <Input type="date" value={installDate} onChange={e => setInstallDate(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 1: Product Type ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Illumination</SectionTitle>
                <CheckGroup items={["Illuminated", "Non-Illuminated"]} selected={illumination} onChange={setIllumination} />
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Acrylic Faced (AF)</SectionTitle>
                <CheckGroup items={ACRYLIC_FACED} selected={acrylicFaced} onChange={setAcrylicFaced} />
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Metal Faced (MF)</SectionTitle>
                <CheckGroup items={METAL_FACED} selected={metalFaced} onChange={setMetalFaced} />
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Specialty (SPE)</SectionTitle>
                <CheckGroup items={SPECIALTY} selected={specialty} onChange={setSpecialty} />
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Supplementary (SUP) *</SectionTitle>
                <p className="text-xs text-stone-500 mb-4">* Supplementary products are only available with channel letter orders.</p>
                <CheckGroup items={SUPPLEMENTARY} selected={supplementary} onChange={setSupplementary} />
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Mounting Options</SectionTitle>
                <CheckGroup items={MOUNTING} selected={mounting} onChange={setMounting} />
              </div>
            </div>
          )}

          {/* ── Step 2: Sign Details ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Sign Text & Dimensions</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <FieldLabel>Sign Text</FieldLabel>
                    <Textarea value={signText} onChange={e => setSignText(e.target.value)} placeholder="Enter the text to appear on the sign…" rows={3} className="resize-none" />
                  </div>
                  <div>
                    <FieldLabel>Overall Width (inches)</FieldLabel>
                    <Input type="number" value={overallW} onChange={e => setOverallW(e.target.value)} placeholder='e.g. 96' />
                  </div>
                  <div>
                    <FieldLabel>Overall Height (inches)</FieldLabel>
                    <Input type="number" value={overallH} onChange={e => setOverallH(e.target.value)} placeholder='e.g. 18' />
                  </div>
                  <div>
                    <FieldLabel>Main Channel Letter Height (inches)</FieldLabel>
                    <Input type="number" value={mainLetterH} onChange={e => setMainLetterH(e.target.value)} placeholder='e.g. 12' />
                  </div>
                  <div>
                    <FieldLabel>Secondary Channel Letter Height (inches)</FieldLabel>
                    <Input type="number" value={secLetterH} onChange={e => setSecLetterH(e.target.value)} placeholder='e.g. 8' />
                  </div>
                  <div>
                    <FieldLabel>Logo Width (inches)</FieldLabel>
                    <Input type="number" value={logoW} onChange={e => setLogoW(e.target.value)} placeholder="If applicable" />
                  </div>
                  <div>
                    <FieldLabel>Logo Height (inches)</FieldLabel>
                    <Input type="number" value={logoH} onChange={e => setLogoH(e.target.value)} placeholder="If applicable" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Installation</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel required>Installation Type</FieldLabel>
                    <Select value={installationType} onValueChange={setInstallationType}>
                      <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                      <SelectContent>
                        {INSTALLATION_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel required>Installation Location</FieldLabel>
                    <Select value={installLocation} onValueChange={setInstallLocation}>
                      <SelectTrigger><SelectValue placeholder="Select location…" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Interior">Interior</SelectItem>
                        <SelectItem value="Exterior">Exterior</SelectItem>
                        <SelectItem value="Both Interior and Exterior">Both Interior and Exterior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Sign Face Graphics</SectionTitle>
                <CheckGroup items={FACE_GRAPHICS} selected={faceGraphics} onChange={setFaceGraphics} />
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>LED Illumination Type</SectionTitle>
                <CheckGroup items={LED_OPTIONS} selected={ledType} onChange={setLedType} />
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Logo Box Style</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LOGO_BOX_STYLES.map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="logoBoxStyle" value={s} checked={logoBoxStyle === s} onChange={() => setLogoBoxStyle(s)} className="accent-forest" />
                      <span className="text-sm text-stone-700 group-hover:text-forest transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Colors ── */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Color Chart Reference */}
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Color Chart Reference</SectionTitle>
                <p className="text-sm text-stone-500 mb-5">
                  Click either chart to view it full size. Use these as a reference when filling in the color fields below.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { src: "/manus-storage/vinyl-color-chart_008fc642.png", title: "3M 3630 Vinyl Colors" },
                    { src: "/manus-storage/acrylic-color-chart_9faadfdf.png", title: "Acrylic / Trim Cap / Return Colors" },
                  ].map(chart => (
                    <button
                      key={chart.title}
                      type="button"
                      onClick={() => setLightboxImg(chart)}
                      className="group relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50 hover:border-sage transition-colors text-left"
                    >
                      <img
                        src={chart.src}
                        alt={chart.title}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-forest shadow">
                          <ZoomIn className="h-4 w-4" /> View Full Size
                        </div>
                      </div>
                      <div className="px-4 py-3 border-t border-stone-100">
                        <p className="text-sm font-medium text-forest">{chart.title}</p>
                        <p className="text-xs text-stone-400 mt-0.5">Click to enlarge</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm text-stone-500 bg-sage/10 border border-sage/20 rounded-xl p-4">
                Fill out only what applies. You can also specify custom colors in the text fields below.
              </p>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Acrylic Color</SectionTitle>
                <Select value={acrylicColor} onValueChange={setAcrylicColor}>
                  <SelectTrigger><SelectValue placeholder="Select acrylic color…" /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {ACRYLIC_COLORS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                {acrylicColor === "Custom (specify below)" && (
                  <Input className="mt-3" value={acrylicColorCustom} onChange={e => setAcrylicColorCustom(e.target.value)} placeholder="Describe your custom acrylic color…" />
                )}
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Applied Graphics & Trim</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>Applied Graphics Color(s)</FieldLabel>
                    <Input value={graphicsColor} onChange={e => setGraphicsColor(e.target.value)} placeholder="e.g. 3M 3630-15 Black, 3M 3630-57 Red…" />
                  </div>
                  <div>
                    <FieldLabel>Trim Cap Color</FieldLabel>
                    <Input value={trimCapColor} onChange={e => setTrimCapColor(e.target.value)} placeholder="e.g. Standard White, Custom Painted Silver…" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Return & Raceway Colors</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>Return Color</FieldLabel>
                    <Input value={returnColor} onChange={e => setReturnColor(e.target.value)} placeholder="e.g. Primed and Painted Black, Custom…" />
                  </div>
                  <div>
                    <FieldLabel>Raceway / Wireway / Backer Color</FieldLabel>
                    <Input value={racewayColor} onChange={e => setRacewayColor(e.target.value)} placeholder="e.g. Primed Only, Painted to Match Wall…" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Extras & Files ── */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Raceway Options</SectionTitle>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>Hanger Bar</FieldLabel>
                    <Select value={hangerBar} onValueChange={setHangerBar}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Double Hanger Bar (Required in some areas)">Double Hanger Bar (Required in some areas)</SelectItem>
                        <SelectItem value="Single Hanger Bar">Single Hanger Bar</SelectItem>
                        <SelectItem value="No Hanger Bar">No Hanger Bar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Raceway Location</FieldLabel>
                    <Select value={racewayLocation} onValueChange={setRacewayLocation}>
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Top Mount">Top Mount</SelectItem>
                        <SelectItem value="Middle Mount">Middle Mount</SelectItem>
                        <SelectItem value="Bottom Mount">Bottom Mount</SelectItem>
                        <SelectItem value="Per Artwork">Per Artwork</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Other Customizations</SectionTitle>
                <CheckGroup
                  items={["Baffle – 2 Color LED Front/Back", "Remote Power Supply Box", "Custom Whip Length", "Cabinet (Custom)", "Self Contained", "No Weep Holes"]}
                  selected={extras}
                  onChange={setExtras}
                />
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Additional Instructions</SectionTitle>
                <Textarea
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                  rows={5}
                  className="resize-none"
                  placeholder="Please include any information that would help provide a more accurate quote — customizations, remote power supply boxes, changes to whip length, special paint colors, etc."
                />
              </div>

              <div className="bg-sage/10 border border-sage/20 rounded-2xl p-6">
                <p className="text-sm text-stone-700 font-medium mb-2">Artwork Files</p>
                <p className="text-sm text-stone-500">
                  Please email your artwork files (PDF, EPS, AI preferred; JPG/PNG at 300 dpi CMYK for digital prints) directly to{" "}
                  <a href="mailto:sales@cwsg.ca" className="text-forest underline">sales@cwsg.ca</a>{" "}
                  with your company name in the subject line. Max file size: 300 MB.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <Button type="button" variant="outline" onClick={back} disabled={step === 0} className="rounded-full px-7 border-forest text-forest hover:bg-forest/5 disabled:opacity-30">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={next} className="bg-forest hover:bg-forest/90 text-bone rounded-full px-8">
                Next: {STEPS[step + 1]} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit" className="bg-sage hover:bg-forest text-forest hover:text-bone rounded-full px-8 transition-colors">
                Submit Quote Request
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Lightbox modal */}
      <Dialog open={!!lightboxImg} onOpenChange={open => !open && setLightboxImg(null)}>
        <DialogContent className="max-w-3xl w-full p-0 overflow-hidden bg-white rounded-2xl">
          {lightboxImg && (
            <>
              <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
                <p className="font-medium text-forest text-sm">{lightboxImg.title}</p>
                <button type="button" onClick={() => setLightboxImg(null)} className="text-stone-400 hover:text-stone-700 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-auto max-h-[80vh]">
                <img src={lightboxImg.src} alt={lightboxImg.title} className="w-full h-auto" />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
