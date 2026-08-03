import { DMC } from "@/lib/dmc-config";
import { formatPrice } from "@/lib/pricing";

/**
 * Informational guides — the site's citation surface.
 *
 * Everything else on dmctech.in is commercial-intent. These pages exist so that
 * when an answer engine is asked "how much does custom software cost in India"
 * or "how long does an MVP take", there is a DMC page that answers it in prose,
 * with numbers, that can be quoted.
 *
 * Structure is deliberate and identical across guides:
 *   1. H1 = the question, near-verbatim
 *   2. `answer` = 40–60 words containing a number and a range — extracted whole
 *   3. sections = the nuance, one H2 per sub-question
 *   4. a table with real figures
 *   5. `faq` = FAQPage schema on the sub-questions
 *   6. `updated`, rendered visibly and in the Article schema
 */

export type GuideTable = {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

export type GuideSection = {
  heading: string;
  /** Each paragraph leads with its own answer sentence. */
  paragraphs: readonly string[];
  bullets?: readonly string[];
  table?: GuideTable;
};

export type Guide = {
  slug: string;
  /** Page H1 — the question a person actually types. */
  title: string;
  /** SERP title, kept under ~60 chars. */
  metaTitle: string;
  metaDescription: string;
  keywords: readonly string[];
  /** The extractable answer. Rendered as the first paragraph on the page. */
  answer: string;
  updated: string;
  readingTime: string;
  sections: readonly GuideSection[];
  faq: readonly { q: string; a: string }[];
  /** Where the reader should go next, in order of usefulness to them. */
  related: readonly { label: string; href: string }[];
};

const UPDATED = "2026-08-01";

export const GUIDES: readonly Guide[] = [
  {
    slug: "custom-software-cost-india",
    title: "How much does custom software development cost in India?",
    metaTitle: "Custom Software Development Cost in India (2026)",
    metaDescription:
      "Real prices, not ranges hidden behind a contact form. Websites from ₹90,000, ecommerce from ₹3,00,000, CRM and AI systems from ₹6,00,000. What drives each number.",
    keywords: [
      "custom software development cost",
      "custom software development cost in India",
      "software development pricing India",
      "how much does an app cost to build India",
      "ecommerce website cost India",
      "CRM development cost",
    ],
    answer: `Custom software in India costs between ₹90,000 and ₹30,00,000 or more, depending on how much of your business it touches. A business website is ₹90,000–₹2,00,000. An ecommerce store with payments and inventory is ₹3,00,000–₹6,00,000. A custom CRM with AI automation is ₹6,00,000–₹15,00,000. Multi-branch ERP work is quoted after a scoping engagement.`,
    updated: UPDATED,
    readingTime: "6 min",
    sections: [
      {
        heading: "What you actually pay for",
        paragraphs: [
          "Roughly 70% of a custom software budget is engineering time, and the rest splits between design, project management, and third-party services. That is why scope, not technology, drives price: a payment gateway costs nothing to add as a line item and three weeks to integrate, test, and reconcile properly.",
          "Two projects with the same feature list can differ by 3× in price. The difference is almost always integration surface — how many existing systems the new software has to talk to, and how badly those systems are documented.",
        ],
        bullets: [
          "Number of user roles — each role is its own permission model, its own screens, its own edge cases",
          "Integrations — Tally, payment gateways, WhatsApp Business API, Meta lead ads, existing databases",
          "Data migration — moving years of spreadsheets into a real schema is often the longest single task",
          "Compliance — GST invoicing, DPDPA consent handling, and audit logging are not optional in India",
          "Ongoing change — a system nobody maintains is a system that stops matching the business within a year",
        ],
      },
      {
        heading: "Price by project type",
        paragraphs: [
          "These are DMC Tech's published starting prices. They are floors, not averages: a project lands above them when scope grows, never below.",
        ],
        table: {
          caption: "Starting price and timeline by project type",
          headers: ["Project type", "Starting price", "Timeline"],
          rows: [
            ["Business website (up to 6 pages)", formatPrice(DMC.pricing.starter), "2–3 weeks"],
            ["Product catalog site", formatPrice(DMC.pricing.catalog), "3–4 weeks"],
            ["Ecommerce store with payments", formatPrice(DMC.pricing.ecommerce), "4–6 weeks"],
            ["Custom CRM + AI WhatsApp assistant", formatPrice(DMC.pricing.businessSystem), "8–12 weeks"],
            ["Multi-branch ERP / custom platform", `From ${formatPrice(DMC.pricing.enterprise)}`, "12+ weeks, phased"],
            ["Maintenance and support", `${formatPrice(DMC.pricing.maintenance)}/month`, "Ongoing, optional"],
          ],
        },
      },
      {
        heading: "Why most agencies won't publish a number",
        paragraphs: [
          "Because a published price can be compared, and because scope genuinely does vary. Both are true. But refusing to name any number pushes the entire cost discovery process into a sales call, which wastes the buyer's time and filters for patience rather than fit.",
          "The honest version is a floor plus the variables. A website starts at ₹90,000; if you need eight languages, a headless CMS, and a migration from an old Wix site, it will not be ₹90,000, and we will say so before you pay anything.",
        ],
      },
      {
        heading: "How to compare quotes without getting burned",
        paragraphs: [
          "Ask every vendor the same four questions. The answers separate a real engineering partner from a reseller faster than any portfolio does.",
        ],
        bullets: [
          "Who owns the code and the cloud accounts when we're done? (If the answer is anything but 'you', the low price is a lease.)",
          "What is explicitly not included in this number?",
          "Who writes the code — your team, or a subcontractor?",
          "What does it cost to change something after launch?",
        ],
      },
    ],
    faq: [
      {
        q: "What is the cheapest way to get custom software built in India?",
        a: "A freelancer, at ₹30,000–₹80,000 for a small build. That is genuinely the right choice for a single simple project with no integrations and no ongoing changes. It stops being the right choice the moment the software has to run something the business depends on daily, because a single freelancer is a single point of failure.",
      },
      {
        q: "Why is custom software more expensive than SaaS?",
        a: "Because you pay the build cost once instead of a licence fee forever. A ₹6,00,000 custom CRM overtakes a ₹15,000/month SaaS subscription in about 40 months — sooner if the SaaS charges per user. Custom wins when your workflow doesn't fit the product; SaaS wins when it does.",
      },
      {
        q: "Do these prices include GST?",
        a: "No. All published figures are exclusive of GST, which is charged at the applicable rate on top.",
      },
      {
        q: "How are payments structured?",
        a: `${DMC.paymentTerms}. Scope, price, and timeline are agreed in writing before the first payment.`,
      },
    ],
    related: [
      { label: "See our packages and what's in each", href: "/#pricing" },
      { label: "How long does an MVP take to build?", href: "/guides/mvp-timeline" },
      { label: "Agency, freelancer, or in-house?", href: "/guides/agency-vs-freelancer-vs-inhouse" },
    ],
  },

  {
    slug: "mvp-timeline",
    title: "How long does it take to build an MVP?",
    metaTitle: "How Long Does It Take to Build an MVP? (2026)",
    metaDescription:
      "Six to twelve weeks for an MVP with real users on it. What ships in 4 weeks, what pushes you to 12, and what belongs in a first version versus version two.",
    keywords: [
      "how long does it take to build an MVP",
      "MVP development timeline",
      "MVP development company India",
      "what is included in MVP development",
      "minimum viable product timeline",
    ],
    answer: `A minimum viable product takes six to twelve weeks to build with real users on it. A simple MVP — one core workflow, one user type, no payments — ships in four to six weeks. Anything involving payments, multiple user roles, or third-party integrations lands at ten to twelve weeks. Discovery and design take the first one to two weeks.`,
    updated: UPDATED,
    readingTime: "5 min",
    sections: [
      {
        heading: "Where the weeks actually go",
        paragraphs: [
          "Most founders assume the build is the long part. In practice, on a ten-week MVP roughly two weeks go to deciding what not to build, five to engineering, and three to the unglamorous work that makes it usable by strangers: error states, empty states, onboarding, and the admin screens you need to support your first users.",
        ],
        table: {
          caption: "A typical 10-week MVP, by phase",
          headers: ["Phase", "Duration", "What comes out of it"],
          rows: [
            ["Discovery and scope", "1–2 weeks", "One core workflow defined, everything else deferred in writing"],
            ["Design", "1–2 weeks", "Screens for the happy path plus the three ways it breaks"],
            ["Core build", "4–5 weeks", "Working software, deployed, behind a login"],
            ["Integration and hardening", "1–2 weeks", "Payments, auth, error handling, admin tooling"],
            ["Beta and fixes", "1 week", "Real users on it, fixes shipped daily"],
          ],
        },
      },
      {
        heading: "What makes an MVP take four weeks instead of twelve",
        paragraphs: [
          "One variable dominates: the number of things that must be true at once. A single user type doing a single job is fast. Two user types who see different data, transact with each other, and need notifications is not a slightly bigger project — it is a different one.",
        ],
        bullets: [
          "Four to six weeks: one user type, one core workflow, no payments, no external integrations",
          "Six to ten weeks: two user types, a dashboard, file uploads, email or WhatsApp notifications",
          "Ten to twelve weeks: payments, role-based permissions, third-party integrations, or regulated data",
          "Beyond twelve weeks: it is no longer an MVP — split it and ship the first half",
        ],
      },
      {
        heading: "What belongs in version one",
        paragraphs: [
          "The test is not 'would a user like this' — users like everything. The test is whether the product is unusable without it. Almost nothing passes that test, which is the point.",
          "Things that reliably do not belong in an MVP: a settings page, a notifications centre, an analytics dashboard for your own team, dark mode, multi-language support, and a mobile app when a responsive web app answers the same question in a third of the time.",
        ],
      },
      {
        heading: "Why timelines slip",
        paragraphs: [
          "In our experience the two causes are unavailable decision-makers and unbounded scope, in that order. A build waits on the one person who can approve a flow, or a feature gets 'just one more' added to it four times in a fortnight.",
          "Both are solvable by writing the scope down before starting and treating additions as their own small project with their own price and date, rather than absorbing them silently and slipping.",
        ],
      },
    ],
    faq: [
      {
        q: "What is included in MVP development?",
        a: "One core workflow built properly, end to end: the screens, the backend, authentication, a database, deployment, and enough admin tooling to support real users. It excludes the second and third feature you want, which is what makes it an MVP rather than a product.",
      },
      {
        q: "How much does an MVP cost in India?",
        a: `An MVP typically runs ₹3,00,000–₹8,00,000 depending on how many user types and integrations it needs. At ${DMC.fullName} that maps to the Catalog & Commerce and Business System tiers, starting at ${formatPrice(DMC.pricing.ecommerce)} and ${formatPrice(DMC.pricing.businessSystem)} respectively.`,
      },
      {
        q: "Can you build an MVP in two weeks?",
        a: "Rarely, and usually only when the product is a single form with a workflow behind it, or an internal tool for a team that already agrees on the process. If someone quotes two weeks for anything with payments and accounts, ask what they are leaving out.",
      },
      {
        q: "What happens after the MVP launches?",
        a: `Fixes for the first 30 days are included. After that most teams either move onto a ${formatPrice(DMC.pricing.maintenance)}/month maintenance plan or scope version two based on what the first users actually did, rather than what everybody predicted they would do.`,
      },
    ],
    related: [
      { label: "What custom software costs", href: "/guides/custom-software-cost-india" },
      { label: "Agency, freelancer, or in-house?", href: "/guides/agency-vs-freelancer-vs-inhouse" },
      { label: "See our packages", href: "/#pricing" },
    ],
  },

  {
    slug: "agency-vs-freelancer-vs-inhouse",
    title: "Agency, freelancer, or in-house team — which should you choose?",
    metaTitle: "Agency vs Freelancer vs In-House: How to Choose",
    metaDescription:
      "A freelancer is cheapest for one small build. In-house costs ₹15–40 lakh a year before you ship. An agency fits when you need a working system in weeks. The honest comparison.",
    keywords: [
      "agency vs freelancer software development",
      "in-house vs outsourced development",
      "should I hire a freelance developer or an agency",
      "how to choose a software development partner",
      "software development agency India",
    ],
    answer: `It depends on how continuous the work is. A freelancer costs ₹30,000–₹1,50,000 for a single small build and is the right call when there is one job with a clear end. An in-house team costs ₹15–40 lakh a year before shipping anything and only pays off with a permanent roadmap. An agency fits when you need a working system in weeks without hiring for it.`,
    updated: UPDATED,
    readingTime: "6 min",
    sections: [
      {
        heading: "The honest comparison",
        paragraphs: [
          "Every option is the right answer for someone. The failure mode is picking based on price alone, because the three options fail in completely different ways — a freelancer disappears, an agency ends the engagement, and an in-house hire becomes a fixed cost you carry through quiet quarters.",
        ],
        table: {
          caption: "Freelancer vs agency vs in-house",
          headers: ["", "Freelancer", "Agency", "In-house"],
          rows: [
            ["Typical first-year cost", "₹30k–₹3L", "₹90k–₹30L per project", "₹15L–₹40L+"],
            ["Time to first working software", "2–8 weeks", "3–12 weeks", "3–6 months (hiring included)"],
            ["Best for", "One small, well-defined build", "A system you need running soon", "A permanent product roadmap"],
            ["Main risk", "Single point of failure", "Engagement ends, context leaves", "Fixed cost through quiet periods"],
            ["Who covers a bug at 11pm", "Whoever is free", "The team on contract", "Your employee"],
          ],
        },
      },
      {
        heading: "When a freelancer is genuinely the right call",
        paragraphs: [
          "When the job has a clear boundary and losing the person mid-way would be inconvenient rather than fatal. A landing page, a single integration, a design refresh, a script that runs once a month.",
          "It stops being the right call when the software becomes something the business depends on daily. At that point you are one unanswered message away from an outage with nobody to escalate to. Good agencies say this out loud; so do good freelancers.",
        ],
      },
      {
        heading: "When in-house makes sense",
        paragraphs: [
          "When you have at least a year of continuous work and the software is the product rather than a tool that supports it. Below that threshold the maths does not hold: a mid-level engineer in India costs ₹12–25 lakh a year in salary alone, plus hiring time, equipment, and management attention, and they cannot ship anything for the first three to six months while you hire them.",
          "A common middle path: use an agency to build version one, then hire in-house to own it once there is a real roadmap and the risk of building the wrong thing is gone.",
        ],
      },
      {
        heading: "How to choose a partner, whichever route you take",
        paragraphs: [
          "Ask the questions whose answers cannot be faked. Portfolios can be borrowed; the four below cannot.",
        ],
        bullets: [
          "Who owns the code, the database, and the cloud accounts when the engagement ends?",
          "Who actually writes the code — your team, or a subcontractor?",
          "Show me something you built that failed, and what you did about it",
          "What is explicitly out of scope in this quote?",
          "What does it cost to change something six months after launch?",
        ],
      },
      {
        heading: "Where we sit, honestly",
        paragraphs: [
          `${DMC.fullName} is an agency, so treat the above as coming from an interested party. We build in-house from ${DMC.location}, you own everything we write, and we will tell you when a project does not need us — a single landing page usually doesn't, and we say so rather than taking the work.`,
        ],
      },
    ],
    faq: [
      {
        q: "Is an agency more expensive than a freelancer?",
        a: "Per hour, yes — usually two to four times. Per shipped project, often not, because an agency carries design, project management, QA, and deployment that a solo developer either skips or bills separately. The comparison only means something at the level of a finished, working system.",
      },
      {
        q: "What happens if we want to move away from our agency?",
        a: "It depends entirely on who owns the code and the infrastructure. If the answer is you, migration is a handover of credentials and documentation. If the agency hosts it on their accounts or on a proprietary platform, you may be rebuilding. Settle this in writing before the first payment, not after.",
      },
      {
        q: "Can we start with an agency and move in-house later?",
        a: "Yes, and it is a sensible sequence. Build version one with an agency, learn what users actually do, then hire against a roadmap you can now describe accurately. This only works if the code and accounts are yours from day one.",
      },
      {
        q: "How do we know an agency is doing the work themselves?",
        a: "Ask to speak to the engineer who will write the code, not just the account manager, and ask during the sales process rather than after. White-labelling is common and not inherently wrong, but you should know who is on the other end before you sign.",
      },
    ],
    related: [
      { label: "What custom software costs", href: "/guides/custom-software-cost-india" },
      { label: "How long does an MVP take?", href: "/guides/mvp-timeline" },
      { label: "See our work", href: "/work" },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
