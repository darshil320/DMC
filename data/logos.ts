/**
 * Logo wall entries.
 *
 * ⚠️  READ BEFORE LAUNCH — these are real, identifiable third-party brands
 * (Nykaa, SUGAR, Cetaphil, Raymond, Innisfree, mokobara, Wonderla, Beardo and
 * others) rendered under a "trusted by" heading. Unlike an invented testimonial
 * name, naming a real company as a client when they are not is a false claim
 * about an identifiable third party — trademark and passing-off exposure, and
 * an instant credibility loss if a prospect checks.
 *
 * `permissioned` marks entries you actually have written sign-off to display.
 * Filter the wall on it before this ships:
 *
 *     items={LOGO_ITEMS.filter((logo) => logo.permissioned)}
 *
 * If that leaves too few to fill a wall, the honest options are a smaller wall,
 * an industries-served strip ("furniture · hospitality · health"), or dropping
 * the section until there are enough real names.
 */

export interface LogoItem {
  id: string;
  name: string;
  category: string;
  bgColor: string;
  textColor: string;
  fontStyle?: string;
  rotation: number;
  /** Written permission on file to display this brand as a client. */
  permissioned: boolean;
}

export const LOGO_ITEMS: LogoItem[] = [
  { id: "1", name: "ZEN DIAMOND", category: "Luxury", bgColor: "bg-[#F0F2F5]", textColor: "text-neutral-900", fontStyle: "font-serif tracking-widest uppercase font-bold text-xs sm:text-sm", permissioned: false, rotation: -4.2 },
  { id: "2", name: "NYKAA", category: "E-Commerce", bgColor: "bg-[#FF1493]", textColor: "text-white", fontStyle: "font-sans italic font-black text-base sm:text-xl", permissioned: false, rotation: 3.5 },
  { id: "3", name: "WOW", category: "Beauty", bgColor: "bg-[#F4F4F6]", textColor: "text-neutral-900", fontStyle: "font-sans font-extrabold tracking-tight text-sm sm:text-base", permissioned: false, rotation: -2.1 },
  { id: "4", name: "DOT & KEY", category: "Skincare", bgColor: "bg-[#EAF2F8]", textColor: "text-neutral-800", fontStyle: "font-mono font-medium tracking-wide text-xs sm:text-sm", permissioned: false, rotation: 5.0 },
  { id: "5", name: "SALAD DAYS", category: "Food & Beverage", bgColor: "bg-[#5BB4B4]", textColor: "text-white", fontStyle: "font-serif tracking-widest font-semibold text-[10px] sm:text-xs", permissioned: false, rotation: -3.8 },
  { id: "6", name: "KNYA", category: "Apparel", bgColor: "bg-[#3B3A82]", textColor: "text-white", fontStyle: "font-sans uppercase font-black tracking-widest text-xs sm:text-sm", permissioned: false, rotation: 4.1 },
  { id: "7", name: "à la mode", category: "Fashion", bgColor: "bg-[#F5E6E8]", textColor: "text-neutral-900", fontStyle: "font-serif italic font-normal text-sm sm:text-base", permissioned: false, rotation: -5.4 },
  { id: "8", name: "Kamero", category: "Tech", bgColor: "bg-[#ECEEFA]", textColor: "text-[#5C56E1]", fontStyle: "font-sans font-bold tracking-tight text-xs sm:text-sm", permissioned: false, rotation: 1.8 },
  { id: "9", name: "Wonderla", category: "Hospitality", bgColor: "bg-[#FFFFFF]", textColor: "text-[#1E3A8A]", fontStyle: "font-sans font-black tracking-tight text-[#E11D48] text-xs sm:text-sm", permissioned: false, rotation: -3.2 },
  { id: "10", name: "Foxtale", category: "Beauty", bgColor: "bg-[#FF5500]", textColor: "text-white", fontStyle: "font-serif italic font-bold text-xs sm:text-sm", permissioned: false, rotation: 4.8 },
  { id: "11", name: "SUGAR", category: "Cosmetics", bgColor: "bg-[#18181B]", textColor: "text-white", fontStyle: "font-sans font-extrabold tracking-widest uppercase text-xs sm:text-sm", permissioned: false, rotation: -1.5 },
  { id: "12", name: "nailinit", category: "Lifestyle", bgColor: "bg-[#EFF2F6]", textColor: "text-neutral-900", fontStyle: "font-mono font-bold tracking-tight text-xs sm:text-sm", permissioned: false, rotation: 2.7 },
  { id: "13", name: "COMET", category: "Footwear", bgColor: "bg-[#121212]", textColor: "text-white", fontStyle: "font-sans uppercase font-black tracking-wider text-base sm:text-lg", permissioned: false, rotation: -4.9 },
  { id: "14", name: "Whole Truth", category: "Nutrition", bgColor: "bg-[#FDE2E4]", textColor: "text-[#9E2A2B]", fontStyle: "font-serif font-bold italic leading-tight text-[10px] sm:text-xs", permissioned: false, rotation: 3.9 },
  { id: "15", name: "VEDIC LAB", category: "Wellness", bgColor: "bg-[#4B7B47]", textColor: "text-white", fontStyle: "font-sans uppercase font-semibold tracking-widest text-[10px] sm:text-xs", permissioned: false, rotation: -2.8 },
  { id: "16", name: "SVARAA", category: "Jewelry", bgColor: "bg-[#064E3B]", textColor: "text-[#D1D5DB]", fontStyle: "font-serif tracking-widest uppercase font-light text-[10px] sm:text-xs", permissioned: false, rotation: 5.2 },
  { id: "17", name: "Cetaphil", category: "Skincare", bgColor: "bg-[#E6F0FA]", textColor: "text-[#1D4ED8]", fontStyle: "font-sans font-black italic text-xs sm:text-base", permissioned: false, rotation: -3.6 },
  { id: "18", name: "cello", category: "Homeware", bgColor: "bg-[#E11D48]", textColor: "text-white", fontStyle: "font-sans font-black uppercase text-base sm:text-xl tracking-tighter", permissioned: false, rotation: 2.1 },
  { id: "19", name: "mokobara", category: "Travel Gear", bgColor: "bg-[#F59E0B]", textColor: "text-neutral-900", fontStyle: "font-sans font-bold lowercase tracking-tight text-xs sm:text-sm", permissioned: false, rotation: -4.5 },
  { id: "20", name: "AÏZA", category: "Fashion", bgColor: "bg-[#EA580C]", textColor: "text-white", fontStyle: "font-serif uppercase font-bold tracking-widest text-sm sm:text-lg", permissioned: false, rotation: 3.1 },
  { id: "21", name: "Raymond", category: "Apparel", bgColor: "bg-[#DC2626]", textColor: "text-white", fontStyle: "font-serif italic font-bold tracking-tight text-xs sm:text-base", permissioned: false, rotation: -2.3 },
  { id: "22", name: "Indus Valley", category: "Ayurveda", bgColor: "bg-[#F5F5DC]", textColor: "text-[#15803D]", fontStyle: "font-serif uppercase font-medium tracking-wide text-[10px] sm:text-xs", permissioned: false, rotation: 4.4 },
  { id: "23", name: "INNISFREE", category: "Beauty", bgColor: "bg-[#059669]", textColor: "text-white", fontStyle: "font-sans uppercase font-extrabold tracking-widest text-[10px] sm:text-xs", permissioned: false, rotation: -3.9 },
  { id: "24", name: "MOXIE", category: "Fitness", bgColor: "bg-[#CCFF00]", textColor: "text-neutral-900", fontStyle: "font-sans font-black uppercase tracking-wider text-xs sm:text-base", permissioned: false, rotation: 1.9 },
  { id: "25", name: "Sleep Co.", category: "Furniture", bgColor: "bg-[#E2E8F0]", textColor: "text-[#1E293B]", fontStyle: "font-sans uppercase font-bold text-[10px] sm:text-xs tracking-tight", permissioned: false, rotation: -4.1 },
  { id: "26", name: "ReplyAll", category: "Software", bgColor: "bg-[#1C1917]", textColor: "text-white", fontStyle: "font-serif italic font-medium text-xs sm:text-base", permissioned: false, rotation: 3.3 },
  { id: "27", name: "frido", category: "Comfort", bgColor: "bg-[#FACC15]", textColor: "text-neutral-900", fontStyle: "font-sans font-black lowercase text-xs sm:text-base tracking-tight", permissioned: false, rotation: -2.6 },
  { id: "28", name: "BEARDO", category: "Grooming", bgColor: "bg-[#F3F4F6]", textColor: "text-neutral-900", fontStyle: "font-sans font-black uppercase tracking-widest text-xs sm:text-base", permissioned: false, rotation: 4.7 },
  { id: "29", name: "KALKI", category: "Couture", bgColor: "bg-[#FAFAFA]", textColor: "text-neutral-900", fontStyle: "font-serif uppercase font-light tracking-[0.25em] text-[10px] sm:text-xs", permissioned: false, rotation: -1.8 },
  { id: "30", name: "BharatGo", category: "Logistics", bgColor: "bg-[#F3F4F6]", textColor: "text-[#EA580C]", fontStyle: "font-sans font-extrabold text-xs sm:text-sm tracking-tight", permissioned: false, rotation: 3.6 },
];
