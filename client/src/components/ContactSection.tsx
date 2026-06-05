import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { brand } from "@/lib/mock";
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const sendContact = trpc.email.sendContact.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 1 business day.");
    },
    onError: (err) => {
      toast.error("Failed to send message. Please try again or email us directly.");
      console.error("[Contact] Send error:", err);
    },
  });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    const [firstName, ...rest] = form.name.trim().split(" ");
    sendContact.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      subject: form.subject || undefined,
      message: form.message,
    });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-forest text-bone">
      <div className="max-w-site mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Get In Touch</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-xl">
              Let's talk about <span className="italic text-sage">your project</span>.
            </h2>
          </div>
          <p className="text-bone/70 max-w-sm">
            Have a question, need a quote, or want to learn more about our products? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Contact info sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {[
              { Icon: Phone, label: "Phone", value: brand.phone, href: `tel:${brand.phone}` },
              { Icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
              { Icon: MapPin, label: "Address", value: brand.address, href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-bone/10 rounded-2xl p-6 transition-colors"
              >
                <div className="h-11 w-11 rounded-lg bg-sage/20 flex items-center justify-center text-sage shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-1">{label}</div>
                  <div className="text-bone/90 text-sm leading-relaxed">{value}</div>
                </div>
              </a>
            ))}

            <div className="bg-white/5 border border-bone/10 rounded-2xl p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-3">Business Hours</div>
              <ul className="space-y-2 text-sm text-bone/80">
                <li className="flex justify-between"><span>Monday – Friday</span><span>8:00 AM – 5:00 PM ET</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>By appointment</span></li>
                <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center bg-white/5 border border-bone/10 rounded-2xl p-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-sage mb-5" />
                <h3 className="font-serif text-3xl">Thanks, {form.name.split(" ")[0]}!</h3>
                <p className="mt-3 text-bone/70 max-w-md">
                  We've received your message and will get back to you within 1 business day.
                </p>
                <Button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-7 bg-sage hover:bg-bone hover:text-forest text-forest rounded-full px-7"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="bg-white/5 border border-bone/10 rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-5"
              >
                <div>
                  <Label htmlFor="c-name" className="text-bone/80">Full name *</Label>
                  <Input
                    id="c-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="mt-1.5 bg-white/10 border-bone/20 text-bone placeholder:text-bone/40 focus:border-sage"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="c-email" className="text-bone/80">Email address *</Label>
                  <Input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="mt-1.5 bg-white/10 border-bone/20 text-bone placeholder:text-bone/40 focus:border-sage"
                    placeholder="jane@signshop.ca"
                  />
                </div>
                <div>
                  <Label htmlFor="c-phone" className="text-bone/80">Phone number</Label>
                  <Input
                    id="c-phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="mt-1.5 bg-white/10 border-bone/20 text-bone placeholder:text-bone/40 focus:border-sage"
                    placeholder="416-555-0100"
                  />
                </div>
                <div>
                  <Label htmlFor="c-subject" className="text-bone/80">Subject</Label>
                  <Input
                    id="c-subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="mt-1.5 bg-white/10 border-bone/20 text-bone placeholder:text-bone/40 focus:border-sage"
                    placeholder="Product inquiry, shipping question…"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="c-message" className="text-bone/80">Message *</Label>
                  <Textarea
                    id="c-message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="mt-1.5 bg-white/10 border-bone/20 text-bone placeholder:text-bone/40 focus:border-sage resize-none"
                    placeholder="Tell us about your project, timeline, or any questions you have…"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-bone/50">
                    We typically respond within 1 business day. For urgent requests, call us directly.
                  </p>
                  <Button
                    type="submit"
                    disabled={sendContact.isPending}
                    className="bg-sage hover:bg-bone hover:text-forest text-forest rounded-full px-8 gap-2 shrink-0"
                  >
                    {sendContact.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {sendContact.isPending ? "Sending…" : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
