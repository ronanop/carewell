import type { Metadata } from "next";
import { GfcHairTreatmentPageSections } from "@/components/services/GfcHairTreatmentPageSections";
import { GFC_TREATMENT_PATH, GFC_TREATMENT_SEO } from "@/data/gfc-hair-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: GFC_TREATMENT_SEO.title,
    description: GFC_TREATMENT_SEO.description,
    alternates: { canonical: `${base}${GFC_TREATMENT_PATH}` },
  };
}

export default async function GfcHairTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <GfcHairTreatmentPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
