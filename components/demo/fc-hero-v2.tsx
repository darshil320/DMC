"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FCHeroV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.from(imageRef.current, {
        scale: 1.1,
        duration: 2.5,
        ease: "power3.out",
        delay: 0.2 // sync with preloader completion
      });
      
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.8
      });

      gsap.from(wordmarkRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      });

      // Parallax scroll on image only (content stays visible)
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#FAF7F0]">
      {/* Premium Warm Interior Image */}
      <Image
        ref={imageRef}
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=60" 
        alt="Premium Furniture Collection"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Subtle overlay just for text legibility, no heavy black mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10" />

      {/* Top Center Content (Sale / CTA) */}
      <div className="absolute inset-0 flex flex-col items-center pt-[22vh] px-4 pointer-events-none">
        <div ref={contentRef} className="flex flex-col items-center text-center">
          <h2 className="text-white text-[32px] md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-md font-sans">
            Mid-Year Sale Now On
          </h2>
          <p className="text-white/95 text-[15px] md:text-lg font-normal mb-8 max-w-md drop-shadow-sm font-sans">
            Return to form with our curated essentials
          </p>
          <Link
            href="/demo/furniture-concept-2.0/store" 
            className="bg-white text-[#111] px-10 py-[14px] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#111] hover:text-white transition-colors duration-300 pointer-events-auto"
          >
            Explore
          </Link>
        </div>
      </div>
      
      {/* Massive Brand Wordmark anchored to the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center items-end pointer-events-none pb-4 md:pb-6">
        <h1
          ref={wordmarkRef}
          className="text-white font-sans font-black tracking-tighter leading-none select-none text-center w-full whitespace-nowrap"
          style={{
            fontSize: "clamp(40px, 7.5vw, 120px)",
          }}
        >
          FURNITURE CONCEPTS 2.0
        </h1>
      </div>
    </div>
  );
}
