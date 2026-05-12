import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadForm } from "@/components/leads/LeadForm";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free consultation",
  alternates: { canonical: `${getSiteUrl()}/book-consultation` },
};

export default function BookConsultationPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 md:py-24">
      <h1 className="font-heading text-3xl font-bold text-navy">Book your free consultation</h1>
      <p className="mt-4 text-sm text-navy/75">Three fields only — we respond within two hours during clinic hours.</p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
          <LeadForm defaultTreatment="General consultation" submitLabel="Claim My Free Slot" source="book-consultation" />
        </Suspense>
      </div>
    </div>
  );
}
