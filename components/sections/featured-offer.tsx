"use client";

import React from "react";
import { Check } from "lucide-react";
import { DMC } from "@/lib/dmc-config";

export function FeaturedOfferSection() {
  return (
    <section className="w-full bg-accent relative select-none border-y border-border-harsh">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 relative z-10">
        
        {/* Left Side - Typography */}
        <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/20">
          <div className="section-tag">
            FEATURED PACKAGE
          </div>
          
          <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter leading-none text-white mb-6">
            THE WEBSITE <br />
            THAT SELLS.
          </h2>
          
          <p className="text-white text-base md:text-lg max-w-[400px] font-medium mb-12">
            A world-class starting point for retail stores and furniture shops. Get a premium website with your inventory online and direct WhatsApp ordering in 14 days.
          </p>

          <div className="font-display text-5xl md:text-6xl text-accent-lime font-bold mb-2">
            ₹45,000<span className="text-xl text-white/50">+</span>
          </div>
          <span className="text-white font-pixel font-bold tracking-widest uppercase">One-time setup fee</span>
        </div>

        {/* Right Side - Checklist */}
        <div className="p-6 md:p-12 lg:p-20 bg-bg-page flex flex-col justify-center">
          <ul className="flex flex-col border-t border-border-harsh">
            {[
              "World-Class Website Design",
              "Unlimited Products & Categories",
              "WhatsApp Enquiry on Every Product",
              "Custom Domain & Hosting Setup",
              "Mobile-First Responsive Design",
              "Google Business Profile Integration",
              "Product Photos & Details Management"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 py-4 border-b border-border-harsh group">
                <div className="size-6 border border-border-harsh bg-white flex items-center justify-center group-hover:bg-accent-lime group-hover:border-accent transition-colors">
                  <Check className="size-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-bold text-text-primary uppercase tracking-tight">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={DMC.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 bg-accent text-white border-2 border-accent px-8 py-4 text-xs font-bold uppercase tracking-widest text-center hover:bg-white hover:text-accent brutalist-shadow-blue transition-all"
          >
            Claim This Offer
          </a>
        </div>

      </div>
    </section>
  );
}
