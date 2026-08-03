import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/", "/assets/", "/opengraph-image", "/twitter-image"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/assets/", "/opengraph-image", "/twitter-image", "/icon.png"],
      },
      // Explicit allow for the answer engines. Their default is already to
      // crawl, but stating it means a future change to that default doesn't
      // quietly remove us from the citation pool.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/topaz-crm"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
