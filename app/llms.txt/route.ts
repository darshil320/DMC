import { DMC } from "@/lib/dmc-config";
import { FAQ_ITEMS } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const PAGES = [
  { path: "/", label: "Home", note: "What DMC Tech builds, services, pricing, process, and FAQ" },
  { path: "/about", label: "About", note: "Who we are and how we work" },
  { path: "/services", label: "Services", note: "Websites, ecommerce, AI chatbots, CRM, ERP, automation" },
  { path: "/work", label: "Work", note: "Case studies: Topaz Furniture storefront; Showroom Intelligence & Sales Conversion system (Phase 1 live, Phase 2 in build)" },
  { path: "/contact", label: "Contact", note: "Start a project — WhatsApp, email, or contact form" },
  { path: "/demo/ai-visualizer", label: "AI Room Visualizer Demo", note: "Upload a room photo, preview furniture in it with AI" },
  { path: "/demo/furniture-concept-2.0", label: "Furniture Ecommerce Demo", note: "Full working furniture storefront demo" },
] as const;

function buildLlmsTxt(): string {
  const faq = FAQ_ITEMS.map((item) => `### ${item.q}\n${item.a}`).join("\n\n");
  const pages = PAGES.map((p) => `- [${p.label}](${SITE_URL}${p.path}): ${p.note}`).join("\n");

  return `# DMC Tech (Digital Market Creators)

> DMC Tech is a web and AI systems agency in ${DMC.location}. We build websites, ecommerce stores, AI WhatsApp chatbots, custom CRMs, ERP modules, and business automation for Indian businesses — engineered in-house, with transparent pricing and no lock-in.

- Contact: ${DMC.email} · WhatsApp ${DMC.whatsappNumber}
- Location: ${DMC.location} (working across Gujarat and India)
- Languages supported in AI assistants: English, Hindi, Hinglish, Gujarati

## What we build

- Business websites (from ₹${DMC.pricing.starter.toLocaleString("en-IN")})
- Product catalog websites (from ₹${DMC.pricing.catalog.toLocaleString("en-IN")})
- Ecommerce stores with payments (from ₹${DMC.pricing.ecommerce.toLocaleString("en-IN")})
- AI WhatsApp chatbots grounded on live catalog and pricing
- Custom CRM with omnichannel lead capture (Instagram, Facebook, Google, walk-ins, WhatsApp)
- ERP modules: quotations, GST billing, orders, payments, production tracking
- Face-recognition showroom intelligence (consent-based, DPDPA compliant)
- AI room visualizers for furniture and décor businesses
- Ongoing maintenance and support (₹${DMC.pricing.maintenance.toLocaleString("en-IN")}/month)

## Key pages

${pages}

## FAQ

${faq}
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
