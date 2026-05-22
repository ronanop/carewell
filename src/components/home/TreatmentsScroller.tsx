"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type ServiceItem = {
  slug: string;
  title: string;
  heroImageUrl?: string | null;
  description?: string | null;
  tagline?: string | null;
  href?: string;
};

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
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g)" />
      <rect x="40" y="430" width="720" height="120" rx="24" fill="rgba(255,255,255,0.78)" />
      <text x="400" y="505" text-anchor="middle" font-size="42" font-family="system-ui, sans-serif" fill="#0a2e52">
        ${shortTitle}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function TreatmentsScroller({ services }: { services: ServiceItem[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = Math.round(rowRef.current.clientWidth * 0.8);
    rowRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6">
      <div ref={rowRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {services.map((service, index) => {
          const blurb = service.description?.trim() || service.tagline?.trim();
          return (
            <Link
              key={service.slug}
              href={service.href ?? `/services/${service.slug}`}
              className="group flex min-h-full min-w-[260px] snap-start flex-col rounded-2xl border border-[var(--color-border-light)] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover sm:min-w-[280px] lg:min-w-[calc((100%-4.5rem)/3)] lg:max-w-[calc((100%-4.5rem)/3)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-surface">
                <Image
                  src={service.heroImageUrl || treatmentFallbackImage(service.title, index)}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 70vw, 250px"
                />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-5 pt-4">
                <p className="text-center font-heading text-heading-md font-bold leading-snug text-navy">
                  {service.title}
                </p>
                {blurb ? (
                  <p className="mt-2 line-clamp-3 text-center text-body-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-navy/80">
                    {blurb}
                  </p>
                ) : null}
                <p className="mt-3 text-center text-xs font-semibold text-primary group-hover:underline">
                  Learn more →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="my-6 flex justify-center gap-2 md:my-8">
        <button
          type="button"
          aria-label="Scroll treatments left"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-surface bg-white text-navy shadow-md transition hover:bg-surface md:flex"
          onClick={() => scrollByAmount("left")}
        >
          {"<"}
        </button>
        <button
          type="button"
          aria-label="Scroll treatments right"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-surface bg-white text-navy shadow-md transition hover:bg-surface md:flex"
          onClick={() => scrollByAmount("right")}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
