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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "rebel-copy-co",
    title: "Rebel Copy Co.",
    industry: "Copywriting Studio",
    year: "2026",
    description:
      "A bold editorial website for a personal-brand copy studio built to showcase authority, process, results, and premium positioning.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "forma-creative",
    title: "Forma Creative",
    industry: "Creative Agency",
    year: "2025",
    description:
      "A portfolio-led digital presence with stronger case-study storytelling, clearer service architecture, and conversion-focused inquiry paths.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=900&auto=format&fit=crop&q=60",
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
