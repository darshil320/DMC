"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { DMC } from "@/lib/dmc-config";

const SHOW_AFTER_VIEWPORTS = 0.85;

/**
 * Mobile-only bottom action bar: WhatsApp + start-a-project, shown once the
 * visitor scrolls past the hero and hidden again when the final CTA section
 * (#contact) is on screen so the two never stack.
 */
export function StickyMobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [finalCtaInView, setFinalCtaInView] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const finalCta = document.getElementById("contact");
    if (!finalCta) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setFinalCtaInView(entry.isIntersecting));
      },
      { threshold: 0.05 }
    );
    observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !finalCtaInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          exit={reduceMotion ? undefined : { y: "110%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed bottom-0 inset-x-0 z-[80] grid grid-cols-2 border-t border-border-harsh bg-bg-page pb-[env(safe-area-inset-bottom)]"
        >
          <a
            href={DMC.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2 bg-accent-lime text-accent text-[11px] font-black uppercase tracking-[0.16em] border-r border-border-harsh"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
          <a
            href="/contact"
            className="flex h-14 items-center justify-center gap-2 bg-accent text-white text-[11px] font-black uppercase tracking-[0.16em]"
          >
            Start a project
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
