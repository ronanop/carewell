import type { Metadata } from "next";
import { VitiligoTreatmentPageSections } from "@/components/services/VitiligoTreatmentPageSections";
import { VITILIGO_PATH, VITILIGO_SEO } from "@/data/vitiligo-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: VITILIGO_SEO.title,
    description: VITILIGO_SEO.description,
    alternates: { canonical: `${base}${VITILIGO_PATH}` },
  };
}

export default async function VitiligoTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <VitiligoTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
