"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/fc-content";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/store/useCart";

const FILTERS = [
  {
    name: "Category",
    options: ["Chairs", "Tables", "Sofas", "Desks"],
  },
  {
    name: "Color",
    options: ["Black", "White", "Natural", "Grey"],
  },
  {
    name: "Availability",
    options: ["In Stock", "Pre-order"],
  },
  {
    name: "Price",
    options: ["Under S$1,000", "S$1,000 - S$3,000", "Over S$3,000"],
  },
];

export function FCStoreProductGrid() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState<string>("Category");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { addItem, setIsOpen: setCartOpen } = useCart();

  const toggleFilter = (name: string) => {
    setExpandedFilter(expandedFilter === name ? "" : name);
  };

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  // Simple filter logic for demo purposes
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedOptions.length === 0) return true;
    
    // Check if any selected option keyword is in the product name or description
    return selectedOptions.some((opt) => {
      const keyword = opt.toLowerCase().replace(/s$/, ""); // remove plural 's' for simple match
      return product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword);
    });
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    const priceNumber = parseInt(product.price.replace(/[^0-9]/g, "")) / 100 || 0;
    addItem({
      id: `${product.id}-${product.colors[0].name.toLowerCase()}`,
      productId: product.id,
      name: product.name,
      price: priceNumber,
      image: product.colors[0].image,
      color: product.colors[0].name,
    });
    setCartOpen(true);
  };

  return (
    <div className="relative w-full bg-[#FAF7F0] min-h-screen">
      {/* Toolbar */}
      <div className="sticky top-[80px] md:top-[100px] z-40 bg-[#FAF7F0] border-b border-[#E6DED2] px-6 md:px-12 py-4 flex justify-between items-center text-[12px] md:text-[14px]">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 font-medium hover:opacity-70 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h10M4 18h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Filters
            {selectedOptions.length > 0 && (
              <span className="ml-1 bg-black text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                {selectedOptions.length}
              </span>
            )}
          </button>
          <span className="text-[#5F554B]">{filteredProducts.length} Results</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-4 text-[#5F554B]">
            <button className="hover:text-[#1F1A16] flex items-center gap-1">
              <span className="w-3 h-4 border border-current opacity-50" />
              Large
            </button>
            <button className="text-[#1F1A16] flex items-center gap-1">
              <span className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                <span className="bg-current rounded-[1px]" />
                <span className="bg-current rounded-[1px]" />
                <span className="bg-current rounded-[1px]" />
                <span className="bg-current rounded-[1px]" />
              </span>
              Small
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#5F554B]">Sort</span>
            <select className="bg-transparent font-medium focus:outline-none appearance-none cursor-pointer pr-4">
              <option>Bestselling</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer flex flex-col">
            <div className="relative aspect-[4/5] bg-[#F1ECE2] mb-4 overflow-hidden rounded-sm">
              <Image
                src={product.colors[0].image}
                alt={product.name}
                fill
                className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
              {/* Add to Cart Overlay Button */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors"
                >
                  Add to Cart
                </button>
              </div>
              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 text-[#1F1A16] hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-start gap-4 w-full">
              <div className="w-full">
                <h3 className="text-[15px] font-bold text-[#1F1A16] mb-1">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] text-[#5F554B]">{product.price}</p>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="md:hidden text-[10px] uppercase tracking-[0.15em] font-medium border-b border-fc-text-primary pb-0.5 hover:text-black transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-[12px] text-[#A89F94]">{product.variantsText}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-[#5F554B]">
            No products match your selected filters. Try removing some options.
          </div>
        )}
      </div>

      {/* Filter Sidebar Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/20 z-[150] cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-[100svh] w-full md:w-[400px] bg-white shadow-2xl z-[200] flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <h2 className="text-xl font-bold font-sans">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="hover:opacity-60 text-xl">✕</button>
              </div>

              {/* Sidebar Body */}
              <div className="flex-1 overflow-y-auto bg-white p-8">
                {FILTERS.map((filter) => (
                  <div key={filter.name} className="border-b border-gray-100 last:border-0 py-6">
                    <button 
                      onClick={() => toggleFilter(filter.name)}
                      className="w-full flex justify-between items-center text-[15px] font-bold"
                    >
                      {filter.name}
                      <span className="text-gray-400 font-normal text-xl">
                        {expandedFilter === filter.name ? "−" : "+"}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {expandedFilter === filter.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 flex flex-col gap-4">
                            {filter.options.map((option) => {
                              const isSelected = selectedOptions.includes(option);
                              return (
                                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                  <div 
                                    className={`w-4 h-4 border rounded-[2px] flex items-center justify-center transition-colors ${
                                      isSelected ? "bg-black border-black text-white" : "border-gray-300 group-hover:border-black"
                                    }`}
                                  >
                                    {isSelected && (
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </div>
                                  <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={isSelected}
                                    onChange={() => toggleOption(option)} 
                                  />
                                  <span className={`text-[14px] ${isSelected ? "text-black font-medium" : "text-gray-700 group-hover:text-black"}`}>
                                    {option}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-8 border-t border-gray-100 bg-white">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-black/80 transition-colors"
                >
                  View Product ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
