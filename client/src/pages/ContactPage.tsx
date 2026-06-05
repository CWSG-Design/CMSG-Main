import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <main className="bg-cream min-h-screen">
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-bone via-cream to-cream" />
          <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-sage/20 blur-3xl" />
        </div>
        <div className="max-w-site mx-auto px-4 lg:px-6 pt-16 lg:pt-24 pb-4">
          <div className="text-xs uppercase tracking-[0.22em] text-sage font-semibold mb-4">Contact</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-forest leading-[1.04] max-w-3xl">
            We'd love to <span className="italic text-sage">hear from you</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-stone-700 leading-relaxed text-lg">
            Whether you have a question about a product, need a custom quote, or just want to learn more about how CWS works — reach out and we'll get back to you fast.
          </p>
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
}
