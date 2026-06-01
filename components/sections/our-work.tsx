"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { FURNITURE_CONCEPTS } from "@/lib/dmc-config";

export function OurWorkSection() {
  return (
    <section id="work" className="py-32 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 bg-bg-page border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start h-full">
          
          {/* Left Column - Typography */}
          <div className="lg:col-span-4 flex flex-col justify-center h-full min-h-[400px]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-sans text-accent uppercase tracking-[0.2em]">Our Selected Work</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-text-primary leading-tight">
                Furniture <br />
                <span className="italic text-text-secondary">Concept 2.0</span>
              </h2>
            </div>

            <div className="flex flex-col gap-10 mt-12">
              <p className="text-text-secondary text-sm md:text-base font-sans font-light leading-relaxed max-w-[320px]">
                A premium, editorial-style digital storefront built for Surat's leading furniture manufacturer. We completely elevated their brand identity with an immersive 3D-interactive and high-performance Next.js experience.
              </p>

              <div className="flex items-center gap-4 pt-6 w-full max-w-[320px]">
                <div className="size-12 rounded-full border border-border-harsh bg-bg-card p-2 flex items-center justify-center">
                  <div className="size-full bg-border-harsh rounded-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary text-sm font-sans tracking-wide">Furniture Concept 2.0</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-text-muted mt-1">October 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Laptop Mockup */}
          <div className="lg:col-span-8 relative min-h-[500px] flex items-center justify-center group cursor-pointer perspective-1000 w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50">
            {/* Soft Radial Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-bg-page to-bg-page opacity-50" />
            
            <a 
              href="/demo/furniture-concept-2.0" 
              className="absolute top-8 left-8 z-20 bg-bg-page text-text-primary px-6 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] rounded-full border border-border-harsh flex items-center gap-3 group-hover:border-accent group-hover:text-accent transition-all duration-300 shadow-xl"
            >
              View Live Demo <ThinArrowUpRight />
            </a>

            <a href="/demo/furniture-concept-2.0" className="absolute bottom-6 right-6 z-20 text-text-muted hover:text-accent p-2 transition-colors duration-300">
              <ThinArrowUpRight className="size-6" />
            </a>

            {/* 3D Laptop Container */}
            <motion.div
              initial={{ rotateX: 5, rotateY: -10, scale: 0.95 }}
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[85%] max-w-[800px] aspect-[16/10] bg-[#333333] rounded-t-2xl rounded-b-lg p-2 shadow-2xl flex flex-col mt-12"
              style={{ transformStyle: "preserve-3d", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)" }}
            >
              {/* Screen */}
              <div className="w-full flex-1 bg-black rounded-t-xl rounded-b-md border-[4px] border-[#1A1A1A] overflow-hidden relative flex flex-col">
                <div className="w-full h-8 bg-[#242424] border-b border-[#1A1A1A] flex items-center px-4 shrink-0">
                  <div className="flex gap-1.5 opacity-50">
                    <div className="size-2 rounded-full bg-[#FF5F56]" />
                    <div className="size-2 rounded-full bg-[#FFBD2E]" />
                    <div className="size-2 rounded-full bg-[#27C93F]" />
                  </div>
                </div>
                <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden bg-[#2C2A26]">
                  <Image 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover opacity-40 mix-blend-luminosity" 
                    alt="Showroom" 
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="relative z-10 font-display text-white text-3xl md:text-5xl font-medium tracking-tight">Furniture Concept 2.0</span>
                </div>
              </div>
              {/* Keyboard Base */}
              <div className="h-4 w-full bg-[#2A2A2A] rounded-b-lg relative mt-1 flex justify-center border-t border-[#111]">
                <div className="w-1/4 h-1 bg-[#1A1A1A] rounded-b-md absolute top-0" />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
