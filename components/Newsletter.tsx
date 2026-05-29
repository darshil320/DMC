"use client";

import React, { useState } from "react";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/button";

export function Newsletter() {
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

    setSuccess(true);
    setEmail("");
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-t border-border-subtle select-none"
    >
      <AnimatedReveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Title & Reasons */}
          <div className="flex flex-col items-start gap-6">
            <SectionLabel>Weekly Letter</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary uppercase tracking-tight leading-none mt-2">
              The Build Notes
            </h2>
            <p className="text-text-secondary text-base leading-relaxed max-w-[500px]">
              A weekly note on websites, positioning, conversion, systems, client
              work, and the messy middle of building a better agency.
            </p>

            {/* List of reasons */}
            <div className="space-y-4 mt-6">
              {[
                "You have traffic, but something is not connecting.",
                "You want your website to explain your value better.",
                "You are building a service business and want sharper systems.",
                "You like honest notes from behind the scenes.",
              ].map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <span className="text-accent text-sm font-black select-none mt-0.5">
                    →
                  </span>
                  <p className="text-text-primary text-sm font-bold tracking-tight">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Copy & Signup Form */}
          <div className="flex flex-col items-start lg:pl-8 h-full justify-center">
            {!success ? (
              <form onSubmit={handleSubmit} className="w-full mt-4">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email"
                      className="w-full px-5 py-4 bg-bg-card border border-border-subtle rounded-xl text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-text-primary font-semibold"
                      aria-label="Email address"
                    />
                    {error && (
                      <span className="absolute left-0 -bottom-5 text-[11px] text-accent font-bold uppercase tracking-wider">
                        {error}
                      </span>
                    )}
                  </div>
                  <Button type="submit" variant="primary" className="w-full h-[52px]">
                    Join the Notes
                  </Button>
                </div>
                <p className="text-xs text-text-muted mt-6 leading-relaxed font-semibold">
                  Subscribe to receive letters directly in your inbox. No ads.
                  Unsubscribe in one click.
                </p>
              </form>
            ) : (
              <div className="w-full bg-bg-card border border-border-subtle p-8 rounded-2xl flex flex-col items-center text-center gap-4 animate-fade-in shadow-sm">
                <span className="w-10 h-10 rounded-full bg-accent-soft text-accent flex items-center justify-center font-black text-base shrink-0">
                  ✓
                </span>
                <div>
                  <h4 className="text-base font-extrabold text-text-primary">
                    You&apos;re Subscribed!
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 font-medium max-w-[320px]">
                    Welcome to The Build Notes. Watch out for our first strategy note
                    in your inbox this Sunday.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
export default Newsletter;
