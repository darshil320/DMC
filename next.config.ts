import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: [
      "motion",
      "@tabler/icons-react",
      "lucide-react",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [60, 75, 85, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "replicate.delivery" },
      { protocol: "https", hostname: "**.replicate.delivery" },
    ],
  },

  async headers() {
    const serviceWorkerCleanupHeaders = {
      source: "/service-worker.js",
      headers: [
        { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
        { key: "Service-Worker-Allowed", value: "/" },
      ],
    };

    const securityHeaders = {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    };

    if (process.env.NODE_ENV !== "production") {
      return [
        serviceWorkerCleanupHeaders,
        {
          ...securityHeaders,
          headers: [
            ...securityHeaders.headers,
            { key: "Clear-Site-Data", value: '"cache"' },
          ],
        },
      ];
    }

    return [
      serviceWorkerCleanupHeaders,
      {
        source: "/:all*(woff2|woff|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      securityHeaders,
    ];
  },
};

export default nextConfig;
