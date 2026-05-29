"use client";

import React, { useState } from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/button";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Success simulation
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto select-none">
      <AnimatedReveal>
        <div className="bg-bg-dark text-text-inverse rounded-2xl md:rounded-3xl border border-neutral-800 p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center shadow-2xl relative overflow-hidden">
          {/* Decorative glow effect */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Description & Form */}
          <div className="flex flex-col items-start gap-6 relative z-10">
            <SectionLabel className="text-neutral-500">Free Strategy</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-tight">
              Know what to fix before you rebuild your website.
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-[500px]">
              Download the free clarity guide and find the gaps in your positioning,
              offer, website flow, and conversion journey before investing in another
              redesign.
            </p>

            {/* Email Form */}
            {!success ? (
              <form onSubmit={handleSubmit} className="w-full max-w-[480px] mt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email"
                      className="w-full px-5 py-3.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-accent font-semibold"
                      aria-label="Email address"
                    />
                    {error && (
                      <span className="absolute left-0 -bottom-5 text-[11px] text-accent font-bold uppercase tracking-wider">
                        {error}
                      </span>
                    )}
                  </div>
                  <Button type="submit" variant="accent" className="shrink-0 h-[48px] sm:h-auto">
                    Get the Free Guide
                  </Button>
                </div>
                <div className="text-[10px] text-neutral-500 mt-6 tracking-wide font-medium">
                  No spam. Just useful strategy notes once a week.
                </div>
              </form>
            ) : (
              <div className="w-full max-w-[480px] bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl mt-4 flex items-center gap-4 animate-fade-in">
                <span className="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center font-black shrink-0 text-sm">
                  ✓
                </span>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    Check Your Inbox
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 font-medium">
                    We&apos;ve sent the Clarity Guide to your email address.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: HTML PDF Mockup Card */}
          <div className="flex items-center justify-center lg:justify-end relative z-10">
            <div className="w-full max-w-[340px] aspect-[1/1.4] bg-bg-page border border-border-subtle rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-500 cursor-default select-none text-text-primary">
              {/* Header inside cover */}
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-muted mb-6">
                  <span>Strategy Playbook</span>
                  <span>v1.2</span>
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter">
                  The Website
                  <br />
                  <span className="text-accent">Clarity Guide</span>
                </h3>
                <p className="text-[10px] text-text-secondary mt-3 font-semibold uppercase tracking-wider">
                  Build to scale & convert
                </p>

                {/* Checklist Preview */}
                <div className="mt-8 space-y-3.5">
                  {[
                    "Is your offer clear in 5 seconds?",
                    "Does your homepage create trust?",
                    "Are your CTAs placed with intention?",
                    "Does your site qualify leads before the call?",
                  ].map((check) => (
                    <div
                      key={check}
                      className="flex items-start gap-2.5 text-[11px] font-bold leading-normal text-text-secondary"
                    >
                      <span className="text-accent text-xs font-black shrink-0 select-none">
                        ✓
                      </span>
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer cover logo */}
              <div className="border-t border-border-subtle pt-6 flex justify-between items-center text-[9px] uppercase font-bold tracking-widest text-text-muted">
                <span>Your Agency Edition</span>
                <span>24 pages</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
export default LeadMagnet;
