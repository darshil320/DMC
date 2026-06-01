"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Color {
  readonly name: string;
  readonly hex: string;
  readonly image: string;
}

interface ProductFeatureProps {
  name: string;
  description: string;
  colors: readonly Color[];
  price?: string;
  showShopLink?: boolean;
  reverse?: boolean;
}

export function FCProductFeatureV2({
  name,
  description,
  colors,
  price,
  showShopLink,
  reverse = false,
}: ProductFeatureProps) {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 border-t border-[#E6DED2]"
    >
      {/* ── Lifestyle photo with crossfade ─────────────────── */}
      <div
        className={`relative md:col-span-8 aspect-[4/3] md:aspect-auto md:h-[100vh] md:min-h-[800px] overflow-hidden bg-[#EAEAE5] ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={colors[selected].image}
            src={colors[selected].image}
            alt={`${name} in ${colors[selected].name}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Product name chip */}
        <div className="absolute top-8 left-8 z-10">
          <span className="text-[14px] font-serif tracking-[0.06em] bg-[#F4F1ED]/95 backdrop-blur-md text-[#2C2A26] px-4 py-2 rounded-sm shadow-sm">
            {name}
          </span>
        </div>

        {/* Colour indicator — bottom left */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 z-10 flex items-center gap-2"
          >
            <span
              className="size-3 rounded-full border border-white/30"
              style={{ backgroundColor: colors[selected].hex }}
            />
            <span className="text-[11px] text-white/80 font-medium tracking-wide">
              {colors[selected].name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Details panel ────────────────────────────────────── */}
      <div
        className={`md:col-span-4 flex flex-col justify-center gap-12 px-10 md:px-14 py-16 md:py-24 bg-[#F4F1ED] ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        {/* Description */}
        <p className="text-[16px] leading-[1.9] text-[#2C2A26]/80 max-w-[260px] font-serif">
          {description}
        </p>

        {/* Swatches + preview */}
        <div className="space-y-6">
          {/* Colour label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={selected}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] uppercase tracking-[0.16em] text-[#A89F94]"
            >
              Colour : {colors[selected].name}
            </motion.p>
          </AnimatePresence>

          {/* Swatch row */}
          <div className="flex items-center gap-3">
            {colors.map((color, idx) => (
              <motion.button
                key={color.name}
                onClick={() => setSelected(idx)}
                aria-label={`Select colour ${color.name}`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`size-[28px] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-text-primary relative ${
                  idx === selected ? "ring-2 ring-offset-[3px] ring-fc-text-primary ring-offset-fc-bg-page" : ""
                }`}
                style={{
                  backgroundColor: color.hex,
                  boxShadow: color.hex === "#E8E4DC" || color.hex === "#EDE8E0" || color.hex === "#D8D2C4"
                    ? "inset 0 0 0 1px rgba(0,0,0,0.12)"
                    : undefined,
                }}
              />
            ))}
          </div>

          {/* Preview card — colour band + photo */}
          <motion.div
            layout
            className="w-[170px] rounded-md overflow-hidden border border-[#E6DED2] shadow-sm"
          >
            {/* Solid colour band */}
            <motion.div
              animate={{ backgroundColor: colors[selected].hex }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-14 w-full"
            />
            {/* Photo thumbnail with crossfade */}
            <div className="h-[88px] relative overflow-hidden bg-[#F5F4F0]">
              <AnimatePresence mode="sync">
                <motion.img
                  key={colors[selected].image}
                  src={colors[selected].image}
                  alt={`${name} in ${colors[selected].name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: "center 35%" }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer: price + link */}
        <div className="space-y-3">
          {price && (
            <p className="text-[13px] text-[#5F554B] leading-relaxed">
              2-Seater · From{" "}
              <span className="font-semibold text-[#1F1A16]">{price}</span>
            </p>
          )}
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`inline-flex items-center gap-2 text-[13px] font-medium pb-0.5 group ${
              showShopLink
                ? "text-[#1F1A16] border-b border-fc-text-primary"
                : "text-[#A89F94] hover:text-[#1F1A16] transition-colors"
            }`}
          >
            {showShopLink ? "Shop Now" : "View Details"}
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
