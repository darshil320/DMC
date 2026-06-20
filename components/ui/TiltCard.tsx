"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePremiumMotion } from "@/lib/hooks/use-environment";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  strength?: number;
}

/**
 * Cursor-driven 3D tilt with a subtle lift, edges kept razor-sharp to respect
 * the brutalist brand. The `className` is applied to the tilting surface so
 * borders/background/shadow ride with it. Inert on touch/reduced-motion.
 */
export function TiltCard({ children, className, strength = 6 }: TiltCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const enabled = usePremiumMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.transform = `rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(0)`;
  };

  const handleLeave = () => {
    const el = innerRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: enabled ? "1000px" : undefined }}
    >
      <div ref={innerRef} className={cn("tilt-card", className)}>
        {children}
      </div>
    </div>
  );
}
