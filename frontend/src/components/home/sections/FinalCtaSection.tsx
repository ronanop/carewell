import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { FINAL_CTA_SECTION } from "@/data/homepage";

export function FinalCtaSection() {
  return (
    <SectionShell variant="navy" className="text-center" aria-labelledby="final-cta-heading">
      <div className="container mx-auto max-w-content">
        <h2
          id="final-cta-heading"
          className="font-heading text-display-sm text-white text-balance sm:text-display-md"
        >
          {FINAL_CTA_SECTION.title}
        </h2>
        <p className="mt-3 text-body-md text-white/75 sm:mt-4 sm:text-body-lg">{FINAL_CTA_SECTION.description}</p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button href="/book-consultation" size="lg" className="bg-white !text-navy hover:!bg-primary-light">
            {FINAL_CTA_SECTION.primaryLabel}
          </Button>
          <Button href="/contact" size="lg" variant="outline" className="!border-white/40 !text-white">
            {FINAL_CTA_SECTION.secondaryLabel}
          </Button>
        </div>
        <Link href="/contact" className="mt-5 inline-block text-sm text-white/70 underline">
          {FINAL_CTA_SECTION.whatsappNote}
        </Link>
      </div>
    </SectionShell>
  );
}
