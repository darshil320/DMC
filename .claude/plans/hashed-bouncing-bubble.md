# Plan: Scroll & Rendering Performance Pass

## Context
The site uses Lenis for smooth scroll + GSAP for hero intro + CSS IntersectionObserver-based reveal system (SiteMotion). Several patterns are causing scroll jank and frame drops: blur filters on every reveal element force expensive GPU repaints, `mix-blend-difference` on the spinning badge forces a full compositing pass every scroll frame, Lenis is configured too conservatively for mobile, and `scroll-behavior: smooth` on `html` fights Lenis. Fixing these three files produces a measurable, visible improvement in scroll smoothness and perceived speed.

---

## Changes — 3 files only

### 1. `app/globals.css`

**a) Remove `filter: blur(6px)` from reveal animations**
The `[data-premium-motion="reveal"]` rule applies `filter: blur(6px)` to every h2/h3/p/li that enters the viewport. Blur filters cannot be compositor-only — the browser must repaint the element with a Gaussian blur pass every transition frame. With dozens of elements per page this is the single biggest jank source.

Remove `filter` from the initial state and the transition property list. Keep `opacity` + `transform` only:
```css
/* BEFORE */
[data-premium-motion="reveal"] {
  opacity: 0;
  filter: blur(6px);
  transform: translate3d(0, 18px, 0);
  transition:
    opacity 720ms cubic-bezier(0.16, 1, 0.3, 1),
    filter  720ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* AFTER */
[data-premium-motion="reveal"] {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  transition:
    opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
```
Also remove `filter: blur(0)` from the `[data-motion-visible="true"]` rule.
Shorten 720ms → 600ms — snappier reveals feel more premium, not less.

**b) Fix `html` scroll conflict with Lenis**
`scroll-behavior: smooth` on `html` causes double-interpolation when Lenis is active (native smooth + Lenis smooth fight each other). Also remove the deprecated `-webkit-overflow-scrolling: touch`:
```css
/* BEFORE */
html {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* AFTER */
html {
  scroll-behavior: auto; /* Lenis owns this */
}
```

**c) Scope global transition-timing-function**
`*, *::before, *::after { transition-timing-function: cubic-bezier(0,0,0,1) }` applies to every element including SVGs and pseudo-elements. Replace with a scoped selector and also add the marquee GPU promotion:
```css
/* BEFORE */
*, *::before, *::after {
  transition-timing-function: cubic-bezier(0, 0, 0, 1);
}

/* AFTER — only interactive/animated elements */
a, button, input, select, textarea,
[class*="transition"], [class*="hover:"],
[data-premium-interaction], [data-premium-card], [data-premium-media] {
  transition-timing-function: cubic-bezier(0, 0, 0, 1);
}
```

**d) Fix `will-change` on media elements + promote marquee**
`will-change: transform, filter` on every image globally wastes VRAM (each promoted GPU layer is expensive). Remove `filter` from will-change. Add GPU promotion to marquee:
```css
/* will-change: transform only (not filter) */
[data-premium-media="true"] {
  will-change: transform;
}

/* Marquee — promote before animation starts */
.contact-marquee-track {
  will-change: transform;
  transform: translateZ(0);
}
```

---

### 2. `components/layout/ClientChrome.tsx`

Update Lenis constructor options for a smoother, higher-end feel:
```ts
/* BEFORE */
options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}

/* AFTER */
options={{
  lerp: 0.10,
  duration: 1.4,
  smoothWheel: true,
  syncTouch: true,        // smooth on mobile/trackpad (iOS + Android)
  touchMultiplier: 1.8,   // natural feel on touch screens
  wheelMultiplier: 1.0,   // standard desktop wheel speed
  infinite: false,
}}
```
`lerp: 0.08` is quite stiff — increasing to `0.10` makes the easing tail feel silkier. `syncTouch: true` is the biggest mobile win, making touch scroll match the Lenis curve instead of native rubber-band.

---

### 3. `components/ui/SpinningRound.tsx`

`mix-blend-difference` on the spinning badge's parent forces the browser to composite that element against every element below it on every scroll frame — it cannot be offloaded to the GPU compositor. This silently costs ~1ms per frame during scroll.

Replace with a plain white SVG fill (which reads well on both light and dark via `opacity-60`) and remove the blend mode:
```tsx
/* BEFORE */
className="size-32 rounded-full flex items-center justify-center bg-transparent mix-blend-difference opacity-80"

/* AFTER */
className="size-32 flex items-center justify-center bg-transparent opacity-60"
```
The text inside the SVG already uses `fill-white` — it will remain readable on both themes at reduced opacity.

---

## What is NOT changing
- GSAP hero intro blur animations (`filter: blur(10px)`) — these are one-shot on page load, not scroll-driven. No impact on scroll.
- `SiteMotion.tsx` — already RAF-debounced, architecture is correct.
- `AnimatedReveal.tsx` — already optimal (`will-change: "transform, opacity"`, `once: true`).
- `SpinningRound` scroll-driven rotation itself — `useTransform` driving a `rotate` is compositor-only (no repaint). Only the blend mode was the problem.

---

## Verification
1. `npm run dev`, open Chrome DevTools → Performance tab
2. Record a full-page scroll — check for dropped frames (red bars)
3. Confirm no blur flash on section reveals (should fade up cleanly)
4. On mobile/trackpad: scroll should feel silky with natural momentum
5. SpinningRound badge should still be visible and rotate — just without the blend mode glitch
