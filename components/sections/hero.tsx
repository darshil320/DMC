"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "motion/react";
import { DMC, SOCIAL_LINKS } from "@/lib/dmc-config";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePremiumMotion, useMediaQuery } from "@/lib/hooks/use-environment";

// Heavy WebGL scene — loaded only on desktop/fine-pointer/motion-allowed and
// only after the intro, so it never touches the mobile bundle or first paint.
const HeroBackdrop = dynamic(() => import("@/components/three/HeroBackdrop"), {
  ssr: false,
});

const HEADING_STYLE = {
  fontSize: "clamp(48px, 11vw, 150px)",
  letterSpacing: "-0.05em",
  fontFamily: "var(--font-body)",
} as const;

const HEADING_CLASSNAME = "text-text-primary uppercase leading-[1.05] md:leading-[0.9] font-black";

export function HeroSection() {
  const { scrollY } = useScroll();
  const yHeadline = useTransform(scrollY, [0, 1000], [0, 300]);
  const scaleHeadline = useTransform(scrollY, [0, 800], [1, 0.9]);
  const yBackdrop = useTransform(scrollY, [0, 1000], [0, 450]);
  const opacityMain = useTransform(scrollY, [0, 600], [1, 0]);
  const opacityBottom = useTransform(scrollY, [0, 300], [1, 0]);

  const [hoverKey, setHoverKey] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const premiumMotion = usePremiumMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Defer mounting the 3D backdrop until the intro has played, so it never
  // competes with the GSAP headline reveal or the loader hand-off.
  useEffect(() => {
    const reveal = () => setShow3D(true);

    if (document.querySelector("[data-brutalist-loader]")) {
      window.addEventListener("dmc:loader-complete", reveal, { once: true });
      const fallback = window.setTimeout(reveal, 1600);
      return () => {
        window.removeEventListener("dmc:loader-complete", reveal);
        window.clearTimeout(fallback);
      };
    }

    const timer = window.setTimeout(reveal, 500);
    return () => window.clearTimeout(timer);
  }, [premiumMotion]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let hasStarted = false;
    let introTimeline: gsap.core.Timeline | undefined;
    let fallbackTimer: number | undefined;

    const query = gsap.utils.selector(section);
    const baseLines = query<HTMLElement>("[data-hero-base]");
    const highlightDetails = query<HTMLElement>("[data-hero-highlight-detail]");
    const secondary = query<HTMLElement>("[data-hero-copy], [data-hero-cta], [data-hero-bottom]");
    const nav = document.querySelector<HTMLElement>("[data-hero-nav]");
    const headlineLines = baseLines.slice(0, -1);
    const highlightLine = baseLines[baseLines.length - 1];

    const secondaryTargets = nav ? [...secondary, nav] : secondary;
    const clearHeroTargets = [...baseLines, ...highlightDetails, ...secondary];

    gsap.set(baseLines, {
      autoAlpha: 0,
      clipPath: "inset(50% 0% 50% 0%)",
      filter: "blur(10px)",
      force3D: true,
      scale: (index) => [1.58, 1.42, 1.72][index] ?? 1.4,
      transformOrigin: "50% 52%",
      x: (index) => [-28, 22, 0][index] ?? 0,
      y: (index) => [-44, 34, 56][index] ?? 34,
    });

    gsap.set(highlightDetails, {
      autoAlpha: 0,
      scaleX: 0.2,
      scaleY: 0.82,
      transformOrigin: "50% 50%",
    });

    gsap.set(secondaryTargets, {
      autoAlpha: 0,
      y: (index, target) => (target === nav ? 0 : 18),
    });

    const startIntro = () => {
      if (hasStarted) return;
      hasStarted = true;

      introTimeline = gsap.timeline({
        delay: 0.02,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(clearHeroTargets, {
            clearProps: "opacity,visibility,transform,clipPath,filter",
          });
          if (nav) {
            gsap.set(nav, { clearProps: "opacity,visibility,transform" });
          }
        },
      });

      introTimeline.to(
          headlineLines,
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px)",
            scale: 0.985,
            x: 0,
            y: 0,
            duration: 0.82,
            stagger: 0.1,
            ease: "expo.out",
          },
          0
        );

      introTimeline.to(
          headlineLines,
          {
            scale: 1,
            duration: 0.36,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.56
        );

      if (highlightLine) {
        introTimeline.to(
            highlightLine,
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              filter: "blur(0px)",
              scale: 0.975,
              x: 0,
              y: 0,
              duration: 0.88,
              ease: "expo.out",
            },
            0.44
          );

        introTimeline.to(
            highlightLine,
            {
              scale: 1,
              duration: 0.38,
              ease: "power3.out",
            },
            1.14
          );
      }

      introTimeline.fromTo(
          highlightDetails,
          {
            autoAlpha: 0,
            scaleX: 0.16,
            scaleY: 0.82,
          },
          {
            autoAlpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 0.45,
            stagger: 0.02,
            ease: "expo.out",
          },
          1.3
        );

      introTimeline.fromTo(
          query<HTMLElement>("[data-hero-copy]"),
          { autoAlpha: 0, y: 18, filter: "blur(4px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          1.62
        );

      introTimeline.fromTo(
          query<HTMLElement>("[data-hero-cta], [data-hero-bottom]"),
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.05,
            ease: "power3.out",
          },
          1.85
        );

      if (nav) {
        introTimeline.fromTo(
            nav,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            1.9
          );
      }
    };

    const loader = document.querySelector("[data-brutalist-loader]");
    if (loader) {
      window.addEventListener("dmc:loader-complete", startIntro, { once: true });
      fallbackTimer = window.setTimeout(startIntro, 1200);
    } else {
      fallbackTimer = window.setTimeout(startIntro, 320);
    }

    return () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.removeEventListener("dmc:loader-complete", startIntro);
      introTimeline?.kill();
      gsap.set(clearHeroTargets, { clearProps: "opacity,visibility,transform,clipPath,filter" });
      if (nav) {
        gsap.set(nav, { clearProps: "opacity,visibility,transform" });
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100svh] flex flex-col justify-between pt-28 lg:pt-32 pb-6 px-6 md:px-12 lg:px-16 bg-transparent select-none overflow-visible">

      {/* ── 3D wireframe backdrop (parallax wrapper; the materialize entrance
          lives inside HeroBackdrop, tied to the canvas actually being ready) ── */}
      {show3D && (
        <motion.div
          className="absolute inset-0 -z-0 pointer-events-none"
          style={isMobile ? undefined : { y: yBackdrop }}
        >
          <HeroBackdrop />
        </motion.div>
      )}

      {/* ── Centered headline block ── */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto relative z-10"
        style={isMobile ? undefined : { y: yHeadline, scale: scaleHeadline, opacity: opacityMain }}
      >

        {/* Heading wrapper — relative so paragraph positions inside it */}
        <div className="w-full text-center relative">

          <div className="w-full text-center">
            {/* Line 1: AI SYSTEMS */}
            <div data-hero-line className="relative">
              <h1 data-hero-base className={`${HEADING_CLASSNAME} relative z-10`} style={HEADING_STYLE}>
                AI Systems
              </h1>
            </div>

            {/* Line 2: THAT RUN YOUR */}
            <div data-hero-line className="relative">
              <h1 data-hero-base className={`${HEADING_CLASSNAME} relative z-10`} style={HEADING_STYLE}>
                That Run Your
              </h1>
            </div>

            {/* Line 3: BUSINESS. in border box */}
            <div data-hero-line data-hero-highlight className="inline-block relative mt-2 md:mt-[-0.05em]">
              <div className="relative px-[0.2em] py-[0.08em]">
                <div className="relative">
                  <h1 data-hero-base className={`${HEADING_CLASSNAME} relative z-10`} style={HEADING_STYLE}>
                    Business.
                  </h1>
                </div>
                <div data-hero-highlight-detail className="absolute inset-0 border border-accent pointer-events-none" />
                <div data-hero-highlight-detail className="absolute -top-[4px] -left-[4px] w-[8px] h-[8px] bg-accent" />
                <div data-hero-highlight-detail className="absolute -top-[4px] -right-[4px] w-[8px] h-[8px] bg-accent" />
                <div data-hero-highlight-detail className="absolute -bottom-[4px] -left-[4px] w-[8px] h-[8px] bg-accent" />
                <div data-hero-highlight-detail className="absolute -bottom-[4px] -right-[4px] w-[8px] h-[8px] bg-accent" />
              </div>
            </div>
          </div>

          {/* ── POV line — the sharp positioning hook under the headline ── */}
          {/* <div data-hero-copy className="mt-6 md:mt-8 max-w-[720px] mx-auto px-4">
            <p className="text-center text-[13px] md:text-base font-bold uppercase tracking-tight leading-snug text-text-primary">
              Enterprise-grade AI systems —
              <span className="text-accent"> built direct, priced transparent, zero lock-in.</span>
            </p>
          </div> */}

          {/* ── Paragraph — corner, no data-hero-copy so GSAP never touches it ── */}
          <div
            className="hidden md:block text-left z-20"
            style={{ position: "absolute", top: -8, right: 10, maxWidth: 220 }}
          >
            <p className="text-[12px] md:text-[14px] text-text-secondary leading-[1.5]">
              We architect custom digital operating systems for businesses that need to scale. From AI-driven lead capture to automated CRM pipelines, we turn your manual workflows into a seamless, high-converting engine.

            </p>
          </div>
        </div>

        {/* Mobile-only paragraph */}
        <div data-hero-copy className="md:hidden mt-8 max-w-xs mx-auto">
          <p className="text-[12px] text-text-secondary leading-[1.5] text-center">
            We architect custom digital operating systems for businesses that need to scale. From AI-driven lead capture to automated CRM pipelines, we turn your manual workflows into a seamless, high-converting engine.

          </p>
        </div>

        {/* ── CTA Button ── */}
        <div data-hero-cta className="mt-10 md:mt-12 flex flex-col items-center justify-center gap-4 relative z-20">
          <MagneticButton strength={10}>
          <a
            href="/contact"
            className="group flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoverKey(prev => prev + 1)}
          >
            <div className="border border-accent text-accent bg-transparent text-[11px] md:text-xs tracking-widest uppercase transition-colors group-hover:bg-accent group-hover:text-white flex items-center justify-center h-[40px] md:h-[44px] w-[180px] md:w-[200px] rounded-md">
              <div className="hidden group-hover:block w-full text-center">
                <EncryptedText 
                  key={hoverKey}
                  text="LET'S BUILD YOURS"
                  revealDelayMs={30}
                  flipDelayMs={30}
                />
              </div>
              <div className="block group-hover:hidden w-full text-center">
                LET&apos;S BUILD YOURS
              </div>
            </div>
            
            <div className="relative overflow-hidden flex items-center justify-center h-[40px] w-[40px] md:h-[44px] md:w-[44px] border border-accent bg-accent text-white transition-all group-hover:bg-transparent group-hover:text-accent rounded-md">
              {/* Default Arrow (Diagonal) */}
              <svg className="absolute size-5 transition-transform duration-500 ease-out group-hover:translate-x-8 group-hover:-translate-y-8" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                <line x1="64" y1="192" x2="192" y2="64"></line>
                <polyline points="88 64 192 64 192 168"></polyline>
              </svg>
              {/* Hover Arrow (Right) */}
              <svg className="absolute size-5 transition-transform duration-500 ease-out -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                <line x1="40" y1="128" x2="216" y2="128"></line>
                <polyline points="144 56 216 128 144 200"></polyline>
              </svg>
            </div>
          </a>
          </MagneticButton>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <motion.div style={isMobile ? undefined : { opacity: opacityBottom }} className="w-full max-w-[1440px] mx-auto relative z-10">
        <div data-hero-bottom className="w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary">
        <div className="justify-self-center sm:justify-self-start flex items-center gap-1">
          {SOCIAL_LINKS.map((social, index) => (
            <React.Fragment key={social.label}>
              {index > 0 && <span className="text-text-primary/40">,</span>}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {social.label.toUpperCase()}
              </a>
            </React.Fragment>
          ))}
        </div>
        
        <a href="#services" className="justify-self-center text-accent hover:text-text-primary transition-colors flex items-center gap-2 font-bold lowercase">
          <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" className="shrink-0">
            <path d="m204.24 148.24l-72 72a6 6 0 0 1-8.48 0l-72-72a6 6 0 0 1 8.48-8.48L122 201.51V40a6 6 0 0 1 12 0v161.51l61.76-61.75a6 6 0 0 1 8.48 8.48" />
          </svg>
          scroll down
        </a>

        <a href={`mailto:${DMC.email}`} className="justify-self-center sm:justify-self-end hover:text-accent transition-colors lowercase">
          {DMC.email}
        </a>
        </div>
      </motion.div>
    </section>
  );
}
