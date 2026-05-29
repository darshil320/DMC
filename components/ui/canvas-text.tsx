"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CanvasTextProps {
  text: string;
  backgroundClassName?: string;
  colors?: string[];
  lineGap?: number;
  animationDuration?: number;
  className?: string;
}

export const CanvasText = ({
  text,
  backgroundClassName = "",
  colors = ["#38BDF8"],
  lineGap = 4,
  animationDuration = 20,
  className,
}: CanvasTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    if (!canvas || !textEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const rect = textEl.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    document.fonts.ready.then(resize);
    resize();

    const draw = () => {
      time += 0.015; // Smooth, elegant fluid motion
      const rect = textEl.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw beautiful, sweeping fluid waves (Full Brightness)
      ctx.lineWidth = 1.5; 
      for (let i = -50; i < h + 50; i += lineGap) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 5) {
          const fluidY = i 
            + Math.sin(x * 0.004 + time * 0.8) * 20 
            + Math.cos(x * 0.008 - time * 0.4) * 8;
          ctx.lineTo(x, fluidY);
        }
        ctx.strokeStyle = colors[Math.floor(Math.abs(i / lineGap)) % colors.length];
        ctx.stroke();
      }

      const computedStyle = window.getComputedStyle(textEl);
      ctx.font = `${computedStyle.fontStyle} ${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 2. Change composite mode to clip the waves perfectly to the text shape
      ctx.globalCompositeOperation = "destination-in";

      // 3. Draw OPAQUE text to act as the perfect clipping mask
      ctx.fillStyle = "black"; // Color doesn't matter, only alpha=1.0 matters for destination-in
      ctx.fillText(text, w / 2, h / 2 + (parseInt(computedStyle.fontSize) * 0.05));

      // 4. Draw a faint glowing base layer BEHIND the bright waves (fills the gaps)
      ctx.globalCompositeOperation = "destination-over";
      
      const baseColor = colors[0] || "#7DD3FC";
      ctx.fillStyle = baseColor.replace(/rgba?\(([^)]+)\)/, (match, contents) => {
        const parts = contents.split(',');
        if (parts.length >= 3) {
          return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.25)`; // Faint solid glow
        }
        return baseColor;
      });
      ctx.fillText(text, w / 2, h / 2 + (parseInt(computedStyle.fontSize) * 0.05));

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, colors, lineGap, animationDuration]);

  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <span ref={textRef} className="opacity-0 pointer-events-none select-none">
        {text}
      </span>
      <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none w-full h-full", backgroundClassName)} />
    </span>
  );
};
