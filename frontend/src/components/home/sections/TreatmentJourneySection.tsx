import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { TREATMENT_JOURNEY } from "@/data/homepage";

const STEP_ACCENTS = ["#F6D7C3", "#D9E8FF", "#DDF2E1", "#E7E0FF"] as const;

function StepIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="10.5" cy="10.5" r="5.25" />
      <path d="M14.25 14.25L19 19" />
      <path d="M10.5 8.25v4.5M8.25 10.5h4.5" />
    </svg>,
    <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="7" r="3.25" />
      <path d="M5.5 20c.5-3.5 3-6 6.5-6s6 2.5 6.5 6" />
      <path d="M9.5 14.5v2a2.5 2.5 0 005 0v-2" />
    </svg>,
    <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="5" width="14" height="14" rx="2" />
      <path d="M3.5 9.5h14" />
      <path d="M8 3.5v3M13 3.5v3" />
    </svg>,
    <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="2 3" />
      <circle cx="12" cy="9.5" r="2.25" />
      <path d="M8 16c.5-2 2-3 4-3s3.5 1 4 3" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

function TimelineConnector({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center py-4 lg:hidden" aria-hidden>
        <div className="h-6 w-px bg-[#0A3A75]/10" />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A3A75" strokeWidth="2" className="opacity-25">
          <path d="M12 5v14M7 14l5 5 5-5" />
        </svg>
        <div className="h-6 w-px bg-[#0A3A75]/10" />
      </div>
    );
  }

  return (
    <div className="hidden flex-1 items-center px-1 pt-12 lg:flex" aria-hidden>
      <div className="h-px flex-1 bg-[#0A3A75]/10" />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A3A75" strokeWidth="2" className="mx-0.5 shrink-0 opacity-30">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
      <div className="h-px flex-1 bg-[#0A3A75]/10" />
    </div>
  );
}

export function TreatmentJourneySection() {
  return (
    <SectionShell aria-labelledby="treatment-journey-heading" className="bg-white">
      <div className="container">
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#F6D7C3] sm:w-16" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0A3A75]/55">
              {TREATMENT_JOURNEY.eyebrow}
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#F6D7C3] sm:w-16" aria-hidden />
          </div>
          <h2
            id="treatment-journey-heading"
            className="mt-6 font-heading text-3xl font-bold leading-tight text-[#0A3A75] md:text-4xl lg:text-[2.65rem]"
          >
            {TREATMENT_JOURNEY.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#0A3A75]/55 md:mt-6 md:text-lg">
            {TREATMENT_JOURNEY.description}
          </p>
        </header>

        <ol className="mt-14 flex flex-col lg:mt-16 lg:flex-row lg:items-start">
          {TREATMENT_JOURNEY.steps.map((step, index) => {
            const accent = STEP_ACCENTS[index] ?? STEP_ACCENTS[0];
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <li key={step.title} className="group flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start">
                {index > 0 ? <TimelineConnector vertical /> : null}

                <div className="flex w-full flex-col items-center px-2 text-center transition duration-300 ease-out group-hover:-translate-y-1 lg:flex-1">
                  <div className="relative">
                    <span
                      className="absolute inset-0 scale-110 rounded-full opacity-60 blur-md transition duration-500 group-hover:scale-[1.18] group-hover:opacity-90"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    />
                    <span
                      className="absolute -inset-2 rounded-full border border-white/80 opacity-70 transition duration-500 group-hover:opacity-100"
                      style={{ boxShadow: `0 0 0 6px ${accent}55` }}
                      aria-hidden
                    />
                    <span
                      className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#0A3A75] shadow-[0_8px_32px_rgba(10,58,117,0.08)] transition duration-500 group-hover:shadow-[0_16px_48px_rgba(10,58,117,0.14)] sm:h-28 sm:w-28"
                      style={{
                        background: `linear-gradient(160deg, white 30%, ${accent}88 100%)`,
                      }}
                      aria-hidden
                    >
                      <StepIcon index={index} />
                    </span>
                    <span
                      className="absolute -right-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-[#0A3A75] shadow-sm transition duration-300 group-hover:scale-110"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    >
                      {stepNumber}
                    </span>
                  </div>

                  <h3 className="mt-7 font-heading text-base font-bold leading-snug text-[#0A3A75] sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-[#0A3A75]/55 sm:text-[15px]">
                    {step.body}
                  </p>
                </div>

                {index < TREATMENT_JOURNEY.steps.length - 1 ? <TimelineConnector /> : null}
              </li>
            );
          })}
        </ol>

        <div className="mx-auto mt-14 max-w-3xl sm:mt-16 lg:mt-20">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/60 bg-white/80 px-6 py-6 text-center shadow-[0_8px_40px_rgba(10,58,117,0.07)] backdrop-blur-md sm:flex-row sm:justify-center sm:gap-8 sm:px-10 sm:py-7">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9E8FF]/60 text-[#0A3A75]"
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <p className="text-base font-medium leading-relaxed text-[#0A3A75] sm:text-lg">
              {TREATMENT_JOURNEY.ctaText}
            </p>
            <Button
              href="/book-consultation"
              variant="primary"
              size="lg"
              className="shrink-0 shadow-[0_6px_24px_rgba(10,58,117,0.2)]"
            >
              Book Doctor Consultation
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
