"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  LayoutGrid,
  ShoppingCart,
  MessageCircle,
  MapPin,
  Megaphone,
  Wrench,
  Sparkles,
  Bot,
  Users,
  Building2,
  Workflow,
  BarChart3,
  ScanFace,
  Zap,
  Blocks,
} from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

/* ── Flagship / hero-level capabilities ── */
const FLAGSHIP_SERVICES = [
  {
    icon: Building2,
    title: "Complete Business Systems",
    subtitle: "End-to-end digital operations",
    description:
      "We take offline businesses online — not just a website, but the entire operating system. CRM, lead pipeline, sales automation, staff dashboards, and real-time reporting — built custom for how your business actually runs.",
    tags: ["SMB Operations", "Digital Transformation", "Custom-Built"],
  },
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    subtitle: "Intelligent, 24/7 customer engagement",
    description:
      "WhatsApp and web chatbots trained on your real catalog, pricing, and customer history. They answer in Hindi, Gujarati, or English — send product images, handle enquiries, and escalate to your team when needed.",
    tags: ["WhatsApp AI", "Multilingual", "Catalog-Aware"],
  },
  {
    icon: Users,
    title: "CRM & Lead Management",
    subtitle: "Every customer, every interaction, one place",
    description:
      "Custom CRMs that capture leads from Instagram, Facebook, Google, and walk-ins — assign them to salespeople, trigger follow-ups, and show you conversion rates on a live dashboard. No lead ever lost.",
    tags: ["Omnichannel Leads", "Auto-Assignment", "Pipeline Tracking"],
  },
  {
    icon: Workflow,
    title: "ERP & Process Automation",
    subtitle: "Production, supply chain, delivery — automated",
    description:
      "Order management, workshop tracking, supplier POs, delivery scheduling, deadline alerts — the back-office systems that let you scale without drowning in WhatsApp groups and spreadsheets.",
    tags: ["Order Management", "Workshop Tracking", "Supplier Integration"],
  },
];

/* ── Grid of specialized services ── */
const SERVICES = [
  {
    icon: Sparkles,
    title: "AI Room Visualizer",
    description:
      "Customers see any product in their own room — AI places it with accurate lighting and scale in 30 seconds.",
    isNew: true,
    href: "/demo/ai-visualizer",
  },
  {
    icon: ScanFace,
    title: "Smart Recognition Systems",
    description:
      "Face recognition entry, repeat-customer alerts, visit history — your showroom remembers every customer who walks in.",
    isNew: true,
  },
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "World-class, conversion-focused websites that make your business look premium and turn visitors into enquiries.",
  },
  {
    icon: LayoutGrid,
    title: "Product Catalogs",
    description:
      "Show all products with prices, photos, filters, and enquiry buttons — searchable by your customers.",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Stores",
    description:
      "Take orders, accept payments via UPI/cards, manage inventory, and ship across India.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description:
      "Auto-replies, template messages, follow-up sequences, lead alerts — all through official WhatsApp Business API.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Analytics",
    description:
      "Real-time business dashboards — sales pipeline, staff performance, lead sources, conversion funnels — all on one screen.",
  },
  {
    icon: Blocks,
    title: "Custom Solutions",
    description:
      "If it doesn't exist off the shelf, we build it. Custom workflows, integrations, and tools tailored to your exact operation.",
  },
  {
    icon: MapPin,
    title: "Google Business",
    description:
      "Show up on Maps with photos, reviews, and contact info. Local SEO that brings customers to your door.",
  },
  {
    icon: Megaphone,
    title: "Landing Pages",
    description:
      "High-converting pages for specific offers, campaigns, or product launches.",
  },
  {
    icon: Zap,
    title: "Integrations & APIs",
    description:
      "Connect Meta lead ads, Google forms, payment gateways, BSPs, and third-party tools into one unified system.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Monthly updates, monitoring, bug fixes, and priority WhatsApp support — you're never left on your own.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page border-y border-border-harsh relative z-10"
    >
      <div className="max-w-[1440px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 lg:px-6">
          <div>
            <div className="section-tag">CAPABILITIES</div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase max-w-[680px]">
              We build the systems that run your business.
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-medium max-w-[360px]">
            From a single landing page to a complete digital operating system — we handle the technology so you can focus on growth.
          </p>
        </div>

        {/* ── Flagship Capabilities ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border-harsh mb-0">
          {FLAGSHIP_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <AnimatedReveal
                key={service.title}
                delay={idx * 0.08}
                className="group p-8 md:p-10 border-b border-r border-border-harsh flex flex-col items-start bg-bg-page hover:bg-accent transition-colors duration-0"
              >
                {/* Icon + Subtitle row */}
                <div className="flex items-center gap-3 mb-6 w-full">
                  <div className="size-11 border border-border-harsh flex items-center justify-center bg-bg-card group-hover:bg-accent-lime group-hover:text-accent group-hover:border-accent brutalist-shadow group-hover:shadow-none transition-none">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-text-muted group-hover:text-white/60">
                    {service.subtitle}
                  </span>
                  <span className="ml-auto font-display text-2xl md:text-3xl font-black leading-none tabular-nums text-border-subtle group-hover:text-white/30 transition-none">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary mb-4 group-hover:text-white">
                  {service.title}
                </h3>

                <p className="text-sm font-medium text-text-secondary leading-relaxed mb-6 group-hover:text-white/80">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5 border border-border-harsh bg-bg-card text-text-muted group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white/70 transition-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* ── Specialized Services Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-border-harsh bg-bg-page">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const inner = (
              <AnimatedReveal
                key={service.title}
                delay={idx * 0.04}
                className={`group p-8 border-b border-r border-border-harsh flex flex-col items-start bg-bg-page transition-colors duration-0 ${
                  service.isNew
                    ? "hover:bg-accent-lime"
                    : "hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between w-full mb-12">
                  <div
                    className={`size-10 border border-border-harsh flex items-center justify-center bg-bg-card group-hover:border-accent brutalist-shadow group-hover:shadow-none transition-none ${
                      service.isNew
                        ? "group-hover:bg-accent group-hover:text-white"
                        : "group-hover:bg-accent-lime group-hover:text-accent"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  {service.isNew && (
                    <span className="text-[8px] font-black tracking-[0.25em] uppercase bg-accent text-white px-2 py-1">
                      NEW · AI
                    </span>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold tracking-tight text-text-primary mb-3 group-hover:text-${
                    service.isNew ? "accent" : "white"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-sm font-medium text-text-secondary leading-relaxed ${
                    service.isNew
                      ? "group-hover:text-accent/80"
                      : "group-hover:text-white/80"
                  }`}
                >
                  {service.description}
                </p>

                {service.isNew && (
                  <span className="mt-6 text-[10px] font-bold tracking-[0.2em] uppercase text-accent/50 group-hover:text-accent border-b border-accent/30 group-hover:border-accent pb-0.5 transition-colors">
                    {service.href ? "Try demo →" : "Learn more →"}
                  </span>
                )}
              </AnimatedReveal>
            );

            return service.href ? (
              <Link key={service.title} href={service.href}>
                {inner}
              </Link>
            ) : (
              <React.Fragment key={service.title}>{inner}</React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
