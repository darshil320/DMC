"use client";

import React from "react";
import { DMC } from "@/lib/dmc-config";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { CanvasText } from "@/components/ui/canvas-text";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[95vh] flex flex-col pt-32 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden select-none">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 mt-4 md:mt-0 flex-1">
        
        {/* Left Side: Elegant Headline */}
        <div className="flex-1 flex flex-col items-start w-full justify-center">
          <AnimatedReveal>
            <h1 className="text-text-primary font-display tracking-tight leading-[1.1] text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-medium flex flex-col items-start">
              <span>Take Your</span>
              <span className="italic text-text-secondary">Local Business</span>
              <CanvasText
                text="Online."
                colors={[
                  "rgba(125, 211, 252, 1)",
                  "rgba(125, 211, 252, 0.8)",
                  "rgba(125, 211, 252, 0.6)",
                  "rgba(125, 211, 252, 0.4)",
                  "rgba(125, 211, 252, 0.2)",
                  "rgba(125, 211, 252, 0.1)",
                ]}
                lineGap={2}
                animationDuration={25}
              />
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2} className="mt-12 flex items-center gap-4">
            <a
              href="#contact"
              className="bg-accent text-bg-page px-8 py-4 text-sm font-sans tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-bg-page transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Let's Build Yours
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center size-14 rounded-full border border-border-harsh text-text-primary hover:border-accent hover:text-accent transition-all duration-300"
            >
              <ThinArrowUpRight className="size-5" />
            </a>
          </AnimatedReveal>
        </div>

        {/* Right Side: Editorial Paragraph */}
        <div className="md:w-1/3 flex flex-col justify-center items-start md:items-end text-left md:text-right">
          <AnimatedReveal delay={0.3}>
            <p className="text-lg md:text-xl text-text-secondary font-sans font-light leading-relaxed max-w-[400px]">
              We build custom websites for local businesses who have attention but need more footfall—turning your traffic into a digital storefront that <strong className="text-text-primary font-normal">educates, qualifies, and converts</strong> local customers.
            </p>
          </AnimatedReveal>
        </div>
      </div>

      {/* Bottom Anchor Links */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto mt-auto pt-16 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-text-muted">
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
        </div>
        
        <a href="#services" className="text-accent hover:text-text-primary transition-colors flex items-center gap-2">
          ↓ Scroll to Explore
        </a>

        <a href={`mailto:${DMC.email}`} className="hover:text-accent transition-colors">
          {DMC.email}
        </a>
      </div>
    </section>
  );
}
