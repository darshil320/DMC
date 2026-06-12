import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { ServicesPageContent } from "@/components/sections/services-page";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  serviceCatalogJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

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
          ]}
        />
        <Navbar />
        <ServicesPageContent />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
