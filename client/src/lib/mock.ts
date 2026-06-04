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
  { label: "Products", href: "/#products" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Shipping", href: "/shipping" },
  { label: "Installation", href: "/installation" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact", href: "/contact" },
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
    name: "Tyler M.",
    location: "Toronto, ON",
    quote:
      "CWS has been our go-to for channel letters for three years. The quality is consistent, the lead times are real, and the team is easy to work with.",
  },
  {
    name: "Sandra L.",
    location: "Vancouver, BC",
    quote:
      "We've tried other wholesalers — nobody ships as cleanly or communicates as well as CWS. The crating alone is worth the price.",
  },
  {
    name: "Mike R.",
    location: "Calgary, AB",
    quote:
      "Trimless letters arrived perfect. Our client was blown away. We'll be back for every project that calls for channel letters.",
  },
  {
    name: "Priya K.",
    location: "Mississauga, ON",
    quote:
      "The 10-day lead time is real. We quoted a tight deadline and CWS delivered with two days to spare. Incredible.",
  },
  {
    name: "Luc B.",
    location: "Montréal, QC",
    quote:
      "Excellent communication from artwork approval to delivery. CWS coordinated with our installer directly and made everything easy.",
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

export const shipping = {
  intro:
    "From our facility just outside Toronto, we ship coast-to-coast across all 10 provinces and 3 territories — plus the U.S. Lower 48. One flat all-inclusive rate, peanut-free packaging, enclosed carriers.",
  highlights: [
    {
      title: "Coast-to-Coast Coverage",
      description:
        "Our central Ontario location lets us ship simply to every Canadian province and territory, with options to send into the U.S. Lower 48, Alaska and Hawaii.",
    },
    {
      title: "All-Inclusive Rates",
      description:
        "Every province in Canada ships at one flat rate — no surprise fuel surcharges, no remote-area fees, no brokerage drama.",
    },
    {
      title: "Built for the Road",
      description:
        "Signs ride in enclosed crates, fastened to the crate bottom — no stick frames, no peanuts, no rattle. Peanut-free, eco-conscious packaging.",
    },
    {
      title: "Green Manufacturing",
      description:
        "We continue to pursue sustainable initiatives in our shop and crate yard. We're dedicated to protecting the environment we ship across.",
    },
  ],
  transit: [
    { region: "Ontario / Quebec", days: "1–2 business days" },
    { region: "Maritimes (NB / NS / PE / NL)", days: "3–5 business days" },
    { region: "Manitoba / Saskatchewan", days: "2–3 business days" },
    { region: "Alberta / BC", days: "3–4 business days" },
    { region: "Yukon / NWT / Nunavut", days: "5–10 business days" },
    { region: "U.S. Lower 48", days: "3–6 business days" },
  ],
};

export const installation = {
  intro:
    "All CWS signs are shipped with the assumption they will be installed in accordance with the Canadian Electrical Code (CSA C22.1, Section 34) and all applicable local codes — including proper grounding and bonding.",
  videos: [
    { label: "How to wire RGB LED channel letters", url: "https://www.youtube.com/watch?v=17bO-58Mw-A" },
    { label: "Channel letters raceway & wireway mounting", url: "https://www.youtube.com/watch?v=DR_Si0jMuSs" },
  ],
  steps: [
    {
      title: "Reference the assembly drawing",
      detail: "Every letter set includes a drawing detailing the arrangement of the subassemblies — review before unpacking on-site.",
    },
    {
      title: "Position the paper template",
      detail:
        "Unroll the enclosed paper pattern and attach to the wall, ensuring it is centered and level. Drill holes for secondary low-voltage whips and mounting points, then remove the guide.",
    },
    {
      title: "Mount the letters",
      detail:
        "If the set has no rivet nuts, remove the faces to push secondary low-voltage whips through the substrate, mount the letters, and replace the faces. If rivet nuts are present, install threaded rod, thread whips (in metal conduit) through the substrate and secure from behind.",
    },
    {
      title: "Splice the secondary conductors",
      detail:
        "Each secondary circuit has a dedicated transformer, colour-coded on the breakdown sheet. Crimp positive (red/white) leads together in parallel using CSA-approved connectors. Repeat for negative (black) leads, then ground (bare).",
    },
    {
      title: "Mount the transformer / driver",
      detail:
        "No transformer box is required when a Sloan damp-location rated driver is supplied. Otherwise, mount the box OPEN SIDE UP as close as possible to circuit center, at the same height as the letter set to minimize whip length.",
    },
    {
      title: "Wire the primary supply",
      detail:
        "Connect the three secondary leads (positive, negative, ground) to the transformer per manufacturer instructions, then connect the primary supply. Repeat for each transformer circuit.",
    },
    {
      title: "Install an On/Off switch",
      detail:
        "You must install at least one On/Off switch, rated for the application, on the primary 'hot' lead within line of sight of the transformers. Signs cannot be connected to a branch circuit exceeding 30 amperes.",
    },
  ],
};

export const stats = [
  { value: "25+", label: "Years in business" },
  { value: "10", label: "Provinces served" },
  { value: "10 day", label: "Average lead time" },
  { value: "5 yr", label: "Warranty standard" },
];

export const PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
];
