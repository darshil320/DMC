"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Check,
  Camera,
  MessageSquare,
  Hammer,
  ShieldCheck,
  TrendingUp,
  Clock,
  Layers,
  Smartphone,
  Cpu,
  Receipt,
  Truck,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WordsPullUp } from "@/components/topaz/WordsPullUp";
import { WordsPullUpMultiStyle } from "@/components/topaz/WordsPullUpMultiStyle";
import { ScrollRevealText } from "@/components/topaz/ScrollRevealText";

export default function TopazCrmLandingPage() {
  const [activeNav, setActiveNav] = useState("Our story");
  const [activeTab, setActiveTab] = useState<"biometrics" | "whatsapp" | "billing" | "workshops" | "dashboard">("biometrics");

  // In-page Section Nav Items
  const navItems = [
    { label: "Our story", href: "#story" },
    { label: "Architecture", href: "#architecture" },
    { label: "Modules", href: "#modules" },
    { label: "Workshops", href: "#workshops" },
    { label: "Features", href: "#features" },
  ];

  // Feature Cards Animation Reference
  const featuresRef = useRef<HTMLDivElement>(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const easeCustom = [0.16, 1, 0.3, 1] as const;
  const easeCard = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="topaz-landing bg-black text-[#E1E0CC] min-h-screen w-full selection:bg-[#DEDBC8] selection:text-black overflow-x-hidden">
      {/* Site-wide Main Navbar */}
      <Navbar />

      {/* 
        ========================================================================
        SECTION 1: HERO SECTION
        ========================================================================
      */}
      <section id="story" className="relative h-screen w-full p-4 md:p-6 box-border pt-20 md:pt-24">
        {/* Rounded Inset Container */}
        <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black flex flex-col justify-between border border-white/10 shadow-2xl">
          
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />

          {/* Noise Overlay */}
          <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

          {/* Hanging Black Pill Navbar (In-Page Jump Anchors) */}
          <header className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <nav className="bg-black/90 backdrop-blur-md rounded-full px-5 py-2.5 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-10 shadow-2xl border border-white/15">
              {navItems.map((item) => {
                const isActive = activeNav === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveNav(item.label)}
                    style={{
                      color: isActive ? "#E1E0CC" : "rgba(225, 224, 204, 0.7)",
                    }}
                    className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors hover:text-[#E1E0CC] whitespace-nowrap cursor-pointer"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </header>

          {/* Hero Content (Bottom-Aligned Grid) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              
              {/* Left 8 Columns: Giant Heading */}
              <div className="lg:col-span-8 flex flex-col justify-end">
                <WordsPullUp
                  text="Topaz"
                  showAsterisk={true}
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]"
                  staggerDelay={0.08}
                />
              </div>

              {/* Right 4 Columns: Description + CTA Button */}
              <div className="lg:col-span-4 flex flex-col justify-end gap-6 pb-2 md:pb-4">
                {/* Description Paragraph */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: easeCustom }}
                  className="text-[#DEDBC8]/80 text-xs sm:text-sm md:text-base leading-[1.3] font-normal"
                >
                  Topaz is a custom sales conversion engine built for Surat’s premier luxury furniture showroom. Uniting DPDPA-compliant face recognition, automated WhatsApp AI concierge, instant mobile quotes, and multi-workshop tracking into one unified platform.
                </motion.p>

                {/* CTA Button "Explore Platform" */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: easeCustom }}
                >
                  <a
                    href="#architecture"
                    className="group inline-flex items-center gap-2 hover:gap-3 bg-[#DEDBC8] text-black rounded-full px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-sm sm:text-base transition-all duration-300 w-fit cursor-pointer shadow-lg"
                  >
                    <span>Explore Architecture</span>
                    <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1E0CC]" />
                    </span>
                  </a>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 2: ABOUT & OPERATIONAL PHILOSOPHY
        ========================================================================
      */}
      <section className="bg-black py-24 md:py-36 px-4 md:px-8 w-full">
        <div className="bg-[#101010] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center max-w-6xl mx-auto relative overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Top Label */}
          <div className="mb-8 sm:mb-12">
            <span className="text-[#DEDBC8] text-[10px] sm:text-xs tracking-widest uppercase font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Showroom Intelligence & Sales Engine
            </span>
          </div>

          {/* Main Heading with Multi-Style WordsPullUp */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC] mb-10 sm:mb-14">
            <WordsPullUpMultiStyle
              segments={[
                { text: "Built for Topaz Furniture,", className: "font-normal" },
                { text: "a bespoke sales engine.", className: "italic font-serif text-[#DEDBC8]" },
                { text: "We integrate facial recognition, live DB catalog chat, and workshop lifecycle.", className: "font-normal" },
              ]}
              staggerDelay={0.08}
            />
          </div>

          {/* Body Paragraph with Scroll-Linked Character Opacity Reveal */}
          <div className="max-w-3xl mx-auto mb-16">
            <ScrollRevealText
              text="Over the last seven years, we have crafted intelligence systems with DMC Digital, bringing luxury showroom operations into a connected digital future. Topaz ensures that nothing about a customer, a custom order, or a piece of handcrafted furniture relies on human memory alone."
              className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed"
            />
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-12 text-left">
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E1E0CC] font-serif mb-1.5 tracking-tight">85–95%</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Face Match Accuracy</div>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400/80 mt-2 leading-relaxed break-words">
                New, repeat &amp; uncertain bands
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E1E0CC] font-serif mb-1.5 tracking-tight">&lt; 3 Seconds</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Entrance Alert Speed</div>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400/80 mt-2 leading-relaxed break-words">
                Direct WhatsApp ping to assigned rep
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E1E0CC] font-serif mb-1.5 tracking-tight">100%</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-tight">DPDPA Compliant</div>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400/80 mt-2 leading-relaxed break-words">
                Explicit consent FK security gate
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E1E0CC] font-serif mb-1.5 tracking-tight">0 Rupee</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Price Leakage</div>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400/80 mt-2 leading-relaxed break-words">
                Privacy-filtered workshop job cards
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: SYSTEM ARCHITECTURE & DATA PIPELINE
        ========================================================================
      */}
      <section id="architecture" className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#DEDBC8] text-xs uppercase tracking-widest font-mono">System Architecture</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#E1E0CC]">
            How Topaz Transforms Showroom Sales
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            From the moment a customer enters the showroom to the final polishing step in Surat workshops, every interaction is synchronized in real time.
          </p>
        </div>

        {/* 5-Step Pipeline Card Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: "01",
              title: "Entrance Biometrics",
              icon: Camera,
              desc: "Door camera captures face embedding vector via ArcFace. Explicit DPDPA consent gate checks database permission.",
            },
            {
              step: "02",
              title: "Rep Notification",
              icon: Users,
              desc: "Primary salesperson receives instant WhatsApp alert with visitor profile, past purchases, and pending inquiries.",
            },
            {
              step: "03",
              title: "AI WhatsApp Concierge",
              icon: MessageSquare,
              desc: "Meta Cloud API grounded AI answers catalog questions, calculates pricing via live DB, and sends digital quotes.",
            },
            {
              step: "04",
              title: "Mobile Quote & GST",
              icon: Receipt,
              desc: "Salesperson builds custom quote on phone. Automatic GST calculation & single-tap customer WhatsApp approval.",
            },
            {
              step: "05",
              title: "Workshop & Logistics",
              icon: Truck,
              desc: "Automated routing through cutting, polish & finish workshops with mandatory milestone photos and driver dispatch.",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#141414] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-gray-500 font-bold">{item.step}</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#DEDBC8] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#E1E0CC] group-hover:text-black transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-[#E1E0CC] font-medium text-base mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-full h-1 bg-white/5 mt-6 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#DEDBC8]/40 group-hover:bg-[#DEDBC8] transition-colors duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: DEEP DIVE MODULES (Interactive Tabbed Showcase)
        ========================================================================
      */}
      <section id="modules" className="py-24 md:py-36 px-4 md:px-8 bg-[#0C0C0C] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#DEDBC8] text-xs uppercase tracking-widest font-mono block mb-2">Core Platform Modules</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#E1E0CC]">
                Engineered for High-End Showroom Operations
              </h2>
            </div>

            {/* Module Switcher Tabs */}
            <div className="flex flex-wrap gap-2 bg-black/60 p-1.5 rounded-full border border-white/10 w-fit">
              {[
                { id: "biometrics", label: "01. Biometrics" },
                { id: "whatsapp", label: "02. WhatsApp AI" },
                { id: "billing", label: "03. GST Billing" },
                { id: "workshops", label: "04. Workshop Lifecycle" },
                { id: "dashboard", label: "05. Owner Control" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#DEDBC8] text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="bg-[#141414] rounded-3xl p-8 sm:p-12 border border-white/10 min-h-[420px] flex flex-col justify-between">
            {activeTab === "biometrics" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-[#DEDBC8] border border-white/10 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> DPDPA Consent-First Engine
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#E1E0CC]">
                    Facial Recognition & Visitor Intelligence
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Recognises returning clients at the entrance camera in under 3 seconds. The system evaluates identity across NEW, REPEAT, and UNCERTAIN confidence bands without ever auto-asserting identity or gatekeeping access.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Consent FK gate ensures biometric embeddings are stored strictly with explicit opt-in.",
                      "Sends private WhatsApp notification to designated salesperson with past preferences.",
                      "Tracks visit frequency, preferred sofa styles, and open quotes automatically.",
                      "Automatic DPDPA consent withdrawal cascade purges embeddings instantly.",
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/60 rounded-2xl p-6 border border-white/10 space-y-4 font-mono text-xs">
                  <div className="text-gray-500 border-b border-white/10 pb-3 flex justify-between">
                    <span>LIVE_ENTRANCE_FEED // CAM_01</span>
                    <span className="text-emerald-400 animate-pulse">● LIVE</span>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <div>[EVENT] Face detected at main entrance</div>
                    <div>[MATCH] Embedding matched: <span className="text-[#DEDBC8]">Hemant Patel</span> (Confidence: 94.2%)</div>
                    <div>[ASSIGNMENT] Primary Rep: <span className="text-[#DEDBC8]">Rajesh V.</span></div>
                    <div>[HISTORY] 2 Previous visits | Interest: <span className="text-[#DEDBC8]">7-Seater Velvet Sofa</span></div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-[#E1E0CC] font-sans text-xs">
                      💬 <span className="font-bold">WhatsApp Alert Sent to Rajesh:</span> "Hemant Patel is at the entrance! Last visited 14 days ago. Preferred fabric: Royal Velvet #42."
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "whatsapp" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-[#DEDBC8] border border-white/10 font-mono">
                    <MessageSquare className="w-3.5 h-3.5" /> Meta Cloud API (Official Token)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#E1E0CC]">
                    AI WhatsApp Concierge & Lead Nurture
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Answers customer inquiries 24/7 on WhatsApp, Instagram, and Facebook. Grounded strictly on live database catalog tables — prices and stock availability are pulled directly from DB tool calls, never hallucinated by embeddings.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Sends pre-approved WhatsApp templates outside 24h customer service window.",
                      "Seamless human agent takeover — salesperson can jump into any live chat.",
                      "Captures Instagram/Facebook/Google ad leads directly into pipeline.",
                      "Automated follow-up messages signed in the salesperson's exact voice.",
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/60 rounded-2xl p-6 border border-white/10 space-y-3 font-sans text-xs">
                  <div className="text-gray-400 border-b border-white/10 pb-2 text-[11px] font-mono">
                    WHATSAPP CONVERSATION // CUSTOMER #4082
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl max-w-[85%] text-gray-300">
                    Hi, do you have the Italian Leather Sectional in Tan brown in stock?
                  </div>
                  <div className="bg-[#DEDBC8]/10 text-[#E1E0CC] p-3 rounded-xl max-w-[85%] ml-auto border border-[#DEDBC8]/20">
                    Hello! Yes, the Italian Leather Sectional (8-seater) is in stock at our Surat showroom. Current price is ₹1,85,000 + GST. Would you like me to send custom dimensions or reserve a viewing?
                  </div>
                  <div className="text-[10px] text-gray-500 text-right font-mono">
                    ✓ Tool call executed: catalog_db.query_stock(item_id='SKU-802')
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-[#DEDBC8] border border-white/10 font-mono">
                    <Receipt className="w-3.5 h-3.5" /> Mobile Quote & GST Engine
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#E1E0CC]">
                    Instant Quotations & Automated Receivables
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Sales reps build detailed price quotes on their phone floor-side — selecting item, dimensions, fabric options, and discounts. GST taxes and payment installments are calculated automatically, eliminating manual math errors.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "One-tap customer approval links sent directly via WhatsApp.",
                      "Automatic conversion from approved quote into active production order.",
                      "Tracks advances, pending installments, and issues automated digital receipts.",
                      "Owner and accounting dashboard surfaces total outstanding balances instantly.",
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/60 rounded-2xl p-6 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="text-gray-400 border-b border-white/10 pb-2 text-[11px]">
                    MOBILE_QUOTE_BUILDER // ORDER #TPZ-904
                  </div>
                  <div className="space-y-1.5 text-gray-300">
                    <div className="flex justify-between">
                      <span>1x Teak Dining Table (8-Seater)</span>
                      <span>₹1,20,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>8x Premium Upholstered Chairs</span>
                      <span>₹96,000</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Showroom Discount (5%)</span>
                      <span>-₹10,800</span>
                    </div>
                    <div className="flex justify-between text-[#DEDBC8] pt-2 border-t border-white/10 font-bold">
                      <span>Subtotal + GST (18%)</span>
                      <span>₹2,42,064</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] uppercase font-bold">
                      Status: Advance Paid (₹1,00,000)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "workshops" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-[#DEDBC8] border border-white/10 font-mono">
                    <Hammer className="w-3.5 h-3.5" /> Multi-Workshop Lifecycle
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#E1E0CC]">
                    Workshop Progress & Driver Logistics
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tracks every piece of furniture through specialized Surat workshops — design approval, wood cutting, frame construction, polishing, and upholstery. Drivers receive simple phone screens detailing exact pickups and drops down to the hour.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Mandatory milestone photo checkpoints at key production steps.",
                      "Privacy-filtered job cards route to workshops with zero price leakage.",
                      "Automated driver dispatch screens show pickup & drop locations.",
                      "Flags delayed items automatically to prevent broken delivery promises.",
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/60 rounded-2xl p-6 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="text-gray-400 border-b border-white/10 pb-2 text-[11px]">
                    WORKSHOP_JOURNEY // ITEM #JOB-402 (POLISHING → FINISHING)
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>1. Wood Cutting (Sharma's)</span>
                      <span>✓ PASSED</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>2. Frame Assembly</span>
                      <span>✓ PASSED</span>
                    </div>
                    <div className="flex items-center justify-between text-[#DEDBC8]">
                      <span>3. Polishing Workshop</span>
                      <span className="animate-pulse">● IN PROGRESS (Photo Uploaded)</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>4. Upholstery & Dispatch</span>
                      <span>QUEUED</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-gray-300 text-[11px]">
                    🚚 <span className="font-bold">Driver Dispatch Manifest:</span> Collect frame #JOB-402 from Sharma Polish Unit (Ring Road) by 4:00 PM → Deliver to City Upholstery Studio.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-[#DEDBC8] border border-white/10 font-mono">
                    <TrendingUp className="w-3.5 h-3.5" /> Owner Floor Control
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#E1E0CC]">
                    Single-Screen Showroom Management
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Designed for showroom owners (Hemant) to view the entire business on one screen. Monitor live walk-ins, sales rep assignments, pipeline revenue, and workshop bottlenecks without calling five different managers.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Real-time walk-in feed showing active guests on the showroom floor.",
                      "Salesperson claim management & collaborator permission controls.",
                      "Omnichannel lead pipeline from Instagram, Facebook & Google ads.",
                      "Complete historical view of every customer visit, order, and payment.",
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/60 rounded-2xl p-6 border border-white/10 space-y-4 font-mono text-xs">
                  <div className="text-gray-400 border-b border-white/10 pb-2 text-[11px] flex justify-between">
                    <span>EXECUTIVE_DASHBOARD // TOPAZ SURAT</span>
                    <span className="text-[#DEDBC8]">LIVE METRICS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-gray-400 text-[10px]">ACTIVE WALK-INS</div>
                      <div className="text-xl font-bold text-[#E1E0CC] mt-1">6 Parties</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-gray-400 text-[10px]">OPEN PIPELINE</div>
                      <div className="text-xl font-bold text-[#E1E0CC] mt-1">₹42.8 Lakhs</div>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 text-left text-[11px] text-gray-300">
                    <div className="font-bold text-[#DEDBC8]">Live Floor Status:</div>
                    <div>• Floor 1: Rajesh V. serving Mr. Kapoor (7-Seater Sofa)</div>
                    <div>• Floor 2: Amit Shah serving Repeat Guest (Teak Bed)</div>
                    <div>• Unclaimed: Walk-in guest at Door #2 → <span className="text-emerald-400">Claim Prompt Sent</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 5: FEATURES SECTION (Prompt Section 3 Requirement)
        ========================================================================
      */}
      <section id="features" className="min-h-screen bg-black relative py-24 md:py-36 px-4 md:px-8 w-full overflow-hidden border-t border-white/10">
        {/* Subtle Background Noise */}
        <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Text */}
          <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto space-y-2">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: "Studio-grade workflows for visionary creators.",
                  className: "text-[#E1E0CC] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal block w-full",
                },
                {
                  text: "Built for pure vision. Powered by intelligence.",
                  className: "text-gray-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal block w-full mt-2",
                },
              ]}
              staggerDelay={0.06}
            />
          </div>

          {/* 4-Column Card Grid */}
          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]"
          >
            {/* Card 1: Video Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * 0, ease: easeCard }}
              className="rounded-2xl overflow-hidden relative p-6 flex flex-col justify-end h-[360px] lg:h-full border border-white/10 group cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[#E1E0CC] font-medium text-lg md:text-xl tracking-tight block">
                  Your creative canvas.
                </span>
              </div>
            </motion.div>

            {/* Card 2: Facial Recognition (01) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * 1, ease: easeCard }}
              className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[360px] lg:h-full border border-white/5 hover:border-white/15 transition-all duration-300 group"
            >
              <div>
                {/* Small Image Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden mb-4 border border-white/10">
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                    alt="Facial Recognition Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium mb-4">
                  Facial Recognition. <span className="text-gray-500">(01)</span>
                </h3>
                {/* Checklist */}
                <ul className="space-y-2.5">
                  {[
                    "Instant door entrance alerts",
                    "Repeat guest history lookup",
                    "DPDPA consent-first security",
                    "Automated salesperson assignment",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Link */}
              <a
                href="#modules"
                onClick={() => setActiveTab("biometrics")}
                className="text-[#DEDBC8] text-xs font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 pt-4 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#DEDBC8]" />
              </a>
            </motion.div>

            {/* Card 3: WhatsApp Concierge (02) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * 2, ease: easeCard }}
              className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[360px] lg:h-full border border-white/5 hover:border-white/15 transition-all duration-300 group"
            >
              <div>
                {/* Small Image Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden mb-4 border border-white/10">
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                    alt="WhatsApp Concierge Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium mb-4">
                  WhatsApp Concierge. <span className="text-gray-500">(02)</span>
                </h3>
                {/* Checklist */}
                <ul className="space-y-2.5">
                  {[
                    "AI catalog & inventory chat",
                    "Automated lead follow-ups",
                    "Meta Cloud API official integration",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Link */}
              <a
                href="#modules"
                onClick={() => setActiveTab("whatsapp")}
                className="text-[#DEDBC8] text-xs font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 pt-4 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#DEDBC8]" />
              </a>
            </motion.div>

            {/* Card 4: Workshop Tracker (03) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * 3, ease: easeCard }}
              className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-[360px] lg:h-full border border-white/5 hover:border-white/15 transition-all duration-300 group"
            >
              <div>
                {/* Small Image Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden mb-4 border border-white/10">
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                    alt="Workshop Tracker Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium mb-4">
                  Workshop Tracker. <span className="text-gray-500">(03)</span>
                </h3>
                {/* Checklist */}
                <ul className="space-y-2.5">
                  {[
                    "Multi-workshop job routing",
                    "Milestone photo verification",
                    "Automated driver dispatch",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#DEDBC8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Link */}
              <a
                href="#modules"
                onClick={() => setActiveTab("workshops")}
                className="text-[#DEDBC8] text-xs font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 pt-4 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#DEDBC8]" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Site-wide Footer */}
      <Footer />
    </div>
  );
}
