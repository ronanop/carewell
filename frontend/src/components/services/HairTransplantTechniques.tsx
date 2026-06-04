"use client";

import Link from "next/link";
import { useState } from "react";

type Technique = {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  body: string[];
  highlights?: string[];
  cta?: { label: string; href: string };
  accent: "primary" | "teal" | "navy";
};

const TECHNIQUES: Technique[] = [
  {
    id: "fue",
    badge: "Stitch-free",
    title: "FUE Hair Transplant in Delhi",
    tagline: "Follicular Unit Extraction — minimally invasive, no linear scar.",
    body: [
      "Want a stitch-free hair transplant experience? Care Well Medical Centre’s Follicular Unit Extraction (FUE) is designed to ensure you the same. Using this method, our clinicians take healthy hair follicles from your head’s back or sides and transfer them to the thinning spots. They employ a specialized micro-punch tool along with a local anesthesia to extract hair follicles from the donor area.",
      "You don’t have to deal with big cuts, and there are no obvious scars — you just witness naturally growing hair. The recovery period is quite shorter, with patients returning to normalcy within a few days of the surgery.",
    ],
    highlights: [
      "No linear stitches",
      "Faster recovery",
      "Ideal for short hairstyles",
    ],
    cta: { label: "Learn more about FUE hair transplant", href: "/book-consultation" },
    accent: "primary",
  },
  {
    id: "fut",
    badge: "Higher graft counts",
    title: "FUT Hair Transplant in Delhi Explained",
    tagline: "Follicular Unit Transplantation — strip method for larger sessions.",
    body: [
      "FUT (Follicular Unit Transplantation) involves removing a thin strip of scalp from the donor area and extracting grafts under magnification. This method may be recommended in selected cases where a higher number of grafts is required.",
    ],
    highlights: [
      "High graft yield per session",
      "Useful for advanced baldness",
      "Donor strip closed with fine sutures",
    ],
    accent: "teal",
  },
  {
    id: "dhi",
    badge: "Direct implantation",
    title: "DHI Hair Transplant in Delhi",
    tagline: "Direct Hair Implantation — implanter-pen precision over each graft.",
    body: [
      "Direct Hair Implantation (DHI) is an advanced variant of FUE where extracted follicles are implanted directly into the recipient area using a specialised implanter pen — without the need for pre-made incisions.",
      "This gives the surgeon precise control over the angle, depth and direction of every graft, which can be helpful for a natural-looking hairline. Like FUE, DHI is minimally invasive with no linear scar; suitability is decided after evaluating donor density and the area to be covered.",
    ],
    highlights: [
      "Precise angle & depth control",
      "Minimally invasive",
      "Natural-looking hairline finish",
    ],
    accent: "navy",
  },
];

const ACCENT_STYLES: Record<
  Technique["accent"],
  { ring: string; chipBg: string; chipText: string; icon: string }
> = {
  primary: {
    ring: "border-primary/25",
    chipBg: "bg-primary/10",
    chipText: "text-primary",
    icon: "bg-primary/15 text-primary",
  },
  teal: {
    ring: "border-teal/25",
    chipBg: "bg-teal/10",
    chipText: "text-teal",
    icon: "bg-teal/15 text-teal",
  },
  navy: {
    ring: "border-navy/15",
    chipBg: "bg-navy/10",
    chipText: "text-navy",
    icon: "bg-navy/10 text-navy",
  },
};

export function HairTransplantTechniques() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([TECHNIQUES[0].id]));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(TECHNIQUES.map((t) => t.id)));
  const collapseAll = () => setOpenIds(new Set());

  const allOpen = openIds.size === TECHNIQUES.length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
            Which Technique is Best?{" "}
            <span className="text-navy/70">(FUE vs FUT vs DHI)</span>
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy/80">
            At Care Well Medical Centre, we examine the patients thoroughly before applying any of
            these hair transplant techniques — FUE, FUT or DHI. All three processes claim hair
            restoration on your forehead. They all have their specific method, recovery and
            outcome. Choosing the best hair transplant in Delhi thus depends on knowing each of
            these methods in greater detail.
          </p>
        </div>
        <button
          type="button"
          onClick={allOpen ? collapseAll : expandAll}
          className="self-start whitespace-nowrap rounded-full border border-navy/15 bg-white px-3 py-1.5 text-xs font-semibold text-navy/75 transition-colors hover:border-primary/40 hover:text-primary sm:self-end"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
        {TECHNIQUES.map((t) => {
          const isOpen = openIds.has(t.id);
          const styles = ACCENT_STYLES[t.accent];
          const panelId = `technique-panel-${t.id}`;
          const buttonId = `technique-button-${t.id}`;

          return (
            <li
              key={t.id}
              className={`overflow-hidden rounded-2xl border ${styles.ring} bg-white shadow-sm transition-shadow duration-200 ${
                isOpen ? "shadow-md" : ""
              }`}
            >
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(t.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center gap-3 p-4 text-left sm:p-5"
              >
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22c5-4 8-8 8-12a8 8 0 10-16 0c0 4 3 8 8 12z" />
                    <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles.chipBg} ${styles.chipText}`}
                    >
                      {t.badge}
                    </span>
                    <span className="font-heading text-base font-bold leading-tight text-navy sm:text-lg">
                      {t.title}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-navy/65 sm:text-sm">
                    {t.tagline}
                  </span>
                </span>

                <span
                  className={`ml-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-navy/70 transition-transform duration-300 sm:h-9 sm:w-9 ${
                    isOpen ? "rotate-180 border-primary/40 text-primary" : ""
                  }`}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="border-t border-surface px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5"
              >
                <div className="space-y-3 text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                  {t.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {t.highlights && t.highlights.length > 0 && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                    {t.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 rounded-lg bg-surface/60 px-3 py-2 text-xs font-medium text-navy/80 sm:text-sm"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          className={`mt-0.5 shrink-0 ${styles.chipText}`}
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {t.cta && (
                  <div className="mt-5">
                    <Link
                      href={t.cta.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      <span aria-hidden>👉</span>
                      {t.cta.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
