import type { Metadata } from "next";
import AIVisualizerClient from "./visualizer-client";

export const metadata: Metadata = {
  title: "AI Room Visualizer — See Furniture in Your Home | DMC Digital",
  description:
    "Upload a photo of your room, pick a furniture piece, and see it placed in your space — instantly. A demo tool by DMC Digital.",
};

export default function AIVisualizerPage() {
  return <AIVisualizerClient />;
}
