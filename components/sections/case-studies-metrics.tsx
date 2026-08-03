"use client";

import React from "react";
import { motion } from "motion/react";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";

interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  footerTags?: string[];
  href: string;
  isFlagship?: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "FLAGSHIP · LIFESTYLE & E-COMMERCE",
    title: "COHUMAN · LIFESTYLE OFFICE FURNITURE",
    description:
      "Full digital showroom, catalog browser, custom quotation specifier engine, and sub-second Next.js 16 storefront.",
    metric: "+45%",
    metricLabel: "INQUIRY CONVERSION",
    footerTags: ["FURNITURE", "SURAT", "NEXT.JS 16"],
    href: "https://cohuman-website-sandy.vercel.app/",
    isFlagship: true,
  },
  {
    tag: "ENTERPRISE · SHOWROOM OS",
    title: "TOPAZ FURNITURE · AI & GST OPERATING SYSTEM",
    description:
      "Face recognition check-ins, automated WhatsApp AI assistant, live sales pipeline, and instant GST quotation engine.",
    metric: "+38%",
    metricLabel: "CONVERSION RATE",
    footerTags: ["CRM", "WHATSAPP API", "GST BILLING"],
    href: "/topaz-crm",
  },
  {
    tag: "HOSPITALITY · BOOKING ENGINE",
    title: "WELCOME PALACE · EVENT & BANQUET BOOKING",
    description:
      "Multi-venue event booking engine with instant pre-filled WhatsApp routing and local SEO optimization.",
    metric: "-63%",
    metricLabel: "RESPONSE TIME",
    footerTags: ["HOTEL", "VENUE", "AUTOMATION"],
    href: "https://www.welcomepalace.in",
  },
  {
    tag: "DESIGN · STUDIO STOREFRONT",
    title: "PRISMA · CREATIVE STUDIO EXPERIENCE",
    description:
      "Moody, cinematic dark studio showcase built with warm cream typography, fluid Framer Motion reveals, and noise textures.",
    metric: "<200ms",
    metricLabel: "PAGE LOAD",
    footerTags: ["VITE", "FRAMER MOTION", "TYPESCRIPT"],
    href: "/prisma",
  },
];

export function CaseStudiesMetricsSection() {
  return (
    <section className="py-12 md:py-16 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page text-text-primary overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-tag text-accent font-bold">CASE STUDIES</div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase">
              CO-DELIVERED, <span className="font-serif italic font-normal text-accent">WITH METRICS.</span>
            </h2>
          </div>
          <span className="text-[11px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest font-mono self-start md:self-end pb-1">
            04 FEATURED DEPLOYMENTS
          </span>
        </div>

        {/* 2x2 Grid Container - High contrast text & tags in dark mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-border-harsh bg-bg-card divide-y md:divide-y-0 divide-border-harsh shadow-sm">
          {CASE_STUDIES.map((item, idx) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={`group flex flex-col justify-between p-6 sm:p-8 transition-colors duration-300 relative bg-bg-card hover:bg-black/5 dark:hover:bg-white/5 border-border-harsh ${
                idx % 2 === 0 ? "md:border-r" : ""
              } ${idx >= 2 ? "md:border-t" : ""}`}
            >
              {/* Tag Header */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    {item.isFlagship && (
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-accent text-white dark:text-black uppercase tracking-wider font-mono">
                        FLAGSHIP
                      </span>
                    )}
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-400 font-mono">
                      {item.tag}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all font-mono shrink-0">
                    VIEW <ThinArrowUpRight className="size-3.5" />
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-text-primary dark:text-gray-100 group-hover:text-accent font-sans transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm font-normal leading-relaxed text-gray-300 dark:text-gray-300 mb-6">
                  {item.description}
                </p>
              </div>

              {/* Metric & Footer Tags Row */}
              <div className="pt-4 border-t border-border-harsh/30 flex flex-wrap items-end justify-between gap-4 mt-auto">
                {item.metric && (
                  <div>
                    <div className="font-sans text-3xl sm:text-4xl font-normal tracking-tighter leading-none text-accent mb-1">
                      {item.metric}
                    </div>
                    <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-400 font-mono">
                      {item.metricLabel}
                    </div>
                  </div>
                )}

                {item.footerTags && (
                  <div className="flex flex-wrap gap-1.5 ml-auto">
                    {item.footerTags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 border border-white/10 dark:border-white/20 bg-white/5 dark:bg-white/10 text-gray-200 dark:text-gray-200 font-mono rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
