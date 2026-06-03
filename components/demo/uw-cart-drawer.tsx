"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/store/useCart";

export function UWCartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        setIsOpen(false);
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#F4F1ED] z-[201] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#2C2A26]/10">
              <h2 className="text-[20px] font-serif text-[#2C2A26]">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] uppercase tracking-widest text-[#2C2A26]/60 hover:text-[#2C2A26] transition-colors"
              >
                Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8">
              {items.length === 0 ? (
                <p className="text-[14px] text-[#2C2A26]/60 text-center font-serif mt-10">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="relative w-[100px] aspect-[4/5] bg-[#EAEAE5] rounded-sm overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill
                        sizes="100px"
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-[14px] font-serif text-[#2C2A26]">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#2C2A26]/40 hover:text-[#2C2A26] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-[14px] text-[#2C2A26]/60">₹{item.price.toLocaleString("en-IN")}</p>

                      <div className="mt-auto flex items-center gap-4">
                        <div className="flex items-center border border-[#2C2A26]/20 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-[12px] text-[#2C2A26]/60 hover:text-[#2C2A26]"
                          >
                            -
                          </button>
                          <span className="text-[12px] text-[#2C2A26] w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-[12px] text-[#2C2A26]/60 hover:text-[#2C2A26]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-[#2C2A26]/10 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[14px] uppercase tracking-widest text-[#2C2A26]/60 font-medium">Subtotal</span>
                  <span className="text-[18px] font-serif text-[#2C2A26]">
                    ₹{cartTotal().toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[12px] text-[#2C2A26]/40 mb-6">
                  Taxes and shipping calculated at checkout.
                </p>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#2C2A26] text-[#F4F1ED] py-4 text-[12px] uppercase tracking-widest font-medium hover:bg-black transition-colors disabled:opacity-50"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
