import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import { GUIDES } from "@/lib/guides";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const Footer = dynamic(() => import("@/components/layout/footer").then((m) => m.Footer));

const title = "Guides | DMC Tech — Costs, Timelines & How to Choose";
const description =
  "Straight answers on what custom software costs in India, how long an MVP takes, and whether to hire an agency, a freelancer, or in-house. Real numbers, no contact form in the way.";
const path = "/guides";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path,
  keywords: [
    "custom software development cost",
    "MVP development timeline",
    "agency vs freelancer software development",
    "software development guides India",
  ],
});

export default function GuidesIndexPage() {
  return (
    <div className="relative min-h-screen bg-bg-page">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <JsonLd
          id="guides-json-ld"
          data={[
            organizationJsonLd(),
            webPageJsonLd({ path, name: title, description }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${absoluteUrl(path)}#list`,
              name: "DMC Tech guides",
              itemListElement: GUIDES.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: guide.title,
                url: absoluteUrl(`/guides/${guide.slug}`),
              })),
            },
          ]}
        />
        <Navbar />

        <main className="relative z-10 bg-bg-page">
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-32 md:px-12 lg:px-16">
            <div className="section-tag">GUIDES</div>
            <h1 className="mb-6 max-w-[840px] text-4xl font-medium uppercase leading-[0.95] tracking-tighter text-text-primary md:text-6xl">
              Straight answers, with the numbers in them
            </h1>
            <p className="mb-16 max-w-[720px] border-l-2 border-accent pl-5 text-lg leading-relaxed text-text-primary">
              What custom software actually costs in India, how long an MVP really takes, and how to
              choose between an agency, a freelancer, and hiring in-house. Written for people
              deciding how to spend real money, with the prices published rather than hidden behind
              a call.
            </p>

            <div className="grid grid-cols-1 border-l border-t border-border-harsh md:grid-cols-2 xl:grid-cols-3">
              {GUIDES.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group relative flex flex-col border-b border-r border-border-harsh p-8 transition-colors hover:bg-accent"
                >
                  <span className="mb-4 font-pixel text-[10px] font-bold uppercase tracking-[0.2em] text-accent group-hover:text-white/70">
                    {guide.readingTime} read
                  </span>
                  <h2 className="mb-4 text-xl font-bold tracking-tight text-text-primary group-hover:text-white">
                    {guide.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary group-hover:text-white/80">
                    {guide.answer.slice(0, 160)}…
                  </p>
                  <span className="mt-auto text-[11px] font-black uppercase tracking-[0.18em] text-accent group-hover:text-white">
                    Read the guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>

      <StickyMobileCta />
    </div>
  );
}
