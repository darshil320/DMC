"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";

const PARAGRAPH = "We're an AI-native systems studio. We don't hand you a website and walk away — we re-architect how your business runs from first principles, with AI in the loop at every step, so it sells, follows up, and scales without you in the room.";

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

        {/* ── Why we exist — the belief behind the work ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4 lg:px-6">
          <div className="lg:col-span-3">
            <div className="section-tag">OUR APPROACH</div>
            <motion.img
              src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/691df85560dcfc6a761612b1_Finger%20Point%20Right.svg"
              loading="lazy"
              alt=""
              className="small-icon mobile-hidden w-8 h-8 md:w-12 md:h-12 mt-6"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ rotate: "8deg", opacity: 1 }}
            />
          </div>
          <div className="lg:col-span-9 flex flex-col gap-6 max-w-[760px]">
            <AnimatedReveal delay={0.05}>
              <p className="text-text-primary text-xl md:text-3xl leading-snug font-medium tracking-tight">
                We don&apos;t just build websites — we build the system that runs your business. AI
                assistants that answer customers at 2 AM,{" "}
                <span className="text-accent font-bold">CRMs that catch every lead the second it lands</span>,
                and dashboards that put your whole operation on one screen.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.12}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-medium">
                Every process with a human touchpoint gets AI in the loop — sales, support, ops,
                follow-up. We map how your business actually works, rebuild it from first principles,
                then ship the system that runs it. Same playbook whether you&apos;re a single
                showroom or a multi-location brand.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.18}>
              <p className="text-text-primary text-base md:text-lg leading-relaxed font-bold italic">
                Then we make it look unmistakably yours.
              </p>
            </AnimatedReveal>

            {/* Founder signature */}
            <AnimatedReveal delay={0.24}>
              <div className="mt-4 flex items-center gap-4 border-t border-border-harsh pt-6">
                <div className="relative size-14 shrink-0 overflow-hidden border border-border-harsh bg-neutral-200">
                  <Image
                    src="/assets/darshil.jpg"
                    fill
                    sizes="56px"
                    quality={85}
                    className="object-cover object-top scale-[1.15]"
                    alt="Darshil Lashkari — Founder, DMC"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-text-primary">
                    Darshil Lashkari
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                    Founder &amp; Lead Engineer
                  </span>
                </div>
                <Link
                  href="/about"
                  className="ml-auto hidden sm:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent hover:text-text-primary transition-colors"
                >
                  Read the full story <ThinArrowUpRight />
                </Link>
              </div>
            </AnimatedReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
