import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Info,
  Library,
  ShieldCheck,
  PlayCircle,
  HelpCircle,
  Rss,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import ShareBar from "@/components/ShareBar";
import { brand } from "@/lib/mock";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const sections = [
  {
    id: "guides",
    icon: BookOpen,
    title: "Guides & Diagrams",
    tagline: "Spec sheets, mounting plans, colour charts and step-by-step how-tos.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-forest mb-3">How to Get a Fast Quotation</h3>
          <p className="text-stone-600 mb-4 leading-relaxed">
            Our objective is to provide you with a clear and accurate quotation as quickly as
            possible. To speed up the process, please include the following in your artwork or
            email:
          </p>
          <ul className="space-y-2 text-stone-600">
            {[
              "Name of sign (sign text)",
              "Letter size in inches and font/letter style",
              "Logo box dimensions — height and width (if applicable)",
              "Face, return and trim cap colour (see colour charts below)",
              "Mounting method — flush mount, stand-offs, raceway, or wireway",
              "Illuminated or non-illuminated",
              "Whether UL labels are required",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-sage shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-4 bg-cream rounded-xl border border-stone-200 text-sm text-stone-600">
            <strong className="text-forest">Tip:</strong> Send a vector file (.ai, .eps, .pdf) for
            the fastest and most accurate quotation. Email artwork to{" "}
            <a href={`mailto:${brand.email}`} className="text-sage font-medium hover:underline">
              {brand.email}
            </a>
            .
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Minimum Specifications</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Minimum letter height", value: "6\" (5–6\" with 1.5\" min stroke)" },
              { label: "Minimum stroke width", value: "1.5\" (applies to serifs too)" },
              { label: "Returns for letters ≤ 10\"", value: "3\" returns (may require paint charge)" },
              { label: "Large letters (> 48\" tall)", value: "Impact-resistant acrylic face required" },
              { label: "Max logo box (standard acrylic)", value: "4' × 8' without seaming" },
              { label: "Max logo box (impact acrylic)", value: "5' × 10' without seaming" },
            ].map((row) => (
              <div key={row.label} className="bg-white rounded-lg border border-stone-200 p-4">
                <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">{row.label}</div>
                <div className="font-semibold text-forest">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Sign & Letter Type Options</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Front Lit",
              "Reverse / Halo Back Lit",
              "Front & Halo Combination Lit",
              "Trimless Channel Letters",
              "Faux Neon",
              "Push Through",
              "Logo Boxes",
              "Open Face Letters",
              "Flat Cut Out (FCO) Acrylic",
              "Tenant Panels",
              "3D Printed Illuminated",
              "Pylon & Ground Signs",
              "Fascia & Storefront",
              "Interior & Hanging Signs",
            ].map((type) => (
              <span
                key={type}
                className="px-3 py-1.5 bg-cream border border-stone-200 rounded-full text-sm text-forest font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Colour Charts</h3>
          <p className="text-stone-600 mb-4 leading-relaxed">
            Colour charts are available for acrylic faces, returns, trim caps, and vinyl. Colours
            shown on screen are for reference only — always verify using physical samples or
            manufacturer standards.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Acrylic / Return / Trim Cap", note: "Translucent plastic for letter faces" },
              { label: "Vinyl", note: "Applied to acrylic or aluminium surfaces" },
              { label: "Custom Paint", note: "Matthews Paint System — matches Pantone, Benjamin Moore, Sherwin Williams" },
            ].map((chart) => (
              <div key={chart.label} className="bg-white rounded-xl border border-stone-200 p-4">
                <div className="font-semibold text-forest text-sm mb-1">{chart.label}</div>
                <div className="text-xs text-stone-500">{chart.note}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-3">
            Contact us to request physical colour samples for your project.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "product-info",
    icon: Info,
    title: "Product Information",
    tagline: "Materials, parameters, and field considerations for every sign type.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Materials We Use</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { material: "Aluminium", use: "Returns, backs, and raceways — all channel letter structural components" },
              { material: "Acrylic", use: "Letter faces — standard and impact-resistant grades available" },
              { material: "LED Modules", use: "Primary illumination — energy-efficient, durable, UL-listed" },
              { material: "Power Supplies", use: "Step-down transformers, 12V DC output, UL 48 compliant" },
              { material: "Trim Cap", use: "Flexible plastic edging chemically welded to the letter face" },
              { material: "Custom Paint", use: "Matthews Paint System for precise colour matching" },
            ].map((row) => (
              <div key={row.material} className="bg-white rounded-xl border border-stone-200 p-4">
                <div className="font-bold text-forest text-sm mb-1">{row.material}</div>
                <div className="text-sm text-stone-500">{row.use}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">LED Illumination</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            All CWS channel letter products use LED illumination. LED offers significant advantages
            over legacy neon: it is more durable for shipping, easier to install, lighter in weight,
            and substantially more energy-efficient. We supply letter cans only if you wish to
            install your own neon, but we do not produce neon in-house.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Energy Savings", value: "Up to 75% vs. neon" },
              { label: "Lifespan", value: "50,000+ hours typical" },
              { label: "Warranty", value: "5-year LED coverage" },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream rounded-xl border border-stone-200 p-4 text-center">
                <div className="text-xl font-bold text-forest">{stat.value}</div>
                <div className="text-xs text-stone-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Power Supplies (Transformers)</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            A power supply changes the incoming electricity voltage to the level required by the
            sign's illumination. LED channel letters use a <strong>step-down transformer</strong>{" "}
            (12V DC output, UL 48 compliant). Each secondary circuit has a dedicated transformer
            colour-coded on the transformer breakdown sheet included with your order.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Step-Down (LED)", desc: "Decreases voltage — standard for all LED channel letters" },
              { label: "Step-Up (Neon)", desc: "Increases voltage — used only with neon illumination" },
            ].map((t) => (
              <div key={t.label} className="bg-white rounded-xl border border-stone-200 p-4">
                <div className="font-semibold text-forest text-sm mb-1">{t.label}</div>
                <div className="text-sm text-stone-500">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">LED Letter Installation Overview</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            All CWS signs are shipped with the assumption they will be installed in accordance with
            applicable electrical codes (including proper grounding and bonding). Each letter set
            includes a wiring diagram and transformer breakdown sheet.
          </p>
          <ol className="space-y-3 text-stone-600">
            {[
              "Unroll the enclosed paper pattern, attach to the wall, ensure it is centred and level. Drill mounting and whip holes, then remove the guide.",
              "Mount letters using the template. If no rivet nuts: remove faces, push secondary low-voltage whips through the substrate, mount letters, replace faces.",
              "If rivet nuts are present: install threaded rod, thread whips through substrate (in metal conduit), and secure from the back.",
              "Splice secondary conductors in parallel — connect all positive (red/white), negative (black), and ground (bare) leads per circuit using UL-approved wire nuts or crimp connectors.",
              "Mount the transformer box open-side-up, centred on the circuit it powers, at the same height as the letter set.",
              "Connect secondary leads to the transformer per manufacturer instructions. Connect primary supply. Install an On/Off switch on the primary hot lead within line-of-sight of transformers.",
              "Signs must not be connected to a branch circuit exceeding 30 amperes.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-sage/20 text-sage text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: "glossary",
    icon: Library,
    title: "Glossary",
    tagline: "Definitions for trim caps, returns, raceways and the rest of the trade.",
    content: (
      <div className="space-y-4">
        <p className="text-stone-600 leading-relaxed">
          New to channel letter signage? Here are the most common terms you'll encounter when
          specifying, ordering, or installing a sign.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              term: "Return",
              def: "The side wall of a channel letter. Typically constructed of aluminium, ranging from 3\" to 8\" deep.",
            },
            {
              term: "Trim Cap",
              def: "The flexible plastic edging that surrounds a channel letter's face. Chemically welded to the face and available in a variety of colours.",
            },
            {
              term: "Raceway",
              def: "An optional rectangular aluminium structure on which channel letters are pre-mounted. Simplifies field installation — letters are installed on the raceway in the shop, then the raceway is mounted to the building.",
            },
            {
              term: "Wireway",
              def: "Similar to a raceway but slimmer in profile. Used to conceal wiring while providing a mounting surface for channel letters.",
            },
            {
              term: "LED",
              def: "Light Emitting Diode — the standard illumination source for modern channel letters. Energy-efficient, durable, and available in a wide range of colours.",
            },
            {
              term: "Transformer / Power Supply",
              def: "A device that changes incoming voltage to the level required by the sign's illumination. LED letters use a step-down transformer (typically 12V DC output).",
            },
            {
              term: "Stroke",
              def: "The outline width of a font. The greater the stroke weight, the thicker the letter. Minimum stroke for LED illumination is 1.5\".",
            },
            {
              term: "Drain Holes",
              def: "Small holes placed at the bottom of a channel letter's return to prevent water accumulation inside the letter.",
            },
            {
              term: "Polycarbonate Back",
              def: "A protective plastic piece cut to the shape of a reverse channel letter, sealed to the back to prevent rainwater entry and animal nesting.",
            },
            {
              term: "UL-Approved",
              def: "Underwriter's Laboratories certification. UL approval means all sign components meet UL standards for electrical safety.",
            },
            {
              term: "Permit",
              def: "A legal document required by a city or municipality that allows installation of a specific sign at a designated location. Must be obtained before installation.",
            },
            {
              term: "FCO (Flat Cut Out)",
              def: "Flat cut-out acrylic or aluminium letters without returns or illumination. A cost-effective option for interior or low-profile exterior applications.",
            },
            {
              term: "Faux Neon",
              def: "LED-based signage designed to mimic the look of traditional neon tubing. Achieves the neon aesthetic at lower cost and with greater durability.",
            },
            {
              term: "Trimless Channel Letters",
              def: "Channel letters without a visible trim cap. The face is flush with the return, creating a clean, modern look.",
            },
            {
              term: "Halo Lit (Reverse Lit)",
              def: "Channel letters where the illumination source faces the wall, creating a glowing halo effect around each letter rather than illuminating the face.",
            },
            {
              term: "Contour / Logo Box",
              def: "An illuminated cabinet cut to the outline of a logo or graphic, rather than individual letters. Available in standard and contour (cloud) shapes.",
            },
          ].map((entry) => (
            <div key={entry.term} className="bg-white rounded-xl border border-stone-200 p-4">
              <div className="font-bold text-forest text-sm mb-1">{entry.term}</div>
              <div className="text-sm text-stone-500 leading-relaxed">{entry.def}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "warranties",
    icon: ShieldCheck,
    title: "Warranties",
    tagline: "Industry-leading 5-year coverage on LEDs, transformers and workmanship.",
    content: (
      <div className="space-y-8">
        <div className="bg-forest text-bone rounded-2xl p-6">
          <div className="text-xs uppercase tracking-widest text-sage font-semibold mb-2">Coverage Summary</div>
          <h3 className="text-2xl font-bold mb-4">5-Year Material & Components Warranty</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Material & Components", value: "5 Years" },
              { label: "Limited Labour", value: "1 Year" },
              { label: "Warranty Part Turnaround", value: "3–4 Business Days" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-sage">{item.value}</div>
                <div className="text-sm text-bone/70 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">What's Covered (5-Year)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Trim Caps",
              "Acrylic Faces",
              "Vinyl & Digital Prints",
              "Aluminium Backs & Returns",
              "LED Lighting",
              "Raceways & Wireways",
              "Painted Materials",
              "Secondary Low Voltage Wiring",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 p-3">
                <ShieldCheck className="h-4 w-4 text-sage shrink-0" />
                <span className="text-sm text-forest font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Additional Warranty Details</h3>
          <ul className="space-y-3 text-stone-600 text-sm">
            {[
              "Trimless Letters, Push Through Letters and Panels, and FCOs carry a 1-year limited warranty.",
              "Limited Labour (1 year only) is included if CWS is determined to be at fault for manufacturing defects, at $65.00/man-hour per CWS parameters.",
              "Power Supplies carry a 5-year parts-only manufacturing warranty from the manufacturer. Defective units must be returned to CWS to process the manufacturer's claim.",
              "Free standard shipping on all warranty replacements to customer or installer. Expedited shipping is available at additional cost.",
              "No hassle freight damage claims — CWS handles all claims on your behalf.",
              "Dedicated warranty claim specialist assigned to your account.",
            ].map((note) => (
              <li key={note} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-sage shrink-0 mt-0.5" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="font-semibold text-amber-800 mb-2">Important — Receiving Your Order</div>
          <p className="text-sm text-amber-700 leading-relaxed">
            Once a shipment is signed for, the customer has <strong>24 hours</strong> to verify that
            the sign is correctly manufactured and illuminated properly before installation. Please
            inspect all items immediately upon delivery.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-3">Damaged Crate Procedure</h3>
          <ol className="space-y-2 text-stone-600 text-sm">
            {[
              "Sign the Bill of Lading (BOL) as \"damaged\".",
              "Photograph the crate and the damaged product, and retain a copy of the BOL.",
              "Accept all products regardless of visible damage.",
              "Email photos of damaged signs and crates to us before any repairs or costs are approved.",
              "A dedicated Warranty Representative will contact you immediately.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-forest text-bone text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-bone rounded-lg text-sm font-medium hover:bg-forest/90 transition-colors"
            >
              Call {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cream border border-stone-200 text-forest rounded-lg text-sm font-medium hover:border-forest transition-colors"
            >
              Email {brand.email}
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "videos",
    icon: PlayCircle,
    title: "Videos",
    tagline: "Walk-throughs of our shop floor, finishing process, and install tips.",
    content: (
      <div className="space-y-6">
        <p className="text-stone-600 leading-relaxed">
          The following installation and product videos are provided as a reference resource for
          sign shops and installers. Additional CWS-specific videos are in production — check back
          for updates.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "How to Wire LED Channel Letters",
              desc: "Step-by-step wiring guide for LED channel letter sets — parallel connections, colour-coded circuits, and transformer hookup.",
            },
            {
              title: "Raceway & Wireway Mounting",
              desc: "Correct method for mounting pre-assembled channel letters on a raceway or wireway, including template alignment and hardware.",
            },
            {
              title: "Shop Floor Tour",
              desc: "A walk-through of the CWS fabrication floor — CNC routing, automated bending, LED installation, and quality inspection.",
            },
            {
              title: "Project Showcase: Bone & Biscuit Co.",
              desc: "Behind-the-scenes look at the fabrication and installation of illuminated channel letters for a national retail brand.",
            },
          ].map((video) => (
            <div
              key={video.title}
              className="bg-white rounded-2xl border border-stone-200 border-dashed overflow-hidden"
            >
              <div className="bg-stone-50 h-36 flex flex-col items-center justify-center gap-2">
                <PlayCircle className="h-10 w-10 text-stone-300" />
                <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">Video Coming Soon</span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-forest text-sm leading-snug mb-2">{video.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-cream border border-stone-200 rounded-xl p-5 text-center">
          <p className="text-stone-600 text-sm mb-3">
            Have a specific installation or product question? Our team is available by phone or email.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-bone rounded-lg text-sm font-medium hover:bg-forest/90 transition-colors"
            >
              Call {brand.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-forest rounded-lg text-sm font-medium hover:border-forest transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    tagline: "Quick answers on lead times, shipping across Canada, and customization.",
    content: (
      <div className="space-y-4">
        {[
          {
            q: "What types of channel letters can you produce?",
            a: "We produce standard and custom front lit, reverse (halo lit), front/halo combination lit, trimless, logo boxes, open face, push throughs, faux neon, flat cut-out (FCO) acrylic letters, tenant panels, 3D printed illuminated signs, pylon and ground signs, fascia and storefront signs, and interior/hanging signs. All types can be built illuminated or non-illuminated.",
          },
          {
            q: "What is your turnaround time?",
            a: "Once we have received all final approved paperwork — including colours and complete sign information — we can typically build and ship within 10 business days. Standard and premium rush options are available. Contact your CWS representative for current lead times.",
          },
          {
            q: "How long does it take to receive a quotation?",
            a: "We can typically return an estimate within 2–3 business hours of receiving your completed quotation information. We will contact you if we have any additional questions.",
          },
          {
            q: "What materials do you use?",
            a: "We use aluminium exclusively for returns, backs, and raceways. Acrylic is used for letter faces. We also offer custom painting (Matthews Paint System), vinyl application, and digital prints.",
          },
          {
            q: "Can you match a custom or unusual colour?",
            a: "Yes. We use the Matthews Paint System, which allows us to match almost any colour — including Pantone, Benjamin Moore, and Sherwin-Williams references.",
          },
          {
            q: "What brand of LEDs do you use?",
            a: "Our primary LED brand is Principal LED. If a specific brand is required for your project, we can source it upon request.",
          },
          {
            q: "How long is the warranty?",
            a: "5 years for sign materials and components (trim caps, acrylic faces, vinyl, aluminium backs and returns, LED lighting, raceways, painted materials, and secondary wiring). Trimless letters, push-throughs, and FCOs carry a 1-year limited warranty. Labour warranty is 1 year where CWS is at fault.",
          },
          {
            q: "Do you ship across Canada?",
            a: "Yes — we ship to all 10 provinces and 3 territories. Our Guelph, Ontario facility is centrally located for efficient coast-to-coast delivery. See our Shipping page for rate details.",
          },
          {
            q: "Do you ship to the United States?",
            a: "Yes. We ship to all US states including Alaska and Hawaii. Contact us for cross-border shipping rates and lead times.",
          },
          {
            q: "Do you manufacture logo boxes?",
            a: "Yes. We produce both contour/cloud logo boxes and standard logo boxes.",
          },
          {
            q: "Do you offer large-format digital printing?",
            a: "Yes, we can handle large-format digital printing. Please contact us for a quote.",
          },
          {
            q: "What is the minimum letter height?",
            a: "The minimum letter height for production is 6\". Any letter smaller than 8\" tall may have channels too small for standard LED illumination — we will adjust the font and submit alterations for your approval before production.",
          },
        ].map((item, i) => (
          <FAQItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    ),
  },
  {
    id: "blog",
    icon: Rss,
    title: "Blog",
    tagline: "News from the shop, industry updates and project case studies.",
    content: (
      <div className="space-y-6">
        <p className="text-stone-600 leading-relaxed">
          The CWS blog is coming soon — we'll be sharing project case studies, industry tips, and
          manufacturing updates. In the meantime, here are some topics we'll be covering:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              category: "Product Deep-Dives",
              topics: [
                "Front Lit vs. Halo Lit — when to recommend each",
                "Trimless channel letters: the clean-edge advantage",
                "3D printed illuminated signs: what's possible in 2025",
                "Faux neon vs. real neon: cost, durability, and aesthetics",
              ],
            },
            {
              category: "Sales & Specification",
              topics: [
                "How to spec a channel letter sign in 5 minutes",
                "Common quoting mistakes and how to avoid them",
                "Selling premium signage to budget-conscious clients",
                "Understanding permit requirements across Canadian provinces",
              ],
            },
            {
              category: "Installation Tips",
              topics: [
                "Raceway vs. flush mount — pros and cons",
                "Wiring best practices for LED channel letters",
                "How to handle large-format letters in the field",
                "Inspecting a sign delivery — what to check first",
              ],
            },
            {
              category: "Project Showcases",
              topics: [
                "Bone & Biscuit Co. — illuminated storefront rebrand",
                "Mountain Warehouse — mall channel letter installation",
                "Longo's — large-format pylon and storefront signage",
                "Smurfit Westrock — industrial raceway-mounted letters",
              ],
            },
          ].map((section) => (
            <div key={section.category} className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="text-xs uppercase tracking-widest text-sage font-semibold mb-3">
                {section.category}
              </div>
              <ul className="space-y-2">
                {section.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-stone-600">
                    <ArrowRight className="h-3.5 w-3.5 text-stone-300 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-forest text-bone rounded-2xl p-6 text-center">
          <div className="text-lg font-bold mb-2">Stay in the Loop</div>
          <p className="text-bone/70 text-sm mb-4">
            Be the first to know when new articles and project showcases are published.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage text-forest rounded-lg text-sm font-semibold hover:bg-sage/90 transition-colors"
          >
            Contact Us to Subscribe
          </Link>
        </div>
      </div>
    ),
  },
];

/* ─── FAQ accordion item ─────────────────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-cream/50 transition-colors"
      >
        <span className="font-semibold text-forest text-sm leading-snug">{question}</span>
        <ChevronDown
          className={`h-4 w-4 text-stone-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
          <div className="pt-4">{answer}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Section accordion card ─────────────────────────────────────────────── */

function ResourceCard({
  section,
  isOpen,
  onToggle,
}: {
  section: (typeof sections)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;
  return (
    <div
      id={section.id}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-forest shadow-lg" : "border-stone-200 bg-white hover:border-stone-300"
      }`}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 p-6 text-left transition-colors ${
          isOpen ? "bg-forest text-bone" : "bg-white hover:bg-cream/50"
        }`}
      >
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? "bg-white/15" : "bg-cream"
          }`}
        >
          <Icon className={`h-5 w-5 ${isOpen ? "text-sage" : "text-forest"}`} />
        </div>
        <div className="flex-1">
          <div className={`font-bold text-lg leading-tight ${isOpen ? "text-bone" : "text-forest"}`}>
            {section.title}
          </div>
          <div className={`text-sm mt-0.5 ${isOpen ? "text-bone/70" : "text-stone-500"}`}>
            {section.tagline}
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-bone/70" : "text-stone-400"
          }`}
        />
      </button>

      {/* Body — expanded content */}
      {isOpen && (
        <div className="p-6 bg-bone/30 border-t border-forest/20">
          {section.content}
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ResourcesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="py-20 bg-forest text-bone">
        <div className="max-w-4xl mx-auto px-6 lg:px-6 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">
            Resources
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">
            You have questions.{" "}
            <span className="italic text-sage">We have answers.</span>
          </h1>
          <p className="text-bone/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Specs, install guides, warranties and the deep technical knowledge to help you sell,
            design and install with confidence.
          </p>
          <div className="mt-8 flex justify-center">
            <ShareBar
              variant="full"
              title="Resources — Canadian Wholesale Sign Group"
              description="Specs, install guides, warranties, glossary, FAQ and more. Everything you need to sell, design and install CWS signage with confidence."
              className="[&_span]:text-bone/60 [&_a]:border-bone/30 [&_a]:text-bone/70 [&_a:hover]:bg-sage [&_a:hover]:text-forest [&_button]:border-bone/30 [&_button]:text-bone/70 [&_button:hover]:bg-sage [&_button:hover]:text-forest"
            />
          </div>
        </div>
      </section>

      {/* Quick-jump nav */}
      <div className="sticky top-[65px] z-40 bg-cream/95 backdrop-blur border-b border-stone-200">
        <div className="w-full px-6 lg:px-10 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setOpenId(s.id);
                  setTimeout(() => {
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  openId === s.id
                    ? "bg-forest text-bone"
                    : "bg-white border border-stone-200 text-forest hover:border-forest"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion sections */}
      <div className="w-full px-6 lg:px-10 py-12 space-y-4">
        {sections.map((s) => (
          <ResourceCard
            key={s.id}
            section={s}
            isOpen={openId === s.id}
            onToggle={() => toggle(s.id)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-forest py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-bone font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-bone/70 mb-8">
            Our team is available by phone or email — we typically respond to quote requests within
            2–3 business hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/quote"
              className="px-6 py-3 bg-sage text-forest font-semibold rounded-xl hover:bg-sage/90 transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 text-bone font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
