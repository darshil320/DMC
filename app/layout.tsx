import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SpinningRound } from "@/components/ui/SpinningRound";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-dot",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMC — Digital Market Creators | Premium Concept",
  description:
    "DMC helps local shops and service businesses build modern websites.",
  metadataBase: new URL("https://dmcdigital.in"),
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
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <SpinningRound />
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
