"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Anchor, PhoneCall, MapPin, ShieldCheck } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DMC } from "@/lib/dmc-config";

const VALUES = [
  {
    icon: Anchor,
    title: "You Own It",
    desc: "We custom build systems that you control. No endless SaaS subscriptions, no platform lock-in. It's your business, your data, your infrastructure.",
  },
  {
    icon: PhoneCall,
    title: "Direct Line",
    desc: "You talk directly to the builder, not a support queue or an account manager. When you need something changed, it happens fast.",
  },
  {
    icon: MapPin,
    title: "Local & Present",
    desc: "Based in Ahmedabad. We understand the local market, the language (Hindi, Gujarati), and how Indian businesses actually operate.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Run",
    desc: "We don't just launch and leave. We build robust systems meant to handle scale, and we stick around to maintain and optimize them.",
  },
];

const ABOUT_STATS = [
  { value: "1", label: "Direct builder" },
  { value: "4", label: "Operating principles" },
  { value: "0", label: "Platform lock-in" },
];

export function AboutPageContent() {
  return (
    <main className="relative z-10 min-h-screen bg-bg-page text-text-primary">
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto">

          {/* Hero */}
          <AnimatedReveal className="mb-20">
            <div className="section-tag">ABOUT US</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-text-primary uppercase max-w-[800px] leading-[0.95] mt-4">
              We&apos;re {DMC.name}.
            </h1>
            <p className="text-text-secondary text-base md:text-lg font-medium max-w-[500px] mt-8 leading-relaxed">
              {DMC.tagline} We believe that local businesses shouldn&apos;t be held back by manual processes and disconnected tools.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.05}>
            <div className="mb-20 grid grid-cols-1 border-t border-l border-border-harsh sm:grid-cols-3">
              {ABOUT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden border-b border-r border-border-harsh bg-bg-card px-6 py-7"
                >
                  <CornerTicks tone="accent" />
                  <AnimatedCounter
                    value={stat.value}
                    className="font-display text-4xl md:text-5xl font-black leading-none tracking-tighter text-accent transition-colors group-hover:text-text-primary"
                  />
                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-accent">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedReveal>

          {/* Story Block */}
          <AnimatedReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 py-16 border-t border-border-harsh">
              <div className="lg:col-span-4">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tighter uppercase text-text-primary">
                  The Story
                </h2>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-6 text-text-secondary text-base md:text-lg leading-relaxed border-l-0 lg:border-l border-border-harsh/30 lg:pl-12">
                <p>
                  Most digital agencies just want to sell you a website. They give you a template, charge you a premium, and leave you with something that looks pretty but doesn&apos;t actually help you run your business.
                </p>
                <p>
                  We saw too many great local businesses — furniture showrooms, retail stores, service providers — losing out on revenue because their operations were entirely manual. Leads from Instagram were falling through the cracks, returning customers weren&apos;t being recognized, and owners had no visibility into their sales pipelines.
                </p>
                <p className="text-text-primary font-medium">
                  So we decided to fix it. We don&apos;t just build digital storefronts; we build the underlying operating systems. Custom CRMs, AI WhatsApp assistants, real-time dashboards, and automated workflows. We digitize the messy parts of your business so you can focus on growth.
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Profile Block */}
          <AnimatedReveal delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 py-16 border-t border-border-harsh">
              <div className="lg:col-span-4">
                <div className="group relative aspect-square w-full max-w-[300px] overflow-hidden bg-neutral-200">
                  <CornerTicks tone="white" />
                  {/* Placeholder for Darshil's Photo */}
                  <Image
                    src="/assets/darshil.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    quality={85}
                    className="object-cover object-top scale-[1.2] opacity-100 group-hover:scale-[1.25] transition-all duration-500"
                    alt="Darshil Lashkari"
                  />
                  <div className="absolute inset-0 bg-accent/5 mix-blend-multiply group-hover:bg-transparent transition-all duration-500" />
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col justify-center gap-6 border-l-0 lg:border-l border-border-harsh/30 lg:pl-12">
                <div>
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-accent block mb-2">FOUNDER & LEAD ENGINEER</span>
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary">
                    Darshil Lashkari
                  </h3>
                </div>
                <p className="text-text-secondary text-base leading-relaxed max-w-[600px]">
                  &ldquo;When you work with DMC, you don&apos;t talk to a project manager who talks to a designer who talks to a developer. You talk directly to the person architecting your system. We keep it lean, fast, and intensely focused on what actually drives results for your business.&rdquo;
                </p>
                <MagneticButton strength={8} className="mt-4 w-fit">
                  <a
                    href={DMC.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit items-center justify-center gap-2 border border-border-harsh bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest text-text-primary transition-colors hover:border-accent-lime hover:bg-accent-lime hover:text-accent brutalist-shadow"
                  >
                    <MessageCircle className="size-4 transition-transform group-hover:scale-110" />
                    Chat with Darshil
                  </a>
                </MagneticButton>
              </div>
            </div>
          </AnimatedReveal>

          {/* Values Strip */}
          <AnimatedReveal delay={0.3}>
            <div className="py-16 border-t border-border-harsh">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {VALUES.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div key={idx} className="group relative flex flex-col gap-4 overflow-hidden border border-border-harsh bg-bg-card p-6">
                      <CornerTicks tone="accent" />
                      <div className="size-10 border border-border-harsh bg-bg-page flex items-center justify-center">
                        <Icon className="size-5 text-accent" />
                      </div>
                      <h4 className="text-lg font-bold tracking-tight text-text-primary uppercase">
                        {val.title}
                      </h4>
                      <p className="text-sm font-medium text-text-secondary leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedReveal>

          {/* CTA */}
          <AnimatedReveal delay={0.4}>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 py-20 border-t border-border-harsh text-center">
              <h3 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase">
                Ready to build?
              </h3>
              <p className="text-text-secondary text-sm md:text-base font-medium max-w-[500px]">
                Let&apos;s discuss your business bottlenecks and architect the system that solves them.
              </p>
              <MagneticButton strength={10} className="mt-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 border border-accent bg-accent px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-lime hover:text-accent brutalist-shadow"
                >
                  Start Your Project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </AnimatedReveal>

        </div>
      </section>
    </main>
  );
}
