"use client";

import dynamic from "next/dynamic";

const EMICalculator = dynamic(
  () => import("@/components/widgets/EMICalculator").then((m) => m.EMICalculator),
  { ssr: false, loading: () => <div className="h-32 animate-pulse rounded-xl bg-surface" /> },
);

export function EmiCalculatorSection() {
  return (
    <section className="my-12">
      <EMICalculator />
    </section>
  );
}
