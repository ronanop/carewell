import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { TREATMENT_JOURNEY } from "@/data/homepage";

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

export function TreatmentJourneySection() {
  return (
    <SectionShell aria-labelledby="treatment-journey-heading">
      <div className="container">
        <SectionHeader
          id="treatment-journey-heading"
          eyebrow={TREATMENT_JOURNEY.eyebrow}
          title={TREATMENT_JOURNEY.title}
          description={TREATMENT_JOURNEY.description}
        />

        <ol className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {TREATMENT_JOURNEY.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <span
                className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm sm:h-24 sm:w-24"
                aria-hidden
              >
                <StepIcon index={index} />
              </span>
              <h3 className="mt-5 font-heading text-heading-md text-navy">{step.title}</h3>
              <p className="mt-3 max-w-xs text-body-sm text-text-secondary sm:text-[15px]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-5 text-center sm:mt-14">
          <p className="text-body-md font-medium text-navy sm:text-body-lg">{TREATMENT_JOURNEY.ctaText}</p>
          <Button href="/book-consultation" variant="primary">
            Book Doctor Consultation
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
