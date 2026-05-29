import type { Metadata } from "next";
import { UWHeaderV2 } from "@/components/demo/uw-header-v2";
import { UWStoreHero } from "@/components/demo/uw-store-hero";
import { UWStoreProductGrid } from "@/components/demo/uw-store-product-grid";
import { UWFooterDark } from "@/components/demo/uw-footer-dark";
import { UWCartDrawer } from "@/components/demo/uw-cart-drawer";

export const metadata: Metadata = {
  title: "Outdoor Lounge Furniture | UrbanWood Store",
  description: "Explore our premium collection of outdoor lounge furniture. Designed for comfort and durability.",
};

export default function UrbanWoodStorePage() {
  return (
    <div
      className="bg-uw-bg-page min-h-screen flex flex-col"
      style={{ fontFamily: "var(--font-inter, sans-serif)", color: "var(--uw-text-primary)" }}
    >
      <UWHeaderV2 />
      <UWCartDrawer />

      <main className="flex-1 flex flex-col">
        <UWStoreHero />
        <UWStoreProductGrid />
      </main>

      <UWFooterDark />
    </div>
  );
}
