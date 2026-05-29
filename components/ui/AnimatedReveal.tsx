"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  duration = 0.6,
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
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
      }}
    >
      {children}
    </motion.div>
  );
}
