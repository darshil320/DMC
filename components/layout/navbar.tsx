"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

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
      className="group relative flex flex-col font-display text-white w-fit px-8 py-4 transition-colors duration-200"
    >
      {/* Corner Crop Marks on Hover */}
      {isHovered && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />
        </>
      )}

      <span className={cn(
        "text-xs tracking-widest mb-1 self-end transition-colors duration-200",
        isHovered ? "text-accent-lime" : "text-white/40"
      )}>
        {item.num}
      </span>
      <span className={cn(
        "text-5xl md:text-7xl lg:text-[90px] leading-none tracking-tight transition-all duration-200 uppercase",
        isHovered ? "text-white font-bold" : "text-white/60"
      )}>
        {item.label}
      </span>
    </a>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      const currentScrollY = window.scrollY;

      // If the menu is open, don't hide the navbar
      if (isMenuOpen) {
        setVisible(true);
        return;
      }

      // Always show at the top of the page
      if (currentScrollY < 120) {
        setVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar
        setVisible(false);
      } else {
        // Scrolling up: show navbar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={visible ? "visible" : "hidden"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] w-full px-6 py-6 pointer-events-none"
      >
        <div className="max-w-[1440px] mx-auto flex items-start justify-between pointer-events-auto">
          {/* Left - Logo (Lime green box, dotted text) */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group bg-accent-lime border border-accent px-4 py-2 brutalist-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            <span className="font-display text-2xl tracking-widest text-accent font-bold">DMC</span>
          </Link>

          {/* Right - Status & Menu Button */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest">
              <span className="size-2 bg-accent-lime border border-accent" />
              SLOTS OPEN - AUG &apos;26
            </div>
            
            <button
              onClick={toggleMenu}
              className={cn(
                "px-6 py-3 text-[11px] font-bold tracking-widest border transition-colors cursor-pointer",
                isMenuOpen
                  ? "bg-accent-lime text-accent border-accent hover:bg-white hover:text-accent"
                  : "bg-accent text-white border-accent hover:bg-white hover:text-accent"
              )}
            >
              {isMenuOpen ? "✕ MENU" : "+ MENU"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Brutalist Blue Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-accent flex flex-col justify-between px-6 py-24 select-none"
          >
            {/* Vertical grid lines overlay in menu background */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto w-full z-0 opacity-10">
              <div className="w-px h-full bg-white" />
              <div className="w-px h-full bg-white hidden md:block" />
              <div className="w-px h-full bg-white hidden lg:block" />
              <div className="w-px h-full bg-white" />
            </div>

            <div className="max-w-[1440px] mx-auto w-full h-full grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 overflow-y-auto z-10 relative">
              {/* Left: Huge Dotted Navigation */}
              <motion.nav 
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6 md:gap-8 relative border-l border-white/20 pl-8 h-fit"
              >
                {/* Minimal crop marks */}
                <div className="absolute top-0 -left-[5px] w-2.5 h-px bg-white/40" />
                <div className="absolute top-0 left-0 w-px h-2.5 bg-white/40" />
                <div className="absolute bottom-0 -left-[5px] w-2.5 h-px bg-white/40" />
                <div className="absolute bottom-0 left-0 w-px h-2.5 bg-white/40" />
                
                {NAV_LINKS.map((item) => (
                  <motion.div 
                    key={item.label}
                    variants={{
                      hidden: { y: -30, opacity: 0 },
                      show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
                    }}
                  >
                    <MenuLink item={item} closeMenu={closeMenu} />
                  </motion.div>
                ))}
              </motion.nav>

              {/* Right: Socials & Form (Brutalist style) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="flex grid grid-cols-1 sm:grid-cols-2 gap-12 md:pl-20 mt-12 md:mt-0 h-fit"
              >
                <div className="flex flex-col gap-12">
                  {/* Socials */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-accent-lime uppercase tracking-widest">Socials</span>
                    <div className="flex flex-col gap-3">
                      <a href="#" className="text-sm font-medium text-white hover:text-accent-lime flex items-center gap-2 w-fit">
                        <span className="border border-white/40 px-1 py-0.5 text-[9px] font-bold">IG</span> INSTAGRAM
                      </a>
                      <a href="#" className="text-sm font-medium text-white hover:text-accent-lime flex items-center gap-2 w-fit">
                        <span className="border border-white/40 px-1 py-0.5 text-[9px] font-bold">IN</span> LINKEDIN
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-accent-lime uppercase tracking-widest">E-Mail</span>
                    <a href="mailto:hello@dmcdigital.in" className="text-sm font-medium text-white hover:text-accent-lime uppercase tracking-widest w-fit">
                      [ HELLO@DMCDIGITAL.IN ]
                    </a>
                  </div>

                  {/* Rotating stamp badge */}
                  <div className="mt-4 flex items-center justify-start gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="size-20"
                    >
                      <svg viewBox="0 0 100 100" className="size-full">
                        <path id="menuCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                        <text className="text-[7.5px] font-bold fill-white/80 tracking-[0.14em] uppercase">
                          <textPath href="#menuCirclePath">
                            • DMC DIGITAL • TAKE YOUR BUSINESS ONLINE
                          </textPath>
                        </text>
                        <circle cx="50" cy="50" r="5" className="fill-accent-lime animate-pulse" />
                      </svg>
                    </motion.div>
                    <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase leading-snug">
                      ESTD 2026 // <br/>
                      DMC DIGITAL
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Newsletter Box (Lime Green Focus) */}
                  <div className="flex flex-col gap-3 max-w-[320px]">
                    <div className="bg-accent-lime text-accent text-[10px] font-bold px-3 py-1 self-start border border-accent brutalist-shadow">
                      JOIN THE ARCHIVE
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="bg-transparent border border-accent-lime text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:bg-accent-lime focus:text-accent transition-colors duration-200"
                    />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="bg-transparent border border-accent-lime text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:bg-accent-lime focus:text-accent transition-colors duration-200"
                    />
                    <button className="bg-accent-lime text-accent border border-accent font-bold text-xs uppercase tracking-widest px-6 py-3 mt-2 hover:bg-white hover:border-black hover:text-black transition-colors self-start cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="w-full text-center text-[9px] font-bold text-white/50 uppercase tracking-widest mt-12 z-10">
              | &nbsp; INSIGHTS &nbsp; |
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
