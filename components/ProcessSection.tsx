"use client";

import React from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { processSteps } from "@/lib/content";

function StepVisual({ step }: { step: string }) {
  if (step === "01") {
    // Strategy flow chart visual
    return (
      <div className="w-full h-[180px] bg-bg-card rounded-2xl border border-border-subtle p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-muted">
          <span>Flow Architecture</span>
          <span className="text-accent">Goal: Conversion</span>
        </div>
        <div className="flex justify-between items-center gap-2 mt-4">
          <div className="flex-1 bg-bg-page/70 border border-border-subtle rounded-xl p-2.5 text-center text-[10px] font-bold text-text-primary">
            1. Attention
          </div>
          <span className="text-text-muted font-bold text-sm">→</span>
          <div className="flex-1 bg-accent-soft border border-accent/20 rounded-xl p-2.5 text-center text-[10px] font-bold text-accent">
            2. Qualify
          </div>
          <span className="text-text-muted font-bold text-sm">→</span>
          <div className="flex-1 bg-bg-dark border border-neutral-800 rounded-xl p-2.5 text-center text-[10px] font-bold text-white">
            3. Book
          </div>
        </div>
        <div className="text-[10px] text-text-secondary leading-relaxed border-t border-border-subtle pt-3 mt-3 text-center font-medium">
          Mapping path: traffic source to qualified lead calendar event.
        </div>
      </div>
    );
  }

  if (step === "02") {
    // Design / experience layout visual
    return (
      <div className="w-full h-[180px] bg-bg-card rounded-2xl border border-border-subtle p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-muted">
          <span>Grid System</span>
          <span>Typography // Scale</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div className="col-span-2 border border-border-subtle rounded-lg p-2.5 bg-bg-page/35">
            <div className="w-8 h-2 bg-accent rounded mb-2" />
            <div className="w-full h-1 bg-text-primary rounded mb-1" />
            <div className="w-16 h-1 bg-text-secondary rounded" />
          </div>
          <div className="border border-border-subtle rounded-lg p-2.5 bg-bg-page/35 flex flex-col justify-between">
            <div className="w-5 h-5 rounded-full bg-accent" />
            <div className="w-full h-1 bg-text-muted rounded" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-text-muted border-t border-border-subtle pt-3 mt-3 font-semibold">
          <span>Font: Geist Grotesk</span>
          <span>Colors: Warm Mono + Accent</span>
        </div>
      </div>
    );
  }

  // Development / Systems automation visual
  return (
    <div className="w-full h-[180px] bg-bg-dark border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between overflow-hidden text-neutral-400">
      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-neutral-500">
        <span>Systems Automation</span>
        <span className="text-green-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live Hook
        </span>
      </div>
      <div className="space-y-2 mt-4 font-mono text-[10px]">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-1.5">
          <span className="text-neutral-500">onSubmit()</span>
          <span className="text-white">Trigger Hook</span>
        </div>
        <div className="flex justify-between items-center border-b border-neutral-800 pb-1.5">
          <span className="text-neutral-500">qualifyLead()</span>
          <span className="text-accent">Route: CRM Lead Pipeline</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-500">calendarSync()</span>
          <span className="text-white">Confirmed Booking Event</span>
        </div>
      </div>
      <div className="text-[9px] uppercase font-bold text-center tracking-wider text-neutral-600 border-t border-neutral-850 pt-2.5">
        Connecting website entries to operations
      </div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto select-none"
    >
      <AnimatedReveal>
        <SectionLabel>Process</SectionLabel>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight tracking-tight max-w-[620px] mb-16 md:mb-24 mt-4">
          How we turn a website into a working client acquisition system.
        </h2>
      </AnimatedReveal>

      {/* Steps checklist */}
      <div className="flex flex-col">
        {processSteps.map((step) => (
          <AnimatedReveal key={step.number}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-border-subtle pt-12 pb-20 first:border-t-2 first:border-text-primary last:border-b last:border-border-subtle">
              {/* Step info col (5 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div>
                  <div className="text-7xl md:text-8xl lg:text-[100px] font-black leading-none tracking-tighter text-border-subtle select-none">
                    {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mt-4 leading-none">
                    {step.title}
                  </h3>
                  <div className="text-[12px] uppercase font-bold tracking-widest text-accent mt-2">
                    {step.subtitle}
                  </div>
                </div>

                {/* Render the custom abstract HTML mockup block */}
                <div className="max-w-[380px] w-full mt-4">
                  <StepVisual step={step.number} />
                </div>
              </div>

              {/* Step details col (7 columns) */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-8 lg:pl-8">
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-medium">
                  {step.description}
                </p>

                {/* Deliverables list */}
                <div>
                  <div className="text-[11px] uppercase font-bold tracking-wider text-text-muted mb-4">
                    Key Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {step.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm font-semibold text-text-primary border border-border-subtle rounded-xl p-3.5 bg-bg-card/50"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </div>
                    ))}
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
export default ProcessSection;
