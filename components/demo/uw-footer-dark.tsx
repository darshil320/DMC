"use client";

import { useState } from "react";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/uw-content";

export function UWFooterDark() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1C1A17] text-[#F4F1ED]">
      {/* Top quote area */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 flex flex-col md:flex-row gap-12 md:gap-20 items-start border-b border-[#F4F1ED]/10">
        <div className="max-w-xl">
          <p className="text-[28px] md:text-[36px] font-serif leading-relaxed text-[#F4F1ED]/90 italic">
            "Your workspace reflects your ambition, your culture, and the way
            your team chooses to create."
          </p>
        </div>
        {/* Pendant lamp SVG */}
        <div className="opacity-20 ml-auto hidden md:block">
          <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
            <line x1="30" y1="0" x2="30" y2="20" stroke="#F4F1ED" strokeWidth="1.5"/>
            <path d="M12 20 Q30 18 48 20 L42 58 Q30 64 18 58 Z" stroke="#F4F1ED" strokeWidth="1.5" fill="none"/>
            <line x1="18" y1="58" x2="16" y2="70" stroke="#F4F1ED" strokeWidth="1.5"/>
            <line x1="42" y1="58" x2="44" y2="70" stroke="#F4F1ED" strokeWidth="1.5"/>
            <line x1="16" y1="70" x2="44" y2="70" stroke="#F4F1ED" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      {/* Link columns */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 grid grid-cols-2 md:grid-cols-4 gap-12">
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4F1ED]/40 mb-8 font-medium">
              {heading}
            </p>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[14px] text-[#F4F1ED]/70 hover:text-[#F4F1ED] transition-colors font-serif"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#F4F1ED]/40 mb-8 font-medium">
            Newsletter
          </p>
          <p className="text-[14px] text-[#F4F1ED]/70 mb-6 leading-relaxed font-serif">
            Get new collections and design stories in your inbox.
          </p>
          {subscribed ? (
            <p className="text-[14px] text-[#F4F1ED] font-serif italic">Thank you for subscribing.</p>
          ) : (
            <div>
              <div className="flex border-b border-[#F4F1ED]/30 pb-2 group focus-within:border-[#F4F1ED] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-[14px] text-[#F4F1ED] placeholder:text-[#F4F1ED]/30 outline-none font-serif"
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <button
                  onClick={handleSubscribe}
                  className="pl-4 text-[11px] font-medium tracking-[0.2em] uppercase text-[#F4F1ED]/50 hover:text-[#F4F1ED] transition-colors"
                >
                  Submit
                </button>
              </div>
              {error && <p className="text-[12px] text-red-400 mt-3 font-serif">{error}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#F4F1ED]/10">
        <div className="flex items-center gap-6">
          <Link
            href="/demo/furniture-concept-2.0"
            className="text-[14px] font-medium tracking-[0.15em] uppercase text-[#F4F1ED]"
          >
            Furniture Concept 2.0
          </Link>
          <span className="text-[11px] text-[#F4F1ED]/40 tracking-wider">© 2026 FURNITURE CONCEPT 2.0</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[11px] text-[#F4F1ED]/40 tracking-wider">
          <Link href="/" className="hover:text-[#F4F1ED] transition-colors">
            ← Back to DMC
          </Link>
          <span className="hidden sm:inline">·</span>
          <span>A DEMO BY DMC — DIGITAL MARKET CREATORS</span>
        </div>
      </div>
    </footer>
  );
}
