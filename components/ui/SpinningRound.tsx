"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function SpinningRound() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div className="fixed bottom-12 right-6 md:right-12 lg:right-16 z-[45] pointer-events-none hidden md:block">
      <motion.div 
        style={{ rotate }} 
        className="size-32 rounded-full flex items-center justify-center bg-transparent mix-blend-difference opacity-80"
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
