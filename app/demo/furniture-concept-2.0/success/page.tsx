import type { Metadata } from "next";
import Link from "next/link";
import { UWHeaderV2 } from "@/components/demo/uw-header-v2";
import { UWFooterDark } from "@/components/demo/uw-footer-dark";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Order Confirmed | Furniture Ecommerce Demo",
  description: "Order confirmation page for the DMC Tech furniture ecommerce demo.",
  path: "/demo/furniture-concept-2.0/success",
  noIndex: true,
});

export default function SuccessPage() {
  return (
    <div
      className="bg-[#F4F1ED] min-h-screen flex flex-col"
      style={{ fontFamily: "var(--font-inter, sans-serif)", color: "#2C2A26" }}
    >
      <UWHeaderV2 />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center pt-32">
        <div className="w-16 h-16 rounded-full bg-green-900/10 flex items-center justify-center mb-8 mx-auto">
          <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-[32px] md:text-[48px] font-serif mb-4">
          Order Confirmed
        </h1>
        <p className="text-[15px] text-[#2C2A26]/60 max-w-md mx-auto mb-12">
          Thank you for your purchase. We&apos;ve sent a confirmation email with your order details and tracking information.
        </p>
        <Link 
          href="/demo/furniture-concept-2.0"
          className="inline-flex items-center justify-center bg-[#2C2A26] text-[#F4F1ED] px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-black transition-colors"
        >
          Return to Store
        </Link>
      </main>

      <UWFooterDark />
    </div>
  );
}
