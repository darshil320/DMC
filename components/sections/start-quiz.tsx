"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/pricing";
import { QUIZ_QUESTIONS, resolveQuiz, type QuizAnswers } from "@/lib/quiz";
import { TIER_TO_PROJECT_TYPE } from "@/lib/enquiry";

/**
 * Self-qualification in three questions.
 *
 * Pure client state, no backend, no library. The point is that a visitor who
 * doesn't know what they need can find out without talking to anyone — and
 * lands on a pre-filled enquiry form rather than a WhatsApp thread.
 */
export function StartQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [hasStarted, setHasStarted] = useState(false);

  const result = resolveQuiz(answers);
  const isComplete = step >= QUIZ_QUESTIONS.length && result !== null;

  const choose = (questionId: keyof QuizAnswers, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      analytics.quizStart();
    }

    const next = { ...answers, [questionId]: value };
    setAnswers(next);

    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep >= QUIZ_QUESTIONS.length) {
      const resolved = resolveQuiz(next);
      if (resolved) analytics.quizComplete(resolved.tier.slug);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  if (isComplete) {
    const { tier, reason } = result;
    const price =
      tier.startingPrice === null ? "Custom quote" : `From ${formatPrice(tier.startingPrice)}`;

    return (
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="section-tag">YOUR MATCH</div>
          <h2 className="mb-4 text-3xl font-medium uppercase tracking-tighter text-text-primary md:text-5xl">
            {tier.name}
          </h2>
          <p className="mb-6 font-serif text-2xl font-medium text-text-primary md:text-3xl">
            {price} · {tier.timeline}
          </p>

          <p className="mb-8 border-l-2 border-accent pl-5 leading-relaxed text-text-primary">
            {reason}
          </p>

          <h3 className="mb-4 font-pixel text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            What&apos;s included
          </h3>
          <ul className="mb-8 flex flex-col gap-3">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-text-secondary">
                <span aria-hidden className="mt-[10px] size-1.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mb-8 text-sm text-text-muted">
            <span className="font-bold uppercase tracking-[0.14em]">Not included: </span>
            {tier.excludes}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={restart}
              className="border border-border-harsh px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              ‹ Start over
            </button>
            <Link
              href="/#pricing"
              className="border border-border-harsh px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              See all packages
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-border-harsh p-6 lg:sticky lg:top-28">
            <h3 className="mb-2 text-xl font-medium uppercase tracking-tighter text-text-primary">
              Get it scoped
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">
              We&apos;ve filled in what you told us. Add your details and you&apos;ll get scope,
              price, and timeline in writing.
            </p>
            <EnquiryForm
              source={`quiz:${tier.slug}`}
              defaultProjectType={TIER_TO_PROJECT_TYPE[tier.slug] ?? "Not sure yet"}
              tone="light"
            />
          </div>
        </div>
      </div>
    );
  }

  const current = QUIZ_QUESTIONS[Math.min(step, QUIZ_QUESTIONS.length - 1)];

  return (
    <div className="max-w-[880px]">
      <div className="section-tag">
        STEP {step + 1} OF {QUIZ_QUESTIONS.length}
      </div>

      {/* Progress rail */}
      <div className="mb-10 flex gap-2" aria-hidden>
        {QUIZ_QUESTIONS.map((question, index) => (
          <span
            key={question.id}
            className={`h-1 flex-1 ${index <= step ? "bg-accent" : "bg-border-harsh/30"}`}
          />
        ))}
      </div>

      <h2 className="mb-10 text-3xl font-medium uppercase leading-[1.05] tracking-tighter text-text-primary md:text-5xl">
        {current.question}
      </h2>

      <div className="flex flex-col border-t border-border-harsh">
        {current.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => choose(current.id, option.value)}
            className="group flex items-center justify-between gap-6 border-b border-border-harsh px-2 py-6 text-left transition-colors hover:bg-accent"
          >
            <span className="text-base font-medium leading-snug text-text-primary group-hover:text-white md:text-lg">
              {option.label}
            </span>
            <span className="shrink-0 text-accent transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          className="mt-8 text-[11px] font-black uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-accent"
        >
          ‹ Back
        </button>
      )}
    </div>
  );
}
