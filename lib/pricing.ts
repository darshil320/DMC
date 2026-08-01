import { DMC } from "@/lib/dmc-config";

/**
 * Single source of truth for packages.
 *
 * Consumed by the pricing section, the Offer JSON-LD in `lib/seo.ts`, and
 * `/llms.txt`. Adding a tier here propagates it to the rendered UI, to
 * structured data, and to the AI-crawler summary in one edit — the same pattern
 * `FAQ_ITEMS` already uses.
 */

export type PricingTier = {
  num: string;
  slug: string;
  name: string;
  /** Starting price in INR, or null when the tier is genuinely quote-only. */
  startingPrice: number | null;
  priceNote?: string;
  timeline: string;
  /** One line a visitor can match themselves against in a few seconds. */
  audience: string;
  includes: readonly string[];
  excludes: string;
  cta: string;
};

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    num: "01",
    slug: "launch",
    name: "Launch",
    startingPrice: DMC.pricing.starter,
    timeline: "2–3 weeks",
    audience:
      "A business that needs to exist properly online — a real site, found on Google, that turns visitors into enquiries.",
    includes: [
      "Custom-designed website, up to 6 pages — no templates",
      "Mobile-first build, tested on real devices",
      "Enquiry form and WhatsApp button wired to your phone",
      "Google Business Profile setup and on-page SEO",
      "Analytics so you can see where enquiries come from",
      "30 days of post-launch fixes",
    ],
    excludes: "Online payments, logins, inventory, custom dashboards.",
    cta: "Start a Launch project",
  },
  {
    num: "02",
    slug: "commerce",
    name: "Catalog & Commerce",
    startingPrice: DMC.pricing.ecommerce,
    priceNote: `Catalog only, without payments: from ${formatPrice(DMC.pricing.catalog)}`,
    timeline: "4–6 weeks",
    audience:
      "A business that sells products and wants customers to browse, price, and buy — or enquire — without a phone call first.",
    includes: [
      "Everything in Launch",
      "Full product catalog: search, filters, variants, live pricing",
      "Payments by UPI, cards, and net banking",
      "Order dashboard and inventory management",
      "Automated order confirmations and delivery updates",
      "Meta and Google lead ads feeding one enquiry inbox",
    ],
    excludes: "Multi-branch stock sync, ERP integration, custom staff workflows.",
    cta: "Price my store",
  },
  {
    num: "03",
    slug: "business-system",
    name: "Business System",
    startingPrice: DMC.pricing.businessSystem,
    timeline: "8–12 weeks",
    audience:
      "A business running on WhatsApp groups and spreadsheets, losing leads between the enquiry and the sale.",
    includes: [
      "Custom CRM: Instagram, Facebook, Google, WhatsApp, and walk-in leads in one pipeline",
      "Auto-assignment to salespeople with automated follow-up triggers",
      "AI WhatsApp assistant trained on your real catalog and pricing (English, Hindi, Gujarati)",
      "Sales dashboard: pipeline, source attribution, staff performance, conversion",
      "Integration with the tools you already pay for — billing, Tally, lead ads, payments",
      "Team training and 60 days of hypercare",
    ],
    excludes: "Manufacturing modules, multi-branch ERP, biometrics.",
    cta: "Book a systems call",
  },
  {
    num: "04",
    slug: "enterprise",
    name: "Enterprise / Custom",
    startingPrice: null,
    priceNote: `Custom quote — engagements typically start around ${formatPrice(DMC.pricing.enterprise)}`,
    timeline: "12+ weeks, phased",
    audience:
      "Multi-branch, multi-team operations that need one system connecting showroom, workshop, supply chain, and back office.",
    includes: [
      "A scoping engagement first — you keep the architecture document and phased plan either way",
      "Custom ERP modules: production, workshop tracking, supplier POs, GST billing, logistics",
      "Multi-branch data sync and role-based access",
      "Showroom intelligence: consent-based face recognition and visit history, built to DPDPA",
      "Dedicated engineering team, sprint cadence, written SLA",
      "Source code and infrastructure in your accounts from day one",
    ],
    excludes:
      "Nothing by default — this tier is scoped to your operation, which is why it is quoted rather than listed.",
    cta: "Request a scoping call",
  },
] as const;

/** Terms that apply to every tier — dense, factual, and deliberately quotable. */
export const PRICING_TERMS = [
  {
    label: "Maintenance",
    value: `${formatPrice(DMC.pricing.maintenance)}/month — updates, monitoring, fixes, priority WhatsApp support. Optional, cancel anytime.`,
  },
  { label: "Payment terms", value: DMC.paymentTerms },
  {
    label: "Ownership",
    value:
      "Code, data, domains, and cloud accounts are yours. 100% IP and code ownership, zero recurring platform fees.",
  },
  { label: "Reply time", value: `Within ${DMC.replyWindowHours} hours, every time.` },
  { label: "Where we build", value: `${DMC.location}. Delivered across India.` },
] as const;

/**
 * The answer-first paragraph for the pricing section. Kept here rather than in
 * JSX so `/llms.txt` and the page render the identical text.
 */
export const PRICING_ANSWER = `A custom website with ${DMC.fullName} starts at ${formatPrice(
  DMC.pricing.starter
)} and ships in 2–3 weeks. An ecommerce store with payments and inventory starts at ${formatPrice(
  DMC.pricing.ecommerce
)} in 4–6 weeks. A full business system — CRM, AI WhatsApp assistant, and sales dashboard — starts at ${formatPrice(
  DMC.pricing.businessSystem
)} in 8–12 weeks. Maintenance is ${formatPrice(
  DMC.pricing.maintenance
)}/month and optional. You own the code.`;
