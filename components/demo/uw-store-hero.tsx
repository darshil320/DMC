"use client";

import Image from "next/image";

export function UWStoreHero() {
  return (
    <section className="relative w-full bg-uw-bg-page pt-[80px] md:pt-[120px] pb-12 md:pb-24 border-b border-uw-border-subtle">
      <div className="w-full px-6 md:px-12 mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        {/* Left Text Column */}
        <div className="w-full md:w-[35%] lg:w-[40%] flex flex-col justify-center h-full">
          {/* Breadcrumbs */}
        <div className="text-[9px] md:text-[10px] font-semibold tracking-widest text-uw-text-secondary mb-12 uppercase flex gap-3">
          <a href="/demo/urbanwood" className="hover:text-uw-text-primary transition-colors">Home</a>
          <span className="opacity-50">›</span>
          <a href="#" className="hover:text-uw-text-primary transition-colors">Outdoor</a>
          <span className="opacity-50">›</span>
          <span className="text-uw-text-primary">Outdoor Lounge Furniture</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-uw-text-primary mb-6 leading-[1.1]">
          Outdoor Lounge Furniture
        </h1>
        
        <p className="text-sm md:text-base text-uw-text-secondary leading-relaxed max-w-sm">
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
