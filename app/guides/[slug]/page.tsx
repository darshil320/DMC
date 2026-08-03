import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { GuidePageContent } from "@/components/sections/guide-page";
import { JsonLd } from "@/components/seo/json-ld";
import { StickyMobileCta } from "@/components/ui/StickyMobileCta";
import { GUIDES, getGuide } from "@/lib/guides";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createSeoMetadata,
  faqJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const Footer = dynamic(() => import("@/components/layout/footer").then((m) => m.Footer));

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return {};

  return createSeoMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    keywords: [...guide.keywords],
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;

  return (
    <div className="relative min-h-screen bg-bg-page">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <JsonLd
          id={`guide-${guide.slug}-json-ld`}
          data={[
            organizationJsonLd(),
            webPageJsonLd({ path, name: guide.metaTitle, description: guide.metaDescription }),
            articleJsonLd({
              path,
              headline: guide.title,
              description: guide.answer,
              datePublished: guide.updated,
              dateModified: guide.updated,
            }),
            faqJsonLd([...guide.faq]),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: guide.metaTitle, path },
            ]),
          ]}
        />
        <Navbar />
        <GuidePageContent guide={guide} />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>

      <StickyMobileCta />
    </div>
  );
}
