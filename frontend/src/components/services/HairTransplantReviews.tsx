"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Review = {
  id: string;
  author: string;
  initial: string;
  avatarBg: string;
  timeAgo: string;
  verified?: boolean;
  rating: number;
  text: string;
};

const RATING = 4.3;
const REVIEW_COUNT = 605;
const SCORE_LABEL = "Good";

const REVIEWS: Review[] = [
  {
    id: "rohit-k",
    author: "Rohit Khurana",
    initial: "R",
    avatarBg: "#1557A0",
    timeAgo: "3 months ago",
    verified: true,
    rating: 5,
    text:
      "Got my hair transplant done at Care Well Medical Centre with Dr. Sandeep Bhasin. The hairline they designed looks completely natural — nobody at work has been able to tell. Recovery was smoother than I expected and the team kept following up at every stage.",
  },
  {
    id: "arjun-m",
    author: "Arjun Mehra",
    initial: "A",
    avatarBg: "#0B7B6B",
    timeAgo: "5 months ago",
    verified: true,
    rating: 5,
    text:
      "Was searching for the best hair transplant in Delhi for almost a year. Dr. Sandeep was the only doctor who actually told me upfront what was possible with my donor area. 3500 grafts FUE, painless procedure, very professional staff.",
  },
  {
    id: "uzma-p",
    author: "Uzma Parveen",
    initial: "U",
    avatarBg: "#7C3AED",
    timeAgo: "4 months ago",
    verified: true,
    rating: 5,
    text:
      "My experience was very good. Thanks to Dr. Riyaz and Dr. Sandeep for their excellent treatment, care, and professionalism. I had vitiligo and hair fall issues and both were treated together — really happy with the results.",
  },
  {
    id: "saddam-h",
    author: "Saddam Hussain",
    initial: "S",
    avatarBg: "#EA580C",
    timeAgo: "4 months ago",
    verified: true,
    rating: 5,
    text:
      "Came here for hair transplant consultation and ended up doing PRP first as advised by the doctor. Honest medical opinion, no pushy sales. Now planning the FUE procedure with them — full trust in the team.",
  },
  {
    id: "avval-k",
    author: "Avval Kumar",
    initial: "A",
    avatarBg: "#0EA5E9",
    timeAgo: "4 months ago",
    verified: true,
    rating: 5,
    text:
      "I have done my hair transplant surgery from Care Well Medical Centre. Result was good. Doctor is very experienced and staff is very nice. Hairline looks natural and density has filled in beautifully over 8 months.",
  },
  {
    id: "neha-s",
    author: "Neha Sharma",
    initial: "N",
    avatarBg: "#DC2626",
    timeAgo: "6 months ago",
    verified: true,
    rating: 4,
    text:
      "Female hair transplant patient here — really hard to find clinics in Delhi that handle women well. Dr. Sandeep planned my hairline perfectly. Mild thinning is gone and my parting looks natural. Staff was sensitive and respectful throughout.",
  },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "#FACC15" : half ? "url(#half)" : "#E5E7EB"}
            aria-hidden
          >
            {half && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
            )}
            <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}

export function HairTransplantReviews() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-review-card]");
    const step = firstCard ? firstCard.offsetWidth + 12 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
        Real Google Reviews from Hair Transplant Patients in Delhi
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/75 sm:text-base">
        Verified patient feedback collected on Google, focused on hair transplant outcomes at Care
        Well Medical Centre, Delhi.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Score card */}
          <div className="flex flex-col items-center justify-center gap-3 border-b border-surface bg-gradient-to-br from-primary/5 via-white to-teal/5 p-5 text-center sm:p-6 lg:border-b-0 lg:border-r">
            <p className="font-heading text-base font-extrabold uppercase tracking-[0.18em] text-navy">
              {SCORE_LABEL}
            </p>
            <Stars rating={RATING} size={22} />
            <p className="text-sm font-medium text-navy/75">
              Based on{" "}
              <span className="font-bold text-navy">{REVIEW_COUNT.toLocaleString("en-IN")}+</span>{" "}
              reviews
            </p>
            <Image
              src="/google-icon.png"
              alt="Google"
              width={64}
              height={64}
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Carousel */}
          <div className="relative min-w-0 p-4 sm:p-5">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous reviews"
              className="absolute left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-md transition-opacity hover:border-primary/40 hover:text-primary disabled:opacity-30 sm:left-2 sm:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              aria-label="Next reviews"
              className="absolute right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-md transition-opacity hover:border-primary/40 hover:text-primary disabled:opacity-30 sm:right-2 sm:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <div
              ref={scrollerRef}
              className="reviews-scroller flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:gap-4"
            >
              {REVIEWS.map((r) => {
                const isExpanded = !!expanded[r.id];
                return (
                  <article
                    key={r.id}
                    data-review-card
                    className="flex w-[85%] shrink-0 snap-start flex-col rounded-xl bg-surface/60 p-4 text-left shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] sm:w-[calc(50%-0.5rem)] sm:p-5 lg:w-[calc((100%-2rem)/3)]"
                  >
                    <header className="flex items-start gap-3">
                      <span
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: r.avatarBg }}
                        aria-hidden
                      >
                        {r.initial}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 font-heading text-sm font-bold uppercase tracking-wide text-navy">
                          <span className="truncate">{r.author}</span>
                          {r.verified && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="#1557A0"
                              className="shrink-0"
                              aria-label="Verified"
                            >
                              <path d="M12 2l2.4 1.8 3 .2.2 3L19.4 9.6 21 12l-1.6 2.4-.8 2.8-3 .2L13.2 19 12 21l-2.4-1.8-3-.2-.2-3L4.6 14.4 3 12l1.6-2.4.8-2.8 3-.2L10.8 5 12 2z" />
                              <path
                                d="M9 12l2 2 4-4"
                                stroke="white"
                                strokeWidth="2.4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </p>
                        <p className="text-xs text-navy/55">{r.timeAgo}</p>
                      </div>
                      <Image
                        src="/google-icon.png"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 shrink-0 object-contain"
                        aria-hidden
                      />
                    </header>

                    <div className="mt-3">
                      <Stars rating={r.rating} size={14} />
                    </div>

                    <p
                      className={`mt-2 whitespace-pre-line text-sm leading-relaxed text-navy/85 ${
                        isExpanded ? "" : "line-clamp-5"
                      }`}
                    >
                      {r.text}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [r.id]: !prev[r.id] }))
                      }
                      className="mt-3 self-start text-xs font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  </article>
                );
              })}
            </div>

            <p className="mt-3 text-center text-[11px] text-navy/55 sm:hidden">
              Swipe to see more reviews →
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href="https://www.google.com/search?q=Care+Well+Medical+Centre+Delhi+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Image
            src="/google-icon.png"
            alt=""
            width={18}
            height={18}
            className="h-4 w-4 object-contain"
            aria-hidden
          />
          See all reviews on Google
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
        <p className="text-xs text-navy/60">
          Reviews shown as posted on Google · Updated periodically.
        </p>
      </div>

      <style jsx>{`
        :global(.reviews-scroller) {
          scrollbar-width: none;
        }
        :global(.reviews-scroller::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </div>
  );
}
