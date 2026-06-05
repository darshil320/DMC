import type { Metadata } from "next";
import { DMC, SOCIAL_LINKS } from "@/lib/dmc-config";

export const SITE_URL = "https://www.dmctech.in";
export const SITE_NAME = "DMC Tech";
export const SITE_TITLE =
  "DMC Tech | Websites, Ecommerce & AI Visualizers for Local Businesses";
export const SITE_DESCRIPTION =
  "DMC Tech builds custom websites, ecommerce stores, product catalogs, WhatsApp systems, and AI room visualizers for local businesses in India.";
export const OG_IMAGE_PATH = "/opengraph-image";

const BASE_KEYWORDS = [
  "local business websites",
  "website development India",
  "ecommerce website development",
  "product catalog website",
  "AI room visualizer",
  "WhatsApp automation",
  "Google Business setup",
  "web design Ahmedabad",
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
    alternateName: [DMC.name, DMC.fullName],
    url: SITE_URL,
    sameAs: SOCIAL_LINKS.map((social) => social.href),
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl(OG_IMAGE_PATH),
    description: SITE_DESCRIPTION,
    email: DMC.email,
    telephone: DMC.whatsappNumber,
    priceRange: "INR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
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
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom website development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ecommerce website development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI room visualizer for furniture stores",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "WhatsApp automation and product catalog systems",
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
    "Business website design and development",
    "Product catalog websites",
    "Ecommerce stores",
    "AI room visualizers",
    "WhatsApp enquiry systems",
    "Google Business profile setup",
    "Landing pages",
    "Website maintenance",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#services`,
    name: "DMC Tech website and automation services",
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
