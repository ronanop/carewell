"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { GOOGLE_REVIEWS_SECTION } from "@/data/homepage";
import type { ReviewSnapshot } from "@/lib/reviews";

type Props = {
  reviews: ReviewSnapshot;
};

const AVATAR_COLORS = ["#0B7B6B", "#1557A0", "#7C3AED", "#EA580C", "#0EA5E9", "#DC2626", "#059669"];

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

function scoreLabel(rating: number) {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4) return "Very Good";
  if (rating >= 3.5) return "Good";
  return "Rated";
}

function GoldStars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z"
            fill={i < Math.round(rating) ? "#FACC15" : "#E5E7EB"}
          />
        </svg>
      ))}
    </div>
  );
}

export function GoogleReviewsSection({ reviews }: Props) {
  const ratingValue = parseFloat(reviews.rating) || 4.3;
  const cards = reviews.reviews.slice(0, 8);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const reviewCountFormatted = useMemo(() => {
    const n = parseInt(reviews.reviewCount.replace(/\D/g, ""), 10);
    return Number.isFinite(n) ? n.toLocaleString("en-IN") : reviews.reviewCount;
  }, [reviews.reviewCount]);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [cards.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-review-card]");
    const step = firstCard ? firstCard.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <SectionShell variant="surface" aria-labelledby="patient-reviews-heading">
      <div className="container">
        <SectionHeader
          id="patient-reviews-heading"
          eyebrow={GOOGLE_REVIEWS_SECTION.eyebrow}
          title={GOOGLE_REVIEWS_SECTION.title}
          description={GOOGLE_REVIEWS_SECTION.description}
        />

        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--color-border-light)] bg-white shadow-[0_8px_40px_-12px_rgba(10,46,82,0.12)] sm:mt-10 lg:mt-12">
          <div className="grid lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
            {/* Aggregate score */}
            <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden border-b border-[var(--color-border-light)] bg-gradient-to-br from-[#F5E9E3]/90 via-white to-primary/5 px-6 py-8 text-center sm:py-10 lg:border-b-0 lg:border-r lg:py-12">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-teal/15 blur-xl"
                aria-hidden
              />

              <Image
                src="/google-icon.png"
                alt="Google"
                width={72}
                height={72}
                className="relative h-10 w-auto object-contain"
              />

              <div className="relative">
                <p className="font-heading text-5xl font-bold tracking-tight text-navy sm:text-6xl">
                  {reviews.rating}
                  <span className="text-2xl font-semibold text-navy/40 sm:text-3xl">/5</span>
                </p>
                <p className="mt-1 text-overline font-bold uppercase tracking-[0.2em] text-teal">
                  {scoreLabel(ratingValue)}
                </p>
              </div>

              <GoldStars rating={ratingValue} size={22} />

              <p className="relative max-w-[200px] text-body-sm leading-snug text-text-secondary">
                Based on{" "}
                <span className="font-bold text-navy">{reviewCountFormatted}+</span> verified Google
                reviews
              </p>

              <div className="relative mt-1 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-navy/70 shadow-sm ring-1 ring-navy/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1557A0" aria-hidden>
                  <path d="M12 2l2.4 1.8 3 .2.2 3L19.4 9.6 21 12l-1.6 2.4-.8 2.8-3 .2L13.2 19 12 21l-2.4-1.8-3-.2-.2-3L4.6 14.4 3 12l1.6-2.4.8-2.8 3-.2L10.8 5 12 2z" />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                Care Well Medical Centre, Delhi
              </div>
            </div>

            {/* Review carousel */}
            <div className="relative min-w-0 bg-gradient-to-b from-white to-surface/40 p-4 sm:p-6 lg:p-7">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
                aria-label="Previous reviews"
                className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-md transition hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-25 lg:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
                aria-label="Next reviews"
                className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-md transition hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-25 lg:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              <div
                ref={scrollerRef}
                className="reviews-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 pt-1"
              >
                {cards.map((review) => {
                  const initial = (review.author.trim()[0] ?? "P").toUpperCase();
                  const avatarBg = AVATAR_COLORS[hashString(review.author) % AVATAR_COLORS.length];

                  return (
                    <article
                      key={review.id}
                      data-review-card
                      className="group relative flex w-[min(88vw,320px)] shrink-0 snap-start flex-col rounded-2xl border border-[var(--color-border-light)] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md sm:w-[300px] lg:w-[calc((100%-2rem)/2)]"
                    >
                      <span
                        className="pointer-events-none absolute right-4 top-3 font-serif text-5xl leading-none text-primary/10 transition group-hover:text-primary/15"
                        aria-hidden
                      >
                        &ldquo;
                      </span>

                      <header className="relative flex items-start gap-3">
                        <span
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                          style={{ backgroundColor: avatarBg }}
                          aria-hidden
                        >
                          {initial}
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="truncate font-heading text-sm font-bold text-navy">{review.author}</p>
                          <p className="text-xs text-text-secondary">Google review</p>
                        </div>
                        <Image
                          src="/google-icon.png"
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 object-contain opacity-80"
                          aria-hidden
                        />
                      </header>

                      <div className="relative mt-3">
                        <GoldStars rating={ratingValue} size={14} />
                      </div>

                      <p className="relative mt-3 flex-1 text-body-sm leading-relaxed text-navy/85 line-clamp-5">
                        {review.text}
                      </p>
                    </article>
                  );
                })}
              </div>

              <p className="mt-4 text-center text-xs text-navy/50 lg:hidden">Swipe for more reviews →</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Link
            href={GOOGLE_REVIEWS_SECTION.googleSearchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-navy/90"
          >
            <Image src="/google-icon.png" alt="" width={20} height={20} className="brightness-0 invert" aria-hidden />
            See all reviews on Google
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
          <p className="text-center text-xs text-text-secondary sm:text-left">
            Reviews shown as posted on Google · Updated periodically
          </p>
        </div>
      </div>

      <style jsx>{`
        :global(.reviews-scroller) {
          scrollbar-width: none;
        }
        :global(.reviews-scroller::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </SectionShell>
  );
}
