"use client";

import React, { useRef } from "react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { motion, useScroll, useTransform } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "MAP",
    subtitle: "Strategy // Structure",
    desc: "We start by understanding your goals, your positioning, and what actually makes your brand valuable. This is where we figure out the story you're telling, who needs to hear it, and how to guide them from curious to ready to book.",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-40 h-40 opacity-80" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="15" />
        {Array.from({length: 8}).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          return (
            <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos(angle)} y2={50 + 45 * Math.sin(angle)} />
          );
        })}
        <polygon points="50,5 82,18 95,50 82,82 50,95 18,82 5,50 18,18" stroke="currentColor" strokeWidth="1" />
        {[ [50,5], [82,18], [95,50], [82,82], [50,95], [18,82], [5,50], [18,18], [50,50] ].map((pt, i) => (
          <circle key={i} cx={pt[0]} cy={pt[1]} r="2" fill="currentColor" stroke="none" />
        ))}
      </svg>
    ),
  },
  {
    num: "02",
    title: "MAKE",
    subtitle: "Design // Experience",
    desc: "Your brand gets translated into a visual journey that feels intentional. Every click, scroll, and CTA has a purpose. We're building the experience that takes your leads from 'this looks interesting' to 'I need to work with them.'",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-40 h-40 opacity-80" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <circle cx="50" cy="50" r="8" fill="transparent" stroke="currentColor" strokeWidth="2" />
        {Array.from({length: 16}).map((_, i) => {
          const angle = (i * Math.PI) / 8;
          return (
            <line key={i} x1={50 + 10 * Math.cos(angle)} y1={50 + 10 * Math.sin(angle)} x2={50 + 45 * Math.cos(angle)} y2={50 + 45 * Math.sin(angle)} strokeWidth={i % 2 === 0 ? "1" : "0.25"} />
          );
        })}
        {[ [62, 58], [42, 68], [58, 48], [38, 38], [54, 32] ].map((pt, i) => (
          <circle key={i} cx={pt[0]} cy={pt[1]} r="1" fill="currentColor" />
        ))}
      </svg>
    ),
  },
  {
    num: "03",
    title: "MOVE",
    subtitle: "Develop // Automate",
    desc: "We build it fast, clean, and scalable. Then we plug in the tools, automate, and set up your systems. Your website becomes something that works for you, educating leads, filtering out, and delivering qualified clients ready to book.",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-40 h-40 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="50" cy="50" r="40" strokeDasharray="4 6" />
        <circle cx="50" cy="50" r="25" strokeDasharray="4 6" />
        <circle cx="50" cy="50" r="10" strokeDasharray="4 6" />
        <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
        {/* Arrows */}
        <polygon points="50,10 47,15 53,15" fill="currentColor" stroke="none" />
        <polygon points="90,50 85,47 85,53" fill="currentColor" stroke="none" />
        <polygon points="50,90 47,85 53,85" fill="currentColor" stroke="none" />
        <polygon points="10,50 15,47 15,53" fill="currentColor" stroke="none" />
        
        <polygon points="50,25 47,30 53,30" fill="currentColor" stroke="none" />
        <polygon points="75,50 70,47 70,53" fill="currentColor" stroke="none" />
        <polygon points="50,75 47,70 53,70" fill="currentColor" stroke="none" />
        <polygon points="25,50 30,47 30,53" fill="currentColor" stroke="none" />
      </svg>
    ),
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateInverse = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, 540]);

  return (
    <section ref={containerRef} id="process" className="w-full border-y border-border-harsh bg-bg-page select-none relative z-10">
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-4">
        
        {/* Header Column (Col 1) */}
        <div className="p-6 md:p-12 lg:p-10 border-b lg:border-b-0 lg:border-r border-border-harsh flex flex-col items-start bg-bg-page">
          <div className="bg-accent text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
            PROCESS
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-10 max-w-[280px]">
            Here's how we build websites that actually work:
          </p>
          <a href="#services" className="text-accent text-xs font-bold tracking-widest uppercase hover:text-text-primary flex items-center gap-1">
            LEARN MORE <ThinArrowUpRight className="size-4" />
          </a>
        </div>

        {/* Steps Columns (Cols 2-4) */}
        {STEPS.map((step, idx) => {
          const rotation = idx === 1 ? rotateInverse : idx === 2 ? rotateFast : rotate;
          return (
            <AnimatedReveal
              key={step.num}
              delay={idx * 0.1}
              className={`p-6 md:p-12 lg:p-10 flex flex-col items-center text-center bg-bg-page
                ${idx !== STEPS.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-border-harsh' : ''}
              `}
            >
              {/* Step Header */}
              <div className="flex flex-col items-center gap-1 mb-12">
                <span className="text-[10px] font-display text-text-muted">{step.num}</span>
                <h3 className="text-5xl md:text-6xl font-display font-bold text-accent tracking-wider">
                  {step.title}
                </h3>
                <span className="text-sm font-medium text-text-primary mt-2">
                  {step.subtitle}
                </span>
              </div>

              {/* Abstract Graphic */}
              <div className="flex items-center justify-center w-full h-[200px] mb-12 text-text-primary hover:text-accent transition-colors duration-500 hover:scale-105 cursor-default">
                <motion.div style={{ rotate: rotation }} className="origin-center flex items-center justify-center">
                  {step.graphic}
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mt-auto max-w-[280px]">
                {step.desc}
              </p>
            </AnimatedReveal>
          );
        })}
        
      </div>
    </section>
  );
}
