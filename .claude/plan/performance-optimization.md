# Implementation Plan: Performance Optimization

> Multi-model analysis: Backend (technical/bundle) + Frontend (UX/animation/paint)
> Both agents confirmed findings against actual source files.
> **Do not modify production code until reviewing this plan.**

---

## Task Type
- [x] Fullstack (affects bundle, rendering, CSS, animations, API)

## Expected CWV Improvement Summary

| Metric | Key Changes | Expected |
|--------|------------|---------|
| **LCP** | Steps 1+2 (loader/hero) + Step 7 (SSR) + Step 8 (font) | −1.5 to −3.5s |
| **TBT** | Steps 3+4 (bundle dedup + icons) + Step 6 (SiteMotion) + Step 7 | Large |
| **CLS** | Steps 5+7 (will-change + section heights) + Step 8 (font fallback) | → 0 |
| **INP** | Steps 5+6 (will-change + MutationObserver) + Step 9 (cursor) | Significant |

---

## Implementation Steps (Priority Order — Highest Impact First)

### Step 1 — Fix LCP: Decouple hero render from loader/animation
**Files**: `components/sections/hero.tsx`, `components/ui/brutalist-loader.tsx`
**Metrics**: LCP (−1.5–3.5s), FCP
**Effort**: Medium

**Problem confirmed**: Hero `useLayoutEffect` calls `gsap.set(baseLines, { autoAlpha: 0 })` before the loader fires `dmc:loader-complete`. The H1 headline starts invisible and waits behind the loader + 4200ms fallback. LCP candidate is off-screen until ~2–4.5s after navigation.

**Approach**:
```
// hero.tsx — progressive enhancement pattern
// 1. Remove gsap.set(…autoAlpha:0) as the default starting state.
//    Instead use gsap.from() so the element is VISIBLE in HTML first.
//    GSAP animates FROM hidden and returns to the natural state.

useLayoutEffect(() => {
  if (reduceMotion) return;
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.02 });
    // FROM (not SET+TO): element is visible if GSAP never runs
    tl.from(headlineLines, {
      autoAlpha: 0, clipPath: "inset(50% 0% 50% 0%)",
      filter: "blur(10px)", scale: 1.5, y: 40,
      duration: 0.82, stagger: 0.1, ease: "expo.out"
    }, 0);
    // … rest of fromTo chain unchanged in timing/easing
  }, sectionRef);
  return () => ctx.revert(); // replaces manual clearProps
}, []);

// 2. Shorten fallback timer from 4200ms to 1200ms max
- fallbackTimer = window.setTimeout(startIntro, 4200)
+ fallbackTimer = window.setTimeout(startIntro, 1200)
```

**Loader** (`brutalist-loader.tsx`):
```
// 1. Cap total visible time to ≤900ms
//    - Shorten interval or use a linear counter that hits 100 in ~600ms
//    - Reduce hold at 100% from 500ms → 150ms
//    - Exit animation (800ms) is fine, but fire dmc:loader-complete BEFORE exit starts

// 2. Respect prefers-reduced-motion: skip loader entirely
useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setLoading(false);          // instant skip
    signalLoaderComplete();     // unblock hero immediately
    return;
  }
  // ... existing interval logic, capped
}, []);

// 3. Dispatch dmc:loader-complete on animation EXIT START, not after
//    (move signalLoaderComplete from onExitComplete to onExitStart)

// 4. Fix overflow:hidden race with navbar scroll-lock
//    Both brutalist-loader.tsx and navbar.tsx write document.body.style.overflow
//    → Centralize into a ref-counted scroll-lock utility:
//      lockScroll() / unlockScroll() that tracks a depth counter
```

---

### Step 2 — Bundle: Deduplicate framer-motion + motion
**Files**: `package.json`, 9 component files
**Metrics**: TBT (−40–90KB gzip), LCP (less parse/execute)
**Effort**: Low

**Confirmed**: `framer-motion ^12.40.0` AND `motion ^12.40.0` both in `package.json`. They are the same library; keeping both ships two independent copies into the bundle graph.

**Files to migrate** (still importing `"framer-motion"`):
- `components/ui/encrypted-text.tsx`
- `components/Hero.tsx` ← also check if this file is dead (duplicate of `sections/hero.tsx`)
- `components/sections/our-work.tsx`
- `components/sections/process.tsx`
- `components/demo/uw-partners.tsx`
- `components/demo/uw-intro-v2.tsx`
- `components/demo/uw-cart-drawer.tsx`
- `components/ui/Marquee.tsx`
- `components/ui/AnimatedReveal.tsx`

**Approach**:
```
// 1. In each file above:
- import { motion, AnimatePresence } from "framer-motion"
+ import { motion, AnimatePresence } from "motion/react"

// 2. Remove from package.json:
- "framer-motion": "^12.40.0"

// 3. Reinstall to flatten the dependency tree:
rm -rf node_modules && npm install  (or bun install)

// 4. Audit components/Hero.tsx — if unused, delete it
```

---

### Step 3 — next.config.ts: Add missing optimizations
**Files**: `next.config.ts`
**Metrics**: TBT (icon barrel imports), repeat-visit LCP (cache headers), transfer size
**Effort**: Low

**Confirmed gaps**: No `compress`, `optimizePackageImports`, `headers`, or `productionBrowserSourceMaps`.

```typescript
// next.config.ts — additions
const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: [
      "motion",
      "@tabler/icons-react",  // barrel import — pulls thousands of modules otherwise
      "lucide-react",         // same
    ],
  },

  images: { /* keep existing config unchanged */ },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:all*(woff2|woff|ttf|otf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
```

---

### Step 4 — API route: Lazy-load AI SDKs
**Files**: `app/api/visualize/route.ts`
**Metrics**: Serverless cold start TTFB on `/api/visualize`
**Effort**: Low

**Confirmed**: `MODEL_MODE = "production"` uses only Replicate via raw `fetch`. Yet `@google/genai` and `@huggingface/inference` are statically imported at top-level (lines 3–4), bundling both heavy SDKs into the function for a code path that never calls them.

```typescript
// Remove static top-level imports:
- import { GoogleGenAI } from '@google/genai';
- import { HfInference } from '@huggingface/inference';

// Add dynamic imports inside each branch:
async function runGemini(...) {
  const { GoogleGenAI } = await import('@google/genai');
  // ... rest unchanged
}

async function runHuggingFace(...) {
  const { HfInference } = await import('@huggingface/inference');
  // ... rest unchanged
}

// Also: move MODEL_MODE to env so dead branches can be tree-shaken:
- const MODEL_MODE = "production"
+ const MODEL_MODE = (process.env.VISUALIZE_MODE as "gemini"|"huggingface"|"flux_pro"|"production") ?? "production"
```

---

### Step 5 — CSS: Scope will-change and fix universal selectors
**Files**: `app/globals.css`
**Metrics**: INP, GPU memory, TBT, CLS
**Effort**: Low

**Confirmed two problems**:

**(a) `will-change` on every off-screen reveal element (line 202)**: SiteMotion tags every `h2/h3/h4/p/li` across all 12 sections at once. Each element gets a GPU compositor layer + blur pass while completely off-screen. On a long marketing page = dozens of permanent layers.

```css
/* REMOVE will-change from the resting state */
[data-premium-motion="reveal"] {
  opacity: 0;
  filter: blur(6px);
  transform: translate3d(0, 18px, 0);
  transition: opacity 720ms ..., filter 720ms ..., transform 720ms ...;
  transition-delay: var(--motion-delay, 0ms);
  /* ← no will-change here */
}

/* ADD just-in-time hint: set in SiteMotion right before reveal */
[data-premium-motion="reveal"][data-motion-arming="true"] {
  will-change: opacity, filter, transform;
}
/* SiteMotion removes data-motion-arming on transitionend to free the layer */

/* Same treatment for: */
[data-premium-card="true"]  { /* remove will-change from resting state */ }
[data-premium-media="true"] { /* remove will-change from resting state */ }
```

**(b) `* { border-radius: 0 !important }` (line 121)**: Matches every element including SVGs and pseudo-elements; forces a full tree match on every style recalculation.

```css
/* Replace: */
- * { border-radius: 0 !important; }

/* With zero-specificity scoped variant (no !important needed): */
+ @layer base {
+   :where(*) { border-radius: 0; }
+ }
```

**(c) Universal transition-timing rule (lines 98–103)**:
```css
/* Remove the universal selector; premium-* rules define their own timing: */
- *, *::before, *::after { transition-timing-function: cubic-bezier(0,0,0,1); }
/* Apply only where actually used, or add to @layer base with :where(*) */
```

**(d) Remove `scroll-behavior: smooth` (line 72)** — Lenis already drives smooth scroll via lerp; the CSS rule causes double-handling on anchor jumps (scroll jumps happen at native speed, then Lenis fights it):
```css
- html { scroll-behavior: smooth; }
/* Lenis handles this; remove to avoid conflict */
```

---

### Step 6 — SiteMotion: Rework the body-wide MutationObserver
**Files**: `components/layout/SiteMotion.tsx`
**Metrics**: INP, TBT, dropped frames during scroll
**Effort**: Medium

**Confirmed**: `MutationObserver(document.body, { childList:true, subtree:true })` fires `prepare()` on every DOM mutation. `prepare()` runs 4× `querySelectorAll` over the entire document (lines 74–97). GSAP `clearProps`, Lenis animation ticks, EncryptedText 60fps span updates, and CustomCursor DOM writes all trigger this continuously.

**Two-phase approach**:

**Quick fix (Phase A)**:
```typescript
// SiteMotion.tsx

// 1. Scope observer to <main>, not document.body
- mutationObserver.observe(document.body, { childList: true, subtree: true });
+ const root = document.querySelector("main") ?? document.body;
+ mutationObserver.observe(root, { childList: true, subtree: true });

// 2. Bail early if mutations are only attribute changes (our own data-* writes)
const mutationObserver = new MutationObserver((mutations) => {
  if (mutations.every(m => m.type === "attributes")) return;
  if (frame) return;
  frame = window.requestAnimationFrame(prepare);
});

// 3. Use requestIdleCallback with rAF fallback instead of raw rAF:
const schedulePrepare = () => {
  if (frame) return;
  const schedule = window.requestIdleCallback ?? window.requestAnimationFrame;
  frame = schedule(() => { frame = 0; prepare(); });
};

// 4. In IntersectionObserver: set data-motion-arming="true" BEFORE
//    data-motion-visible to trigger the just-in-time will-change:
entry.target.dataset.motionArming = "true";
entry.target.dataset.motionVisible = "true";
// Remove arming after transition ends:
target.addEventListener("transitionend", () => {
  delete target.dataset.motionArming;
}, { once: true });
```

**Clean fix (Phase B, longer term)**: Replace SiteMotion's global DOM scanner with a `<Reveal>` wrapper component or `useReveal()` hook that elements opt into at render time. Zero DOM scanning, no MutationObserver needed. See: React `IntersectionObserver` hook pattern.

---

### Step 7 — Rendering: SSR static sections, add CLS guards
**Files**: `app/page.tsx`, individual section components
**Metrics**: LCP, TBT, CLS
**Effort**: Medium

**Confirmed**: All 12 sections use `dynamic()` with no `loading` prop and no reserved height. Static sections (no hooks/motion) don't need to be dynamic — they can be Server Components with zero client JS.

**Approach**:
```typescript
// page.tsx

// KEEP dynamic() only for sections with client interactivity:
// - AIVisualizerFeatureSection (heavy client state, file upload)
// - Any section importing motion/gsap with useState/useEffect

// For ALL dynamic imports, add height reservations:
const ServicesSection = dynamic(() => import("@/components/sections/services"), {
  loading: () => <div className="min-h-[80vh]" aria-hidden />,
});

// Audit each section — if no "use client" / no hooks → plain import:
import { ProblemSection } from "@/components/sections/problem";
import { TrustSection } from "@/components/sections/trust";
// etc.

// Use Suspense + streaming for below-fold code-split sections:
<Suspense fallback={<div className="min-h-[80vh]" />}>
  <OurWorkSection />
</Suspense>
```

**Section audit checklist** (read each file for "use client" / hooks / motion):
- `about.tsx` — likely static → plain import
- `problem.tsx` — likely static → plain import
- `services.tsx` ← opened in IDE
- `trust.tsx` — likely static → plain import
- `final-cta.tsx` — likely static → plain import
- `featured-offer.tsx` — check for motion
- `process.tsx` — check for motion
- `pricing.tsx` — check for motion
- `our-work.tsx` — check for motion
- `demo-preview.tsx` — check for interactivity
- `ai-visualizer-feature.tsx` → keep dynamic (heavy client)
- `contact-page.tsx` → keep dynamic (form state)

---

### Step 8 — Fonts: Preload strategy + fix Offbittrial 101
**Files**: `app/layout.tsx`, `app/globals.css`
**Metrics**: LCP (font swap delay), CLS (font reflow)
**Effort**: Medium

**Confirmed issues**:
- `"Offbittrial 101"` referenced in `globals.css` lines 108, 134 and used for section tags + `.font-pixel` but is NOT loaded via `next/font` — silently falls back to Arial
- `"SF Pro Display"` referenced line 188 — system font only, no web font, fine but not intentional
- Hero uses `var(--font-body)` = `var(--font-inter)` → correct, Inter is loaded
- All 3 Google fonts use `display: swap` with no `adjustFontFallback` override

```typescript
// layout.tsx

// 1. Only preload the font used by the LCP element (hero H1 = Inter)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,           // ← explicit (default is true, but be intentional)
  adjustFontFallback: true, // size-adjust + ascent-override to reduce CLS
});

// 2. Don't preload non-LCP fonts (they don't need to compete for the
//    critical request budget):
const dotGothic = DotGothic16({ ..., preload: false });
const instrumentSerif = Instrument_Serif({ ..., preload: false });

// 3. Load Offbittrial 101 via next/font/local:
import localFont from "next/font/local";
const offbit = localFont({
  src: "../public/fonts/Offbittrial101.woff2",
  variable: "--font-pixel",
  display: "swap",
  preload: false,   // only used for section tags below fold
});
// Add offbit.variable to <html> className
```

```css
/* globals.css — use the CSS variable instead of bare name */
- font-family: 'Offbittrial 101', Arial, sans-serif;
+ font-family: var(--font-pixel, Arial, sans-serif);
```

**Note**: You need the `Offbittrial101.woff2` file in `/public/fonts/`. If you don't have the font file, use `display: "swap"` with Arial fallback and accept it as intentional (remove the reference).

---

### Step 9 — ClientChrome: Scope SessionProvider + gate Lenis
**Files**: `components/layout/ClientChrome.tsx`
**Metrics**: TBT, bundle size, INP (Lenis RAF for reduced-motion users)
**Effort**: Low

**Confirmed**: `SessionProvider` (next-auth) wraps entire app including static marketing pages — ships auth JS to every visitor. Lenis also not gated by `prefers-reduced-motion`.

```typescript
// ClientChrome.tsx

// 1. Remove SessionProvider from the marketing-page wrapper.
//    Only add it to routes that need auth (e.g. /dashboard layout).
- <SessionProvider>
-   <ReactLenis root ...>
+ <ReactLenis root ...>
    ...
- </SessionProvider>

// 2. Gate Lenis by prefers-reduced-motion:
export function ClientChrome({ children }: { children: React.ReactNode }) {
  const showDecorations = useDesktopDecorations();
  const [smoothScroll, setSmoothScroll] = useState(false);
  
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSmoothScroll(!reducedMotion.matches);
  }, []);

  const content = (
    <ThemeProvider>
      <SiteMotion />
      {showDecorations && <CustomCursor />}
      {showSpinningRound && <SpinningRound />}
      {children}
    </ThemeProvider>
  );

  return smoothScroll
    ? <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <LenisResizer />
        {content}
      </ReactLenis>
    : content;   // native scroll for reduced-motion
}
```

---

### Step 10 — Interactions: Cursor, navbar hover, EncryptedText
**Files**: `components/ui/CustomCursor.tsx`, `components/layout/navbar.tsx`, `components/ui/encrypted-text.tsx`
**Metrics**: INP (hover responsiveness)
**Effort**: Low–Medium per item

**(a) CustomCursor** — `mouseover` fires `closest("a")` + `closest("button")` on every pointer enter:
```typescript
// Replace mouseover traversal with event delegation on document.body
// or use CSS data-attributes set declaratively on interactive elements
// Motion values for position already bypass React render — keep that.
// Only change: replace mouseover → css :has() or pointer data-attrs
```

**(b) Navbar crop marks** (`navbar.tsx`) — `useState(isHovered)` re-renders the link component + mounts/unmounts 4 divs on every hover:
```tsx
// Replace JS hover state with CSS group-hover:
- const [isHovered, setIsHovered] = useState(false);
+ // Remove state entirely; use Tailwind group:
<a className="group ...">
  {/* Crop marks: always rendered, toggled by CSS */}
  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  {/* ... 3 more corners */}
  <span className="group-hover:text-accent-lime text-white/40 ...">{item.num}</span>
  <span className="group-hover:text-white group-hover:font-bold text-white/60 ...">{item.label}</span>
</a>
```

**(c) EncryptedText re-renders** (`encrypted-text.tsx`) — calls `setFrame()` every rAF tick, re-rendering all character spans via React state:
```typescript
// Option A (quick): Write characters directly to DOM via ref instead of setState
// useRef<HTMLSpanElement[]> for each character slot, write textContent in rAF
// No React reconciliation during animation

// Option B (medium): Gate with debounced hover to avoid restart on rapid passes
// hero.tsx: instead of key={hoverKey} increment, expose a play() method via ref
```

---

### Step 11 — prefers-reduced-motion: Fill coverage gaps
**Files**: `components/ui/brutalist-loader.tsx`, `components/layout/navbar.tsx`, `components/ui/SpinningRound.tsx`
**Metrics**: Accessibility + INP
**Effort**: Low

**Confirmed gaps** (motion already handled in hero.tsx:24, SiteMotion.tsx:50):
- `brutalist-loader.tsx` — covered in Step 1 above
- `navbar.tsx:251` — infinite rotation stamp: gate with `useReducedMotion` or CSS media query
- `SpinningRound.tsx` — scroll-driven rotation: gate or render static

```tsx
// navbar.tsx — infinite stamp rotation
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
<motion.div
  animate={prefersReducedMotion ? {} : { rotate: 360 }}
  transition={prefersReducedMotion ? {} : { duration: 12, repeat: Infinity, ease: "linear" }}
>
```

```css
/* globals.css — fallback: hide any leaking blur/opacity under reduced-motion */
@media (prefers-reduced-motion: reduce) {
  [data-premium-motion="reveal"] {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## Key Files Summary

| File | Steps | Operation |
|------|-------|-----------|
| [components/sections/hero.tsx](components/sections/hero.tsx) | 1 | Switch gsap.set→from, shorten fallback timer |
| [components/ui/brutalist-loader.tsx](components/ui/brutalist-loader.tsx) | 1, 11 | Cap to 900ms, reduced-motion skip, fix overflow race |
| [package.json](package.json) | 2 | Remove framer-motion |
| 9 component files | 2 | Migrate imports to motion/react |
| [next.config.ts](next.config.ts) | 3 | optimizePackageImports, compress, headers |
| [app/api/visualize/route.ts](app/api/visualize/route.ts) | 4 | Dynamic import AI SDKs, env MODE |
| [app/globals.css](app/globals.css) | 5 | Scope will-change, fix universal selectors, remove scroll-behavior |
| [components/layout/SiteMotion.tsx](components/layout/SiteMotion.tsx) | 6 | Scope MutationObserver, just-in-time will-change arming |
| [app/page.tsx](app/page.tsx) | 7 | Audit static sections, add loading heights |
| [app/layout.tsx](app/layout.tsx) | 8 | Font preload strategy, add Offbittrial via localFont |
| [components/layout/ClientChrome.tsx](components/layout/ClientChrome.tsx) | 9 | Remove SessionProvider, gate Lenis |
| [components/layout/navbar.tsx](components/layout/navbar.tsx) | 10, 11 | CSS hover, reduced-motion on stamp |
| [components/ui/CustomCursor.tsx](components/ui/CustomCursor.tsx) | 10 | Replace mouseover with delegation |
| [components/ui/encrypted-text.tsx](components/ui/encrypted-text.tsx) | 10 | DOM ref writes instead of setState |

## Risks and Mitigation

| Risk | Mitigation |
|------|-----------|
| Hero text flashes before GSAP loads (gsap.from approach) | Flash is intentional — text visible = correct LCP. Add `data-hero-preload` CSS to keep text styled without animation (opacity:1, no clip). |
| Removing framer-motion breaks imports | Run `grep -r "framer-motion"` before and after migration to confirm all 9 files migrated |
| Offbittrial font file not available | Use `display:"optional"` fallback or remove reference; confirm with client |
| SessionProvider removal breaks auth | Audit all routes for `useSession()` / `getServerSession()` before removing |
| SiteMotion MutationObserver change misses dynamic content | Test on all routes with dynamic injection; the pathname-change re-run covers navigation |
| `will-change` removal causes jank on slower devices | Monitor with DevTools Performance panel; the `data-motion-arming` pattern restores it just-in-time |

---

## SESSION_IDs (for /ccg:execute use)
- CODEX_SESSION: a63c250242bc2e1f1 (backend/technical analysis agent)
- GEMINI_SESSION: adf0161671620888d (frontend/UX analysis agent)
