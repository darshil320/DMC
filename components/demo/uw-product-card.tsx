"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { URBANWOOD } from "@/lib/dmc-config";

export interface UWProduct {
  name: string;
  category: string;
  material: string;
  size: string;
  priceRange: string;
  image: string;
}

export function UWProductCard({ product }: { product: UWProduct }) {
  const waMsg = `Hi, I'm interested in the ${product.name}. Could you please share more details and availability?`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl overflow-hidden border border-uw-brown/10 hover:border-uw-brown/30 hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-uw-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <Badge className="mb-3 text-xs bg-uw-brown/10 text-uw-brown border border-uw-brown/20 hover:bg-uw-brown/20">
          {product.category}
        </Badge>

        <h3 className="text-uw-brown font-bold text-base leading-snug mb-2">
          {product.name}
        </h3>

        <div className="space-y-1 mb-3">
          <p className="text-uw-brown/60 text-xs">
            <span className="font-medium text-uw-brown/80">Material:</span>{" "}
            {product.material}
          </p>
          <p className="text-uw-brown/60 text-xs">
            <span className="font-medium text-uw-brown/80">Size:</span>{" "}
            {product.size}
          </p>
        </div>

        <p className="text-uw-green font-bold text-lg mb-4">
          {product.priceRange}
        </p>

        <a
          href={`${URBANWOOD.whatsappLink}?text=${encodeURIComponent(waMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-dmc-whatsapp text-white text-sm font-semibold hover:bg-dmc-whatsapp/90 transition-colors"
        >
          <MessageCircle className="size-4" />
          Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
