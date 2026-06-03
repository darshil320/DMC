"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[] | string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function Marquee({
  items,
  className,
  speed = 25,
  reverse = false,
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-6 py-4 px-6 border-y border-border-subtle bg-bg-card",
          className
        )}
      >
        {items.map((item, idx) => (
          <span
            key={idx}
            className="text-xs md:text-sm font-semibold uppercase tracking-wider text-text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  // Multiply items to ensure it stretches beyond viewport width
  const marqueeItems = [...items, ...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative flex overflow-x-hidden w-full select-none py-6 border-y border-border-subtle bg-bg-card",
        className
      )}
    >
      <motion.div
        className="flex whitespace-nowrap gap-16 pr-16"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.2em] text-text-primary"
          >
            <span>{item}</span>
            <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
export default Marquee;
