"use client";

import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { ReactLenis, useLenis } from "lenis/react";
import React, { useEffect, useState } from "react";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const SpinningRound = dynamic(
  () => import("@/components/ui/SpinningRound").then((mod) => mod.SpinningRound),
  { ssr: false }
);

function LenisResizer() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const resize = () => lenis.resize();
    const t1 = setTimeout(resize, 100);
    const t2 = setTimeout(resize, 600);

    window.addEventListener("load", resize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", resize);
    };
  }, [lenis]);

  return null;
}

function useDesktopDecorations() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(pointerFine.matches && !reducedMotion.matches);
    update();

    pointerFine.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      pointerFine.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

export function ClientChrome({ children }: { children: React.ReactNode }) {
  const showDecorations = useDesktopDecorations();

  return (
    <SessionProvider>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <LenisResizer />
        {showDecorations && (
          <>
            <CustomCursor />
            <SpinningRound />
          </>
        )}
        {children}
      </ReactLenis>
    </SessionProvider>
  );
}
