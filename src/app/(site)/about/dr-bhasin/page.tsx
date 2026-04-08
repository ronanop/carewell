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
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-heading text-4xl font-bold text-navy">Dr. Sandeep Bhasin</h1>
      <p className="mt-6 text-navy/85">
        Authority hub: credentials, training, media logos, and video — all CMS-driven in production. This static placeholder
        satisfies routing and Physician JSON-LD wiring.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-navy/80">
        <li>MBBS, MS — cosmetic & reconstructive focus</li>
        <li>Media & publications (add in Sanity)</li>
        <li>Monthly Q&amp;A blog + YouTube (link from CMS)</li>
      </ul>
      <Button href="/book-consultation" variant="primary" className="mt-10">
        Book Consultation
      </Button>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
