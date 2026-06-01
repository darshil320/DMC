"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/store/useCart";
import { motion, AnimatePresence } from "motion/react";
import { useSession, signIn, signOut } from "next-auth/react";

export function UWHeaderV2() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, isOpen: cartOpen, setIsOpen: setCartOpen } = useCart();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (menuOpen || cartOpen) {
        setVisible(true);
        return;
      }

      if (currentScrollY < 80) {
        setVisible(true);
        setScrolled(false);
        setLastScrollY(currentScrollY);
        return;
      }
      
      setScrolled(true);

      if (currentScrollY > lastScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen, cartOpen]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen, cartOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={visible ? "visible" : "hidden"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] px-5 sm:px-8 md:px-12 py-4 md:py-6 grid grid-cols-3 items-center ${
          scrolled
            ? "bg-uw-bg-page border-b border-uw-border-subtle shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="justify-self-start">
          <button
            onClick={() => setMenuOpen(true)}
            className={`flex items-center gap-2 md:gap-3 hover:opacity-60 transition-opacity ${
              scrolled ? "text-uw-text-primary" : "text-white"
            }`}
          >
            <span className="flex flex-col gap-[4px] md:gap-[5px]">
              <span className={`block w-4 md:w-5 h-[1px] ${scrolled ? "bg-uw-text-primary" : "bg-white"}`} />
              <span className={`block w-4 md:w-5 h-[1px] ${scrolled ? "bg-uw-text-primary" : "bg-white"}`} />
              <span className={`block w-2 md:w-3 h-[1px] ${scrolled ? "bg-uw-text-primary" : "bg-white"}`} />
            </span>
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase mt-0.5">
              Menu
            </span>
          </button>
        </div>

        <div className="justify-self-center text-center">
          <Link
            href="/demo/furniture-concept-2.0"
            className={`flex flex-col sm:block text-[11px] sm:text-[12px] md:text-[14px] font-medium tracking-[0.2em] sm:tracking-[0.15em] uppercase transition-colors ${
              scrolled ? "text-uw-text-primary" : "text-white"
            }`}
          >
            <span>FURNITURE CONCEPT</span>
            <span className="sm:ml-2 text-[9px] sm:text-[12px] md:text-[14px] opacity-70 sm:opacity-100 mt-0.5 sm:mt-0">2.0</span>
          </Link>
        </div>

        <div className="justify-self-end flex items-center gap-4">
          {session ? (
            <button
              onClick={() => signOut()}
              className={`text-[10px] md:text-[11px] font-medium tracking-[0.12em] uppercase transition-colors hidden sm:block ${
                scrolled ? "text-uw-text-secondary hover:text-uw-text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className={`text-[10px] md:text-[11px] font-medium tracking-[0.12em] uppercase transition-colors hidden sm:block ${
                scrolled ? "text-uw-text-secondary hover:text-uw-text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              Login
            </button>
          )}

          <button 
            onClick={() => setCartOpen(true)}
            className={`text-[10px] md:text-[11px] font-medium tracking-[0.12em] uppercase transition-colors mt-0.5 ${
              scrolled ? "text-uw-text-secondary hover:text-uw-text-primary" : "text-white/80 hover:text-white"
            }`}
          >
            Cart ({mounted ? cartCount() : 0})
          </button>
        </div>
      </motion.header>

      {/* Animated Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-[#F4F1ED] flex flex-col p-8 md:p-16"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-[14px] font-medium tracking-[0.15em] uppercase text-uw-text-primary">Furniture Concept 2.0</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-uw-text-secondary hover:text-uw-text-primary"
              >
                Close ✕
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto w-full">
              {["Workstations", "Executive Desks", "Chairs", "Storage", "Conference", "Sale"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.05), duration: 0.6 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl md:text-7xl font-serif text-[#2C2A26] hover:opacity-50 transition-opacity"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto text-[11px] text-uw-text-muted tracking-wider uppercase text-center">
              <Link href="/" className="hover:underline">← Back to DMC Portfolio</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
