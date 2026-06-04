import type { Metadata } from "next";
import { AcneScarTreatmentPageSections } from "@/components/services/AcneScarTreatmentPageSections";
import { ACNE_SCAR_PATH, ACNE_SCAR_SEO } from "@/data/acne-scar-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: ACNE_SCAR_SEO.title,
    description: ACNE_SCAR_SEO.description,
    alternates: { canonical: `${base}${ACNE_SCAR_PATH}` },
  };
}

export default async function AcneScarTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <AcneScarTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
