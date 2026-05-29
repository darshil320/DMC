import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";
import { AuthProvider } from "@/components/providers/auth-provider";

// Lazy-load decorative, non-critical components
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor").then(m => m.CustomCursor));
const SpinningRound = dynamic(() => import("@/components/ui/SpinningRound").then(m => m.SpinningRound));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-dot",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101114",
};

export const metadata: Metadata = {
  title: "DMC — Digital Market Creators | Premium Concept",
  description:
    "DMC helps local shops and service businesses build modern websites that educate, qualify, and convert local customers.",
  metadataBase: new URL("https://dmcdigital.in"),
  openGraph: {
    title: "DMC — Digital Market Creators",
    description: "Premium websites for local businesses. Take your business online.",
    siteName: "DMC Digital",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* DNS prefetch for external image hosts */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <SmoothScrollProvider>
            <Preloader />
            <CustomCursor />
            <SpinningRound />
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
