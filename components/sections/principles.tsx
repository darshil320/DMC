"use client";

import React from "react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

/**
 * How we operate — the trust layer. Borrowed in spirit from devx's "Principles"
 * band, but written as concrete commitments a local-business owner can hold us
 * to (transparent pricing, real people, AI by default).
 */
const PRINCIPLES = [
  {
    num: "01",
    title: "Outcome-obsessed",
    body: "We measure success by what your business gains — more leads, less manual work, faster launches — not by how many pages we shipped.",
  },
  {
    num: "02",
    title: "Only ever honest",
    body: "Transparent pricing, zero hidden fees. We tell you what you actually need — even when that's less than you came to buy.",
  },
  {
    num: "03",
    title: "AI-native by default",
    body: "Every system we build assumes AI in the loop — chatbots, lead scoring, automation — so your operation runs leaner from day one.",
  },
  {
    num: "04",
    title: "We pick up the phone",
    body: "Ahmedabad-based. You talk to the people who build your system — in person when it matters, never a faceless ticket queue.",
  },
] as const;

export function PrinciplesSection() {
  return (
    <section
      id="principles"
      className="py-24 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page border-t border-border-harsh relative z-10"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 lg:px-6">
          <div>
            <div className="section-tag">HOW WE WORK</div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase max-w-[680px]">
              What you can count on.
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-medium max-w-[360px]">
            The same four principles run through every project — from a one-page site to a full business system.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border-harsh">
          {PRINCIPLES.map((p, idx) => (
            <AnimatedReveal
              key={p.num}
              delay={idx * 0.08}
              className="group p-8 md:p-10 border-b border-r border-border-harsh flex flex-col items-start bg-bg-page hover:bg-accent transition-colors duration-0 min-h-[260px]"
            >
              <span className="font-display text-4xl md:text-5xl font-black leading-none tabular-nums text-border-subtle group-hover:text-white/30 transition-none mb-8">
                {p.num}
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary mb-4 group-hover:text-white">
                {p.title}
              </h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed mt-auto group-hover:text-white/80">
                {p.body}
              </p>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
