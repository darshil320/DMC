"use client";

import React from "react";
import { Check } from "lucide-react";
import { DMC } from "@/lib/dmc-config";

export function FeaturedOfferSection() {
  return (
    <section className="w-full bg-bg-page relative select-none border-y border-border-subtle py-24">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-2xl border border-border-subtle overflow-hidden bg-bg-card/30 backdrop-blur-sm">
        
        {/* Left Side - Typography */}
        <div className="p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-card/50 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-accent/5 opacity-50 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <span className="w-8 h-px bg-accent" />
            <span className="text-[10px] font-sans text-accent uppercase tracking-[0.2em]">Featured Package</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-primary mb-6 relative z-10 leading-[1.1]">
            The Online <br />
            <span className="italic text-text-secondary">Catalog.</span>
          </h2>
          
          <p className="text-text-secondary text-sm md:text-base font-sans font-light leading-relaxed max-w-[400px] mb-12 relative z-10">
            The perfect starting point for retail stores and furniture shops. Get your entire inventory online with direct WhatsApp ordering in just 14 days.
          </p>

          <div className="relative z-10">
            <div className="font-display text-4xl md:text-5xl text-text-primary font-medium mb-2">
              ₹25,000<span className="text-xl text-text-muted ml-1">+</span>
            </div>
            <span className="text-text-muted text-[10px] font-sans uppercase tracking-[0.2em]">One-time setup fee</span>
          </div>
        </div>

        {/* Right Side - Checklist */}
        <div className="p-8 md:p-16 flex flex-col justify-center relative">
          <ul className="flex flex-col gap-6">
            {[
              "Unlimited Products & Categories",
              "WhatsApp Enquiry on Every Product",
              "Custom Domain & Hosting Setup",
              "Mobile-First Responsive Design",
              "Google Business Profile Integration",
              "Product Photos & Details Management"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <div className="size-6 rounded-full border border-border-harsh bg-bg-page flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                  <Check className="size-3 text-accent" />
                </div>
                <span className="text-sm font-sans font-light text-text-primary tracking-wide">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={DMC.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 bg-bg-card text-text-primary border border-border-harsh px-8 py-4 text-xs font-sans tracking-[0.2em] uppercase rounded-full hover:bg-accent hover:text-bg-page hover:border-accent transition-all duration-300 text-center shadow-lg w-fit"
          >
            Claim This Offer
          </a>
        </div>

      </div>
    </section>
  );
}
