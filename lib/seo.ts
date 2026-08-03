import type { Metadata } from "next";
import { DMC, SOCIAL_LINKS } from "@/lib/dmc-config";
import { PRICING_TIERS } from "@/lib/pricing";
import { aggregateRating, verifiedReviews } from "@/data/reviews";

export const SITE_URL = "https://www.dmctech.in";
export const SITE_NAME = "DMC Tech";
// Title and description are kept inside SERP truncation limits (~60 and ~155
// chars) and lead with a price, because that is the fact both humans and answer
// engines lift out of a snippet.
export const SITE_TITLE = "DMC Tech | Custom Software, AI & CRM Systems — India";
export const SITE_DESCRIPTION =
  "DMC Tech builds custom software for Indian businesses: websites from ₹90,000, ecommerce from ₹3,00,000, CRM and AI systems from ₹6,00,000. You own the code.";
export const OG_IMAGE_PATH = "/opengraph-image";

const BASE_KEYWORDS = [
  "local business websites",
  "website development India",
  "ecommerce website development",
  "product catalog website",
  "AI room visualizer",
  "WhatsApp automation",
  "AI chatbot for business",
  "CRM for small business India",
  "ERP custom solutions",
  "business process automation",
  "lead management system",
  "custom business software India",
  "web design Surat",
  "web design Gujarat",
  "DMC Tech",
];

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const NO_INDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createSeoMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE_PATH);

  return {
    title: { absolute: title },
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} website preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex ? NO_INDEX_ROBOTS : DEFAULT_ROBOTS,
  };
}

export function getSiteVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  if (!google && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [DMC.name],
    url: SITE_URL,
    sameAs: SOCIAL_LINKS.map((social) => social.href),
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl(OG_IMAGE_PATH),
    description: SITE_DESCRIPTION,
    email: DMC.email,
    telephone: DMC.whatsappNumber,
    // schema.org expects a currency band or an explicit range, not a bare
    // currency code — "INR" alone parses to nothing.
    priceRange: `₹${DMC.pricing.starter}-₹${DMC.pricing.enterprise}`,
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    areaServed: [
      "Ahmedabad",
      "Surat",
      "Gujarat",
      "India",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: DMC.email,
      telephone: DMC.whatsappNumber,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/about#founder`,
      name: DMC.founder.name,
      jobTitle: DMC.founder.role,
      url: absoluteUrl("/about"),
    },
    makesOffer: [
      // Priced tiers come straight from PRICING_TIERS, so what the page shows
      // and what the schema claims can never drift apart. Publishing the price
      // here is what lets an answer engine quote a number instead of "contact
      // them for pricing".
      ...PRICING_TIERS.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        url: absoluteUrl(`/contact?tier=${tier.slug}`),
        availability: "https://schema.org/InStock",
        areaServed: "IN",
        itemOffered: {
          "@type": "Service",
          name: tier.name,
          description: tier.audience,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
        ...(tier.startingPrice === null
          ? { priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR" } }
          : {
              priceSpecification: {
                "@type": "PriceSpecification",
                price: tier.startingPrice,
                priceCurrency: "INR",
                valueAddedTaxIncluded: false,
                // "From" pricing: the published figure is the floor.
                minPrice: tier.startingPrice,
              },
            }),
      })),
      {
        "@type": "Offer",
        name: "Maintenance and support",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: DMC.pricing.maintenance,
          priceCurrency: "INR",
          unitCode: "MON",
          billingIncrement: 1,
        },
        itemOffered: {
          "@type": "Service",
          name: "Ongoing maintenance and support",
          description:
            "Monthly updates, uptime monitoring, bug fixes, and priority WhatsApp support. Optional, cancel anytime.",
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI room visualizer for furniture and décor stores",
          description:
            "A browser tool that places your products inside a customer's own room photo using AI, with accurate scale and lighting.",
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function serviceCatalogJsonLd() {
  // Each service carries a description and what it produces. A bare list of
  // names is not something an answer engine can quote — a sentence explaining
  // what the service does and who it is for is.
  const services = [
    {
      name: "Complete business systems and digital operations",
      description:
        "End-to-end digitisation of an operation: CRM, lead pipeline, sales automation, staff dashboards, and real-time reporting, built around how the business already runs.",
      output: "A single system replacing spreadsheets and WhatsApp groups",
    },
    {
      name: "AI WhatsApp chatbots and customer assistants",
      description:
        "WhatsApp and web assistants grounded on a live product catalog and pricing, answering in English, Hindi, or Gujarati through the official WhatsApp Business API, and escalating to a human when needed.",
      output: "24/7 customer answers without adding headcount",
    },
    {
      name: "CRM and lead management systems",
      description:
        "Custom CRMs that capture leads from Instagram, Facebook, Google, WhatsApp, and walk-ins into one pipeline, auto-assign them to salespeople, and trigger follow-ups automatically.",
      output: "Every lead assigned, followed up, and attributed to a source",
    },
    {
      name: "ERP and process automation",
      description:
        "Order management, workshop tracking, supplier purchase orders, GST billing, delivery scheduling, and deadline alerts for manufacturers and multi-branch retailers.",
      output: "Production and supply chain visible in one place",
    },
    {
      name: "Business website design and development",
      description:
        "Custom-designed, mobile-first websites built for enquiries rather than decoration, with Google Business Profile setup and on-page SEO included.",
      output: "A site that turns visitors into enquiries",
    },
    {
      name: "Product catalog websites",
      description:
        "Searchable, filterable product catalogs with live pricing, variants, and per-product enquiry buttons, for businesses that sell but don't yet transact online.",
      output: "Customers who can browse and price without calling",
    },
    {
      name: "Ecommerce stores",
      description:
        "Storefronts that accept UPI, cards, and net banking, with inventory management, an order dashboard, and automated confirmations and delivery updates.",
      output: "Online orders with payments and inventory handled",
    },
    {
      name: "AI room visualizers",
      description:
        "A browser tool that places a product inside a customer's own room photo with accurate scale and lighting, for furniture, flooring, and interior décor businesses.",
      output: "Customers who can see a product in their space before buying",
    },
    {
      name: "Smart recognition systems",
      description:
        "Consent-based face recognition for showroom entry, repeat-customer alerts, and visit history, built to India's DPDPA requirements.",
      output: "Staff who know a returning customer before they speak",
    },
    {
      name: "Dashboards and business analytics",
      description:
        "Real-time dashboards covering the sales pipeline, staff performance, lead sources, and conversion funnels, on one screen.",
      output: "Answers to which branch, salesperson, or ad actually converted",
    },
    {
      name: "Custom integrations and API development",
      description:
        "Connecting Meta lead ads, payment gateways, Tally, WhatsApp Business Solution Providers, and third-party tools into one system — including building the API when a tool doesn't expose one.",
      output: "Systems that talk to each other instead of being re-keyed",
    },
    {
      name: "Ongoing maintenance and support",
      description: `Monthly updates, uptime monitoring, bug fixes, and priority WhatsApp support at ${DMC.pricing.maintenance.toLocaleString("en-IN")} rupees per month. Optional, cancel anytime.`,
      output: "Software that keeps matching the business as it changes",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "DMC Tech business systems, AI, and web development services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceOutput: service.output,
        serviceType: service.name,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: "India",
        url: absoluteUrl("/services"),
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Article markup for the guides. Carries the author and publisher entities so
 * the prose has a named human behind it — the expertise half of E-E-A-T, which
 * a page of anonymous text cannot claim.
 */
export function articleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/about#founder`,
      name: DMC.founder.name,
      jobTitle: DMC.founder.role,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${absoluteUrl(path)}#webpage` },
  };
}

/**
 * Review and AggregateRating markup.
 *
 * Emits only reviews flagged `verified` in `data/reviews.ts`. With no verified
 * entries this returns an empty array and nothing reaches the page — the
 * intended state until real, permissioned quotes replace the placeholders.
 * Publishing invented reviews as structured data is a Google spam policy
 * violation that costs the whole domain, so the gate is code, not memory.
 */
export function reviewJsonLd() {
  const verified = verifiedReviews();
  if (verified.length === 0) return [];

  const rating = aggregateRating();

  const reviews = verified.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${SITE_URL}/#review-${review.id}`,
    itemReviewed: { "@id": `${SITE_URL}/#organization` },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: review.name,
      ...(review.company
        ? { worksFor: { "@type": "Organization", name: review.company } }
        : {}),
    },
    datePublished: review.datePublished,
    reviewBody: review.quote,
    publisher: { "@id": `${SITE_URL}/#organization` },
  }));

  if (!rating) return reviews;

  return [
    ...reviews,
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.ratingValue,
        reviewCount: rating.reviewCount,
        bestRating: rating.bestRating,
        worstRating: rating.worstRating,
      },
    },
  ];
}

/**
 * Case-study markup for /work.
 *
 * The richest proof content on the site was previously invisible to structured
 * parsers. Named clients (with permission) are the strongest E-E-A-T signal
 * available — stronger than any stat tile.
 */
export function caseStudyJsonLd(
  studies: Array<{
    name: string;
    description: string;
    client: string;
    location: string;
    projectType: string;
    url?: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl("/work")}#case-studies`,
    name: `${SITE_NAME} case studies`,
    itemListElement: studies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${absoluteUrl("/work")}#${study.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: study.name,
        description: study.description,
        about: study.projectType,
        creator: { "@id": `${SITE_URL}/#organization` },
        locationCreated: {
          "@type": "Place",
          name: study.location,
        },
        ...(study.url ? { url: study.url } : {}),
      },
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

export function aiVisualizerJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DMC Tech AI Room Visualizer",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/demo/ai-visualizer"),
    description:
      "A web demo that lets furniture customers upload a room photo and preview products in their space with AI-generated placement.",
    creator: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/contact"),
      availability: "https://schema.org/InStock",
    },
  };
}
