"use client";

import React, { type ReactNode, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useLenis } from "lenis/react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Step = "idle" | "loading" | "result" | "error";
type CategoryKey = "all" | "living" | "bedroom" | "office" | "kitchen";

interface Product {
  id: string;
  name: string;
  shortName: string;
  material: string;
  image: string;
  description: string;
  category: Exclude<CategoryKey, "all">;
}

// ─── Products ────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "marlow-sofa",
    name: "Marlow 3-Seater Linen Sofa",
    shortName: "Marlow Sofa",
    material: "Cream linen · Walnut legs",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=90",
    description: "cream linen 3-seater sofa with solid walnut wood legs in a modern Scandinavian style",
    category: "living",
  },
  {
    id: "oslo-bed",
    name: "Oslo King Storage Bed",
    shortName: "Oslo Bed",
    material: "Sheesham wood · Charcoal fabric",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=90",
    description: "king-size storage bed with sheesham wood frame and charcoal upholstered headboard",
    category: "bedroom",
  },
  {
    id: "aspen-wardrobe",
    name: "Aspen 4-Door Wardrobe",
    shortName: "Aspen Wardrobe",
    material: "Matte white MDF · Brushed gold",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
    description: "4-door floor-to-ceiling wardrobe in matte white MDF with brushed gold handles",
    category: "bedroom",
  },
  {
    id: "hudson-dining",
    name: "Hudson 6-Seater Dining Set",
    shortName: "Hudson Dining",
    material: "Teak wood · Fabric chairs",
    image: "https://images.pexels.com/photos/30336909/pexels-photo-30336909.jpeg",
    description: "6-seater solid teak dining table with upholstered fabric dining chairs",
    category: "living",
  },
  {
    id: "aura-desk",
    name: "Aura Executive Desk",
    shortName: "Aura Desk",
    material: "Premium walnut veneer",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=90",
    description: "large executive desk in premium walnut veneer with integrated cable management and drawers",
    category: "office",
  },
  {
    id: "ergopro-chair",
    name: "ErgoPro Task Chair",
    shortName: "ErgoPro Chair",
    material: "Breathable mesh · Graphite",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=90",
    description: "ergonomic task chair with breathable mesh back, graphite aluminum base and adjustable armrests",
    category: "office",
  },
  {
    id: "modena-island",
    name: "Modena Kitchen Island",
    shortName: "Modena Island",
    material: "Quartz top · Oak base",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=90",
    description: "freestanding kitchen island with white quartz countertop and solid oak cabinetry with storage drawers",
    category: "kitchen",
  },
  {
    id: "milano-barstool",
    name: "Milano Bar Stool Set",
    shortName: "Milano Stools",
    material: "Velvet seat · Brass legs",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=90",
    description: "set of 2 contemporary bar stools with velvet upholstered seats and slim brass metal legs",
    category: "kitchen",
  }
];

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "living", label: "Living" },
  { key: "bedroom", label: "Bedroom" },
  { key: "office", label: "Office" },
  { key: "kitchen", label: "Kitchen" },
];

const STATUS_MESSAGES = [
  "Analyzing your room's dimensions...",
  "Mapping the light and shadows...",
  "Placing the furniture...",
  "Adjusting scale and perspective...",
  "Adding finishing touches...",
];

const WHATSAPP = "919426529230";
const SERIF = "Georgia, 'Times New Roman', serif";

// ─── Image resize ─────────────────────────────────────────────────────────────
function resizeImage(file: File, maxPx = 1920, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onerror = reject;
      img.onload = () => {
        const ratio = Math.min(maxPx / img.width, maxPx / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// ─── Lenis resize on state change ─────────────────────────────────────────────
function useLenisResize(dep: unknown) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const t = setTimeout(() => lenis.resize(), 80);
    return () => clearTimeout(t);
  }, [lenis, dep]);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function AIVisualizerClient({ intro }: { intro: ReactNode }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [statusMsgIdx, setStatusMsgIdx] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Re-measure Lenis scroll limit whenever the visible section changes
  useLenisResize(step);

  // ─── Loading animation ────────────────────────────────────────────────────
  useEffect(() => {
    if (step !== "loading") return;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(95, current + (95 / 25_000) * 200);
      setLoadingProgress(current);
    }, 200);
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (step !== "loading") return;
    const timer = setInterval(
      () => setStatusMsgIdx((i) => (i + 1) % STATUS_MESSAGES.length),
      5000
    );
    return () => clearInterval(timer);
  }, [step]);

  // ─── Upload ───────────────────────────────────────────────────────────────
  const handleFileSelect = useCallback((file: File) => {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file (JPG, PNG, HEIC)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image must be under 10MB");
      return;
    }
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  // ─── Slider ───────────────────────────────────────────────────────────────
  const calcSlider = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    setSliderPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { isDragging.current = true; calcSlider(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) calcSlider(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };
  const onTouchStart = (e: React.TouchEvent) => calcSlider(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); calcSlider(e.touches[0].clientX); };

  // ─── Generate ─────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!uploadedFile || !selectedProduct) return;
    setErrorMsg(null);
    setResultUrl(null);
    setLoadingProgress(0);
    setStatusMsgIdx(0);
    setStep("loading");
    try {
      const base64 = await resizeImage(uploadedFile);
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomImageBase64: base64,
          productName: selectedProduct.name,
          productDescription: selectedProduct.description,
          productImageUrl: selectedProduct.image,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Generation failed");
      setResultUrl(json.data.resultUrl);
      setLoadingProgress(100);
      setStep("result");
      setSliderPos(50);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  };

  // ─── Download ─────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!resultUrl) return;
    try {
      const blob = await fetch(resultUrl).then((r) => r.blob());
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-room-${selectedProduct?.id ?? "result"}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(resultUrl, "_blank");
    }
  };

  const handleReset = () => { setStep("idle"); setResultUrl(null); setErrorMsg(null); setLoadingProgress(0); };
  const handleFullReset = () => { handleReset(); setUploadedFile(null); setPreviewUrl(null); setSelectedProduct(null); };

  const filteredProducts = useMemo(
    () =>
      activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const canGenerate = !!uploadedFile && !!selectedProduct;
  const waText = encodeURIComponent(
    `Hi, I used the AI Room Visualizer and loved how the ${selectedProduct?.name ?? "furniture"} looks in my room. Can I get more details?`
  );

  return (
    <>
      <style>{`.vis-circle { border-radius: 50% !important; }`}</style>

        {/* ════════════════ LOADING ════════════════ */}
        {step === "loading" && (
          <div className="bg-[#1C1A17] text-[#F4F1ED] min-h-[calc(100vh-57px)] flex flex-col items-center justify-center px-6 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-5 font-medium">
                Generating
              </p>
              <h2
                className="text-[26px] md:text-[38px] font-normal leading-[1.2] mb-14 max-w-lg mx-auto text-[#F4F1ED]"
                style={{ fontFamily: SERIF }}
              >
                Placing the {selectedProduct?.name} in your space…
              </h2>

              <div className="w-full max-w-[320px] mx-auto mb-3">
                <div className="w-full h-[1px] bg-[#F4F1ED]/12">
                  <div
                    className="h-full bg-[#C9A84C] transition-[width] duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between max-w-[320px] mx-auto text-[10px] text-[#F4F1ED]/25 tracking-widest mb-10">
                <span>{Math.round(loadingProgress)}%</span>
                <span>100%</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={statusMsgIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="text-[#F4F1ED]/45 text-[13px] tracking-wide italic"
                  style={{ fontFamily: SERIF }}
                >
                  {STATUS_MESSAGES[statusMsgIdx]}
                </motion.p>
              </AnimatePresence>

              <p className="text-[#F4F1ED]/18 text-[10px] tracking-widest uppercase mt-14">
                20–40 seconds · Keep this tab open
              </p>
            </motion.div>
          </div>
        )}

        {/* ════════════════ RESULT ════════════════ */}
        {step === "result" && resultUrl && previewUrl && (
          <div>
            {/* Slider */}
            <div
              ref={sliderRef}
              className="relative overflow-hidden select-none w-full cursor-col-resize bg-[#2C2A26]"
              style={{ aspectRatio: "16 / 9", maxHeight: "85vh", touchAction: "none" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
            >
              {/* AI result */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt="AI generated room"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              {/* Original (clipped left) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Original room"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                draggable={false}
              />
              {/* Divider */}
              <div
                className="absolute top-0 bottom-0 w-[1px] bg-[#F4F1ED]/80 pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              />
              {/* Handle */}
              <div
                className="vis-circle absolute flex items-center justify-center bg-[#F4F1ED] shadow-xl pointer-events-none"
                style={{ width: 44, height: 44, left: `${sliderPos}%`, top: "50%", transform: "translate(-50%,-50%)" }}
              >
                <svg className="w-4 h-4 text-[#2C2A26]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
              {/* Labels */}
              <div className="absolute bottom-5 left-5 pointer-events-none">
                <span className="bg-[#2C2A26]/75 backdrop-blur-sm text-[#F4F1ED] text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 font-medium">
                  Your Room
                </span>
              </div>
              <div className="absolute bottom-5 right-5 pointer-events-none">
                <span className="bg-[#C9A84C] text-[#2C2A26] text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 font-semibold">
                  With {selectedProduct?.shortName}
                </span>
              </div>
            </div>

            {/* Info + CTAs */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-[#2C2A26]/10 pb-12">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#2C2A26]/35 mb-3 font-medium">
                    Visualized in your space
                  </p>
                  <h2 className="text-[30px] md:text-[42px] font-normal text-[#2C2A26] mb-2 leading-[1.05]" style={{ fontFamily: SERIF }}>
                    {selectedProduct?.name}
                  </h2>
                  <p className="text-[13px] text-[#2C2A26]/45 tracking-wide">{selectedProduct?.material}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#2C2A26] text-[#F4F1ED] text-[10px] font-semibold tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#1C1A17] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enquire on WhatsApp
                  </a>
                  <button
                    onClick={handleDownload}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-[#2C2A26]/25 text-[#2C2A26] text-[10px] font-semibold tracking-[0.18em] uppercase px-8 py-4 hover:border-[#2C2A26] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Image
                  </button>
                </div>
              </div>

              <div className="pt-8 flex gap-8">
                <button onClick={handleReset} className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#2C2A26]/35 hover:text-[#2C2A26] transition-colors duration-200 border-b border-transparent hover:border-[#2C2A26]/30 pb-0.5">
                  ← Try another product
                </button>
                <button onClick={handleFullReset} className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#2C2A26]/35 hover:text-[#2C2A26] transition-colors duration-200 border-b border-transparent hover:border-[#2C2A26]/30 pb-0.5">
                  Start over
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ ERROR ════════════════ */}
        {step === "error" && (
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-14">
            <div className="border border-[#2C2A26]/12 bg-[#EAEAE5] p-10 max-w-md">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#2C2A26]/35 mb-3">Generation failed</p>
              <p className="text-[15px] text-[#2C2A26]/65 mb-8 leading-relaxed" style={{ fontFamily: SERIF }}>
                {errorMsg ?? "Something went wrong. Please try again."}
              </p>
              <button
                onClick={handleReset}
                className="text-[10px] font-semibold tracking-[0.18em] uppercase bg-[#2C2A26] text-[#F4F1ED] px-7 py-3.5 hover:bg-[#1C1A17] transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ════════════════ MAIN UI ════════════════ */}
        {(step === "idle" || step === "error") && (
          <>
            {intro}

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

              {/* ── 01 Upload ───────────────────────────────────────────────── */}
              <section className="py-14 md:py-20 border-b border-[#2C2A26]/10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A84C]">01</span>
                  <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#2C2A26]/40">Upload your room photo</span>
                  {uploadedFile && (
                    <span className="ml-auto text-[10px] text-[#C9A84C] font-medium tracking-wider">✓ Ready</span>
                  )}
                </div>

                {!previewUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="group border border-dashed border-[#2C2A26]/18 bg-[#EAEAE5]/50 hover:bg-[#EAEAE5]/80 hover:border-[#2C2A26]/30 transition-all duration-300 cursor-pointer px-8 py-16 md:py-20 flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 border border-[#2C2A26]/18 group-hover:border-[#2C2A26]/35 flex items-center justify-center mb-6 transition-colors duration-300">
                      <svg className="w-5 h-5 text-[#2C2A26]/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <p className="text-[#2C2A26]/60 text-[15px] mb-2" style={{ fontFamily: SERIF }}>
                      Tap to upload your room photo
                    </p>
                    <p className="text-[#2C2A26]/30 text-[10px] tracking-[0.2em] uppercase">JPG · PNG · HEIC — max 10MB</p>
                  </div>
                ) : (
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Your room" className="w-full h-[260px] md:h-[400px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/55 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-6 flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C]" />
                      <span className="text-[9px] text-[#F4F1ED]/85 font-medium tracking-[0.25em] uppercase">Room ready</span>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-5 right-5 bg-[#F4F1ED]/90 text-[#2C2A26] text-[9px] px-4 py-2.5 tracking-[0.2em] uppercase font-semibold hover:bg-[#F4F1ED] transition-colors"
                    >
                      Change Photo
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                    e.target.value = "";
                  }}
                />
                {uploadError && (
                  <p className="mt-4 text-[12px] text-[#8B4513] tracking-wide">{uploadError}</p>
                )}
              </section>

              {/* ── 02 Product Selector ─────────────────────────────────────── */}
              <section className="py-14 md:py-20 border-b border-[#2C2A26]/10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A84C]">02</span>
                  <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#2C2A26]/40">Choose a piece to visualize</span>
                  {selectedProduct && (
                    <span className="ml-auto text-[10px] text-[#C9A84C] font-medium tracking-wider">✓ {selectedProduct.shortName}</span>
                  )}
                </div>

                {/* Category tabs */}
                <div className="flex gap-0 mb-10 border-b border-[#2C2A26]/10 overflow-x-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`shrink-0 text-[10px] tracking-[0.18em] uppercase px-5 py-3 font-medium border-b-[1.5px] -mb-px transition-colors duration-200 ${
                        activeCategory === cat.key
                          ? "border-[#C9A84C] text-[#2C2A26]"
                          : "border-transparent text-[#2C2A26]/35 hover:text-[#2C2A26]/65"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Product grid — CSS transition only, no layout animations to avoid Lenis conflicts */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProduct?.id === product.id;
                    return (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="text-left group relative"
                      >
                        {/* Image container */}
                        <div
                          className={`relative overflow-hidden bg-[#EAEAE5] transition-all duration-300 ${
                            isSelected
                              ? "outline outline-[1.5px] outline-[#C9A84C] outline-offset-0"
                              : "outline outline-[1px] outline-[#2C2A26]/8 hover:outline-[#2C2A26]/20"
                          } aspect-[4/3]`}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 420px"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />

                          {/* Dark gradient + category label at top */}
                          <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#1C1A17]/40 to-transparent pointer-events-none" />
                          <span className="absolute top-3 left-3 text-[8px] tracking-[0.2em] uppercase text-[#F4F1ED]/70 font-medium">
                            {product.category}
                          </span>

                          {/* Selected checkmark */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-[#C9A84C] flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-[#2C2A26]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                          )}

                          {/* Bottom hover overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#2C2A26]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                        {/* Card content */}
                        <div className={`pt-3.5 pb-1 transition-all duration-200 ${isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                          <p
                            className="text-[13px] md:text-[14px] text-[#2C2A26] leading-snug mb-1"
                            style={{ fontFamily: SERIF }}
                          >
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2">
                            {isSelected && <div className="w-1 h-1 bg-[#C9A84C] shrink-0" />}
                            <p className="text-[9px] text-[#2C2A26]/40 tracking-[0.15em] uppercase">
                              {product.material}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ── 03 Generate ─────────────────────────────────────────────── */}
              <section className="py-14 md:py-20">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#C9A84C]">03</span>
                  <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#2C2A26]/40">Generate</span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className={`inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] uppercase px-10 py-4 transition-all duration-200 ${
                      canGenerate
                        ? "bg-[#2C2A26] text-[#F4F1ED] hover:bg-[#1C1A17]"
                        : "bg-[#2C2A26]/8 text-[#2C2A26]/25 cursor-not-allowed"
                    }`}
                  >
                    {canGenerate ? "Visualize in my room →" : "Upload a room photo + select a product"}
                  </button>
                  {canGenerate && (
                    <p className="text-[10px] text-[#2C2A26]/35 tracking-wide">~30 seconds · Powered by FLUX AI</p>
                  )}
                </div>
              </section>
            </div>
          </>
        )}

    </>
  );
}
