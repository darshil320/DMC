"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * Thin accent progress bar pinned to the top of the viewport, tracking how far
 * the page has been scrolled. Driven by Lenis when available, with a native
 * scroll fallback. Hidden for reduced-motion users.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    update();

    if (lenis) {
      lenis.on("scroll", update);
      return () => lenis.off("scroll", update);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lenis]);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden
    />
  );
}
