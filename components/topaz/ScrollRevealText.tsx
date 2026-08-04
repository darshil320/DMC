"use client";

import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";

interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}

function AnimatedLetter({ char, index, totalChars, scrollYProgress }: AnimatedLetterProps) {
  const charProgress = index / totalChars;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
}

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={`text-[#DEDBC8] text-xs sm:text-sm md:text-base ${className}`}>
      {chars.map((char, index) => (
        <AnimatedLetter
          key={index}
          char={char}
          index={index}
          totalChars={totalChars}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}
