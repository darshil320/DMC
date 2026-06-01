"use client";

import { motion } from "motion/react";
import { FCProductCard, type FCProduct } from "./fc-product-card";

const PRODUCTS: FCProduct[] = [
  {
    name: "Marlow 3-Seater Linen Sofa",
    category: "Sofas",
    material: "Solid Sheesham Wood + Linen Upholstery",
    size: "210 × 90 × 85 cm",
    priceRange: "₹42,000 – ₹48,000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Oslo King Storage Bed",
    category: "Beds",
    material: "Solid Sheesham Wood",
    size: "200 × 180 × 120 cm",
    priceRange: "₹38,000 – ₹44,000",
    image: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Aspen 4-Door Wardrobe",
    category: "Wardrobes",
    material: "MDF + Walnut Veneer Finish",
    size: "200 × 60 × 220 cm",
    priceRange: "₹54,000 – ₹62,000",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Hudson 6-Seater Dining Set",
    category: "Dining",
    material: "Teak Wood + Fabric Chairs",
    size: "180 × 90 cm (table)",
    priceRange: "₹62,000 – ₹72,000",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Nordic Accent Chair",
    category: "Chairs",
    material: "Beechwood + Velvet Upholstery",
    size: "65 × 70 × 85 cm",
    priceRange: "₹18,000 – ₹22,000",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Alpine L-Shaped Sofa",
    category: "Sofas",
    material: "Solid Wood + Premium Fabric",
    size: "280 × 160 × 85 cm",
    priceRange: "₹68,000 – ₹78,000",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Zen Queen Platform Bed",
    category: "Beds",
    material: "Teak Wood + Leather Headboard",
    size: "160 × 200 × 100 cm",
    priceRange: "₹44,000 – ₹52,000",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Walnut Study Desk",
    category: "Office",
    material: "Solid Walnut Wood",
    size: "140 × 65 × 76 cm",
    priceRange: "₹24,000 – ₹28,000",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=60",
  },
];

export function FCProducts() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-fc-brown mb-3">
            Featured Products
          </h2>
          <p className="text-fc-brown/60 text-lg">
            Handcrafted for modern Indian homes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
            >
              <FCProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
