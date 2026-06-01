"use client";

import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { URBANWOOD } from "@/lib/dmc-config";

const PRODUCTS = [
  { name: "Marlow 3-Seater Linen Sofa", category: "Sofas", material: "Solid Wood + Linen", price: "₹42,000+", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { name: "Oslo King Storage Bed", category: "Beds", material: "Sheesham Wood", price: "₹38,000+", image: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=400&q=80" },
  { name: "Aspen 4-Door Wardrobe", category: "Wardrobes", material: "MDF + Veneer Finish", price: "₹54,000+", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80" },
  { name: "Hudson 6-Seater Dining Set", category: "Dining", material: "Teak Wood + Fabric", price: "₹62,000+", image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&q=80" },
];

export function DemoPreviewSection() {
  return (
    <section id="demo" className="py-24 px-6 md:px-12 lg:px-16 w-full select-none bg-bg-page relative z-10 border-t border-border-harsh">
      <div className="max-w-[1440px] mx-auto w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 lg:px-6">
          <div>
            <div className="section-tag">
              LIVE DEMO
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-text-primary uppercase max-w-[800px]">
              SEE A CATALOG IN ACTION.
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-medium max-w-[320px]">
            Furniture Concepts 2.0 — a demo of exactly what we build. Designed for mobile, built for WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-border-harsh bg-bg-page mb-16">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="group border-b border-l border-border-harsh bg-bg-card flex flex-col hover:bg-white transition-colors">
              <div className="aspect-[4/3] overflow-hidden bg-bg-page border-b border-border-harsh relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
              
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-bold tracking-widest uppercase bg-border-subtle text-text-primary px-2 py-1">
                  {product.category}
                </span>
                <span className="text-accent font-display font-bold text-sm">
                  {product.price}
                </span>
              </div>
              
              <h3 className="text-text-primary font-bold text-sm mb-1">{product.name}</h3>
              <p className="text-text-muted font-pixel uppercase tracking-wider mb-6 font-semibold">{product.material}</p>
              
              </div>
              
              <a
                href={`${URBANWOOD.whatsappLink}?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-[#0000FF] text-white text-xs font-bold uppercase tracking-widest border-t border-border-harsh hover:bg-accent-lime hover:text-accent transition-colors"
              >
                <MessageCircle className="size-4" />
                ENQUIRE
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="/demo/furniture-concept-2.0"
            className="group flex items-center gap-2 bg-bg-page border-2 border-accent text-accent px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
          >
            Visit the Full Demo
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
