/**
 * Client reviews.
 *
 * ⚠️  EVERY ENTRY BELOW IS A PLACEHOLDER. Names, companies, and quotes are
 * invented so the section can be designed and reviewed. Replace them with real,
 * permissioned quotes before launch.
 *
 * The `verified` flag is the safety catch. It controls **structured data only**:
 *
 *   verified: false → renders on the page, emits NO Review / AggregateRating schema
 *   verified: true  → renders on the page, AND is published as schema.org Review
 *
 * The split is deliberate. A placeholder quote on a page is a copy problem you
 * fix in a minute. Fabricated `Review` and `AggregateRating` markup is a
 * structured-data spam violation — Google penalises the whole domain for it, and
 * it is the most expensive mistake available on this site. So the schema stays
 * off until someone flips a boolean, which is a deliberate act rather than an
 * oversight.
 *
 * To publish a real review: replace the content, set `verified: true`, set a
 * real `datePublished`, and keep the written permission somewhere findable.
 */

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  avatarBg: string;
  initials: string;
  /** Real, permissioned, and safe to publish as schema.org Review. */
  verified: boolean;
  /** ISO date the review was given. Only used in schema. */
  datePublished: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Vikramaditya Shah",
    role: "Founder & CEO",
    company: "Cohuman Furniture",
    rating: 5,
    quote:
      "DMC completely overhauled our digital catalog experience. Our online quote conversions jumped by 45% within three weeks of launching the new Next.js 16 storefront.",
    avatarBg: "bg-emerald-600 text-white",
    initials: "VS",
    verified: false,
    datePublished: "2026-06-18",
  },
  {
    id: "rev-2",
    name: "Hemant Patel",
    role: "Managing Director",
    company: "Topaz Luxury Furniture",
    rating: 5,
    quote:
      "The facial recognition check-in system and automated WhatsApp AI assistant have modernized our entire Surat showroom floor. Our sales team never misses a repeat guest preference.",
    avatarBg: "bg-amber-600 text-white",
    initials: "HP",
    verified: false,
    datePublished: "2026-05-27",
  },
  {
    id: "rev-3",
    name: "Pooja Singhania",
    role: "Head of Operations",
    company: "Welcome Palace Banquets",
    rating: 5,
    quote:
      "Response time for event enquiries dropped by over 60%. Clients love getting pre-filled WhatsApp quotes immediately after picking their wedding banquet dates.",
    avatarBg: "bg-rose-600 text-white",
    initials: "PS",
    verified: false,
    datePublished: "2026-05-09",
  },
  {
    id: "rev-4",
    name: "Rohan Kulkarni",
    role: "Design Director",
    company: "Prisma Creative Studio",
    rating: 5,
    quote:
      "Sub-second page transitions, warm editorial typography, and flawless responsiveness. DMC delivers software engineering at genuine luxury studio standards.",
    avatarBg: "bg-indigo-600 text-white",
    initials: "RK",
    verified: false,
    datePublished: "2026-04-21",
  },
  {
    id: "rev-5",
    name: "Ananya Mehta",
    role: "Co-Founder",
    company: "Moxie Lifestyle",
    rating: 5,
    quote:
      "Clear timelines, 100% direct code ownership, and zero agency fluff. They built our entire D2C checkout pipeline in less than 3 weeks.",
    avatarBg: "bg-purple-600 text-white",
    initials: "AM",
    verified: false,
    datePublished: "2026-04-02",
  },
  {
    id: "rev-6",
    name: "Devendra Verma",
    role: "VP of Product",
    company: "Mokobara Luggage",
    rating: 5,
    quote:
      "Their attention to micro-interactions, layout performance, and mobile responsiveness is rare. Working with DMC felt like having a top 1% tech team in-house.",
    avatarBg: "bg-blue-600 text-white",
    initials: "DV",
    verified: false,
    datePublished: "2026-03-15",
  },
  {
    id: "rev-7",
    name: "Shruti Kapoor",
    role: "Brand Lead",
    company: "Salad Days Organics",
    rating: 5,
    quote:
      "The custom quotation specifier engine transformed how our corporate accounts request catering orders. Absolute game changer for our bottom line.",
    avatarBg: "bg-teal-600 text-white",
    initials: "SK",
    verified: false,
    datePublished: "2026-02-26",
  },
  {
    id: "rev-8",
    name: "Karan Johar",
    role: "General Partner",
    company: "Aïza Ventures",
    rating: 5,
    quote:
      "DMC builds software that Indian business owners actually love using. Clean code, zero lock-in, and instant support whenever we need custom features.",
    avatarBg: "bg-orange-600 text-white",
    initials: "KJ",
    verified: false,
    datePublished: "2026-02-04",
  },
];

/** Only these are safe to publish as structured data. */
export function verifiedReviews(): ReviewItem[] {
  return REVIEWS.filter((review) => review.verified);
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

/**
 * Computed from verified reviews only. Returns null when there are none, which
 * is what keeps invented ratings out of the markup.
 *
 * Note this is not the same number the Reviews section displays — that one is a
 * hardcoded prop. Wire the component to this function once real reviews exist,
 * so the visible rating and the structured one cannot disagree.
 */
export function aggregateRating(): AggregateRating | null {
  const verified = verifiedReviews();
  if (verified.length === 0) return null;

  const total = verified.reduce((sum, review) => sum + review.rating, 0);

  return {
    ratingValue: Number((total / verified.length).toFixed(1)),
    reviewCount: verified.length,
    bestRating: 5,
    worstRating: 1,
  };
}
