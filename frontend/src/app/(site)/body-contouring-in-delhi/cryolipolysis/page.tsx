import type { Metadata } from "next";
import { CryolipolysisTreatmentPageSections } from "@/components/services/CryolipolysisTreatmentPageSections";
import { CRYOLIPOLYSIS_PATH, CRYOLIPOLYSIS_SEO } from "@/data/cryolipolysis-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: CRYOLIPOLYSIS_SEO.title,
    description: CRYOLIPOLYSIS_SEO.description,
    alternates: { canonical: `${base}${CRYOLIPOLYSIS_PATH}` },
  };
}

export default async function CryolipolysisTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <CryolipolysisTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
