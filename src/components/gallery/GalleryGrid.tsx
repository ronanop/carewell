"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const BeforeAfterSliders = dynamic(
  () => import("@/components/services/BeforeAfterSliders").then((m) => m.BeforeAfterSliders),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-xl bg-surface" /> },
);

const CATS = ["All", "Hair", "Face", "Body", "Skin", "Vitiligo"] as const;

export type GalleryCase = {
  beforeUrl?: string | null;
  afterUrl?: string | null;
  subtype?: string;
  patientInitials?: string;
};

export function GalleryGrid({ cases }: { cases: GalleryCase[] }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const filtered = useMemo(() => {
    if (cat === "All") return cases;
    const key = cat.toLowerCase();
    return cases.filter((c) => (c.subtype ?? "").toLowerCase() === key);
  }, [cases, cat]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cat === c ? "bg-primary text-white" : "bg-surface text-navy hover:bg-surface/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-10">
        <BeforeAfterSliders cases={filtered} />
      </div>
      {filtered.length === 0 && <p className="mt-6 text-sm text-navy/60">No cases in this category yet.</p>}
    </>
  );
}
