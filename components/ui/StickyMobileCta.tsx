"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { DMC } from "@/lib/dmc-config";
import { analytics } from "@/lib/analytics";

const SHOW_AFTER_VIEWPORTS = 0.85;

/**
 * Persistent action bar, shown once the visitor scrolls past the hero and
 * hidden again when the final CTA section (#contact) is on screen so the two
 * never stack.
 *
 * Mobile gets a full-width bottom bar; desktop gets a bottom-right pill — the
 * homepage runs to roughly 4,000px and previously had no CTA in reach at all
 * between the nav and the very bottom.
 *
 * The label is context-aware: while the pricing section is on screen the
 * primary action becomes the intent quiz, because someone reading prices is
 * deciding which tier they are, not whether to enquire.
 */
export function StickyMobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [finalCtaInView, setFinalCtaInView] = useState(false);
  const [pricingInView, setPricingInView] = useState(false);
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
    const observed: Array<[string, (inView: boolean) => void]> = [
      ["contact", setFinalCtaInView],
      ["pricing", setPricingInView],
    ];

    const observers = observed
      .map(([id, setter]) => {
        const node = document.getElementById(id);
        if (!node) return null;

        const observer = new IntersectionObserver(
          (entries) => entries.forEach((entry) => setter(entry.isIntersecting)),
          { threshold: 0.05 }
        );
        observer.observe(node);
        return observer;
      })
      .filter((observer): observer is IntersectionObserver => observer !== null);

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = pastHero && !finalCtaInView;

  const primary = pricingInView
    ? { href: "#find-your-fit", label: "See which package fits" }
    : { href: "/contact", label: "Start a project" };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: full-width bar */}
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
              onClick={() => analytics.whatsappClick()}
              className="flex h-14 items-center justify-center gap-2 bg-accent-lime text-accent text-[11px] font-black uppercase tracking-[0.16em] border-r border-border-harsh"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <a
              href={primary.href}
              className="flex h-14 items-center justify-center gap-2 bg-accent text-white text-[11px] font-black uppercase tracking-[0.16em]"
            >
              {primary.label}
              <span aria-hidden>→</span>
            </a>
          </motion.div>

          {/* Desktop: bottom-right pill, out of the way of the content column */}
          <motion.div
            initial={reduceMotion ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex fixed bottom-6 right-6 z-[80] items-stretch border border-border-harsh bg-bg-page brutalist-shadow"
          >
            <a
              href={DMC.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.whatsappClick()}
              className="flex items-center gap-2 border-r border-border-harsh bg-accent-lime px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-accent transition-colors hover:bg-white"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <a
              href={primary.href}
              className="group flex items-center gap-2 bg-accent px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-text-primary"
            >
              {primary.label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
