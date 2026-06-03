"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function signalLoaderComplete() {
  window.dispatchEvent(new Event("dmc:loader-complete"));
}

export function BrutalistLoader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip entirely for reduced-motion — fire complete immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoading(false);
      signalLoaderComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    // Cap total to ~750ms: ~600ms counting + 150ms hold
    const TARGET_MS = 600;
    const HOLD_MS = 150;
    const TICK_MS = 30;
    const totalSteps = Math.ceil(TARGET_MS / TICK_MS);
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex++;
      const count = Math.min(100, Math.round((stepIndex / totalSteps) * 100) + Math.floor(Math.random() * 4));

      if (count >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, HOLD_MS);
        return;
      }

      setProgress(count);
    }, TICK_MS);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={signalLoaderComplete}>
      {loading && (
        <motion.div
          data-brutalist-loader
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-accent text-white flex flex-col justify-between p-6 md:p-12 font-display pointer-events-auto"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start text-[10px] font-bold tracking-widest uppercase">
            <span>DMC DIGITAL</span>
            <span>INITIALIZING...</span>
          </div>

          {/* Center Huge Counter */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
              <div className="absolute -top-4 -right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
              <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter tabular-nums flex items-end"
              >
                {progress}
                <span className="text-accent-lime text-2xl md:text-5xl lg:text-8xl mb-4 md:mb-8 lg:mb-12 ml-2 md:ml-4">%</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end">
            <div className="text-[10px] font-bold tracking-widest uppercase max-w-[200px] text-white/50">
              BUILDING DIGITAL ARCHITECTURES FOR TOMORROW
            </div>
            <div className="w-1/2 md:w-1/3 h-1 bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent-lime"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
