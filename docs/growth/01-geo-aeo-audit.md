# GEO / AEO Audit — dmctech.in

Audited 2026-08-01 against the code in this repo (not a live crawl).
Scope: `app/`, `components/sections/`, `lib/seo.ts`, `lib/content.ts`, `app/llms.txt/route.ts`.

---

## Executive summary

The technical SEO floor is **already good** — better than most agency sites. Metadata factory,
JSON-LD injector, sitemap, robots, OG/Twitter images, `llms.txt`, lazy sections, `metadataBase`
are all present and correct.

The gaps are not technical. They are **content-shaped**:

1. **Nothing on the site is quotable.** Every page is styled marketing copy (`THREE OPTIONS. ONE
   GOAL.`, `READY TO BUILD?`). AI answer engines cite *fact-dense declarative sentences with
   numbers*. The only place on the whole site where that exists is the FAQ block and `llms.txt`.
2. **Zero informational surface.** No guides, no blog, no comparison pages. A generative engine
   answering "how much does custom software development cost in India" has no DMC page to cite,
   because no DMC page answers that question in prose.
3. **Pricing is half-hidden.** Two of three homepage tiers say "Custom Scope". That kills both
   conversion *and* citation — an engine cannot quote a price you did not publish.
4. **Trust signals are structurally absent.** No `Review`, no `AggregateRating`, no named client
   attribution in schema, no author/founder entity. E-E-A-T is carried entirely by four stat tiles.
5. **Positioning mismatch.** The brief says "businesses of all sizes and industries". The site says
   Ahmedabad SMB / local business. Keyword and schema strategy currently target only the SMB tier.

---

## Findings

Severity: **P0** ship this week · **P1** this month · **P2** backlog.

### A. Structured data

| # | Sev | Finding | Where |
|---|---|---|---|
| A1 | P0 | `priceRange: "INR"` is invalid. schema.org expects a currency-symbol band (`"₹₹₹"`) or a range (`"₹90000-₹2500000"`). Currently emits a meaningless token. | [lib/seo.ts:133](lib/seo.ts#L133) |
| A2 | P0 | `makesOffer` entries carry **no `priceSpecification`**. This is the single highest-leverage GEO fix on the site: prices in schema are what AI engines quote when asked "what does X cost". | [lib/seo.ts:154-197](lib/seo.ts#L154-L197) |
| A3 | P0 | No `Review` / `AggregateRating` anywhere. Three testimonials exist in `lib/content.ts` but are unused and — see D1 — appear to be placeholders. | [lib/content.ts:100](lib/content.ts#L100) |
| A4 | P1 | No `Person` entity for the founder, no `founder` property on the `ProfessionalService`. Author/expertise signal is the weakest part of E-E-A-T here. | [lib/seo.ts:119](lib/seo.ts#L119) |
| A5 | P1 | Case studies on `/work` have no `Article` / `CreativeWork` / `Project` markup. The richest proof content on the site is invisible to structured parsers. | [app/work/page.tsx](app/work/page.tsx) |
| A6 | P1 | `serviceCatalogJsonLd()` emits 14 bare `Service` names with no `description`, no `offers`, no `serviceOutput`. Names alone are not citable. | [lib/seo.ts:241](lib/seo.ts#L241) |
| A7 | P2 | No `WebSite.potentialAction` (SearchAction) — minor, only matters once there is a site search. | [lib/seo.ts:201](lib/seo.ts#L201) |
| A8 | P2 | `ProfessionalService` is a reasonable type but `Organization` + `ProfessionalService` split (`@id` referenced org vs. local business) would let you carry both `areaServed` breadth and local NAP. | [lib/seo.ts:119](lib/seo.ts#L119) |

### B. Answer-first content structure

| # | Sev | Finding |
|---|---|---|
| B1 | P0 | **No direct-answer paragraph on any page.** Every page opens with a stylised headline and an abstract sub-line ("We architect custom digital operating systems for businesses that need to scale"). There is no 40–60 word paragraph stating what DMC does, for whom, at what price, in what timeline. That paragraph is the unit AI engines extract. |
| B2 | P0 | **No informational pages at all.** Site is 100% commercial-intent. Nothing targets "how long does an MVP take", "agency vs freelancer vs in-house", "what does custom software cost in India". This is the largest missed GEO surface — see the keyword doc. |
| B3 | P1 | FAQ covers 13 questions, all local-SMB-website flavoured. Missing every mid-market and enterprise buyer question (integration, data ownership, security, SLA, handover, team composition, contract model). |
| B4 | P1 | The homepage `<h1>` is `sr-only` and 88 chars of keyword string. It is crawlable, but there is no visible H1 text for an extractor to anchor on, and the animated lines are `aria-hidden`. Legitimate technique, but it means the page's most prominent text is invisible to text-only parsers. |
| B5 | P1 | Heading order breaks in DOM: `our-work.tsx` renders `<h3>` at line 132 and 204 *before* its `<h2>` at line 238. Same class of issue elsewhere. Fix ordering, not just levels. |
| B6 | P2 | Pricing section H2 is `THREE OPTIONS. ONE GOAL.` — zero keyword, zero information. Its section tag also says `OUR SERVICES`, duplicating the actual services section. |

### C. Crawl / technical

| # | Sev | Finding |
|---|---|---|
| C1 | P0 | **`/topaz-crm` is orphaned.** [app/topaz-crm/page.tsx](app/topaz-crm/page.tsx) exports no `metadata` — no title, no description, no canonical — and is absent from [app/sitemap.ts](app/sitemap.ts). It inherits the root title, so it competes with the homepage. Either give it real metadata + sitemap entry, or `noIndex` it. |
| C2 | P1 | `SITE_TITLE` is 76 chars — truncates in SERP at ~60. Same for `/services` (79 chars). |
| C3 | P1 | `<html lang="en">` should be `en-IN` to match `inLanguage: "en-IN"` in the JSON-LD and the `en_IN` OG locale. Currently inconsistent. |
| C4 | P1 | `/llms.txt` omits `/topaz-crm`. Add it, and add an `llms-full.txt` carrying full service + pricing prose (this is cheap and directly feeds crawlers that honour it). |
| C5 | P2 | `robots.ts` `disallow: ["/api/"]` is right, but there is no explicit allow for AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`). Default-allow works today; an explicit allow block is a cheap statement of intent and survives future default changes. |
| C6 | P2 | Sitemap has no `/llms.txt`, and `changeFrequency`/`priority` are largely ignored by Google — harmless, leave them. |
| C7 | P2 | Keyword `<meta>` is emitted for every page (`BASE_KEYWORDS` + page keywords). Ignored by Google since 2009. Harmless, but it costs bytes on every page. |

### D. Trust, E-E-A-T, and one liability

| # | Sev | Finding |
|---|---|---|
| D1 | **P0 / liability** | `lib/content.ts` contains a `work` array (Northline Education, Rebel Copy Co., Forma Creative) and a `testimonials` array (Aarav Mehta, Maya Kapoor, Rhea Shah) that read as **placeholder/fictional**, complete with stock Unsplash imagery. They are not currently rendered on the homepage — verify that. If any of this reaches production it is a fabricated-client claim: an E-E-A-T disaster if caught, and it poisons any `Review` schema built on top of it. **Recommendation: delete both arrays or replace with real, named, permissioned clients (Topaz, Welcome Palace, Lyfe9).** |
| D2 | P1 | Real proof exists — Topaz Furniture, Welcome Palace, Lyfe9 — but is buried inside `/work` prose with no schema, no named-client attribution, no outcome statements. |
| D3 | P1 | Trust stats (`100% ENGINEERED IN-HOUSE`, `24h REPLY TIME`, `₹0 HIDDEN FEES`, `100% CODE OWNERSHIP`) are process claims, not outcome claims. Honest and on-brand — keep them — but they carry no citation value. Pair them with one verifiable outcome per case study. |
| D4 | P2 | No logo wall, no "clients we build for" strip near any CTA. |

### E. Lead capture (technical defects that lose money)

| # | Sev | Finding |
|---|---|---|
| E1 | **P0** | [components/sections/contact-page.tsx:223](components/sections/contact-page.tsx#L223) posts to a Google Apps Script with `mode: "no-cors"`. An opaque response **always resolves**, including on a 500 or a revoked deployment. The `catch` branch can therefore never fire for a server error, and the form shows "Sent Successfully" for a lead that was never stored. Silent lead loss with no alarm. |
| E2 | P0 | The Apps Script endpoint URL is hardcoded in a client component. Move it to `NEXT_PUBLIC_*` at minimum, better: proxy through an `app/api/enquiry/route.ts` so you get server-side validation, real status codes, and the ability to swap sinks. |
| E3 | P1 | Zero input validation. No Zod schema, no length caps, no honeypot, no rate limit. A public POST sink with none of these will collect spam. |
| E4 | P1 | Enquiry is only reachable from `/contact`. There is no inline form on the homepage, services page, or any pricing tier. Every CTA is a page navigation — the single biggest friction point in the funnel. |
| E5 | P1 | `StickyMobileCta` is `md:hidden` — **desktop gets no persistent CTA at all** across ~4,000px of homepage scroll. |
| E6 | P2 | Analytics fires `contact_form_submit` on the optimistic path (see E1), so the conversion number will overstate reality by exactly the failure rate. |
| E7 | P2 | No routing quiz / self-qualification path, despite the pricing section explicitly asking "Not sure which fits?" and then dumping the visitor into WhatsApp. |

---

## Prioritised fix list

### P0 — this week (highest value / lowest effort first)

1. **Fix the enquiry pipe** (E1, E2, E3). Add `app/api/enquiry/route.ts`: Zod-validated, honeypot,
   rate-limited, forwards to the Apps Script server-side, returns a real status. Client shows
   success only on `res.ok`. *This is worth more than every SEO item below — you are currently
   unable to detect a lead you never received.*
2. **Publish prices in schema** (A1, A2). Add `priceSpecification` to every `makesOffer` entry and a
   real `priceRange`. ~30 lines in `lib/seo.ts`.
3. **Write the four answer-first paragraphs** (B1). One each for `/`, `/services`, `/work`,
   `/contact` — 40–60 words, first thing in the DOM after the H1, containing a number and a price.
   Drafts in `05-copy-rewrite.md`.
4. **Resolve `/topaz-crm`** (C1): metadata + sitemap entry, or `noIndex`.
5. **Delete or replace the placeholder clients and testimonials** (D1).
6. **Rebuild the pricing section** with four self-identifiable tiers and a published number on
   three of four (see `03-pricing-packages.md`).

### P1 — this month

7. Add the **buyer-tier FAQ set** — 12 new questions covering mid-market and enterprise (B3), wired
   into `FAQ_ITEMS` so they flow into FAQPage schema *and* `/llms.txt` automatically. The existing
   plumbing already does this; it just needs content.
8. Ship **3 informational pages** targeting the highest-intent question keywords
   (`02-keyword-research.md`, Tier-0 list). These are the GEO citation surface. Format:
   answer-first paragraph → structured sub-answers → price/timeline table → CTA.
9. Add `Person` (founder) + `founder` on the org, and `Article` markup on case studies (A4, A5).
10. Add real `Review` schema — **only** with named, permissioned clients (A3, D1).
11. Fix heading order in `our-work.tsx` and audit the rest (B5).
12. Inline enquiry form on `/services` and per-tier CTAs on pricing (E4).
13. Desktop sticky CTA (E5).
14. `lang="en-IN"` (C3), shorten titles (C2), `/llms.txt` + `llms-full.txt` (C4).

### P2 — backlog

15. Intent quiz (E7) — see `04-lead-flow.md`.
16. Explicit AI-crawler allow block in `robots.ts` (C5).
17. Enrich `serviceCatalogJsonLd` with descriptions and offers (A6).
18. Drop `<meta keywords>` (C7).
19. Logo strip near CTAs (D4).

---

## Shipped (2026-08-01)

The P0 list above is implemented. Verified against a running dev server, a clean `next build`, and
lint on the changed files.

| Finding | What changed |
|---|---|
| E1, E2, E3, E6 | New [app/api/enquiry/route.ts](app/api/enquiry/route.ts): Zod validation, honeypot, per-IP rate limit (5 / 10 min), 8s sink timeout, readable status codes, full server-side error logging. The form now claims success only when the server confirms storage, and fires `enquiry_submit_failure` when it doesn't. Webhook URL moved to the server-only `ENQUIRY_WEBHOOK_URL`. Verified: bad payload → 422 with field errors, honeypot → 200 without reaching the sink, 6th request in the window → 429. |
| A1 | `priceRange` is now `₹90000-₹1500000`, plus `currenciesAccepted: "INR"`. |
| A2 | Every `makesOffer` entry carries a `priceSpecification`, generated from `PRICING_TIERS`. Maintenance is a `UnitPriceSpecification` at ₹15,000/MON. |
| A4 | `founder` Person entity added, sourced from `DMC.founder`. |
| B1 | Hero now carries a 50-word answer-first paragraph with two prices and a timeline. Pricing section leads with `PRICING_ANSWER`. |
| B3 | 12 buyer-tier FAQ items added — 25 questions now flow into FAQPage schema and `/llms.txt`. |
| B6 | Pricing section rebuilt: tag `PRICING`, H2 "What custom software costs with us". |
| C1 | [app/topaz-crm/layout.tsx](app/topaz-crm/layout.tsx) gives the route real metadata and `noindex, nofollow`. **Decision needed:** it reads as a client pitch page, so it is excluded from search. If it's meant to be public, drop `noIndex` and add it to `app/sitemap.ts`. |
| C2 | `SITE_TITLE` 76 → 52 chars, `SITE_DESCRIPTION` 267 → ~155 chars and now leads with prices. |
| C3 | `lang="en-IN"`. |
| C4 | `/llms.txt` now carries the full package breakdown, cross-tier terms, and the pricing answer paragraph, all generated from `PRICING_TIERS`. |
| D1 | Fabricated `work` and `testimonials` arrays deleted from `lib/content.ts`, along with their only consumers (`components/WorkShowcase.tsx`, `components/Testimonials.tsx` — both already unreferenced). |
| E4 (partial) | Every pricing tier deep-links `/contact?tier=<slug>`; the form reads the param and preselects the project type. |
| E7 (partial) | "Not sure which fits?" no longer dumps the visitor into WhatsApp. |
| — | New [lib/pricing.ts](lib/pricing.ts) is the single source of truth feeding the section, the Offer JSON-LD, and `/llms.txt`. New [lib/enquiry.ts](lib/enquiry.ts) is the shared client/server form contract. |
| — | Form shortened to 4 visible fields with budget and company collapsed, trust line under the submit button, per-field errors, error banner with a mailto fallback, and a persistent success panel replacing the 5-second toast. |
| — | `pricing_tier_view` now actually fires (it had been declared and never called). Added `enquiry_form_start` and `enquiry_submit_failure`. |

**Prices published:** ₹6,00,000 (Business System) and ₹15,00,000 (Enterprise reference point), plus
40/40/20 payment terms, all now live in `lib/dmc-config.ts`. These were the `[CONFIRM]` proposals —
they are on the site, in the schema, and in `/llms.txt`. Change them in one place if the margins
don't hold.

## Shipped, round two (2026-08-01)

The P1 and P2 lists are now implemented, except where noted.

| Finding | What changed |
|---|---|
| B2 | **Three guide pages built** — `/guides/custom-software-cost-india`, `/guides/mvp-timeline`, `/guides/agency-vs-freelancer-vs-inhouse`, plus a `/guides` index. Content lives in [lib/guides.ts](lib/guides.ts); [components/sections/guide-page.tsx](components/sections/guide-page.tsx) is a server component, so the prose is in the initial HTML. Each follows the format spec: question as H1, 40–60 word answer paragraph, H2 per sub-question, a table of real figures, FAQPage schema, visible last-updated date. |
| A5 | `caseStudyJsonLd()` emits `CreativeWork` entries for Topaz Furniture, Welcome Palace, and Lyfe9, with client, location, and project type. Only real, live projects — the list is deliberately short. |
| A6 | `serviceCatalogJsonLd()` now carries a description and a `serviceOutput` per service instead of 12 bare names. |
| B5 | **The finding was wrong as written.** The `<h3>` tags in `our-work.tsx` render *after* its `<h2>` in the DOM; the source-order reading was a false positive. There was a real defect nearby though: `about.tsx` had no `<h2>` at all — its only heading was an `<h3>`, which put an h3 before the page's first h2. Fixed with an `sr-only` h2. Verified against rendered HTML: the homepage now goes h1 → h2 → h3. |
| C5 | Explicit allow block in `robots.ts` for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, Bingbot, and cohere-ai. `/topaz-crm` disallowed for all of them. |
| E4 | `EnquiryForm` extracted to [components/ui/EnquiryForm.tsx](components/ui/EnquiryForm.tsx) with `light`/`dark` tones, and embedded inline on `/services`, on all three guides, and on the quiz result. `/contact` now uses the same component — one implementation, `source` recorded per surface. |
| E5 | Desktop sticky CTA added: a bottom-right pill alongside the existing mobile bar. The label is context-aware — while `#pricing` is in view the primary action becomes the quiz. Mounted on `/`, `/services`, `/work`, and the guides. |
| E7 | **`/start` quiz built.** Three questions, pure client state, no library. Q1 picks the tier, Q2 escalates it on team size, Q3 records urgency. Routing table in [lib/quiz.ts](lib/quiz.ts). The result page shows the tier, price, timeline, what's included, a plain-language reason, and a pre-filled enquiry form. Fires `quiz_start` and `quiz_complete`. |
| — | `/guides` added to the navbar (now 6 items), the sitemap, and `/llms.txt`. Guide sitemap entries are generated from `GUIDES`, so a new guide can't be left out. |
| — | Hero answer paragraph punctuation fixed — it had lost its em-dash in an edit, which mattered because that exact sentence is what gets quoted. |

---

## Shipped, round three — reviews and ratings (2026-08-01)

Built at your request with placeholder content, structured so the real data drops straight in.

| Finding | What changed |
|---|---|
| A3 | `reviewJsonLd()` in [lib/seo.ts](lib/seo.ts) emits `Review` entries plus a computed `AggregateRating`, wired into the homepage JSON-LD. |
| — | [data/reviews.ts](data/reviews.ts) gained `verified: boolean` and `datePublished` on all 8 entries, plus `verifiedReviews()` and `aggregateRating()` helpers. |
| — | The Reviews section's rating badge now reads from `aggregateRating()` and falls back to named placeholder constants, so the visible number and the schema number cannot drift once real reviews land. |
| D4 | [data/logos.ts](data/logos.ts) gained `permissioned: boolean` on all 31 entries — see the warning below. |

### The `verified` gate

`verified` controls **structured data only**:

- `false` → renders on the page, emits **no** Review or AggregateRating markup
- `true` → renders on the page **and** publishes as schema.org `Review`

The split is deliberate. A placeholder quote on a page is a copy problem you fix in a minute.
Fabricated `Review`/`AggregateRating` markup is a structured-data spam violation that Google
penalises at the domain level — so the gate is code, not memory.

All 8 entries are currently `false`. Verified behaviour both ways on a running server: zero
`Review` nodes in the HTML as shipped; flip two entries to `true` and the markup appears with
`"ratingValue":5,"reviewCount":2`. Reverted after testing.

**To go live:** replace the quote, name, role, and company; set `verified: true`; set a real
`datePublished`; keep the written permission somewhere findable.

### One thing to fix before this ships

[data/logos.ts](data/logos.ts) lists **real, identifiable third-party brands** — Nykaa, SUGAR,
Cetaphil, Raymond, Innisfree, mokobara, Wonderla, Beardo and others — under a "trusted by" heading.
That is a different category of risk from an invented testimonial name: it is a false claim about
identifiable companies, which is trademark and passing-off exposure, and an instant credibility
loss if a prospect checks even one.

Every entry is now flagged `permissioned: false`. Filter the wall before launch:

```tsx
items={LOGO_ITEMS.filter((logo) => logo.permissioned)}
```

If that leaves too few to fill a wall, the honest alternatives are a smaller wall, an
industries-served strip ("furniture · hospitality · health"), or dropping the section until there
are enough real names. Your call — the flag is there either way.

**Still open — and why:**

- **D2 (outcome statements on case studies).** Needs numbers only you have — enquiries before and
  after, time saved, conversion change. The `+45%` / `+38%` / `-63%` figures in
  [case-studies-metrics.tsx](components/sections/case-studies-metrics.tsx) are placeholders you
  added; they are not in any schema, so they are page copy to correct rather than a markup risk.
- **B4 (visible H1).** Left as-is deliberately. The `sr-only` H1 plus `aria-hidden` animated lines is
  a legitimate pattern and the hero design depends on it. Revisit only if Search Console shows a
  problem.
- **C6, C7 (sitemap `changeFrequency`, `<meta keywords>`).** Genuinely harmless. Not worth a diff.

---

## What I did not verify

- **No live crawl.** Everything above is read from source. Core Web Vitals, real SERP truncation,
  actual index coverage, and current AI-engine visibility need a live check (PageSpeed Insights,
  Search Console, and a manual "what does ChatGPT/Perplexity say about DMC Tech" pass).
- **No search-volume data.** The keyword doc deliberately contains no invented volume numbers — see
  its validation section.
- Whether the placeholder `work`/`testimonials` arrays render anywhere in production (D1) — grep
  says they are unused on the homepage, but confirm before shipping.
