"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ServiceItem = {
  slug: string;
  title: string;
  heroImageUrl?: string | null;
  description?: string | null;
  tagline?: string | null;
  href?: string;
};

const SERVICE_ACCENTS = ["#F6D7C3", "#D9E8FF", "#DDF2E1", "#E7E0FF", "#F6D7C3", "#D9E8FF"] as const;

const treatmentFallbackPalettes = [
  ["#fde68a", "#f59e0b"],
  ["#bfdbfe", "#3b82f6"],
  ["#c7f9cc", "#22c55e"],
  ["#fbcfe8", "#ec4899"],
  ["#ddd6fe", "#8b5cf6"],
  ["#fecaca", "#ef4444"],
  ["#a7f3d0", "#14b8a6"],
  ["#e9d5ff", "#a855f7"],
];

function treatmentFallbackImage(title: string, index: number) {
  const [start, end] = treatmentFallbackPalettes[index % treatmentFallbackPalettes.length];
  const shortTitle = title.length > 28 ? `${title.slice(0, 25)}...` : title;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g)" />
      <rect x="40" y="360" width="720" height="100" rx="24" fill="rgba(255,255,255,0.78)" />
      <text x="400" y="425" text-anchor="middle" font-size="42" font-family="system-ui, sans-serif" fill="#0A3A75">
        ${shortTitle}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19h14" />
    </svg>,
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 4h12v4H6z" />
      <path d="M8 8v12M16 8v12M10 12h4" />
    </svg>,
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M8 4c0 2 1.5 3.5 4 3.5S16 6 16 4" />
      <path d="M6 20c1-4 3.5-6 6-6s5 2 6 6" />
    </svg>,
    <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>,
    <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 4a4 4 0 0 1 4 4v2H8V8a4 4 0 0 1 4-4z" />
      <path d="M6 14h12v6H6z" />
    </svg>,
    <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
    </svg>,
  ];
  return icons[index % icons.length];
}

function NavButton({
  dir,
  onClick,
  className = "",
}: {
  dir: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "left" ? "Scroll treatments left" : "Scroll treatments right"}
      onClick={onClick}
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#0A3A75] shadow-[0_6px_28px_rgba(10,58,117,0.1)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(10,58,117,0.14)] ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
        <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

export function TreatmentsScroller({ services }: { services: ServiceItem[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = Math.round(rowRef.current.clientWidth * 0.8);
    rowRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const updateActiveIndex = () => {
    const el = rowRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-service-card]");
    if (!firstCard) return;
    const step = firstCard.offsetWidth + 24;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), services.length - 1));
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateActiveIndex();
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    const ro = new ResizeObserver(updateActiveIndex);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateActiveIndex);
      ro.disconnect();
    };
  }, [services.length]);

  return (
    <div>
      <div className="flex items-center gap-3 md:gap-5">
        <NavButton dir="left" onClick={() => scrollByAmount("left")} className="hidden md:flex" />

        <div
          ref={rowRef}
          className="services-scroller no-scrollbar flex min-w-0 flex-1 snap-x snap-mandatory gap-6 overflow-x-auto pb-1"
        >
          {services.map((service, index) => {
            const blurb = service.description?.trim() || service.tagline?.trim();
            const accent = SERVICE_ACCENTS[index % SERVICE_ACCENTS.length];

            return (
              <Link
                key={service.slug}
                data-service-card
                href={service.href ?? `/services/${service.slug}`}
                className="group flex w-[min(88vw,340px)] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_6px_32px_rgba(10,58,117,0.06)] transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(10,58,117,0.11)] sm:w-[300px] lg:w-[calc((100%-3rem)/3)] lg:max-w-[calc((100%-3rem)/3)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAFBFD]">
                  <Image
                    src={service.heroImageUrl || treatmentFallbackImage(service.title, index)}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 88vw, 320px"
                  />
                </div>

                <div className="relative flex flex-1 flex-col px-6 pb-6 pt-9">
                  <span
                    className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(10,58,117,0.08)]"
                    aria-hidden
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[#0A3A75]"
                      style={{ backgroundColor: accent }}
                    >
                      <ServiceIcon index={index} />
                    </span>
                  </span>

                  <p className="text-center font-heading text-lg font-bold leading-snug text-[#0A3A75]">
                    {service.title}
                  </p>
                  {blurb ? (
                    <p className="mt-3 line-clamp-3 flex-1 text-center text-sm leading-relaxed text-[#0A3A75]/55 transition-colors duration-300 group-hover:text-[#0A3A75]/70">
                      {blurb}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <p className="mt-4 text-center text-sm font-semibold text-[#0A3A75] transition duration-300 group-hover:text-primary">
                    Learn more →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <NavButton dir="right" onClick={() => scrollByAmount("right")} className="hidden md:flex" />
      </div>

      <div className="mt-7 flex items-center justify-center gap-2" aria-hidden>
        {services.map((service, index) => (
          <span
            key={service.slug}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex ? "h-2.5 w-2.5 bg-[#0A3A75]" : "h-2 w-2 bg-[#0A3A75]/12"
            }`}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-3 md:hidden">
        <NavButton dir="left" onClick={() => scrollByAmount("left")} />
        <NavButton dir="right" onClick={() => scrollByAmount("right")} />
      </div>

      <style jsx>{`
        :global(.services-scroller) {
          scrollbar-width: none;
        }
        :global(.services-scroller::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </div>
  );
}
