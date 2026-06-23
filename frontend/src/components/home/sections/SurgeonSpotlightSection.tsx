import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { SURGEON_SPOTLIGHT } from "@/data/homepage";

const KPI_ACCENTS = ["#F6D7C3", "#DDF2E1", "#D9E8FF"] as const;

function HighlightIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c1.5-4 3.5-6 6-6s4.5 2 6 6" />
    </svg>,
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
      <path d="m9 12 2 2 4-4" />
    </svg>,
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="6.5" cy="6.5" r="2" />
      <circle cx="17.5" cy="6.5" r="2" />
      <circle cx="12" cy="17.5" r="2" />
      <path d="M8.2 7.8 10.5 15M15.8 7.8 13.5 15" />
    </svg>,
    <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>,
    <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>,
    <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M9 12h6M12 9v6" />
      <circle cx="12" cy="12" r="9" />
    </svg>,
    <svg key="6" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
    </svg>,
  ];
  return icons[index % icons.length];
}

function KpiIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
    </svg>,
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" />
    </svg>,
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5.5 20c.8-3.8 3.35-6.25 6.5-6.25s5.7 2.45 6.5 6.25" />
      <path d="M9.5 14.5v2a2.5 2.5 0 005 0v-2" />
    </svg>,
  ];
  return icons[index % icons.length];
}

function DotGrid({ className }: { className: string }) {
  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      {Array.from({ length: 25 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#0A3A75]" />
      ))}
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible" aria-hidden>
      {/* Large dual-tone radial glow */}
      <div
        className="absolute left-1/2 top-[46%] h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[980px] sm:w-[980px]"
        style={{
          background:
            "radial-gradient(circle at 45% 42%, rgba(246,215,195,0.2) 0%, rgba(246,215,195,0.12) 28%, rgba(217,232,255,0.16) 52%, rgba(217,232,255,0.08) 68%, transparent 78%)",
        }}
      />
      <div className="absolute left-1/2 top-[46%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6D7C3]/[0.12] blur-[100px]" />
      <div className="absolute left-[58%] top-[40%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9E8FF]/[0.18] blur-[90px]" />

      {/* Concentric peach rings */}
      <div className="absolute left-1/2 top-[46%] h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F6D7C3]/[0.1]" />
      <div className="absolute left-1/2 top-[46%] h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F6D7C3]/[0.11]" />
      <div className="absolute left-1/2 top-[46%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F6D7C3]/[0.08]" />

      {/* Flowing curves — bottom left */}
      <svg
        className="absolute bottom-[8%] left-[2%] w-[42%] max-w-[320px] opacity-[0.22] sm:left-[4%]"
        viewBox="0 0 320 120"
        fill="none"
      >
        <path d="M0 95 C60 25, 140 110, 220 55 S300 15, 320 40" stroke="#D9E8FF" strokeWidth="1.75" />
        <path d="M10 105 C75 40, 155 95, 235 65 S305 30, 320 55" stroke="#F6D7C3" strokeWidth="1.25" opacity="0.9" />
        <path d="M20 88 C85 20, 165 80, 245 48" stroke="#0A3A75" strokeWidth="0.75" opacity="0.2" />
      </svg>

      {/* Flowing curves — bottom right */}
      <svg
        className="absolute bottom-[6%] right-[2%] w-[40%] max-w-[300px] opacity-[0.2] sm:right-[4%]"
        viewBox="0 0 300 110"
        fill="none"
      >
        <path d="M0 50 C50 90, 120 10, 190 60 S270 95, 300 35" stroke="#D9E8FF" strokeWidth="1.75" />
        <path d="M5 60 C55 100, 125 20, 195 70 S275 88, 300 45" stroke="#F6D7C3" strokeWidth="1.25" opacity="0.85" />
      </svg>

      {/* Dot grids */}
      <DotGrid className="absolute left-[8%] top-[12%] opacity-[0.12] sm:left-[12%] sm:top-[10%]" />
      <DotGrid className="absolute bottom-[10%] right-[8%] opacity-[0.13] sm:right-[12%]" />
    </div>
  );
}

function KpiCard({
  stat,
  index,
  className,
}: {
  stat: { value: string; label: string };
  index: number;
  className: string;
}) {
  const isBottom = index === 2;

  return (
    <div
      className={`absolute z-30 rounded-2xl border border-white/75 bg-white/82 px-5 py-4 shadow-[0_18px_50px_rgba(10,58,117,0.18),0_8px_24px_rgba(10,58,117,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:px-6 sm:py-5 ${className}`}
    >
      <div className={`flex gap-3.5 ${isBottom ? "items-center" : "items-start"}`}>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#0A3A75] sm:h-12 sm:w-12"
          style={{ backgroundColor: KPI_ACCENTS[index] }}
          aria-hidden
        >
          <KpiIcon index={index} />
        </span>
        <div className={isBottom ? "text-center sm:text-left" : undefined}>
          <p className="font-heading text-xl font-bold leading-tight text-[#0A3A75] sm:text-2xl">{stat.value}</p>
          <p className="mt-1 max-w-[140px] text-xs font-medium leading-snug text-[#0A3A75]/60 sm:text-[13px]">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SurgeonSpotlightSection() {
  const [statLeft, statRight, statBottom] = SURGEON_SPOTLIGHT.stats;

  return (
    <SectionShell aria-labelledby="surgeon-heading" className="overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-[900px] text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#F6D7C3] sm:w-14" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0A3A75]/55">
              {SURGEON_SPOTLIGHT.eyebrow}
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#F6D7C3] sm:w-14" aria-hidden />
          </div>
          <h2
            id="surgeon-heading"
            className="mt-3 font-heading text-3xl font-bold leading-tight text-[#0A3A75] md:text-4xl lg:text-[2.75rem]"
          >
            {SURGEON_SPOTLIGHT.title}
          </h2>
          <p className="mt-4 font-heading text-3xl font-bold tracking-tight text-[#0A3A75] sm:mt-5 sm:text-4xl lg:text-[2.85rem]">
            {SURGEON_SPOTLIGHT.name}
          </p>
          <p className="mx-auto mt-5 max-w-[850px] text-base leading-[1.75] text-[#0A3A75]/60 sm:text-lg">
            {SURGEON_SPOTLIGHT.intro}
          </p>
          <p className="mx-auto mt-4 max-w-[850px] text-sm font-semibold leading-relaxed text-[#0A3A75]/80 sm:text-base">
            {SURGEON_SPOTLIGHT.proceduresNote}
          </p>
        </header>

        <div className="relative mx-auto mt-7 w-full max-w-[1060px] overflow-visible sm:mt-8 lg:mt-9">
          <BackgroundDecor />

          <div className="relative z-10 mx-auto w-full max-w-[680px] px-2 sm:px-0">
            <KpiCard
              stat={statLeft}
              index={0}
              className="left-0 top-[14%] hidden w-[200px] -translate-x-[18%] sm:block lg:w-[220px] lg:-translate-x-[28%]"
            />
            <KpiCard
              stat={statRight}
              index={1}
              className="right-0 top-[16%] hidden w-[200px] translate-x-[18%] sm:block lg:w-[220px] lg:translate-x-[28%]"
            />
            <KpiCard
              stat={statBottom}
              index={2}
              className="bottom-[4%] left-1/2 hidden w-[210px] -translate-x-1/2 sm:block lg:w-[230px]"
            />

            <div className="relative z-20 mx-auto w-full max-w-[min(92vw,480px)] rounded-[32px] border border-white/70 bg-gradient-to-b from-white/50 via-white/25 to-[#F6D7C3]/10 p-1.5 shadow-[0_28px_80px_rgba(10,58,117,0.18),0_12px_36px_rgba(10,58,117,0.12)] backdrop-blur-sm ring-1 ring-white/60">
              <div className="relative overflow-hidden rounded-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={SURGEON_SPOTLIGHT.imageSrc}
                    alt="Dr. Sandeep Bhasin, senior cosmetic surgeon"
                    fill
                    sizes="480px"
                    className="object-cover object-top"
                    priority={false}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0A3A75]/[0.06] via-transparent to-white/15"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:hidden">
            {SURGEON_SPOTLIGHT.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex items-center gap-3.5 rounded-2xl border border-white/75 bg-white/85 px-5 py-4 shadow-[0_14px_44px_rgba(10,58,117,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#0A3A75]"
                  style={{ backgroundColor: KPI_ACCENTS[index % KPI_ACCENTS.length] }}
                  aria-hidden
                >
                  <KpiIcon index={index} />
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-[#0A3A75]">{stat.value}</p>
                  <p className="text-xs font-medium text-[#0A3A75]/60">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-7 w-full max-w-[80%] rounded-[28px] bg-white p-6 shadow-[0_12px_52px_rgba(10,58,117,0.09)] sm:mt-8 sm:p-8 lg:mt-9">
          <div className="grid gap-px overflow-hidden rounded-2xl bg-[#0A3A75]/[0.07] sm:grid-cols-2">
            {SURGEON_SPOTLIGHT.highlights.map((item, index) => (
              <div
                key={item}
                className="flex min-h-[88px] items-center gap-4 bg-white px-5 py-5 sm:min-h-[96px] sm:px-7 sm:py-6"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9E8FF]/55 text-[#0A3A75]"
                  aria-hidden
                >
                  <HighlightIcon index={index} />
                </span>
                <p className="text-sm leading-relaxed text-[#0A3A75]/78 sm:text-[15px]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-7">
          <Button
            href={SURGEON_SPOTLIGHT.profileHref}
            variant="primary"
            size="lg"
            className="rounded-full px-9 py-3.5 shadow-[0_8px_28px_rgba(10,58,117,0.24)]"
          >
            View Full Doctor Profile
          </Button>
          <Button href="/book-consultation" variant="outline" size="lg" className="rounded-full border-2 px-9 py-3.5">
            Book Consultation
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
