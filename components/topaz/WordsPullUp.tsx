"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
  staggerDelay?: number;
}

export function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  delay = 0,
  staggerDelay = 0.08,
}: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.25em]">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
                delay: delay + i * staggerDelay,
              }}
            >
              {word}
              {showAsterisk && isLastWord && (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-normal leading-none select-none">
                  *
                </sup>
              )}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
