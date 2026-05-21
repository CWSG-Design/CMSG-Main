import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  MapPinned,
  Megaphone,
  Building2,
} from "lucide-react";
import { brand } from "../mock/mock";

const PROVINCES = [
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

const PERKS = [
  {
    Icon: Users,
    title: "Get referrals",
    body: "We point CWS clients in your direction whenever they need an installer near their job site.",
  },
  {
    Icon: MapPinned,
    title: "Grow your reach",
    body: "Get listed in our public Installer Directory, searchable by city, province and capability.",
  },
  {
    Icon: Megaphone,
    title: "Free to join",
    body: "No fees, no contracts. Just trade-only sign installers helping each other look good on the wall.",
  },
];

export default function InstallerSignUpPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    website: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    line2: "",
    city: "",
    province: "",
    postal: "",
    capabilities: "",
    equipment: "",
    areas: "",
    travel: "",
  });

  const u = (k, v) => setForm({ ...form, [k]: v });

  const onSubmit = (e) => {
    e.preventDefault();
    const required = ["company", "firstName", "lastName", "email", "phone", "street", "city", "province", "postal"];
    const missing = required.filter((k) => !form[k]);
    if (missing.length) {
      toast({ title: "Missing info", description: `Please fill: ${missing.join(", ")}` });
      return;
    }
    const list = JSON.parse(localStorage.getItem("cws_installers") || "[]");
    list.push({ ...form, ts: Date.now() });
    localStorage.setItem("cws_installers", JSON.stringify(list));
    setSubmitted(true);
    toast({ title: "Application received", description: "We'll review your details and add you to the directory shortly." });
  };

  if (submitted) {
    return (
      <main className="bg-cream min-h-screen">
        <Header />
        <section className="max-w-3xl mx-auto px-6 py-24 lg:py-32 text-center">
          <CheckCircle2 className="h-16 w-16 text-sage mx-auto" />
          <h1 className="font-serif text-4xl md:text-5xl text-forest mt-6">
            Welcome to the <span className="italic text-sage">CWS Installer Directory</span>.
          </h1>
          <p className="mt-5 text-stone-700 leading-relaxed">
            Thanks {form.firstName} \u2014 we&apos;ve received your application for <strong>{form.company}</strong>. Our team will review and reach out within 2 business days.
          </p>
          <div className="mt-9 flex gap-3 justify-center flex-wrap">
            <Link to="/"><Button className="bg-forest hover:bg-forest-dark text-bone rounded-full px-7">Back to home</Button></Link>
            <Link to="/installation"><Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-bone rounded-full px-7">View install guide</Button></Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
          <div className="absolute top-10 -right-32 h-[420px] w-[420px] rounded-full bg-sage/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-forest mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Trade Network</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest leading-[1.04] max-w-4xl">
            Installer <span className="italic text-sage">sign-up</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-stone-700 leading-relaxed text-lg">
            Do you provide sign installation services \u2014 interior, exterior, or both? Add your company to the {brand.name} <strong>Installer Directory</strong> and start receiving referrals from sign shops and brokers in your area.
          </p>
          <div className="mt-7 inline-flex items-start gap-3 bg-sage/15 border border-sage/30 rounded-xl p-4 max-w-2xl">
            <Building2 className="h-5 w-5 text-forest shrink-0 mt-0.5" />
            <p className="text-sm text-forest leading-relaxed">
              At this time the {brand.name} directory only showcases installers operating in <strong>Canada</strong>. U.S. partners welcome to join our waitlist.
            </p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-5">
            {PERKS.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-stone-200 hover:border-sage hover:shadow-lg transition-all">
                <div className="h-11 w-11 rounded-xl bg-forest text-bone flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-forest">{title}</h3>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <form onSubmit={onSubmit} className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 space-y-10">
            {/* Company */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full bg-forest text-bone flex items-center justify-center font-serif text-sm">1</span>
                <h2 className="font-serif text-2xl text-forest">Company details</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="company">Company name *</Label>
                  <Input id="company" value={form.company} onChange={(e) => u("company", e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="website">Company website</Label>
                  <Input id="website" value={form.website} onChange={(e) => u("website", e.target.value)} className="mt-1.5" placeholder="https://" />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full bg-forest text-bone flex items-center justify-center font-serif text-sm">2</span>
                <h2 className="font-serif text-2xl text-forest">Contact</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="first">First name *</Label>
                  <Input id="first" value={form.firstName} onChange={(e) => u("firstName", e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="last">Last name *</Label>
                  <Input id="last" value={form.lastName} onChange={(e) => u("lastName", e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Company email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => u("email", e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Company phone *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => u("phone", e.target.value)} className="mt-1.5" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full bg-forest text-bone flex items-center justify-center font-serif text-sm">3</span>
                <h2 className="font-serif text-2xl text-forest">Address</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Label htmlFor="street">Street address *</Label>
                  <Input id="street" value={form.street} onChange={(e) => u("street", e.target.value)} className="mt-1.5" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="line2">Address line 2</Label>
                  <Input id="line2" value={form.line2} onChange={(e) => u("line2", e.target.value)} className="mt-1.5" placeholder="Unit, suite, etc." />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" value={form.city} onChange={(e) => u("city", e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Province *</Label>
                  <Select value={form.province} onValueChange={(v) => u("province", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a province" /></SelectTrigger>
                    <SelectContent>
                      {PROVINCES.map((p) => (
                        <SelectItem key={p.code} value={p.code}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postal">Postal code *</Label>
                  <Input id="postal" value={form.postal} onChange={(e) => u("postal", e.target.value.toUpperCase())} className="mt-1.5" placeholder="A1A 1A1" />
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full bg-forest text-bone flex items-center justify-center font-serif text-sm">4</span>
                <h2 className="font-serif text-2xl text-forest">Capabilities & service area</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Label htmlFor="capabilities">Capabilities</Label>
                  <Textarea id="capabilities" rows={3} value={form.capabilities} onChange={(e) => u("capabilities", e.target.value)} className="mt-1.5" placeholder="e.g., wall mount, raceway, electrical hookup, permits, structural" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <Textarea id="equipment" rows={3} value={form.equipment} onChange={(e) => u("equipment", e.target.value)} className="mt-1.5" placeholder="e.g., 65ft bucket truck, scissor lift, crane, hoist" />
                </div>
                <div>
                  <Label htmlFor="areas">Cities / areas served</Label>
                  <Input id="areas" value={form.areas} onChange={(e) => u("areas", e.target.value)} className="mt-1.5" placeholder="e.g., GTA, Hamilton, Niagara" />
                </div>
                <div>
                  <Label htmlFor="travel">Max travel distance</Label>
                  <Input id="travel" value={form.travel} onChange={(e) => u("travel", e.target.value)} className="mt-1.5" placeholder="e.g., 200 km from Toronto" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <p className="text-xs text-stone-500 max-w-md">By submitting, you agree to be listed in our public Installer Directory and to be contacted by {brand.name} about installation opportunities.</p>
              <Button type="submit" className="bg-forest hover:bg-forest-dark text-bone rounded-full px-8">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
