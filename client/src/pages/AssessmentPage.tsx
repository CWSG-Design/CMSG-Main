import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { products, brand } from "@/lib/mock";
import jsPDF from "jspdf";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface Question {
  id: string;
  question: string;
  hint?: string;
  multi?: boolean;
  options: Option[];
}

/* ─── Questions ─────────────────────────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: "goal",
    question: "What are you trying to accomplish?",
    options: [
      { value: "attract", label: "Attract more customers from the road or sidewalk", icon: "🚗" },
      { value: "identify", label: "Identify my business location or building", icon: "📍" },
      { value: "promote", label: "Promote products, sales, or services", icon: "📣" },
      { value: "direct", label: "Direct people inside my building", icon: "🗺️" },
      { value: "brand", label: "Brand my vehicles", icon: "🚐" },
      { value: "multiple", label: "Multiple goals", icon: "✨" },
    ],
  },
  {
    id: "businessType",
    question: "What type of business are you?",
    options: [
      { value: "retail", label: "Retail Store", icon: "🛍️" },
      { value: "restaurant", label: "Restaurant / Food Service", icon: "🍽️" },
      { value: "office", label: "Office / Professional Services", icon: "💼" },
      { value: "industrial", label: "Industrial / Manufacturing", icon: "🏭" },
      { value: "medical", label: "Medical / Healthcare", icon: "🏥" },
      { value: "construction", label: "Construction / Trades", icon: "🔨" },
      { value: "property", label: "Property Management / Real Estate", icon: "🏢" },
      { value: "other", label: "Other", icon: "📋" },
    ],
  },
  {
    id: "location",
    question: "Where will the sign be located?",
    options: [
      { value: "storefront", label: "Storefront / Retail plaza", icon: "🏪" },
      { value: "standalone", label: "Stand-alone building", icon: "🏗️" },
      { value: "downtown", label: "Downtown / Busy roadway", icon: "🏙️" },
      { value: "office-complex", label: "Office complex", icon: "🏢" },
      { value: "industrial-site", label: "Warehouse / Industrial site", icon: "🏭" },
      { value: "interior", label: "Office or retail interior", icon: "🪟" },
      { value: "event", label: "Trade show / Event", icon: "🎪" },
      { value: "construction-site", label: "Construction site", icon: "🚧" },
    ],
  },
  {
    id: "illumination",
    question: "Will the sign need to be visible at night?",
    options: [
      { value: "required", label: "Yes — illumination is required", icon: "💡" },
      { value: "preferred", label: "Preferred but not required", icon: "🌙" },
      { value: "no", label: "No — daytime only", icon: "☀️" },
    ],
  },
  {
    id: "existing",
    question: "Do you currently have signage?",
    options: [
      { value: "new", label: "No — brand new location", icon: "🆕" },
      { value: "replace", label: "Existing sign needs replacement", icon: "🔄" },
      { value: "update", label: "Existing sign needs updating", icon: "✏️" },
      { value: "additional", label: "Existing sign is fine — need additional signage", icon: "➕" },
    ],
  },
  {
    id: "installation",
    question: "Do you require installation?",
    options: [
      { value: "full", label: "Yes — full installation required", icon: "🔧" },
      { value: "delivery", label: "Delivery only", icon: "📦" },
      { value: "self", label: "I will install myself", icon: "🛠️" },
      { value: "unsure", label: "Not sure yet", icon: "🤔" },
    ],
  },
  {
    id: "stage",
    question: "What stage are you at?",
    hint: "This helps us prioritize your inquiry.",
    options: [
      { value: "research", label: "Just researching options", icon: "🔍" },
      { value: "quotes", label: "Gathering quotes", icon: "📝" },
      { value: "ready", label: "Ready to purchase within 30 days", icon: "✅" },
      { value: "urgent", label: "Need signage immediately", icon: "⚡" },
    ],
  },
];

/* ─── Product Recommendation Logic ──────────────────────────────────────────── */
function getRecommendations(answers: Record<string, string>): string[] {
  const slugs: string[] = [];
  const { goal, location, illumination, businessType } = answers;

  const isExterior = ["storefront", "standalone", "downtown", "construction-site"].includes(location);
  const isInterior = ["interior", "office-complex"].includes(location);
  const needsLight = illumination === "required" || illumination === "preferred";
  const isRetailFood = ["retail", "restaurant"].includes(businessType);
  const isProperty = businessType === "property";
  const isEvent = location === "event";

  if (isExterior && needsLight && goal !== "direct") {
    slugs.push("front-lit-channel-letters");
  }
  if (isExterior && needsLight && ["office", "medical", "property"].includes(businessType)) {
    slugs.push("halo-illuminated-channel-letters");
  }
  if (["standalone", "downtown"].includes(location) && goal === "attract") {
    slugs.push("pylon-ground-signs");
  }
  if (["storefront", "downtown"].includes(location)) {
    slugs.push("fascia-storefront-signs");
  }
  if (isExterior && isRetailFood && needsLight) {
    slugs.push("push-through-faux-neon");
  }
  if (isProperty || location === "storefront") {
    slugs.push("tenant-panels");
  }
  if (isInterior && needsLight) {
    slugs.push("trimless-channel-letters");
  }
  if ((isInterior || goal === "direct") && isRetailFood) {
    slugs.push("interior-hanging-signs");
  }
  if (["retail", "restaurant", "office"].includes(businessType) && needsLight) {
    slugs.push("3d-printed-signs");
  }
  if (!needsLight || illumination === ("no" as string)) {
    slugs.push("flat-cut-out-letters");
  }
  if (isExterior && goal === "identify") {
    slugs.push("channel-letters-on-raceways");
  }
  if (["restaurant", "retail"].includes(businessType) && needsLight) {
    slugs.push("open-face-channel-letters");
  }
  if (["storefront", "event"].includes(location) || isEvent) {
    slugs.push("illuminated-hanging-window-signs");
  }
  if (location === "standalone" && needsLight) {
    slugs.push("front-lit-vertical-supports");
  }

  const unique = Array.from(new Set(slugs));
  return unique.slice(0, 4);
}

/* ─── Label helpers ──────────────────────────────────────────────────────────── */
function getAnswerLabel(questionId: string, value: string): string {
  const q = QUESTIONS.find(q => q.id === questionId);
  if (!q) return value;
  return q.options.find(o => o.value === value)?.label ?? value;
}

const QUESTION_LABELS: Record<string, string> = {
  goal: "Primary Goal",
  businessType: "Business Type",
  location: "Sign Location",
  illumination: "Night Visibility",
  existing: "Current Signage",
  installation: "Installation",
  stage: "Purchase Stage",
};

/* ─── PDF Generator ──────────────────────────────────────────────────────────── */
function generatePDF(
  answers: Record<string, string>,
  recommendations: string[],
  businessName: string,
  contactName: string,
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageW - margin * 2;

  // ── Colour palette (RGB)
  const forestDark = [20, 45, 30] as [number, number, number];
  const forest = [34, 80, 50] as [number, number, number];
  const sage = [110, 145, 110] as [number, number, number];
  const bone = [248, 244, 235] as [number, number, number];
  const lightGray = [240, 240, 238] as [number, number, number];
  const textDark = [30, 30, 28] as [number, number, number];
  const textMid = [90, 90, 85] as [number, number, number];

  // ── Header banner
  doc.setFillColor(...forestDark);
  doc.rect(0, 0, pageW, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Canadian Wholesale Sign Group", margin, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...(sage as [number, number, number]));
  doc.text("Signage Needs Assessment Report", margin, 24);

  doc.setTextColor(200, 220, 200);
  doc.setFontSize(8);
  const dateStr = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  doc.text(dateStr, pageW - margin, 16, { align: "right" });
  doc.text(`${brand.phone}  |  ${brand.email}`, pageW - margin, 24, { align: "right" });

  // ── Accent bar
  doc.setFillColor(...(sage as [number, number, number]));
  doc.rect(0, 38, pageW, 2.5, "F");

  let y = 50;

  // ── Prepared for block
  if (businessName || contactName) {
    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, y, contentW, 18, 2, 2, "F");
    doc.setTextColor(...textMid);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("PREPARED FOR", margin + 5, y + 6);
    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(businessName || contactName, margin + 5, y + 13);
    if (businessName && contactName) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...textMid);
      doc.text(`Attn: ${contactName}`, margin + 5 + doc.getTextWidth(businessName) + 6, y + 13);
    }
    y += 26;
  }

  // ── Section: Your Answers
  doc.setFillColor(...forest);
  doc.rect(margin, y, contentW, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("YOUR ASSESSMENT ANSWERS", margin + 4, y + 5.5);
  y += 12;

  const answeredQs = QUESTIONS.filter(q => answers[q.id]);
  const colW = contentW / 2 - 3;

  answeredQs.forEach((q, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cellX = margin + col * (colW + 6);
    const cellY = y + row * 18;

    doc.setFillColor(...lightGray);
    doc.roundedRect(cellX, cellY, colW, 15, 1.5, 1.5, "F");

    doc.setTextColor(...textMid);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text((QUESTION_LABELS[q.id] ?? q.id).toUpperCase(), cellX + 4, cellY + 5);

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    const answerLabel = getAnswerLabel(q.id, answers[q.id]);
    const wrapped = doc.splitTextToSize(answerLabel, colW - 8);
    doc.text(wrapped[0], cellX + 4, cellY + 11);
  });

  const rowCount = Math.ceil(answeredQs.length / 2);
  y += rowCount * 18 + 8;

  // ── Section: Recommended Products
  doc.setFillColor(...forest);
  doc.rect(margin, y, contentW, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("RECOMMENDED SIGN TYPES FOR YOUR BUSINESS", margin + 4, y + 5.5);
  y += 12;

  const recommendedProducts = products.filter(p => recommendations.includes(p.slug));

  if (recommendedProducts.length === 0) {
    doc.setTextColor(...textMid);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("No specific recommendations — please contact us for a custom consultation.", margin, y + 6);
    y += 14;
  } else {
    recommendedProducts.forEach((p, idx) => {
      // Check if we need a new page
      if (y + 32 > pageH - 30) {
        doc.addPage();
        y = 20;
      }

      // Card background
      doc.setFillColor(...bone);
      doc.roundedRect(margin, y, contentW, 28, 2, 2, "F");

      // Left accent stripe
      doc.setFillColor(...sage);
      doc.roundedRect(margin, y, 3, 28, 1, 1, "F");

      // Number badge
      doc.setFillColor(...forest);
      doc.circle(margin + 12, y + 8, 5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(String(idx + 1), margin + 12, y + 10.5, { align: "center" });

      // Product title
      doc.setTextColor(...forestDark);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(p.title, margin + 22, y + 9);

      // Blurb
      doc.setTextColor(...textMid);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      const blurbLines = doc.splitTextToSize(p.blurb, contentW - 28);
      doc.text(blurbLines.slice(0, 2), margin + 22, y + 16);

      // URL hint
      doc.setTextColor(...sage);
      doc.setFontSize(7.5);
      doc.text(`canadianwholesalesigns.ca/products/${p.slug}`, margin + 22, y + 24);

      y += 32;
    });
  }

  y += 6;

  // ── Next Steps section
  if (y + 40 > pageH - 30) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(...forest);
  doc.rect(margin, y, contentW, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("NEXT STEPS", margin + 4, y + 5.5);
  y += 12;

  const steps = [
    { num: "1", text: "Review the recommended sign types above and visit the product pages for full specs and examples." },
    { num: "2", text: "Request a quote at canadianwholesalesigns.ca/quote — reference this assessment for faster processing." },
    { num: "3", text: `Call or email our team: ${brand.phone}  |  ${brand.email}` },
  ];

  steps.forEach(s => {
    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, y, contentW, 13, 1.5, 1.5, "F");

    doc.setFillColor(...sage);
    doc.circle(margin + 7, y + 6.5, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(s.num, margin + 7, y + 8.8, { align: "center" });

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const lines = doc.splitTextToSize(s.text, contentW - 18);
    doc.text(lines[0], margin + 15, y + 7.5);
    if (lines[1]) doc.text(lines[1], margin + 15, y + 11.5);

    y += 17;
  });

  // ── Footer on every page
  const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...forestDark);
    doc.rect(0, pageH - 14, pageW, 14, "F");
    doc.setTextColor(...(sage as [number, number, number]));
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(
      `${brand.fullName}  |  ${brand.address}  |  ${brand.phone}  |  ${brand.email}`,
      pageW / 2,
      pageH - 5,
      { align: "center" },
    );
    doc.setTextColor(120, 160, 120);
    doc.text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 5, { align: "right" });
  }

  const safeName = (businessName || contactName || "assessment").replace(/[^a-z0-9]/gi, "-").toLowerCase();
  doc.save(`cmsg-signage-assessment-${safeName}.pdf`);
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function AssessmentPage() {
  const [step, setStep] = useState<"quiz" | "contact" | "done">("quiz");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Contact form state
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [preferredContact, setPreferredContact] = useState("email");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Explore-all toggle
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendAssessment = (trpc.email as any).sendAssessment.useMutation();

  const currentQ = QUESTIONS[questionIndex];
  const totalQ = QUESTIONS.length;
  const progress = ((questionIndex) / totalQ) * 100;

  function selectAnswer(value: string) {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (questionIndex < totalQ - 1) {
      setTimeout(() => setQuestionIndex(questionIndex + 1), 200);
    } else {
      const recs = getRecommendations(newAnswers);
      setRecommendations(recs);
      setTimeout(() => setStep("contact"), 200);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessName || !contactName || !email) {
      setError("Please fill in Business Name, Contact Name, and Email.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await sendAssessment.mutateAsync({
        answers,
        recommendations,
        businessName,
        contactName,
        email,
        phone,
        city,
        preferredContact,
      });
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const recommendedProducts = products.filter(p => recommendations.includes(p.slug));
  const otherProducts = products.filter(p => !recommendations.includes(p.slug));

  // The product currently being previewed in the explore panel
  const activeProduct = activeProductSlug ? products.find(p => p.slug === activeProductSlug) : null;

  /* ── Done screen ── */
  if (step === "done") {
    return (
      <div className="min-h-screen bg-[oklch(0.17_0.06_148)] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[oklch(0.57_0.07_140)] flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-[oklch(0.97_0.012_90)] mb-3">You're all set!</h1>
          <p className="text-[oklch(0.75_0.04_148)] mb-8 leading-relaxed">
            Thank you — we've received your assessment and will be in touch shortly. In the meantime, explore our full product range.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <button className="px-6 py-3 bg-[oklch(0.57_0.07_140)] text-white rounded-lg font-medium hover:bg-[oklch(0.50_0.07_140)] transition-colors">
                View All Products
              </button>
            </Link>
            <Link href="/">
              <button className="px-6 py-3 border border-[oklch(0.40_0.04_148)] text-[oklch(0.75_0.04_148)] rounded-lg font-medium hover:border-[oklch(0.57_0.07_140)] hover:text-white transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Contact + Results screen ── */
  if (step === "contact") {
    return (
      <div className="min-h-screen bg-[oklch(0.17_0.06_148)]">
        {/* Header */}
        <div className="border-b border-[oklch(0.28_0.05_148)] px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-[oklch(0.57_0.07_140)] font-serif text-xl tracking-wide cursor-pointer">CMSG</span>
          </Link>
          <span className="text-[oklch(0.55_0.04_148)] text-sm">Signage Assessment</span>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">

          {/* ── Recommendations ── */}
          {recommendedProducts.length > 0 && (
            <div className="mb-10">
              <p className="text-[oklch(0.57_0.07_140)] text-sm font-medium uppercase tracking-widest mb-2">Based on your answers</p>
              <h2 className="text-2xl font-serif text-[oklch(0.97_0.012_90)] mb-6">We recommend these sign types for you</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.map(p => (
                  <Link key={p.slug} href={`/products/${p.slug}`}>
                    <div className="group flex gap-4 items-center bg-[oklch(0.22_0.06_148)] border border-[oklch(0.30_0.05_148)] rounded-xl p-4 hover:border-[oklch(0.57_0.07_140)] transition-all cursor-pointer">
                      <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[oklch(0.97_0.012_90)] font-medium text-sm leading-snug group-hover:text-[oklch(0.57_0.07_140)] transition-colors">{p.title}</p>
                        <p className="text-[oklch(0.55_0.04_148)] text-xs mt-1 line-clamp-2">{p.blurb}</p>
                      </div>
                      <svg className="w-4 h-4 text-[oklch(0.55_0.04_148)] group-hover:text-[oklch(0.57_0.07_140)] flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Download Report button ── */}
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[oklch(0.20_0.06_148)] border border-[oklch(0.30_0.05_148)] rounded-xl px-5 py-4">
            <div className="flex-1">
              <p className="text-[oklch(0.97_0.012_90)] font-medium text-sm">Download your assessment report</p>
              <p className="text-[oklch(0.55_0.04_148)] text-xs mt-0.5">
                A branded PDF summary of your answers and recommended sign types — ready to share with your team or keep on file.
              </p>
            </div>
            <button
              type="button"
              onClick={() => generatePDF(answers, recommendations, businessName, contactName)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.57_0.07_140)] hover:bg-[oklch(0.50_0.07_140)] text-white text-sm font-medium rounded-lg transition-colors active:scale-[0.98] flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
              </svg>
              Download PDF Report
            </button>
          </div>

          {/* ── Explore All Products ── */}
          <div className="mb-10">
            <button
              type="button"
              onClick={() => {
                setShowAllProducts(!showAllProducts);
                setActiveProductSlug(null);
              }}
              className="w-full flex items-center justify-between bg-[oklch(0.22_0.06_148)] border border-[oklch(0.30_0.05_148)] rounded-xl px-5 py-4 hover:border-[oklch(0.57_0.07_140)] transition-all group"
            >
              <div className="text-left">
                <p className="text-[oklch(0.97_0.012_90)] font-medium text-sm group-hover:text-[oklch(0.57_0.07_140)] transition-colors">
                  Explore all {products.length} sign types
                </p>
                <p className="text-[oklch(0.55_0.04_148)] text-xs mt-0.5">
                  Browse our full catalogue without restarting the assessment
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-[oklch(0.55_0.04_148)] group-hover:text-[oklch(0.57_0.07_140)] transition-all flex-shrink-0 ${showAllProducts ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showAllProducts && (
              <div className="mt-3 border border-[oklch(0.28_0.05_148)] rounded-xl overflow-hidden">
                {/* Section label: Recommended */}
                {recommendedProducts.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-[oklch(0.20_0.06_148)] border-b border-[oklch(0.28_0.05_148)]">
                      <span className="text-[oklch(0.57_0.07_140)] text-xs font-semibold uppercase tracking-widest">
                        ★ Recommended for you
                      </span>
                    </div>
                    {recommendedProducts.map(p => (
                      <ProductRow
                        key={p.slug}
                        product={p}
                        isActive={activeProductSlug === p.slug}
                        isRecommended
                        onToggle={() => setActiveProductSlug(activeProductSlug === p.slug ? null : p.slug)}
                      />
                    ))}
                  </>
                )}

                {/* Section label: Other products */}
                {otherProducts.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-[oklch(0.20_0.06_148)] border-t border-b border-[oklch(0.28_0.05_148)]">
                      <span className="text-[oklch(0.45_0.03_148)] text-xs font-semibold uppercase tracking-widest">
                        Other sign types
                      </span>
                    </div>
                    {otherProducts.map(p => (
                      <ProductRow
                        key={p.slug}
                        product={p}
                        isActive={activeProductSlug === p.slug}
                        isRecommended={false}
                        onToggle={() => setActiveProductSlug(activeProductSlug === p.slug ? null : p.slug)}
                      />
                    ))}
                  </>
                )}

                {/* Expanded product detail panel */}
                {activeProduct && (
                  <div className="border-t border-[oklch(0.28_0.05_148)] bg-[oklch(0.19_0.06_148)] p-5">
                    <div className="flex gap-5 items-start">
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.title}
                        className="w-28 h-28 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[oklch(0.97_0.012_90)] font-semibold text-base mb-1">{activeProduct.title}</p>
                        <p className="text-[oklch(0.65_0.04_148)] text-sm leading-relaxed mb-4">{activeProduct.blurb}</p>
                        <div className="flex gap-3 flex-wrap">
                          <Link href={`/products/${activeProduct.slug}`}>
                            <button className="px-4 py-2 bg-[oklch(0.57_0.07_140)] hover:bg-[oklch(0.50_0.07_140)] text-white text-xs font-medium rounded-lg transition-colors">
                              View Full Details
                            </button>
                          </Link>
                          <Link href={`/quote?product=${activeProduct.slug}`}>
                            <button className="px-4 py-2 border border-[oklch(0.40_0.04_148)] text-[oklch(0.75_0.04_148)] hover:border-[oklch(0.57_0.07_140)] hover:text-white text-xs font-medium rounded-lg transition-colors">
                              Request a Quote
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Contact form ── */}
          <div className="bg-[oklch(0.22_0.06_148)] border border-[oklch(0.30_0.05_148)] rounded-2xl p-8">
            <h3 className="text-xl font-serif text-[oklch(0.97_0.012_90)] mb-1">Get in touch</h3>
            <p className="text-[oklch(0.55_0.04_148)] text-sm mb-6">Fill in your details and we'll reach out with tailored recommendations and pricing.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[oklch(0.65_0.04_148)] mb-1.5 uppercase tracking-wide">Business Name *</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="Acme Signs Ltd."
                    className="w-full bg-[oklch(0.17_0.06_148)] border border-[oklch(0.35_0.05_148)] rounded-lg px-4 py-2.5 text-[oklch(0.97_0.012_90)] placeholder-[oklch(0.40_0.03_148)] focus:outline-none focus:border-[oklch(0.57_0.07_140)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[oklch(0.65_0.04_148)] mb-1.5 uppercase tracking-wide">Contact Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-[oklch(0.17_0.06_148)] border border-[oklch(0.35_0.05_148)] rounded-lg px-4 py-2.5 text-[oklch(0.97_0.012_90)] placeholder-[oklch(0.40_0.03_148)] focus:outline-none focus:border-[oklch(0.57_0.07_140)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[oklch(0.65_0.04_148)] mb-1.5 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@acmesigns.ca"
                    className="w-full bg-[oklch(0.17_0.06_148)] border border-[oklch(0.35_0.05_148)] rounded-lg px-4 py-2.5 text-[oklch(0.97_0.012_90)] placeholder-[oklch(0.40_0.03_148)] focus:outline-none focus:border-[oklch(0.57_0.07_140)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[oklch(0.65_0.04_148)] mb-1.5 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="519-555-0100"
                    className="w-full bg-[oklch(0.17_0.06_148)] border border-[oklch(0.35_0.05_148)] rounded-lg px-4 py-2.5 text-[oklch(0.97_0.012_90)] placeholder-[oklch(0.40_0.03_148)] focus:outline-none focus:border-[oklch(0.57_0.07_140)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[oklch(0.65_0.04_148)] mb-1.5 uppercase tracking-wide">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Toronto, ON"
                    className="w-full bg-[oklch(0.17_0.06_148)] border border-[oklch(0.35_0.05_148)] rounded-lg px-4 py-2.5 text-[oklch(0.97_0.012_90)] placeholder-[oklch(0.40_0.03_148)] focus:outline-none focus:border-[oklch(0.57_0.07_140)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[oklch(0.65_0.04_148)] mb-1.5 uppercase tracking-wide">Preferred Contact</label>
                  <div className="flex gap-3 pt-1">
                    {["email", "phone", "text"].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPreferredContact(m)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize border transition-all ${
                          preferredContact === m
                            ? "bg-[oklch(0.57_0.07_140)] border-[oklch(0.57_0.07_140)] text-white"
                            : "border-[oklch(0.35_0.05_148)] text-[oklch(0.65_0.04_148)] hover:border-[oklch(0.57_0.07_140)]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3 bg-[oklch(0.57_0.07_140)] hover:bg-[oklch(0.50_0.07_140)] disabled:opacity-60 text-white font-medium rounded-lg transition-colors active:scale-[0.98]"
              >
                {submitting ? "Sending…" : "Submit Assessment"}
              </button>
            </form>
          </div>

          {/* Retake link */}
          <p className="text-center mt-6 text-[oklch(0.45_0.03_148)] text-sm">
            <button
              type="button"
              onClick={() => { setStep("quiz"); setQuestionIndex(0); setAnswers({}); setShowAllProducts(false); setActiveProductSlug(null); }}
              className="underline hover:text-[oklch(0.57_0.07_140)] transition-colors"
            >
              Retake the assessment
            </button>
          </p>
        </div>
      </div>
    );
  }

  /* ── Quiz screen ── */
  return (
    <div className="min-h-screen bg-[oklch(0.17_0.06_148)] flex flex-col">
      {/* Header */}
      <div className="border-b border-[oklch(0.28_0.05_148)] px-6 py-4 flex items-center justify-between flex-shrink-0">
        <Link href="/">
          <span className="text-[oklch(0.57_0.07_140)] font-serif text-xl tracking-wide cursor-pointer">CMSG</span>
        </Link>
        <span className="text-[oklch(0.55_0.04_148)] text-sm">
          {questionIndex + 1} of {totalQ}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[oklch(0.28_0.05_148)]">
        <div
          className="h-full bg-[oklch(0.57_0.07_140)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <p className="text-[oklch(0.57_0.07_140)] text-xs font-semibold uppercase tracking-widest mb-3">
            Question {questionIndex + 1}
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif text-[oklch(0.97_0.012_90)] mb-2 leading-snug">
            {currentQ.question}
          </h2>
          {currentQ.hint && (
            <p className="text-[oklch(0.55_0.04_148)] text-sm mb-6">{currentQ.hint}</p>
          )}
          {!currentQ.hint && <div className="mb-6" />}

          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const selected = answers[currentQ.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectAnswer(opt.value)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-150 active:scale-[0.99] ${
                    selected
                      ? "bg-[oklch(0.57_0.07_140)] border-[oklch(0.57_0.07_140)] text-white"
                      : "bg-[oklch(0.22_0.06_148)] border-[oklch(0.30_0.05_148)] text-[oklch(0.85_0.02_148)] hover:border-[oklch(0.57_0.07_140)] hover:text-white"
                  }`}
                >
                  {opt.icon && (
                    <span className="text-xl flex-shrink-0 w-8 text-center">{opt.icon}</span>
                  )}
                  <span className="font-medium text-sm sm:text-base leading-snug">{opt.label}</span>
                  {selected && (
                    <svg className="w-5 h-5 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {questionIndex > 0 && (
            <button
              type="button"
              onClick={() => setQuestionIndex(questionIndex - 1)}
              className="mt-6 text-[oklch(0.45_0.03_148)] text-sm hover:text-[oklch(0.57_0.07_140)] transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── ProductRow sub-component ───────────────────────────────────────────────── */
interface ProductRowProps {
  product: { slug: string; title: string; image: string; blurb: string };
  isActive: boolean;
  isRecommended: boolean;
  onToggle: () => void;
}

function ProductRow({ product, isActive, isRecommended, onToggle }: ProductRowProps) {
  return (
    <div className={`border-b border-[oklch(0.28_0.05_148)] last:border-b-0 transition-colors ${isActive ? "bg-[oklch(0.20_0.06_148)]" : "bg-[oklch(0.22_0.06_148)] hover:bg-[oklch(0.21_0.06_148)]"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-4 py-3 text-left"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium leading-snug ${isActive ? "text-[oklch(0.57_0.07_140)]" : "text-[oklch(0.90_0.02_148)]"}`}>
              {product.title}
            </span>
            {isRecommended && (
              <span className="text-[oklch(0.57_0.07_140)] text-xs">★</span>
            )}
          </div>
          {!isActive && (
            <p className="text-[oklch(0.50_0.03_148)] text-xs mt-0.5 truncate">{product.blurb}</p>
          )}
        </div>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "rotate-180 text-[oklch(0.57_0.07_140)]" : "text-[oklch(0.45_0.03_148)]"}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
