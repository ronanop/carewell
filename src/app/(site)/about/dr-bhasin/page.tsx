import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dr. Sandeep Bhasin",
  alternates: { canonical: `${getSiteUrl()}/about/dr-bhasin` },
};

export default function DrBhasinPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Sandeep Bhasin",
    medicalSpecialty: ["PlasticSurgery", "Dermatology"],
    worksFor: { "@type": "MedicalClinic", name: "Care Well Medical Centre" },
  };

  return (
    <div className="container section-pad">
      <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
        <div className="aspect-[3/4] rounded-xl bg-surface" />
        <div>
          <p className="text-overline uppercase text-teal">Meet Your Surgeon</p>
          <h1 className="mt-2 text-display-md">Dr. Sandeep Bhasin</h1>
          <p className="mt-2 text-heading-md text-text-secondary">MBBS, MS — Cosmetic & Reconstructive Surgeon</p>
          <p className="mt-6 text-body-md text-text-secondary">
            Dr. Bhasin leads Care Well with a patient-first clinical approach focused on safety, precision, and natural outcomes.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["MBBS", "MS Surgery", "30+ Years", "15K+ Procedures"].map((tag) => (
              <span key={tag} className="rounded-full bg-surface px-4 py-2 text-sm">
                {tag}
              </span>
            ))}
          </div>
          <Button href="/book-consultation" variant="primary" className="mt-8">
            Book Consultation
          </Button>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
