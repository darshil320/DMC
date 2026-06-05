# Implementation Plan: Analytics via GTM

## Overview

Add a full analytics stack to the DMC Tech portfolio (Next.js 16 App Router). The primary container is **Google Tag Manager (GTM)**, which manages GA4, Microsoft Clarity, and conversion tags without code deploys. Custom events are fired from the app via `window.dataLayer.push`, and Next.js Web Vitals are reported through a dedicated export.

---

## Analytics Stack

| Layer | Tool | Purpose |
|---|---|---|
| Container | Google Tag Manager | All tag management in one place |
| Primary analytics | Google Analytics 4 (via GTM) | Page views, sessions, conversions |
| Heatmaps | Microsoft Clarity (via GTM) | Scroll/click heatmaps |
| Search | Google Search Console | Organic search visibility |
| Performance | Next.js Web Vitals | CWV reporting to GA4 |

---

## Environment Variables Required

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX          # Google Tag Manager container ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX  # GA4 Measurement ID (for Web Vitals direct send)
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx        # Microsoft Clarity project ID (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxx # Already supported in lib/seo.ts
```

---

## Custom Events to Track

| Event Name | Trigger | Data |
|---|---|---|
| `contact_form_submit` | Form submit on `/contact` | `{method: "email"}` |
| `whatsapp_click` | WhatsApp CTA click on `/contact` | `{method: "whatsapp"}` |
| `pricing_tier_view` | Pricing section enters viewport | `{tier: "starter|catalog|ecommerce"}` |
| `demo_click` | Any "view demo" CTA click | `{demo: "ai-visualizer|furniture"}` |
| `ai_visualizer_generate` | Image generated in AI demo | `{success: true|false}` |
| `checkout_initiated` | Stripe checkout started (furniture demo) | `{product_name, price}` |
| `nav_cta_click` | Navbar contact CTA click | `{}` |
| `web_vitals` | Core Web Vitals report | `{name, value, rating, delta}` |

---

## Files to Create

### 1. `lib/analytics.ts`
Core analytics utilities — type-safe `dataLayer.push` wrapper + event helper functions.

```typescript
// Types
type GtmEventName = 
  | "contact_form_submit"
  | "whatsapp_click"
  | "pricing_tier_view"
  | "demo_click"
  | "ai_visualizer_generate"
  | "checkout_initiated"
  | "nav_cta_click"
  | "web_vitals"

interface GtmEvent {
  event: GtmEventName
  [key: string]: unknown
}

// Core push function
export function pushGtmEvent(payload: GtmEvent): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}

// Named helpers
export const analytics = {
  contactFormSubmit: () => pushGtmEvent({ event: "contact_form_submit", method: "email" }),
  whatsappClick: () => pushGtmEvent({ event: "whatsapp_click", method: "whatsapp" }),
  pricingTierView: (tier: string) => pushGtmEvent({ event: "pricing_tier_view", tier }),
  demoClick: (demo: string) => pushGtmEvent({ event: "demo_click", demo }),
  aiVisualizerGenerate: (success: boolean) => pushGtmEvent({ event: "ai_visualizer_generate", success }),
  checkoutInitiated: (productName: string, price: number) =>
    pushGtmEvent({ event: "checkout_initiated", product_name: productName, price }),
  navCtaClick: () => pushGtmEvent({ event: "nav_cta_click" }),
}
```

Add `window.dataLayer` type augmentation at bottom:
```typescript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
```

---

### 2. `components/analytics/GoogleTagManager.tsx`
Server component that renders the GTM `<script>` in `<head>` and the `<noscript>` iframe in `<body>`. Uses `next/script` with `strategy="afterInteractive"` for non-blocking load.

```tsx
// No "use client" — this is a Server Component
import Script from "next/script"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export function GTMScript() {
  if (!GTM_ID) return null
  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${GTM_ID}');`
      }}
    />
  )
}

export function GTMNoScript() {
  if (!GTM_ID) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0" width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}
```

---

### 3. `components/analytics/WebVitals.tsx` (`"use client"`)
Client component using `useReportWebVitals` from `next/web-vitals` to push CWV to the dataLayer. Mounts once at layout level.

```tsx
"use client"
import { useReportWebVitals } from "next/web-vitals"
import { pushGtmEvent } from "@/lib/analytics"

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    pushGtmEvent({
      event: "web_vitals",
      name: metric.name,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      rating: metric.rating,
      delta: metric.delta,
    })
  })
  return null
}
```

---

### 4. `hooks/useRouteAnalytics.ts` (`"use client"`)
Hook that fires a `page_view` event on every route change (handles SPA navigation in Next.js App Router).

```typescript
"use client"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { pushGtmEvent } from "@/lib/analytics"

export function useRouteAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    pushGtmEvent({
      event: "page_view",
      page_path: pathname,
      page_search: searchParams.toString(),
    })
  }, [pathname, searchParams])
}
```

---

### 5. `components/analytics/RouteAnalytics.tsx` (`"use client"`)
Thin component that calls `useRouteAnalytics()` — needed because hooks can't be called in Server Components. Wrapped in `<Suspense>` to avoid blocking because `useSearchParams` requires it.

```tsx
"use client"
import { Suspense } from "react"
import { useRouteAnalytics } from "@/hooks/useRouteAnalytics"

function Inner() {
  useRouteAnalytics()
  return null
}

export function RouteAnalytics() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}
```

---

## Files to Modify

### 6. `app/layout.tsx`
- Import and place `<GTMScript />` inside `<head>` (after theme init script)
- Import and place `<GTMNoScript />` as first child of `<body>`
- Import and place `<WebVitalsReporter />` inside `<body>` before `<ClientChrome>`

```tsx
// In <head>:
<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
<GTMScript />

// In <body>, before ClientChrome:
<GTMNoScript />
<WebVitalsReporter />
<ClientChrome>{children}</ClientChrome>
```

---

### 7. `components/layout/ClientChrome.tsx`
Add `<RouteAnalytics />` inside the JSX tree (after `<SiteMotion />`). This fires `page_view` on every client-side navigation.

```tsx
<ReactLenis root ...>
  <LenisResizer />
  <SiteMotion />
  <RouteAnalytics />   {/* ADD THIS */}
  {showDecorations && <CustomCursor />}
  ...
</ReactLenis>
```

---

### 8. `components/sections/contact-page.tsx`
- Import `analytics` from `@/lib/analytics`
- In `handleSubmit` (around line 203): call `analytics.contactFormSubmit()` on success
- On the WhatsApp href anchor (around line 195): add `onClick={() => analytics.whatsappClick()}`

```tsx
// handleSubmit success path:
analytics.contactFormSubmit()

// WhatsApp link:
<a href={whatsappHref} onClick={() => analytics.whatsappClick()} ...>
```

---

### 9. `components/layout/navbar.tsx`
Find the contact/CTA button and add `onClick={() => analytics.navCtaClick()}`.

---

### 10. `components/sections/pricing.tsx` (if exists)
Use `IntersectionObserver` or a `useEffect` with `analytics.pricingTierView(tier)` when pricing cards enter viewport.

---

## Implementation Steps

### Step 1 — Create `lib/analytics.ts`
Full type-safe analytics module with `pushGtmEvent` + `analytics` named helpers.
**Deliverable:** `lib/analytics.ts` complete with global Window type augmentation.

### Step 2 — Create GTM components
Create `components/analytics/GoogleTagManager.tsx` with `GTMScript` (head) and `GTMNoScript` (body) exports.
**Deliverable:** Two named exports ready to drop into `app/layout.tsx`.

### Step 3 — Create Web Vitals reporter
Create `components/analytics/WebVitals.tsx` using `useReportWebVitals`.
**Deliverable:** `WebVitalsReporter` client component.

### Step 4 — Create route analytics hook + component
Create `hooks/useRouteAnalytics.ts` and `components/analytics/RouteAnalytics.tsx` with Suspense wrapper.
**Deliverable:** `RouteAnalytics` component ready for `ClientChrome`.

### Step 5 — Modify `app/layout.tsx`
Inject GTM script and noscript, add WebVitalsReporter.
**Deliverable:** GTM loads on every page, web vitals report automatically.

### Step 6 — Modify `components/layout/ClientChrome.tsx`
Add `<RouteAnalytics />` for SPA route change tracking.
**Deliverable:** Every client-side route change fires `page_view`.

### Step 7 — Modify `components/sections/contact-page.tsx`
Fire `contact_form_submit` on form success, `whatsapp_click` on WhatsApp link click.
**Deliverable:** Contact conversions tracked in GTM/GA4.

### Step 8 — Modify navbar
Fire `nav_cta_click` on navbar contact CTA.
**Deliverable:** Top-of-funnel CTA click tracked.

### Step 9 — Document env vars
Create/update `.env.local.example` with all required analytics variables.
**Deliverable:** Clear documentation for deployment env setup.

---

## Key Files

| File | Operation | Description |
|---|---|---|
| `lib/analytics.ts` | Create | Core analytics utility |
| `components/analytics/GoogleTagManager.tsx` | Create | GTM script + noscript |
| `components/analytics/WebVitals.tsx` | Create | CWV → dataLayer reporter |
| `components/analytics/RouteAnalytics.tsx` | Create | SPA page_view tracker |
| `hooks/useRouteAnalytics.ts` | Create | Route change hook |
| `app/layout.tsx:103-108` | Modify | Inject GTM scripts |
| `components/layout/ClientChrome.tsx:85` | Modify | Add RouteAnalytics |
| `components/sections/contact-page.tsx:203` | Modify | Track form submit |
| `components/sections/contact-page.tsx:195` | Modify | Track WhatsApp click |
| `components/layout/navbar.tsx` | Modify | Track nav CTA click |
| `.env.local.example` | Create | Document env vars |

---

## Risks and Mitigation

| Risk | Mitigation |
|---|---|
| GTM_ID undefined → script renders with empty ID | Guard: `if (!GTM_ID) return null` |
| `useSearchParams` must be in Suspense | Wrap `RouteAnalytics` inner component in `<Suspense>` |
| `window.dataLayer` not defined yet | Initialize with `window.dataLayer = window.dataLayer ?? []` |
| Double page_view on initial load (GTM + code) | GTM handles first load; code fires on subsequent navigations only — acceptable, or use a `useRef` firstRender guard |
| Analytics fires in dev/preview | Acceptable; filter in GA4/GTM using `page_hostname` filters or `NEXT_PUBLIC_VERCEL_ENV` guard |

---

## SESSION_ID (for /ccg:execute use)
- CODEX_SESSION: N/A (Claude plan)
- GEMINI_SESSION: N/A (Claude plan)
