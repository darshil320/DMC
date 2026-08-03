import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Guides are generated from the same array that renders them, so a new guide
  // is never left out of the sitemap.
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/topaz-bg.jpg"),
        absoluteUrl("/opengraph-image"),
      ],
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [
        absoluteUrl("/assets/contact-union.webp"),
      ],
    },
    {
      url: absoluteUrl("/services"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...guidePages,
    {
      url: absoluteUrl("/start"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/work"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/demo/ai-visualizer"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        absoluteUrl("/assets/before.jpeg"),
        absoluteUrl("/assets/after.jpg"),
      ],
    },
    {
      url: absoluteUrl("/demo/furniture-concept-2.0"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
