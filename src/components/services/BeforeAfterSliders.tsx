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

export function BeforeAfterSliders({ cases }: { cases: CaseItem[] }) {
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
