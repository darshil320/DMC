"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  /** Display string with an embedded number, e.g. "3×", "35%", "30s", "1,200". */
  value: string;
  className?: string;
  durationMs?: number;
}

/**
 * Counts a number up from zero the first time it scrolls into view, preserving
 * any prefix/suffix and digit grouping in the source string. Reduced-motion
 * users get the final value on the first frame.
 */
export function AnimatedCounter({ value, className, durationMs = 1100 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Parse the source string into a numeric target + a formatter that rebuilds
  // the original prefix/suffix/grouping. Null when there is no number to animate.
  const parsed = useMemo(() => {
    const match = value.match(/^(\D*)([\d.,]+)(\D*)$/);
    if (!match) return null;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const grouped = numStr.includes(",");
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const out = grouped
        ? Number(fixed).toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${out}${suffix}`;
    };
    return { target, format };
  }, [value]);

  const [display, setDisplay] = useState(() => (parsed ? parsed.format(0) : value));

  useEffect(() => {
    if (!parsed || !inView) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : durationMs;
    let raf = 0;
    let start = 0;

    const tick = (t: number) => {
      if (!start) start = t;
      const progress = dur === 0 ? 1 : Math.min(1, (t - start) / dur);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(parsed.format(parsed.target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, durationMs]);

  return (
    <span ref={ref} className={className}>
      {parsed ? display : value}
    </span>
  );
}
