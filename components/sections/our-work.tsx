"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Bot, ScanFace, BarChart3, Users, Zap, MessageCircle } from "lucide-react";

/** Accent corner ticks that scale in on card hover. */
function CornerTicks() {
  const base =
    "absolute w-2.5 h-2.5 border-accent-lime opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none z-30";
  return (
    <>
      <span className={`${base} top-3 left-3 border-t-2 border-l-2`} />
      <span className={`${base} top-3 right-3 border-t-2 border-r-2`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  );
}

export function OurWorkSection() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page">
      <div className="max-w-[1440px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 lg:px-6">
          <div>
            <div className="section-tag">
              OUR WORK
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase max-w-[600px]">
              From storefronts to complete business systems.
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-medium max-w-[320px]">
            Every project is scoped, designed, and built around how your business actually operates.
          </p>
        </div>

        {/* ── Project Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-border-harsh">

          {/* ── Project 1: Furniture Concept 2.0 ── */}
          <div className="border-b border-r border-border-harsh flex flex-col">
            {/* Image area */}
            <a
              href="/demo/furniture-concept-2.0"
              className="relative overflow-hidden bg-neutral-200 min-h-[320px] md:min-h-[400px] flex items-center justify-center group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-all duration-500 ease-out group-hover:scale-[1.025]"
                alt="Furniture Concept 2.0 Showroom"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

              <CornerTicks />

              {/* Live Demo badge */}
              <MagneticButton strength={8} className="absolute top-6 left-6 z-20">
                <span className="bg-accent-lime text-accent px-3 py-1.5 font-pixel font-bold uppercase tracking-widest text-[10px] brutalist-shadow border border-accent flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-colors">
                  VIEW LIVE DEMO <ThinArrowUpRight />
                </span>
              </MagneticButton>

              <span className="relative z-10 font-serif text-white text-2xl md:text-4xl font-medium tracking-tight transition-transform duration-700 ease-out group-hover:-translate-y-1">
                Furniture Concept 2.0
              </span>

              <div className="absolute bottom-4 right-4 z-20 text-white/60 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <ThinArrowUpRight className="size-5" />
              </div>
            </a>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-black tracking-[0.25em] uppercase text-text-muted">
                  PREMIUM WEBSITE · ECOMMERCE · 3D
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-text-primary mb-4">
                Premium Digital Storefront
              </h3>

              <div className="mb-5 max-w-[420px]">
                <span className="block text-[9px] font-black tracking-[0.2em] uppercase text-text-muted mb-1.5">
                  The challenge
                </span>
                <p className="text-sm font-medium text-text-secondary leading-relaxed">
                  A flat catalog can&apos;t sell premium furniture — customers need to feel the product before they&apos;ll trust the price.
                </p>
              </div>

              <div className="mb-5 max-w-[420px]">
                <span className="block text-[9px] font-black tracking-[0.2em] uppercase text-text-muted mb-1.5">
                  What we built
                </span>
                <p className="text-sm font-medium text-text-primary leading-relaxed">
                  An editorial storefront with immersive 3D product views, a full catalog and cart, and a high-performance Next.js build.
                </p>
              </div>

              <ul className="flex flex-col gap-2 mb-6">
                {["Immersive 3D product views", "Catalog → cart → checkout", "Sub-second, mobile-first"].map((r) => (
                  <li key={r} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-primary">
                    <span className="size-1.5 bg-accent shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {["Next.js", "3D Product Views", "Catalog System", "Mobile-First"].map((tag) => (
                  <span key={tag} className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5 border border-border-harsh bg-bg-card text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Project 2: Showroom Intelligence System ── */}
          <div className="border-b border-r border-border-harsh flex flex-col">
            {/* Abstract visual area */}
            <div className="relative overflow-hidden bg-bg-dark min-h-[320px] md:min-h-[400px] flex flex-col items-center justify-center p-8 group">
              <CornerTicks />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.08]" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

              {/* Floating module icons */}
              <AnimatedReveal delay={0.1} className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-8">
                  {[ScanFace, Bot, Users, BarChart3, MessageCircle, Zap].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="size-10 md:size-12 border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:bg-accent-lime hover:text-accent hover:border-accent-lime transition-colors duration-200"
                    >
                      <Icon className="size-5" />
                    </motion.div>
                  ))}
                </div>

                <span className="text-white text-2xl md:text-4xl font-bold tracking-tight text-center leading-tight">
                  Showroom Intelligence<br />
                  <span className="text-accent-lime">& Sales Conversion</span>
                </span>

                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/40 mt-4">
                  MULTI-MODULE BUSINESS SYSTEM
                </span>
              </AnimatedReveal>

              {/* In-progress badge */}
              <span className="absolute top-6 left-6 z-20 bg-white/10 text-white/80 px-3 py-1.5 font-pixel font-bold uppercase tracking-widest text-[10px] border border-white/20 flex items-center gap-2">
                IN DEVELOPMENT
              </span>
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] font-black tracking-[0.25em] uppercase text-text-muted">
                  AI · CRM · FACE RECOGNITION · WHATSAPP
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-text-primary mb-4">
                Complete Business Operating System
              </h3>

              <div className="mb-5 max-w-[420px]">
                <span className="block text-[9px] font-black tracking-[0.2em] uppercase text-text-muted mb-1.5">
                  The challenge
                </span>
                <p className="text-sm font-medium text-text-secondary leading-relaxed">
                  A showroom loses the walk-ins it never captures and the regulars it never recognises — and the owner can&apos;t see any of it.
                </p>
              </div>

              <div className="mb-5 max-w-[420px]">
                <span className="block text-[9px] font-black tracking-[0.2em] uppercase text-text-muted mb-1.5">
                  What we&apos;re building
                </span>
                <p className="text-sm font-medium text-text-primary leading-relaxed">
                  A six-module system — face recognition at entry, customer CRM, AI WhatsApp assistant, omnichannel lead capture, automated salesperson assignment, and a real-time sales pipeline.
                </p>
              </div>

              <ul className="flex flex-col gap-2 mb-6">
                {["Every walk-in recognised", "No lead left uncontacted", "One dashboard, whole showroom"].map((r) => (
                  <li key={r} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-primary">
                    <span className="size-1.5 bg-accent shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {["Face Recognition", "AI Chatbot", "CRM", "Lead Pipeline", "WhatsApp API", "Real-time Dashboard"].map((tag) => (
                  <span key={tag} className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5 border border-border-harsh bg-bg-card text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
