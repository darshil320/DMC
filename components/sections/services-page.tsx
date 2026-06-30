"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  Bot,
  Users,
  Building2,
  ScanFace,
  BarChart3,
  Blocks,
  MessageCircle,
  ArrowRight,
  Check,
} from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { AuroraHero } from "@/components/ui/aurora-hero";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DMC } from "@/lib/dmc-config";

const SERVICE_BLOCKS = [
  {
    id: "websites",
    icon: Globe,
    num: "01",
    title: "Websites & Ecommerce",
    problem: "Your Instagram is doing the work, but there's nowhere for customers to land, browse, and buy.",
    solution: "World-class, professional websites and full ecommerce stores — built mobile-first with catalog management, payment integration, and WhatsApp enquiry flows. From a focused 5-page site to a full store with UPI/card payments and order dashboards.",
    includes: [
      "Business websites & landing pages",
      "World-class visual design & copy flow",
      "Product catalog with filters & search",
      "Full ecommerce with payment gateway",
      "WhatsApp enquiry on every product",
      "Google Business Profile setup",
      "Mobile-first responsive design",
    ],
    tags: ["World-Class UI", "Next.js", "Mobile-First", "UPI/Card Payments", "SEO"],
    timeline: "1–5 weeks",
    priceHint: "From ₹90,000",
  },
  {
    id: "chatbots",
    icon: Bot,
    num: "02",
    title: "AI Chatbots & WhatsApp Automation",
    problem: "Customers message you at 11 PM asking \"what's the price of this sofa?\" — and by morning, they've moved on.",
    solution: "An intelligent WhatsApp assistant trained on your actual catalog, pricing, and customer history. It answers in Hindi, Gujarati, or English — sends product images with live prices, handles customization questions, and escalates to your team when needed. All through the official WhatsApp Business API.",
    includes: [
      "AI assistant trained on your catalog",
      "Hindi, Hinglish & Gujarati support",
      "Product recommendations with images & prices",
      "Customization enquiry handling",
      "Human escalation when needed",
      "24/7 automated responses",
    ],
    tags: ["WhatsApp Business API", "Claude AI", "Multilingual", "Catalog-Grounded"],
    timeline: "3–4 weeks",
  },
  {
    id: "crm",
    icon: Users,
    num: "03",
    title: "CRM & Lead Management",
    problem: "Leads come in from Instagram, Google, walk-ins — and half of them fall through the cracks because nobody followed up.",
    solution: "A custom CRM that captures every lead from every channel into one dashboard. Each lead gets an ID, a profile, and an assigned salesperson — with automatic follow-up triggers, WhatsApp pairing, and conversion tracking. No lead ever lost to a missed DM or a forgotten callback.",
    includes: [
      "Omnichannel lead capture (IG, FB, Google, walk-in)",
      "Auto-assignment to salespeople",
      "WhatsApp customer-salesperson pairing",
      "Follow-up reminders & trigger alerts",
      "Lead pipeline (New → Follow-up → Converted → Lost)",
      "Conversion analytics & reporting",
    ],
    tags: ["Omnichannel", "Auto-Assignment", "Pipeline Tracking", "Real-time"],
    timeline: "4–6 weeks",
  },
  {
    id: "erp",
    icon: Building2,
    num: "04",
    title: "ERP & Process Automation",
    problem: "You're running production schedules on WhatsApp groups, tracking orders in spreadsheets, and chasing suppliers over phone calls.",
    solution: "Custom ERP modules that digitize your back-office — order management with status tracking, workshop/production scheduling, supplier PO management, delivery tracking, and deadline alerts. The systems that let you scale without drowning in manual coordination.",
    includes: [
      "Order management & status tracking",
      "Workshop / production scheduling",
      "Supplier purchase orders",
      "Delivery & logistics tracking",
      "Deadline alerts & delay notifications",
      "Role-based staff access",
    ],
    tags: ["Order Management", "Production Tracking", "Supplier Integration", "Alerts"],
    timeline: "6–10 weeks",
  },
  {
    id: "recognition",
    icon: ScanFace,
    num: "05",
    title: "Smart Recognition Systems",
    problem: "A returning customer walks into your showroom and your staff asks \"how can I help you?\" — when they should already know their name, their last visit, and what they were looking at.",
    solution: "Face recognition at your entrance that identifies returning customers and instantly tells your team who they are, their full history, and what they're interested in. New faces trigger an owner alert with their photo. Fully DPDPA-compliant with consent-first enrollment.",
    includes: [
      "Camera-based face recognition at entry",
      "Instant staff notifications (WhatsApp)",
      "Customer visit history & interests",
      "DPDPA-compliant consent flow",
      "New visitor alerts with photo",
      "Multi-entrance support",
    ],
    tags: ["Edge AI", "Face Recognition", "DPDPA Compliant", "Real-time Alerts"],
    timeline: "4–6 weeks",
  },
  {
    id: "dashboards",
    icon: BarChart3,
    num: "06",
    title: "Dashboards & Analytics",
    problem: "You have no idea which salesperson is converting, which channel brings the best leads, or how your pipeline looks — until you manually check everything.",
    solution: "Real-time business dashboards that show everything on one screen — sales pipeline, staff performance, lead sources, conversion funnels, daily sales, and trigger history. Role-based access so owners see the full picture and salespeople see their assigned leads.",
    includes: [
      "Real-time sales pipeline view",
      "Lead source analytics",
      "Staff performance tracking",
      "Daily sales & conversion metrics",
      "Role-based access (Admin / Salesperson)",
      "Mobile-responsive dashboard",
    ],
    tags: ["Real-time", "Role-Based", "Next.js", "Supabase"],
    timeline: "2–4 weeks",
  },
  {
    id: "custom",
    icon: Blocks,
    num: "07",
    title: "Custom Solutions",
    problem: "Your business has workflows that no off-the-shelf tool handles — and you're tired of duct-taping five different SaaS products together.",
    solution: "If it doesn't exist, we build it. Custom workflows, integrations, internal tools, and automation — tailored to your exact operation. We start by understanding how your business actually runs, then we build the system that makes it run better.",
    includes: [
      "Custom workflow automation",
      "Third-party API integrations",
      "Internal tools & admin panels",
      "Data migration & cleanup",
      "Meta / Google lead ad bridges",
      "Payment gateway integrations",
    ],
    tags: ["Custom-Built", "API Integrations", "Workflow Automation", "No Lock-in"],
    timeline: "Scoped per project",
  },
];

export function ServicesPageContent() {
  return (
    <main className="relative z-10 min-h-screen bg-bg-page text-text-primary">
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden">
        <AuroraHero
          aria-hidden="true"
          className="!absolute !inset-0 !h-full !min-h-0 pointer-events-none opacity-[0.35] dark:opacity-[0.4]"
        />
        <div className="max-w-[1440px] mx-auto relative z-10">

          {/* Hero */}
          <AnimatedReveal className="mb-20">
            <div className="section-tag">SERVICES</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-text-primary uppercase max-w-[900px] leading-[0.95] mt-4">
              Everything you need to run your business — digitally.
            </h1>
            <p className="text-text-secondary text-base md:text-lg font-medium max-w-[560px] mt-8 leading-relaxed">
              From a single website to a complete operating system with AI chatbots, CRM, dashboards, and process automation. Every project is custom-built around how your business actually works.
            </p>
            <div className="mt-8 inline-flex border border-accent bg-accent-lime px-4 py-2 font-pixel text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent brutalist-shadow">
              Let&apos;s build you a world-class website.
            </div>
          </AnimatedReveal>

          {/* Service Blocks */}
          <div className="flex flex-col">
            {SERVICE_BLOCKS.map((service, idx) => {
              const Icon = service.icon;
              return (
                <AnimatedReveal key={service.id} delay={idx * 0.05}>
                  <div className="group relative grid grid-cols-1 gap-8 overflow-hidden border-t border-border-harsh py-12 md:gap-12 md:py-16 lg:grid-cols-12">
                    <CornerTicks tone="accent" />

                    {/* Left: Number, Icon, Title */}
                    <div className="lg:col-span-4 flex flex-col gap-4 px-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xs font-bold text-text-muted transition-colors group-hover:text-accent">{service.num}</span>
                        <div className="flex size-10 items-center justify-center border border-border-harsh bg-bg-card transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tighter font-medium text-text-primary">
                        {service.title}
                      </h2>
                      {service.timeline && (
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
                          {service.priceHint ? `${service.priceHint} · ${service.timeline}` : service.timeline}
                        </span>
                      )}
                    </div>

                    {/* Middle: Problem → Solution */}
                    <div className="lg:col-span-5 flex flex-col gap-6 px-4 lg:px-8 border-l-0 lg:border-l border-border-harsh/30">
                      <div>
                        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">THE PROBLEM</span>
                        <p className="text-text-secondary text-sm md:text-base leading-relaxed italic">
                          &ldquo;{service.problem}&rdquo;
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">WHAT WE BUILD</span>
                        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                          {service.solution}
                        </p>
                      </div>
                    </div>

                    {/* Right: Includes checklist + Tags */}
                    <div className="lg:col-span-3 flex flex-col gap-6 px-4 lg:px-6">
                      <div>
                        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-text-muted block mb-3">INCLUDES</span>
                        <ul className="flex flex-col gap-2">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs font-medium text-text-secondary">
                              <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((tag) => (
                          <span key={tag} className="text-[8px] font-bold tracking-[0.15em] uppercase px-2 py-1 border border-border-harsh bg-bg-card text-text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedReveal>
              );
            })}
            <div className="w-full h-px bg-border-harsh" />
          </div>

          {/* Bottom CTA */}
          <AnimatedReveal className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-4 lg:px-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-text-primary uppercase">
                Let&apos;s build you a world-class website.
              </h3>
              <p className="text-text-secondary text-sm font-medium mt-2 max-w-[400px]">
                Start with a sharp, premium website, then connect the systems your business needs to convert and scale.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton strength={8}>
                <a
                  href={DMC.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-accent bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-accent hover:bg-accent-lime hover:text-accent hover:shadow-none brutalist-shadow"
                >
                  <MessageCircle className="size-4 transition-transform group-hover:scale-110" />
                  WhatsApp Us
                </a>
              </MagneticButton>
              <MagneticButton strength={8}>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 border border-border-harsh bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white"
                >
                  Send a Message
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </AnimatedReveal>

        </div>
      </section>
    </main>
  );
}
