"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { navItems } from "@/lib/content";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 lg:px-16 py-5 transition-all duration-300",
          isScrolled
            ? "bg-bg-page/80 border-b border-border-subtle backdrop-blur-md py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Left - Wordmark */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-lg md:text-xl font-black uppercase tracking-tighter text-text-primary"
          >
            YOUR AGENCY
          </Link>

          {/* Center - Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] font-semibold uppercase tracking-wider text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
              >
                <span className="text-[9px] text-text-muted">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right - CTA and Availability */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-text-secondary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Now booking Q3
            </span>
            <Button href="#contact" variant="primary" size="sm">
              Let’s Build Yours
            </Button>
          </div>

          {/* Mobile menu hamburger button */}
          <button
            onClick={toggleMenu}
            className="flex md:hidden items-center justify-center p-2 text-text-primary focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span
                className={cn(
                  "w-6 h-[2px] bg-text-primary transition-transform duration-300 origin-left",
                  isMenuOpen && "rotate-45 translate-x-[4px] translate-y-[-1px]"
                )}
              />
              <span
                className={cn(
                  "w-6 h-[2px] bg-text-primary transition-opacity duration-300",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-[2px] bg-text-primary transition-transform duration-300 origin-left",
                  isMenuOpen && "-rotate-45 translate-x-[4px] translate-y-[1px]"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg-page flex flex-col justify-between px-6 py-24 transition-all duration-500 md:hidden",
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        {/* Mobile menu list */}
        <nav className="flex flex-col gap-8 mt-12">
          {navItems.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-4xl font-extrabold uppercase tracking-tight text-text-primary hover:text-accent transition-colors duration-300 flex items-baseline gap-4"
            >
              <span className="text-xs font-semibold text-accent">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu bottom links */}
        <div className="flex flex-col gap-6 border-t border-border-subtle pt-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-text-muted">
              Get in Touch
            </span>
            <a
              href="mailto:hello@youragency.com"
              className="text-lg font-bold text-text-primary hover:text-accent transition-colors"
            >
              hello@youragency.com
            </a>
          </div>

          <div className="flex items-center gap-6">
            {["Instagram", "LinkedIn", "X"].map((soc) => (
              <a
                key={soc}
                href="#"
                className="text-xs uppercase tracking-wider font-semibold text-text-secondary hover:text-accent transition-colors"
              >
                {soc}
              </a>
            ))}
          </div>

          <Button href="#contact" variant="primary" size="md" className="w-full mt-2" onClick={closeMenu}>
            Let’s Build Yours
          </Button>
        </div>
      </div>
    </>
  );
}
export default Header;
