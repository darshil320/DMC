"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePremiumMotion } from "@/lib/hooks/use-environment";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Max translation in px at the element edge. */
  strength?: number;
}

/**
 * Wraps an interactive element and gently pulls it toward the cursor while
 * hovered, easing back on leave. Desktop + fine-pointer + motion-allowed only;
 * on every other device it renders an inert wrapper so layout is unchanged.
 */
export function MagneticButton({
  children,
  className,
  strength = 14,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = usePremiumMotion();

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-block", className)}
      style={{ transition: "transform 350ms var(--ease-brutal)", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
