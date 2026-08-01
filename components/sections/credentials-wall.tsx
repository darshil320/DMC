"use client";

import React from "react";
import { motion } from "motion/react";

interface MetricCard {
  number: string;
  label: string;
  hasIconBox?: boolean;
}

const METRICS: MetricCard[] = [
  {
    number: "50+",
    label: "PRODUCTION WEB PLATFORMS & AI BUSINESS SYSTEMS SHIPPED",
  },
  {
    number: "30+",
    label: "CUSTOM WORKFLOWS, AUTOMATED PIPELINES & CRM DEPLOYMENTS",
  },
  {
    number: "1",
    label: "UNIFIED PARTNER FOR END-TO-END DESIGN, AI ENGINEERING & MAINTENANCE",
    hasIconBox: true,
  },
  {
    number: "~24h",
    label: "AVERAGE TURNAROUND FOR TECHNICAL SPECIFICATION & INITIAL PROTOTYPE",
  },
];

export function CredentialsWallSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page text-text-primary overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Section Header - Aligned with Our Work section */}
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-tag">CREDENTIALS</div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase">
              THE TEAM, <span className="font-serif italic font-normal text-[#0000FF] dark:text-blue-400">BY THE NUMBERS.</span>
            </h2>
          </div>
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest font-mono self-start md:self-end pb-1">
            04 KEY METRICS
          </span>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border-harsh bg-bg-card divide-y md:divide-y-0 md:divide-x divide-border-harsh shadow-sm">
          {METRICS.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="p-8 sm:p-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="font-sans text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0000FF] dark:text-blue-400 tracking-tighter leading-none">
                  {m.number}
                </div>
                {m.hasIconBox && (
                  <div className="size-5 border border-border-harsh bg-bg-page flex items-center justify-center shrink-0">
                    <div className="size-1.5 bg-[#CCFF00]" />
                  </div>
                )}
              </div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-primary leading-snug font-sans">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
