import type { Metadata } from "next";
import { createSeoMetadata } from "@/lib/seo";

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
  return children;
}
