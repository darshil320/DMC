"use client";

import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FURNITURE_CONCEPTS } from "@/lib/dmc-config";

const PRODUCTS = [
  { name: "Marlow 3-Seater Linen Sofa", category: "Sofas", material: "Solid Wood + Linen", price: "₹42,000+", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop&q=60" },
  { name: "Oslo King Storage Bed", category: "Beds", material: "Sheesham Wood", price: "₹38,000+", image: "https://images.pexels.com/photos/18470980/pexels-photo-18470980.jpeg" },
  { name: "Aspen 4-Door Wardrobe", category: "Wardrobes", material: "MDF + Veneer Finish", price: "₹54,000+", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&auto=format&fit=crop&q=60" },
  { name: "Hudson 6-Seater Dining Set", category: "Dining", material: "Teak Wood + Fabric", price: "₹62,000+", image: "https://images.pexels.com/photos/31258060/pexels-photo-31258060.jpeg" },
];

export function DemoPreviewSection() {
  return (
    <section id="demo" className="py-32 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page relative z-10 border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="text-[10px] font-sans text-accent uppercase tracking-[0.2em]">Live Demo</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-text-primary leading-[1.1] max-w-[800px]">
              See a catalog <br />
              <span className="italic text-text-secondary">in action.</span>
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-sans font-light leading-relaxed max-w-[320px]">
            Furniture Concepts 2.0 — a demo of exactly what we build. Designed for mobile, optimized for direct WhatsApp conversions.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="group rounded-2xl border border-border-subtle bg-bg-card/50 p-4 flex flex-col hover:border-border-harsh transition-colors duration-500">
              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-bg-page mb-6 relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                />
              </div>
              
              {/* Meta */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-[9px] font-sans text-text-muted uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                <span className="text-text-primary font-sans font-medium text-sm">
                  {product.price}
                </span>
              </div>
              
              {/* Details */}
              <h3 className="text-text-primary font-display text-lg mb-1">{product.name}</h3>
              <p className="text-text-muted text-[10px] font-sans uppercase tracking-[0.1em] mb-8">{product.material}</p>
              
              {/* Elegant WhatsApp Button */}
              <a
                href={`${FURNITURE_CONCEPTS.whatsappLink}?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-3 w-full py-3.5 bg-transparent text-text-primary text-xs font-sans tracking-[0.2em] uppercase rounded-full border border-border-subtle hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300"
              >
                <MessageCircle className="size-4" />
                Enquire
              </a>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <a
            href="/demo/furniture-concept-2.0"
            className="group flex items-center gap-3 bg-transparent border border-border-harsh text-text-primary px-8 py-4 text-xs font-sans tracking-[0.2em] uppercase rounded-full hover:bg-bg-card transition-colors duration-300"
          >
            Visit the Full Demo
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
