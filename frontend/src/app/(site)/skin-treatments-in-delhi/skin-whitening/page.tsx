import type { Metadata } from "next";
import { SkinWhiteningTreatmentPageSections } from "@/components/services/SkinWhiteningTreatmentPageSections";
import { SKIN_WHITENING_PATH, SKIN_WHITENING_SEO } from "@/data/skin-whitening-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: SKIN_WHITENING_SEO.title,
    description: SKIN_WHITENING_SEO.description,
    alternates: { canonical: `${base}${SKIN_WHITENING_PATH}` },
  };
}

export default async function SkinWhiteningTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <SkinWhiteningTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
