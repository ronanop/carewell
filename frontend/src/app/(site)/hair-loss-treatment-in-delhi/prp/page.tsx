import type { Metadata } from "next";
import { PrpHairTreatmentPageSections } from "@/components/services/PrpHairTreatmentPageSections";
import { PRP_TREATMENT_PATH, PRP_TREATMENT_SEO } from "@/data/prp-hair-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: PRP_TREATMENT_SEO.title,
    description: PRP_TREATMENT_SEO.description,
    alternates: { canonical: `${base}${PRP_TREATMENT_PATH}` },
  };
}

export default async function PrpHairTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <PrpHairTreatmentPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
