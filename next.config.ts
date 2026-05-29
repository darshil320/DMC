import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ───
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
    // Aggressive image optimization
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── Compression ───
  compress: true,

  // ─── Performance Headers ───
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
    {
      // Aggressive caching for static assets
      source: "/(.*)\\.(js|css|woff2|woff|ttf|otf|ico|svg|png|jpg|jpeg|webp|avif)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // ─── Experimental Performance ───
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "framer-motion",
      "motion",
      "lucide-react",
      "@tabler/icons-react",
      "gsap",
    ],
  },

  // ─── Powered-by Header Removal ───
  poweredByHeader: false,

  // ─── React strict mode for dev ───
  reactStrictMode: true,
};

export default nextConfig;
