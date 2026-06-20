import React from "react";

type CornerTicksProps = {
  tone?: "accent" | "lime" | "white";
};

/** Accent corner ticks that scale in on parent `.group` hover. */
export function CornerTicks({ tone = "lime" }: CornerTicksProps) {
  const colorClass =
    tone === "accent"
      ? "border-accent"
      : tone === "white"
        ? "border-white"
        : "border-accent-lime";
  const base = `absolute w-2.5 h-2.5 ${colorClass} opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none z-30`;

  return (
    <>
      <span className={`${base} top-3 left-3 border-t-2 border-l-2`} />
      <span className={`${base} top-3 right-3 border-t-2 border-r-2`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  );
}
