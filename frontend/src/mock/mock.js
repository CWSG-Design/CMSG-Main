// Mock data for CWS (Canadian Wholesale Sign Group)

export const brand = {
  name: "CWS",
  fullName: "Canadian Wholesale Sign Group",
  tagline: "Crafted In Canada For Sign Professionals",
  phone: "1-800-555-0142",
  email: "hello@cwsgroup.ca",
  address: "2840 Industrial Way, Mississauga, ON L4W 1Y3",
};

export const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const values = [
  {
    title: "Craftsmanship",
    description:
      "Every channel letter is shaped, welded, and finished by hands that have spent decades perfecting the trade.",
  },
  {
    title: "Integrity",
    description:
      "We commit, we communicate, we deliver. Honest timelines and transparent pricing — every single project.",
  },
  {
    title: "Expertise",
    description:
      "Dedicated solely to channel letter fabrication, paired with lean manufacturing and automated precision tooling.",
  },
  {
    title: "Partnership",
    description:
      "Your reputation is on the line at every install. We treat your customers as if they were ours.",
  },
];

export const resources = [
  { title: "Guides & Diagrams", description: "Spec sheets, mounting plans, colour charts and step-by-step how-tos." },
  { title: "Product Information", description: "Materials, parameters, and field considerations for every sign type." },
  { title: "Glossary", description: "Definitions for trim caps, returns, raceways and the rest of the trade." },
  { title: "Warranties", description: "Industry-leading 5-year coverage on LEDs, transformers and workmanship." },
  { title: "Videos", description: "Walk-throughs of our shop floor, finishing process, and install tips." },
  { title: "FAQ", description: "Quick answers on lead times, shipping across Canada, and customization." },
  { title: "Blog", description: "News from the shop, industry updates and project case studies." },
];

export const products = [
  {
    slug: "front-lit-channel-letters",
    title: "Front Lit Channel Letters",
    image: "https://picsum.photos/seed/cws-frontlit/900/650",
    blurb: "Classic illuminated faces with crisp daytime and nighttime presence.",
  },
  {
    slug: "trimless-channel-letters",
    title: "Trimless Channel Letters",
    image: "https://picsum.photos/seed/cws-trimless/900/650",
    blurb: "Seamless premium look — no visible trim cap, pure architectural finish.",
  },
  {
    slug: "push-through-faux-neon",
    title: "Push-Through & Faux Neon",
    image: "https://picsum.photos/seed/cws-neon/900/650",
    blurb: "Modern LED neon and acrylic push-throughs that glow like the real thing.",
  },
  {
    slug: "open-face-channel-letters",
    title: "Open Face Channel Letters",
    image: "https://picsum.photos/seed/cws-openface/900/650",
    blurb: "Exposed neon-style LEDs framed in painted aluminum returns.",
  },
  {
    slug: "flat-cut-out-letters",
    title: "Flat Cut Out Letters",
    image: "https://picsum.photos/seed/cws-flatcut/900/650",
    blurb: "Dimensional non-illuminated letters routed from premium materials.",
  },
  {
    slug: "tenant-panels",
    title: "Tenant Panels",
    image: "https://picsum.photos/seed/cws-tenant/900/650",
    blurb: "Durable pylon and monument panels built for harsh Canadian winters.",
  },
  {
    slug: "reverse-lit-channel-letters",
    title: "Reverse Lit Channel Letters",
    image: "https://picsum.photos/seed/cws-reverse/900/650",
    blurb: "Halo-lit elegance that washes light against the wall behind the letter.",
  },
  {
    slug: "front-halo-lit",
    title: "Front / Halo Lit Letters",
    image: "https://picsum.photos/seed/cws-halo/900/650",
    blurb: "Dual illumination — face-lit by day, halo-glow by night.",
  },
  {
    slug: "contour-logos",
    title: "Contour Logos & Logo Boxes",
    image: "https://picsum.photos/seed/cws-contour/900/650",
    blurb: "Custom-shaped illuminated logos and clean modern logo boxes.",
  },
  {
    slug: "in-store-display",
    title: "In-Store Display Signs",
    image: "https://picsum.photos/seed/cws-display/900/650",
    blurb: "Interior signage that brings your brand inside the showroom.",
  },
];

export const gallery = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/cws-gallery-${i + 1}/800/600`,
  alt: `CWS project ${i + 1}`,
}));

export const testimonials = [
  {
    name: "Paul T.",
    location: "Vancouver, BC",
    quote:
      "CWS has been a game-changer for our shop. The trimless letters arrived bang-on spec, packed perfectly, and our clients keep ordering more.",
  },
  {
    name: "Marie L.",
    location: "Montréal, QC",
    quote:
      "Bilingual support, fast turnaround, and finishes you can actually be proud to install. They feel like part of our team.",
  },
  {
    name: "Don R.",
    location: "Calgary, AB",
    quote:
      "Quality, speed and customer service — it allows me to compete and mostly win when up against the locals. Best vendor I work with.",
  },
  {
    name: "Jeff M.",
    location: "Windsor, ON",
    quote:
      "Such high quality from CWS — all we need to do is design, sell, and install. Leave the fabrication to the experts.",
  },
  {
    name: "Korey S.",
    location: "Winnipeg, MB",
    quote:
      "Working with the CWS team was fantastic. They coordinated with our installer directly and made everything easy.",
  },
  {
    name: "Gus P.",
    location: "Halifax, NS",
    quote:
      "A beautiful sign at a fair price. Shipped to the East Coast without a scratch. Thank you.",
  },
  {
    name: "James W.",
    location: "Saskatoon, SK",
    quote:
      "CWS always comes through for us. Great product, fair price, looking forward to many more projects together.",
  },
  {
    name: "Dayna & CMI Team",
    location: "Edmonton, AB",
    quote:
      "We finally installed the sign and we love it — looks even better in person. Always happy with anything we receive from CWS.",
  },
];

export const stats = [
  { value: "25+", label: "Years in business" },
  { value: "10", label: "Provinces served" },
  { value: "10 day", label: "Average lead time" },
  { value: "5 yr", label: "Warranty standard" },
];
