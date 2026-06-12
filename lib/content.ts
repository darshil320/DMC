export const FAQ_ITEMS = [
  { q: "Do you build websites for small and local businesses?", a: "Yes — that's one of our core offerings. We build professional websites for shops, studios, clinics, restaurants, and service businesses across Ahmedabad and Gujarat. Most websites are up and running within 14 days." },
  { q: "What else do you build besides websites?", a: "We build complete business systems — CRM, AI WhatsApp chatbots, lead management pipelines, ERP modules, staff dashboards, face recognition entry systems, order management, and custom integrations. We take entire business operations online." },
  { q: "What is the AI WhatsApp chatbot?", a: "It's an intelligent WhatsApp assistant trained on your actual catalog, pricing, and customer history. It answers customer questions in Hindi, Hinglish, or Gujarati — sends product images with prices, handles enquiries 24/7, and escalates to your team when needed. All through the official WhatsApp Business API." },
  { q: "Can you build a custom CRM for my business?", a: "Yes. We build CRMs tailored to how your business actually runs — capturing leads from Instagram, Facebook, Google, walk-ins, and WhatsApp into one dashboard. Every lead gets auto-assigned to a salesperson with follow-up triggers and conversion tracking." },
  { q: "What do you mean by complete business systems?", a: "We digitize your entire operation — from customer-facing systems like websites and chatbots, to internal tools like order management, workshop tracking, supplier POs, delivery scheduling, staff dashboards, and automated alerts. Think of it as a custom ERP built for your specific workflows." },
  { q: "How much does a project cost?", a: "A focused website starts at ₹90,000. Product catalogs from ₹1,50,000. Full ecommerce at ₹3,00,000. Complete business systems — CRM, AI chatbots, lead automation, dashboards — are scoped and quoted after we understand your operation. Every price is transparent, no hidden fees." },
  { q: "Do you build ecommerce stores that accept online payments?", a: "Yes. We integrate payment gateways so your customers can pay by UPI, cards, or net banking. You get an order dashboard, inventory management, and automated order confirmation emails." },
  { q: "What is the AI Room Visualizer?", a: "It's a web tool we build for furniture, flooring, and interior décor businesses. Customers upload a photo of their room and the AI places your product inside it — helping them visualize before they buy. It runs entirely in the browser, no app download needed." },
  { q: "Will my website work on mobile phones?", a: "Every site and dashboard we build is mobile-first and tested across all screen sizes. Over 75% of local business traffic in India comes from mobile — we make sure everything performs perfectly on every device." },
  { q: "Can you help us show up on Google and Google Maps?", a: "Yes. We handle Google Business Profile setup, on-page SEO, structured data markup, and sitemap submission so your business appears in local search results and on Google Maps." },
  { q: "How long does it take to launch?", a: "A starter website typically goes live in 7–14 days. Ecommerce projects take 3–5 weeks. Complete business systems with AI chatbots, CRM, and automation are typically 8–12 weeks. We give you a clear timeline before work begins." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. Our maintenance plans cover content updates, performance monitoring, bug fixes, system health checks, and priority WhatsApp support. You'll never be left handling technical issues alone." },
  { q: "We're based in Ahmedabad — can we meet in person?", a: "Absolutely. We're based in Ahmedabad and work with businesses across Gujarat. We prefer meeting local clients in person before we start. Reach us on WhatsApp or email and we'll set up a time." },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const work = [
  {
    id: "northline-education",
    title: "Northline Education",
    industry: "Education / Consulting",
    year: "2026",
    description:
      "A strategic website system for an education consultancy helping international students understand options, build trust, and book qualified calls.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "rebel-copy-co",
    title: "Rebel Copy Co.",
    industry: "Copywriting Studio",
    year: "2026",
    description:
      "A bold editorial website for a personal-brand copy studio built to showcase authority, process, results, and premium positioning.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "forma-creative",
    title: "Forma Creative",
    industry: "Creative Agency",
    year: "2025",
    description:
      "A portfolio-led digital presence with stronger case-study storytelling, clearer service architecture, and conversion-focused inquiry paths.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=900&auto=format&fit=crop&q=80",
  },
] as const;

export const services = [
  {
    id: "one-page-website",
    name: "One-Page Website",
    timeline: "2–3 Weeks",
    description:
      "A focused single-page website that tells your complete story, showcases your offer, builds trust, and guides visitors toward booking.",
    bestFor: [
      "Personal brands",
      "Launch campaigns",
      "Sales pages",
      "Early-stage agencies",
    ],
    cta: "Start Here",
  },
  {
    id: "full-website",
    name: "Full Website",
    timeline: "3–6 Weeks",
    description:
      "A multi-page custom website with strategic structure, service pages, case studies, process, proof, and conversion paths.",
    bestFor: [
      "Agencies",
      "Consultancies",
      "Service businesses",
      "Creative studios",
    ],
    cta: "Build the Site",
  },
  {
    id: "website-growth-system",
    name: "Website Growth System",
    timeline: "4–8 Weeks",
    description:
      "A complete website plus the systems behind it — automations, CRM flow, onboarding, email sequences, and optimization support.",
    bestFor: [
      "Scaling agencies",
      "High-ticket services",
      "Teams with inbound traffic",
      "Businesses ready to automate",
    ],
    cta: "Scale the System",
  },
] as const;

export const testimonials = [
  {
    quote:
      "They helped us say what we were trying to say for months. The site finally feels like the level of work we actually deliver.",
    name: "Aarav Mehta",
    role: "Founder",
    company: "Northline Education",
    initials: "AM",
  },
  {
    quote:
      "This was not just design. It clarified our offer, our story, and the entire path from first impression to inquiry.",
    name: "Maya Kapoor",
    role: "Creative Director",
    company: "Forma Creative",
    initials: "MK",
  },
  {
    quote:
      "We went from explaining everything manually to sending people to a site that does the heavy lifting before the first call.",
    name: "Rhea Shah",
    role: "Consultant",
    company: "Independent Strategy Studio",
    initials: "RS",
  },
] as const;

export const problems = [
  {
    number: "01",
    problem: "People land on your site and still do not understand what you do.",
    solution: "Clear positioning, sharp messaging, and a structured story.",
  },
  {
    number: "02",
    problem: "Your work looks strong, but the site does not create urgency.",
    solution: "Case studies, proof, and CTAs placed with intention.",
  },
  {
    number: "03",
    problem: "Leads ask basic questions before booking.",
    solution: "A site that educates, filters, and qualifies before the call.",
  },
  {
    number: "04",
    problem: "Your backend process is manual and messy.",
    solution: "Booking flows, automations, onboarding, and connected systems.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Map",
    subtitle: "Strategy // Structure",
    description:
      "We define your goals, audience, offer, positioning, proof, and the exact path visitors need to take from curious to ready.",
    deliverables: [
      "Site strategy",
      "Offer architecture",
      "Page flow",
      "Conversion map",
    ],
  },
  {
    number: "02",
    title: "Make",
    subtitle: "Design // Experience",
    description:
      "We turn the strategy into a visual experience that feels premium, communicates clearly, and moves people through your story with intention.",
    deliverables: [
      "Visual direction",
      "Homepage design",
      "Service pages",
      "Case-study layouts",
    ],
  },
  {
    number: "03",
    title: "Move",
    subtitle: "Development // Systems",
    description:
      "We build the site cleanly, connect the tools, and set up the flows that help qualify, educate, and move leads toward booking.",
    deliverables: [
      "Responsive development",
      "CMS or content structure",
      "Booking flow",
      "Automation setup",
    ],
  },
] as const;
