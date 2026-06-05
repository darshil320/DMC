# DMC Tech — Portfolio Site

**Agency:** Digital Market Creators (DMC) | **Domain:** www.dmctech.in | **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 (App Router)

## What This Project Is
Marketing + portfolio site for DMC Tech — a web agency based in Ahmedabad, India that builds websites, ecommerce stores, and AI visualizers for local businesses. The site itself is both the agency's homepage and a live demo vehicle (it hosts full working demos for clients to see).

---

## Brand Config (`lib/dmc-config.ts`)
```ts
DMC = { name: "DMC", fullName: "Digital Market Creators", email: "hey@dmctech.in",
  whatsappNumber: "+91 94265 29230", domain: "www.dmctech.in", location: "Ahmedabad, India",
  pricing: { starter: 90000, catalog: 150000, ecommerce: 300000, maintenance: 15000 } }

URBANWOOD = { name: "UrbanWood Furniture", tagline: "Premium Furniture for Modern Homes", location: "Ahmedabad" }
```

---

## Pages & Routes
| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Main marketing homepage |
| `/contact` | `app/contact/page.tsx` | Contact form |
| `/demo/ai-visualizer` | `app/demo/ai-visualizer/page.tsx` | AI room visualizer demo |
| `/demo/furniture-concept-2.0` | `app/demo/furniture-concept-2.0/page.tsx` | Full furniture ecommerce demo (UrbanWood) |
| `/demo/furniture-concept-2.0/success` | `app/demo/furniture-concept-2.0/success/page.tsx` | Post-purchase success |

**API Routes** (`app/api/`):
- `auth/[...nextauth]/route.ts` — NextAuth.js authentication
- `checkout/route.ts` — Stripe checkout session creation
- `visualize/route.ts` — AI room visualization (Google GenAI + Hugging Face + Replicate)

---

## Homepage Section Order (`app/page.tsx`)
1. `HeroSection` → `components/sections/hero.tsx`
2. `AboutUsSection` → `components/sections/about.tsx`
3. `OurWorkSection` → `components/sections/our-work.tsx`
4. `DemoPreviewSection` → `components/sections/demo-preview.tsx`
5. `AIVisualizerFeatureSection` → `components/sections/ai-visualizer-feature.tsx`
6. `ServicesSection` → `components/sections/services.tsx`
7. `FeaturedOfferSection` → `components/sections/featured-offer.tsx`
8. `ProcessSection` → `components/sections/process.tsx`
9. `PricingSection` → `components/sections/pricing.tsx`
10. `ProblemSection` → `components/sections/problem.tsx`
11. `TrustSection` → `components/sections/trust.tsx`
12. `FinalCtaSection` → `components/sections/final-cta.tsx`

All sections below Hero are loaded via `next/dynamic` with `SectionPlaceholder` skeletons.

---

## Component Map
```
components/
  layout/       navbar.tsx, footer.tsx, ClientChrome.tsx (wraps theme + lenis scroll)
  sections/     (page sections — see list above, plus contact-page.tsx)
  demo/         uw-*.tsx — UrbanWood furniture demo (20+ components)
  ui/           reusable primitives (button, card, badge, sheet, dialog, etc.)
                custom: AnimatedReveal, BrutalistLoader, CustomCursor, Marquee,
                        EncryptedText, SpinningRound, SectionLabel, LinkArrow, ThinArrow
  seo/          json-ld.tsx — structured data injector
```

---

## Design System (`app/globals.css`)
**Aesthetic:** Brutalist / NVRMND. Uppercase tracking, harsh borders, grid lines.

**Fonts:**
- `--font-display` = DotGothic16 (monospace brutalist) → `font-display` class
- `--font-body` = Inter → `font-sans` class
- `--font-instrument-serif` = Instrument Serif (serif accents)

**CSS Tokens (light mode → dark "Warm Espresso"):**
| Token | Light | Dark |
|---|---|---|
| `--bg-page` | `#D9D9D9` | `#0C0A08` |
| `--bg-card` | `#E5E5E5` | `#141210` |
| `--text-primary` | `#000000` | `#F0EBE3` |
| `--text-secondary` | `#333333` | `#9B9189` |
| `--accent` | `#0000FF` (blue) | `#C4622D` (terracotta) |
| `--accent-lime` | `#CCFF00` | `#F2E4D0` |
| `--border-harsh` | `#000000` | `rgba(240,220,200,0.18)` |

**Dark mode:** class-based (`.dark` on `<html>`). Toggle via `useTheme()` from `lib/theme.tsx`. Persisted in `localStorage("dmc-theme")`. Theme init script in `app/layout.tsx` prevents flash.

**UrbanWood Demo Tokens** (separate palette, prefix `--uw-`): bg `#F4F1ED`, text `#2C2A26` — warm parchment aesthetic.

---

## Key Libraries
| Package | Purpose |
|---|---|
| `motion` (v12) | Animations (Framer Motion v12 API) |
| `gsap` + `lenis` | Scroll animations + smooth scroll |
| `@google/genai` | Google Gemini AI (visualizer) |
| `@huggingface/inference` | HF models (visualizer) |
| `stripe` + `@stripe/stripe-js` | Payments |
| `next-auth` v4 | Authentication |
| `zustand` v5 | Cart state (`lib/store/useCart.ts`) |
| `@base-ui/react` | Headless UI primitives |
| `@tabler/icons-react` + `lucide-react` | Icons |
| `geist` | Geist font (available but not primary) |

---

## Lib Files
| File | What It Does |
|---|---|
| `lib/dmc-config.ts` | Brand constants, pricing — **source of truth** |
| `lib/seo.ts` | `createSeoMetadata()`, JSON-LD helpers, `SITE_URL`, keywords |
| `lib/content.ts` | Homepage section content data |
| `lib/uw-content.ts` | UrbanWood demo products (`PRODUCTS` array) |
| `lib/theme.tsx` | `ThemeProvider` + `useTheme()` hook |
| `lib/utils.ts` | `cn()` classname utility |
| `lib/store/useCart.ts` | Zustand cart store for furniture demo |

---

## SEO Setup (`lib/seo.ts`)
- `SITE_URL = "https://www.dmctech.in"`
- JSON-LD helpers: `organizationJsonLd()`, `websiteJsonLd()`, `serviceCatalogJsonLd()`, `webPageJsonLd()`, `aiVisualizerJsonLd()`, `breadcrumbJsonLd()`
- OG image: `/opengraph-image` (dynamic, `app/opengraph-image.tsx`)
- Twitter card: `app/twitter-image.tsx`
- Sitemap: `app/sitemap.ts` | Robots: `app/robots.ts` | Manifest: `app/manifest.ts`
- Geo meta: `IN-GJ` / Ahmedabad, Gujarat

---

## Nav Links
`01 HOME` → `/` | `02 SERVICES` → `/#services` | `03 WORK` → `/#work` | `04 AI STUDIO` → `/#ai` | `05 CONTACT` → `/contact`

---

## Naming Conventions
- Page sections: `PascalCase + Section` suffix, named export (e.g. `export function HeroSection`)
- Demo components: `uw-` prefix file, `UW` prefix export (e.g. `UWHeroV2`)
- UI primitives: lowercase-kebab filename, PascalCase export
- All section files: `components/sections/*.tsx`

---

## Performance Patterns
- All non-hero sections lazy-loaded via `next/dynamic` with `SectionPlaceholder` fallback
- `next.config.ts`: `optimizePackageImports` for motion, tabler, lucide; AVIF/WebP images; long-term cache headers
- `BrutalistLoader` component handles page entry animation (`components/ui/brutalist-loader.tsx`)
- `InlineGridOverlay` renders subtle vertical grid lines (pure CSS, no JS)

---

## Current WIP / Recent Changes
- SEO overhaul: new `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `components/seo/`
- Pricing section updated with currency formatting (`components/sections/pricing.tsx`)
- Furniture Concept 2.0 demo: theme variables + header demo updates
- Contact page: removed framer-motion, now uses theme tokens
- Navbar: `components/layout/navbar.tsx` (not the old `components/Header.tsx` — old file still exists but is legacy)
