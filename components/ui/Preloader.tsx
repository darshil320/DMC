"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress with easing — fast start, slow finish
    let current = 0;
    const interval = setInterval(() => {
      const remaining = 100 - current;
      const increment = Math.max(0.5, remaining * 0.08);
      current = Math.min(current + increment, 98);
      setProgress(Math.round(current));
    }, 30);

    // When fonts + DOM are ready, snap to 100 and exit
    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    };

    // Wait for fonts + a minimum display time for polish
    const fontReady = document.fonts.ready;
    const minTime = new Promise((r) => setTimeout(r, 1400));
    Promise.all([fontReady, minTime]).then(finish);

    return () => clearInterval(interval);
  }, []);

  // Unlock scroll after loader exits
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-page"
        >
          {/* Centered Content */}
          <div className="flex flex-col items-center gap-10">
            {/* Logo Mark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="font-display text-4xl sm:text-5xl tracking-widest text-text-primary uppercase">
                DMC
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-accent uppercase font-sans font-medium">
                Digital Market Creators
              </span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 sm:w-56 flex flex-col items-center gap-4">
              <div className="w-full h-px bg-border-subtle overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[11px] text-text-muted tracking-[0.2em] font-sans tabular-nums"
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-8 text-[9px] sm:text-[10px] text-text-muted tracking-[0.25em] uppercase font-sans"
          >
            Premium Digital Experiences
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
