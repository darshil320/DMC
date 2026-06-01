"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    label: "Desks",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=60",
    span: "col-span-1 md:col-span-2 row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    label: "Seating",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&auto=format&fit=crop&q=60",
    span: "col-span-1 md:col-span-1 aspect-square",
  },
  {
    label: "Storage",
    image: "https://images.pexels.com/photos/29058370/pexels-photo-29058370.png",
    span: "col-span-1 md:col-span-1 aspect-square",
  },
  {
    label: "Acoustics",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop&q=60",
    span: "col-span-1 md:col-span-2 aspect-[21/9]",
  },
];

export function FCProductGridV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Filter out nulls just in case
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.from(validItems, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out"
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 bg-[#F4F1ED]">
      <h2
        ref={headingRef}
        className="text-[32px] md:text-[48px] font-serif text-[#2C2A26] mb-16 max-w-2xl"
      >
        Workspaces That Inspire
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 h-auto md:h-[600px]">
        {CATEGORIES.map((item, idx) => (
          <div
            key={item.label}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className={`relative group overflow-hidden rounded-sm cursor-pointer ${item.span}`}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-[16px] md:text-[20px] font-medium tracking-[0.2em] uppercase opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[#2C2A26]/10 pt-8">
        <a
          href="#"
          className="inline-flex items-center gap-3 text-[14px] font-medium text-[#2C2A26] hover:opacity-60 transition-opacity group w-fit uppercase tracking-widest"
        >
          See All Categories
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </a>
        <p className="text-[14px] text-[#2C2A26]/60 max-w-sm leading-relaxed font-serif">
          Explore ergonomic seating, collaborative desks, storage, and more, all designed to elevate focus and productivity in modern office environments.
        </p>
      </div>
    </section>
  );
}
