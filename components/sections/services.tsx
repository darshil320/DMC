"use client";

import React from "react";
import Link from "next/link";
import { Globe, LayoutGrid, ShoppingCart, MessageCircle, MapPin, Megaphone, Wrench, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

const SERVICES = [
  { icon: Sparkles, title: "AI Room Visualizer", description: "Let customers see any product in their own room — AI places it with accurate lighting and scale in 30 seconds.", isNew: true, href: "/demo/ai-visualizer" },
  { icon: Globe, title: "Business Websites", description: "Clean, professional websites that represent your shop online." },
  { icon: LayoutGrid, title: "Product Catalogs", description: "Show all products with prices, photos, and enquiry buttons." },
  { icon: ShoppingCart, title: "Ecommerce Stores", description: "Take orders, accept payments, and ship across India." },
  { icon: MessageCircle, title: "WhatsApp Systems", description: "Auto-replies, quick links, and organized chat flows." },
  { icon: MapPin, title: "Google Business", description: "Show up on Maps with photos, reviews, and contact info." },
  { icon: Megaphone, title: "Landing Pages", description: "High-converting pages for specific offers or campaigns." },
  { icon: Wrench, title: "Maintenance", description: "Monthly updates and tech support so you don't have to." },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page border-y border-border-harsh relative z-10">
      <div className="max-w-[1440px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 lg:px-6">
          <div>
            <div className="section-tag">
              CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase max-w-[600px]">
              Everything you need to run online.
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-medium max-w-[320px]">
            We handle the tech infrastructure so you can focus entirely on handling your sales.
          </p>
        </div>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border-harsh bg-bg-page">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const inner = (
              <AnimatedReveal
                key={service.title}
                delay={idx * 0.05}
                className={`group p-8 border-b border-r border-border-harsh flex flex-col items-start bg-bg-page transition-colors duration-0 ${
                  service.isNew
                    ? "hover:bg-accent-lime"
                    : "hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between w-full mb-12">
                  <div className={`size-10 border border-border-harsh flex items-center justify-center bg-bg-card group-hover:border-accent brutalist-shadow transition-none ${
                    service.isNew ? "group-hover:bg-accent group-hover:text-white" : "group-hover:bg-accent-lime group-hover:text-accent"
                  }`}>
                    <Icon className="size-5" />
                  </div>
                  {service.isNew && (
                    <span className="text-[8px] font-black tracking-[0.25em] uppercase bg-accent text-white px-2 py-1">
                      NEW · AI
                    </span>
                  )}
                </div>

                <h3 className={`text-lg font-bold tracking-tight text-text-primary mb-3 group-hover:text-${service.isNew ? "accent" : "white"}`}>
                  {service.title}
                </h3>

                <p className={`text-sm font-medium text-text-secondary leading-relaxed ${service.isNew ? "group-hover:text-accent/80" : "group-hover:text-white/80"}`}>
                  {service.description}
                </p>

                {service.isNew && (
                  <span className="mt-6 text-[10px] font-bold tracking-[0.2em] uppercase text-accent/50 group-hover:text-accent border-b border-accent/30 group-hover:border-accent pb-0.5 transition-colors">
                    Try demo →
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
