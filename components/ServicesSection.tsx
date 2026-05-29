"use client";

import React, { useState } from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/button";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto select-none"
    >
      <AnimatedReveal className="text-center flex flex-col items-center mb-16 md:mb-24">
        <SectionLabel>Pricing // Options</SectionLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight tracking-tight uppercase mt-4">
          Three Options.
          <br />
          One Goal.
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-[580px] mt-6 font-medium">
          Whether you need a focused landing page, a complete website, or a
          connected growth system, every project is built around clarity, trust,
          and conversion.
        </p>
      </AnimatedReveal>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {services.map((item, idx) => {
          const isMiddle = idx === 1; // "Full Website" is middle
          const isHovered = hoveredIdx === idx;

          // If middle, default to dark theme. Otherwise, light theme.
          const isCardDark = isMiddle;

          return (
            <AnimatedReveal
              key={item.id}
              className="flex"
              delay={idx * 0.1}
            >
              <div
                className={cn(
                  "w-full rounded-2xl md:rounded-3xl border p-8 md:p-10 flex flex-col justify-between transition-all duration-500 cursor-default",
                  isCardDark
                    ? "bg-bg-dark text-text-inverse border-neutral-800 shadow-2xl"
                    : "bg-bg-card text-text-primary border-border-subtle shadow-sm",
                  isHovered && !isCardDark && "scale-[1.02] border-accent shadow-lg shadow-accent/5",
                  isHovered && isCardDark && "scale-[1.02] border-accent shadow-2xl shadow-accent/5"
                )}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Header */}
                <div>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-accent">
                      {String(idx + 1).padStart(2, "0")} — {item.timeline}
                    </span>
                    {isMiddle && (
                      <span className="px-3 py-1 bg-accent/25 border border-accent/30 text-accent font-bold text-[9px] uppercase tracking-wider rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-extrabold mb-4 tracking-tight">
                    {item.name}
                  </h3>

                  <p
                    className={cn(
                      "text-xs md:text-sm leading-relaxed mb-8 font-medium",
                      isCardDark ? "text-neutral-400" : "text-text-secondary"
                    )}
                  >
                    {item.description}
                  </p>

                  <div className="h-[1px] w-full bg-border-subtle/30 my-6" />

                  {/* Best For checklist */}
                  <div>
                    <span
                      className={cn(
                        "text-[10px] uppercase font-bold tracking-widest block mb-4",
                        isCardDark ? "text-neutral-500" : "text-text-muted"
                      )}
                    >
                      Best For:
                    </span>
                    <ul className="space-y-3.5 mb-8">
                      {item.bestFor.map((user) => (
                        <li
                          key={user}
                          className="flex items-center gap-3 text-xs md:text-[13px] font-semibold"
                        >
                          <svg
                            className={cn(
                              "w-4 h-4 shrink-0",
                              isCardDark ? "text-accent" : "text-accent"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span
                            className={
                              isCardDark ? "text-neutral-300" : "text-text-secondary"
                            }
                          >
                            {user}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Button CTA */}
                <Button
                  href="#contact"
                  variant={isCardDark ? "accent" : "primary"}
                  size="md"
                  className="w-full mt-4 flex items-center justify-center gap-1.5"
                >
                  <span>{item.cta}</span>
                  <svg
                    className={cn(
                      "w-3.5 h-3.5 transform transition-transform duration-300",
                      isHovered && "translate-x-1.5"
                    )}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8H15M15 8L8 1M15 8L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </AnimatedReveal>
          );
        })}
      </div>
    </section>
  );
}
export default ServicesSection;
