"use client";

import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { DMC } from "@/lib/dmc-config";

export function FinalCtaSection() {
  return (
    <section id="contact" className="w-full bg-accent relative overflow-hidden select-none border-y border-border-harsh">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 relative z-10 min-h-[70vh]">
        
        {/* Left - Massive Typo */}
        <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/20">
          <div className="bg-accent-lime text-accent border border-accent px-3 py-1 font-pixel font-bold uppercase tracking-widest self-start mb-8 brutalist-shadow">
            START YOUR PROJECT
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-display font-bold uppercase tracking-wider leading-none text-white mb-6">
            READY TO <br />
            BUILD?
          </h2>
          
          <p className="text-white/80 text-base md:text-lg max-w-[400px] font-medium">
            Skip the forms. Send us a WhatsApp message directly and we'll reply within minutes.
          </p>
        </div>

        {/* Right - Brutalist Form / Links */}
        <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-center gap-12 bg-accent">
          
          {/* WhatsApp CTA */}
          <div className="flex flex-col gap-4">
            <span className="font-pixel font-bold text-white uppercase tracking-widest">
              Primary Contact
            </span>
            <a
              href={DMC.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-accent-lime border-2 border-accent text-accent px-6 py-4 flex items-center justify-between brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full max-w-[400px]"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="size-5" />
                <span className="font-bold text-sm uppercase tracking-widest">Chat on WhatsApp</span>
              </div>
              <span className="font-display text-lg group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Email CTA */}
          <div className="flex flex-col gap-4">
            <span className="font-pixel font-bold text-white uppercase tracking-widest">
              Or E-mail Us
            </span>
            <a
              href={`mailto:${DMC.email}`}
              className="bg-transparent border-2 border-accent-lime text-white px-6 py-4 flex items-center justify-between w-full max-w-[400px] hover:bg-accent-lime hover:text-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="size-5" />
                <span className="font-bold text-sm uppercase tracking-widest">Send Email</span>
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
