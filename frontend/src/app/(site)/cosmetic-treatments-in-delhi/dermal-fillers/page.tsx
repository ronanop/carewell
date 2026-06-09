import type { Metadata } from "next";
import { DermalFillersTreatmentPageSections } from "@/components/services/DermalFillersTreatmentPageSections";
import { DERMAL_FILLERS_PATH, DERMAL_FILLERS_SEO } from "@/data/dermal-fillers-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: DERMAL_FILLERS_SEO.title,
    description: DERMAL_FILLERS_SEO.description,
    alternates: { canonical: `${base}${DERMAL_FILLERS_PATH}` },
  };
}

export default async function DermalFillersTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <DermalFillersTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
