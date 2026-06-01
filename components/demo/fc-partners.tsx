"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { 
    name: "Merryfair", 
    role: "Corporate Seating",
    logo: (
      <svg viewBox="0 0 200 50" className="h-8 md:h-10 w-auto">
        <rect x="0" y="10" width="30" height="30" rx="3" className="fill-[#E31837] grayscale group-hover:grayscale-0 transition-all duration-500" />
        <path d="M7 31V21h2.5v1.5c1-1 2-1.5 3.5-1.5 1.5 0 2.5.5 3 1.5 1-1 2-1.5 3.5-1.5 2 0 3.5 1.5 3.5 4v6h-2.5v-5.5c0-1.2-.4-1.8-1.2-1.8-.8 0-1.5.5-1.5 1.8V31h-2.5v-5.5c0-1.2-.4-1.8-1.2-1.8-.8 0-1.5.5-1.5 1.8V31H7z" fill="white" />
        <text x="40" y="33" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" className="fill-fc-text-primary" letterSpacing="0.5">MERRYFAIR</text>
      </svg>
    )
  },
  { 
    name: "Spacewood", 
    role: "Modular Furniture",
    logo: (
      <svg viewBox="0 0 200 50" className="h-8 md:h-10 w-auto">
        <text x="0" y="35" fontFamily="Georgia, serif" fontWeight="700" fontSize="30" className="fill-fc-text-primary" letterSpacing="0">SPACEWOOD</text>
      </svg>
    )
  },
  { 
    name: "Humanscale", 
    role: "Ergonomic Solutions",
    logo: (
      <svg viewBox="0 0 200 50" className="h-7 md:h-9 w-auto mt-1">
        <text x="0" y="33" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fontSize="32" className="fill-fc-text-primary" letterSpacing="-1.5">Humanscale</text>
      </svg>
    )
  },
];

export function FCPartners() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-12 md:pb-20 md:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8 md:mb-16"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A89F94] mb-4 block">
          Official Channel Partners
        </span>
      </motion.div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {PARTNERS.map((partner, idx) => (
          <motion.li
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group flex flex-col py-8 transition-colors cursor-default"
          >
            <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              {partner.logo}
            </div>
            <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-[#A89F94] group-hover:text-[#1F1A16] transition-colors duration-500">
              {partner.role}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
