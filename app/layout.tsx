import type { Metadata } from "next";
import { Inter, DotGothic16, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const themeInitScript = `
try {
  const stored = localStorage.getItem("dmc-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
} catch (_) {}
`;

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
      className={`${inter.variable} ${dotGothic.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ClientChrome>{children}</ClientChrome>
      </body>
    </html>
  );
}
