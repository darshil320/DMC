"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/store/useCart";
import { motion, AnimatePresence } from "motion/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = ["NEW ARRIVALS", "LIVING", "DINING", "STORAGE & CONSOLES", "WORKSPACE"];

const MEGA_MENU_CATEGORIES = [
  "Dining Tables", "Dining Chairs", "Benches", "Barstools"
];

const MEGA_MENU_COLLECTIONS = [
  "Thierry Dining", "Edison Dining", "Natalie Dining", "Luna Dining", "Walsh Dining", "Natural Travertine Tables"
];

const MEGA_MENU_IMAGES = [
  {
    title: "DINING CHAIRS FOR EVERY HOME",
    subtitle: "Designed for spaces where good taste is always on the menu.",
    linkText: "SHOP DINING CHAIRS",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "TRAVERTINE DINING TABLES",
    subtitle: "A true centrepiece for gatherings, big moments, and everyday rituals alike.",
    linkText: "SHOP TRAVERTINE DINING TABLES",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&auto=format&fit=crop&q=60",
  }
];

export function UWHeaderV2() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, isOpen: cartOpen, setIsOpen: setCartOpen } = useCart();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isStorePage = pathname === "/demo/urbanwood/store";
  const isDarkBg = !scrolled && !activeMenu && !cartOpen && !isStorePage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          isDarkBg ? "bg-transparent text-white" : "bg-white text-uw-text-primary border-b border-gray-200"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Top utility bar (optional, like CANCAN) */}
        <div className={`hidden md:flex justify-between items-center px-6 py-2 text-[10px] uppercase tracking-widest font-semibold border-b ${isDarkBg ? "border-white/10" : "border-gray-100"}`}>
          <span>Mid-Year Sale Now On — Get Directions To Showroom →</span>
          <div className="flex gap-4">
            {session ? (
              <button onClick={() => signOut()} className="hover:opacity-70">Logout</button>
            ) : (
              <button onClick={() => signIn()} className="hover:opacity-70">Login</button>
            )}
            <span>USD v</span>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Mobile Menu Icon (hidden on large screens) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden flex flex-col gap-1.5 z-[110] relative p-2 -ml-2"
          >
            <span className={`block w-5 h-[1.5px] transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[3px] bg-black" : isDarkBg ? "bg-white" : "bg-uw-text-primary"}`} />
            <span className={`block w-5 h-[1.5px] transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[4.5px] bg-black" : isDarkBg ? "bg-white" : "bg-uw-text-primary"}`} />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <Link
                href="/demo/urbanwood/store"
                key={link}
                onMouseEnter={() => setActiveMenu(link)}
                className="hover:opacity-70 transition-opacity"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link
            href="/demo/urbanwood"
            className={`text-[20px] md:text-[28px] font-black tracking-tighter uppercase absolute left-1/2 -translate-x-1/2 text-center font-sans z-[110] ${mobileMenuOpen ? 'text-black' : ''}`}
            onMouseEnter={() => setActiveMenu(null)}
          >
            URBANWOOD
          </Link>

          {/* Right Nav Links & Cart */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase">
            {NAV_LINKS.slice(2).map((link) => (
              <Link
                href="/demo/urbanwood/store"
                key={link}
                onMouseEnter={() => setActiveMenu(link)}
                className="hover:opacity-70 transition-opacity"
              >
                {link}
              </Link>
            ))}
            <button 
              onClick={() => setCartOpen(true)}
              className="hover:opacity-70 transition-opacity ml-4"
            >
              Cart ({mounted ? cartCount() : 0})
            </button>
          </nav>

          <button onClick={() => setCartOpen(true)} className={`md:hidden text-[11px] font-bold tracking-[0.15em] uppercase z-[110] relative ${mobileMenuOpen ? 'text-black' : ''}`}>
            Cart ({mounted ? cartCount() : 0})
          </button>
        </div>

        {/* Mobile Full Screen Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-white z-[105] flex flex-col pt-[100px] px-6 text-black"
            >
              <nav className="flex flex-col gap-6 text-2xl font-medium tracking-tight">
                {NAV_LINKS.map(link => (
                  <Link 
                    key={link} 
                    href="/demo/urbanwood/store"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-gray-100 pb-4"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-12 flex flex-col gap-4 text-sm font-medium">
                {session ? (
                  <button onClick={() => signOut()} className="text-left py-4 border-t border-gray-100">Logout</button>
                ) : (
                  <button onClick={() => signIn()} className="text-left py-4 border-t border-gray-100">Login</button>
                )}
                <span className="text-gray-500">USD</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-white text-uw-text-primary border-b border-gray-200 overflow-hidden shadow-2xl"
            >
              <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 flex gap-16">
                
                {/* Left Links Column */}
                <div className="flex gap-20 w-1/3">
                  <div className="flex flex-col gap-4">
                    {MEGA_MENU_CATEGORIES.map(cat => (
                      <Link key={cat} href="/demo/urbanwood/store" className="text-[14px] font-medium hover:underline decoration-1 underline-offset-4">
                        {cat}
                      </Link>
                    ))}
                    <Link href="/demo/urbanwood/store" className="text-[11px] font-bold tracking-widest uppercase mt-8 border-b border-black pb-1 w-max">
                      View All {activeMenu}
                    </Link>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-[12px] font-bold mb-2">By Collection</span>
                    {MEGA_MENU_COLLECTIONS.map(cat => (
                      <Link key={cat} href="/demo/urbanwood/store" className="text-[14px] text-gray-600 hover:text-black transition-colors">
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Image Grid Column */}
                <div className="w-2/3 grid grid-cols-2 gap-6">
                  {MEGA_MENU_IMAGES.map((item, i) => (
                    <Link href="/demo/urbanwood/store" key={i} className="relative aspect-[4/5] group overflow-hidden cursor-pointer block">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center text-white">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 font-sans leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base font-medium mb-6 max-w-[80%] drop-shadow-sm">
                          {item.subtitle}
                        </p>
                        <span className="text-[11px] font-bold tracking-[0.2em] border-b-2 border-white pb-1 group-hover:border-transparent transition-colors">
                          {item.linkText}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dim Overlay when Mega Menu is open */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 z-[90] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
