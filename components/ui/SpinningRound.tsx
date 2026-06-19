"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function SpinningRound() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed bottom-12 right-6 md:right-12 lg:right-16 z-[45] pointer-events-none hidden md:block">
      <motion.div
        style={prefersReducedMotion ? {} : { rotate }}
        className="size-32 flex items-center justify-center bg-transparent opacity-60"
      >
        <svg viewBox="0 0 100 100" className="size-full">
          <path id="spinCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
          <text className="text-[8.5px] font-bold fill-white tracking-[0.14em] uppercase">
            <textPath href="#spinCirclePath">
              • PREMIUM QUALITY • DIGITAL EXPERIENCE
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
