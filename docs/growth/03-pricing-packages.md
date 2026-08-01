# Pricing Packages — redesigned copy + structure

Replaces the current homepage `PricingSection` ([components/sections/pricing.tsx](components/sections/pricing.tsx))
and becomes the basis of a dedicated `/pricing` page.

---

## What's wrong with the current section

1. **Two of three tiers say "Custom Scope".** A visitor can self-identify their tier, then learns
   nothing. That is the "contact us for everything" failure the brief calls out.
2. **Section tag says `OUR SERVICES`** on the *pricing* section, while an actual services section
   exists above it. Both compete for the same query.
3. **H2 is `THREE OPTIONS. ONE GOAL.`** — no keyword, no information.
4. **Tier names are abstract**: "Digital Presence", "Business Intelligence", "Complete OS". A
   furniture-shop owner and a CTO both have to *decode* these. The 10-second self-identification
   test fails.
5. **One CTA text for all three tiers** ("Discuss this scope") pointing at the same `/contact` page
   with no tier context carried over.
6. **No "what's not included"**, no maintenance price, no payment terms — the three things that
   actually stall a decision.

---

## Prices need your sign-off

Confirmed from [lib/dmc-config.ts](lib/dmc-config.ts): starter ₹90,000 · catalog ₹1,50,000 ·
ecommerce ₹3,00,000 · maintenance ₹15,000/mo.

Everything above ₹3L is currently unpriced in the codebase. The numbers marked **`[CONFIRM]`** below
are proposals built to be internally consistent with your existing anchors and your stated
timelines — they are not derived from your delivery costs, which I don't have. **Do not ship them
without checking them against your actual margins.**

---

## The four tiers

Design rule: every tier answers *who is this for* in one line before it says anything about features.

---

### 01 — LAUNCH
**From ₹90,000 · 2–3 weeks**

> **For:** a business that needs to exist properly online — a real site, found on Google, that turns
> visitors into enquiries.

**You get**
- Custom-designed website, up to 6 pages (no templates)
- Mobile-first build, tested on real devices
- Enquiry form + WhatsApp button wired to your phone
- Google Business Profile setup and on-page SEO
- Basic analytics so you can see where enquiries come from
- 30 days of post-launch fixes

**Not included:** online payments, logins, inventory, custom dashboards.

**CTA:** `Start a Launch project →` (form pre-filled: tier = Launch)

---

### 02 — CATALOG & COMMERCE
**From ₹3,00,000 · 4–6 weeks**
*(Catalog-only, without payments: from ₹1,50,000)*

> **For:** a business that sells products and wants customers to browse, price, and buy — or enquire
> — without a phone call first.

**You get**
- Everything in Launch
- Full product catalog: search, filters, variants, live pricing
- Payments: UPI, cards, net banking
- Order dashboard + inventory management
- Automated order confirmations and delivery updates
- Meta / Google lead-ad integration into one enquiry inbox

**Not included:** multi-branch stock sync, ERP integration, custom staff workflows.

**CTA:** `Price my store →`

---

### 03 — BUSINESS SYSTEM
**From ₹6,00,000 `[CONFIRM]` · 8–12 weeks**

> **For:** a business running on WhatsApp groups and spreadsheets, losing leads between the enquiry
> and the sale.

**You get**
- Custom CRM: leads from Instagram, Facebook, Google, WhatsApp, and walk-ins in one pipeline
- Auto-assignment to salespeople + automated follow-up triggers
- AI WhatsApp assistant trained on your real catalog and pricing (English / Hindi / Gujarati)
- Sales dashboard: pipeline, source attribution, staff performance, conversion rates
- Integration with your existing tools (billing, Tally, Meta lead ads, payment gateway)
- Team training + 60 days of hypercare

**Not included:** manufacturing/production modules, multi-branch ERP, biometrics.

**CTA:** `Book a systems call →`

---

### 04 — ENTERPRISE / CUSTOM
**Custom quote · typically ₹15,00,000+ `[CONFIRM]` · 12+ weeks, phased**

> **For:** multi-branch, multi-team operations that need one system connecting showroom, workshop,
> supply chain, and back office.

**You get**
- A scoping engagement first — you get an architecture document and a phased plan you own,
  whether or not you build with us
- Custom ERP modules: production, workshop tracking, supplier POs, GST billing, logistics
- Multi-branch data sync and role-based access
- Showroom intelligence: consent-based face recognition, repeat-customer alerts, visit history
  (DPDPA-compliant)
- Dedicated engineering team, sprint cadence, written SLA
- Source code and infrastructure in your accounts from day one

**Why we still quote this one:** at this size the price depends on how many systems you already
have and how badly they talk to each other. The scoping engagement is fixed-fee `[CONFIRM]` and
tells you the number before you commit to the build.

**CTA:** `Request a scoping call →`

---

## Cross-tier bar (place directly under the four tiers)

Every project, every tier:

| | |
|---|---|
| **Maintenance** | ₹15,000/month — updates, monitoring, fixes, priority WhatsApp support. Optional, cancel anytime. |
| **Payment terms** | 40% to start, 40% at build milestone, 20% on launch `[CONFIRM]` |
| **Ownership** | Code, data, domains, and cloud accounts are yours. 100% IP & code ownership, zero recurring platform fees. |
| **Reply time** | Within 24 hours, every time. |
| **Where we build** | Ahmedabad. Delivered across India. |

That table is also the highest-value **GEO block on the site** — it is dense, factual, and
quotable. Mark it up with `Offer` + `priceSpecification` (see audit A2).

---

## Section structure (replaces the current layout)

```
┌─ section#pricing ────────────────────────────────────────────┐
│  tag:  PRICING                          ← not "OUR SERVICES" │
│  h2:   What custom software costs with us                    │
│  lede: 40–60 word answer-first paragraph (below)             │
│                                                              │
│  ┌────────┬────────┬────────┬────────┐   ← 4 cards, not rows │
│  │ LAUNCH │CATALOG │ SYSTEM │ ENTER- │      each: for-line   │
│  │ ₹90k+  │ ₹3L+   │ ₹6L+   │ PRISE  │      price, timeline, │
│  │ 2–3wk  │ 4–6wk  │ 8–12wk │ quote  │      5 bullets, CTA   │
│  └────────┴────────┴────────┴────────┘                       │
│                                                              │
│  [ cross-tier bar: maintenance · terms · ownership · reply ] │
│                                                              │
│  Not sure which fits?  → 3-question quiz  (not WhatsApp)     │
└──────────────────────────────────────────────────────────────┘
```

Keep the brutalist treatment — harsh borders, no rounded corners, accent rail on hover. Four
columns collapse to 2×2 on tablet, single column on mobile with the tier the visitor is most likely
to want (Launch) first.

**Answer-first lede** (this is the paragraph AI engines will quote):

> A custom website with DMC Tech starts at ₹90,000 and ships in 2–3 weeks. An ecommerce store with
> payments and inventory starts at ₹3,00,000 in 4–6 weeks. A full business system — CRM, AI
> WhatsApp assistant, and sales dashboard — starts at ₹6,00,000 in 8–12 weeks. Maintenance is
> ₹15,000/month and optional. You own the code.

---

## Implementation notes

- Move `OPTIONS` out of the component into `lib/pricing.ts` as a typed `PRICING_TIERS` const, so the
  same array feeds: the section, the `/pricing` page, `Offer` JSON-LD, `/llms.txt`, and the intent
  quiz's routing table. One source of truth — same pattern `FAQ_ITEMS` already uses.
- Add `startingPrice: number | null` and `slug` to each tier so the CTA can deep-link
  `/contact?tier=business-system` and the form pre-selects.
- Fire `analytics.pricingTierView(tier)` on card intersection — the event already exists in
  [lib/analytics.ts](lib/analytics.ts) and is currently never called.
- Keep `formatPrice()` — the `en-IN` Intl formatting is correct.
