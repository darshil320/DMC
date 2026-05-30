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
    description: "Engineered for ultimate support. The ErgoPro blends breathable mesh with dynamic lumbar support to keep you focused through long workdays.",
    price: "From S$1,290.00",
    variantsText: "3 Base Colors | 2 Sizes",
    colors: [
      { name: "Graphite", hex: "#3A3A3A", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&auto=format&fit=crop&q=60" },
      { name: "Cloud White", hex: "#E8E4DC", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "executive-desk",
    name: "Aura Executive Desk",
    description: "Make a statement. Crafted with premium veneer and clean lines, the Aura desk transforms any executive suite into a modern command center.",
    price: "From S$3,800.00",
    variantsText: "2 Wood Finishes",
    colors: [
      { name: "Walnut", hex: "#5C4033", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=60" },
    ],
    showShopLink: true,
  },
  {
    id: "nottos-outdoor-sofa",
    name: "Nottos Outdoor Sofa",
    description: "Relax in style. Weather-resistant materials meet incredible comfort for your patio or garden.",
    price: "From S$2,490.00",
    variantsText: "2 Fabric Colours | 2 Sizes",
    colors: [
      { name: "Sand", hex: "#D8D2C4", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "manta-outdoor-sofa",
    name: "Manta 2-Seater Outdoor Sofa",
    description: "A compact, elegant solution for outdoor lounging. Durable and stunningly crafted.",
    price: "From S$2,710.00",
    variantsText: "1 Colour | 2 Sizes",
    colors: [
      { name: "Cream", hex: "#F4F1EB", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=60" },
    ],
  }
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
