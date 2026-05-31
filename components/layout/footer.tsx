import React from "react";
import { DMC } from "@/lib/dmc-config";

export function Footer() {
  return (
    <footer className="bg-bg-page relative select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Info Row — Quick Links left, Socials right */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-10">
          {/* Quick Links */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-text-secondary uppercase tracking-widest mb-1">Quick Links</span>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium uppercase tracking-wide">
              <a href="#home" className="hover:text-accent transition-colors">HOME</a>
              <span className="text-text-primary/30">,</span>
              <a href="#about" className="hover:text-accent transition-colors">ABOUT</a>
              <span className="text-text-primary/30">,</span>
              <a href="#work" className="hover:text-accent transition-colors">WORK</a>
              <span className="text-text-primary/30">,</span>
              <a href="#contact" className="hover:text-accent transition-colors">CONTACT</a>
            </div>
          </div>

          {/* Socials & Email */}
          <div className="flex flex-col gap-1 md:items-end">
            <div className="flex gap-2 text-sm font-medium uppercase tracking-wide">
              <a href="#" className="hover:text-accent transition-colors">INSTAGRAM</a>
              <span className="text-text-primary/30">,</span>
              <a href="#" className="hover:text-accent transition-colors">LINKEDIN</a>
            </div>
            <a href={`mailto:${DMC.email}`} className="text-sm font-medium text-accent uppercase tracking-wide hover:text-text-primary transition-colors">
              [ {DMC.email} ]
            </a>
          </div>
        </div>

        {/* Thin divider */}
        <div className="w-full h-px bg-border-harsh" />

        {/* Massive Logo */}
        <div className="w-full overflow-hidden flex items-center justify-center py-10 md:py-16">
          <span className="font-display font-bold text-text-primary leading-none tracking-tight text-[100px] sm:text-[160px] md:text-[220px] lg:text-[300px] uppercase block w-full text-center">
            DMC
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] font-medium text-text-secondary uppercase tracking-widest pb-8">
          © 2026 ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
