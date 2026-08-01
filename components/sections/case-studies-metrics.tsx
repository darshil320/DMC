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
  titleAccent?: boolean;
  hasThumb?: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "FLAGSHIP · LIFESTYLE & E-COMMERCE",
    title: "COHUMAN · LIFESTYLE OFFICE FURNITURE",
    description:
      "Full digital showroom, high-converting catalog browser, custom quotation specifier engine, and sub-second Next.js 16 storefront.",
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
    titleAccent: true,
    hasThumb: true,
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
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page text-text-primary overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <div className="section-tag">CASE STUDIES</div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase">
            CO-DELIVERED, <span className="font-serif italic font-normal text-[#0000FF] dark:text-blue-400">WITH METRICS.</span>
          </h2>
        </div>

        {/* Case Studies Container */}
        <div className="border border-border-harsh bg-bg-card divide-y divide-border-harsh shadow-sm">
          {CASE_STUDIES.map((item, idx) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group block p-6 sm:p-8 md:p-10 transition-colors duration-300 relative bg-bg-card hover:bg-black/5 dark:hover:bg-white/5 ${
                item.isFlagship ? "border-l-4 border-l-[#0000FF]" : ""
              }`}
            >
              {/* Tag Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  {item.isFlagship && (
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-[#0000FF] text-white uppercase tracking-wider font-mono">
                      FLAGSHIP
                    </span>
                  )}
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-text-muted font-mono">
                    {item.tag}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0000FF] dark:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all font-mono">
                  VIEW <ThinArrowUpRight className="size-3.5" />
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="max-w-3xl">
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3 font-sans transition-colors ${
                    item.titleAccent ? "text-[#0000FF] dark:text-blue-400" : "text-text-primary group-hover:text-[#0000FF] dark:group-hover:text-blue-400"
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>

                {item.hasThumb && (
                  <div className="size-16 md:size-20 bg-neutral-900 border border-border-harsh shrink-0 hidden md:block" />
                )}
              </div>

              {/* Metric Big Callout (Font weight reduced from heavy bold to elegant font-normal) */}
              {item.metric && (
                <div className="mb-6">
                  <div className="font-sans text-4xl sm:text-5xl md:text-6xl font-normal tracking-tighter leading-none text-[#0000FF] dark:text-blue-400 mb-2">
                    {item.metric}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-text-muted font-mono">
                    {item.metricLabel}
                  </div>
                </div>
              )}

              {/* Footer Tags */}
              {item.footerTags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.footerTags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 border border-border-harsh bg-black/5 dark:bg-white/10 text-text-primary font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
