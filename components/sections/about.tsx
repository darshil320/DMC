"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";

const PARAGRAPH = "Every missed DM, every lead that went cold, every customer your team forgot to follow up with — that's revenue walking out the door. Your business runs on relationships, but your systems can't keep up. We build the digital infrastructure that makes sure nothing falls through the cracks.";

const BATCH = 3;

function WordBatch({ words, progress, range }: { words: string[]; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="relative mr-[1.5vw] mt-2 inline-block">
          <span className="absolute opacity-20">{word}</span>
          <motion.span style={{ opacity }}>{word}</motion.span>
        </span>
      ))}
    </>
  );
}

function ScrollTextReveal({ value }: { value: string }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "start 20%"],
  });

  const words = value.split(" ");
  const batches: string[][] = [];
  for (let i = 0; i < words.length; i += BATCH) {
    batches.push(words.slice(i, i + BATCH));
  }

  return (
    <div
      ref={container}
      className="flex flex-wrap font-medium tracking-tight text-text-primary leading-[1.3] max-w-[1000px]"
      style={{
        fontFamily: "SF Pro Display, Arial, sans-serif",
        fontSize: "clamp(18px, 2.4vw, 34.4px)",
      }}
    >
      {batches.map((batch, i) => {
        const start = i / batches.length;
        const end = start + (1 / batches.length);
        return <WordBatch key={i} words={batch} progress={scrollYProgress} range={[start, end]} />;
      })}
    </div>
  );
}

export function AboutUsSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page">
      <div className="max-w-[1440px] mx-auto w-full">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 lg:mb-24 px-4 lg:px-6">
          <div className="lg:col-span-2">
            <div className="section-tag">ABOUT US</div>
          </div>
          <div className="lg:col-span-10">
            <ScrollTextReveal value={PARAGRAPH} />
          </div>
        </div>

        {/* Divider with Link */}
        <div className="w-full relative flex flex-col md:flex-row items-center justify-end mb-12 lg:mb-16">
          <div className="w-full h-px bg-border-harsh absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0" />
          <a
            href="#services"
            className="bg-bg-page pl-4 relative z-10 flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase hover:text-text-primary transition-colors"
          >
            MORE ABOUT US <ThinArrowUpRight />
          </a>
        </div>

        {/* Bottom Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4 lg:px-6">
          <div className="lg:col-span-3 lg:col-start-3">
            {/* Inline SVG replaces external CDN fetch */}
            <svg
              viewBox="0 0 64 64"
              className="w-12 h-12 md:w-16 md:h-16 text-text-primary"
              style={{ transform: "rotate(9.7068deg)" }}
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 32h44M38 20l14 12-14 12" />
            </svg>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-4">
            <AnimatedReveal delay={0.1}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-medium">
                At <span className="text-accent font-bold">DMC</span>, we don&apos;t just build websites — we build the complete system that runs your business. From AI chatbots that answer your customers at 2 AM, to CRMs that track every lead, to dashboards that show you everything on one screen. We start by understanding how your operation actually works, then we digitize it.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.2}>
              <p className="text-text-primary text-base md:text-lg leading-relaxed font-bold italic">
                Then we make it look fire!!
              </p>
            </AnimatedReveal>
          </div>
        </div>

        {/* Founder Block */}

        {/* <div className="mt-20 px-4 lg:px-6 border-t border-border-harsh pt-16">
          <AnimatedReveal>
            <div className="flex flex-col sm:flex-row items-start gap-8 max-w-[720px]">
              <div className="relative shrink-0">
                <div className="absolute -top-2 -left-2 w-full h-full border border-accent pointer-events-none" />
                <Image
                  src="/assets/darshil.jpg"
                  alt="Darshil Lashkari — Founder, DMC Tech"
                  width={160}
                  height={213}
                  className="relative z-10 block object-cover object-top grayscale brightness-90"
                  style={{ width: 160, height: 213 }}
                />
              </div>

              <div className="flex flex-col gap-3 pt-1">
                <div className="section-tag">BUILT BY</div>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tighter uppercase text-text-primary leading-none">
                    Darshil
                  </h3>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tighter uppercase text-accent leading-none">
                    Lashkari
                  </h3>
                </div>
                <p className="text-text-secondary text-sm font-medium uppercase tracking-widest">
                  Founder — DMC Tech
                </p>
                <p className="text-text-secondary text-sm leading-relaxed font-medium max-w-[380px] mt-1">
                  Builder, systems thinker, and the person who picks up your call. Every project at DMC goes through me personally — from the first brief to the final launch.
                </p>
              </div>
            </div>
          </AnimatedReveal>
        </div> */}

      </div>
    </section>
  );
}
