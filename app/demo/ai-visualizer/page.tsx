import type { Metadata } from "next";
import AIVisualizerClient from "./visualizer-client";
import {
  VisualizerHeader,
  VisualizerIntro,
  VisualizerMarketing,
} from "./visualizer-static";

export const metadata: Metadata = {
  title: "AI Room Visualizer — See Furniture in Your Home | DMC Digital",
  description:
    "Upload a photo of your room, pick a furniture piece, and see it placed in your space — instantly. A demo tool by DMC Digital.",
};

export default function AIVisualizerPage() {
  return (
    <div
      className="bg-[#F4F1ED]"
      style={{ fontFamily: "var(--font-inter, sans-serif)", color: "#2C2A26" }}
    >
      <VisualizerHeader />
      <AIVisualizerClient intro={<VisualizerIntro />} />
      <VisualizerMarketing />
    </div>
  );
}
