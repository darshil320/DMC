import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { AboutPageContent } from "@/components/sections/about-page";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer));

const title = "About | DMC Tech — Systems That Run Your Business";
const description =
  "Learn about DMC Tech, an Ahmedabad-based agency building complete digital operating systems — websites, custom CRM, AI chatbots, and process automation for SMBs.";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path: "/about",
  keywords: [
    "about DMC Tech",
    "Darshil Lashkari",
    "digital agency Ahmedabad",
    "business systems builder India",
    "custom software development agency",
    "AI automation agency",
  ],
});

export default function AboutPage() {
  return (
    <div className="bg-bg-page min-h-screen relative">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <JsonLd
          id="about-json-ld"
          data={[
            organizationJsonLd(),
            webPageJsonLd({
              path: "/about",
              name: title,
              description,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ]}
        />
        <Navbar />
        <AboutPageContent />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
