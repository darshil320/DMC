import type { Metadata } from "next";
import { Inter, DotGothic16 } from "next/font/google";
import "./globals.css";
import { ClientChrome } from "@/components/layout/ClientChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dotGothic = DotGothic16({
  variable: "--font-dot",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMC — Digital Market Creators | Brutalist Concept",
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
      className={`${inter.variable} ${dotGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ClientChrome>{children}</ClientChrome>
      </body>
    </html>
  );
}
