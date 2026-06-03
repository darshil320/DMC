"use client";

import React from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { LinkArrow } from "./ui/LinkArrow";

export function IntroBlock() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto"
    >
      <AnimatedReveal>
        <SectionLabel>Why This Exists</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-6">
          {/* Left Column - Large Statement */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight tracking-tight max-w-[580px]">
            Most websites look fine. The problem is they do not say enough,
            guide enough, or convert enough.
          </h2>

          {/* Right Column - Body & Action */}
          <div className="flex flex-col items-start gap-8">
            <p className="text-text-secondary text-base leading-relaxed max-w-[540px]">
              Your audience is already landing on your website, checking your
              work, reading your offer, and deciding whether you are worth the
              conversation.
              <br />
              <br />
              We help you shape that experience with strategy, design, copy
              structure, and clean development — so your site stops acting like
              a brochure and starts working like a sales system.
            </p>

            <LinkArrow href="/contact" className="font-extrabold">
              Start With Strategy
            </LinkArrow>

            {/* Proof Points Pills */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {["Strategy-first", "Conversion-led", "Built to scale"].map((point) => (
                <span
                  key={point}
                  className="px-4 py-2 border border-border-subtle rounded-full text-xs font-bold uppercase tracking-wider text-text-primary bg-bg-card"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
export default IntroBlock;
