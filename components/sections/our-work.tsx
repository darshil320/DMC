"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ThinArrowUpRight } from "@/components/ui/ThinArrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Bot, ScanFace, BarChart3, MessageCircle, HeartPulse, FileText, Activity, ShieldCheck } from "lucide-react";

/** Accent corner ticks that scale in on card hover. */
function CornerTicks() {
  const base =
    "absolute w-2.5 h-2.5 border-accent-lime opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none z-30";
  return (
    <>
      <span className={`${base} top-3 left-3 border-t-2 border-l-2`} />
      <span className={`${base} top-3 right-3 border-t-2 border-r-2`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  );
}

/** Shared tag row used at the bottom of every compact project tile. */
function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="text-[8px] font-bold tracking-[0.15em] uppercase px-2 py-1 border border-border-harsh bg-bg-card text-text-muted">
          {tag}
        </span>
      ))}
    </div>
  );
}

const PROJECTS = [
  {
    key: "cohuman",
    kind: "photo" as const,
    href: "https://cohuman-website-sandy.vercel.app/",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Cohuman Lifestyle Office Furniture Showroom",
    badge: "VIEW LIVE SITE",
    title: "Cohuman",
    category: "LIFESTYLE · ECOMMERCE · SHOWROOM",
    heading: "Lifestyle Office Furniture Experience",
    description: "Full digital showroom, high-converting catalog browser, interactive quotation specifier engine, and sub-second Next.js 16 build.",
    tags: ["Next.js 16", "Digital Showroom", "Specifier Engine"],
  },
  {
    key: "topaz",
    kind: "photo" as const,
    href: "https://topazfurniture.in",
    image: "/topaz-bg.jpg",
    imageAlt: "Topaz Furniture Showroom",
    badge: "VIEW LIVE DEMO",
    title: "Topaz Furniture",
    category: "WEBSITE · ECOMMERCE · 3D",
    heading: "Premium Digital Storefront",
    description: "Immersive 3D product views, full catalog and cart, and a sub-second mobile-first build.",
    tags: ["Next.js", "3D Views", "Catalog"],
  },
  {
    key: "welcome-palace",
    kind: "photo" as const,
    href: "https://www.welcomepalace.in",
    image: "https://res.cloudinary.com/joyzym6w/image/upload/welcome-palace/images/banquet-haldi.jpg",
    imageAlt: "Welcome Palace banquet hall event",
    badge: "VIEW LIVE SITE",
    title: "Welcome Palace",
    category: "HOTEL · BANQUET · VENUE",
    heading: "Hotel & Wedding Booking Site",
    description: "Dedicated rooms, banquet, and catering journeys — each routing to a pre-filled WhatsApp enquiry.",
    tags: ["Next.js", "WhatsApp", "Local SEO"],
  },
  {
    key: "crm",
    kind: "dark" as const,
    href: "/topaz-crm",
    icons: [ScanFace, Bot, BarChart3, MessageCircle],
    badge: "EXPLORE TOPAZ CRM SYSTEM",
    title: "Showroom Intelligence",
    category: "AI · CRM · WHATSAPP · GST",
    heading: "Complete Business Operating System",
    description: "Face recognition, AI WhatsApp assistant, and a live pipeline — shipping GST quotations, payments, and multi-workshop tracking.",
    tags: ["CRM", "WhatsApp API", "GST Billing"],
  },
];

function PhotoTile({ project }: { project: (typeof PROJECTS)[number] & { kind: "photo" } }) {
  return (
    <div className="border-b border-r border-border-harsh flex flex-col">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden bg-neutral-200 min-h-[180px] sm:min-h-[220px] flex items-center justify-center group cursor-pointer"
      >
        <ParallaxFrame strength={6}>
          <Image
            src={project.image}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-all duration-500 ease-out group-hover:scale-[1.025]"
            alt={project.imageAlt}
          />
        </ParallaxFrame>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

        <CornerTicks />

        <MagneticButton strength={8} className="absolute top-4 left-4 z-20">
          <span className="bg-accent-lime text-accent px-2.5 py-1 font-pixel font-bold uppercase tracking-widest text-[9px] brutalist-shadow border border-accent flex items-center gap-1.5 group-hover:bg-white group-hover:text-black transition-colors">
            {project.badge} <ThinArrowUpRight className="size-3" />
          </span>
        </MagneticButton>

        <span className="relative z-10 font-serif text-white text-xl sm:text-2xl font-medium tracking-tight transition-transform duration-700 ease-out group-hover:-translate-y-1">
          {project.title}
        </span>

        <div className="absolute bottom-3 right-3 z-20 text-white/60 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
          <ThinArrowUpRight className="size-4" />
        </div>
      </a>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <span className="text-[8px] font-black tracking-[0.2em] uppercase text-text-muted mb-2">
          {project.category}
        </span>
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mb-2">
          {project.heading}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-text-secondary leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="mt-auto">
          <TagRow tags={project.tags} />
        </div>
      </div>
    </div>
  );
}

function DarkTile({ project }: { project: (typeof PROJECTS)[number] & { kind: "dark" } }) {
  const TileContent = (
    <div className="relative overflow-hidden bg-bg-dark min-h-[180px] sm:min-h-[220px] flex flex-col items-center justify-center p-5 sm:p-6 group cursor-pointer">
      <CornerTicks />
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <MagneticButton strength={8} className="static sm:absolute sm:top-4 sm:left-4 z-20 mb-4 sm:mb-0">
        <span className="inline-flex items-center gap-1.5 bg-accent-lime text-accent px-2.5 py-1 font-pixel font-bold uppercase tracking-wider text-[8px] border border-accent brutalist-shadow group-hover:bg-white group-hover:text-black transition-colors">
          {project.badge} {"href" in project && project.href && <ThinArrowUpRight className="size-3" />}
        </span>
      </MagneticButton>

      <div className="relative z-10 flex flex-col items-center max-w-full">
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-full">
          {project.icons.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="size-8 border border-white/20 bg-white/5 flex items-center justify-center text-white/70 shrink-0"
            >
              <Icon className="size-4" />
            </motion.div>
          ))}
        </div>

        <span className="text-white text-lg sm:text-xl font-bold tracking-tight text-center leading-tight px-2 break-words group-hover:text-accent-lime transition-colors">
          {project.title}
        </span>
      </div>

      {"href" in project && project.href && (
        <div className="absolute bottom-3 right-3 z-20 text-white/60 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
          <ThinArrowUpRight className="size-4" />
        </div>
      )}
    </div>
  );

  return (
    <div className="border-b border-r border-border-harsh flex flex-col">
      {"href" in project && project.href ? (
        <Link href={project.href} className="block">
          {TileContent}
        </Link>
      ) : (
        TileContent
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <span className="text-[8px] font-black tracking-[0.2em] uppercase text-text-muted mb-2">
          {project.category}
        </span>
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mb-2">
          {project.heading}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-text-secondary leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4">
          <TagRow tags={project.tags} />
          {"href" in project && project.href && (
            <Link
              href={project.href}
              className="text-[10px] font-bold text-accent hover:text-text-primary uppercase tracking-widest inline-flex items-center gap-1 shrink-0"
            >
              <span>View System</span>
              <ThinArrowUpRight className="size-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function OurWorkSection() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none relative z-10 border-t border-border-harsh bg-bg-page overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-4 lg:px-6">
          <div>
            <div className="section-tag">
              OUR WORK
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-text-primary uppercase max-w-[600px]">
              From storefronts to complete business systems.
            </h2>
          </div>
          <Link
            href="/work"
            className="group/work flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-accent hover:text-text-primary transition-colors shrink-0"
          >
            All case studies
            <ThinArrowUpRight className="size-4 transition-transform group-hover/work:translate-x-0.5 group-hover/work:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── Project Grid (2×2) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-border-harsh">
          {PROJECTS.map((project) =>
            project.kind === "photo" ? (
              <PhotoTile key={project.key} project={project} />
            ) : (
              <DarkTile key={project.key} project={project} />
            )
          )}
        </div>

      </div>
    </section>
  );
}
