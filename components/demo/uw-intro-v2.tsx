"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

function Hover3DIcon({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    setRotateX(yPct * -40);
    setRotateY(xPct * 40);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="inline-block">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY, scale: rotateX || rotateY ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="cursor-pointer p-5 rounded-2xl border border-[#2C2A26]/5 bg-white/40 hover:bg-white/80 shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center backdrop-blur-md"
      >
        {children}
      </motion.div>
    </div>
  );
}

const ExecutiveChair = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2C2A26" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 11V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6" />
    <path d="M5 11h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
    <path d="M4 11v4" />
    <path d="M20 11v4" />
  </svg>
);

const LoungeSofa = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2C2A26" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    <path d="M4 11h16" />
    <path d="M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    <path d="M6 17v2" />
    <path d="M18 17v2" />
  </svg>
);

export function UWIntroV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-uw-bg-page">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Editorial Typography */}
          <div className="w-full lg:w-6/12 flex flex-col justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-uw-text-muted mb-6 block">
                The Concept
              </span>
              <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-serif text-uw-text-primary leading-[1.1] mb-6 max-w-xl">
                Discover a smarter, more productive way to find your workspace.
              </h2>
              <p className="text-[16px] leading-[1.8] text-uw-text-secondary mb-10 max-w-md">
                With ergonomic designs and a range of modular workstations, our collection lets you shape an office that inspires. Explore comfort and functionality that perfectly suit your ambition.
              </p>
              
              <div className="flex flex-wrap items-center gap-8">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-uw-text-primary border-b border-uw-text-primary pb-1 hover:opacity-50 transition-opacity group"
                >
                  Explore Collection
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                
                <div className="flex gap-4">
                  <Hover3DIcon><ExecutiveChair /></Hover3DIcon>
                  <Hover3DIcon><LoungeSofa /></Hover3DIcon>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Parallax Image Showcase */}
          <div className="w-full lg:w-5/12 relative lg:ml-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-sm bg-[#EAEAE5]"
            >
              <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ y: yImage, scale: scaleImage }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=100"
                  alt="Modern clean minimalist office workspace setup"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              
              {/* Subtle elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none mix-blend-multiply" />
            </motion.div>
            
            {/* Decorative element */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 rounded-full border border-uw-text-primary/10 -z-10"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
