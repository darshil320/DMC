import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-inverse py-20 px-6 md:px-12 lg:px-16 select-none border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Section - Quote & Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 pb-16 md:pb-24 border-b border-neutral-900">
          {/* Quote */}
          <div className="flex flex-col items-start justify-center">
            <blockquote className="text-2xl md:text-3xl font-extrabold tracking-tight leading-normal max-w-[500px] text-white">
              “Your website should not just show what you do. It should make the
              right people ready to work with you.”
            </blockquote>
          </div>

          {/* Columns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
            {/* Agency */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                Agency
              </span>
              <nav className="flex flex-col gap-3 text-xs font-semibold text-neutral-400">
                <Link href="#home" className="hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#work" className="hover:text-white transition-colors">
                  Work
                </Link>
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
                <Link href="#process" className="hover:text-white transition-colors">
                  Process
                </Link>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                Services
              </span>
              <nav className="flex flex-col gap-3 text-xs font-semibold text-neutral-400">
                <Link href="#services" className="hover:text-white transition-colors">
                  One-Page Site
                </Link>
                <Link href="#services" className="hover:text-white transition-colors">
                  Full Website
                </Link>
                <Link href="#services" className="hover:text-white transition-colors">
                  Growth System
                </Link>
                <a href="#services" className="hover:text-white transition-colors">
                  Strategy Sprint
                </a>
                <a href="#services" className="hover:text-white transition-colors">
                  Automation Flow
                </a>
              </nav>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                Resources
              </span>
              <nav className="flex flex-col gap-3 text-xs font-semibold text-neutral-400">
                <a href="#contact" className="hover:text-white transition-colors">
                  Clarity Guide
                </a>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Build Notes
                </Link>
                <Link href="#work" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
                <a href="#" className="hover:text-white transition-colors">
                  Founder Notes
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                Contact
              </span>
              <nav className="flex flex-col gap-3 text-xs font-semibold text-neutral-400">
                <a
                  href="mailto:hello@youragency.com"
                  className="hover:text-white transition-colors break-all"
                >
                  hello@youragency.com
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  X / Twitter
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Row - Massive Wordmark & Copy */}
        <div className="pt-16 md:pt-20 flex flex-col items-center gap-10">
          {/* Large Agency Wordmark */}
          <div className="w-full text-center">
            <h2 className="text-white text-5xl sm:text-7xl md:text-9xl lg:text-[140px] font-black uppercase tracking-tighter leading-none select-none opacity-[0.95] text-neutral-800">
              YOUR AGENCY
            </h2>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 pt-6 border-t border-neutral-900">
            <span>© 2026 YOUR AGENCY. All rights reserved.</span>
            <span>Built for clarity, trust, and conversion.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
