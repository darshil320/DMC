"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface AnimatedRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  amount?: number | "some" | "all";
  className?: string;
}

export function AnimatedReveal({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 24,
  amount = 0.2, // trigger when 20% of section enters viewport
  className,
}: AnimatedRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      style={{ willChange: "transform, opacity" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo: starts incredibly fast, settles smoothly
      }}
    >
      {children}
    </motion.div>
  );
}
