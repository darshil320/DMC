import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { WorkPageContent } from "@/components/sections/work-page";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

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
    </div>
  );
}
