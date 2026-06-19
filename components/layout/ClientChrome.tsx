"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ReactLenis, useLenis } from "lenis/react";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/lib/theme";
import { SiteMotion } from "@/components/layout/SiteMotion";
import { RouteAnalytics } from "@/components/analytics/RouteAnalytics";

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
    const t3 = setTimeout(resize, 2500);

    window.addEventListener("load", resize);

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(document.body);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", resize);
      observer.disconnect();
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
  const pathname = usePathname();
  const showSpinningRound = showDecorations && pathname !== "/contact";

  return (
    <ThemeProvider>
      <SessionProvider>
        <ReactLenis root options={{ lerp: 0.10, duration: 1.4, smoothWheel: true, syncTouch: true, touchMultiplier: 1.8, wheelMultiplier: 1.0, infinite: false }}>
          <LenisResizer />
          <SiteMotion />
          <RouteAnalytics />
          {showDecorations && <CustomCursor />}
          {showSpinningRound && <SpinningRound />}
          {children}
        </ReactLenis>
      </SessionProvider>
    </ThemeProvider>
  );
}
