"use client";

import { motion } from "motion/react";

export function UWLegacy() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 border-t border-uw-border-subtle">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-uw-text-muted mb-4 block">
            Our Legacy
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-uw-text-primary leading-[1.1] mb-6">
            Crafting spaces<br />since 1989.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-7 flex flex-col justify-center"
        >
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-uw-text-secondary mb-6 max-w-xl">
            Managed by visionary partners including T. Shah, Furniture Concept 2.0 has established itself as the premier manufacturer and dealer in Surat for over three decades.
          </p>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-uw-text-secondary max-w-xl">
            We specialize in elevating environments through meticulously crafted corporate, institutional, and modular home furniture that balances ergonomic science with refined aesthetics.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
