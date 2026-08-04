import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import dynamic from "next/dynamic";
import { BrutalistLoader } from "@/components/ui/brutalist-loader";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  createSeoMetadata,
  faqJsonLd,
  organizationJsonLd,
  reviewJsonLd,
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
const CaseStudiesMetricsSection = dynamic(() => import("@/components/sections/case-studies-metrics").then(m => m.CaseStudiesMetricsSection), {
  loading: () => <SectionPlaceholder />,
});
const CredentialsWallSection = dynamic(() => import("@/components/sections/credentials-wall").then(m => m.CredentialsWallSection), {
  loading: () => <SectionPlaceholder />,
});
const LogoWallSection = dynamic(() => import("@/components/sections/logo-wall").then(m => m.LogoWall), {
  loading: () => <SectionPlaceholder />,
});
const ReviewsSection = dynamic(() => import("@/components/sections/reviews").then(m => m.Reviews), {
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
const FindYourFitSection = dynamic(() => import("@/components/sections/find-your-fit").then(m => m.FindYourFitSection), {
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
              // Empty until a testimonial in lib/testimonials.ts is marked
              // `verified` — placeholder reviews never reach the markup.
              ...reviewJsonLd(),
            ]}
          />
          {/* Section order is a narrative, not a list. It runs:
              pain → offer → proof → story → mechanism → reassurance →
              price → convert → objections → ask.

              Two rules worth keeping if this ever gets shuffled again:
                1. Problem must precede Pricing. A price the visitor cannot
                   measure against a cost they feel is just a number.
                2. Proof must precede nothing. It answers a claim, so it only
                   lands after Services has made one.

              Formats also alternate on purpose — stats, case cards, project
              grid, logo wall, quotes — so a long page never reads as the same
              block five times running. */}

          {/* ── Hook: what we do, for whom, at what price ── */}
          <HeroSection />

          {/* ── Pain: the visitor recognises themselves before we sell ── */}
          <AboutUsSection />
          <ProblemSection />
          <TrustSection />

          {/* ── Offer: what we build, as the direct answer to that pain ── */}
          <ServicesSection />

          {/* ── Proof: the claim, delivered ── */}
          <CaseStudiesMetricsSection />
          <OurWorkSection />
          <LogoWallSection />

          {/* ── Who is behind it — now that they have a reason to care ── */}

          {/* ── De-risk: how the work actually runs ── */}
          <ProcessSection />
          <PrinciplesSection />
          <CredentialsWallSection />

          {/* ── Human voices, immediately before the money question ── */}
          <ReviewsSection />

          {/* ── Reassurance: reply time, in-house, ownership, no hidden fees ── */}

          {/* ── The number, then self-qualification straight into a form ── */}
          <PricingSection />
          <FindYourFitSection />

          {/* ── Last objections, then the ask ── */}
          <FaqSection />
          <FinalCtaSection />

          {/* <LiveVisionSection /> */}
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>

      <StickyMobileCta />
    </div>
  );
}
