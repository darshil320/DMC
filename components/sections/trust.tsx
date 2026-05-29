"use client";

import React from "react";

const STATS = [
  { value: "200+", label: "LOCAL SHOPS ONLINE" },
  { value: "14", label: "DAYS TO LAUNCH" },
  { value: "4.9", label: "AVERAGE RATING" },
  { value: "₹0", label: "HIDDEN FEES" },
];

export function TrustSection() {
  return (
    <section className="w-full bg-bg-card select-none relative z-10">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-2 lg:grid-cols-4 border-l border-border-harsh">
        {STATS.map((stat, idx) => (
          <div 
            key={stat.label} 
            className={`flex flex-col items-center justify-center p-8 md:p-12 text-center border-b border-r border-border-harsh bg-bg-page hover:bg-white transition-colors group`}
          >
            <span className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-accent tracking-tighter mb-2 group-hover:text-bg-page transition-colors">
              {stat.value}
            </span>
            <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest text-balance group-hover:text-bg-page transition-colors">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
