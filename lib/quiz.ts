import { PRICING_TIERS, type PricingTier } from "@/lib/pricing";

/**
 * Three-question intent router.
 *
 * Replaces the old "Not sure which fits? → WhatsApp" escape hatch, which turned
 * an anonymous self-serve visitor into a manual sales conversation. Q1 picks the
 * tier, Q2 can escalate it, Q3 only records urgency.
 */

export type TierSlug = PricingTier["slug"];

export type QuizOption = {
  value: string;
  label: string;
  /** Only on Q1: the tier this symptom maps to. */
  tier?: TierSlug;
  /** Only on Q2: team-size rank, used to escalate. */
  rank?: number;
};

export type QuizQuestion = {
  id: "problem" | "size" | "timing";
  question: string;
  options: readonly QuizOption[];
};

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "problem",
    question: "What's the main thing you want to fix?",
    options: [
      {
        value: "presence",
        label: "We don't have a proper website — we look smaller online than we are",
        tier: "launch",
      },
      {
        value: "selling",
        label: "We can't sell online, and customers can't see prices without calling",
        tier: "commerce",
      },
      {
        value: "leads",
        label: "We're losing leads — follow-ups happen on WhatsApp and from memory",
        tier: "business-system",
      },
      {
        value: "systems",
        label: "Our systems don't talk to each other across branches or teams",
        tier: "business-system",
      },
    ],
  },
  {
    id: "size",
    question: "How many people will this system touch?",
    options: [
      { value: "solo", label: "Just me, or under 5", rank: 1 },
      { value: "small", label: "5 – 25", rank: 2 },
      { value: "mid", label: "25 – 100", rank: 3 },
      { value: "large", label: "100+", rank: 4 },
    ],
  },
  {
    id: "timing",
    question: "When do you want it live?",
    options: [
      { value: "asap", label: "As soon as possible — this month" },
      { value: "quarter", label: "In the next 1–3 months" },
      { value: "later", label: "This year, no fixed date" },
      { value: "exploring", label: "Still exploring options" },
    ],
  },
];

/** Team size at which each starting tier escalates to Enterprise. */
const ESCALATION_THRESHOLD: Record<string, number> = {
  launch: 3,
  commerce: 4,
  "business-system": 4,
};

export type QuizAnswers = {
  problem?: string;
  size?: string;
  timing?: string;
};

export type QuizResult = {
  tier: PricingTier;
  escalated: boolean;
  /** Plain-language reason, shown to the visitor so the result isn't a black box. */
  reason: string;
};

export function resolveQuiz(answers: QuizAnswers): QuizResult | null {
  const problemOption = QUIZ_QUESTIONS[0].options.find((o) => o.value === answers.problem);
  const sizeOption = QUIZ_QUESTIONS[1].options.find((o) => o.value === answers.size);

  if (!problemOption?.tier || !sizeOption?.rank) return null;

  const baseSlug = problemOption.tier;
  const threshold = ESCALATION_THRESHOLD[baseSlug] ?? Infinity;
  const escalated = sizeOption.rank >= threshold;
  const slug: TierSlug = escalated ? "enterprise" : baseSlug;

  const tier = PRICING_TIERS.find((t) => t.slug === slug);
  if (!tier) return null;

  return {
    tier,
    escalated,
    reason: escalated
      ? `At ${sizeOption.label.toLowerCase()} people, what you described stops being one system and becomes several that have to agree with each other. That's the Enterprise track.`
      : `You described a ${problemOption.label.toLowerCase().replace(/^we /, "")} problem, at ${sizeOption.label.toLowerCase()} people. ${tier.name} is scoped for exactly that.`,
  };
}
