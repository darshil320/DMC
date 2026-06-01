import type { Metadata } from "next";
import { FCHeaderV2 } from "@/components/demo/fc-header-v2";
import { FCStoreHero } from "@/components/demo/fc-store-hero";
import { FCStoreProductGrid } from "@/components/demo/fc-store-product-grid";
import { FCFooterDark } from "@/components/demo/fc-footer-dark";
import { FCCartDrawer } from "@/components/demo/fc-cart-drawer";

export const metadata: Metadata = {
  title: "Outdoor Lounge Furniture | Furniture Concepts 2.0 Store",
  description: "Explore our premium collection of outdoor lounge furniture. Designed for comfort and durability.",
};

export default function FurnitureConceptsStorePage() {
  return (
    <div
      className="bg-[#FAF7F0] text-[#1F1A16] min-h-screen flex flex-col"
      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
    >
      <FCHeaderV2 />
      <FCCartDrawer />

      <main className="flex-1 flex flex-col">
        <FCStoreHero />
        <FCStoreProductGrid />
      </main>

      <FCFooterDark />
    </div>
  );
}
