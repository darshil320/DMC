"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";

const PARAGRAPH = "Most websites just sit there, but yours is about to be the talk of the town. Right now? Your website might be the thing holding you back. It doesn't position you as the premium choice. And every dream client who lands on it... just walks away.";

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-[1.5vw] mt-2 inline-block">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
}

function ScrollTextReveal({ value }: { value: string }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "start 20%"]
  });

  const words = value.split(" ");
  return (
    <div 
      ref={container} 
      className="flex flex-wrap font-medium tracking-tight text-text-primary leading-[1.3] max-w-[1000px]"
      style={{
        fontFamily: "SF Pro Display, Arial, sans-serif",
        fontSize: "34.4px"
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

export function AboutUsSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page">
      <div className="max-w-[1440px] mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          {/* Blue Badge (Col 1-2) */}
          <div className="lg:col-span-2">
            <div className="bg-accent text-white px-3 py-1 font-pixel font-bold uppercase tracking-widest inline-block">
              ABOUT US
            </div>
          </div>

          {/* Massive Faded Text (Col 3-12) */}
          <div className="lg:col-span-10">
            <ScrollTextReveal value={PARAGRAPH} />
          </div>
        </div>

        {/* Divider with Link */}
        <div className="w-full relative flex flex-col md:flex-row items-center justify-end mb-16">
          <div className="w-full h-px bg-border-harsh absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0" />
          <a href="#services" className="bg-bg-page pl-4 relative z-10 flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase hover:text-text-primary transition-colors">
            MORE ABOUT US <ThinArrowUpRight />
          </a>
        </div>

        {/* Bottom Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 lg:col-start-3">
            <img 
              src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/691df85560dcfc6a761612b1_Finger%20Point%20Right.svg" 
              loading="lazy" 
              alt="Finger Point Right" 
              className="w-12 h-12 md:w-16 md:h-16 text-text-primary"
              style={{ transform: "rotate(9.7068deg)" }}
            />
          </div>
          <div className="lg:col-span-6 flex flex-col gap-4">
            <AnimatedReveal delay={0.1}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-medium">
                At <span className="text-accent font-bold">DMC</span>, we build the website that captures the full weight of what you've built and tells your full story. We start by mapping your business goals, figuring out the flow, then building the strategy and systems that make it happen.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.2}>
              <p className="text-text-primary text-base md:text-lg leading-relaxed font-bold italic">
                Then we make it look fire!!
              </p>
            </AnimatedReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
