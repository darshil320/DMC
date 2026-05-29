"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function UWHeroV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.from(imageRef.current, {
        scale: 1.15,
        duration: 2.5,
        ease: "power3.out",
        delay: 2.2 // sync with preloader completion
      });
      
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 2.5
      });

      // Parallax scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to(textRef.current, {
        yPercent: 50,
        opacity: 0,
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
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#2C2A26]">
      {/* Base image */}
      <Image
        ref={imageRef}
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1980&q=100"
        alt="Modern Office Furniture Concept"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Brand wordmark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-20 px-4">
        <div className="overflow-hidden">
          <h1
            ref={textRef}
            className="text-white font-serif tracking-widest text-center font-normal"
            style={{
              fontSize: "clamp(32px, 8vw, 120px)",
              lineHeight: 1.1,
            }}
          >
            Furniture Concept 2.0
          </h1>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-[10px] tracking-[0.2em] uppercase">
        Scroll to Explore
      </div>
    </div>
  );
}
