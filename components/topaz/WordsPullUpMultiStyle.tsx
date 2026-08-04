"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  staggerDelay?: number;
}

export function WordsPullUpMultiStyle({
  segments,
  className = "",
  staggerDelay = 0.08,
}: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  let globalWordIndex = 0;
  const wordItems: { word: string; className?: string; globalIndex: number }[] = [];

  segments.forEach((seg) => {
    const words = seg.text.split(" ").filter(Boolean);
    words.forEach((w) => {
      wordItems.push({
        word: w,
        className: seg.className,
        globalIndex: globalWordIndex++,
      });
    });
  });

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {wordItems.map((item, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden pb-1 pr-[0.3em] ${item.className || ""}`}
        >
          <motion.span
            className="inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
              delay: item.globalIndex * staggerDelay,
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
