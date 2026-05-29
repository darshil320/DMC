"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkArrow({ href, children, className }: LinkArrowProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const content = (
    <span
      className={cn(
        "group/arrow inline-flex items-center gap-2 text-[12px] md:text-[13px] font-semibold uppercase tracking-widest text-text-primary hover:text-accent transition-colors duration-300",
        className
      )}
    >
      {children}
      <svg
        className="w-3.5 h-3.5 transform group-hover/arrow:translate-x-1.5 transition-transform duration-300"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 8H15M15 8L8 1M15 8L8 15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
export default LinkArrow;
