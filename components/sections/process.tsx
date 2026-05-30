"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "MAP",
    subtitle: "Strategy // Structure",
    desc: "We start by understanding your goals, your positioning, and what actually makes your brand valuable. This is where we figure out the story you're telling, who needs to hear it, and how to guide them from curious to ready to book.",
    graphic: (
      <div className="relative w-48 h-48 opacity-90 transition-opacity group-hover:opacity-100">
        <Image 
          src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/6974cbc80c8fcd560c92026c_map.svg" 
          fill 
          alt="Map Strategy" 
          className="object-contain transition-all duration-500 [filter:brightness(0)] group-hover:[filter:invert(12%)_sepia(98%)_saturate(7042%)_hue-rotate(243deg)_brightness(112%)_contrast(143%)]"
        />
      </div>
    ),
  },
  {
    num: "02",
    title: "MAKE",
    subtitle: "Design // Experience",
    desc: "Your brand gets translated into a visual journey that feels intentional. Every click, scroll, and CTA has a purpose. We're building the experience that takes your leads from 'this looks interesting' to 'I need to work with them.'",
    graphic: (
      <div className="relative w-48 h-48 opacity-90 transition-opacity group-hover:opacity-100">
        <Image 
          src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/6974cbc8861fbf07e229e1cb_make.svg" 
          fill 
          alt="Make Design" 
          className="object-contain transition-all duration-500 [filter:brightness(0)] group-hover:[filter:invert(12%)_sepia(98%)_saturate(7042%)_hue-rotate(243deg)_brightness(112%)_contrast(143%)]"
        />
      </div>
    ),
  },
  {
    num: "03",
    title: "MOVE",
    subtitle: "Develop // Automate",
    desc: "We build it fast, clean, and scalable. Then we plug in the tools, automate, and set up your systems. Your website becomes something that works for you, educating leads, filtering out, and delivering qualified clients ready to book.",
    graphic: (
      <div className="relative w-48 h-48 opacity-90 transition-opacity group-hover:opacity-100">
        <Image 
          src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/6974cbc8367ce36cd627e7cf_move.svg" 
          fill 
          alt="Move Develop" 
          className="object-contain transition-all duration-500 [filter:brightness(0)] group-hover:[filter:invert(12%)_sepia(98%)_saturate(7042%)_hue-rotate(243deg)_brightness(112%)_contrast(143%)]"
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
    <section ref={containerRef} id="process" className="w-full bg-bg-page select-none relative z-10 py-24">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-0">
        
        {/* Header Column (Col 1) */}
        <div className="p-6 md:p-12 lg:p-10 flex flex-col items-start bg-bg-page lg:border-r border-border-subtle relative">
          <div className="section-tag mb-6">
            Process
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-text-primary mb-6">
            How It Works
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-sans font-light leading-relaxed mb-12 max-w-[280px]">
            Here's how we build websites that actually work for local businesses:
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
              className={`group p-6 md:p-12 lg:p-10 flex flex-col items-center text-center bg-bg-page
                ${idx !== STEPS.length - 1 ? 'lg:border-r border-border-subtle' : ''}
              `}
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
