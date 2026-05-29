"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function UWPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate luxury loading duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] bg-[#FAF7F0] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Futuristic glowing backdrop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#B8895B]/15 blur-[120px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 overflow-hidden mb-8 flex flex-col items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.4em] text-uw-text-muted/80 font-sans font-bold"
            >
              Initiating
            </motion.span>
            <motion.h1
              initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter text-uw-text-primary text-center leading-none"
            >
              URBANWOOD
            </motion.h1>
          </div>
          
          {/* Futuristic precise progress line */}
          <div className="w-[200px] md:w-[300px] h-[2px] bg-uw-border-subtle relative overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="absolute inset-0 bg-uw-accent shadow-[0_0_15px_rgba(90,56,37,0.6)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
