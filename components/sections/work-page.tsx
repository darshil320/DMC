"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Bot,
  ScanFace,
  Users,
  BarChart3,
  Zap,
  ExternalLink,
} from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { DMC } from "@/lib/dmc-config";

export function WorkPageContent() {
  return (
    <main className="relative z-10 min-h-screen bg-bg-page text-text-primary">
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">

          {/* Hero */}
          <AnimatedReveal className="mb-20">
            <div className="section-tag">OUR WORK</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-text-primary uppercase max-w-[800px] leading-[0.95] mt-4">
              Built. Shipped. Running.
            </h1>
            <p className="text-text-secondary text-base md:text-lg font-medium max-w-[500px] mt-8 leading-relaxed">
              Real projects for real businesses. Every system here is live, in use, and driving revenue for its owner.
            </p>
          </AnimatedReveal>

          {/* ═══ Case Study 1: Furniture Concept 2.0 ═══ */}
          <AnimatedReveal>
            <article className="border border-border-harsh mb-16">
              {/* Image Band */}
              <a
                href="/demo/furniture-concept-2.0"
                className="relative block overflow-hidden bg-neutral-200 min-h-[300px] md:min-h-[420px] group cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-500"
                  alt="Furniture Concept 2.0 showroom"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />

                <span className="absolute top-6 left-6 z-20 bg-accent-lime text-accent px-3 py-1.5 font-pixel font-bold uppercase tracking-widest text-[10px] brutalist-shadow border border-accent flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-colors">
                  VIEW LIVE DEMO <ThinArrowUpRight />
                </span>

                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-white font-serif text-3xl md:text-5xl font-medium tracking-tight">
                    Furniture Concept 2.0
                  </span>
                </div>
              </a>

              {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 p-8 md:p-12">
                {/* Meta */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">CLIENT</span>
                    <span className="text-sm font-bold text-text-primary">Premium Furniture Manufacturer</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">LOCATION</span>
                    <span className="text-sm font-medium text-text-primary">Surat, Gujarat</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">TIMELINE</span>
                    <span className="text-sm font-medium text-text-primary">3 Weeks</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">TYPE</span>
                    <span className="text-sm font-medium text-text-primary">Website · Ecommerce · 3D</span>
                  </div>
                </div>

                {/* Story */}
                <div className="lg:col-span-5 flex flex-col gap-6 border-l-0 lg:border-l border-border-harsh/30 lg:pl-8">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">THE CHALLENGE</span>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      A premium furniture manufacturer with a strong Instagram presence (13K+ followers) and a physical showroom in Surat — but no digital storefront. All traffic had nowhere to convert. Customers would DM asking for catalogs, and the team would manually send PDFs. A lot of interest, zero scalable infrastructure.
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">WHAT WE BUILT</span>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      A premium, editorial-style website with immersive 3D product interactions, a full browsable catalog with category filters, WhatsApp enquiry on every product, and a high-performance Next.js build optimized for mobile. The design elevated their brand from a social-media-only presence to a proper digital storefront that matches the premium nature of their products.
                    </p>
                  </div>
                </div>

                {/* Tags + CTA */}
                <div className="lg:col-span-4 flex flex-col gap-6 border-l-0 lg:border-l border-border-harsh/30 lg:pl-8">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-3">TECH STACK</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Next.js 14", "3D Product Views", "Catalog System", "WhatsApp Enquiry", "Mobile-First", "SEO Optimized"].map((tag) => (
                        <span key={tag} className="text-[8px] font-bold tracking-[0.15em] uppercase px-2 py-1 border border-border-harsh bg-bg-card text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="/demo/furniture-concept-2.0"
                    className="mt-auto bg-accent text-white border border-accent px-5 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent-lime hover:text-accent transition-colors brutalist-shadow w-full md:w-fit"
                  >
                    <ExternalLink className="size-3.5" />
                    View Live Demo
                  </a>
                </div>
              </div>
            </article>
          </AnimatedReveal>

          {/* ═══ Case Study 2: Showroom Intelligence System ═══ */}
          <AnimatedReveal delay={0.1}>
            <article className="border border-border-harsh mb-16">
              {/* Abstract Visual */}
              <div className="relative overflow-hidden bg-bg-dark min-h-[300px] md:min-h-[420px] flex flex-col items-center justify-center p-8">
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }} />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-8">
                    {[ScanFace, Bot, Users, BarChart3, Zap].map((Icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="size-10 md:size-14 border border-white/20 bg-white/5 flex items-center justify-center text-white/70"
                      >
                        <Icon className="size-5 md:size-6" />
                      </motion.div>
                    ))}
                  </div>

                  <span className="text-white text-3xl md:text-5xl font-bold tracking-tight text-center leading-tight">
                    Showroom Intelligence<br />
                    <span className="text-accent-lime">& Sales Conversion</span>
                  </span>

                  <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/40 mt-4">
                    6-MODULE BUSINESS SYSTEM
                  </span>
                </div>

                <span className="absolute top-6 left-6 z-20 bg-white/10 text-white/80 px-3 py-1.5 font-pixel font-bold uppercase tracking-widest text-[10px] border border-white/20 flex items-center gap-2">
                  IN DEVELOPMENT
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 p-8 md:p-12">
                {/* Meta */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">CLIENT</span>
                    <span className="text-sm font-bold text-text-primary">Multi-Showroom Furniture Retailer</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">LOCATION</span>
                    <span className="text-sm font-medium text-text-primary">Gujarat, India</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">SCOPE</span>
                    <span className="text-sm font-medium text-text-primary">6 Modules · 22 Weeks</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-1">TYPE</span>
                    <span className="text-sm font-medium text-text-primary">Complete Business System</span>
                  </div>
                </div>

                {/* Story */}
                <div className="lg:col-span-5 flex flex-col gap-6 border-l-0 lg:border-l border-border-harsh/30 lg:pl-8">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">THE CHALLENGE</span>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      A furniture retailer with 3 showrooms across Gujarat had zero digital memory. Staff couldn&apos;t recognize returning customers. Leads from Instagram, Google, and walk-ins leaked into separate WhatsApp chats with no tracking. There was no sales pipeline, no performance data, and no way for the owner to see what was happening across locations without calling each manager.
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">WHAT WE&apos;RE BUILDING</span>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      A six-module intelligence system: face recognition cameras at showroom entries that identify returning customers and alert staff via WhatsApp. A custom CRM with omnichannel lead capture (Instagram, Facebook, Google, walk-in). An AI WhatsApp assistant that speaks Hindi, Gujarati, and Hinglish — trained on the actual catalog with live pricing. Automatic salesperson assignment. A full sales pipeline dashboard with conversion analytics. And an ERP layer for order and delivery management.
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="lg:col-span-4 flex flex-col gap-6 border-l-0 lg:border-l border-border-harsh/30 lg:pl-8">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-3">MODULES</span>
                    <ul className="flex flex-col gap-2">
                      {[
                        "M1 — Showroom Intelligence (Face Recognition)",
                        "M2 — Customer CRM & Lead Capture",
                        "M3 — AI WhatsApp Assistant",
                        "M4 — Sales Pipeline & Dashboard",
                        "M5 — Salesperson Assignment Engine",
                        "M6 — Order & Delivery Management",
                      ].map((mod) => (
                        <li key={mod} className="text-xs font-medium text-text-secondary flex items-start gap-2">
                          <span className="text-accent mt-0.5">▪</span>
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Face Recognition", "Claude AI", "WhatsApp API", "Supabase", "Next.js", "Edge AI", "DPDPA Compliant"].map((tag) => (
                      <span key={tag} className="text-[8px] font-bold tracking-[0.15em] uppercase px-2 py-1 border border-border-harsh bg-bg-card text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </AnimatedReveal>

          {/* ═══ "Your project could be next" CTA ═══ */}
          <AnimatedReveal delay={0.15}>
            <div className="border border-accent bg-accent p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-4xl font-medium tracking-tighter text-white uppercase">
                  Your project could be next.
                </h3>
                <p className="text-white/80 text-sm md:text-base font-medium mt-3 max-w-[420px]">
                  Whether it&apos;s a website, a chatbot, or a full business system — we scope, build, and ship. Tell us what you&apos;re trying to solve.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={DMC.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-lime text-accent border border-accent px-6 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-colors brutalist-shadow"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="bg-transparent text-white border border-white/40 px-6 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-accent hover:border-white transition-colors"
                >
                  Contact Form
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </section>
    </main>
  );
}
