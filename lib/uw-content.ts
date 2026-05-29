export const STYLES = [
  "Executive & Premium",
  "Ergonomic Comfort",
  "Modern Collaborative",
  "Minimalist Workstations",
  "Space Optimization",
] as const;

export const PRODUCTS = [
  {
    id: "ergo-pro-chair",
    name: "ErgoPro Task Chair",
    description:
      "Engineered for ultimate support. The ErgoPro blends breathable mesh with dynamic lumbar support to keep you focused through long workdays.",
    colors: [
      {
        name: "Graphite",
        hex: "#3A3A3A",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1200&q=100",
      },
      {
        name: "Cloud White",
        hex: "#E8E4DC",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=100",
      },
      {
        name: "Slate",
        hex: "#6E737A",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=100",
      },
      {
        name: "Navy",
        hex: "#2C3E50",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=100",
      },
    ],
  },
  {
    id: "executive-desk",
    name: "Aura Executive Desk",
    description:
      "Make a statement. Crafted with premium veneer and clean lines, the Aura desk transforms any executive suite into a modern command center.",
    colors: [
      {
        name: "Walnut",
        hex: "#5C4033",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=100",
      },
      {
        name: "Oak",
        hex: "#A0816C",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=100",
      },
      {
        name: "Matte Black",
        hex: "#1A1A1A",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=100",
      },
    ],
    price: "₹38,000",
    showShopLink: true,
  },
  {
    id: "modular-workstation",
    name: "Nexus Collaborative Hub",
    description:
      "Designed for agile teams. Nexus workstations provide acoustic privacy while fostering open communication and seamless cable management.",
    colors: [
      {
        name: "Ash Grey",
        hex: "#D8D2C4",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=100",
      },
      {
        name: "Warm Beige",
        hex: "#E8C4B8",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=100",
      },
      {
        name: "Steel",
        hex: "#9E9690",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=100",
      },
    ],
  },
] as const;

export const DESIGNERS = [
  { name: "Herman Miller", role: "Inspiration" },
  { name: "Steelcase", role: "Ergonomics" },
  { name: "Haworth", role: "Workstations" },
  { name: "Knoll", role: "Executive" },
  { name: "Humanscale", role: "Accessories" },
] as const;

export const FOOTER_LINKS = {
  Categories: ["Office Chairs", "Executive Desks", "Workstations", "Conference Tables", "Storage Cabinets", "Reception Desks"],
  Company: ["About Us", "Projects & Portfolio", "B2B Bulk Orders", "Careers", "Contact Us"],
  "Visit Us": ["Shree Arc, Sosyo Circle", "Opp. Shanidev Temple", "Udhna Main Road, Surat", "+91 98765 43210"],
} as const;
