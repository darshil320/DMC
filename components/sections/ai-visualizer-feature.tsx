"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

const BEFORE_IMG = "/assets/before.jpeg";
const AFTER_IMG  = "/assets/after.png";

const FEATURES = [
  { label: "Upload any room photo",       detail: "Customer snaps their bedroom, living room, or office — any photo works." },
  { label: "Pick any product",            detail: "Select from your full catalogue. The AI reads the exact product image." },
  { label: "AI places it in 30 seconds",  detail: "FLUX Kontext Pro composites the exact product with matching light and scale." },
  { label: "WhatsApp enquiry in one tap", detail: "The product name pre-fills the message. Enquiry lands in your inbox instantly." },
];

const STATS = [
  { num: "3×",  desc: "Purchase intent" },
  { num: "35%", desc: "Fewer returns"   },
  { num: "30s", desc: "To visualize"    },
];

// ─── Interactive before/after slider ─────────────────────────────────────────
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [pos, setPos] = useState(42);

  const calc = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.min(97, Math.max(3, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onMouseDown  = (e: React.MouseEvent)  => { isDragging.current = true; calc(e.clientX); };
  const onMouseMove  = (e: React.MouseEvent)  => { if (isDragging.current) calc(e.clientX); };
  const onMouseUp    = ()                      => { isDragging.current = false; };
  const onTouchStart = (e: React.TouchEvent)  => calc(e.touches[0].clientX);
  const onTouchMove  = (e: React.TouchEvent)  => { e.preventDefault(); calc(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none"
      style={{ touchAction: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* After — full colour, base layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AFTER_IMG}
        alt="Premium interior after transformation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Before — greyscale, clipped to left portion */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BEFORE_IMG}
        alt="Basic room before transformation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle — inline borderRadius overrides `* { border-radius: 0 !important }` */}
      <div
        className="absolute flex items-center justify-center bg-white pointer-events-none"
        style={{
          width: 40,
          height: 40,
          left: `${pos}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "2px solid #000",
          boxShadow: "3px 3px 0 #000",
        }}
      >
        <svg width="16" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7,2 2,7 7,12" />
          <polyline points="17,2 22,7 17,12" />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <span className="bg-white/90 text-text-primary text-[8px] tracking-[0.22em] uppercase px-2.5 py-1.5 font-bold border border-border-harsh">
          Before
        </span>
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none">
        <span className="bg-accent text-white text-[8px] tracking-[0.22em] uppercase px-2.5 py-1.5 font-bold">
          After · AI
        </span>
      </div>

      {/* Drag hint */}
      <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
        <span className="bg-black/40 text-white text-[8px] tracking-[0.2em] uppercase px-2.5 py-1.5 font-medium">
          Drag to compare
        </span>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function AIVisualizerFeatureSection() {
  return (
    <section
      id="ai"
      className="w-full bg-bg-page border-y border-border-harsh relative select-none lg:h-screen flex flex-col"
    >
      <div className="max-w-[1440px] mx-auto w-full h-full flex flex-col">

        {/* ── Top: headline | stats + slider ───────────────────────────────── */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 border-b border-black/20">

          {/* Left: copy + CTA */}
          <AnimatedReveal className="p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-black/20 flex flex-col justify-between gap-6 lg:gap-10 h-full overflow-y-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 mb-8">
                <Sparkles className="size-3 text-accent-lime" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white">
                  New · AI Powered
                </span>
              </div>

              <h2
                className="text-text-primary font-black uppercase tracking-tighter leading-[0.92] mb-6"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}
              >
                See furniture
                <br />
                in your room.
                <br />
                <span className="text-text-muted">Before you buy.</span>
              </h2>

              <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-md font-medium">
                Our AI Room Visualizer lets your customers upload a photo of their
                room and see any product placed inside it — with accurate lighting,
                scale, and shadows — in under 30 seconds.
              </p>
            </div>

            <Link
              href="/demo/ai-visualizer"
              className="group inline-flex items-center gap-3 bg-accent text-white border-2 border-accent px-7 py-4 text-xs font-black uppercase tracking-widest hover:bg-accent-lime hover:text-accent hover:border-accent-lime transition-all w-fit brutalist-shadow-blue"
            >
              Try the Live Demo
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedReveal>

          {/* Right: stats + interactive slider */}
          <AnimatedReveal delay={0.1} className="flex flex-col h-full min-h-0">
            {/* Stats */}
            <div className="grid grid-cols-3 border-b border-black/20 shrink-0">
              {STATS.map((s, i) => (
                <div
                  key={s.num}
                  className={`p-6 md:p-8 bg-bg-card flex flex-col gap-1 ${i < 2 ? "border-r border-black/20" : ""}`}
                >
                  <span className="text-3xl md:text-4xl font-black text-accent tracking-tighter leading-none font-display">
                    {s.num}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Slider */}
            <div className="flex-1 min-h-[240px] lg:min-h-0 relative">
              <div className="absolute inset-0">
                <BeforeAfterSlider />
              </div>
            </div>
          </AnimatedReveal>
        </div>

        {/* ── Bottom: 4-step feature strip ─────────────────────────────────── */}
        <div className="shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/20">
          {FEATURES.map((f, i) => (
            <AnimatedReveal
              key={f.label}
              delay={i * 0.05}
              className={`group p-6 md:p-8 lg:p-10 bg-bg-page hover:bg-accent transition-colors duration-0
                ${i < 4 ? "border-b sm:border-b-0 border-black/20" : ""}
                ${i < 3 ? "lg:border-r border-black/20" : ""}
                ${i % 2 === 1 ? "sm:border-l border-black/20" : ""}
              `}
            >
              <div className="text-accent font-display font-black text-2xl mb-4 leading-none group-hover:text-accent-lime transition-colors duration-0">
                0{i + 1}
              </div>
              <p className="text-text-primary text-sm font-bold mb-2 tracking-tight leading-snug group-hover:text-white transition-colors duration-0">
                {f.label}
              </p>
              <p className="text-text-secondary text-xs font-medium leading-relaxed group-hover:text-white/70 transition-colors duration-0">
                {f.detail}
              </p>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
