import React from "react";
import Link from "next/link";
import { DMC, SOCIAL_LINKS } from "@/lib/dmc-config";

export function Footer() {
  return (
    <footer className="bg-bg-page relative select-none">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Info Row — Quick Links left, email right */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-10">
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-text-secondary uppercase tracking-widest mb-1">Quick Links</span>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium uppercase tracking-wide">
              <Link href="/#home" className="link-underline hover:text-accent transition-colors">HOME</Link>
              <span className="text-text-primary/30">,</span>
              <Link href="/#about" className="link-underline hover:text-accent transition-colors">ABOUT</Link>
              <span className="text-text-primary/30">,</span>
              <Link href="/#work" className="link-underline hover:text-accent transition-colors">WORK</Link>
              <span className="text-text-primary/30">,</span>
              <Link href="/contact" className="link-underline hover:text-accent transition-colors">CONTACT</Link>
            </div>
            <Link
              href="/contact"
              className="link-underline group inline-flex w-fit items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-accent transition-colors hover:text-text-primary"
            >
              Let&apos;s build you a world-class website
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 md:items-end">
            <div className="flex gap-2 text-sm font-medium uppercase tracking-wide">
              {SOCIAL_LINKS.map((social, index) => (
                <React.Fragment key={social.label}>
                  {index > 0 && <span className="text-text-primary/30">,</span>}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline hover:text-accent transition-colors"
                  >
                    {social.label.toUpperCase()}
                  </a>
                </React.Fragment>
              ))}
            </div>
            <a href={`mailto:${DMC.email}`} className="text-sm font-medium text-accent uppercase tracking-wide hover:text-text-primary transition-colors">
              [ {DMC.email} ]
            </a>
          </div>
        </div>

        {/* Thin divider */}
        <div className="w-full h-px bg-border-harsh" />

        {/* Massive Logo */}
        <div className="flex w-full items-center justify-center overflow-hidden py-10 md:py-16">
          <span className="font-display font-bold text-text-primary leading-none tracking-tight text-[100px] sm:text-[160px] md:text-[220px] lg:text-[300px] uppercase block w-full text-center transition-colors duration-500 cursor-default">
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
