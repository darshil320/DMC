"use client";

import { motion } from "motion/react";

export function FCAbout() {
  return (
    <section className="py-20 bg-fc-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-fc-brown mb-6">
              Crafted with care, built to last
            </h2>
            <p className="text-fc-brown/70 text-base leading-relaxed mb-4">
              Furniture Concepts 2.0 began in 2012 as a small workshop in Ahmedabad, with one
              belief: furniture should tell a story. Every sofa, bed, and dining
              table we make carries the skill of our craftsmen who have spent
              decades learning their trade.
            </p>
            <p className="text-fc-brown/70 text-base leading-relaxed">
              We source our wood from sustainable forests, work with natural
              finishes, and build every piece to last a lifetime. When you buy
              from Furniture Concepts 2.0, you are not buying mass-produced furniture — you
              are buying something made specifically for your home.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { number: "12+", label: "Years of craftsmanship" },
                { number: "3,400+", label: "Homes furnished" },
                { number: "10 yr", label: "Warranty on all pieces" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold font-display text-fc-brown">
                    {stat.number}
                  </p>
                  <p className="text-fc-brown/60 text-xs mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=240&auto=format&fit=crop&q=60"
              alt="Showroom interior"
              className="rounded-2xl object-cover w-full h-56"
            />
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=240&auto=format&fit=crop&q=60"
              alt="Furniture craftsmanship"
              className="rounded-2xl object-cover w-full h-56 mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&auto=format&fit=crop&q=60"
              alt="Woodworking workshop"
              className="rounded-2xl object-cover w-full h-40 col-span-2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
