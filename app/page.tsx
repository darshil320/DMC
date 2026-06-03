import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import dynamic from "next/dynamic";
import { BrutalistLoader } from "@/components/ui/brutalist-loader";

function SectionPlaceholder({ minHeight = "60vh" }: { minHeight?: string }) {
  return <div style={{ minHeight }} aria-hidden />;
}

const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer), {
  loading: () => <SectionPlaceholder minHeight="20vh" />,
});
const AboutUsSection = dynamic(() => import("@/components/sections/about").then(m => m.AboutUsSection), {
  loading: () => <SectionPlaceholder />,
});
const OurWorkSection = dynamic(() => import("@/components/sections/our-work").then(m => m.OurWorkSection), {
  loading: () => <SectionPlaceholder />,
});
const DemoPreviewSection = dynamic(() => import("@/components/sections/demo-preview").then(m => m.DemoPreviewSection), {
  loading: () => <SectionPlaceholder />,
});
const AIVisualizerFeatureSection = dynamic(() => import("@/components/sections/ai-visualizer-feature").then(m => m.AIVisualizerFeatureSection), {
  loading: () => <SectionPlaceholder />,
});
const ProblemSection = dynamic(() => import("@/components/sections/problem").then(m => m.ProblemSection), {
  loading: () => <SectionPlaceholder />,
});
const ServicesSection = dynamic(() => import("@/components/sections/services").then(m => m.ServicesSection), {
  loading: () => <SectionPlaceholder />,
});
const FeaturedOfferSection = dynamic(() => import("@/components/sections/featured-offer").then(m => m.FeaturedOfferSection), {
  loading: () => <SectionPlaceholder />,
});
const ProcessSection = dynamic(() => import("@/components/sections/process").then(m => m.ProcessSection), {
  loading: () => <SectionPlaceholder />,
});
const PricingSection = dynamic(() => import("@/components/sections/pricing").then(m => m.PricingSection), {
  loading: () => <SectionPlaceholder />,
});
const TrustSection = dynamic(() => import("@/components/sections/trust").then(m => m.TrustSection), {
  loading: () => <SectionPlaceholder minHeight="30vh" />,
});
const FinalCtaSection = dynamic(() => import("@/components/sections/final-cta").then(m => m.FinalCtaSection), {
  loading: () => <SectionPlaceholder minHeight="30vh" />,
});

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

      <div className="relative z-10 max-w-[1440px] mx-auto min-h-screen bg-bg-page">
        <InlineGridOverlay />
        <Navbar />
        <main>
          <HeroSection />
          <AboutUsSection />
          <OurWorkSection />
          <DemoPreviewSection />
          <AIVisualizerFeatureSection />
          <ServicesSection />
          <FeaturedOfferSection />
          <ProcessSection />
          <PricingSection />
          <ProblemSection />
          <TrustSection />
          <FinalCtaSection />
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
