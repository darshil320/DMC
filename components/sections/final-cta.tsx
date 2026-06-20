"use client";

import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { DMC } from "@/lib/dmc-config";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FinalCtaSection() {
  return (
    <section id="contact" className="w-full bg-accent relative overflow-hidden select-none border-y border-border-harsh">
      {/* Decorative drifting wire-squares */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <span className="float-decor absolute top-[12%] left-[8%] size-16 border border-white/15" style={{ ["--float-duration" as string]: "11s" }} />
        <span className="float-decor absolute top-[58%] left-[18%] size-10 border border-accent-lime/25" style={{ ["--float-duration" as string]: "8s" }} />
        <span className="float-decor absolute top-[24%] right-[14%] size-24 border border-white/10" style={{ ["--float-duration" as string]: "13s" }} />
        <span className="float-decor absolute bottom-[14%] right-[26%] size-8 border border-accent-lime/20" style={{ ["--float-duration" as string]: "9.5s" }} />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 relative z-10 min-h-[70vh]">
        
        {/* Left - Massive Typo */}
        <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/20">
          <div className="section-tag">
            START YOUR PROJECT
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-display font-bold uppercase tracking-wider leading-none text-white mb-6">
            READY TO <br />
            BUILD?
          </h2>
          
          <div className="mb-5 inline-flex border border-accent-lime bg-accent-lime px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-accent">
            World-class website
          </div>

          <p className="text-white/80 text-base md:text-lg max-w-[400px] font-medium">
            Let&apos;s build you a website that looks premium, earns trust fast, and turns visitors into enquiries.
          </p>
        </div>

        {/* Right - Brutalist Form / Links */}
        <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-center gap-12 bg-accent">
          
          {/* WhatsApp CTA */}
          <div className="flex flex-col gap-4">
            <span className="font-pixel font-bold text-white uppercase tracking-widest">
              Primary Contact
            </span>
            <MagneticButton strength={10} className="w-full max-w-[400px]">
              <a
                href={DMC.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-accent-lime border-2 border-accent text-accent px-6 py-4 flex items-center justify-between brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-5" />
                  <span className="font-bold text-sm uppercase tracking-widest">Chat on WhatsApp</span>
                </div>
                <span className="font-display text-lg group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </MagneticButton>
          </div>

          {/* Email CTA */}
          <div className="flex flex-col gap-4">
            <span className="font-pixel font-bold text-white uppercase tracking-widest">
              Or E-mail Us
            </span>
            <MagneticButton strength={10} className="w-full max-w-[400px]">
              <a
                href={`mailto:${DMC.email}`}
                className="group bg-transparent border-2 border-accent-lime text-white px-6 py-4 flex items-center justify-between w-full hover:bg-accent-lime hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="size-5" />
                  <span className="font-bold text-sm uppercase tracking-widest">Send Email</span>
                </div>
                <span className="font-display text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
              </a>
            </MagneticButton>
          </div>

        </div>

      </div>
    </section>
  );
}
