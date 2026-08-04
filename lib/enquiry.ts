import { z } from "zod";

/**
 * Shared contract between the contact form and `app/api/enquiry/route.ts`.
 * Both sides parse against the same schema so a payload that passes client-side
 * validation cannot be rejected by the server for a different reason.
 */

export const PROJECT_TYPES = [
  "Website",
  "Product catalog",
  "Ecommerce store",
  "AI chatbot / WhatsApp automation",
  "CRM & lead management",
  "Complete business system",
  "Custom ERP / multi-branch",
  "AI room visualizer",
  "Not sure yet",
] as const;

export const BUDGET_RANGES = [
  "Under ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹6,00,000",
  "₹6,00,000 – ₹15,00,000",
  "₹15,00,000+",
  "Not sure yet",
] as const;

/**
 * When the visitor is happy to be called. One tap, never typed, and defaulted —
 * asking for a specific date and time is the single biggest drop-off on a first
 * enquiry, but a rough window costs nothing and makes the follow-up land.
 */
export const CALL_WINDOWS = [
  "Anytime",
  "Morning (9am–12pm)",
  "Afternoon (12pm–5pm)",
  "Evening (5pm–9pm)",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  company: z.string().trim().max(160).optional().default(""),
  projectType: z.enum(PROJECT_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — 10 characters minimum")
    .max(4000),
  callWindow: z.enum(CALL_WINDOWS).optional().default("Anytime"),
  tier: z.string().trim().max(60).optional().default(""),
  source: z.string().trim().max(80).optional().default("contact-page"),
  /** Honeypot — real users never see this field, so any value means a bot. */
  website: z.string().max(200).optional().default(""),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export type EnquiryResponse = {
  success: boolean;
  error?: string;
  /** Field-level messages, keyed by field name, when validation fails. */
  fieldErrors?: Record<string, string>;
};

/** Maps a pricing tier slug (from `?tier=`) onto a default project type. */
export const TIER_TO_PROJECT_TYPE: Record<string, (typeof PROJECT_TYPES)[number]> = {
  launch: "Website",
  commerce: "Ecommerce store",
  "business-system": "CRM & lead management",
  enterprise: "Custom ERP / multi-branch",
};
