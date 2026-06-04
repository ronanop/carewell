import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { BOOK_CONSULTATION_BAND } from "@/data/homepage";

export function BookConsultationBand() {
  return (
    <SectionShell variant="navy" aria-labelledby="book-consultation-heading">
      <div className="container mx-auto max-w-4xl text-center">
        <h2
          id="book-consultation-heading"
          className="font-heading text-display-sm text-white text-balance sm:text-display-md"
        >
          {BOOK_CONSULTATION_BAND.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-body-md text-white/85 sm:mt-5 sm:text-body-lg">
          At Care Well Medical Centre, consultations and procedures are personally supervised by{" "}
          <span className="font-semibold text-white">Dr. Sandeep Bhasin</span>, ensuring safe, medically guided, and
          personalised aesthetic care using advanced technology.
        </p>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button href="/book-consultation" variant="primary" size="lg">
            {BOOK_CONSULTATION_BAND.buttonLabel}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
