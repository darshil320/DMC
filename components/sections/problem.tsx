"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const PROBLEMS = [
  {
    num: "01",
    issue: "Leaky Pipelines",
    solution: "Automated WhatsApp flows and CRM that catch every lead.",
    stats: "80% of sales require 5+ follow-ups."
  },
  {
    num: "02",
    issue: "Blind Operations",
    solution: "Centralized dashboards with real-time conversion data.",
    stats: "You can't scale what you can't measure."
  },
  {
    num: "03",
    issue: "Manual Coordination",
    solution: "ERP systems connecting inventory to sales instantly.",
    stats: "Stop running your business on WhatsApp groups."
  },
  {
    num: "04",
    issue: "Disconnected Tools",
    solution: "One unified operating system tailored to your exact workflow.",
    stats: "Save hours previously lost to manual data entry."
  }
];

export function ProblemSection() {
  return (
    <section id="problem" className="w-full bg-accent text-white select-none relative z-10">
      {/* Same padding as GridOverlay for alignment */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="py-12 lg:py-16">
          <div className="section-tag">
            THE REALITY
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter uppercase max-w-[900px]">
            YOU CAN&apos;T SCALE A BUSINESS RUN ON MANUAL PROCESSES.
          </h2>
        </div>

        {/* Grid of Problems — 4 cols aligned with overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/20 pb-12">
          {PROBLEMS.map((item) => (
            <div 
              key={item.num} 
              className="py-8 px-4 lg:px-5 flex flex-col items-start border-b md:border-b-0 border-white/10 hover:bg-white hover:text-accent transition-colors group"
            >
              <span className="font-display font-bold text-sm text-accent-lime group-hover:text-accent mb-6">
                [{item.num}]
              </span>
              
              <h3 className="text-xl font-bold tracking-tight mb-2 uppercase line-through opacity-70">
                {item.issue}
              </h3>
              
              <div className="flex items-start gap-2 mb-8">
                <ArrowRight className="size-5 shrink-0 mt-0.5 text-accent-lime group-hover:text-accent" />
                <p className="text-sm font-bold uppercase tracking-tight">
                  {item.solution}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/20 w-full text-xs font-medium opacity-80">
                {item.stats}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
