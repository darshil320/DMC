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
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbJsonLd,
  createSeoMetadata,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const UWProductGridV2 = dynamic(() => import("@/components/demo/uw-product-grid-v2").then(mod => mod.UWProductGridV2));
const UWBestsellersV2 = dynamic(() => import("@/components/demo/uw-bestsellers-v2").then(mod => mod.UWBestsellersV2));
const UWLegacy = dynamic(() => import("@/components/demo/uw-legacy").then(mod => mod.UWLegacy));
const UWPartners = dynamic(() => import("@/components/demo/uw-partners").then(mod => mod.UWPartners));
const UWShowroom = dynamic(() => import("@/components/demo/uw-showroom").then(mod => mod.UWShowroom));
const UWFooterDark = dynamic(() => import("@/components/demo/uw-footer-dark").then(mod => mod.UWFooterDark));

const title = "Furniture Ecommerce Demo | Premium Furniture Website by DMC Tech";
const description =
  "Explore a premium furniture ecommerce website demo by DMC Tech with product storytelling, collections, showroom content, cart flow, and AI visualizer links.";

export const metadata: Metadata = createSeoMetadata({
  title,
  description,
  path: "/demo/furniture-concept-2.0",
  keywords: [
    "furniture ecommerce website demo",
    "furniture store website design",
    "premium product catalog website",
    "office furniture ecommerce",
  ],
});

export default function UrbanWoodDemo() {
  return (
    <div
      className="bg-uw-bg-page min-h-screen"
      style={{ fontFamily: "var(--font-inter, sans-serif)", color: "var(--uw-text-primary)" }}
    >
      <JsonLd
        id="furniture-demo-json-ld"
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            path: "/demo/furniture-concept-2.0",
            name: title,
            description,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Furniture Ecommerce Demo", path: "/demo/furniture-concept-2.0" },
          ]),
        ]}
      />
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
