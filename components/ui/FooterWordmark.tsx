"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const LETTERS = ["D", "M", "C"] as const;

/**
 * Giant footer wordmark: each letter rises out of an overflow-clipped mask
 * when the footer is uncovered (it sits sticky behind the page), and flips
 * to the accent color letter-by-letter on hover.
 *
 * Visibility is observed on the container, not the letters — the letters
 * start fully clipped by their masks, so an observer on them would never
 * report an intersection.
 */
export function FooterWordmark() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shown = reduceMotion || inView;

  return (
    <span
      ref={ref}
      aria-label="DMC"
      className="flex w-full items-end justify-center font-display font-bold leading-none tracking-tight text-[100px] sm:text-[160px] md:text-[220px] lg:text-[300px] uppercase text-text-primary cursor-default"
    >
      {LETTERS.map((letter, idx) => (
        <span key={letter} aria-hidden className="overflow-hidden inline-block">
          <motion.span
            initial={reduceMotion ? false : { y: "105%" }}
            animate={{ y: shown ? "0%" : "105%" }}
            transition={{
              duration: 0.9,
              delay: idx * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transition-colors duration-300 hover:text-accent"
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
