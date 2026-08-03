import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { WorkPageContent } from "@/components/sections/work-page";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import {
  breadcrumbJsonLd,
  caseStudyJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

/**
 * Named, real clients only — these mirror the case studies rendered on the
 * page. Do not add anything here that isn't live and permissioned; fabricated
 * client claims in schema are worse than no schema.
 */
const CASE_STUDIES = [
  {
    name: "Topaz Furniture",
    description:
      "A premium furniture storefront with 3D product interaction and ecommerce, built in three weeks for a Surat manufacturer, plus a phased showroom intelligence and sales conversion system behind it.",
    client: "Premium furniture manufacturer",
    location: "Surat, Gujarat",
    projectType: "Website, ecommerce, 3D product experience, showroom CRM",
  },
  {
    name: "Welcome Palace",
    description:
      "A hotel, banquet, and catering business in Piplod, Surat running three distinct offerings behind one generic enquiry form — rebuilt so each audience gets its own path and its own enquiry route.",
    client: "Hotel, banquet hall and catering group",
    location: "Piplod, Surat, Gujarat",
    projectType: "Multi-offering website with segmented enquiry flows",
  },
  {
    name: "Lyfe9",
    description:
      "An AI health platform in private beta: lab report upload to private storage, schema-first biomarker extraction, safety-gated AI explanation, a health timeline with retest reminders, and an optional doctor review workflow.",
    client: "AI health venture",
    location: "India",
    projectType: "AI platform, document processing, health data",
  },
] as const;

const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer));

const title = "Our Work | DMC Tech — Case Studies & Live Projects";
const description =
  "See real projects built by DMC Tech: from premium ecommerce storefronts with 3D interactions to complete AI & CRM showroom intelligence systems.";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path: "/work",
  keywords: [
    "DMC Tech portfolio",
    "case studies website development",
    "ecommerce website examples India",
    "AI business system case study",
    "Next.js website examples",
    "furniture showroom software",
  ],
});

export default function WorkPage() {
  return (
    <div className="bg-bg-page min-h-screen relative">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <JsonLd
          id="work-json-ld"
          data={[
            organizationJsonLd(),
            webPageJsonLd({
              path: "/work",
              name: title,
              description,
            }),
            caseStudyJsonLd([...CASE_STUDIES]),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ]}
        />
        <Navbar />
        <WorkPageContent />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>

      <StickyMobileCta />
    </div>
  );
}
