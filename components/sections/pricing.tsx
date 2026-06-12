"use client";

import React from "react";
import { Clock } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { DMC } from "@/lib/dmc-config";

const formatPrice = (num: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

const OPTIONS = [
  {
    num: "01",
    title: "Digital Presence",
    time: "2 - 4 Weeks",
    price: formatPrice(DMC.pricing.starter) + "+",
    desc: "High-converting custom websites and online catalogs designed to generate leads and sell products. We don't use templates—every pixel is built to position you as the premium option.",
    tags: ["Custom Website", "Ecommerce Store", "Google Business", "SEO Optimized"],
    graphic: (
      <div className="w-full h-full border border-border-harsh rounded-lg p-2 flex flex-col items-center justify-center relative bg-bg-card">
        <div className="w-px h-full bg-border-harsh absolute top-0" />
        <div className="w-12 h-px bg-border-harsh my-1" />
        <div className="w-16 h-px bg-border-harsh my-1" />
        <div className="size-1.5 bg-black rounded-full my-1 z-10" />
        <div className="w-20 h-px bg-border-harsh my-1" />
        <div className="size-1 bg-black rounded-full absolute bottom-2" />
        <div className="size-1 bg-black rounded-full absolute top-2" />
      </div>
    ),
  },
  {
    num: "02",
    title: "Business Intelligence",
    time: "4 - 8 Weeks",
    price: "Custom Scope",
    desc: "Stop losing leads to manual follow-ups. We build centralized CRMs and connect them to autonomous WhatsApp AI agents that answer queries, qualify prospects, and book meetings for you 24/7.",
    tags: ["WhatsApp AI", "Lead CRM", "Automated Follow-ups", "Analytics Dashboard"],
    graphic: (
      <div className="w-full h-full border border-border-harsh rounded-lg p-2 flex flex-col items-center justify-center relative bg-bg-card">
        <div className="w-px h-full bg-border-harsh absolute top-0" />
        <div className="absolute top-2 w-full flex justify-center"><div className="size-1 bg-black rounded-full" /></div>
        <div className="w-16 h-px bg-border-harsh my-1.5" />
        <div className="w-16 h-px bg-border-harsh my-1.5" />
        <div className="w-16 h-px bg-border-harsh my-1.5" />
        <div className="w-16 h-px bg-border-harsh my-1.5" />
      </div>
    ),
  },
  {
    num: "03",
    title: "Complete OS",
    time: "12+ Weeks",
    price: "Custom Scope",
    desc: "The heavy-weight solution for scaling businesses. We architect complete digital operating systems that connect your inventory, staff, retail branches, and digital channels into one unified platform.",
    tags: ["Custom ERP", "Face Recognition", "Multi-branch Sync", "Total Automation"],
    graphic: (
      <div className="w-full h-full border border-border-harsh rounded-lg p-2 flex items-center justify-center relative bg-bg-card">
        <div className="w-full h-px bg-border-harsh absolute" />
        <div className="h-full w-px bg-border-harsh absolute" />
        <div className="size-8 border border-border-harsh rounded-full flex items-center justify-center bg-white z-10">
          <div className="size-2 bg-accent rounded-full" />
        </div>
      </div>
    ),
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page relative z-10">
      <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center">
        
        {/* Header (Screenshot 4) */}
        <div className="section-tag">
          OUR SERVICES
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-text-primary tracking-tighter text-center max-w-[800px] mb-20">
          THREE OPTIONS. ONE GOAL.
        </h2>

        {/* Options List */}
        <div className="w-full flex flex-col">
          {OPTIONS.map((opt, idx) => (
            <AnimatedReveal key={opt.num} delay={idx * 0.1} className="w-full relative border-t border-border-harsh pt-6 pb-20">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Number & Title (Cols 1-4) */}
                <div className="lg:col-span-4 flex gap-3 px-4 lg:px-6">
                  <span className="font-display font-bold text-xs mt-1.5">{opt.num}</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-tighter font-medium text-text-primary">
                    {opt.title}
                  </h3>
                </div>

                {/* Description & Tags (Cols 5-9) */}
                <div className="lg:col-span-5 flex flex-col gap-6 pt-2 px-4 lg:px-8 border-l-0 lg:border-l border-border-harsh/30 h-full">
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {opt.desc}
                  </p>
                  <div className="flex flex-col gap-1">
                    {opt.tags.map((tag) => (
                      <span key={tag} className="text-accent text-sm tracking-tight font-medium cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time & Graphic (Cols 10-12) */}
                <div className="lg:col-span-3 flex flex-col items-end gap-6 pt-2 px-4 lg:px-6">
                  <div className="flex flex-col items-end gap-2 text-right">
                    <span className="font-serif text-2xl lg:text-3xl text-text-primary tracking-tight font-medium">
                      {opt.price}
                    </span>
                    <div className="flex items-center gap-2 text-text-primary/60 font-medium text-sm">
                      <Clock className="size-4" />
                      {opt.time}
                    </div>
                  </div>
                  <div className="w-[140px] h-[100px] mt-4">
                    {opt.graphic}
                  </div>
                </div>
              </div>

            </AnimatedReveal>
          ))}
          <div className="w-full h-px bg-border-harsh" />
        </div>

      </div>
    </section>
  );
}
