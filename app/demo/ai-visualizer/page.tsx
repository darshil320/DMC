import type { Metadata } from "next";
import AIVisualizerClient from "./visualizer-client";
import {
  VisualizerHeader,
  VisualizerIntro,
  VisualizerMarketing,
} from "./visualizer-static";
import { JsonLd } from "@/components/seo/json-ld";
import {
  aiVisualizerJsonLd,
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const title = "AI Room Visualizer Demo | Furniture Visualization by DMC Tech";
const description =
  "Try DMC Tech's AI room visualizer demo: upload a room photo, choose furniture, and preview products in your space with realistic AI placement.";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path: "/demo/ai-visualizer",
  keywords: [
    "AI room visualizer",
    "furniture visualization app",
    "AI furniture website",
    "furniture store website demo",
  ],
});

export default function AIVisualizerPage() {
  return (
    <div
      className="bg-[#F4F1ED]"
      style={{ fontFamily: "var(--font-inter, sans-serif)", color: "#2C2A26" }}
    >
      <JsonLd
        id="ai-visualizer-json-ld"
        data={[
          organizationJsonLd(),
          aiVisualizerJsonLd(),
          webPageJsonLd({
            path: "/demo/ai-visualizer",
            name: title,
            description,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI Room Visualizer", path: "/demo/ai-visualizer" },
          ]),
        ]}
      />
      <VisualizerHeader />
      <AIVisualizerClient intro={<VisualizerIntro />} />
      <VisualizerMarketing />
    </div>
  );
}
