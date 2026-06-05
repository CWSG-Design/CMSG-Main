import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { products } from "@/lib/mock";

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

  // Exterior channel letters — primary exterior illuminated recommendation
  if (isExterior && needsLight && goal !== "direct") {
    slugs.push("front-lit-channel-letters");
  }

  // Halo letters — boutique / office / professional exterior
  if (isExterior && needsLight && ["office", "medical", "property"].includes(businessType)) {
    slugs.push("halo-illuminated-channel-letters");
  }

  // Pylon / ground sign — standalone building or busy roadway
  if (["standalone", "downtown"].includes(location) && goal === "attract") {
    slugs.push("pylon-ground-signs");
  }

  // Fascia / storefront sign — storefront or plaza
  if (["storefront", "downtown"].includes(location)) {
    slugs.push("fascia-storefront-signs");
  }

  // Acrylic push-through — retail / restaurant exterior cabinet
  if (isExterior && isRetailFood && needsLight) {
    slugs.push("push-through-faux-neon");
  }

  // Tenant panels — property management / multi-tenant
  if (isProperty || location === "storefront") {
    slugs.push("tenant-panels");
  }

  // Interior channel letters — interior locations
  if (isInterior && needsLight) {
    slugs.push("trimless-channel-letters");
  }

  // Interior hanging signs — retail interior / directing
  if ((isInterior || goal === "direct") && isRetailFood) {
    slugs.push("interior-hanging-signs");
  }

  // 3D printed signs — specialty / boutique / modern look
  if (["retail", "restaurant", "office"].includes(businessType) && needsLight) {
    slugs.push("3d-printed-signs");
  }

  // Flat cut-out letters — no illumination needed, architectural
  if (!needsLight || illumination === ("no" as string)) {
    slugs.push("flat-cut-out-letters");
  }

  // Channel letters on raceways — multi-unit rollout / franchise
  if (isExterior && goal === "identify") {
    slugs.push("channel-letters-on-raceways");
  }

  // Open face — retro / restaurant / entertainment
  if (["restaurant", "retail"].includes(businessType) && needsLight) {
    slugs.push("open-face-channel-letters");
  }

  // Window signs — storefront / event
  if (["storefront", "event"].includes(location) || isEvent) {
    slugs.push("illuminated-hanging-window-signs");
  }

  // Vertical supports — standalone building
  if (location === "standalone" && needsLight) {
    slugs.push("front-lit-vertical-supports");
  }

  // Deduplicate and cap at 4
  const unique = Array.from(new Set(slugs));
  return unique.slice(0, 4);
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
      // Last question answered — compute recommendations
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
          {/* Recommendations */}
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

          {/* Contact form */}
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
              onClick={() => { setStep("quiz"); setQuestionIndex(0); setAnswers({}); }}
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
          {/* Step label */}
          <p className="text-[oklch(0.57_0.07_140)] text-xs font-semibold uppercase tracking-widest mb-3">
            Question {questionIndex + 1}
          </p>

          {/* Question text */}
          <h2 className="text-2xl sm:text-3xl font-serif text-[oklch(0.97_0.012_90)] mb-2 leading-snug">
            {currentQ.question}
          </h2>
          {currentQ.hint && (
            <p className="text-[oklch(0.55_0.04_148)] text-sm mb-6">{currentQ.hint}</p>
          )}
          {!currentQ.hint && <div className="mb-6" />}

          {/* Options */}
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

          {/* Back button */}
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
