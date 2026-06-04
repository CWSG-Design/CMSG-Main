import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValuesSection from "@/components/Values";
import ProductsSection from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import ShippingInstallSection from "@/components/ShippingInstallSection";
import ResourcesSection from "@/components/Resources";
import GallerySection from "@/components/Gallery";
import TestimonialsSection from "@/components/Testimonials";
import InstallerCTA from "@/components/InstallerCTA";
import ContactSection from "@/components/ContactSection";
import ProductionCTA from "@/components/ProductionCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-cream">
      <Header />
      <Hero />
      <ValuesSection />
      <HowItWorks />
      <ProductsSection />
      <ShippingInstallSection />
      <ResourcesSection />
      <GallerySection />
      <TestimonialsSection />
      <InstallerCTA />
      <ContactSection />
      <ProductionCTA />
      <Footer />
    </main>
  );
}
