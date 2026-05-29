"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya Sharma",
    city: "Ahmedabad",
    quote:
      "The sofa is exactly what we wanted. Quality is outstanding and delivery was on time. Highly recommend UrbanWood.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    city: "Surat",
    quote:
      "Ordered a custom wardrobe for our bedroom. The craftsmanship is excellent and the team was very helpful throughout.",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    city: "Vadodara",
    quote:
      "We furnished our entire living room from UrbanWood. Every piece is solid, well-built, and looks beautiful.",
    rating: 5,
  },
  {
    name: "Amit Desai",
    city: "Ahmedabad",
    quote:
      "Very happy with the dining set. It fits perfectly in our space. Will definitely buy from them again.",
    rating: 5,
  },
  {
    name: "Sunita Mehta",
    city: "Gandhinagar",
    quote:
      "The bed is sturdy and the headboard design is exactly what I had in mind. Great experience overall.",
    rating: 5,
  },
  {
    name: "Vikram Shah",
    city: "Ahmedabad",
    quote:
      "Excellent quality, fair price, and superb after-sales support. My go-to for all future furniture needs.",
    rating: 5,
  },
];

const REVIEWS_DOUBLE = [...REVIEWS, ...REVIEWS];

export function UWReviews() {
  return (
    <section className="py-20 bg-uw-cream overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-uw-brown mb-3">
            What our customers say
          </h2>
          <p className="text-uw-brown/60 text-lg">
            Real families, real homes, real experiences.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {REVIEWS_DOUBLE.map((review, idx) => (
            <div
              key={idx}
              className="inline-block shrink-0 w-72 rounded-2xl bg-white border border-uw-brown/10 p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-uw-brown/80 text-sm leading-relaxed mb-4 whitespace-normal">
                "{review.quote}"
              </p>
              <div>
                <p className="text-uw-brown font-semibold text-sm">
                  {review.name}
                </p>
                <p className="text-uw-brown/50 text-xs">{review.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
