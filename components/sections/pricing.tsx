"use client";

import React, { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { analytics } from "@/lib/analytics";
import {
  PRICING_ANSWER,
  PRICING_TERMS,
  PRICING_TIERS,
  formatPrice,
  type PricingTier,
} from "@/lib/pricing";

function priceLabel(tier: PricingTier) {
  return tier.startingPrice === null ? "Custom quote" : `${formatPrice(tier.startingPrice)}+`;
}

function TierCard({ tier, index }: { tier: PricingTier; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Report the tier as viewed once. `pricing_tier_view` has been declared in
  // lib/analytics.ts since launch but was never fired — this is what tells you
  // which package people actually consider.
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          analytics.pricingTierView(tier.slug);
          observer.disconnect();
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [tier.slug]);

  return (
    <AnimatedReveal
      delay={index * 0.08}
      className="group relative flex flex-col border-b border-r border-border-harsh bg-bg-page p-6 lg:p-8"
    >
      <div ref={cardRef} className="flex h-full flex-col">
        {/* Accent rail grows from the top edge on hover */}
        <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full" />

        <div className="mb-5 flex items-baseline gap-3">
          <span className="font-display text-xs font-bold text-text-muted transition-colors group-hover:text-accent">
            {tier.num}
          </span>
          <h3 className="text-2xl font-medium tracking-tighter text-text-primary lg:text-3xl">
            {tier.name}
          </h3>
        </div>

        <div className="mb-1 font-serif text-3xl font-medium tracking-tight text-text-primary">
          {priceLabel(tier)}
        </div>
        {tier.priceNote && (
          <p className="mb-2 text-[11px] font-medium text-text-muted">{tier.priceNote}</p>
        )}
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-text-primary/60">
          <Clock className="size-4" />
          {tier.timeline}
        </div>

        <p className="mb-6 border-l-2 border-accent pl-3 text-sm font-medium leading-relaxed text-text-primary">
          <span className="font-bold uppercase tracking-[0.14em] text-[10px] block mb-1 text-text-muted">
            For
          </span>
          {tier.audience}
        </p>

        <ul className="mb-6 flex flex-col gap-2">
          {tier.includes.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-snug text-text-secondary">
              <span aria-hidden className="mt-[7px] size-1 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mb-8 text-xs leading-relaxed text-text-muted">
          <span className="font-bold uppercase tracking-[0.14em]">Not included: </span>
          {tier.excludes}
        </p>

        <a
          href={`/contact?tier=${tier.slug}`}
          className="group/cta mt-auto inline-flex items-center justify-between gap-2 border border-border-harsh px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white"
        >
          {tier.cta}
          <span className="transition-transform group-hover/cta:translate-x-1">→</span>
        </a>
      </div>
    </AnimatedReveal>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 w-full select-none bg-bg-page px-6 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col">
        {/* Header — answer-first, so the section states facts before it sells */}
        <div className="mb-16 flex flex-col gap-6 px-4 lg:flex-row lg:items-end lg:justify-between lg:px-6">
          <div>
            <div className="section-tag">PRICING</div>
            <h2 className="max-w-[720px] text-3xl font-medium uppercase tracking-tighter text-text-primary md:text-5xl">
              What custom software costs with us
            </h2>
          </div>
          <p className="max-w-[460px] text-sm font-medium leading-relaxed text-text-secondary md:text-base">
            {PRICING_ANSWER}
          </p>
        </div>

        {/* Four tiers — a visitor should place themselves in under ten seconds */}
        <div className="grid grid-cols-1 border-l border-t border-border-harsh md:grid-cols-2 xl:grid-cols-4">
          {PRICING_TIERS.map((tier, index) => (
            <TierCard key={tier.slug} tier={tier} index={index} />
          ))}
        </div>

        {/* Cross-tier terms — the densest, most quotable block on the site */}
        <dl className="grid grid-cols-1 border-b border-l border-border-harsh sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_TERMS.map((term) => (
            <div key={term.label} className="border-r border-t border-border-harsh p-5">
              <dt className="mb-2 font-pixel text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {term.label}
              </dt>
              <dd className="text-sm leading-relaxed text-text-secondary">{term.value}</dd>
            </div>
          ))}
        </dl>

        {/* Escape hatch — routes to self-qualification, not into a sales chat */}
        <p className="mt-10 text-center text-sm font-medium text-text-secondary">
          Not sure which fits?{" "}
          <a
            href="/contact"
            className="link-underline font-bold text-accent transition-colors hover:text-text-primary"
          >
            Tell us how your business runs
          </a>{" "}
          — we&apos;ll tell you what to build, and say so if you don&apos;t need us.
        </p>
      </div>
    </section>
  );
}
