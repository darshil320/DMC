# Copy Rewrite — homepage + services

Constraints this draft respects:
- **No invented metrics, no borrowed clients.** Every number below is either from
  `lib/dmc-config.ts`, already claimed on the site, or marked `[CONFIRM]`.
- Brutalist voice stays. Uppercase, short, declarative. What changes is *density*, not tone.
- Every page gets an **answer-first paragraph**: 40–60 words, in the DOM immediately after the H1,
  containing at least one number. That paragraph is the unit AI engines extract and quote.

---

## The rule being applied

Current hero copy:

> "We architect custom digital operating systems for businesses that need to scale. From AI-driven
> lead capture to automated CRM pipelines, we turn your manual workflows into a seamless,
> high-converting engine."

Three flags: *architect*, *seamless*, *high-converting engine*. No number, no price, no timeline, no
named buyer. It could belong to any of two thousand agencies. It is also, from a GEO standpoint,
unquotable — there is no fact in it.

Rewritten below with the same swagger and actual information.

---

# HOMEPAGE

## Hero

**H1 (make it visible, or keep `sr-only` but match it to the animated lines):**

> AI systems that run your business.

**Animated lines (unchanged — they work):**
```
AI Systems
That Run Your
[ Business. ]
```

**POV line (replaces the current one — keep the accent split):**

> Websites, CRM, and AI assistants — built direct in Ahmedabad,
> **priced in the open, and yours to keep.**

**Answer-first paragraph** — replace both the corner paragraph and the mobile paragraph with the
same text (they currently differ from each other in placement only, which is fine, but the content
must become factual):

> DMC Tech builds custom software for Indian businesses — websites, ecommerce stores, CRM systems,
> and AI WhatsApp assistants. Websites start at ₹90,000 and ship in 2–3 weeks. Full business
> systems start at ₹6,00,000 `[CONFIRM]` in 8–12 weeks. You own the code, the data, and the
> accounts. We reply within 24 hours.

That is 52 words, contains four facts and two prices, and reads as a paragraph a model can lift
whole. Keep it short enough for the corner placement or move it below the CTA — but do not cut the
numbers out to make it fit.

**Primary CTA:** `LET'S BUILD YOURS` → keep. It works.
**Secondary CTA:** `or see the live work` → change to `or see what it costs` → `/pricing`.
Proof matters, but price is the question people actually leave to go find.

---

## Section: Problem (`problem.tsx`)

Current framing is generic agency pain ("People land on your site and still do not understand what
you do"). Retarget to operational pain — it's what you actually sell against, and it's what your
real clients had:

| Symptom | What we build instead |
|---|---|
| Leads arrive in four places — Instagram, WhatsApp, walk-ins, phone — and live in nobody's head | One pipeline, auto-assigned, with follow-ups that fire on their own |
| Your team answers the same catalog and price questions all day | An AI assistant on WhatsApp that answers from your real catalog, in Hindi, Gujarati, or English |
| The business runs on WhatsApp groups and a spreadsheet somebody owns personally | Systems where the data belongs to the company, not to a phone |
| You can't tell which salesperson, branch, or ad actually converted | A dashboard that answers it in one screen |

Keep the strikethrough treatment on the symptom column — it already works.

---

## Section: Services (`services.tsx`)

**H2:** `We build the systems that run your business.` → keep. It's good, on-brand, and matches the
tagline in config.

**Sub-line (replace the current one):**

> Four things, mostly. A website that gets found. A store that takes payments. A CRM that stops
> leads leaking. And AI that answers customers at 11pm so you don't have to.

Then the flagship cards. Their copy is already strong — the fix is one line per card: **add who
it's for.** Prepend to each description:

- Complete Business Systems → *For multi-team operations where nothing talks to anything.*
- AI Chatbots & Assistants → *For businesses answering the same 20 questions every day.*
- CRM & Lead Management → *For sales teams losing leads between the enquiry and the sale.*
- ERP & Process Automation → *For manufacturers and retailers running production on WhatsApp.*

---

## Section: Trust (`trust.tsx`)

Current stats are process claims — honest, on-brand, keep them. Add one factual row underneath:

> Built and delivered from Ahmedabad. Working systems live today in furniture retail, hospitality,
> and health. `[verify client naming permission before adding names]`

---

## Section: FAQ — 12 new items to add to `FAQ_ITEMS`

These flow automatically into FAQPage schema *and* `/llms.txt` — the plumbing already exists in
[lib/content.ts](lib/content.ts) and [app/llms.txt/route.ts](app/llms.txt/route.ts). Adding them is
the single cheapest GEO win available.

Written answer-first: the first sentence answers, the rest explains.

1. **How much does custom software development cost in India?**
   Between ₹90,000 and ₹30,00,000+ depending on scope. A business website is ₹90,000–₹2,00,000. An
   ecommerce store with payments and inventory is ₹3,00,000–₹6,00,000. A custom CRM with AI
   automation is ₹6,00,000–₹15,00,000 `[CONFIRM]`. Multi-branch ERP work is quoted after a paid
   scoping engagement. We publish these ranges because most agencies won't.

2. **How long does it take to build an MVP?**
   6–12 weeks for a working MVP with real users on it. Simple ones — one core workflow, one user
   type — ship in 4–6 weeks. Anything involving payments, multi-role permissions, or third-party
   integrations lands at 10–12 weeks. We give a written timeline before work starts.

3. **Do I own the code you write?**
   Yes, entirely. Source code, database, domain, and cloud accounts are in your name from day one.
   If you stop working with us, nothing breaks and nothing needs rebuilding. 100% Code & Data Ownership — you own your software, data, and cloud infrastructure outright.
   no exit fee.

4. **Should I hire an agency, a freelancer, or build in-house?**
   A freelancer is cheapest and fine for a single small build. An in-house team costs ₹15–40 lakh a
   year before you ship anything and only makes sense with a continuous roadmap. An agency fits
   when you need a working system in weeks and don't want to hire for it. We'll tell you honestly
   if your project doesn't need us.

5. **Do you work with businesses outside Gujarat?**
   Yes. We're based in Ahmedabad and deliver across India. Local clients we meet in person; for
   everyone else we run the project remotely with weekly demos. Timezone-wise we work with clients
   in the Gulf, UK, and US `[CONFIRM if true]`.

6. **Can you integrate with the software we already use?**
   Yes — that's most of the work in a mid-size project. We integrate Tally, payment gateways,
   WhatsApp Business API, Meta lead ads, Google Workspace, Shopify, and most tools with an API.
   Where there's no API, we build one.

7. **What happens to my data? Is it secure?**
   Your data stays in infrastructure you own. We use role-based access, encrypted connections, and
   audited logins. Our face-recognition work is consent-based and built to India's DPDPA rules. We
   don't resell, train on, or move your data.

8. **How do payments and project terms work?**
   40% to start, 40% at the build milestone, 20% on launch `[CONFIRM]`. You get scope, price, and
   timeline in writing before anything is paid. Maintenance is ₹15,000/month and optional.

9. **What if we need changes after launch?**
   Thirty days of fixes are included with every project. After that, a ₹15,000/month maintenance
   plan covers updates, monitoring, bug fixes, and priority WhatsApp support. Larger changes are
   quoted as their own scope — never billed by surprise.

10. **Do you build for enterprises, or only small businesses?**
    Both. Our smallest project is a ₹90,000 website; our largest are multi-module systems covering
    showroom, workshop, and supply chain across branches. Enterprise engagements start with a
    fixed-fee scoping phase that produces an architecture document you own regardless of what you
    build next.

11. **Who actually writes the code?**
    We do. Every project is engineered in-house — no white-labelling, no subcontracting to a body
    shop. You talk to the people building it.

12. **What do you need from us to start?**
    An hour of your time and access to how your business runs today — how leads arrive, how orders
    move, what tools you already pay for. That's the strategy call. You leave it with a scope, a
    price, and a timeline, whether or not you build with us.

---

# SERVICES PAGE

**H1:** `Custom software, built direct.`

**Answer-first paragraph (first thing after the H1):**

> DMC Tech builds custom software for businesses of every size — websites and ecommerce stores from
> ₹90,000, CRM and lead-automation systems from ₹6,00,000 `[CONFIRM]`, and multi-branch ERP built
> to scope. We're an in-house engineering team in Ahmedabad. Every project ships with a written
> scope, price, and timeline, and you own everything we build.

**Then a three-tier "who we build for" block** — this is what makes the page work for all three
buyer tiers instead of only SMB:

> **Startups and small businesses** — you need one thing working, fast, without a retainer.
> Websites, catalogs, stores, and MVPs from ₹90,000 in 2–6 weeks.
>
> **Growing businesses** — you have customers and you're losing some of them to manual follow-up.
> Custom CRM, AI WhatsApp assistants, and automation from ₹6,00,000 `[CONFIRM]` in 8–12 weeks.
>
> **Enterprises and multi-branch operations** — your systems don't talk to each other. We start with
> a fixed-fee scoping engagement, then build in phases against a written architecture.

Each block links to the matching pricing tier and its own `/services/*` page.

**Then** the existing flagship + specialised grids — they're good, leave the structure alone.

**Close the page with the inline enquiry form**, not a link to `/contact`.

---

# Words to delete from the site

Search-and-destroy list. Each has a replacement that says something:

| Delete | Because | Use instead |
|---|---|---|
| architect (as a verb) | agency-speak | build |
| seamless | means nothing | say what connects to what |
| high-converting engine | two clichés stacked | say what it does |
| cutting-edge / innovative | unfalsifiable | name the technology |
| world-class | self-awarded | delete, or show the work |
| solutions (standalone) | filler | name the thing |
| leverage / utilise | corporate | use |
| take your business to the next level | | say which number moves |
| Digital Presence / Business Intelligence / Complete OS | tier names nobody can self-identify against | Launch / Catalog & Commerce / Business System / Enterprise |

Note `world-class` currently appears in the services grid and as the default `projectType` in the
contact form — replace both.

---

## Sequencing

1. Hero answer-first paragraph + secondary CTA (30 min, largest single GEO gain per minute spent)
2. The 12 FAQ items (2h — they auto-propagate to schema and `llms.txt`)
3. Services page H1 + answer paragraph + three-tier block (2h)
4. Problem section retarget (1h)
5. Delete-list sweep (1h)
