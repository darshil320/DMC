"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { URBANWOOD } from "@/lib/dmc-config";

export function OurWorkSection() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page">
      <div className="max-w-[1440px] mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
          
          {/* Left Column - Typography */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[500px] px-4 lg:px-6">
            <div>
              <div className="section-tag">
                OUR WORK
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-text-primary uppercase leading-[0.9]">
                FURNITURE <br />
                CONCEPT 2.0
              </h2>
            </div>

            <div className="flex flex-col gap-8 mt-12 lg:mt-0">
              <p className="text-text-secondary text-sm md:text-base font-medium leading-relaxed max-w-[280px]">
                A premium, editorial-style digital storefront built for Surat's leading furniture manufacturer. We completely elevated their brand identity with an immersive 3D-interactive and high-performance Next.js experience.
              </p>

              <div className="flex items-center gap-4 border-t border-border-harsh pt-6 w-full max-w-[280px]">
                <div className="size-12 border border-border-harsh bg-bg-card p-2 flex items-center justify-center">
                  <div className="size-full bg-border-harsh/30 rounded-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text-primary text-sm tracking-tight">Furniture Concept 2.0</span>
                  <span className="font-pixel uppercase tracking-widest text-text-muted">October 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Laptop Mockup */}
          <div className="lg:col-span-8 bg-bg-card border-l-0 lg:border-l border-border-harsh -mx-6 md:-mx-12 lg:-mr-16 lg:ml-0 overflow-hidden relative min-h-[500px] flex items-center justify-center group cursor-pointer perspective-1000">
            <div className="absolute inset-0 bg-neutral-200" />
            
            <a 
              href="/demo/furniture-concept-2.0" 
              className="absolute top-12 left-12 z-20 bg-accent-lime text-accent px-4 py-2 font-pixel font-bold uppercase tracking-widest brutalist-shadow border border-accent flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-colors"
            >
              VIEW LIVE DEMO <ThinArrowUpRight />
            </a>

            <a href="/demo/furniture-concept-2.0" className="absolute bottom-6 right-6 z-20 text-text-primary hover:text-accent p-2">
              <ThinArrowUpRight className="size-6" />
            </a>

            {/* 3D Laptop Container */}
            <motion.div
              initial={{ rotateX: 10, rotateY: -15, scale: 0.95 }}
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[80%] max-w-[800px] aspect-[16/10] bg-[#8B8B8B] rounded-t-xl rounded-b-md p-2 shadow-2xl flex flex-col"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Screen */}
              <div className="w-full flex-1 bg-black rounded-t-lg rounded-b-sm border-[4px] border-black overflow-hidden relative flex flex-col">
                <div className="w-full h-8 bg-[#F0F0F0] border-b border-border-harsh flex items-center px-4 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-[#FF5F56]" />
                    <div className="size-2 rounded-full bg-[#FFBD2E]" />
                    <div className="size-2 rounded-full bg-[#27C93F]" />
                  </div>
                </div>
                <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden bg-[#2C2A26]">
                  <Image 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover opacity-40 mix-blend-luminosity" 
                    alt="Showroom" 
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="relative z-10 font-serif text-white text-3xl md:text-5xl font-medium tracking-tight">Furniture Concept 2.0</span>
                </div>
              </div>
              {/* Keyboard Base */}
              <div className="h-6 w-full bg-[#7A7A7A] rounded-b-md relative mt-1 flex justify-center border-t border-black/20">
                <div className="w-1/4 h-1.5 bg-black/10 rounded-b-md absolute top-0" />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
