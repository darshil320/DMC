"use client";

import { motion } from "motion/react";
import { Highlight } from "@/components/ui/hero-highlight";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import { URBANWOOD } from "@/lib/dmc-config";
import { cn } from "@/lib/utils";

export function UWHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-uw-cream flex items-center">
      {/* Subtle dot texture — matches HeroHighlight light theme but on cream */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%233D2817' opacity='0.15' cx='10' cy='10' r='2'%3E%3C/circle%3E%3C/svg%3E")`,
        }}
      />

      {/* Editorial hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400&q=80"
          alt="Premium furniture showroom"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-uw-cream via-uw-cream/95 to-uw-cream/40" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-uw-brown/20 bg-uw-brown/8 mb-8">
            <span className="text-xs text-uw-brown font-medium uppercase tracking-wider">
              Furniture Concepts 2.0 • Surat
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-uw-brown leading-tight mb-6">
            Premium Furniture for{" "}
            <Highlight className="text-uw-brown bg-gradient-to-r from-amber-200 to-yellow-100 dark:from-amber-300 dark:to-yellow-200">
              Modern Homes
            </Highlight>
          </h1>

          <p className="text-uw-brown/70 text-lg leading-relaxed mb-10 max-w-xl">
            Explore sofas, beds, wardrobes, dining sets, and custom furniture
            from our showroom in Ahmedabad. Browse online and enquire directly
            on WhatsApp.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-uw-brown text-uw-cream font-bold text-base px-8 py-4 h-auto hover:bg-uw-brown/90"
              )}
            >
              View Collection
            </a>
            <a
              href={URBANWOOD.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-dmc-whatsapp text-white font-bold text-base px-8 py-4 h-auto hover:bg-dmc-whatsapp/90 gap-2"
              )}
            >
              <MessageCircle className="size-5" />
              Enquire on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-uw-brown/40"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
