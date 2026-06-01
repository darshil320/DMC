"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const CATEGORIES = [
  {
    title: "Sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=480&auto=format&fit=crop&q=60",
    className: "md:col-span-2",
  },
  {
    title: "Beds",
    image: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=480&auto=format&fit=crop&q=60",
    className: "",
  },
  {
    title: "Wardrobes",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=480&auto=format&fit=crop&q=60",
    className: "",
  },
  {
    title: "Dining Tables",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=480&auto=format&fit=crop&q=60",
    className: "md:col-span-2",
  },
  {
    title: "Office Chairs",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=480&auto=format&fit=crop&q=60",
    className: "",
  },
  {
    title: "Custom Furniture",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=480&auto=format&fit=crop&q=60",
    className: "",
  },
];

export function FCCategories() {
  return (
    <section className="py-20 bg-fc-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-fc-brown mb-3">
            Browse by Category
          </h2>
          <p className="text-fc-brown/60 text-lg">
            Every piece crafted for your home.
          </p>
        </motion.div>

        <BentoGrid>
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <BentoGridItem
                title={cat.title}
                header={
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
                    />
                  </div>
                }
                className={`bg-white border-fc-brown/10 hover:border-fc-brown/30 ${cat.className}`}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
