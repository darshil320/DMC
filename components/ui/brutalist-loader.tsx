"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function BrutalistLoader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";
    
    // Fast counter animation
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 10) + 5;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "unset";
        }, 500); // Wait a bit at 100%
      }
      setProgress(count);
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
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
              {/* Crop marks */}
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
            
            {/* Progress Bar Container */}
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
