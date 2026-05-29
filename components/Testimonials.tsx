"use client";

import React from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto select-none"
    >
      <AnimatedReveal className="mb-16 md:mb-20">
        <SectionLabel>Feedback</SectionLabel>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight tracking-tight mt-4">
          What founders say about the systems we build.
        </h2>
      </AnimatedReveal>

      {/* Grid of testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((card, idx) => (
          <AnimatedReveal
            key={card.name}
            delay={idx * 0.1}
            className="flex"
          >
            <div className="bg-bg-card rounded-2xl md:rounded-3xl border border-border-subtle p-8 md:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-text-primary transition-colors duration-500">
              {/* Giant Decorative Quotation Mark */}
              <div className="absolute -top-4 right-2 text-bg-page/40 group-hover:text-bg-page/75 transition-colors duration-500 text-[160px] font-black pointer-events-none select-none select-none font-serif leading-none">
                “
              </div>

              {/* Quote Body */}
              <div className="relative z-10">
                <p className="text-text-primary text-base md:text-lg font-bold leading-relaxed mb-10 tracking-tight">
                  “{card.quote}”
                </p>
              </div>

              {/* Metadata / Author */}
              <div className="flex items-center gap-4 border-t border-border-subtle pt-6 relative z-10">
                {/* Initials Badge as Portrait Placeholder */}
                <div className="w-10 h-10 rounded-full bg-accent-soft text-accent text-xs font-black uppercase flex items-center justify-center shrink-0 tracking-wider">
                  {card.initials}
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-text-primary leading-none">
                    {card.name}
                  </h4>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1.5 font-bold">
                    {card.role} · {card.company}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
export default Testimonials;
