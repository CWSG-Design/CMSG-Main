import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { brand, products } from "@/lib/mock";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    details: "",
  });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.product) {
      toast.error("Please fill in your name, email, and product.");
      return;
    }
    const list = JSON.parse(localStorage.getItem("cws_quotes") || "[]");
    list.push({ ...form, ts: Date.now() });
    localStorage.setItem("cws_quotes", JSON.stringify(list));
    setSubmitted(true);
    toast.success("Quote request received! We'll be in touch within 1 business day.");
  };

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-forest hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-24">
        <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-3">Request a Quote</div>
        <h1 className="font-serif text-4xl md:text-5xl text-forest leading-tight">
          Tell us about your <span className="italic text-sage">project</span>.
        </h1>
        <p className="mt-4 text-stone-700 max-w-2xl">
          Fill in the details below and a {brand.name} specialist will get back to you with pricing and a production timeline.
        </p>

        {submitted ? (
          <div className="mt-10 bg-white border border-stone-200 rounded-2xl p-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-sage mx-auto" />
            <h2 className="font-serif text-3xl text-forest mt-5">Thanks, {form.name.split(" ")[0]}!</h2>
            <p className="text-stone-600 mt-3 max-w-md mx-auto">
              We've received your request. A member of the {brand.name} team will reach out within 1 business day.
            </p>
            <Link to="/">
              <Button className="mt-7 bg-forest hover:bg-forest-dark text-bone rounded-full px-7">Back to home</Button>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 bg-white border border-stone-200 rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-5"
          >
            <div>
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Product *</Label>
              <Select value={form.product} onValueChange={(v) => update("product", v)}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a product" /></SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Estimated quantity / size</Label>
              <Input id="quantity" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className="mt-1.5" placeholder="e.g., 24in tall, 8 letters" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="details">Project details</Label>
              <Textarea id="details" rows={5} value={form.details} onChange={(e) => update("details", e.target.value)} className="mt-1.5" placeholder="Share artwork notes, mounting surface, install location, deadline..." />
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 items-center justify-between mt-2">
              <p className="text-xs text-stone-500">By submitting you agree to be contacted by our team about this request.</p>
              <Button type="submit" className="bg-forest hover:bg-forest-dark text-bone rounded-full px-8">
                Submit Request
              </Button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
