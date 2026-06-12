"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { FAQ_ITEMS } from "@/lib/content";

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <AnimatedReveal delay={index * 0.04}>
      <div className="border-b border-border-harsh">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
        >
          <div className="flex items-start gap-4 min-w-0">
            <span className="font-pixel text-[10px] text-accent shrink-0 pt-1 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-base md:text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors leading-snug">
              {item.q}
            </span>
          </div>
          <div className="shrink-0 size-7 border border-border-harsh flex items-center justify-center bg-bg-card group-hover:bg-accent group-hover:border-accent transition-colors mt-0.5">
            {isOpen ? (
              <Minus className="size-3.5 text-text-primary group-hover:text-white transition-colors" />
            ) : (
              <Plus className="size-3.5 text-text-primary group-hover:text-white transition-colors" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="pl-9 pb-6">
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium max-w-[680px]">
              {item.a}
            </p>
          </div>
        )}
      </div>
    </AnimatedReveal>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12 lg:px-16 w-full bg-bg-page border-t border-border-harsh relative z-10"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20 px-4 lg:px-6">

          {/* Left — sticky label + heading */}
          <div className="lg:w-[340px] shrink-0 lg:sticky lg:top-32">
            <AnimatedReveal>
              <div className="section-tag mb-4">FAQ</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-text-primary uppercase leading-[1.05] mb-6">
                Questions<br />we get<br />asked a lot.
              </h2>
              <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-[280px]">
                Still have something on your mind? Drop us a message on WhatsApp — we reply fast.
              </p>
            </AnimatedReveal>
          </div>

          {/* Right — accordion */}
          <div className="flex-1 min-w-0 border-t border-border-harsh">
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
