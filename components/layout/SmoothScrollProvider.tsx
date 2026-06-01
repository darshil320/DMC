"use client";

import { ReactLenis, useLenis } from "lenis/react";
import React, { useEffect } from "react";

// Forces Lenis to recalculate the document scroll limit after content/images load.
// Without this, Lenis locks in the initial measured height and stops scrolling
// early if any content renders or images load after mount.
function LenisResizer() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const resize = () => lenis.resize();

    // Recalculate after a tick (handles SSR hydration mismatch)
    const t1 = setTimeout(resize, 100);
    // Recalculate again after images/fonts settle
    const t2 = setTimeout(resize, 600);

    // Recalculate when all resources (images) finish loading
    window.addEventListener("load", resize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", resize);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <LenisResizer />
      {children}
    </ReactLenis>
  );
}
