import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FCHeaderV2 } from "@/components/demo/fc-header-v2";
import { FCHeroV2 } from "@/components/demo/fc-hero-v2";
import { FCIntroV2 } from "@/components/demo/fc-intro-v2";
import { FCStyleList } from "@/components/demo/fc-style-list";
import { FCProductFeatureV2 } from "@/components/demo/fc-product-feature-v2";
import { FCPreloader } from "@/components/demo/fc-preloader";
import { FCCartDrawer } from "@/components/demo/fc-cart-drawer";
import { PRODUCTS } from "@/lib/fc-content";

const FCProductGridV2 = dynamic(() => import("@/components/demo/fc-product-grid-v2").then(mod => mod.FCProductGridV2));
const FCBestsellersV2 = dynamic(() => import("@/components/demo/fc-bestsellers-v2").then(mod => mod.FCBestsellersV2));
const FCLegacy = dynamic(() => import("@/components/demo/fc-legacy").then(mod => mod.FCLegacy));
const FCPartners = dynamic(() => import("@/components/demo/fc-partners").then(mod => mod.FCPartners));
const FCShowroom = dynamic(() => import("@/components/demo/fc-showroom").then(mod => mod.FCShowroom));
const FCFooterDark = dynamic(() => import("@/components/demo/fc-footer-dark").then(mod => mod.FCFooterDark));

export const metadata: Metadata = {
  title: "Furniture Concept 2.0 — Modern Office Furniture in Surat | Demo by DMC",
  description:
    "Premium office chairs, executive desks, and modular workstations for modern workspaces. A live demo for Furniture Concept 2.0 by DMC.",
};

export default function FurnitureConceptsDemo() {
  // Force Tailwind v4 and Next.js to recompile the page to pick up the restored CSS variables
  return (
    <div
      className="bg-[#FAF7F0] text-[#1F1A16] min-h-screen"
      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
    >
      <FCPreloader />
      <FCHeaderV2 />
      <FCCartDrawer />

      <main>
        <FCHeroV2 />
        <FCIntroV2 />
        <FCStyleList />

        {/* Three product feature blocks */}
        <section id="products" className="border-t border-[#E6DED2]">
          {PRODUCTS.map((product, idx) => (
            <FCProductFeatureV2
              key={product.id}
              name={product.name}
              description={product.description}
              colors={product.colors}
              price={"price" in product ? product.price : undefined}
              showShopLink={"showShopLink" in product ? product.showShopLink : false}
              reverse={idx % 2 === 1}
            />
          ))}
        </section>

        <FCProductGridV2 />
        <FCBestsellersV2 />
        
        <FCLegacy />
        <FCPartners />
        <FCShowroom />
      </main>

      <FCFooterDark />
    </div>
  );
}
