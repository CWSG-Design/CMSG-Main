import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle2, ChevronRight, ChevronLeft, ZoomIn, X, UploadCloud, FileText, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { products } from "@/lib/mock";

// ─── Data ────────────────────────────────────────────────────────────────────

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

// Acrylic swatches
const ACRYLIC_SWATCHES = [
  { label: "#2447 White", sub: "Standard", hex: "#F5F5F0" },
  { label: "SG #2447 White", sub: "Sign Grade", hex: "#EFEFEA" },
  { label: "#7328 White", sub: "", hex: "#F8F8F3" },
  { label: "SG #7328 White", sub: "Sign Grade", hex: "#F2F2ED" },
  { label: "#2406 White", sub: "", hex: "#FAFAF8" },
  { label: "#2283 Red", sub: "", hex: "#C8102E" },
  { label: "SG #2283 Red", sub: "Sign Grade", hex: "#BE0E2A" },
  { label: "#2793 Red", sub: "", hex: "#A50021" },
  { label: "SG #2793 Red", sub: "Sign Grade", hex: "#9B001F" },
  { label: "#2415 Red", sub: "", hex: "#D62027" },
  { label: "#2662 Orange", sub: "Diffuser Needed", hex: "#F26522", diffuser: true },
  { label: "#2157 Red", sub: "Diffuser Needed", hex: "#E8112D", diffuser: true },
  { label: "#2051 Blue", sub: "Diffuser Needed", hex: "#003087", diffuser: true },
  { label: "#2114 Blue", sub: "", hex: "#0057A8" },
  { label: "#2648 Blue", sub: "Diffuser Needed", hex: "#1B4F9B", diffuser: true },
  { label: "#2030 Hunter Green", sub: "Diffuser Needed", hex: "#215732", diffuser: true },
  { label: "#2108 Holly Green", sub: "", hex: "#2D6A4F" },
  { label: "#2146 Ivory", sub: "", hex: "#F5ECD7" },
  { label: "#2016 Yellow", sub: "Diffuser Needed", hex: "#FFD700", diffuser: true },
  { label: "#2037 Yellow", sub: "", hex: "#F5C518" },
  { label: "#2119 Orange", sub: "", hex: "#E8650A" },
  { label: "#2412 Bronze", sub: "", hex: "#8B6914" },
  { label: "Day/Night", sub: "Diffuser Needed", hex: "#D4C5A9", diffuser: true },
  { label: "Subway Green", sub: "", hex: "#2E7D32" },
  { label: "Subway Yellow", sub: "", hex: "#F9C80E" },
  { label: "#0000 Clear", sub: "", hex: "transparent", border: true },
  { label: "Custom", sub: "Specify below", hex: "custom" },
];
const ACRYLIC_COLORS = ACRYLIC_SWATCHES.map(s => s.label + (s.sub ? ` (${s.sub})` : ""));

// 3M Scotchcal Translucent Film Series 3630
const VINYL_3M_3630_COLORS = [
  "3630-015 Yellow","3630-15 Yellow","3630-25 Sunflower","3630-125 Golden Yellow",
  "3630-235 Yellow","3630-86 Yellow","3630-84 Tangerine","3630-144 Poppy Orange",
  "3630-124 Orange","3630-74 Kumquat Orange","3630-43 Light Tomato Red",
  "3630-143 Poppy Red","3630-163 Scarlet","3630-93 Fire Engine Red","3630-33 Red",
  "3630-73 Dark Red","3630-53 Cardinal Red","3630-83 Regal Red","3630-133 Raspberry",
  "3630-98 Electric Pink","3630-78 Vivid Rose","3630-128 Plum Purple",
  "3630-158 Bright Violet","3630-77 Burgundy","3630-49 Burgundy",
  "3630-328 Berry Burgundy","3630-118 Intense Magenta","3630-44 Fuchsia",
  "3630-87 Royal Blue","3630-135 Indigo","3630-27 Electric Blue","3630-36 Blue",
  "3630-47 Patriot Blue","3630-157 Sultan Blue","3630-217 Blue","3630-227 Azure",
  "3630-147 Light European Blue","3630-57 Olympic Blue","3630-337 Process Blue",
  "3630-127 Intense Blue","3630-167 Bright Blue","3630-97 Bristol Blue",
  "3630-37 Sapphire","3630-216 Blue Coral","3630-287 Blue","3630-297 Blue",
  "3630-187 Forest","3630-246 Brilliant Green","3630-106 Turquoise",
  "3630-236 Turquoise","3630-115 Blue Lagoon","3630-316 Green",
  "3630-126 Dark Emerald Green","3630-76 Holly Green","3630-276 KY Blue Grass",
  "3630-196 Green","3630-137 Light Kelly Green","3630-146 Green","3630-56 Green",
  "3630-156 Vivid Green","3630-26 Rust Brown","3630-63 Brown","3630-59 Dark Brown",
  "3630-69 Duranodic","3630-121 Silver","3630-141 Gold Nugget",
  "3630-131 Gold Metallic","3630-005 Ivory","3630-149 Light Beige",
  "3630-39 Warm Beige","3630-111 Dover White","3630-20 White",
  "3630-71 Shadow Gray","3630-51 Silver Gray","3630-61 Slate Gray","3630-22 Black",
];

// 3M Envision Translucent Film Series 3730
const VINYL_3M_3730_COLORS = [
  "3730-015L Yellow","3730-43L Light Tomato Red","3730-33L Red","3730-73L Dark Red",
  "3730-53L Cardinal Red","3730-157L Regal Red","3730-133L Raspberry",
  "3730-137L European Blue","3730-125L Plum Purple","3730-128L Plum Purple",
  "3730-246L Teal Green","3730-44L Orange","3730-36L Blue","3730-76L Holly Green",
  "3730-26L Olympic Blue","3730-57L Vivid Green","3730-156L Regal Red",
  "3730-337L Process Blue","3730-106L Brilliant Green","3730-127L Intense Blue",
  "3730-83L Bright Blue","3730-167L Bright Blue","3730-49L Burgundy",
  "3730-97L Bristol Blue","3730-20L Green","3730-74 Golden Yellow",
];

// Trim cap swatches
const TRIM_CAP_SWATCHES = [
  { label: "Standard White", hex: "#F5F5F0" },
  { label: "Standard Black", hex: "#1A1A1A" },
  { label: "Standard Silver", hex: "#C0C0C0" },
  { label: "Standard Gold", hex: "#C9A84C" },
  { label: "Standard Bronze", hex: "#8B6914" },
  { label: "Standard Red", hex: "#C8102E" },
  { label: "Standard Blue", hex: "#0057A8" },
  { label: "Standard Green", hex: "#2D6A4F" },
  { label: "Custom Painted", hex: "custom" },
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

// Which detail fields to show per product slug
type ProductFieldSet = {
  showSignText?: boolean;
  showLetterDimensions?: boolean;   // main + secondary letter height
  showOverallDimensions?: boolean;  // overall W × H
  showLogoDimensions?: boolean;
  showMounting?: boolean;
  showInstallation?: boolean;
  showFaceGraphics?: boolean;
  showLED?: boolean;
  showLogoBox?: boolean;
  showIllumination?: boolean;
  showPanelDimensions?: boolean;    // for tenant panels / pylon faces
  showPrintMaterial?: boolean;      // for 3D printed signs
};

const PRODUCT_FIELDS: Record<string, ProductFieldSet> = {
  "front-lit-channel-letters":        { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "front-lit-vertical-supports":      { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "halo-illuminated-channel-letters": { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "face-halo-combination":            { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "trimless-channel-letters":         { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "fascia-storefront-signs":          { showSignText: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "interior-hanging-signs":           { showSignText: true, showOverallDimensions: true, showLogoDimensions: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "3d-printed-signs":                 { showSignText: true, showOverallDimensions: true, showLogoDimensions: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true, showPrintMaterial: true },
  "pylon-ground-signs":               { showSignText: true, showOverallDimensions: true, showLogoDimensions: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true, showPanelDimensions: true },
  "push-through-faux-neon":           { showSignText: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "flat-cut-out-letters":             { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showInstallation: true, showFaceGraphics: true, showIllumination: false },
  "channel-letters-on-raceways":      { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true },
  "tenant-panels":                    { showSignText: true, showOverallDimensions: true, showPanelDimensions: true, showFaceGraphics: true, showIllumination: true },
  "open-face-channel-letters":        { showSignText: true, showLetterDimensions: true, showOverallDimensions: true, showLogoDimensions: true, showMounting: true, showInstallation: true, showLED: true, showLogoBox: true, showIllumination: true },
  "illuminated-hanging-window-signs": { showSignText: true, showOverallDimensions: true, showLogoDimensions: true, showInstallation: true, showFaceGraphics: true, showLED: true, showLogoBox: true, showIllumination: true, showPrintMaterial: true },
};

const STEPS = ["Your Info", "Select Product", "Sign Details", "Colors", "Extras & Files"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif text-xl text-forest mb-4">{children}</h3>;
}

type SwatchItem = { label: string; sub?: string; hex: string; diffuser?: boolean; border?: boolean };
function SwatchPicker({
  swatches, selected, onSelect,
}: {
  swatches: SwatchItem[];
  selected: string;
  onSelect: (v: string) => void;
  label: string;
}) {
  return (
    <div>
      <p className="text-xs text-stone-500 mb-3">Click a swatch to select — it will populate the field below.</p>
      <div className="flex flex-wrap gap-2">
        {swatches.map(s => {
          const value = s.label + (s.sub ? ` (${s.sub})` : "");
          const isSelected = selected === value;
          const isCustom = s.hex === "custom";
          const isClear = s.hex === "transparent";
          return (
            <Tooltip key={value} delayDuration={150}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onSelect(value)}
                  className={`group relative flex flex-col items-center gap-1.5 p-1.5 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-forest shadow-md scale-105"
                      : "border-transparent hover:border-sage/50 hover:scale-105"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isClear ? "border-2 border-dashed border-stone-300 bg-white text-stone-400" : ""
                    } ${isCustom ? "border-2 border-dashed border-sage bg-sage/10 text-sage" : ""}`}
                    style={!isCustom && !isClear ? { backgroundColor: s.hex } : {}}
                  >
                    {isCustom && "+"}
                    {isClear && "∅"}
                  </span>
                  {s.diffuser && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white" />
                  )}
                  {isSelected && (
                    <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-forest border-2 border-white" />
                  )}
                  <span className="text-[10px] text-stone-600 leading-tight text-center max-w-[48px] truncate">{s.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-forest text-bone text-xs px-3 py-2 rounded-lg shadow-lg max-w-[180px] text-center"
              >
                <p className="font-semibold">{s.label}{s.sub ? ` — ${s.sub}` : ""}</p>
                {s.diffuser && (
                  <p className="text-amber-300 mt-0.5 text-[11px]">⚠ Diffuser panel required</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
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
  const search = useSearch();
  const prefilledSlug = useMemo(() => new URLSearchParams(search).get("product") ?? "", [search]);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // ── Step 0: Your Info ──
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

  // ── Step 1: Product Selection ──
  const [selectedSlug, setSelectedSlug] = useState<string>(() => prefilledSlug || "");
  const selectedProduct = useMemo(() => products.find(p => p.slug === selectedSlug) ?? null, [selectedSlug]);
  const fieldSet: ProductFieldSet = useMemo(() => (selectedSlug ? (PRODUCT_FIELDS[selectedSlug] ?? {}) : {}), [selectedSlug]);

  // ── Step 2: Sign Details ──
  const [illumination, setIllumination] = useState<string[]>([]);
  const [mounting, setMounting] = useState<string[]>([]);
  const [signText, setSignText] = useState("");
  const [overallW, setOverallW] = useState("");
  const [overallH, setOverallH] = useState("");
  const [panelW, setPanelW] = useState("");
  const [panelH, setPanelH] = useState("");
  const [logoW, setLogoW] = useState("");
  const [logoH, setLogoH] = useState("");
  const [mainLetterH, setMainLetterH] = useState("");
  const [secLetterH, setSecLetterH] = useState("");
  const [installationType, setInstallationType] = useState("");
  const [installLocation, setInstallLocation] = useState("");
  const [faceGraphics, setFaceGraphics] = useState<string[]>([]);
  const [ledType, setLedType] = useState<string[]>([]);
  const [logoBoxStyle, setLogoBoxStyle] = useState("");
  const [printMaterial, setPrintMaterial] = useState("");

  // ── Step 3: Colors ──
  const [acrylicColor, setAcrylicColor] = useState("");
  const [acrylicColorCustom, setAcrylicColorCustom] = useState("");
  const [graphicsColor, setGraphicsColor] = useState("");
  const [vinylColor, setVinylColor] = useState("");
  const [trimCapColor, setTrimCapColor] = useState("");
  const [returnColor, setReturnColor] = useState("");
  const [racewayColor, setRacewayColor] = useState("");

  // Color chart lightbox
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  // ── Step 4: Extras & Files ──
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; key: string }[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const uploadArtwork = trpc.email.uploadArtwork.useMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const oversized = files.filter(f => f.size > 16 * 1024 * 1024);
    if (oversized.length) {
      toast.error(`File(s) too large (max 16 MB): ${oversized.map(f => f.name).join(", ")}`);
      return;
    }
    if (uploadedFiles.length + files.length > 10) {
      toast.error("Maximum 10 files per quote.");
      return;
    }
    setUploadingFiles(true);
    try {
      const encoded = await Promise.all(
        files.map(file => new Promise<{ name: string; type: string; data: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = (reader.result as string).split(",")[1];
            resolve({ name: file.name, type: file.type, data: base64 });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }))
      );
      const result = await uploadArtwork.mutateAsync({ files: encoded });
      setUploadedFiles(prev => [...prev, ...result.files.map(f => ({ name: f.name, url: f.url, key: f.key }))]);
      toast.success(`${result.files.length} file(s) uploaded successfully.`);
    } catch (err) {
      toast.error("Upload failed. Please try again or email files directly.");
      console.error("[Upload] Error:", err);
    } finally {
      setUploadingFiles(false);
      e.target.value = "";
    }
  };

  const removeUploadedFile = (url: string) => {
    setUploadedFiles(prev => prev.filter(f => f.url !== url));
  };

  const [hangerBar, setHangerBar] = useState("");
  const [racewayLocation, setRacewayLocation] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // ── Validation ──
  const validate = () => {
    if (step === 0 && (!companyName || !firstName || !email || !isTradeCustomer)) {
      toast.error("Please fill in Company Name, Contact Name, Email, and confirm trade status.");
      return false;
    }
    if (step === 1 && !selectedSlug) {
      toast.error("Please select a product to continue.");
      return false;
    }
    return true;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep(s => Math.max(s - 1, 0));

  const sendQuote = trpc.email.sendQuote.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Quote request submitted! We'll be in touch within 1 business day.");
    },
    onError: (err) => {
      toast.error("Failed to submit quote. Please try again or email us directly.");
      console.error("[Quote] Send error:", err);
    },
  });

  const submitQuote = () => {
    const detailParts: string[] = [];
    if (printMaterial) detailParts.push(`Print Material: ${printMaterial}`);
    if (panelW || panelH) detailParts.push(`Panel Size: ${panelW || "?"}W × ${panelH || "?"}H`);

    sendQuote.mutate({
      companyName,
      firstName,
      lastName,
      jobTitle: jobRole || undefined,
      email,
      phone: phone || undefined,
      billingAddress: [street, street2, city, province, postal, country].filter(Boolean).join(", ") || undefined,
      isTradeCustomer: isTradeCustomer || undefined,
      numSigns: numSigns || undefined,
      inHandDate: inHandDate || undefined,
      installDate: installDate || undefined,
      illumination: illumination.join(", ") || undefined,
      signTypes: selectedProduct ? [selectedProduct.title] : undefined,
      mounting: mounting.join(", ") || undefined,
      signText: signText || undefined,
      width: overallW || undefined,
      height: overallH || undefined,
      letterHeight: mainLetterH || undefined,
      secondaryLetterHeight: secLetterH || undefined,
      logoWidth: logoW || undefined,
      logoHeight: logoH || undefined,
      installationType: installationType || undefined,
      installationLocation: installLocation || undefined,
      faceGraphics: faceGraphics.join(", ") || undefined,
      ledType: ledType.join(", ") || undefined,
      logoBoxStyle: logoBoxStyle || undefined,
      acrylicColor: acrylicColor === "Custom (Specify below)" ? acrylicColorCustom : acrylicColor || undefined,
      graphicsColor: [vinylColor, graphicsColor].filter(Boolean).join(", ") || undefined,
      trimCapColor: trimCapColor || undefined,
      returnColor: returnColor || undefined,
      racewayColor: racewayColor || undefined,
      hangerBar: hangerBar || undefined,
      racewayLocation: racewayLocation || undefined,
      extras: extras.length > 0 ? extras : undefined,
      additionalInstructions: [
        detailParts.join(" | "),
        additionalNotes,
      ].filter(Boolean).join("\n\n") || undefined,
      panelWidth: panelW || undefined,
      panelHeight: panelH || undefined,
      printMaterial: printMaterial || undefined,
      artworkFiles: uploadedFiles.length > 0
        ? uploadedFiles.map(f => ({ name: f.name, key: f.key }))
        : undefined,
    });
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
            <a href="mailto:sales@canadianwholesalesigns.ca" className="text-forest underline">sales@canadianwholesalesigns.ca</a>.
          </p>
          <Button type="button" onClick={() => { setSubmitted(false); setStep(0); }} className="mt-8 bg-forest hover:bg-forest/90 text-bone rounded-full px-8">
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
      <form onSubmit={e => e.preventDefault()}>
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

          {/* ── Step 1: Select Product ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>What product are you quoting?</SectionTitle>
                <p className="text-sm text-stone-500 mb-6">Select the product that best matches your project. You can provide more detail on the next step.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(p => {
                    const isSelected = selectedSlug === p.slug;
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => setSelectedSlug(p.slug)}
                        className={`group relative text-left rounded-2xl border-2 overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                          isSelected
                            ? "border-forest shadow-lg scale-[1.02]"
                            : "border-stone-200 hover:border-sage hover:shadow-md"
                        }`}
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                          <img
                            src={p.image}
                            alt={p.title}
                            className={`w-full h-full object-cover transition-transform duration-300 ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
                          />
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-forest text-bone rounded-full p-1 shadow-md">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                        <div className={`p-4 ${isSelected ? "bg-forest/5" : "bg-white"}`}>
                          <h3 className={`font-serif text-sm font-semibold leading-snug ${isSelected ? "text-forest" : "text-stone-800 group-hover:text-forest"} transition-colors`}>
                            {p.title}
                          </h3>
                          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">{p.blurb}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {!selectedSlug && (
                  <p className="mt-4 text-xs text-stone-400 text-center">Select a product above to continue.</p>
                )}
                {selectedSlug && (
                  <div className="mt-6 flex items-center gap-3 bg-sage/10 border border-sage/30 rounded-xl px-5 py-3.5">
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
                    <p className="text-sm text-forest">
                      Selected: <strong>{selectedProduct?.title}</strong>. The next step will show fields specific to this product.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 2: Sign Details ── */}
          {step === 2 && (
            <div className="space-y-6">
              {selectedProduct && (
                <div className="flex items-center gap-3 bg-sage/10 border border-sage/30 rounded-xl px-5 py-3">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Quoting for</p>
                    <p className="text-sm font-semibold text-forest">{selectedProduct.title}</p>
                  </div>
                </div>
              )}

              {/* Illumination */}
              {fieldSet.showIllumination && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Illumination</SectionTitle>
                  <CheckGroup items={["Illuminated", "Non-Illuminated"]} selected={illumination} onChange={setIllumination} />
                </div>
              )}

              {/* Sign Text */}
              {fieldSet.showSignText && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Sign Text</SectionTitle>
                  <FieldLabel>Text to appear on the sign</FieldLabel>
                  <Textarea value={signText} onChange={e => setSignText(e.target.value)} placeholder="Enter the text to appear on the sign…" rows={3} className="resize-none" />
                </div>
              )}

              {/* Dimensions */}
              {(fieldSet.showOverallDimensions || fieldSet.showLetterDimensions || fieldSet.showLogoDimensions || fieldSet.showPanelDimensions) && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Dimensions</SectionTitle>
                  <div className="grid md:grid-cols-2 gap-5">
                    {fieldSet.showOverallDimensions && (
                      <>
                        <div>
                          <FieldLabel>Overall Width (inches)</FieldLabel>
                          <Input type="number" value={overallW} onChange={e => setOverallW(e.target.value)} placeholder='e.g. 96' />
                        </div>
                        <div>
                          <FieldLabel>Overall Height (inches)</FieldLabel>
                          <Input type="number" value={overallH} onChange={e => setOverallH(e.target.value)} placeholder='e.g. 18' />
                        </div>
                      </>
                    )}
                    {fieldSet.showLetterDimensions && (
                      <>
                        <div>
                          <FieldLabel>Main Channel Letter Height (inches)</FieldLabel>
                          <Input type="number" value={mainLetterH} onChange={e => setMainLetterH(e.target.value)} placeholder='e.g. 12' />
                        </div>
                        <div>
                          <FieldLabel>Secondary Channel Letter Height (inches)</FieldLabel>
                          <Input type="number" value={secLetterH} onChange={e => setSecLetterH(e.target.value)} placeholder='e.g. 8' />
                        </div>
                      </>
                    )}
                    {fieldSet.showLogoDimensions && (
                      <>
                        <div>
                          <FieldLabel>Logo Width (inches)</FieldLabel>
                          <Input type="number" value={logoW} onChange={e => setLogoW(e.target.value)} placeholder="If applicable" />
                        </div>
                        <div>
                          <FieldLabel>Logo Height (inches)</FieldLabel>
                          <Input type="number" value={logoH} onChange={e => setLogoH(e.target.value)} placeholder="If applicable" />
                        </div>
                      </>
                    )}
                    {fieldSet.showPanelDimensions && (
                      <>
                        <div>
                          <FieldLabel>Panel Width (inches)</FieldLabel>
                          <Input type="number" value={panelW} onChange={e => setPanelW(e.target.value)} placeholder='e.g. 48' />
                        </div>
                        <div>
                          <FieldLabel>Panel Height (inches)</FieldLabel>
                          <Input type="number" value={panelH} onChange={e => setPanelH(e.target.value)} placeholder='e.g. 24' />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Mounting */}
              {fieldSet.showMounting && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Mounting Options</SectionTitle>
                  <CheckGroup items={MOUNTING} selected={mounting} onChange={setMounting} />
                </div>
              )}

              {/* Installation */}
              {fieldSet.showInstallation && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Installation</SectionTitle>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel>Installation Type</FieldLabel>
                      <Select value={installationType} onValueChange={setInstallationType}>
                        <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                        <SelectContent>
                          {INSTALLATION_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <FieldLabel>Installation Location</FieldLabel>
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
              )}

              {/* Face Graphics */}
              {fieldSet.showFaceGraphics && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Sign Face Graphics</SectionTitle>
                  <CheckGroup items={FACE_GRAPHICS} selected={faceGraphics} onChange={setFaceGraphics} />
                </div>
              )}

              {/* LED */}
              {fieldSet.showLED && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>LED Illumination Type</SectionTitle>
                  <CheckGroup items={LED_OPTIONS} selected={ledType} onChange={setLedType} />
                </div>
              )}

              {/* Logo Box */}
              {fieldSet.showLogoBox && (
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
              )}

              {/* Print Material (3D Printed) */}
              {fieldSet.showPrintMaterial && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8">
                  <SectionTitle>Print Material</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["ASA (UV-stable, recommended)", "ABS", "PETG", "PLA", "Other / Not Sure"].map(m => (
                      <label key={m} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="printMaterial" value={m} checked={printMaterial === m} onChange={() => setPrintMaterial(m)} className="accent-forest" />
                        <span className="text-sm text-stone-700 group-hover:text-forest transition-colors">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
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
                Fill out only what applies to your product. You can also specify custom colors in the text fields below.
              </p>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Acrylic Color</SectionTitle>
                <SwatchPicker
                  swatches={ACRYLIC_SWATCHES}
                  selected={acrylicColor}
                  onSelect={v => { setAcrylicColor(v); if (v !== "Custom (Specify below)") setAcrylicColorCustom(""); }}
                  label="Acrylic Color"
                />
                <div className="mt-4">
                  <FieldLabel>Acrylic Color</FieldLabel>
                  <Select value={acrylicColor} onValueChange={v => { setAcrylicColor(v); if (v !== "Custom (Specify below)") setAcrylicColorCustom(""); }}>
                    <SelectTrigger><SelectValue placeholder="Or select from dropdown…" /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {ACRYLIC_COLORS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {(acrylicColor.startsWith("Custom")) && (
                    <Input className="mt-3" value={acrylicColorCustom} onChange={e => setAcrylicColorCustom(e.target.value)} placeholder="Describe your custom acrylic color…" />
                  )}
                </div>
                <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 mr-1.5 align-middle" />
                  Swatches marked with an amber dot require a diffuser panel.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Trim Cap Color</SectionTitle>
                <SwatchPicker
                  swatches={TRIM_CAP_SWATCHES}
                  selected={trimCapColor}
                  onSelect={setTrimCapColor}
                  label="Trim Cap Color"
                />
                <div className="mt-4">
                  <FieldLabel>Trim Cap Color</FieldLabel>
                  <Input
                    value={trimCapColor}
                    onChange={e => setTrimCapColor(e.target.value)}
                    placeholder="e.g. Standard White, Custom Painted Silver…"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Applied Vinyl Color(s)</SectionTitle>
                <p className="text-xs text-stone-500 mb-4">
                  Select from the 3M translucent vinyl series below. Use the text field to specify additional colors or custom matches.
                </p>
                <div className="space-y-4">
                  <div>
                    <FieldLabel>3M Scotchcal™ Translucent Film Series 3630</FieldLabel>
                    <Select value={vinylColor.startsWith("3630") ? vinylColor : ""} onValueChange={v => setVinylColor(v)}>
                      <SelectTrigger><SelectValue placeholder="Select a 3630 color…" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {VINYL_3M_3630_COLORS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>3M Envision™ Translucent Film Series 3730 (Higher Light Transmission)</FieldLabel>
                    <Select value={vinylColor.startsWith("3730") ? vinylColor : ""} onValueChange={v => setVinylColor(v)}>
                      <SelectTrigger><SelectValue placeholder="Select a 3730 color…" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {VINYL_3M_3730_COLORS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Additional or Custom Vinyl Colors</FieldLabel>
                    <Input value={graphicsColor} onChange={e => setGraphicsColor(e.target.value)} placeholder="e.g. 3M 3630-22 Black, custom match…" />
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

              <div className="bg-white rounded-2xl border border-stone-200 p-8">
                <SectionTitle>Artwork & Logo Files</SectionTitle>
                <p className="text-sm text-stone-500 mb-5">
                  Upload your logo or artwork files here (PDF, EPS, AI, SVG preferred; JPG/PNG at 300 dpi for digital prints).
                  Max 16 MB per file, up to 10 files. Files will be attached to your quote request.
                </p>
                <label className={`flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
                  uploadingFiles
                    ? "border-sage/40 bg-sage/5 cursor-wait"
                    : "border-stone-300 hover:border-sage hover:bg-sage/5"
                }`}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.eps,.ai,.svg,.jpg,.jpeg,.png,.tiff,.tif,.zip"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={uploadingFiles || uploadedFiles.length >= 10}
                  />
                  {uploadingFiles ? (
                    <>
                      <span className="inline-block h-8 w-8 border-2 border-sage/40 border-t-sage rounded-full animate-spin" />
                      <p className="text-sm text-stone-500">Uploading files…</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-sage" />
                      <p className="text-sm font-medium text-stone-700">Click to browse or drag & drop files here</p>
                      <p className="text-xs text-stone-400">PDF, EPS, AI, SVG, JPG, PNG, TIFF, ZIP — max 16 MB each</p>
                    </>
                  )}
                </label>
                {uploadedFiles.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {uploadedFiles.map(f => (
                      <li key={f.url} className="flex items-center gap-3 bg-sage/5 border border-sage/20 rounded-lg px-4 py-2.5">
                        <FileText className="h-4 w-4 text-sage shrink-0" />
                        <span className="text-sm text-stone-700 flex-1 truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removeUploadedFile(f.url)}
                          className="text-stone-400 hover:text-red-500 transition-colors"
                          aria-label="Remove file"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-stone-400 mt-4">
                  You can also email large files (&gt;16 MB) directly to{" "}
                  <a href="mailto:sales@canadianwholesalesigns.ca" className="text-forest underline">sales@canadianwholesalesigns.ca</a>.
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
              <Button type="button" onClick={submitQuote} disabled={sendQuote.isPending} className="bg-sage hover:bg-forest text-forest hover:text-bone rounded-full px-8 transition-colors gap-2">
                {sendQuote.isPending && <span className="inline-block h-4 w-4 border-2 border-forest/40 border-t-forest rounded-full animate-spin" />}
                {sendQuote.isPending ? "Submitting…" : "Submit Quote Request"}
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
    </main>
  );
}
