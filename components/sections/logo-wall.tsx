"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useScroll, useReducedMotion } from "motion/react";
import { LOGO_ITEMS, LogoItem } from "@/data/logos";
import { useMediaQuery } from "@/lib/hooks/use-environment";

/**
 * Scroll-driven converging stretched grid.
 *
 * Cards start oversized, pushed outward along their own radial line from the
 * grid's centre, and lens-stretched along that same line — as if the whole wall
 * were being pulled apart from the middle. Scrolling converges them onto their
 * exact layout positions at uniform size, unstretched and square.
 *
 * Progress is bound directly to scroll position, so scrolling back up replays
 * the whole thing in reverse. It is not a one-shot viewport trigger.
 *
 * Two implementation notes that matter:
 *
 * 1. Home positions are *measured* from layout (`offsetLeft`/`offsetTop`, which
 *    transforms do not affect) rather than derived from a column count. That
 *    keeps the maths honest for a ragged last row and for every breakpoint,
 *    with no constant to keep in sync with the CSS.
 *
 * 2. Transforms are written straight to `style.transform` on each scroll tick,
 *    so there are no React state updates per frame.
 *
 * The lean is real 3D rotation under a shared `perspective`, not a non-uniform
 * 2D scale. A scaleX ≠ scaleY stretch distorts the logo artwork inside the card;
 * rotateX/rotateY foreshortens it, so the logo stays crisp and correctly
 * proportioned while the card tilts.
 */

/** How far cards start from home, as a multiple of their radius from centre. */
const K_POS = 0.7;

/** Extra uniform scale at t=0. Cards start at 1 + this, settle to 1. */
const UNIFORM_SCALE_BOOST = 0.5;

/**
 * Peak 3D lean, in degrees, for the cards furthest from centre. Split across
 * rotateX and rotateY by the card's own direction, so a corner card leans into
 * its corner on both axes at once.
 */
const MAX_TILT_DEG = 22;

/** Depth of the shared vanishing point applied to the grid container. */
const PERSPECTIVE_PX = 1000;

/**
 * The section opens on a blank screen — cards are transparent and off-frame,
 * then fade up over the first stretch while still travelling, so they arrive
 * rather than pop. Set to 0 to have them visible from the very first frame.
 */
const FADE_IN_END = 0.35;

/** The slice of section scroll the assembly runs over. */
const SCRUB_START = 0.04;
const SCRUB_END = 0.95;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Everything about a card that only changes when layout changes.
 *
 * Numbers only — deliberately no DOM node. The elements are re-read from the
 * grid at write time so nothing reachable through a memoised value gets
 * mutated, which is what the React Compiler flags.
 */
type CardGeometry = {
  /** Displacement from the grid centre to this card's home position. */
  dx: number;
  dy: number;
  /** Unit direction from centre — drives which way the card leans. */
  ux: number;
  uy: number;
  /** Radius normalised against the furthest card, 0 at centre, 1 at the rim. */
  rho: number;
};

interface LogoWallProps {
  items?: LogoItem[];
  title?: string;
  subtitle?: string;
}

export function LogoWall({
  items = LOGO_ITEMS,
  title = "TRUSTED BY VISIONARY BRANDS",
  subtitle = "Powering digital storefronts, AI CRM systems, and bespoke web platforms across India.",
}: LogoWallProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<CardGeometry[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  // The assembly is a desktop flourish. On phones the grid is many rows deep and
  // cannot fit inside one pinned screen, so the section falls back to a plain
  // stacked layout — the same end state as the reduced-motion path.
  const staticLayout = Boolean(shouldReduceMotion) || isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /**
   * Measures home positions from layout and derives each card's radial frame.
   * `offsetLeft`/`offsetTop` are layout values, so they stay correct even while
   * a transform is applied — no need to reset anything before reading.
   */
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const nodes = Array.from(grid.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );
    if (nodes.length === 0) return;

    const centres = nodes.map((node) => ({
      x: node.offsetLeft + node.offsetWidth / 2,
      y: node.offsetTop + node.offsetHeight / 2,
    }));

    // Grid centre C: the average of the final positions, not the bounding-box
    // middle — with a ragged last row those differ, and the average is what
    // makes the convergence look balanced.
    const centerX = centres.reduce((sum, c) => sum + c.x, 0) / centres.length;
    const centerY = centres.reduce((sum, c) => sum + c.y, 0) / centres.length;

    const displaced = centres.map((c) => {
      const dx = c.x - centerX;
      const dy = c.y - centerY;
      return { dx, dy, r: Math.hypot(dx, dy) };
    });

    const maxRadius = displaced.reduce((max, d) => Math.max(max, d.r), 0) || 1;

    geometryRef.current = displaced.map((d) => ({
      dx: d.dx,
      dy: d.dy,
      // A card sitting exactly on the centre has no direction to lean along.
      ux: d.r === 0 ? 0 : d.dx / d.r,
      uy: d.r === 0 ? 0 : d.dy / d.r,
      rho: d.r / maxRadius,
    }));
  }, []);

  /** Writes every card's transform for a given raw scroll progress. */
  const render = useCallback((rawProgress: number) => {
    const grid = gridRef.current;
    if (!grid) return;

    const geometry = geometryRef.current;
    const eased = easeOutCubic(
      clamp01((rawProgress - SCRUB_START) / (SCRUB_END - SCRUB_START))
    );
    const remaining = 1 - eased;
    const uniformScale = 1 + UNIFORM_SCALE_BOOST * remaining;
    const opacity = FADE_IN_END <= 0 ? 1 : clamp01(rawProgress / FADE_IN_END);

    for (let index = 0; index < geometry.length; index += 1) {
      const card = geometry[index];
      const node = grid.children[index];
      if (!(node instanceof HTMLElement)) continue;

      // Lean into the card's own corner: right of centre tilts +Y, left tilts
      // -Y, above centre tilts -X, below tilts +X — all scaled by how far out
      // the card sits and by how much of the assembly is left to run.
      const lean = MAX_TILT_DEG * card.rho * remaining;
      const rotateY = lean * card.ux;
      const rotateX = lean * card.uy;

      // Applied left to right. The card already sits at its home position
      // through layout, so the translate carries only the outward offset, never
      // the absolute position — adding the latter would double it.
      //
      // No flat `rotate()` here on purpose: a random in-plane tilt made the wall
      // read as scattered and misaligned. The only angular change is the
      // perspective keystone from rotateX/rotateY, which leaves every card
      // square-on to the grid.
      const transform =
        `translate(${card.dx * K_POS * remaining}px, ${card.dy * K_POS * remaining}px) ` +
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ` +
        `scale(${uniformScale})`;

      node.style.transform = transform;
      node.style.opacity = String(opacity);
    }
  }, []);

  useLayoutEffect(() => {
    if (staticLayout) {
      // Clear anything a previous non-static pass wrote, so the fallback really
      // is the plain t=1 grid.
      for (const node of Array.from(gridRef.current?.children ?? [])) {
        if (node instanceof HTMLElement) {
          node.style.transform = "";
          node.style.opacity = "";
        }
      }
      geometryRef.current = [];
      return;
    }

    measure();
    render(scrollYProgress.get());

    const grid = gridRef.current;
    if (!grid) return;

    // Column count changes with the viewport, which moves every home position.
    const observer = new ResizeObserver(() => {
      measure();
      render(scrollYProgress.get());
    });
    observer.observe(grid);

    return () => observer.disconnect();
  }, [measure, render, scrollYProgress, staticLayout, items.length]);

  useEffect(() => {
    if (staticLayout) return;
    // Motion emits these on its own frame loop, so writing directly here is
    // already frame-aligned — and it skips a React render per scroll tick.
    return scrollYProgress.on("change", render);
  }, [render, scrollYProgress, staticLayout]);

  const grid = (
    <div
      ref={gridRef}
      className="mx-auto grid w-full max-w-[1180px] grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3 md:grid-cols-7 lg:grid-cols-9"
      // One perspective for the whole grid, so every card shares a vanishing
      // point and the leans read as a single 3D space rather than each card
      // having its own.
      style={staticLayout ? undefined : { perspective: `${PERSPECTIVE_PX}px` }}
    >
      {items.map((logo) => (
        <LogoCard key={logo.id} logo={logo} animated={!staticLayout} />
      ))}
    </div>
  );

  if (staticLayout) {
    return (
      <section
        ref={sectionRef}
        className="relative z-10 w-full select-none border-t border-border-harsh bg-bg-page px-4 py-20 text-text-primary sm:px-6 md:px-12 md:py-28 lg:px-16"
      >
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <div className="section-tag inline-block font-mono text-xs font-bold uppercase tracking-widest text-accent">
            PORTFOLIO &amp; PARTNERSHIPS
          </div>
          <h2 className="text-3xl font-medium uppercase tracking-tighter text-text-primary sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="text-xs leading-relaxed text-text-secondary sm:text-sm md:text-base">
            {subtitle}
          </p>
        </div>
        {grid}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      // No `overflow-hidden` here: an overflow container on an ancestor makes
      // `position: sticky` stop sticking, which silently blanks the stage.
      // Clipping happens on the stage itself instead.
      className="relative z-10 w-full select-none border-t border-border-harsh bg-bg-page text-text-primary"
      style={{ height: "200vh" }}
    >
      {/* The stage is the whole viewport and holds nothing but the wall. A
          visible header here either got overlapped by the incoming cards or ate
          the space they need to travel through, so the heading is kept for
          structure and crawlers only — the wall itself is the statement. */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16">
        <h2 className="sr-only">{title}</h2>
        <p className="sr-only">{subtitle}</p>
        {grid}
      </div>
    </section>
  );
}

function LogoCard({ logo, animated }: { logo: LogoItem; animated: boolean }) {
  return (
    <div
      className="group relative cursor-pointer"
      // Rotation and the radial stretch both key off the card's centre.
      style={animated ? { transformOrigin: "50% 50%", willChange: "transform, opacity" } : undefined}
    >
      <div className="flex aspect-square flex-col items-center justify-center rounded-sm border border-neutral-200 bg-white p-2 shadow-md transition-shadow duration-300 group-hover:shadow-2xl sm:p-3 dark:border-neutral-700/80 dark:bg-neutral-900">
        <div
          className={`flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xs p-2 text-center transition-transform duration-300 group-hover:scale-[1.03] ${logo.bgColor} ${logo.textColor}`}
        >
          <span className={`block max-w-full truncate ${logo.fontStyle ?? "font-bold text-sm"}`}>
            {logo.name}
          </span>
          <span className="mt-1 block text-[8px] font-mono uppercase tracking-widest opacity-60">
            {logo.category}
          </span>
        </div>
      </div>
    </div>
  );
}
