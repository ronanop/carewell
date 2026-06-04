import type { Metadata } from "next";
import { SkinTreatmentsPageSections } from "@/components/services/SkinTreatmentsPageSections";
import {
  SKIN_TREATMENTS_PATH,
  SKIN_TREATMENTS_SEO,
} from "@/data/skin-treatments-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: SKIN_TREATMENTS_SEO.title,
    description: SKIN_TREATMENTS_SEO.description,
    alternates: { canonical: `${base}${SKIN_TREATMENTS_PATH}` },
  };
}

export default async function SkinTreatmentsInDelhiPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <SkinTreatmentsPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
