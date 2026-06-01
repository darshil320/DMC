"use client";

import React, { useState } from "react";
import { DMC } from "@/lib/dmc-config";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { EncryptedText } from "@/components/ui/encrypted-text";

const HEADING_STYLE = {
  fontSize: "clamp(48px, 11vw, 150px)",
  letterSpacing: "-0.05em",
  fontFamily: "var(--font-body)",
} as const;

export function HeroSection() {
  const [hoverKey, setHoverKey] = useState(0);
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-between pt-28 lg:pt-32 pb-6 px-6 md:px-12 lg:px-16 bg-transparent select-none overflow-visible">

      {/* ── Centered headline block ── */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto relative z-10">
        
        {/* Heading wrapper — relative so paragraph positions inside it */}
        <div className="w-full text-center relative">

          <AnimatedReveal className="w-full text-center">
            {/* Line 1: TAKE YOUR */}
            <h1 className="text-text-primary uppercase leading-[0.9] font-black" style={HEADING_STYLE}>
              Take Your
            </h1>

            {/* Line 2: LOCAL BUSINESS */}
            <h1 className="text-text-primary uppercase leading-[0.9] font-black" style={HEADING_STYLE}>
              Local Business
            </h1>

            {/* Line 3: ONLINE. in border box */}
            <div className="inline-block relative mt-[-0.05em]">
              <div className="relative px-[0.2em] py-[0.08em]">
                <h1 className="text-text-primary uppercase leading-[0.9] font-black relative z-10" style={HEADING_STYLE}>
                  Online.
                </h1>
                <div className="absolute inset-0 border border-accent pointer-events-none" />
                <div className="absolute -top-[4px] -left-[4px] w-[8px] h-[8px] bg-accent" />
                <div className="absolute -top-[4px] -right-[4px] w-[8px] h-[8px] bg-accent" />
                <div className="absolute -bottom-[4px] -left-[4px] w-[8px] h-[8px] bg-accent" />
                <div className="absolute -bottom-[4px] -right-[4px] w-[8px] h-[8px] bg-accent" />
              </div>
            </div>
          </AnimatedReveal>

          {/* ── Paragraph — positioned INSIDE heading wrapper, at the top-right ── */}
          <div className="hidden md:block absolute top-0 right-6 max-w-[200px] lg:max-w-[220px] text-left z-20">
            <p className="text-[12px] lg:text-[13px] text-text-secondary leading-[1.5]" style={{ textAlign: "justify" }}>
              We build custom websites for local businesses who have attention but need more footfall – turning your traffic into a digital storefront that educates, qualifies, and converts local customers.
            </p>
          </div>
        </div>

        {/* Mobile-only paragraph */}
        <div className="md:hidden mt-8 max-w-xs mx-auto">
          <p className="text-[12px] text-text-secondary leading-[1.5] text-center">
            We build custom websites for local businesses who have attention but need more footfall – turning your traffic into a digital storefront that educates, qualifies, and converts local customers.
          </p>
        </div>

        {/* ── CTA Button ── */}
        <AnimatedReveal delay={0.15} className="mt-10 md:mt-12 flex items-center justify-center relative z-20">
          <a
            href="#contact"
            className="group flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoverKey(prev => prev + 1)}
          >
            <div className="border border-accent text-accent bg-transparent text-[11px] md:text-xs tracking-widest uppercase transition-colors group-hover:bg-accent group-hover:text-white flex items-center justify-center h-[40px] md:h-[44px] w-[180px] md:w-[200px] rounded-md">
              <div className="hidden group-hover:block w-full text-center">
                <EncryptedText 
                  key={hoverKey}
                  text="LET'S BUILD YOURS"
                  revealDelayMs={30}
                  flipDelayMs={30}
                />
              </div>
              <div className="block group-hover:hidden w-full text-center">
                LET'S BUILD YOURS
              </div>
            </div>
            
            <div className="flex items-center justify-center h-[40px] w-[40px] md:h-[44px] md:w-[44px] border border-accent bg-accent text-white transition-all group-hover:bg-transparent group-hover:text-accent rounded-md">
              {/* Default Arrow (Diagonal) */}
              <svg className="block group-hover:hidden size-5" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                <line x1="64" y1="192" x2="192" y2="64"></line>
                <polyline points="88 64 192 64 192 168"></polyline>
              </svg>
              {/* Hover Arrow (Right) */}
              <svg className="hidden group-hover:block size-5" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                <line x1="40" y1="128" x2="216" y2="128"></line>
                <polyline points="144 56 216 128 144 200"></polyline>
              </svg>
            </div>
          </a>
        </AnimatedReveal>
      </div>

      {/* ── Bottom bar ── */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary z-10 relative">
        <div className="flex items-center gap-1">
          <a href="#" className="hover:text-accent transition-colors">INSTAGRAM,</a>
          <a href="#" className="hover:text-accent transition-colors ml-1">LINKEDIN,</a>
        </div>
        
        <a href="#services" className="text-accent hover:text-text-primary transition-colors flex items-center gap-2 font-bold lowercase">
          <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" className="shrink-0">
            <path d="m204.24 148.24l-72 72a6 6 0 0 1-8.48 0l-72-72a6 6 0 0 1 8.48-8.48L122 201.51V40a6 6 0 0 1 12 0v161.51l61.76-61.75a6 6 0 0 1 8.48 8.48" />
          </svg>
          scroll down
        </a>

        <a href={`mailto:${DMC.email}`} className="hover:text-accent transition-colors lowercase">
          {DMC.email}
        </a>
      </div>
    </section>
  );
}
