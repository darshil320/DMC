"use client";

import React from "react";
import { DMC } from "@/lib/dmc-config";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-between pt-32 lg:pt-40 pb-10 px-6 md:px-12 lg:px-16 bg-transparent select-none">
      {/* Top right paragraph (as in the screenshot) */}
      <div className="absolute top-24 lg:top-32 right-6 md:right-12 lg:right-16 hidden lg:block max-w-[320px] z-50">
        <div className="p-4">
          <p className="text-sm text-text-secondary leading-snug">
            We build custom websites for local businesses who have attention but need more footfall - 
            turning your traffic into a digital storefront that educates, qualifies, and converts local customers.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto mt-20 md:mt-32 z-10">
        
        {/* Massive Headline */}
        <AnimatedReveal className="text-center w-full relative">
          <h1 
            className="text-text-primary uppercase tracking-tighter leading-[0.9] font-medium w-full"
            style={{ fontSize: "clamp(48px, 11vw, 150px)" }}
          >
            <div className="block">Take Your</div>
            <div className="block">
              Local Business <span className="inline-block text-accent font-bold">Online.</span>
            </div>
          </h1>
        </AnimatedReveal>

        {/* Brutalist Button Group */}
        <AnimatedReveal delay={0.2} className="mt-16 flex items-center justify-center relative z-20">
          <img 
            src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/691df85560dcfc6a761612b1_Finger%20Point%20Right.svg" 
            loading="lazy" 
            alt="Point" 
            className="absolute -left-16 md:-left-20 top-1/2 -translate-y-1/2 w-10 md:w-14 h-auto hidden md:block" 
            style={{ transform: "rotate(9.7deg)" }} 
          />
          <a
            href="#contact"
            className="bg-accent text-white px-8 py-4 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-accent border-2 border-accent transition-colors flex items-center h-12 md:h-14"
          >
            Let's Build Yours
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center h-12 md:h-14 w-12 md:w-14 border-2 border-l-0 border-accent text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <ThinArrowUpRight className="size-5" />
          </a>
        </AnimatedReveal>
      </div>

      {/* Bottom Anchor Links */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mt-20 text-[10px] md:text-xs font-medium uppercase text-text-primary z-10 relative bg-bg-page/50 py-2">
        <div className="flex items-center gap-2">
          <a href="#" className="hover:text-accent">INSTAGRAM</a>,
          <a href="#" className="hover:text-accent">LINKEDIN</a>
        </div>
        
        <a href="#services" className="text-accent font-bold hover:text-text-primary flex items-center gap-2">
          ↓ SCROLL DOWN
        </a>

        <a href={`mailto:${DMC.email}`} className="hover:text-accent uppercase">
          {DMC.email}
        </a>
      </div>
    </section>
  );
}
