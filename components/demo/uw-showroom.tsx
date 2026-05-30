"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function UWShowroom() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 border-t border-uw-border-subtle">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left — image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] md:aspect-[3/4] w-full rounded-sm overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop&q=60"
            alt="Furniture Concept 2.0 Showroom in Surat"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Right — content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-uw-text-muted mb-6 block">
            Visit Our Showroom
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-uw-text-primary leading-[1.1] mb-12">
            Experience comfort<br />in person.
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-[11px] font-medium tracking-[0.15em] uppercase text-uw-text-muted mb-3">
                Location
              </h3>
              <p className="text-[16px] leading-[1.6] text-uw-text-primary max-w-sm">
                G-2, Shree Arc 2, Opposite Shanidev Temple,<br />
                Sosyo Circle to Udhna Magdalla Road,<br />
                Udhna, Surat, Gujarat 395002
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-medium tracking-[0.15em] uppercase text-uw-text-muted mb-3">
                Business Hours
              </h3>
              <p className="text-[16px] leading-[1.6] text-uw-text-primary">
                Open Daily from 10:00 AM to 8:00 PM
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-medium tracking-[0.15em] uppercase text-uw-text-muted mb-3">
                Contact
              </h3>
              <p className="text-[16px] leading-[1.6] text-uw-text-primary mb-6">
                +91-9081129000
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://maps.google.com/?q=Shree+Arc+2,+Udhna,+Surat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#2C2A26] text-[#F4F1ED] px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-black transition-colors"
              >
                Get Directions
              </a>
              <a
                href="tel:+919081129000"
                className="inline-flex items-center justify-center border border-[#2C2A26]/20 text-[#2C2A26] px-8 py-4 text-[12px] uppercase tracking-widest font-medium hover:border-[#2C2A26] transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
