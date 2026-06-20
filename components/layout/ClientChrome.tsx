"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ReactLenis, useLenis } from "lenis/react";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/lib/theme";
import { SiteMotion } from "@/components/layout/SiteMotion";
import { RouteAnalytics } from "@/components/analytics/RouteAnalytics";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { usePremiumMotion } from "@/lib/hooks/use-environment";

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

function ServiceWorkerCleanup() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const cleanup = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length === 0) return;

        const wasControlled = Boolean(navigator.serviceWorker.controller);
        await Promise.all(registrations.map((registration) => registration.unregister()));

        if ("caches" in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
        }

        if (wasControlled && !sessionStorage.getItem("dmc-service-worker-cleaned")) {
          sessionStorage.setItem("dmc-service-worker-cleaned", "true");
          window.location.reload();
        }
      } catch {
        // Stale service-worker cleanup is best-effort.
      }
    };

    cleanup();
  }, []);

  return null;
}

export function ClientChrome({ children }: { children: React.ReactNode }) {
  const showDecorations = usePremiumMotion();
  const pathname = usePathname();
  const showSpinningRound = showDecorations && pathname !== "/contact";

  return (
    <ThemeProvider>
      <SessionProvider>
        <ServiceWorkerCleanup />
        {/* smoothWheel for desktop; native touch scrolling on mobile (syncTouch
            off) is smoother and far cheaper than synthesized touch momentum. */}
        <ReactLenis root options={{ lerp: 0.10, duration: 1.4, smoothWheel: true, syncTouch: false, wheelMultiplier: 1.0, infinite: false }}>
          <LenisResizer />
          <SiteMotion />
          <RouteAnalytics />
          <ScrollProgress />
          <GrainOverlay />
          {showDecorations && <CustomCursor />}
          {showSpinningRound && <SpinningRound />}
          {children}
        </ReactLenis>
      </SessionProvider>
    </ThemeProvider>
  );
}
