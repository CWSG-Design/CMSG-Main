import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, Users, MapPin, Wrench, Truck, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

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

type FormState = {
  companyName: string; website: string;
  firstName: string; lastName: string;
  email: string; phone: string;
  street: string; street2: string; city: string;
  province: string; postal: string; country: string;
  capabilities: string; equipment: string;
  areasServed: string; maxTravel: string;
};

const empty: FormState = {
  companyName:"", website:"", firstName:"", lastName:"",
  email:"", phone:"", street:"", street2:"", city:"",
  province:"", postal:"", country:"Canada",
  capabilities:"", equipment:"", areasServed:"", maxTravel:"",
};

export default function InstallerSignUpPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.installer.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your listing has been submitted for review!");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const set = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.firstName || !form.email || !form.phone || !form.street || !form.city || !form.province) {
      toast.error("Please fill in all required fields.");
      return;
    }

    submitMutation.mutate({
      companyName: form.companyName,
      contactName: [form.firstName, form.lastName].filter(Boolean).join(" ") || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      website: form.website || undefined,
      address: [form.street, form.street2].filter(Boolean).join(", ") || undefined,
      city: form.city || undefined,
      province: form.province || undefined,
      postalCode: form.postal || undefined,
      country: form.country || "Canada",
      capabilities: form.capabilities || undefined,
      equipment: form.equipment || undefined,
      areasServed: form.areasServed || undefined,
      maxTravelDistance: form.maxTravel || undefined,
    });
  };

  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bone border-b border-stone-200">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-sage/15 blur-3xl -z-0" />
        <div className="w-full pt-16 pb-12 relative">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Join Our Network</div>
          <h1 className="font-serif text-5xl md:text-6xl text-forest leading-tight max-w-2xl">
            Installer <span className="italic text-sage">Sign Up</span>
          </h1>
          <p className="mt-5 max-w-2xl text-stone-600 text-lg leading-relaxed">
            Do you provide sign installation services? Add your company to our{" "}
            <Link href="/installation-directory" className="text-forest underline underline-offset-2 hover:text-sage transition-colors">
              Installation Directory
            </Link>{" "}
            so sign shops and brokers across Canada can find you. Fill out the form below to be listed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Users, text: "Free directory listing" },
              { icon: MapPin, text: "Searchable by province" },
              { icon: Wrench, text: "Showcase capabilities" },
              { icon: Truck, text: "List your equipment" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-2 text-sm text-stone-700">
                <Icon className="h-4 w-4 text-sage" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form / Success */}
      <section className="w-full py-16">
        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-20">
            <CheckCircle2 className="h-16 w-16 text-sage mx-auto mb-6" />
            <h2 className="font-serif text-4xl text-forest">Submission Received!</h2>
            <p className="mt-4 text-stone-600">
              Thank you for submitting <strong>{form.companyName}</strong> to the CWS Installation
              Directory. Your listing is currently under review and will appear on the map once
              approved by our team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/installation-directory">
                <Button className="bg-forest hover:bg-forest/90 text-bone rounded-full px-7">
                  View the Directory
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => { setSubmitted(false); setForm(empty); }}
                className="rounded-full px-7 border-forest text-forest hover:bg-forest/5"
              >
                Submit another
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-10">
            {/* Company Info */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h2 className="font-serif text-2xl text-forest mb-6">Company Information</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="companyName" className="text-stone-700">Company Name <span className="text-red-500">*</span></Label>
                  <Input id="companyName" value={form.companyName} onChange={e => set("companyName", e.target.value)} className="mt-1.5" placeholder="Acme Sign Co." />
                </div>
                <div>
                  <Label htmlFor="website" className="text-stone-700">Company Website</Label>
                  <Input id="website" value={form.website} onChange={e => set("website", e.target.value)} className="mt-1.5" placeholder="https://www.yoursignco.ca" />
                </div>
                <div>
                  <Label htmlFor="firstName" className="text-stone-700">Contact First Name <span className="text-red-500">*</span></Label>
                  <Input id="firstName" value={form.firstName} onChange={e => set("firstName", e.target.value)} className="mt-1.5" placeholder="Jane" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-stone-700">Contact Last Name</Label>
                  <Input id="lastName" value={form.lastName} onChange={e => set("lastName", e.target.value)} className="mt-1.5" placeholder="Smith" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-stone-700">Company Email <span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" value={form.email} onChange={e => set("email", e.target.value)} className="mt-1.5" placeholder="info@yoursignco.ca" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-stone-700">Company Phone <span className="text-red-500">*</span></Label>
                  <Input id="phone" value={form.phone} onChange={e => set("phone", e.target.value)} className="mt-1.5" placeholder="416-555-0100" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h2 className="font-serif text-2xl text-forest mb-6">Business Address</h2>
              <p className="text-sm text-stone-500 mb-5">
                Your address is used to place your company on the map. It will not be publicly displayed.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Label htmlFor="street" className="text-stone-700">Street Address <span className="text-red-500">*</span></Label>
                  <Input id="street" value={form.street} onChange={e => set("street", e.target.value)} className="mt-1.5" placeholder="123 Main Street" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="street2" className="text-stone-700">Address Line 2</Label>
                  <Input id="street2" value={form.street2} onChange={e => set("street2", e.target.value)} className="mt-1.5" placeholder="Suite, Unit, etc." />
                </div>
                <div>
                  <Label htmlFor="city" className="text-stone-700">City <span className="text-red-500">*</span></Label>
                  <Input id="city" value={form.city} onChange={e => set("city", e.target.value)} className="mt-1.5" placeholder="Toronto" />
                </div>
                <div>
                  <Label htmlFor="province" className="text-stone-700">Province / State <span className="text-red-500">*</span></Label>
                  <Select value={form.province} onValueChange={v => set("province", v)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select province / state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {PROVINCES_STATES.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postal" className="text-stone-700">Postal / ZIP Code</Label>
                  <Input id="postal" value={form.postal} onChange={e => set("postal", e.target.value)} className="mt-1.5" placeholder="M5V 3A8" />
                </div>
                <div>
                  <Label htmlFor="country" className="text-stone-700">Country</Label>
                  <Select value={form.country} onValueChange={v => set("country", v)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Capabilities & Coverage */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h2 className="font-serif text-2xl text-forest mb-2">Capabilities &amp; Coverage</h2>
              <p className="text-stone-500 text-sm mb-6">
                Tell sign shops what you can do and where you operate. This is what appears in your directory listing.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="capabilities" className="text-stone-700">Capabilities</Label>
                  <Textarea
                    id="capabilities" rows={4} value={form.capabilities}
                    onChange={e => set("capabilities", e.target.value)}
                    className="mt-1.5 resize-none"
                    placeholder="e.g. Permits, installs, removals, electrical and non-electrical, interior and exterior signage..."
                  />
                </div>
                <div>
                  <Label htmlFor="equipment" className="text-stone-700">Equipment</Label>
                  <Textarea
                    id="equipment" rows={4} value={form.equipment}
                    onChange={e => set("equipment", e.target.value)}
                    className="mt-1.5 resize-none"
                    placeholder="e.g. 35-85 ft vehicle reach, boom truck, scissor lift, trailer..."
                  />
                </div>
                <div>
                  <Label htmlFor="areasServed" className="text-stone-700">Cities or Areas Served</Label>
                  <Textarea
                    id="areasServed" rows={3} value={form.areasServed}
                    onChange={e => set("areasServed", e.target.value)}
                    className="mt-1.5 resize-none"
                    placeholder="e.g. Greater Toronto Area, Hamilton, Barrie, Kitchener-Waterloo..."
                  />
                </div>
                <div>
                  <Label htmlFor="maxTravel" className="text-stone-700">Max Travel Distance</Label>
                  <Textarea
                    id="maxTravel" rows={3} value={form.maxTravel}
                    onChange={e => set("maxTravel", e.target.value)}
                    className="mt-1.5 resize-none"
                    placeholder="e.g. Up to 200 km from Toronto, ON. Will travel province-wide for large projects."
                  />
                </div>
              </div>
            </div>

            {/* Disclaimer + Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-sage/10 border border-sage/20 rounded-2xl p-6">
              <p className="text-sm text-stone-600 max-w-xl">
                <strong>Please note:</strong> Submissions are reviewed before appearing in the directory.
                CWS does not guarantee the work of listed companies. Sign shops should conduct their own
                due diligence when selecting an installation vendor.
              </p>
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="bg-forest hover:bg-forest/90 text-bone rounded-full px-8 shrink-0"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Listing"
                )}
              </Button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
