import { DMC } from "@/lib/dmc-config";
import { FAQ_ITEMS } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { PRICING_ANSWER, PRICING_TERMS, PRICING_TIERS, formatPrice } from "@/lib/pricing";

export const dynamic = "force-static";

const PAGES = [
  { path: "/", label: "Home", note: "What DMC Tech builds, services, pricing, process, and FAQ" },
  { path: "/about", label: "About", note: "Who we are and how we work" },
  { path: "/services", label: "Services", note: "Websites, ecommerce, AI chatbots, CRM, ERP, automation" },
  { path: "/work", label: "Work", note: "Case studies: Topaz Furniture storefront; Showroom Intelligence & Sales Conversion system (Phase 1 live, Phase 2 in build)" },
  { path: "/guides", label: "Guides", note: "Costs, MVP timelines, and how to choose a development partner — answers with published numbers" },
  { path: "/guides/custom-software-cost-india", label: "Custom software cost in India", note: "What custom software costs in India, by project type, with real starting prices" },
  { path: "/guides/mvp-timeline", label: "MVP timeline", note: "How long an MVP takes to build and what belongs in version one" },
  { path: "/guides/agency-vs-freelancer-vs-inhouse", label: "Agency vs freelancer vs in-house", note: "Cost, speed, and risk compared across the three ways to get software built" },
  { path: "/start", label: "Find your package", note: "Three-question router that matches a business to a package and price" },
  { path: "/contact", label: "Contact", note: "Start a project — WhatsApp, email, or contact form" },
  { path: "/demo/ai-visualizer", label: "AI Room Visualizer Demo", note: "Upload a room photo, preview furniture in it with AI" },
  { path: "/demo/furniture-concept-2.0", label: "Furniture Ecommerce Demo", note: "Full working furniture storefront demo" },
] as const;

function buildLlmsTxt(): string {
  const faq = FAQ_ITEMS.map((item) => `### ${item.q}\n${item.a}`).join("\n\n");
  const pages = PAGES.map((p) => `- [${p.label}](${SITE_URL}${p.path}): ${p.note}`).join("\n");

  // Packages come from the same array the pricing section renders, so this file
  // can never quote a price the site no longer shows.
  const packages = PRICING_TIERS.map((tier) => {
    const price =
      tier.startingPrice === null ? "custom quote" : `from ${formatPrice(tier.startingPrice)}`;
    return [
      `### ${tier.name} — ${price}, ${tier.timeline}`,
      `For: ${tier.audience}`,
      tier.includes.map((item) => `- ${item}`).join("\n"),
      `Not included: ${tier.excludes}`,
    ].join("\n");
  }).join("\n\n");

  const terms = PRICING_TERMS.map((term) => `- ${term.label}: ${term.value}`).join("\n");

  return `# DMC Tech (Digital Market Creators)

> DMC Tech is a web and AI systems agency in ${DMC.location}. We build websites, ecommerce stores, AI WhatsApp chatbots, custom CRMs, ERP modules, and business automation for Indian businesses — engineered in-house, with transparent pricing and 100% code ownership.

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

## Pricing

${PRICING_ANSWER}

${packages}

## Terms that apply to every project

${terms}

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
