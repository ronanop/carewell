"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CaseItem = {
  beforeUrl?: string | null;
  afterUrl?: string | null;
  patientInitials?: string;
  age?: number;
  gender?: string;
  monthsPostProcedure?: number;
  subtype?: string;
};

/** Shown when `cases` is empty instead of the default “coming soon” copy (e.g. approved static promo). */
export type BeforeAfterEmptyFallback = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Prose blocks rendered below the consent figcaption. */
  belowCaptionParagraphs?: readonly string[];
};

export function BeforeAfterSliders({
  cases,
  emptyFallback,
}: {
  cases: CaseItem[];
  emptyFallback?: BeforeAfterEmptyFallback | null;
}) {
  const tabs = useMemo(() => {
    const t = new Set<string>();
    cases.forEach((c) => {
      if (c.subtype) t.add(c.subtype);
    });
    return ["All", ...Array.from(t)];
  }, [cases]);

  const [tab, setTab] = useState("All");
  const filtered = cases.filter((c) => tab === "All" || c.subtype === tab);

  if (!cases.length) {
    if (emptyFallback) {
      const { src, alt, width, height, belowCaptionParagraphs } = emptyFallback;
      return (
        <div>
          <figure className="overflow-hidden rounded-xl border border-surface bg-surface">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, min(1200px, 100vw)"
              priority={false}
            />
            <figcaption className="border-t border-surface px-4 py-3 text-xs text-navy/60">
              Patient photos shown with consent. Results vary; individual assessment required.
            </figcaption>
          </figure>
          {belowCaptionParagraphs && belowCaptionParagraphs.length > 0 ? (
            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-navy/85 md:text-[15px]">
              {belowCaptionParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      );
    }
    return (
      <p className="text-sm text-navy/65">
        Before &amp; after gallery coming soon — add cases in Sanity with consent on file.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === t ? "bg-primary text-white" : "bg-surface text-navy"
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {filtered.slice(0, 6).map((c, i) => (
          <CompareCard key={i} c={c} />
        ))}
      </div>
      <p className="mt-6 text-xs text-navy/60">
        Patient photos shown with consent. Results vary; individual assessment required.
      </p>
    </div>
  );
}

function CompareCard({ c }: { c: CaseItem }) {
  const [pos, setPos] = useState(50);
  if (!c.beforeUrl || !c.afterUrl) return null;
  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
        <Image src={c.afterUrl} alt="After" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <Image src={c.beforeUrl} alt="Before" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute bottom-2 left-1/2 w-[90%] max-w-xs -translate-x-1/2"
          aria-label="Drag to compare before and after"
        />
      </div>
      <p className="mt-2 text-xs text-navy/70">
        {c.patientInitials ?? "Patient"} · {c.age ? `${c.age}y` : ""}{" "}
        {c.gender ? `· ${c.gender}` : ""}{" "}
        {c.monthsPostProcedure != null ? `· ${c.monthsPostProcedure} mo post-op` : ""}
      </p>
    </div>
  );
}
