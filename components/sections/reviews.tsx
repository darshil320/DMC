"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { REVIEWS, ReviewItem, aggregateRating } from "@/data/reviews";

const PLACEHOLDER_RATING_SCORE = 4.9;
const PLACEHOLDER_REVIEW_COUNT = 128;

interface ReviewsProps {
  items?: ReviewItem[];
  title?: string;
  subtitle?: string;
  ratingScore?: number;
  totalReviews?: number;
}

export function Reviews({
  items = REVIEWS,
  title = "BUILT ON TRUST. PROVEN IN PRODUCTION.",
  subtitle = "From Surat's luxury furniture showrooms to high-converting D2C stores — see how visionary founders and enterprise operators scale faster with DMC Tech.",
  ratingScore,
  totalReviews,
}: ReviewsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const verified = aggregateRating();
  const displayedScore = ratingScore ?? verified?.ratingValue ?? PLACEHOLDER_RATING_SCORE;
  const displayedCount = totalReviews ?? verified?.reviewCount ?? PLACEHOLDER_REVIEW_COUNT;

  // Scroll progress through the tall 360vh section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (shouldReduceMotion) {
    return (
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 w-full border-t border-border-harsh bg-bg-page text-text-primary">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
            <div className="max-w-4xl space-y-4">
              <div className="section-tag inline-block text-accent font-bold uppercase tracking-widest text-xs font-mono">
                VERIFIED IMPACT · CLIENT REVIEWS
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                {title}
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>
            <AggregateRatingBadge score={displayedScore} count={displayedCount} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[360vh] border-t border-border-harsh bg-bg-page text-text-primary select-none overflow-visible"
    >
      {/* Sticky Fullscreen Pinned Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12 lg:p-16 max-w-[1440px] mx-auto">
        
        {/* Top Bar: Section Tag & Subtitle / Rating */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="section-tag inline-block text-accent font-bold uppercase tracking-widest text-xs font-mono">
              VERIFIED IMPACT · CLIENT REVIEWS
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-md hidden md:block font-medium">
              {subtitle}
            </p>
            <AggregateRatingBadge score={displayedScore} count={displayedCount} />
          </div>
        </div>

        {/* Center: GIANT Headline (Layered behind cards) */}
        <div className="relative z-0 my-auto max-w-5xl pointer-events-none">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-bold tracking-tighter uppercase leading-[0.85] text-text-primary dark:text-gray-100 select-none">
            {title}
          </h2>
        </div>

        {/* Bottom Subtitle for Mobile */}
        <div className="relative z-10 md:hidden pb-4">
          <p className="text-text-secondary text-xs leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>

        {/* End-to-End Overlapping Travel Lane (Z-Index 20 above title) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-center overflow-hidden">
          {items.map((rev, index) => (
            <WavyReviewCard
              key={rev.id}
              review={rev}
              index={index}
              total={items.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function WavyReviewCard({
  review,
  index,
  total,
  scrollYProgress,
}: {
  review: ReviewItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cardStyle = useTransform(scrollYProgress, (progress: number) => {
    // Stagger each card's travel window across full scroll distance
    const startProgress = (index / total) * 0.58;
    const travelSpan = 0.44;
    const localP = (progress - startProgress) / travelSpan;

    // Full screen width end-to-end travel (from +1350px off-screen right to -1350px off-screen left)
    const startX = 1350;
    const endX = -1350;
    const currentX = startX + localP * (endX - startX);

    // Undulating sine wave vertical bob (amplitude 80px, frequency 3.5 PI)
    const frequency = 3.5 * Math.PI;
    const phaseOffset = index * (Math.PI / 3);
    const currentY = Math.sin(localP * frequency + phaseOffset) * 80;

    // Edge dissolve blur & fade near screen boundaries
    let opacity = 1;
    let blurPx = 0;

    if (localP < 0.1) {
      const edge = Math.max(0, localP / 0.1);
      opacity = edge;
      blurPx = (1 - edge) * 12;
    } else if (localP > 0.9) {
      const edge = Math.max(0, (1 - localP) / 0.1);
      opacity = edge;
      blurPx = (1 - edge) * 12;
    }

    return {
      x: currentX,
      y: currentY,
      opacity: Math.max(0, Math.min(1, opacity)),
      filter: `blur(${blurPx.toFixed(1)}px)`,
    };
  });

  const x = useTransform(cardStyle, (s) => s.x);
  const y = useTransform(cardStyle, (s) => s.y);
  const opacity = useTransform(cardStyle, (s) => s.opacity);
  const filter = useTransform(cardStyle, (s) => s.filter);

  return (
    <motion.div
      style={{ x, y, opacity, filter }}
      className="absolute w-[320px] sm:w-[380px] md:w-[420px] bg-white/25 dark:bg-white/12 backdrop-blur-xl border border-white/30 dark:border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl pointer-events-auto hover:border-accent/80 hover:bg-white/35 dark:hover:bg-white/20 transition-colors duration-300 group"
    >
      <Quote className="absolute top-6 right-6 size-7 text-text-muted/25 group-hover:text-accent/40 transition-colors pointer-events-none" />

      <div>
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-xs sm:text-sm font-medium leading-relaxed text-text-primary dark:text-gray-100 mb-6 drop-shadow-sm">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/20 dark:border-white/15 mt-auto">
        <div
          className={`size-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${review.avatarBg}`}
        >
          {review.initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-bold text-text-primary dark:text-white truncate">
            {review.name}
          </span>
          <span className="text-[10px] sm:text-xs text-text-muted dark:text-gray-300 font-mono truncate">
            {review.role} · <span className="text-accent font-semibold">{review.company}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function AggregateRatingBadge({ score, count }: { score: number; count: number }) {
  return (
    <div className="bg-bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-border-harsh shrink-0 shadow-sm flex items-center gap-4 w-fit">
      <div className="text-2xl font-bold font-sans tracking-tight text-text-primary">
        {score.toFixed(1)}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted font-bold mt-0.5">
          {count}+ VERIFIED REVIEWS
        </span>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="bg-bg-card border border-border-harsh p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full shadow-sm hover:border-accent/40 transition-colors duration-300 relative group">
      <Quote className="absolute top-6 right-6 size-8 text-text-muted/15 group-hover:text-accent/20 transition-colors pointer-events-none" />

      <div>
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-xs sm:text-sm font-normal leading-relaxed text-text-secondary mb-6">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border-harsh/30 mt-auto">
        <div
          className={`size-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${review.avatarBg}`}
        >
          {review.initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-bold text-text-primary truncate">
            {review.name}
          </span>
          <span className="text-[10px] sm:text-xs text-text-muted font-mono truncate">
            {review.role} · <span className="text-accent">{review.company}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
