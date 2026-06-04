import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { TREATMENT_FINDER_BAND } from "@/data/homepage";

export function TreatmentFinderBand() {
  return (
    <SectionShell variant="navy" className="relative overflow-hidden" aria-labelledby="treatment-finder-heading">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <iframe
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.08] opacity-50"
          src="https://www.youtube.com/embed/Bv-J4XSRLx4?autoplay=1&mute=1&controls=0&loop=1&playlist=Bv-J4XSRLx4&modestbranding=1&playsinline=1&rel=0"
          title="Treatment finder background video"
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/55" />
      </div>
      <div className="container relative z-10 mx-auto max-w-content text-center">
        <p className="text-overline uppercase text-white/70">{TREATMENT_FINDER_BAND.eyebrow}</p>
        <h2
          id="treatment-finder-heading"
          className="mt-2 font-heading text-display-sm text-white text-balance sm:text-display-md"
        >
          {TREATMENT_FINDER_BAND.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-body-sm text-white/80 sm:mt-4 sm:text-body-md">
          {TREATMENT_FINDER_BAND.description}
        </p>
        <div className="mt-6 sm:mt-8">
          <Button href={TREATMENT_FINDER_BAND.quizHref} size="lg" className="bg-white !text-navy hover:!bg-primary-light">
            {TREATMENT_FINDER_BAND.buttonLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
