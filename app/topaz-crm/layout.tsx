import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import { createSeoMetadata } from "@/lib/seo";

/**
 * `.topaz-landing *` in globals.css is the only rule that asks for Almarai.
 * Loading it here rather than in the root layout keeps a font that one noindex
 * page needs off the critical path of every other page — and self-hosting it
 * removes a render-blocking request to a third-party origin.
 */
const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-almarai",
});

/**
 * The page itself is a client component, so its metadata lives here.
 *
 * Previously it exported none at all: it inherited the root title and
 * description verbatim and was absent from the sitemap, which meant an
 * orphaned page competing with the homepage for the same brand query.
 *
 * It reads as a client-specific pitch page rather than a marketing page, so it
 * is excluded from search until that is confirmed. To publish it, drop
 * `noIndex` here and add the route to `app/sitemap.ts`.
 */
export const metadata: Metadata = createSeoMetadata({
  title: "Topaz Showroom Intelligence | DMC Tech",
  description:
    "Showroom intelligence and sales conversion system for Topaz Furniture: consent-based entry recognition, AI WhatsApp concierge, mobile quoting with GST, workshop tracking, and a live sales dashboard.",
  path: "/topaz-crm",
  noIndex: true,
});

export default function TopazCrmLayout({ children }: { children: React.ReactNode }) {
  return <div className={almarai.className}>{children}</div>;
}
