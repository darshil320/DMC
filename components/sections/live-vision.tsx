"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Camera, RefreshCw, ScanFace, ShieldCheck, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Heavy canvas + webcam code — loaded only when the visitor opts in, so it
// never enters the initial bundle and never prompts for the camera on scroll.
const WebcamPixelGrid = dynamic(
  () => import("@/components/ui/webcam-pixel-grid").then((m) => m.WebcamPixelGrid),
  { ssr: false }
);

const PANEL_BG = "#08070A";

export function LiveVisionSection() {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [denied, setDenied] = useState(false);

  // Brand "scanner" tint — lime in light mode, warm cream in dark.
  const scanColor = theme === "dark" ? "#F2E4D0" : "#CCFF00";

  const startCamera = useCallback(() => {
    setDenied(false);
    setActive(true);
  }, []);

  useEffect(() => {
    if (!denied || !navigator.permissions) return;

    let permissionStatus: PermissionStatus | undefined;
    let cancelled = false;

    const syncPermission = () => {
      if (permissionStatus?.state === "granted") {
        setDenied(false);
        setActive(true);
      }
    };

    navigator.permissions
      .query({ name: "camera" as PermissionName })
      .then((status) => {
        if (cancelled) return;
        permissionStatus = status;
        syncPermission();
        status.addEventListener("change", syncPermission);
      })
      .catch(() => {
        // Permission API support varies; the retry button remains the fallback.
      });

    return () => {
      cancelled = true;
      permissionStatus?.removeEventListener("change", syncPermission);
    };
  }, [denied]);

  return (
    <section
      id="vision"
      className="relative w-full text-white select-none border-y border-border-harsh overflow-hidden min-h-[88vh] flex"
      style={{ backgroundColor: PANEL_BG }}
    >
      {/* ── Live pixel grid (mounts only after opt-in) ── */}
      {active && (
        <div className="absolute inset-0 animate-fade-in">
          <WebcamPixelGrid
            gridCols={56}
            gridRows={36}
            maxElevation={46}
            motionSensitivity={0.25}
            elevationSmoothing={0.2}
            colorMode="monochrome"
            monochromeColor={scanColor}
            backgroundColor={PANEL_BG}
            mirror
            gapRatio={0.06}
            darken={0.12}
            borderColor={scanColor}
            borderOpacity={0.05}
            className="h-full w-full"
            onWebcamReady={() => setDenied(false)}
            onWebcamError={() => {
              setActive(false);
              setDenied(true);
            }}
          />
          {/* readability scrim over the live feed */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${PANEL_BG} 0%, ${PANEL_BG}66 45%, ${PANEL_BG}cc 100%)`,
            }}
          />
        </div>
      )}

      {/* ── Static grid texture while idle ── */}
      {!active && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      )}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 py-20 flex flex-col justify-center">
        <div className="max-w-[760px]">
          <div className="section-tag inline-flex items-center gap-2">
            {active ? (
              <>
                <span className="size-2 bg-red-500 animate-pulse" /> LIVE · CAMERA ON
              </>
            ) : (
              <>
                <ScanFace className="size-3.5" /> LIVE · COMPUTER VISION
              </>
            )}
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mt-2 mb-6">
            See the system
            <br />
            <span style={{ color: scanColor }}>see you.</span>
          </h2>

          <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium max-w-[520px] mb-8">
            We build real-time recognition systems: face detection at entry,
            motion tracking, and footfall analytics. This is a live, in-browser
            demo of the same computer-vision pipeline that powers our Showroom
            Intelligence builds. Move around and watch the grid react.
          </p>

          {!active ? (
            <div className="flex flex-col gap-4">
              <MagneticButton strength={10} className="w-fit">
                <button
                  onClick={startCamera}
                  className="group inline-flex items-center gap-3 bg-accent-lime text-accent border-2 border-accent-lime px-7 py-4 text-xs font-black uppercase tracking-widest hover:bg-transparent hover:text-accent-lime transition-colors cursor-pointer"
                >
                  <Camera className="size-4" />
                  Activate live camera
                </button>
              </MagneticButton>
              <p className="text-white/40 text-[11px] font-medium tracking-wide max-w-[420px]">
                Runs 100% in your browser. No video is recorded, stored, or
                uploaded. The feed never leaves your device.
              </p>
              {denied && (
                <div
                  role="status"
                  className="max-w-[520px] border border-accent-lime/40 bg-white/[0.04] p-4 text-white shadow-[4px_4px_0_rgba(204,255,0,0.18)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent-lime" />
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent-lime">
                          Camera access is off
                        </p>
                        <p className="mt-2 text-xs font-medium leading-relaxed text-white/58">
                          Allow camera access from the browser toolbar, then retry. The demo runs locally and never uploads your video.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={startCamera}
                      className="group inline-flex h-10 shrink-0 items-center justify-center gap-2 border border-accent-lime px-4 text-[10px] font-black uppercase tracking-[0.18em] text-accent-lime transition-colors hover:bg-accent-lime hover:text-accent"
                    >
                      <RefreshCw className="size-3.5 transition-transform group-hover:rotate-90" />
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setActive(false)}
              className="group inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/30 px-7 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors cursor-pointer w-fit"
            >
              <X className="size-4" />
              Stop camera
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
