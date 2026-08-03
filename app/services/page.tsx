import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { ServicesPageContent } from "@/components/sections/services-page";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import {
  breadcrumbJsonLd,
  createSeoMetadata,
  faqJsonLd,
  organizationJsonLd,
  serviceCatalogJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/content";

// Service-specific questions only — the full list stays on the homepage so the
// two pages don't publish duplicate FAQ markup.
const SERVICE_FAQ_KEYWORDS = ["besides websites", "WhatsApp chatbot", "custom CRM", "complete business systems", "ecommerce stores", "Room Visualizer", "take to launch"];
const SERVICE_FAQ_ITEMS = FAQ_ITEMS.filter((item) =>
  SERVICE_FAQ_KEYWORDS.some((keyword) => item.q.includes(keyword))
);

const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer));

const title = "Services | DMC Tech — Websites, AI Chatbots, CRM, ERP & Business Systems";
const description =
  "Explore DMC Tech's full service range: custom websites, AI WhatsApp chatbots, CRM & lead management, ERP & process automation, face recognition systems, dashboards, and custom solutions for SMBs across India.";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "website development India",
    "AI chatbot for business",
    "custom CRM for SMB",
    "ERP solutions for furniture",
    "WhatsApp automation India",
    "business process automation",
    "face recognition retail",
    "real-time business dashboard",
  ],
});

export default function ServicesPage() {
  return (
    <div className="bg-bg-page min-h-screen relative">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <JsonLd
          id="services-json-ld"
          data={[
            organizationJsonLd(),
            serviceCatalogJsonLd(),
            webPageJsonLd({
              path: "/services",
              name: title,
              description,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
            faqJsonLd(SERVICE_FAQ_ITEMS),
          ]}
        />
        <Navbar />
        <ServicesPageContent />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>

      <StickyMobileCta />
    </div>
  );
}
