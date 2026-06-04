import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { ContactPageExperience } from "@/components/sections/contact-page";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/layout/footer").then(m => m.Footer));

export const metadata: Metadata = {
  title: "Contact DMC - Digital Market Creators",
  description: "Start a website, catalog, ecommerce, or AI visualizer project with DMC.",
};

function ContactGridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div className="mx-auto flex h-full w-full max-w-[1440px] justify-between px-6 md:px-12 lg:px-16">
        <div className="h-full w-px bg-white/12" />
        <div className="hidden h-full w-px bg-white/12 md:block" />
        <div className="hidden h-full w-px bg-white/10 lg:block" />
        <div className="h-full w-px bg-white/12" />
      </div>
      <div className="absolute left-0 right-0 top-[184px] h-px bg-white/10" />
      <div className="absolute left-0 right-0 bottom-[19%] hidden h-px bg-white/10 lg:block" />
      <div className="absolute left-[calc(50%-528px)] top-[176px] hidden h-4 w-4 border-l border-t border-white lg:block" />
      <div className="absolute right-[calc(50%-528px)] top-[176px] hidden h-4 w-4 border-r border-t border-white lg:block" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-bg-page min-h-screen relative">
      <div className="relative z-10 min-h-screen bg-bg-page">
        <ContactGridOverlay />
        <Navbar />
        <ContactPageExperience />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
