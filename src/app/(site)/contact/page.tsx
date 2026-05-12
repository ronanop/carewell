import type { Metadata } from "next";
import { Suspense } from "react";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { LeadForm } from "@/components/leads/LeadForm";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: `${getSiteUrl()}/contact` },
};

export default async function ContactPage() {
  const s =
    (await sanityFetch<{
      phone?: string;
      email?: string;
      address?: string;
      hours?: string[];
      mapEmbedUrl?: string;
    }>(siteSettingsQuery)) ?? {};

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
      <div>
        <h1 className="font-heading text-4xl font-bold text-navy">Contact</h1>
        <p className="mt-4 text-navy/80">Chittaranjan Park, South Delhi</p>
        {s.address && <p className="mt-4 whitespace-pre-line text-navy/80">{s.address}</p>}
        {s.phone && (
          <p className="mt-6">
            <a
              href={`tel:${s.phone.replace(/[\s-]/g, "")}`}
              className="text-xl font-semibold text-primary hover:underline"
            >
              {s.phone}
            </a>
          </p>
        )}
        {s.email && (
          <p className="mt-3">
            <a
              href={`mailto:${s.email}`}
              className="text-base font-medium text-navy/85 underline-offset-4 hover:text-primary hover:underline"
            >
              {s.email}
            </a>
          </p>
        )}
        {s.hours && (
          <ul className="mt-6 text-sm text-navy/75">
            {s.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <div className="mt-10">
          <MapEmbed embedSrc={s.mapEmbedUrl} title="Care Well Medical Centre location map" />
        </div>
      </div>
      <div>
        <Suspense fallback={<div className="h-56 animate-pulse rounded-xl bg-surface" />}>
          <LeadForm defaultTreatment="General consultation" source="contact-page" />
        </Suspense>
      </div>
    </div>
  );
}
