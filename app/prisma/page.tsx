"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { WordsPullUp } from "@/components/topaz/WordsPullUp";
import { WordsPullUpMultiStyle } from "@/components/topaz/WordsPullUpMultiStyle";
import { ScrollRevealText } from "@/components/topaz/ScrollRevealText";

export default function PrismaLandingPage() {
  const [activeNav, setActiveNav] = useState("Our story");

  // Navigation Items (exact prompt specification)
  const navItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

  // Feature Cards Animation Container Reference
  const featuresRef = useRef<HTMLDivElement>(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const easeCustom = [0.16, 1, 0.3, 1] as const;
  const easeCard = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="topaz-landing bg-black text-[#E1E0CC] min-h-screen w-full selection:bg-[#DEDBC8] selection:text-black overflow-x-hidden">
      {/* 
        ========================================================================
        SECTION 1: HERO SECTION
        ========================================================================
      */}
      <section className="relative h-screen w-full p-4 md:p-6 box-border">
        {/* Rounded Inset Container */}
        <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black flex flex-col justify-between">
          
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

          {/* Navbar: Hanging Black Pill */}
          <header className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-2xl border-x border-b border-white/10">
              {navItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <button
                    key={item}
                    onClick={() => setActiveNav(item)}
                    style={{
                      color: isActive ? "#E1E0CC" : "rgba(225, 224, 204, 0.8)",
                    }}
                    className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors hover:text-[#E1E0CC] whitespace-nowrap cursor-pointer"
                  >
                    {item}
                  </button>
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
                  text="Prisma"
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
                  className="text-[#DEDBC8]/70 text-xs sm:text-sm md:text-base leading-[1.2] font-normal"
                >
                  Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
                </motion.p>

                {/* CTA Button "Join the lab" */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: easeCustom }}
                >
                  <a
                    href="#features"
                    className="group inline-flex items-center gap-2 hover:gap-3 bg-[#DEDBC8] text-black rounded-full px-5 py-2.5 sm:px-6 sm:py-3 font-medium text-sm sm:text-base transition-all duration-300 w-fit cursor-pointer shadow-lg"
                  >
                    <span>Join the lab</span>
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
        SECTION 2: ABOUT SECTION
        ========================================================================
      */}
      <section className="bg-black py-24 md:py-36 px-4 md:px-8 w-full">
        <div className="bg-[#101010] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center max-w-6xl mx-auto relative overflow-hidden border border-white/5 shadow-2xl">
          
          {/* Top Label */}
          <div className="mb-8 sm:mb-12">
            <span className="text-[#DEDBC8] text-[10px] sm:text-xs tracking-widest uppercase font-medium bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
              Visual arts
            </span>
          </div>

          {/* Main Heading with Multi-Style WordsPullUp */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC] mb-10 sm:mb-14">
            <WordsPullUpMultiStyle
              segments={[
                { text: "I am Marcus Chen,", className: "font-normal" },
                { text: "a self-taught director.", className: "italic font-serif text-[#DEDBC8]" },
                { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal" },
              ]}
              staggerDelay={0.08}
            />
          </div>

          {/* Body Paragraph with Scroll-Linked Character Opacity Reveal */}
          <div className="max-w-2xl mx-auto">
            <ScrollRevealText
              text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
              className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: FEATURES SECTION
        ========================================================================
      */}
      <section id="features" className="min-h-screen bg-black relative py-24 md:py-36 px-4 md:px-8 w-full overflow-hidden">
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
                  text: "Built for pure vision. Powered by art.",
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

            {/* Card 2: Project Storyboard (01) */}
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
                    alt="Project Storyboard Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium mb-4">
                  Project Storyboard. <span className="text-gray-500">(01)</span>
                </h3>
                {/* Checklist */}
                <ul className="space-y-2.5">
                  {[
                    "Intuitive scene layout grids",
                    "Dynamic frame compositions",
                    "Direct sequence exports",
                    "Collaborative feedback loops",
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
                href="#learn-more-01"
                className="text-[#DEDBC8] text-xs font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 pt-4 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#DEDBC8]" />
              </a>
            </motion.div>

            {/* Card 3: Smart Critiques (02) */}
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
                    alt="Smart Critiques Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium mb-4">
                  Smart Critiques. <span className="text-gray-500">(02)</span>
                </h3>
                {/* Checklist */}
                <ul className="space-y-2.5">
                  {[
                    "AI visual composition analysis",
                    "Time-stamped creative notes",
                    "Seamless industry tool integrations",
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
                href="#learn-more-02"
                className="text-[#DEDBC8] text-xs font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 pt-4 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#DEDBC8]" />
              </a>
            </motion.div>

            {/* Card 4: Immersion Capsule (03) */}
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
                    alt="Immersion Capsule Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium mb-4">
                  Immersion Capsule. <span className="text-gray-500">(03)</span>
                </h3>
                {/* Checklist */}
                <ul className="space-y-2.5">
                  {[
                    "Distraction-free focus modes",
                    "Curated ambient soundscapes",
                    "Automated production schedule syncing",
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
                href="#learn-more-03"
                className="text-[#DEDBC8] text-xs font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 pt-4 cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#DEDBC8]" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
