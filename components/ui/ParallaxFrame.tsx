"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel as a % of the frame height (each direction). */
  strength?: number;
}

/**
 * Inner-media scroll parallax. The child layer renders oversized and slides
 * vertically as the frame crosses the viewport, so the media drifts inside a
 * hard-clipped frame. Children using `fill` images fill the oversized layer.
 */
export function ParallaxFrame({ children, className, strength = 7 }: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  if (reduceMotion) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
        {children}
      </motion.div>
    </div>
  );
}
