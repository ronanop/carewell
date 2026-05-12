"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const trustMetrics = [
  { value: "20+", label: "Years Experience", target: 20, suffix: "+", decimals: 0 },
  { value: "10,000+", label: "Procedures", target: 10000, suffix: "+", decimals: 0 },
  { value: "4.3★", label: "Patient Rating", target: 4.3, suffix: "★", decimals: 1 },
  { value: "605+", label: "Positive Google Reviews", target: 605, suffix: "+", decimals: 0 },
  { value: "Advanced", label: "Equipment" },
  { value: "Delhi NCR", label: "Trusted Clinic" },
];

function AnimatedMetricValue({
  value,
  target,
  suffix,
  decimals = 0,
}: {
  value: string;
  target?: number;
  suffix?: string;
  decimals?: number;
}) {
  const valueRef = useRef<HTMLParagraphElement | null>(null);
  const inView = useInView(valueRef, { once: true, amount: 0.65 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView || typeof target !== "number") return;

    let rafId = 0;
    const durationMs = 1400;
    const startedAt = performance.now();
    const precision = 10 ** decimals;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextValue = Math.round(target * eased * precision) / precision;
      setDisplayValue(nextValue);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [decimals, inView, target]);

  if (typeof target !== "number") {
    return <p className="text-2xl font-bold leading-tight text-[var(--color-navy)] lg:text-[26px]">{value}</p>;
  }

  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <p ref={valueRef} className="text-2xl font-bold leading-tight text-[var(--color-navy)] lg:text-[26px]">
      {formatted}
      {suffix ?? ""}
    </p>
  );
}

export function TrustMarquee() {
  return (
    <section className="border-y border-[var(--color-border-light)] bg-surface py-10 lg:py-14">
      <div className="container">
        <div className="grid grid-cols-2 gap-7 divide-y divide-[var(--color-border)] md:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:divide-x lg:divide-y-0">
          {trustMetrics.map((item, index) => {
            return (
              <motion.div
                key={item.label}
                className="flex flex-col items-center justify-center gap-2 pt-6 text-center first:pt-0 lg:pt-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <AnimatedMetricValue
                  value={item.value}
                  target={item.target}
                  suffix={item.suffix}
                  decimals={item.decimals}
                />
                <p className="text-xs font-medium leading-tight text-[var(--color-text-secondary)] sm:text-sm">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
