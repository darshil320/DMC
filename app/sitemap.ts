import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/full-hero.jpeg"),
        absoluteUrl("/section-services.jpeg"),
        absoluteUrl("/section-featured.jpeg"),
        absoluteUrl("/section-pricing.jpeg"),
        absoluteUrl("/assets/after.png"),
      ],
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/demo/ai-visualizer"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        absoluteUrl("/assets/before.jpeg"),
        absoluteUrl("/assets/after.png"),
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
