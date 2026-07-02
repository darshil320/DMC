"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";

interface VelocityMarqueeProps {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  /** Baseline drift in %-of-track per second. */
  baseVelocity?: number;
}

const wrapRange = (min: number, max: number, value: number) => {
  const range = max - min;
  return min + (((value - min) % range) + range) % range;
};

const COPIES = 4;

/**
 * Display-type marquee that drifts continuously and accelerates (and flips
 * direction) with scroll velocity — the faster the visitor scrolls, the
 * faster the band runs.
 */
export function VelocityMarquee({
  items,
  className,
  itemClassName,
  baseVelocity = 2.6,
}: VelocityMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false });
  const direction = useRef(1);

  // One copy spans 1/COPIES of the track, so wrap within that window.
  const x = useTransform(baseX, (v) => `${wrapRange(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const row = items.map((item, idx) => (
    <span key={idx} className={cn("flex items-center gap-6 md:gap-10", itemClassName)}>
      <span>{item}</span>
      <span aria-hidden className="size-2 md:size-3 bg-accent-lime shrink-0" />
    </span>
  ));

  if (reduceMotion) {
    return (
      <div className={cn("flex flex-wrap items-center gap-6 overflow-hidden", className)}>
        {row}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      {/* No gap on the track: spacing lives inside each copy (gap + trailing
          padding) so one copy is exactly 1/COPIES of the width and the wrap
          point is seamless. */}
      <motion.div style={{ x }} className="flex w-max items-center">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0}
            className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10"
          >
            {row}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
