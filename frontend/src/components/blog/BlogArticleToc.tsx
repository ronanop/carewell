"use client";

import { useEffect, useState } from "react";

export function BlogArticleToc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm text-navy/70">
      <p className="font-heading font-bold text-navy">On this page</p>
      <ul className="mt-3 space-y-2 border-l border-surface pl-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block py-0.5 transition-colors hover:text-primary ${
                active === h.id ? "font-semibold text-primary" : ""
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function BlogArticleTocMobile({ headings }: { headings: { id: string; text: string }[] }) {
  if (headings.length === 0) return null;
  return (
    <details className="mb-10 rounded-xl border border-surface bg-white p-4 lg:hidden">
      <summary className="cursor-pointer font-heading font-semibold text-navy">Jump to section</summary>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-primary hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
