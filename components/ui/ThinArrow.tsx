import React from "react";
import { cn } from "@/lib/utils";

export function ThinArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={cn("w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1", className)} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="square" 
      strokeLinejoin="miter"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ThinArrowUpRight({ className }: { className?: string }) {
  return (
    <svg 
      className={cn("w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1", className)} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="square" 
      strokeLinejoin="miter"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function ThinArrowDown({ className }: { className?: string }) {
  return (
    <svg 
      className={cn("w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-y-1", className)} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="square" 
      strokeLinejoin="miter"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
