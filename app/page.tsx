import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import dynamic from "next/dynamic";

import { BrutalistLoader } from "@/components/ui/brutalist-loader";

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

function InlineGridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[50]">
      <div className="w-full h-full flex justify-between px-6 md:px-12 lg:px-16">
        <div className="w-px h-full bg-border-harsh/5" />
        <div className="w-px h-full bg-border-harsh/5 hidden lg:block" />
        <div className="w-px h-full bg-border-harsh/5" />
        <div className="w-px h-full bg-border-harsh/5 hidden lg:block" />
        <div className="w-px h-full bg-border-harsh/5" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-bg-page min-h-screen relative">
      <BrutalistLoader />
      
      {/* Main content — scrolls OVER the footer */}
      <div className="relative z-10 max-w-[1440px] mx-auto min-h-screen bg-bg-page">
        {/* Grid overlay — lives INSIDE main content so it never bleeds into footer */}
        <InlineGridOverlay />
        
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
      </div>

      {/* Footer — sticky at bottom, revealed as main content scrolls away */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
