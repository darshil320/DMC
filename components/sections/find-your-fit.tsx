"use client";

import React from "react";
import { StartQuiz } from "@/components/sections/start-quiz";
import { DMC } from "@/lib/dmc-config";

/**
 * The homepage's self-qualification step.
 *
 * Sits immediately after pricing on purpose. That is the moment a visitor has
 * just read four tiers and is asking "which one am I?" — the highest-intent
 * point on the page, and previously the point where the site answered by
 * sending them somewhere else.
 *
 * The quiz ends in a pre-filled enquiry form on this same screen, so the path
 * from "I don't know what I need" to a submitted, qualified enquiry costs zero
 * page loads.
 */

/**
 * Placed beside the quiz rather than in the footer: these are the objections
 * that stop someone starting, so they belong where the decision happens.
 */
const REASSURANCES = [
  {
    label: "No sales call needed",
    detail: "Three questions and you'll know the package, the price, and the timeline.",
  },
  {
    label: `Reply within ${DMC.replyWindowHours} hours`,
    detail: "Read by the people who'd build it, not routed through an account manager.",
  },
  {
    label: "Scope, price and timeline in writing",
    detail: "Before you commit a rupee — and we'll say so if your project doesn't need us.",
  },
] as const;

export function FindYourFitSection() {
  return (
    <section
      id="find-your-fit"
      className="relative z-10 w-full border-t border-border-harsh bg-bg-page px-6 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="section-tag">NOT SURE WHICH FITS?</div>
            <h2 className="mb-6 text-3xl font-medium uppercase tracking-tighter text-text-primary md:text-4xl">
              Find out in three questions
            </h2>

            <dl className="border-t border-border-harsh">
              {REASSURANCES.map((item) => (
                <div key={item.label} className="border-b border-border-harsh py-5">
                  <dt className="mb-1 flex items-start gap-2 text-sm font-bold tracking-tight text-text-primary">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 bg-accent" />
                    {item.label}
                  </dt>
                  <dd className="pl-[14px] text-sm leading-relaxed text-text-secondary">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-8">
            <StartQuiz headingLevel="h3" />
          </div>
        </div>
      </div>
    </section>
  );
}
