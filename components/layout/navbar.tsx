"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { num: "01", label: "HOME", href: "#home" },
  { num: "02", label: "SERVICES", href: "#services" },
  { num: "03", label: "WORK", href: "#work" },
  { num: "04", label: "CONTACT", href: "#contact" },
];

function MenuLink({ item, closeMenu }: { item: typeof NAV_LINKS[0]; closeMenu: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={item.href}
      onClick={closeMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-6 py-4 transition-colors duration-300"
    >
      <span className={cn(
        "text-sm font-sans tracking-[0.2em] transition-colors duration-300",
        isHovered ? "text-accent" : "text-text-muted"
      )}>
        {item.num}
      </span>
      <span className={cn(
        "text-4xl md:text-6xl font-display tracking-wide transition-all duration-300",
        isHovered ? "text-text-primary translate-x-4" : "text-text-secondary"
      )}>
        {item.label}
      </span>
    </a>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500",
          scrolled ? "py-4 bg-bg-page/80 backdrop-blur-md border-b border-border-subtle" : "py-8 bg-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex flex-col"
          >
            <span className="font-display text-2xl tracking-widest text-text-primary uppercase">DMC</span>
            <span className="text-[9px] tracking-[0.2em] text-accent uppercase font-sans mt-1">Digital Market Creators</span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 text-[11px] text-text-muted uppercase tracking-widest font-sans">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Accepting Projects
            </div>
            
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center size-12 rounded-full border border-border-harsh text-text-primary hover:border-accent hover:text-accent transition-all duration-300 group"
            >
              <div className="flex flex-col gap-1.5 items-center justify-center w-5">
                <span className={cn("h-px bg-current transition-all duration-300", isMenuOpen ? "w-5 rotate-45 translate-y-[3.5px]" : "w-5 group-hover:w-4")} />
                <span className={cn("h-px bg-current transition-all duration-300", isMenuOpen ? "w-5 -rotate-45 -translate-y-[3.5px]" : "w-4 group-hover:w-5")} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Elegant Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-bg-page/95 backdrop-blur-xl flex flex-col justify-center px-6 md:px-12 pt-20 pb-10"
          >
            <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative h-full md:h-auto overflow-y-auto">
              {/* Left: Navigation */}
              <nav className="flex flex-col gap-1 md:gap-2 justify-center">
                {NAV_LINKS.map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <MenuLink item={item} closeMenu={closeMenu} />
                  </motion.div>
                ))}
              </nav>

              {/* Right: Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col justify-start md:justify-end gap-12 pb-8 md:pb-0 border-t border-border-subtle md:border-t-0 pt-8 md:pt-0"
              >
                <div className="flex flex-col sm:flex-row md:flex-col gap-8 md:gap-12 font-sans w-full justify-between sm:justify-start">
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">Contact</span>
                    <a href="mailto:hello@dmcdigital.in" className="text-sm md:text-base text-text-primary hover:text-accent transition-colors font-medium">
                      hello@dmcdigital.in
                    </a>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">Social</span>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <a href="#" className="text-sm md:text-base text-text-primary hover:text-accent transition-colors font-medium">Instagram</a>
                      <a href="#" className="text-sm md:text-base text-text-primary hover:text-accent transition-colors font-medium">LinkedIn</a>
                      <a href="#" className="text-sm md:text-base text-text-primary hover:text-accent transition-colors font-medium">Twitter</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
