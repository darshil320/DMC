import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-text-muted mb-4 block",
        className
      )}
    >
      {children}
    </div>
  );
}
export default SectionLabel;
