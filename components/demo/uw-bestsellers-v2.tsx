"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/lib/store/useCart";

gsap.registerPlugin(ScrollTrigger);

const BESTSELLERS = [
  {
    id: "ergo-pro",
    name: "ErgoPro Task Chair",
    category: "Seating",
    price: "₹12,500",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=480&auto=format&fit=crop&q=60",
    hoverImage: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=480&auto=format&fit=crop&q=60",
  },
  {
    id: "aura-desk",
    name: "Aura Executive Desk",
    category: "Desks",
    price: "₹38,000",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=480&auto=format&fit=crop&q=60",
    hoverImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=480&auto=format&fit=crop&q=60",
  },
  {
    id: "nexus-hub",
    name: "Nexus Collaborative Hub",
    category: "Workstations",
    price: "₹85,000",
    image: "https://images.pexels.com/photos/28546153/pexels-photo-28546153.jpeg",
    hoverImage: "https://images.pexels.com/photos/7688081/pexels-photo-7688081.jpeg",
  },
  {
    id: "modula-storage",
    name: "Modula Storage Unit",
    category: "Storage",
    price: "₹24,000",
    image: "https://images.pexels.com/photos/7534169/pexels-photo-7534169.jpeg",
    hoverImage: "https://images.pexels.com/photos/4138152/pexels-photo-4138152.jpeg",
  },
];

export function UWBestsellersV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 bg-[#F4F1ED]">
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#2C2A26]/60 font-medium block mb-4">
            Bestsellers
          </span>
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#2C2A26] leading-tight">
            Curated for <br className="hidden md:block" /> the Modern Office
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-3 text-[13px] font-medium text-[#2C2A26] border-b border-[#2C2A26]/20 pb-1 hover:border-[#2C2A26] transition-colors group uppercase tracking-widest"
        >
          View All Products
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {BESTSELLERS.map((product, idx) => (
          <div
            key={product.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="group cursor-pointer flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-[#EAEAE5] rounded-sm overflow-hidden mb-6">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage}
                alt={`${product.name} Alternate`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 scale-105 group-hover:scale-100"
              />
              
              {/* Quick Add Button Overlay (Desktop Only) */}
              <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
                    addItem({
                      id: product.id,
                      productId: product.id,
                      name: product.name,
                      price: priceNum,
                      image: product.image,
                    });
                  }}
                  className="w-full bg-[#2C2A26] text-[#F4F1ED] py-4 text-[11px] uppercase tracking-widest font-medium hover:bg-black transition-colors"
                >
                  Quick Add
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2C2A26]/50 font-medium block mb-2">
                  {product.category}
                </span>
                <h3 className="text-[18px] font-serif text-[#2C2A26] mb-2">{product.name}</h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[14px] text-[#2C2A26]/70">{product.price}</p>
                {/* Mobile Add to Cart */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
                    addItem({
                      id: product.id,
                      productId: product.id,
                      name: product.name,
                      price: priceNum,
                      image: product.image,
                    });
                  }}
                  className="md:hidden text-[10px] uppercase tracking-[0.15em] font-medium border-b border-[#2C2A26] pb-0.5 hover:text-black transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
