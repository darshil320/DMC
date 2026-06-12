"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { analytics } from "@/lib/analytics";
import { SOCIAL_LINKS } from "@/lib/dmc-config";

const NAV_LINKS = [
  { num: "01", label: "HOME", href: "/" },
  { num: "02", label: "SERVICES", href: "/services" },
  { num: "03", label: "WORK", href: "/work" },
  { num: "04", label: "ABOUT", href: "/about" },
  { num: "05", label: "CONTACT", href: "/contact" },
];

const ARCHIVE_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwRxB1lfQw1_kdsDGoThSqQl4aYtl5NfRaj58PPwEH-_wrjSWHAEfYYwsnhAVVVWFiPtA/exec";

function MenuLink({ item, closeMenu }: { item: typeof NAV_LINKS[0]; closeMenu: () => void }) {
  return (
    <a
      href={item.href}
      onClick={() => { analytics.navLinkClick(item.label); closeMenu(); }}
      className="group relative flex flex-col font-display text-white w-fit px-6 py-1 md:px-8 md:py-2 transition-colors duration-200"
    >
      {/* Corner crop marks — always in DOM, toggled by CSS (no React re-render on hover) */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <span className="text-xs tracking-widest self-end transition-colors duration-200 text-white/40 group-hover:text-accent-lime">
        {item.num}
      </span>
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-none tracking-tight transition-all duration-200 uppercase text-white/60 group-hover:text-white group-hover:font-bold">
        {item.label}
      </span>
    </a>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [archiveName, setArchiveName] = useState("");
  const [archiveEmail, setArchiveEmail] = useState("");
  const [archiveError, setArchiveError] = useState("");
  const [archiveSuccess, setArchiveSuccess] = useState(false);
  const [isArchiveSubmitting, setIsArchiveSubmitting] = useState(false);

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

  const handleArchiveSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isArchiveSubmitting) return;

    const name = archiveName.trim();
    const email = archiveEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setArchiveError("");
    setArchiveSuccess(false);

    if (!name) {
      setArchiveError("Name is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setArchiveError("Enter a valid email");
      return;
    }

    setIsArchiveSubmitting(true);

    try {
      await fetch(ARCHIVE_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          name,
          email,
          source: "Menu Archive",
        }),
      });

      setArchiveName("");
      setArchiveEmail("");
      setArchiveSuccess(true);
    } catch (error) {
      console.error("Archive subscription failed:", error);
      setArchiveError("Could not subscribe. Try again.");
    } finally {
      setIsArchiveSubmitting(false);
    }
  };

  return (
    <>
      <motion.header
        data-hero-nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={visible ? "visible" : "hidden"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] box-border w-full px-6 py-6 pointer-events-none"
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

          {/* Right - Status, Dark Mode Toggle & Menu Button */}
          <div className="flex flex-row-reverse items-center gap-2 sm:translate-x-0 sm:flex-row sm:gap-4">
            <div className={cn(
              "hidden md:flex items-center gap-2 font-pixel text-[12px] uppercase tracking-widest transition-colors",
              isMenuOpen ? "text-accent-lime" : "text-accent"
            )}>
              <span className={cn("size-2 border", isMenuOpen ? "bg-accent-lime border-accent-lime" : "bg-accent-lime border-accent")} />
              SLOTS OPEN - AUG &apos;26
            </div>

            {/* Dark / light toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="group size-[42px] flex items-center justify-center border border-accent text-accent cursor-pointer hover:bg-accent hover:text-white transition-colors"
            >
              {isDark ? (
                <Sun className="size-4 transition-transform duration-500 group-hover:rotate-[90deg] group-hover:scale-110" />
              ) : (
                <Moon className="size-4 transition-transform duration-500 group-hover:-rotate-[15deg] group-hover:scale-110" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "group flex h-[42px] items-center justify-center gap-2 border px-3 font-pixel text-[12px] tracking-widest transition-colors cursor-pointer sm:px-6",
                isMenuOpen
                  ? "bg-accent-lime text-accent border-accent hover:bg-white hover:text-accent"
                  : "bg-accent text-white border-accent hover:bg-white hover:text-accent"
              )}
            >
              {isMenuOpen ? (
                <X className="size-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
              ) : (
                <Menu className="size-4 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110" />
              )}
              <span className="hidden sm:inline">MENU</span>
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
            className="fixed inset-0 z-[90] bg-accent flex flex-col justify-between px-6 pt-24 pb-6 md:pb-8 select-none overflow-y-auto"
          >
            {/* Vertical grid lines overlay in menu background */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto w-full z-0 opacity-10">
              <div className="w-px h-full bg-white" />
              <div className="w-px h-full bg-white hidden md:block" />
              <div className="w-px h-full bg-white hidden lg:block" />
              <div className="w-px h-full bg-white" />
            </div>

            <div className="max-w-[1440px] mx-auto w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4 md:mt-8 overflow-y-auto z-10 relative">
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
                className="flex flex-col gap-1 md:gap-2 relative border-l border-white/20 pl-6 md:pl-8 h-fit pb-8 md:pb-0"
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
                className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:pl-20 mt-12 md:mt-0 h-fit min-w-0"
              >
                <div className="flex min-w-0 flex-col gap-12">
                  {/* Socials */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-accent-lime uppercase tracking-widest">Socials</span>
                    <div className="flex flex-col gap-3">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white hover:text-accent-lime flex items-center gap-2 w-fit"
                        >
                          <span className="border border-white/40 px-1 py-0.5 text-[9px] font-bold">{social.shortLabel}</span>
                          {social.label.toUpperCase()}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="font-pixel font-bold text-accent-lime uppercase tracking-widest">E-Mail</span>
                    <a href="mailto:hey@dmctech.in" className="inline-block w-max max-w-full whitespace-nowrap text-[clamp(10px,0.78vw,12px)] font-medium leading-none text-white hover:text-accent-lime uppercase tracking-[0.08em]">
                      [HEY@DMCTECH.IN]
                    </a>
                  </div>

                  {/* Rotating stamp badge */}
                  <div className="mt-4 flex items-center justify-start gap-4">
                    <motion.div
                      animate={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 12, ease: "linear" }}
                      className="size-20"
                    >
                      <svg viewBox="0 0 100 100" className="size-full">
                        <path id="menuCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                        <text className="text-[7.5px] font-bold fill-white/80 tracking-[0.14em] uppercase">
                          <textPath href="#menuCirclePath">
                            • DMC TECH • TAKE YOUR BUSINESS ONLINE
                          </textPath>
                        </text>
                        <circle cx="50" cy="50" r="5" className="fill-accent-lime animate-pulse" />
                      </svg>
                    </motion.div>
                    <span className="font-pixel font-bold text-white/50 tracking-wider uppercase leading-snug">
                      ESTD 2026 // <br/>
                      DMC TECH
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Newsletter Box (Lime Green Focus) */}
                  <form onSubmit={handleArchiveSubmit} className="flex flex-col gap-3 max-w-[320px]">
                    <div className="bg-accent-lime text-accent font-pixel font-bold px-3 py-1 self-start border border-accent brutalist-shadow">
                      JOIN THE ARCHIVE
                    </div>
                    <input
                      type="text"
                      value={archiveName}
                      onChange={(event) => {
                        setArchiveName(event.target.value);
                        setArchiveError("");
                        setArchiveSuccess(false);
                      }}
                      placeholder="Your Name"
                      autoComplete="name"
                      className="bg-transparent border border-accent-lime text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:bg-accent-lime focus:text-accent transition-colors duration-200"
                    />
                    <input
                      type="email"
                      value={archiveEmail}
                      onChange={(event) => {
                        setArchiveEmail(event.target.value);
                        setArchiveError("");
                        setArchiveSuccess(false);
                      }}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="bg-transparent border border-accent-lime text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:bg-accent-lime focus:text-accent transition-colors duration-200"
                    />
                    {archiveError && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent-lime">
                        {archiveError}
                      </p>
                    )}
                    {archiveSuccess && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white">
                        Subscribed. Check your inbox.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isArchiveSubmitting}
                      className="bg-accent-lime text-accent border border-accent font-bold text-xs uppercase tracking-widest px-6 py-3 mt-2 hover:bg-white hover:border-black hover:text-black transition-colors self-start cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isArchiveSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
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
