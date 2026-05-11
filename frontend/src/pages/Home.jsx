import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ValuesSection from "../components/Values";
import ResourcesSection from "../components/Resources";
import ProductsSection from "../components/Products";
import GallerySection from "../components/Gallery";
import TestimonialsSection from "../components/Testimonials";
import ProductionCTA from "../components/ProductionCTA";
import ShippingInstallSection from "../components/ShippingInstallSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-cream">
      <Header />
      <Hero />
      <ValuesSection />
      <ProductsSection />
      <ShippingInstallSection />
      <ResourcesSection />
      <GallerySection />
      <TestimonialsSection />
      <ProductionCTA />
      <Footer />
    </main>
  );
}
