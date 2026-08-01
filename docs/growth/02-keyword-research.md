# Keyword Research — custom software / tech solutions, all business sizes

**Honest framing up front:** this document contains **no search-volume numbers**. I have no
keyword-tool access in this environment, and inventing volumes would be worse than omitting them.
What follows is a strategically grouped target list with intent classification and page assignment
— the part that requires judgement. Volume/difficulty validation is a 90-minute job in Ahrefs,
Semrush, or free-tier Google Keyword Planner; the process is at the bottom of this doc.

**Positioning note:** the brief says "businesses of all sizes and industries", but the site
currently reads as *Gujarat SMB / local business*. Do not throw that away — local intent is where
you can actually rank now. The strategy below is **defend local, expand upward**: keep the Gujarat
SMB terms as the ranking base, and build the mid-market/enterprise tiers as new pages rather than
by diluting the homepage.

Base city is **Surat** (`DMC.location`), with Ahmedabad served as a second market. Build
`/locations/surat` first — it matches your registered address, which is what carries local-pack
weight — then Ahmedabad, then Gujarat.

---

## Page architecture this implies

Current: `/` `/about` `/services` `/work` `/contact` + demos.

Proposed additions (each is a keyword landing target, not filler):

```
/services/mvp-development                 Tier 1 commercial
/services/custom-crm-development          Tier 2 commercial
/services/erp-development                 Tier 2/3 commercial
/services/ai-automation                   Tier 2 commercial
/services/ecommerce-development           Tier 1 commercial
/pricing                                  all tiers, high commercial
/guides/custom-software-cost-india        Tier 0 informational — GEO anchor
/guides/mvp-timeline                      Tier 0 informational — GEO anchor
/guides/agency-vs-freelancer-vs-inhouse   Tier 0 informational — GEO anchor
/guides/build-vs-buy-crm                  Tier 0 informational
/locations/ahmedabad  (+ /surat, /gujarat) local commercial
```

Rule: one page = one primary keyword + one buyer tier. Never let two pages chase the same head term.

---

## Tier 0 — Informational / AEO ("question keywords")

**These are the GEO plays.** Nobody buys from them directly. They exist so that when ChatGPT,
Perplexity, or an AI Overview answers a buying question, DMC is the cited source. Each needs an
answer-first paragraph, a number, and a table.

| Query | Intent | Target page | Why it matters |
|---|---|---|---|
| how much does custom software development cost | informational, pre-purchase | `/guides/custom-software-cost-india` | The #1 question every tier asks. Publishing real numbers is the entire moat — almost every Indian agency refuses to. |
| custom software development cost in India | informational + geo | same | High AI-citation value; specific enough to own. |
| how long does it take to build an MVP | informational | `/guides/mvp-timeline` | Startup tier's first question. |
| what is included in MVP development | informational | `/guides/mvp-timeline` | Definitional query — AI engines love definitional sources. |
| should I hire an agency or a freelance developer | comparison | `/guides/agency-vs-freelancer-vs-inhouse` | Comparison queries get cited disproportionately. |
| in-house team vs software development agency cost | comparison | same | Mid-market decision query. |
| build vs buy CRM for business | comparison | `/guides/build-vs-buy-crm` | Directly feeds your CRM service page. |
| custom CRM vs Salesforce / Zoho for SMB | comparison | `/guides/build-vs-buy-crm` | Named-competitor comparisons rank fast. |
| how much does a CRM cost to build | informational | `/services/custom-crm-development` | |
| how much does an ecommerce website cost in India | informational | `/guides/custom-software-cost-india` | Already partly answered in your FAQ — promote it. |
| what is a WhatsApp Business API chatbot | definitional | `/services/ai-automation` | You already have real depth here. |
| how do I automate lead follow-up on WhatsApp | how-to | `/services/ai-automation` | |
| what does digital transformation actually mean for a mid-size company | definitional | `/guides/...` (later) | Enterprise-tier softener. |
| how do I choose a software development partner | informational | `/guides/agency-vs-freelancer-vs-inhouse` | |
| what should be in a software development contract | informational | backlog | Trust/E-E-A-T signal. |
| do I own the code my agency writes | informational | FAQ item | **Own this.** "100% Code & Data Ownership" is already your positioning; nobody answers this question online. |

**Format spec for every Tier-0 page** (this is the part that determines whether you get cited):

1. H1 = the question, near-verbatim.
2. First paragraph = the answer, 40–60 words, containing at least one number and one range.
3. Then the nuance, in H2-per-sub-question form.
4. A price/timeline table with real figures.
5. FAQPage schema on the sub-questions.
6. Last updated date, visible + in schema.

---

## Tier 1 — Startups / small business (commercial)

Buyer: founder or owner, ₹90k–₹5L budget, wants a thing shipped.

| Keyword | Intent | Target page |
|---|---|---|
| MVP development company India | commercial, high | `/services/mvp-development` |
| MVP development agency for startups | commercial, high | same |
| affordable custom software development company | commercial | `/pricing` |
| affordable custom software development India | commercial | `/pricing` |
| startup software development partner India | commercial | `/services/mvp-development` |
| custom website development for small business | commercial | `/services/ecommerce-development` or `/services` |
| ecommerce website development company India | commercial, high | `/services/ecommerce-development` |
| product catalog website development | commercial, long-tail | `/services/ecommerce-development` |
| WhatsApp chatbot development company India | commercial, high | `/services/ai-automation` |
| WhatsApp Business API integration service | commercial | `/services/ai-automation` |
| Shopify alternative custom store development | commercial, long-tail | `/services/ecommerce-development` |
| small business software development Ahmedabad | local commercial | `/locations/ahmedabad` |

---

## Tier 2 — Mid-market (commercial)

Buyer: ops head, GM, or second-generation owner. ₹5L–₹30L. Has existing systems that don't talk.

| Keyword | Intent | Target page |
|---|---|---|
| custom business software solutions | commercial, head term | `/services` |
| custom CRM development company | commercial, high | `/services/custom-crm-development` |
| custom CRM development India | commercial, high | same |
| business process automation company India | commercial | `/services/ai-automation` |
| software integration partner for growing business | commercial | `/services` |
| enterprise software integration services India | commercial | `/services` |
| custom ERP development company India | commercial, high | `/services/erp-development` |
| ERP for manufacturing SME India | commercial, vertical | `/services/erp-development` |
| inventory and order management system development | commercial, long-tail | `/services/erp-development` |
| lead management system for sales teams | commercial | `/services/custom-crm-development` |
| AI automation agency for business | commercial, rising | `/services/ai-automation` |
| workflow automation software development | commercial | `/services/ai-automation` |
| replace spreadsheets with custom software | pain-led, long-tail | `/services` — **strong angle, low competition** |

---

## Tier 3 — Enterprise (commercial)

Buyer: CIO/CTO/transformation lead. ₹30L+. Buys on credibility and process, not price.

| Keyword | Intent | Target page |
|---|---|---|
| enterprise digital transformation partner | commercial, head | `/services` (enterprise section) |
| digital transformation consulting India | commercial | same |
| custom ERP implementation partner | commercial | `/services/erp-development` |
| enterprise application development company India | commercial | `/services` |
| legacy system modernization services | commercial | backlog page |
| AI implementation partner for enterprise | commercial, rising | `/services/ai-automation` |
| custom software development company for enterprises | commercial, head | `/services` |
| enterprise CRM customization services | commercial | `/services/custom-crm-development` |

**Realistic caution:** Tier 3 head terms are dominated by TCS/Infosys-adjacent and large offshore
shops. Do not build a strategy on ranking for "enterprise digital transformation partner". Tier 3
pages earn their keep by (a) making you *credible* to a mid-market buyer who found you elsewhere,
and (b) long-tail + AI citation, not by head-term ranking.

---

## Tier 4 — Local / geo (your actual near-term ranking wins)

Lowest competition, highest conversion, fastest to rank. Do not neglect these while chasing tiers 2–3.

| Keyword | Target page |
|---|---|
| software development company in Ahmedabad | `/locations/ahmedabad` |
| web development company Ahmedabad | `/locations/ahmedabad` |
| custom software development Gujarat | `/locations/gujarat` |
| ecommerce website developer Ahmedabad | `/locations/ahmedabad` |
| CRM development company Ahmedabad | `/locations/ahmedabad` |
| software company in Surat | `/locations/surat` |
| WhatsApp automation company Gujarat | `/locations/gujarat` |
| best web design agency Ahmedabad | `/locations/ahmedabad` |

Pair with Google Business Profile (already flagged as a service you sell — practise it) and
`LocalBusiness` schema per location page.

---

## Vertical long-tail (highest conversion of anything on this page)

You have real depth in furniture/showroom retail (Topaz), hospitality (Welcome Palace), and health
(Lyfe9). Vertical pages convert 3–5× generic service pages and are near-uncontested.

- furniture showroom management software India
- showroom CRM for retail stores
- software for furniture manufacturers India
- banquet hall booking and management software
- hotel banquet enquiry management system
- catering business management software India
- health report analysis platform development
- face recognition customer recognition for retail stores
- AI room visualizer for furniture business

**These should be the first three service sub-pages you build**, before any generic Tier-2 page —
you can write them from real delivered work instead of from imagination.

---

## Funnel mapping summary

| Stage | Keyword class | Pages | Primary CTA |
|---|---|---|---|
| Unaware | pain-led ("replace spreadsheets", "losing leads on WhatsApp") | `/guides/*`, blog | Read next guide |
| Problem-aware | question keywords (Tier 0) | `/guides/*` | "See what this costs" → `/pricing` |
| Solution-aware | comparison keywords | `/guides/build-vs-buy-crm`, `/guides/agency-vs-*` | Intent quiz |
| Vendor-aware | `<service> company <geo>` (Tiers 1–3) | `/services/*`, `/locations/*` | Inline enquiry form |
| Ready | brand + "DMC Tech", "pricing", "cost" | `/pricing`, `/contact` | Book strategy call |

---

## How to validate this list (do this before building pages)

1. Google Keyword Planner (free with any Ads account) → paste each tier, region = India, pull
   volume + competition. Ignore the CPC.
2. Cross-check the Tier-0 questions in **AlsoAsked** or Google's own "People also ask" — take the
   actual phrasing users type, not the phrasing above.
3. For each Tier-0 query, **run it in ChatGPT, Perplexity, and Google AI Overviews right now** and
   record which sources get cited. That citation set is your real competitor list for GEO — it is
   usually *completely different* from the blue-link SERP.
4. Drop anything where the top 5 organic results are all DR 70+ national aggregators, unless it is a
   Tier-0 question page (where citation, not ranking, is the goal).
5. Re-run step 3 quarterly. GEO visibility moves faster than SERP position.
