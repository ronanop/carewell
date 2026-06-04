"use client";

import clsx from "clsx";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

export type HowItWorksStep = { title?: string; description?: string };

const PHASE_MS = 900;

function HairTransplantStepsDetailAside() {
  const blocks = [
    {
      title: "Step 1: Graft Extraction",
      body:
        "Healthy hair follicles are gently extracted from the donor area—usually the back or sides of the scalp—where hair naturally resists thinning.",
    },
    {
      title: "Step 2: Hairline Design",
      body:
        "We personally design the hairline after analysing facial structure, age, and existing hair pattern to achieve natural, age-appropriate results.",
    },
    {
      title: "Step 3: Graft Implantation",
      body:
        "We implant the extracted grafts at precise angles and spacing to replicate natural hair-growth patterns in thinning or bald areas.",
    },
    {
      title: "Step 4: Healing and Growth",
      body:
        "After implantation, grafts heal gradually. New hair growth begins over the following months, leading to visible improvement and stable long-term results.",
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-xl border border-surface bg-gradient-to-b from-white via-white to-primary-light/30 p-6 shadow-card md:p-7 lg:p-8">
      <div className="space-y-6">
        {blocks.map((b) => (
          <div key={b.title} className="border-l-[3px] border-teal pl-4">
            <h3 className="font-heading text-base font-bold leading-snug text-navy md:text-lg">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/85 md:text-[15px]">{b.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-lg bg-teal-light/40 px-4 py-3 text-sm leading-relaxed text-navy/90 md:text-[15px]">
        Most patients resume normal work within a few days; visible new growth usually appears by the third or fourth month and continues to improve
        thereafter.
      </p>
    </div>
  );
}

export function HowItWorksStepsAnimated({
  steps,
  belowStepsImageSrc,
  belowStepsImageAlt = "",
  showStepsDetailAside = false,
}: {
  steps: HowItWorksStep[];
  /** Placed under step cards 1–2 (left half of the 4-col grid on md+) */
  belowStepsImageSrc?: string;
  belowStepsImageAlt?: string;
  /** Rich copy beside the infographic (hair transplant) */
  showStepsDetailAside?: boolean;
}) {
  const items = steps.slice(0, 4);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const pathMeasureRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [pathD, setPathD] = useState("");
  const [pathLen, setPathLen] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  const isInView = useInView(containerRef, { amount: 0.28, margin: "-8% 0px -12% 0px" });

  useEffect(() => {
    if (!isInView || reduceMotion) {
      setActivePhase(0);
      return;
    }
    const id = window.setInterval(() => {
      setActivePhase((p) => (p + 1) % 4);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [isInView, reduceMotion]);

  useLayoutEffect(() => {
    const update = () => {
      const root = containerRef.current;
      if (!root) return;
      const cr = root.getBoundingClientRect();
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < items.length; i++) {
        const li = itemRefs.current[i];
        if (!li) continue;
        const r = li.getBoundingClientRect();
        pts.push({
          x: r.left + r.width / 2 - cr.left,
          y: r.top + r.height / 2 - cr.top,
        });
      }
      if (pts.length < 2) {
        setPathD("");
        setPathLen(0);
        return;
      }
      const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      setPathD(d);
    };

    update();
    const ro = new ResizeObserver(() => update());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  useLayoutEffect(() => {
    if (!pathD) {
      setPathLen(0);
      return;
    }
    requestAnimationFrame(() => {
      const el = pathMeasureRef.current;
      if (!el) return;
      try {
        setPathLen(el.getTotalLength());
      } catch {
        setPathLen(0);
      }
    });
  }, [pathD]);

  const dashTravel = pathLen > 0 ? pathLen * 0.14 : 0;
  const dashGap = pathLen > 0 ? pathLen * 0.86 : 0;
  const cycleSec = (PHASE_MS * 4) / 1000;

  return (
    <div ref={containerRef} className="relative mt-10">
      {/* Connector: polyline through step centers; traveling stroke synced to ~one lap per glow cycle */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 hidden min-h-[100px] w-full overflow-visible md:block"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-stroke`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0b7b6b" stopOpacity={0.4} />
            <stop offset="50%" stopColor="#1557a0" stopOpacity={1} />
            <stop offset="100%" stopColor="#0b7b6b" stopOpacity={0.4} />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {pathD && (
          <>
            <path
              ref={pathMeasureRef}
              d={pathD}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            />

            {pathLen > 0 && !reduceMotion && (
              <motion.path
                d={pathD}
                fill="none"
                stroke={`url(#${uid}-stroke)`}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${uid}-glow)`}
                initial={{ strokeDashoffset: pathLen }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: cycleSec,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  strokeDasharray: `${dashTravel} ${dashGap}`,
                }}
              />
            )}
          </>
        )}
      </svg>

      <ol className="relative z-[1] grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <motion.li
            key={`${s.title}-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={clsx(
              "rounded-xl border bg-white p-4 text-center shadow-sm transition-[box-shadow,border-color,transform] duration-500",
              !reduceMotion && activePhase === i
                ? "border-teal shadow-[0_0_28px_rgba(11,123,107,0.45)] ring-2 ring-teal/35 md:scale-[1.03]"
                : "border-surface md:scale-100",
            )}
          >
            <p className="text-xs font-bold text-primary">Step {i + 1}</p>
            <p className="mt-2 font-heading font-semibold text-navy">{s.title}</p>
            <p className="mt-2 text-xs text-navy/75">{s.description}</p>
          </motion.li>
        ))}
      </ol>

      {belowStepsImageSrc ? (
        <div
          className={clsx(
            "relative z-[1] mt-8 grid grid-cols-1 gap-8 md:gap-8 lg:gap-10",
            showStepsDetailAside ? "md:grid-cols-2 md:items-stretch" : "sm:grid-cols-2 md:grid-cols-4 md:gap-6",
          )}
        >
          <div
            className={clsx(
              "flex min-h-0 flex-col overflow-hidden rounded-xl border border-surface bg-white shadow-card",
              showStepsDetailAside
                ? "min-h-[280px] md:h-full md:min-h-0"
                : "sm:col-span-2 md:col-span-2",
            )}
          >
            <div className="flex min-h-0 flex-1 items-center justify-center p-4 md:p-6 lg:p-7">
              <Image
                src={belowStepsImageSrc}
                alt={belowStepsImageAlt}
                width={1200}
                height={1600}
                className={clsx(
                  "h-auto w-full max-w-full object-contain",
                  showStepsDetailAside
                    ? "max-h-[min(520px,70vh)] object-center md:max-h-full"
                    : "object-top",
                )}
                sizes={showStepsDetailAside ? "(min-width: 768px) 42vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
              />
            </div>
          </div>
          {showStepsDetailAside ? (
            <div className="flex min-h-0 md:h-full md:flex-col md:justify-center">
              <HairTransplantStepsDetailAside />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
