"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { STYLES } from "@/lib/uw-content";

const STYLE_IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=100",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=100",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=100",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=100",
  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=100",
];

const SIDE_OFFSETS = [0, -20, 10, -30, 15];

export function UWStyleList() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % STYLES.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section
      className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-32 border-t border-uw-border-subtle overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-0 lg:min-h-[520px] gap-12 lg:gap-0">
        
        {/* Mobile/Tablet Active Image (Hidden on Desktop) */}
        <div className="w-full max-w-sm mx-auto block lg:hidden aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden relative shadow-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={`mobile-img-${active}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={STYLE_IMAGES[active]}
              alt={STYLES[active]}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Left product image (Desktop only) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${active}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: SIDE_OFFSETS[active] }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute left-0 hidden lg:block w-[220px] z-10"
          >
            <div className="rounded-xl overflow-hidden aspect-[3/4] shadow-md bg-[#EAEAE5]">
              <img
                src={STYLE_IMAGES[active]}
                alt={STYLES[active]}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Centered list */}
        <div className="w-full max-w-xl mx-auto z-20">
          <ul className="flex flex-col gap-4 lg:gap-3">
            {STYLES.map((style, idx) => (
              <li key={style}>
                <button
                  onClick={() => setActive(idx)}
                  className={`relative text-left w-full transition-all duration-500 group flex items-center ${
                    idx === active ? "opacity-100 pl-2 lg:pl-0" : "opacity-30 hover:opacity-60"
                  }`}
                  aria-current={idx === active ? "true" : undefined}
                >
                  <span
                    className="block font-medium text-uw-text-primary leading-tight transition-transform duration-500"
                    style={{ fontSize: "clamp(22px, 4vw, 46px)" }}
                  >
                    <sup className="text-[10px] lg:text-[12px] font-normal mr-2 lg:mr-3 align-top mt-1 lg:mt-2 text-uw-text-primary/60">
                      0{idx + 1}
                    </sup>
                    {style}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right product image (Desktop only) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${active}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: -(SIDE_OFFSETS[active]) }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute right-0 hidden lg:block w-[180px] z-10"
          >
            <div className="rounded-xl overflow-hidden aspect-square shadow-md bg-[#EAEAE5]">
              <img
                src={STYLE_IMAGES[(active + 2) % STYLES.length]}
                alt={STYLES[(active + 2) % STYLES.length]}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
