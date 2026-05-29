import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { GridOverlay } from "@/components/layout/GridOverlay";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer));
const AboutUsSection = dynamic(() => import("@/components/sections/about").then(m => m.AboutUsSection));
const OurWorkSection = dynamic(() => import("@/components/sections/our-work").then(m => m.OurWorkSection));
const DemoPreviewSection = dynamic(() => import("@/components/sections/demo-preview").then(m => m.DemoPreviewSection));
const ProblemSection = dynamic(() => import("@/components/sections/problem").then(m => m.ProblemSection));
const ServicesSection = dynamic(() => import("@/components/sections/services").then(m => m.ServicesSection));
const FeaturedOfferSection = dynamic(() => import("@/components/sections/featured-offer").then(m => m.FeaturedOfferSection));
const ProcessSection = dynamic(() => import("@/components/sections/process").then(m => m.ProcessSection));
const PricingSection = dynamic(() => import("@/components/sections/pricing").then(m => m.PricingSection));
const TrustSection = dynamic(() => import("@/components/sections/trust").then(m => m.TrustSection));
const FinalCtaSection = dynamic(() => import("@/components/sections/final-cta").then(m => m.FinalCtaSection));

export default function Home() {
  return (
    <div className="bg-bg-page min-h-screen relative overflow-hidden">
      <GridOverlay />
      
      <div className="relative z-10 border-x border-border-harsh max-w-[1440px] mx-auto min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <AboutUsSection />
          <OurWorkSection />
          <DemoPreviewSection />
          <ServicesSection />
          <FeaturedOfferSection />
          <ProcessSection />
          <PricingSection />
          <ProblemSection />
          <TrustSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
