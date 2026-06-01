"use client";

import { motion } from "motion/react";
import { Hammer, Shield, Truck, Pencil } from "lucide-react";

const WHY_POINTS = [
  {
    icon: Hammer,
    title: "Handcrafted",
    description:
      "Every piece made by skilled artisans in our Ahmedabad workshop. No factory shortcuts.",
  },
  {
    icon: Shield,
    title: "10-Year Warranty",
    description:
      "We stand behind our craftsmanship. All structural defects covered for a full decade.",
  },
  {
    icon: Truck,
    title: "Free Home Delivery",
    description:
      "Free delivery and installation anywhere in Ahmedabad. Pan-India delivery available.",
  },
  {
    icon: Pencil,
    title: "Custom Orders Welcome",
    description:
      "Have a specific size, colour, or design in mind? We build it exactly as you imagine.",
  },
];

export function FCWhy() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-fc-brown mb-3">
            Why Choose Furniture Concepts 2.0
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_POINTS.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl border border-fc-brown/10 hover:border-fc-brown/30 hover:bg-fc-cream transition-all duration-300"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-fc-brown/10 mb-4">
                  <Icon className="size-6 text-fc-brown" />
                </div>
                <h3 className="text-fc-brown font-bold mb-2">{point.title}</h3>
                <p className="text-fc-brown/60 text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
