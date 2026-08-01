import type { Metadata } from "next";
import { DMC, SOCIAL_LINKS } from "@/lib/dmc-config";
import { PRICING_TIERS } from "@/lib/pricing";

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
  const services = [
    "Complete business systems and digital operations",
    "AI WhatsApp chatbots and customer assistants",
    "CRM and lead management systems",
    "ERP and process automation",
    "Business website design and development",
    "Product catalog websites",
    "Ecommerce stores",
    "AI room visualizers",
    "Smart recognition systems",
    "Dashboards and business analytics",
    "Custom integrations and API development",
    "Google Business profile setup",
    "Landing pages",
    "Ongoing maintenance and support",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "DMC Tech business systems, AI, and web development services",
    itemListElement: services.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: "India",
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
