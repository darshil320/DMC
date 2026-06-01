"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { STYLES } from "@/lib/fc-content";

const STYLE_IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=240&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=240&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=240&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=240&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=240&auto=format&fit=crop&q=60",
];

const SIDE_OFFSETS = [0, -20, 10, -30, 15];

export function FCStyleList() {
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
      className="hidden md:block max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 border-t border-[#E6DED2]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative flex items-center justify-center min-h-[520px]">
        {/* Left product image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: SIDE_OFFSETS[active] }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute left-0 hidden lg:block w-[200px]"
          >
            <div className="rounded-lg overflow-hidden aspect-[3/4] bg-[#EAEAE5]">
              <img
                src={STYLE_IMAGES[active]}
                alt={STYLES[active]}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Centered list */}
        <div className="text-center w-full max-w-xl mx-auto">
          <ul className="flex flex-col gap-3">
            {STYLES.map((style, idx) => (
              <li key={style}>
                <button
                  onClick={() => setActive(idx)}
                  className={`relative text-left w-full transition-all duration-500 ${
                    idx === active ? "opacity-100" : "opacity-25"
                  }`}
                  aria-current={idx === active ? "true" : undefined}
                >
                  <span
                    className="block font-medium text-[#1F1A16] leading-tight"
                    style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
                  >
                    <sup className="text-[12px] font-normal mr-1.5 align-top mt-2 text-[#A89F94]">
                      {idx + 1}
                    </sup>
                    {style}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right product image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${active}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: -(SIDE_OFFSETS[active]) }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute right-0 hidden lg:block w-[175px]"
          >
            <div className="rounded-lg overflow-hidden aspect-square bg-[#EAEAE5]">
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
