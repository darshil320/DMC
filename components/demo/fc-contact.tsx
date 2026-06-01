"use client";

import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Share2,
  Clock,
} from "lucide-react";
import { FURNITURE_CONCEPTS } from "@/lib/dmc-config";
import { cn } from "@/lib/utils";

export function FCContact() {
  return (
    <section className="py-20 bg-fc-brown text-fc-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — showroom info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-fc-cream/70 text-base leading-relaxed mb-8">
              Come see the furniture in person. Our team will help you choose
              the right pieces for your home and discuss customisation options.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-fc-cream/60 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Address</p>
                  <p className="text-fc-cream/70 text-sm">
                    Plot 14, Industrial Area, Odhav, Ahmedabad – 382415, Gujarat
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="size-5 text-fc-cream/60 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Showroom Hours</p>
                  <p className="text-fc-cream/70 text-sm">
                    Mon – Sat: 10:00 AM – 7:00 PM
                  </p>
                  <p className="text-fc-cream/70 text-sm">
                    Sunday: 11:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 text-fc-cream/60 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Phone</p>
                  <p className="text-fc-cream/70 text-sm">+91 98XXXXXXXX</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-fc-cream text-fc-brown font-bold h-auto px-6 py-3 hover:bg-fc-cream/90"
                )}
              >
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Right — contact strip + map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden bg-fc-cream/10 border border-fc-cream/20 h-56 mb-6 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="size-8 text-fc-cream/40 mx-auto mb-2" />
                <p className="text-fc-cream/50 text-sm">
                  Odhav, Ahmedabad, Gujarat
                </p>
              </div>
            </div>

            {/* Contact channels */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={FURNITURE_CONCEPTS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-fc-cream/10 border border-fc-cream/20 hover:bg-fc-cream/15 transition-colors"
              >
                <MessageCircle className="size-5 text-dmc-whatsapp" />
                <span className="text-fc-cream text-sm font-medium">
                  WhatsApp
                </span>
              </a>
              <a
                href="tel:+9198XXXXXXXX"
                className="flex items-center gap-3 p-4 rounded-xl bg-fc-cream/10 border border-fc-cream/20 hover:bg-fc-cream/15 transition-colors"
              >
                <Phone className="size-5 text-fc-cream/60" />
                <span className="text-fc-cream text-sm font-medium">
                  Call Us
                </span>
              </a>
              <a
                href="mailto:hello@furnitureconcepts2.0.in"
                className="flex items-center gap-3 p-4 rounded-xl bg-fc-cream/10 border border-fc-cream/20 hover:bg-fc-cream/15 transition-colors"
              >
                <Mail className="size-5 text-fc-cream/60" />
                <span className="text-fc-cream text-sm font-medium">Email</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-4 rounded-xl bg-fc-cream/10 border border-fc-cream/20 hover:bg-fc-cream/15 transition-colors"
              >
                <Share2 className="size-5 text-fc-cream/60" />
                <span className="text-fc-cream text-sm font-medium">
                  Social
                </span>
              </a>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-dmc-whatsapp/15 border border-dmc-whatsapp/30">
              <p className="text-fc-cream text-sm leading-relaxed">
                <span className="font-semibold">Have a custom requirement?</span>{" "}
                Message us on WhatsApp with your dimensions, preferred material,
                and budget. We'll send you a quote within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
