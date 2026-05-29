"use client";

import React, { useState } from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { problems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProblemSolution() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-bg-dark text-text-inverse py-20 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
            {/* Left Side - Large Contrast Headline */}
            <div className="flex flex-col items-start sticky top-28">
              <SectionLabel className="text-neutral-500">
                The Friction
              </SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight max-w-[500px] mt-4 text-text-inverse">
                You do not need more noise.
                <br />
                <span className="text-accent">
                  You need a clearer path from attention to action.
                </span>
              </h2>
            </div>

            {/* Right Side - Problem / Solution Rows */}
            <div className="flex flex-col">
              {problems.map((row, index) => {
                const isHovered = hoveredIdx === index;

                return (
                  <div
                    key={row.number}
                    className="group border-t border-neutral-800 last:border-b border-neutral-800 py-8 relative transition-all duration-300 cursor-default"
                    onMouseEnter={() => setHoveredIdx(index)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-6 items-start z-10 relative">
                      {/* Left: Number and Accent marker */}
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-xs md:text-sm font-black tracking-widest transition-colors duration-300",
                            isHovered ? "text-accent" : "text-neutral-600"
                          )}
                        >
                          {row.number}
                        </span>
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 transform scale-0 origin-center shrink-0",
                            isHovered && "scale-100"
                          )}
                        />
                      </div>

                      {/* Right: Problem vs Solution text */}
                      <div className="flex flex-col gap-2.5">
                        <div className="text-[12px] md:text-[13px] uppercase font-bold tracking-wider text-neutral-500">
                          Problem: {row.problem}
                        </div>
                        <div
                          className={cn(
                            "text-sm md:text-base font-semibold leading-relaxed transition-colors duration-300",
                            isHovered ? "text-accent" : "text-text-inverse"
                          )}
                        >
                          Solution: {row.solution}
                        </div>
                      </div>
                    </div>

                    {/* Subtle backdrop overlay on hover */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-neutral-900/0 transition-all duration-300 pointer-events-none -mx-4 px-4 rounded-xl",
                        isHovered && "bg-neutral-900/30"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
export default ProblemSolution;
