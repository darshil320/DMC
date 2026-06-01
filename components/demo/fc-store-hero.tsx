"use client";

import Image from "next/image";

export function FCStoreHero() {
  return (
    <section className="relative w-full bg-[#FAF7F0] pt-[80px] md:pt-[120px] pb-12 md:pb-24 border-b border-[#E6DED2]">
      <div className="w-full px-6 md:px-12 mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        {/* Left Text Column */}
        <div className="w-full md:w-[35%] lg:w-[40%] flex flex-col justify-center h-full">
          {/* Breadcrumbs */}
        <div className="text-[9px] md:text-[10px] font-semibold tracking-widest text-[#5F554B] mb-12 uppercase flex gap-3">
          <a href="/demo/furniture-concept-2.0" className="hover:text-[#1F1A16] transition-colors">Home</a>
          <span className="opacity-50">›</span>
          <a href="#" className="hover:text-[#1F1A16] transition-colors">Outdoor</a>
          <span className="opacity-50">›</span>
          <span className="text-[#1F1A16]">Outdoor Lounge Furniture</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-[#1F1A16] mb-6 leading-[1.1]">
          Outdoor Lounge Furniture
        </h1>
        
        <p className="text-sm md:text-base text-[#5F554B] leading-relaxed max-w-sm">
          Designed for open-air comfort—our outdoor lounge furniture offers durability, weather-resistant materials, and inviting forms that make relaxing outside feel natural and refined.
        </p>
      </div>

      {/* Right Image Column */}
        <div className="w-full md:w-[65%] lg:w-[60%] relative h-[40vh] md:h-[60vh] rounded-sm overflow-hidden">
          <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=60" // Modern outdoor patio/lounge
          alt="Outdoor Lounge Furniture"
          fill
          priority
          className="object-cover"
        />
      </div>
      </div>
    </section>
  );
}
