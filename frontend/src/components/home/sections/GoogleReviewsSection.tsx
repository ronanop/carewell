"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { GOOGLE_REVIEWS_SECTION } from "@/data/homepage";
import type { ReviewSnapshot } from "@carewell/backend/lib/reviews";

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

function RatingPanelDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-10 top-6 h-44 w-44 rounded-full bg-[#F6D7C3]/25 blur-2xl" />
      <div className="absolute -left-8 bottom-4 h-36 w-36 rounded-full bg-[#D9E8FF]/30 blur-2xl" />
      <svg className="absolute right-4 top-10 opacity-[0.12]" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M10 60 Q40 10 70 40" stroke="#0A3A75" strokeWidth="1.5" />
        <path d="M5 45 Q35 5 65 35" stroke="#F6D7C3" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-12 left-6 opacity-[0.1]" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M8 50 Q30 8 52 30" stroke="#0A3A75" strokeWidth="1.5" />
      </svg>
      {[
        { top: "18%", left: "72%", size: 6 },
        { top: "62%", left: "12%", size: 5 },
        { top: "78%", left: "68%", size: 4 },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#F6D7C3]/40"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
        />
      ))}
    </div>
  );
}

function NavButton({
  dir,
  disabled,
  onClick,
  className = "",
}: {
  dir: -1 | 1;
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? "Previous reviews" : "Next reviews"}
      className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/92 text-[#0A3A75] shadow-[0_6px_28px_rgba(10,58,117,0.14)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(10,58,117,0.18)] disabled:pointer-events-none disabled:opacity-30 sm:h-14 sm:w-14 ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
        <path d={dir < 0 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export function GoogleReviewsSection({ reviews }: Props) {
  const ratingValue = parseFloat(reviews.rating) || 4.3;
  const cards = reviews.reviews.slice(0, 8);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const reviewCountFormatted = useMemo(() => {
    const n = parseInt(reviews.reviewCount.replace(/\D/g, ""), 10);
    return Number.isFinite(n) ? n.toLocaleString("en-IN") : reviews.reviewCount;
  }, [reviews.reviewCount]);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);

    const firstCard = el.querySelector<HTMLElement>("[data-review-card]");
    if (firstCard) {
      const step = firstCard.offsetWidth + 16;
      const index = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(Math.max(index, 0), cards.length - 1));
    }
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
    <SectionShell aria-labelledby="patient-reviews-heading" className="bg-white">
      <div className="container">
        <header className="mx-auto max-w-[700px] text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#F6D7C3] sm:w-14" aria-hidden />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#F6D7C3]/80" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0A3A75]/55">
              {GOOGLE_REVIEWS_SECTION.eyebrow}
            </p>
            <span className="h-1.5 w-1.5 rotate-45 bg-[#D9E8FF]" aria-hidden />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D9E8FF] sm:w-14" aria-hidden />
          </div>
          <h2
            id="patient-reviews-heading"
            className="mt-4 font-heading text-3xl font-bold leading-tight text-[#0A3A75] md:text-4xl lg:text-[2.5rem]"
          >
            {GOOGLE_REVIEWS_SECTION.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#0A3A75]/55 md:text-lg">
            {GOOGLE_REVIEWS_SECTION.description}
          </p>
        </header>

        <div className="relative mt-8 overflow-hidden rounded-[32px] bg-white shadow-[0_10px_48px_rgba(10,58,117,0.09),0_2px_12px_rgba(10,58,117,0.04)] sm:mt-10">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFF9F6]/80 via-white to-[#F5F9FF]/60"
            aria-hidden
          />

          <div className="relative flex flex-col p-8 sm:p-10 lg:flex-row lg:items-stretch lg:p-12">
            {/* Rating panel — 30% */}
            <div className="relative flex min-h-[280px] shrink-0 flex-col items-center justify-center gap-4 text-center sm:gap-5 lg:w-[30%] lg:min-h-[340px] lg:gap-4 lg:pr-4">
              <RatingPanelDecor />

              <Image
                src="/google-icon.png"
                alt="Google"
                width={80}
                height={80}
                className="relative h-14 w-auto object-contain sm:h-16"
              />

              <div className="relative">
                <p className="font-heading text-5xl font-bold leading-none tracking-tight text-[#0A3A75] sm:text-6xl lg:text-[4rem]">
                  {reviews.rating}
                  <span className="text-xl font-semibold text-[#0A3A75]/30 sm:text-2xl">/5</span>
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-teal">
                  {scoreLabel(ratingValue)}
                </p>
              </div>

              <GoldStars rating={ratingValue} size={22} />

              <p className="relative max-w-[200px] text-sm leading-snug text-[#0A3A75]/55">
                Based on <span className="font-bold text-[#0A3A75]">{reviewCountFormatted}+</span> verified Google
                reviews
              </p>

              <div className="relative flex items-center gap-2 rounded-full border border-[#0A3A75]/8 bg-white px-4 py-2 text-xs font-medium text-[#0A3A75]/75 shadow-[0_2px_12px_rgba(10,58,117,0.06)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A3A75" strokeWidth="2" aria-hidden>
                  <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" fill="#0A3A75" stroke="none" />
                </svg>
                Care Well Medical Centre, Delhi
              </div>
            </div>

            {/* Reviews area — 70% */}
            <div className="relative mt-6 min-w-0 flex-1 lg:mt-0 lg:pl-2">
              <NavButton
                dir={-1}
                disabled={!canScrollPrev}
                onClick={() => scrollByCard(-1)}
                className="absolute -left-3 top-[calc(50%-2rem)] hidden -translate-y-1/2 lg:flex xl:-left-7"
              />

              <div
                ref={scrollerRef}
                className="reviews-scroller flex snap-x snap-mandatory gap-4 overflow-x-auto lg:gap-4"
              >
                {cards.map((review) => {
                  const initial = (review.author.trim()[0] ?? "P").toUpperCase();
                  const avatarBg = AVATAR_COLORS[hashString(review.author) % AVATAR_COLORS.length];

                  return (
                    <article
                      key={review.id}
                      data-review-card
                      className="group relative flex h-[320px] w-[min(88vw,360px)] shrink-0 snap-start flex-col rounded-[20px] border border-[#0A3A75]/[0.06] bg-white p-5 shadow-[0_4px_24px_rgba(10,58,117,0.06)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(10,58,117,0.1)] sm:h-[340px] sm:p-6 lg:w-[calc((100%-1rem)/2)]"
                    >
                      <header className="relative flex items-start gap-3">
                        <span
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                          style={{ backgroundColor: avatarBg }}
                          aria-hidden
                        >
                          {initial}
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="truncate font-heading text-[15px] font-bold text-[#0A3A75]">{review.author}</p>
                          <p className="text-xs text-[#0A3A75]/45">Google review</p>
                        </div>
                        <Image
                          src="/google-icon.png"
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 object-contain opacity-90"
                          aria-hidden
                        />
                      </header>

                      <div className="relative mt-3 flex flex-1 flex-col">
                        <GoldStars rating={ratingValue} size={14} />
                        <span
                          className="pointer-events-none mt-1 font-serif text-6xl leading-none text-[#F6D7C3]/50"
                          aria-hidden
                        >
                          &ldquo;
                        </span>
                        <p className="-mt-4 flex-1 text-sm leading-relaxed text-[#0A3A75]/75 line-clamp-5 sm:text-[0.9375rem]">
                          {review.text}
                        </p>
                      </div>

                      <footer className="relative mt-auto flex items-center border-t border-[#0A3A75]/[0.06] pt-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          Verified review
                        </span>
                      </footer>
                    </article>
                  );
                })}
              </div>

              <NavButton
                dir={1}
                disabled={!canScrollNext}
                onClick={() => scrollByCard(1)}
                className="absolute -right-3 top-[calc(50%-2rem)] hidden -translate-y-1/2 lg:flex xl:-right-7"
              />

              <div className="mt-4 flex items-center justify-center gap-2" aria-hidden>
                {cards.map((review, index) => (
                  <span
                    key={review.id}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeIndex ? "h-2.5 w-2.5 bg-[#0A3A75]" : "h-2 w-2 bg-[#0A3A75]/12"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-center text-xs text-[#0A3A75]/40 lg:hidden">Swipe for more reviews →</p>

              <div className="mt-4 flex justify-center gap-3 lg:hidden">
                <NavButton dir={-1} disabled={!canScrollPrev} onClick={() => scrollByCard(-1)} />
                <NavButton dir={1} disabled={!canScrollNext} onClick={() => scrollByCard(1)} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-3xl justify-center sm:mt-8">
          <div className="inline-flex flex-col items-center gap-4 rounded-full border border-[#0A3A75]/[0.06] bg-white px-5 py-4 shadow-[0_6px_32px_rgba(10,58,117,0.07)] sm:flex-row sm:gap-0 sm:px-6 sm:py-3">
            <Link
              href={GOOGLE_REVIEWS_SECTION.googleSearchHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#0A3A75] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(10,58,117,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(10,58,117,0.3)]"
            >
              <Image src="/google-icon.png" alt="" width={20} height={20} className="h-5 w-5 object-contain brightness-0 invert" aria-hidden />
              See all reviews on Google
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
            <span className="hidden h-8 w-px bg-[#0A3A75]/10 sm:block" aria-hidden />
            <p className="px-2 text-center text-xs leading-relaxed text-[#0A3A75]/50 sm:text-left">
              Reviews shown as posted on Google • Updated periodically
            </p>
          </div>
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
