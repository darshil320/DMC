"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShoppingCart, ScanFace, ArrowUpRight } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

/**
 * Proof, not promises. Every item here is a real, working system you can open
 * and use right now — so the section deliberately avoids invented client
 * metrics and lets the live demos do the convincing.
 */
const PROOFS = [
  {
    index: "01",
    tag: "AI · LIVE",
    icon: Sparkles,
    title: "AI Room Visualizer",
    gap: "Customers can't picture your product in their own space, so they hesitate and the sale stalls.",
    build:
      "A browser-based AI tool that drops any product into a photo of the customer's room with realistic lighting and scale.",
    results: ["Preview in ~30 seconds", "Runs 100% in-browser", "No app, no download"],
    href: "/demo/ai-visualizer",
    cta: "Try the live tool",
    internal: true,
  },
  {
    index: "02",
    tag: "ECOMMERCE · LIVE",
    icon: ShoppingCart,
    title: "UrbanWood Storefront",
    gap: "A catalog isn't a store. Browsing without a checkout leaves the money on the table.",
    build:
      "A full ecommerce build: product pages, cart, UPI and card checkout, and an order-confirmation flow.",
    results: ["Cart → payment → confirmation", "Mobile-first, tested everywhere", "Live, working demo"],
    href: "/demo/furniture-concept-2.0",
    cta: "Open the live store",
    internal: true,
  },
  {
    index: "03",
    tag: "COMPUTER VISION · LIVE",
    icon: ScanFace,
    title: "Live Recognition",
    gap: "Showrooms have no idea who walks in, or when their best customers come back.",
    build:
      "Real-time, in-browser computer vision. The same pipeline behind our face-recognition entry and footfall systems.",
    results: ["Real-time, on-device", "No video leaves your browser", "Scroll down to try it"],
    href: "#vision",
    cta: "See it react",
    internal: false,
  },
] as const;

export function ProofSection() {
  return (
    <section
      id="proof"
      className="py-24 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page border-t border-border-harsh relative z-10"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 lg:px-6">
          <div>
            <div className="section-tag">PROOF · NOT PROMISES</div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase max-w-[680px]">
              Don&apos;t take our word for it.
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-medium max-w-[360px]">
            These are real, working systems. Built by us, live right now. Click in and use them yourself.
          </p>
        </div>

        {/* Proof grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border-harsh">
          {PROOFS.map((proof, idx) => {
            const Icon = proof.icon;
            const card = (
              <AnimatedReveal
                delay={idx * 0.08}
                className="group h-full p-8 md:p-10 border-b border-r border-border-harsh flex flex-col items-start bg-bg-page hover:bg-bg-card transition-colors duration-0"
              >
                {/* Icon + index + tag */}
                <div className="flex items-center gap-3 mb-8 w-full">
                  <div className="size-11 border border-border-harsh flex items-center justify-center bg-bg-card group-hover:bg-accent-lime group-hover:text-accent group-hover:border-accent brutalist-shadow group-hover:shadow-none transition-none">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-text-muted">
                    {proof.tag}
                  </span>
                  <span className="ml-auto font-display text-2xl md:text-3xl font-black leading-none tabular-nums text-border-subtle group-hover:text-accent transition-none">
                    {proof.index}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary mb-6">
                  {proof.title}
                </h3>

                {/* The gap */}
                <div className="mb-5">
                  <span className="block text-[9px] font-black tracking-[0.2em] uppercase text-text-muted mb-1.5">
                    The gap
                  </span>
                  <p className="text-sm font-medium text-text-secondary leading-relaxed">
                    {proof.gap}
                  </p>
                </div>

                {/* What we built */}
                <div className="mb-6">
                  <span className="block text-[9px] font-black tracking-[0.2em] uppercase text-text-muted mb-1.5">
                    What we built
                  </span>
                  <p className="text-sm font-medium text-text-primary leading-relaxed">
                    {proof.build}
                  </p>
                </div>

                {/* Honest, demonstrable results */}
                <ul className="flex flex-col gap-2 mb-8 w-full">
                  {proof.results.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-primary">
                      <span className="size-1.5 bg-accent shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-accent border-b border-accent/30 group-hover:border-accent pb-0.5 transition-colors">
                  {proof.cta}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </AnimatedReveal>
            );

            return proof.internal ? (
              <Link key={proof.title} href={proof.href} className="contents">
                {card}
              </Link>
            ) : (
              <a key={proof.title} href={proof.href} className="contents">
                {card}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
