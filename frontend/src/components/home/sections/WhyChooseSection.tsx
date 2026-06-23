import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { WHY_CHOOSE_ITEMS, WHY_CHOOSE_SECTION, WHY_CHOOSE_TRUST_ITEMS } from "@/data/homepage";

const STAIRCASE_OFFSETS = [
  "ml-0",
  "ml-4 sm:ml-8 md:ml-12 lg:ml-14",
  "ml-8 sm:ml-14 md:ml-20 lg:ml-28",
  "ml-12 sm:ml-20 md:ml-28 lg:ml-[7.5rem]",
] as const;

function WhyChooseIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8.5" r="3.25" />
      <path d="M5.5 20c.8-3.8 3.35-6.25 6.5-6.25s5.7 2.45 6.5 6.25" />
    </svg>,
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M5.5 6.5h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-3.5l-3.25 3.25V16.5H5.5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2z" />
      <path d="M9 13.75c.65.85 1.65 1.35 2.75 1.35s2.1-.5 2.75-1.35" />
    </svg>,
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="6.5" cy="6.5" r="2" />
      <circle cx="17.5" cy="6.5" r="2" />
      <circle cx="12" cy="17.5" r="2" />
      <path d="M8.2 7.8 10.5 15M15.8 7.8 13.5 15M8.5 6.5h7" />
    </svg>,
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M8.5 14.5 7 20h10l-1.5-5.5" />
      <path d="M12 4V2" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

function TrustIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
      <path d="m9 12 2 2 4-4" />
    </svg>,
    <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>,
    <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>,
    <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
      <path d="M9 12h6" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

function FloatingDots() {
  return (
    <div className="pointer-events-none absolute -left-2 top-8 grid grid-cols-4 gap-2 opacity-40" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-navy/20" />
      ))}
    </div>
  );
}

export function WhyChooseSection() {
  return (
    <SectionShell
      aria-labelledby="why-choose-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAFAF8] via-white to-[#F7F5F2]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(244,199,181,0.12),transparent)]"
        aria-hidden
      />

      <div className="container relative">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            {WHY_CHOOSE_SECTION.eyebrow}
          </p>
          <h2
            id="why-choose-heading"
            className="mt-4 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-[2.65rem]"
          >
            {WHY_CHOOSE_SECTION.title}
          </h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#F4C7B5]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4C7B5]" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#F4C7B5]" />
          </div>
          <p className="mt-5 text-base leading-relaxed text-navy/65 md:text-lg">
            {WHY_CHOOSE_SECTION.subtitle}
          </p>
        </header>

        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-16">
          <div className="min-w-0">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              {WHY_CHOOSE_ITEMS.map((item, index) => (
                <article
                  key={item.title}
                  className={`group relative w-full max-w-2xl transition duration-300 ease-out hover:-translate-y-1 ${STAIRCASE_OFFSETS[index]}`}
                >
                  <div
                    className="relative flex min-h-[7.5rem] items-stretch overflow-hidden rounded-2xl bg-white/75 p-5 shadow-[0_8px_32px_rgba(10,46,82,0.06)] backdrop-blur-sm transition duration-300 ease-out group-hover:shadow-[0_16px_48px_rgba(10,46,82,0.1)] sm:min-h-[8rem] sm:p-6"
                    style={{
                      boxShadow:
                        "0 8px 32px rgba(10, 46, 82, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    <div
                      className="absolute inset-y-3 right-0 w-1 rounded-l-full transition duration-300 group-hover:w-1.5 group-hover:shadow-[0_0_16px_var(--accent-glow)]"
                      style={
                        {
                          backgroundColor: item.accent,
                          "--accent-glow": `${item.accent}99`,
                        } as CSSProperties
                      }
                      aria-hidden
                    />

                    <span
                      className="pointer-events-none absolute bottom-2 right-3 select-none font-heading text-[4.5rem] font-bold leading-none text-navy/[0.06] transition duration-300 group-hover:text-navy/[0.11] sm:text-[5.5rem]"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="relative z-10 mr-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy/80 sm:h-12 sm:w-12"
                      style={{ backgroundColor: `${item.accent}55` }}
                    >
                      <WhyChooseIcon index={index} />
                    </div>

                    <div className="relative z-10 min-w-0 flex-1 pr-10 sm:pr-14">
                      <h3 className="font-heading text-lg font-bold text-navy sm:text-xl">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy/65 sm:text-[0.95rem]">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:mt-10">
              {WHY_CHOOSE_TRUST_ITEMS.map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-2xl bg-white/60 px-3 py-5 text-center shadow-[0_4px_24px_rgba(10,46,82,0.04)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/80 sm:px-4"
                >
                  <span className="mb-3 text-primary/70">
                    <TrustIcon index={index} />
                  </span>
                  <p className="text-xs font-medium leading-snug text-navy/75 sm:text-[0.8rem]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-white via-[#FDF9F7] to-[#F5F0EB] p-5 shadow-[0_20px_60px_rgba(10,46,82,0.08)] sm:p-6">
              <FloatingDots />
              <div
                className="pointer-events-none absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#F4C7B5]/25 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 top-[38%] h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#F4C7B5]/30 to-[#A8C8F0]/15"
                aria-hidden
              />

              <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-[#F5E9E3]/40">
                <Image
                  src={WHY_CHOOSE_SECTION.portraitSrc}
                  alt={`${WHY_CHOOSE_SECTION.doctorName}, ${WHY_CHOOSE_SECTION.doctorRole}`}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>

              <div className="relative mt-6 text-center">
                <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-[#F4C7B5] to-transparent" />
                <p className="font-heading text-xl font-bold tracking-tight text-navy sm:text-2xl">
                  {WHY_CHOOSE_SECTION.doctorName}
                </p>
                <p className="mt-2 text-sm font-medium text-navy/70">{WHY_CHOOSE_SECTION.doctorRole}</p>
                <p className="mt-1 text-sm text-navy/55">{WHY_CHOOSE_SECTION.doctorClinic}</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-14 max-w-4xl lg:mt-20">
          <h3
            id="serving-delhi-heading"
            className="text-center font-heading text-xl font-bold text-navy sm:text-2xl"
          >
            {WHY_CHOOSE_SECTION.servingTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-navy/65 sm:text-base">
            {WHY_CHOOSE_SECTION.servingBody}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
