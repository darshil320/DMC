# Lead Flow — enquiry redesign

Current state: one form, on one page, behind a navigation, posting into a pipe that cannot report
failure. Everything below is ordered by value-per-hour-of-work.

---

## 0. Fix the pipe first (P0 — do this before any UX work)

[components/sections/contact-page.tsx:223](components/sections/contact-page.tsx#L223):

```ts
await fetch("https://script.google.com/macros/s/AKfycb.../exec", {
  method: "POST",
  mode: "no-cors",           // ← opaque response: ALWAYS resolves
  body: JSON.stringify({ ...form, source: "Contact Page" }),
});
analytics.contactFormSubmit();
setIsSuccess(true);          // ← shown even if the endpoint 500'd or was deleted
```

`mode: "no-cors"` returns an opaque response. It resolves on a 500, on a revoked Apps Script
deployment, on a quota block. The `catch` can only fire on a network-level failure. So:

- a broken endpoint shows every visitor **"Sent Successfully"**,
- `contact_form_submit` fires anyway, so analytics reports a healthy conversion rate,
- and there is no signal anywhere that leads are being dropped.

**Fix:** proxy through your own route.

```
app/api/enquiry/route.ts
  ├─ Zod schema: name, email, company?, projectType, budgetRange, message, website(honeypot)
  ├─ reject if honeypot filled  → 200, silently discard
  ├─ rate limit by IP           → 429
  ├─ forward to Apps Script (server-side, normal CORS, read the status)
  ├─ on sink failure: log full context + send yourself an alert email
  └─ return { success, error? }  (matches the ApiResponse<T> convention in the TS rules)
```

Client: `setIsSuccess(true)` **only** on `res.ok && body.success`. Move the Apps Script URL into
`ENQUIRY_WEBHOOK_URL` (server-only env var — it should never have been in the client bundle).

Keep the mailto fallback, but show it as a visible recovery option on failure rather than a
`window.location.href` redirect the user didn't ask for.

---

## 1. Shorten the form

Current: 6 fields, all visible, 2 selects, name/email/message required.

**New default state — 4 fields:**

```
┌─────────────────────────────────────────────┐
│  LEAVE US A MESSAGE                         │
│                                             │
│  Name*            [____________________]    │
│  Email*           [____________________]    │
│  What do you need?[ Website           ▾]    │  ← was "Project type"
│  Tell us more*    [____________________]    │
│                   [____________________]    │
│                                             │
│  › Add budget & company  (optional)         │  ← collapsed disclosure
│                                             │
│  [ SEND MESSAGE ]   [ WHATSAPP ]            │
│                                             │
│  ⏱ We reply within 24 hours · 🔒 Never shared│  ← trust line under button
└─────────────────────────────────────────────┘
```

- Collapse **business name + budget range** behind a `› Add budget & company (optional)` toggle.
  Budget still gets captured from the ~40% who open it, without the other 60% bouncing off a money
  question they aren't ready for.
- Rename `How can I help you?` → `Tell us more` (the current label is first-person singular on an
  agency site — inconsistent with "we" everywhere else).
- Pre-fill `projectType` from `?tier=` / `?service=` query params so a visitor arriving from a
  pricing card or service page never re-states what they already clicked.
- Trust line directly under the submit button — **not** in the footer. `We reply within 24 hours`
  already exists as a claim in `final-cta.tsx`; put it where the decision happens.

---

## 2. Three entry paths, by intent

Right now there is one path: navigate to `/contact`, fill 6 fields. Add two more.

### Path A — "I know what I want" (highest intent)

Inline enquiry form **on the page they're already on**:

- bottom of `/services` and each `/services/*` page
- inside each pricing tier card (CTA deep-links `/contact?tier=<slug>`)
- bottom of each `/work` case study — "want this for your business?"

Same 4-field form component, `source` field records where it came from. One `<EnquiryForm />`
component, `source` + `defaultProjectType` as props. Do not duplicate the form.

### Path B — "I'm not sure what I need" (the quiz)

Currently the pricing section asks "Not sure which fits?" and answers with a WhatsApp link — i.e.
it converts an anonymous, self-serve visitor into a manual sales conversation. That is the exact
friction the brief asks to remove.

Replace with a **3-question router** at `/start`:

```
Q1  What's the main thing you want to fix?
    ○ We don't have a proper website / we look small online
    ○ We can't sell online / customers can't see prices
    ○ We're losing leads — follow-ups happen on WhatsApp and memory
    ○ Our systems don't talk to each other across branches/teams

Q2  How big is the team this will touch?
    ○ Just me / 1–5    ○ 5–25    ○ 25–100    ○ 100+

Q3  When do you want it live?
    ○ ASAP (this month)   ○ 1–3 months   ○ This quarter   ○ Still exploring

    ↓
┌──────────────────────────────────────────────────────┐
│  Based on that, you want:  BUSINESS SYSTEM           │
│  From ₹6,00,000 · 8–12 weeks                         │
│  [what's included — 5 bullets]                       │
│                                                      │
│  [ pre-filled 4-field enquiry form, tier locked in ] │
│  or  ‹ see all packages                              │
└──────────────────────────────────────────────────────┘
```

Routing table (Q1 dominant, Q2 escalates, Q3 informs urgency, not tier):

| Q1 answer | Base tier | Escalate to Enterprise if Q2 ≥ |
|---|---|---|
| No proper website | Launch | 25–100 |
| Can't sell online | Catalog & Commerce | 100+ |
| Losing leads | Business System | 100+ |
| Systems don't talk | Business System | 25–100 |

Build notes: pure client state, no backend. Three screens, one component, no library. Result page
is a real URL (`/start/result?tier=business-system`) so it's shareable and trackable. Fire a
`quiz_complete` analytics event with the tier — that data tells you which tier to invest in next.

### Path C — "Talk to a human now"

WhatsApp, already in place and working. Keep it as the *third* option, never the only one — it is
currently the fallback for every "not sure" moment on the site.

---

## 3. Contextual CTA that follows scroll

`StickyMobileCta` is `md:hidden`. The homepage is roughly 4,000px of desktop scroll with **no
persistent CTA** — the visitor must scroll back to the nav or all the way to the final section.

- Extend the sticky bar to desktop as a slim bottom-right pill: `Start a project →` + `WhatsApp`.
- Make the label context-aware: while `#pricing` is in view it reads `See which package fits →`
  (links to `/start`); elsewhere `Start a project →`.
- Keep the existing `IntersectionObserver` on `#contact` so it hides over the final CTA — that
  logic is already correct, just reuse it.

---

## 4. Trust signals at every CTA

Rule: **no submit button without a trust line within 40px of it.**

| Location | Signal |
|---|---|
| Under every submit button | `We reply within 24 hours · Your details are never shared or sold` |
| Above every form | One-line client strip: *Built for Topaz Furniture · Welcome Palace · Lyfe9* `[verify permissions]` |
| Pricing section | `Scope, price and timeline in writing before you commit a rupee` — already exists in `final-cta.tsx`; move it up to pricing where the money question is live |
| Quiz result page | The matching case study, one line + link |
| Success state | Replace the 5-second toast with a persistent panel: what happens next, when, and the WhatsApp link — right now the confirmation vanishes and the visitor is left staring at an empty form |

**Do not** add a `Review`/`AggregateRating` schema or a testimonial wall until you have real,
named, permissioned quotes. The three testimonials in `lib/content.ts` look like placeholders — see
audit finding D1.

---

## 5. Instrumentation

Events already declared in [lib/analytics.ts](lib/analytics.ts) but never fired:
`pricing_tier_view`, `demo_click`, `nav_link_click`. Wire them.

Add: `enquiry_form_view`, `enquiry_form_start` (first keystroke), `quiz_start`, `quiz_complete`
(with tier), `enquiry_submit_success`, `enquiry_submit_failure`.

The failure event is the important one — it is the alarm that section 0 exists to give you.

---

## Build order

| | Change | Effort | Why first |
|---|---|---|---|
| 1 | `/api/enquiry` route + honest success state | ~3h | You cannot currently detect a lost lead |
| 2 | Shorten form + collapse optional fields + trust line | ~2h | Highest conversion-per-hour |
| 3 | Extract `<EnquiryForm />`, embed on `/services` + pricing cards | ~3h | Removes a whole navigation from the funnel |
| 4 | Desktop sticky CTA | ~1h | 4,000px of scroll with no CTA |
| 5 | `/start` quiz | ~6h | Highest ceiling, but only pays off once 1–4 exist |
