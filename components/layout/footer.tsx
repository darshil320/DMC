import React from "react";
import { DMC } from "@/lib/dmc-config";

export function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border-harsh relative overflow-hidden select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none bg-grid opacity-10" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-10 relative z-10">
        
        {/* Top Info Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-text-secondary font-bold uppercase tracking-widest">Quick Links</span>
            <div className="flex flex-wrap gap-4 text-sm font-medium uppercase">
              <a href="#home" className="hover:text-accent">HOME</a>
              <span className="text-text-primary/30">,</span>
              <a href="#about" className="hover:text-accent">ABOUT</a>
              <span className="text-text-primary/30">,</span>
              <a href="#work" className="hover:text-accent">WORK</a>
              <span className="text-text-primary/30">,</span>
              <a href="#contact" className="hover:text-accent">CONTACT</a>
            </div>
          </div>

          {/* Socials & Email */}
          <div className="flex flex-col gap-2 md:text-right">
            <div className="flex justify-start md:justify-end gap-4 text-sm font-medium uppercase">
              <a href="#" className="hover:text-accent">INSTAGRAM</a>
              <span className="text-text-primary/30">,</span>
              <a href="#" className="hover:text-accent">LINKEDIN</a>
            </div>
            <a href={`mailto:${DMC.email}`} className="text-sm font-medium text-accent uppercase hover:text-text-primary">
              [ {DMC.email} ]
            </a>
          </div>
        </div>

        {/* Harsh divider */}
        <div className="w-full h-px bg-border-harsh mb-10" />

        {/* Massive Dotted Logo */}
        <div className="w-full overflow-hidden flex items-center justify-center mb-10">
          <span className="font-display font-bold text-text-primary leading-none tracking-tight text-[120px] sm:text-[180px] md:text-[240px] lg:text-[340px] uppercase block w-full text-center">
            DMC
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs font-medium text-text-secondary uppercase">
          © 2026 {DMC.fullName}. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
