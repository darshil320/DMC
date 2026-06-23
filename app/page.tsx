import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import dynamic from "next/dynamic";
import { BrutalistLoader } from "@/components/ui/brutalist-loader";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  createSeoMetadata,
  faqJsonLd,
  organizationJsonLd,
  serviceCatalogJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/content";

export const metadata: Metadata = createSeoMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: [
    "business website design",
    "local business website India",
    "AI chatbot for business India",
    "custom CRM for SMB",
    "ERP solutions India",
    "ecommerce website for shops",
    "WhatsApp AI assistant",
    "business process automation",
  ],
});

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
// const ProofSection = dynamic(() => import("@/components/sections/proof").then(m => m.ProofSection), {
//   loading: () => <SectionPlaceholder />,
// });
const LiveVisionSection = dynamic(() => import("@/components/sections/live-vision").then(m => m.LiveVisionSection), {
  loading: () => <SectionPlaceholder />,
});
const PrinciplesSection = dynamic(() => import("@/components/sections/principles").then(m => m.PrinciplesSection), {
  loading: () => <SectionPlaceholder />,
});

const ProblemSection = dynamic(() => import("@/components/sections/problem").then(m => m.ProblemSection), {
  loading: () => <SectionPlaceholder />,
});
const ServicesSection = dynamic(() => import("@/components/sections/services").then(m => m.ServicesSection), {
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
const FaqSection = dynamic(() => import("@/components/sections/faq").then(m => m.FaqSection), {
  loading: () => <SectionPlaceholder />,
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
          <JsonLd
            id="home-json-ld"
            data={[
              organizationJsonLd(),
              websiteJsonLd(),
              serviceCatalogJsonLd(),
              webPageJsonLd({
                path: "/",
                name: SITE_TITLE,
                description: SITE_DESCRIPTION,
              }),
              faqJsonLd(FAQ_ITEMS),
            ]}
          />
          <HeroSection />
          <AboutUsSection />
          <OurWorkSection />

          <LiveVisionSection />

          <ServicesSection />

          <ProcessSection />
          <PrinciplesSection />
          <PricingSection />
          <ProblemSection />
          <TrustSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
