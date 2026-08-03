import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { StartQuiz } from "@/components/sections/start-quiz";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const Footer = dynamic(() => import("@/components/layout/footer").then((m) => m.Footer));

const title = "Not sure what you need? | DMC Tech";
const description =
  "Three questions and you'll know which package fits, what it costs, and how long it takes. No call required.";
const path = "/start";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path,
  keywords: ["which software package do I need", "custom software quote India"],
});

export default function StartPage() {
  return (
    <div className="relative min-h-screen bg-bg-page">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <JsonLd
          id="start-json-ld"
          data={[
            organizationJsonLd(),
            webPageJsonLd({ path, name: title, description }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Start", path },
            ]),
          ]}
        />
        <Navbar />

        <main className="relative z-10 bg-bg-page">
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-32 md:px-12 lg:px-16">
            <h1 className="sr-only">
              Find out which DMC Tech package fits your business in three questions
            </h1>
            <StartQuiz />
          </div>
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
