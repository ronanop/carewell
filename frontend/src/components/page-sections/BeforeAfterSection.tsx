"use client";

import dynamic from "next/dynamic";
import type { BeforeAfterCase } from "@carewell/backend/lib/cms/embed-sections";

const BeforeAfterSliders = dynamic(
  () => import("@/components/services/BeforeAfterSliders").then((m) => m.BeforeAfterSliders),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-xl bg-surface" /> },
);

export function BeforeAfterSection({ cases }: { cases: BeforeAfterCase[] }) {
  return (
    <section className="my-12 rounded-2xl border border-surface bg-white p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-navy">Before &amp; after</h2>
      <div className="mt-8">
        <BeforeAfterSliders cases={cases} />
      </div>
    </section>
  );
}
