"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function UWPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g. assets, fonts)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-[#F4F1ED] flex items-center justify-center flex-col"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="text-2xl md:text-4xl font-medium tracking-[0.15em] uppercase text-[#2C2A26] text-center"
            >
              Furniture Concept 2.0
            </motion.h1>
          </div>
          <div className="mt-8 w-48 h-[1px] bg-[#2C2A26]/20 relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-0 bg-[#2C2A26]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
