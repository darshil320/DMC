import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { UWHeaderV2 } from "@/components/demo/uw-header-v2";
import { UWHeroV2 } from "@/components/demo/uw-hero-v2";
import { UWIntroV2 } from "@/components/demo/uw-intro-v2";
import { UWStyleList } from "@/components/demo/uw-style-list";
import { UWProductFeatureV2 } from "@/components/demo/uw-product-feature-v2";
import { UWPreloader } from "@/components/demo/uw-preloader";
import { UWCartDrawer } from "@/components/demo/uw-cart-drawer";
import { PRODUCTS } from "@/lib/uw-content";

const UWProductGridV2 = dynamic(() => import("@/components/demo/uw-product-grid-v2").then(mod => mod.UWProductGridV2));
const UWBestsellersV2 = dynamic(() => import("@/components/demo/uw-bestsellers-v2").then(mod => mod.UWBestsellersV2));
const UWLegacy = dynamic(() => import("@/components/demo/uw-legacy").then(mod => mod.UWLegacy));
const UWPartners = dynamic(() => import("@/components/demo/uw-partners").then(mod => mod.UWPartners));
const UWShowroom = dynamic(() => import("@/components/demo/uw-showroom").then(mod => mod.UWShowroom));
const UWFooterDark = dynamic(() => import("@/components/demo/uw-footer-dark").then(mod => mod.UWFooterDark));

export const metadata: Metadata = {
  title: "Furniture Concept 2.0 — Modern Office Furniture in Surat | Demo by DMC",
  description:
    "Premium office chairs, executive desks, and modular workstations for modern workspaces. A live demo for Furniture Concept 2.0 by DMC.",
};

export default function UrbanWoodDemo() {
  // Force Tailwind v4 and Next.js to recompile the page to pick up the restored CSS variables
  return (
    <div
      className="bg-uw-bg-page min-h-screen"
      style={{ fontFamily: "var(--font-inter, sans-serif)", color: "var(--uw-text-primary)" }}
    >
      <UWPreloader />
      <UWHeaderV2 />
      <UWCartDrawer />

      <main>
        <UWHeroV2 />
        <UWIntroV2 />
        <UWStyleList />

        {/* Three product feature blocks */}
        <section id="products" className="border-t border-uw-border-subtle">
          {PRODUCTS.map((product, idx) => (
            <UWProductFeatureV2
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

        <UWProductGridV2 />
        <UWBestsellersV2 />
        
        <UWLegacy />
        <UWPartners />
        <UWShowroom />
      </main>

      <UWFooterDark />
    </div>
  );
}
