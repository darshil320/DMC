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
    title: "Starter Website",
    time: "1 - 2 Weeks",
    price: formatPrice(DMC.pricing.starter) + "+",
    desc: "A streamlined single-page site that tells your complete story, showcases your best work, and guides visitors straight to booking. Perfect for focused offers or launching fast.",
    tags: ["5-Page Setup", "Mobile Responsive", "Contact Form", "Google Business"],
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
    title: "Online Catalog",
    time: "2 - 3 Weeks",
    price: formatPrice(DMC.pricing.catalog) + "+",
    desc: "Multi-page custom build with strategic structure. Your complete brand experience - portfolio, process, services, and story - all connected to convert traffic into qualified leads.",
    tags: ["Unlimited Products", "WhatsApp Enquiry", "Product Photos", "2 Revisions"],
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
    title: "Ecommerce Store",
    time: "3 - 5 Weeks",
    price: formatPrice(DMC.pricing.ecommerce) + "+",
    desc: "A fully functional online store. Accept payments, manage orders, and ship products directly to customers. Built for shops ready to scale their digital footprint.",
    tags: ["Online Payments", "Order Dashboard", "Shipping Setup", "Customer Accounts"],
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
            <AnimatedReveal key={opt.num} delay={idx * 0.1} className="w-full relative border-t border-border-harsh pt-6 pb-20 group">
              
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
                      <span key={tag} className="text-accent text-sm tracking-tight font-medium hover:underline cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time & Graphic (Cols 10-12) */}
                <div className="lg:col-span-3 flex flex-col items-end gap-6 pt-2 px-4 lg:px-6">
                  <div className="flex flex-col items-end gap-2 text-right">
                    {/* <span className="font-serif text-2xl lg:text-3xl text-text-primary tracking-tight font-medium">
                      {opt.price}
                    </span> */}
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
