"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { motion, useScroll, useTransform } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "MAP",
    subtitle: "Audit // Architecture",
    phase: "Days 1–2",
    desc: "We start by analyzing your current operations to find the bottlenecks, leaky pipelines, and manual tasks draining your team. Then, we architect a custom system designed specifically for how your business actually runs.",
    graphic: (
      <div className="relative w-48 h-48 opacity-90 transition-opacity group-hover:opacity-100">
        <Image 
          src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/6974cbc80c8fcd560c92026c_map.svg" 
          fill 
          alt="Map Strategy" 
          className="object-contain transition-all duration-500 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] group-hover:[filter:invert(12%)_sepia(98%)_saturate(7042%)_hue-rotate(243deg)_brightness(112%)_contrast(143%)]"
        />
      </div>
    ),
  },
  {
    num: "02",
    title: "MAKE",
    subtitle: "Develop // Automate",
    phase: "Days 3–10",
    desc: "Your custom infrastructure is built. We develop the CRM, configure the AI chatbots, set up the databases, and design the interfaces. Every component is rigorously tested to ensure data flows perfectly across your entire operation.",
    graphic: (
      <div className="relative w-48 h-48 opacity-90 transition-opacity group-hover:opacity-100">
        <Image 
          src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/6974cbc8861fbf07e229e1cb_make.svg" 
          fill 
          alt="Make Design" 
          className="object-contain transition-all duration-500 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] group-hover:[filter:invert(12%)_sepia(98%)_saturate(7042%)_hue-rotate(243deg)_brightness(112%)_contrast(143%)]"
        />
      </div>
    ),
  },
  {
    num: "03",
    title: "MOVE",
    subtitle: "Deploy // Scale",
    phase: "Days 11–14",
    desc: "We don't just hand over software; we onboard your team. We plug the systems into your business, automate the tedious work, and give you the real-time dashboards you need to finally scale without operations breaking.",
    graphic: (
      <div className="relative w-48 h-48 opacity-90 transition-opacity group-hover:opacity-100">
        <Image 
          src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/6974cbc8367ce36cd627e7cf_move.svg" 
          fill 
          alt="Move Develop" 
          className="object-contain transition-all duration-500 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] group-hover:[filter:invert(12%)_sepia(98%)_saturate(7042%)_hue-rotate(243deg)_brightness(112%)_contrast(143%)]"
        />
      </div>
    ),
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateInverse = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, 270]);

  return (
    <section ref={containerRef} id="process" className="w-full bg-bg-page select-none relative z-10 py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-0">
        
        {/* Header Column (Col 1) */}
        <div className="p-6 md:p-12 lg:p-10 flex flex-col items-start bg-bg-page relative">
          <div className="section-tag mb-6">
            Process
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-primary mb-6">
            How It Works
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-sans font-light leading-relaxed mb-8 max-w-[280px]">
            Here&apos;s how we architect the systems that run your business:
          </p>

          {/* Time-bound promise */}
          <div className="mb-4 inline-flex border border-accent bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
            Websites live in 14 days
          </div>
          <p className="text-text-muted text-[11px] font-medium leading-relaxed mb-10 max-w-[280px]">
            Timeline shown is for a starter website. Full business systems are scoped and dated before we begin — no surprises.
          </p>

          <a href="#services" className="text-text-primary hover:text-accent transition-colors flex items-center justify-center size-14 rounded-full border border-border-harsh hover:border-accent">
            <ThinArrowUpRight className="size-5" />
          </a>
        </div>

        {/* Steps Columns (Cols 2-4) */}
        {STEPS.map((step, idx) => {
          const rotation = idx === 1 ? rotateInverse : idx === 2 ? rotateFast : rotate;
          return (
            <AnimatedReveal
              key={step.num}
              delay={idx * 0.1}
              className="group p-6 md:p-12 lg:p-10 flex flex-col items-center text-center bg-bg-page"
            >
              {/* Step Header */}
              <div className="flex flex-col items-center gap-2 mb-12">
                <span className="text-[10px] font-sans tracking-[0.2em] text-text-muted">{step.num}</span>
                <h3 className="text-5xl md:text-6xl font-display font-medium text-accent tracking-wide mt-2">
                  {step.title}
                </h3>
                <span className="text-sm font-sans font-medium text-text-primary tracking-wide mt-2">
                  {step.subtitle}
                </span>
                <span className="mt-3 inline-flex border border-border-harsh bg-bg-card px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-text-primary group-hover:border-accent group-hover:text-accent transition-colors">
                  {step.phase}
                </span>
              </div>

              {/* External SVG Graphic */}
              <div className="flex items-center justify-center w-full h-[240px] mb-12">
                <motion.div style={{ rotate: rotation }} className="origin-center flex items-center justify-center">
                  {step.graphic}
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm font-sans font-light leading-relaxed mt-auto ">
                {step.desc}
              </p>
            </AnimatedReveal>
          );
        })}
        
      </div>
    </section>
  );
}
