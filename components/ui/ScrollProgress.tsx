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

    // Cache the scrollable range so scroll ticks never force a layout read;
    // recompute only when the document actually resizes.
    let max = 0;
    const measure = () => {
      const doc = document.documentElement;
      max = doc.scrollHeight - doc.clientHeight;
    };

    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    measure();
    update();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });
    resizeObserver.observe(document.documentElement);

    if (lenis) {
      lenis.on("scroll", update);
      return () => {
        lenis.off("scroll", update);
        resizeObserver.disconnect();
      };
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      resizeObserver.disconnect();
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
