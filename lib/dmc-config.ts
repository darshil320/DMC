export const DMC = {
  name: "DMC",
  fullName: "DMC Tech",
  tagline: "We build the systems that run your business.",
  email: "hey@dmctech.in",
  whatsappNumber: "+91 94265 29230",
  whatsappLink: "https://wa.me/919426529230",
  domain: "www.dmctech.in",
  location: "Surat, India",
  // Named author/expertise signal — emitted as a schema.org Person on the
  // organization, which is currently the weakest part of the site's E-E-A-T.
  founder: {
    name: "Darshil Lashkari",
    role: "Founder & Lead Engineer",
  },
  // Published starting prices. These are quoted verbatim on the pricing
  // section, in `/llms.txt`, and inside the Offer JSON-LD — change them here
  // and every surface follows.
  pricing: {
    starter: 90000,
    catalog: 150000,
    ecommerce: 300000,
    businessSystem: 600000,
    enterprise: 1500000,
    maintenance: 15000,
  },
  paymentTerms: "40% to start, 40% at build milestone, 20% on launch",
  replyWindowHours: 24,
} as const;

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    shortLabel: "IG",
    href: "https://www.instagram.com/dmclabs.ai?igsh=MW02OG91OWdmZWcxaQ%3D%3D&utm_source=qr",
  },
  {
    label: "X",
    shortLabel: "X",
    href: "https://x.com/__dmc__l?s=11",
  },
] as const;

export const URBANWOOD = {
  name: "UrbanWood Furniture",
  tagline: "Premium Furniture for Modern Homes",
  location: "Surat",
  whatsappLink: "https://wa.me/919426529230",
} as const;
