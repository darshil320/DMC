"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "./ui/button";
import { LinkArrow } from "./ui/LinkArrow";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  const collageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.4,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-bg-page select-none"
    >
      {/* Background grain or grid overlays if desired */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center my-auto">
        {/* Left Side: Headline & Copy */}
        <motion.div
          className="flex flex-col items-start text-left"
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-text-primary uppercase font-extrabold tracking-[-0.05em] leading-[0.85] select-none"
              style={{ fontSize: "clamp(48px, 9.5vw, 128px)" }}
            >
              <motion.span variants={lineVariants} className="block">
                Turn Your
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="block text-accent"
              >
                Traffic Into
              </motion.span>
              <motion.span variants={lineVariants} className="block">
                Booked
              </motion.span>
              <motion.span variants={lineVariants} className="block">
                Dream Clients
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[540px] mb-8 font-medium"
          >
            We build strategic websites and digital systems for founders,
            studios, and service businesses that have attention — but need a
            sharper online experience that educates, qualifies, and converts.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-6"
          >
            <Button href="/contact" variant="accent" size="lg">
              Let’s Build Yours
            </Button>
            <LinkArrow href="#work" className="text-text-primary font-bold">
              See the Work
            </LinkArrow>
          </motion.div>
        </motion.div>

        {/* Right Side: Abstract UI Collage */}
        <motion.div
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center"
          variants={collageVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
        >
          {/* Collage wrapper */}
          <div className="relative w-full max-w-[480px] h-[480px]">
            {/* Box 1: Browser Window - Strategy Draft */}
            <div
              className={`absolute top-0 left-4 w-[280px] md:w-[320px] bg-bg-card border border-border-subtle rounded-2xl p-4 shadow-xl z-20 transition-all duration-500 hover:-translate-y-1 ${
                !shouldReduceMotion ? "float-subtle" : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              {/* Browser control dots */}
              <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
                <span className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
                <span className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
              </div>
              <div className="h-[2px] bg-border-subtle w-full mb-3" />
              <div className="flex flex-col gap-2">
                <div className="text-[10px] uppercase font-bold text-accent tracking-widest">
                  Active Sprint
                </div>
                <div className="text-sm font-bold text-text-primary leading-tight">
                  Forma Creative Redesign
                </div>
                <div className="space-y-1.5 mt-2">
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Positioning Audit
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Wireframe Flow Mapping
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    Copywriting System Integration
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Growth Metrics (Overlapping, right center) */}
            <div
              className={`absolute top-36 right-0 w-[200px] md:w-[220px] bg-bg-dark border border-neutral-800 rounded-2xl p-5 shadow-2xl z-30 transition-all duration-500 hover:scale-[1.02] ${
                !shouldReduceMotion ? "float-subtle" : ""
              }`}
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Inbound Stats
                </span>
                <span className="text-[10px] bg-accent/20 text-accent font-bold px-1.5 py-0.5 rounded">
                  +184%
                </span>
              </div>
              <div className="text-2xl font-black text-white leading-none mb-1">
                24 Leads
              </div>
              <p className="text-[10px] text-neutral-400 leading-normal">
                qualified and booked in the past 7 days directly on-site.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-400 font-semibold uppercase">
                <span>Filter Rate</span>
                <span className="text-white">92% Match</span>
              </div>
            </div>

            {/* Box 3: Website Mockup Card (Overlapping bottom left) */}
            <div
              className={`absolute bottom-4 left-0 w-[240px] md:w-[260px] bg-bg-card border border-border-subtle rounded-2xl p-4 shadow-lg z-10 transition-all duration-500 hover:-translate-y-1 ${
                !shouldReduceMotion ? "float-subtle" : ""
              }`}
              style={{ animationDelay: "2.5s" }}
            >
              <div className="w-full h-24 bg-bg-page/50 rounded-xl mb-3 border border-border-subtle overflow-hidden flex items-center justify-center p-2">
                {/* Visual mockup detail */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-16 h-1 bg-accent rounded" />
                  <div className="w-24 h-1.5 bg-text-primary rounded" />
                  <div className="w-12 h-1 bg-text-secondary rounded" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                    Product System
                  </span>
                  <span className="text-[12px] text-text-primary font-bold">
                    Acquisition Flow
                  </span>
                </div>
                <span className="w-6 h-6 rounded-full bg-accent-soft flex items-center justify-center text-accent text-xs font-black">
                  →
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Contacts, Socials, Scroll indicator */}
      <div className="max-w-[1440px] mx-auto w-full pt-8 border-t border-border-subtle grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 mt-12 text-xs font-bold uppercase tracking-widest text-text-secondary select-none">
        {/* Email */}
        <a
          href="mailto:hey@dmctech.in"
          className="justify-self-center md:justify-self-start hover:text-accent transition-colors"
        >
          hey@dmctech.in
        </a>

        {/* Social links hidden until official accounts are ready.
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-accent transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            X
          </a>
        </div>
        */}

        {/* Scroll down indicator */}
        <div className="justify-self-center flex items-center gap-2 text-text-muted">
          <span>Scroll to explore</span>
          <svg
            className="w-3.5 h-3.5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        <div className="hidden md:block" aria-hidden />
      </div>
    </section>
  );
}
export default Hero;
