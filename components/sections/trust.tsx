"use client";

import React from "react";

const STATS = [
  { value: "6+", label: "SYSTEMS SHIPPED" },
  { value: "10k+", label: "PROCESSES AUTOMATED" },
  { value: "4.9", label: "AVERAGE RATING" },
  { value: "₹0", label: "HIDDEN FEES" },
];

export function TrustSection() {
  return (
    <section className="w-full bg-bg-page select-none relative z-10">
      {/* Same padding as GridOverlay for alignment */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat) => (
            <div 
              key={stat.label} 
              className="flex flex-col items-center justify-center py-10 md:py-14 px-4 text-center bg-bg-page hover:bg-accent-lime transition-colors group"
            >
              <span className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-accent tracking-tighter mb-2 group-hover:text-black transition-colors">
                {stat.value}
              </span>
              <span className="font-pixel font-bold text-text-primary uppercase tracking-widest text-balance group-hover:text-black transition-colors">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
