"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { LiquidOcean } from "@/components/ui/liquid-ocean";

const PARAGRAPH = "Most businesses don't have a website problem. They have a system problem. Leads go cold, regulars get forgotten, and the same work gets done by hand every single day. We're an AI-native systems studio that rebuilds how you attract, sell, and follow up. Then we automate everything around the moments that actually make money. Enterprise-grade engineering, built direct, priced in the open. One showroom or fifty.";

const BATCH = 3;

function WordBatch({ words, progress, range }: { words: string[]; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="relative mr-[0.32em] mt-[0.18em] inline-block">
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
      className="flex flex-wrap font-medium text-text-primary max-w-[1000px]"
      style={{
        fontFamily: "SF Pro Display, Arial, sans-serif",
        fontSize: "clamp(20px, 2.6vw, 38px)",
        lineHeight: 1.32,
        letterSpacing: "-0.015em",
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
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page overflow-hidden">
      {/* Liquid Ocean background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.28]" aria-hidden="true">
        <LiquidOcean
          accentColor={0xc4622d}
          backgroundColor={0x0c0a08}
          showBoats={false}
          showGrid={false}
          rotationSpeed={0.0005}
          waveAmplitude={0.3}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 lg:mb-14 px-4 lg:px-6">
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

        {/* ── Our approach ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 pt-10 lg:pt-16 px-4 lg:px-6">
          {/* Left: label + heading + pointer */}
          <div className="lg:col-span-4 flex flex-col mb-10 lg:mb-0 lg:pr-12">
            <div className="section-tag">OUR APPROACH</div>
            <h3 className="mt-5 text-3xl md:text-4xl font-bold tracking-tighter uppercase text-text-primary leading-[1.0]">
              Systems first.
              <br />
              <span className="text-accent">Polish second.</span>
            </h3>
            {/* <motion.img
              src="https://cdn.prod.website-files.com/6918922cb5d769cc072f9e9e/691df85560dcfc6a761612b1_Finger%20Point%20Right.svg"
              loading="lazy"
              alt=""
              className="small-icon mobile-hidden w-11 h-11 md:w-13 md:h-13 mt-auto pt-10"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              style={{ rotate: "8deg", opacity: 0.85 }}
            /> */}
          </div>

          {/* Right: body */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:border-l border-border-harsh/40 lg:pl-12">
            <AnimatedReveal delay={0.05}>
              <p className="text-text-primary text-xl md:text-2xl leading-snug font-medium tracking-tight max-w-[640px]">
                We build more than websites. We build the system that runs your business: AI
                assistants that answer customers at 2 AM,{" "}
                <span className="text-accent font-semibold">CRMs that catch every lead the second it lands</span>,
                and dashboards that put your whole operation on one screen.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.12}>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-medium max-w-[600px]">
                Every process with a human touchpoint gets AI in the loop: sales, support, ops,
                follow-up. We map how your business actually works, rebuild it from first principles,
                then ship the system that runs it.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={0.18}>
              <p className="text-accent text-base md:text-lg leading-relaxed font-semibold italic">
                Then we make it look unmistakably yours.
              </p>
            </AnimatedReveal>

            {/* Founder signature */}
            <AnimatedReveal delay={0.24}>
              <div className="mt-2 flex items-center gap-4 border-t border-border-harsh pt-6">
                <div className="relative size-12 shrink-0 overflow-hidden border border-border-harsh bg-neutral-200">
                  <Image
                    src="/assets/darshil.jpg"
                    fill
                    sizes="48px"
                    quality={85}
                    className="object-cover object-top scale-[1.15]"
                    alt="Darshil Lashkari, Founder DMC"
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
                  Full story <ThinArrowUpRight />
                </Link>
              </div>
            </AnimatedReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
