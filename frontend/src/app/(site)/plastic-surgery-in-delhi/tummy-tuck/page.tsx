import type { Metadata } from "next";
import { TummyTuckTreatmentPageSections } from "@/components/services/TummyTuckTreatmentPageSections";
import { TUMMY_TUCK_PATH, TUMMY_TUCK_SEO } from "@/data/tummy-tuck-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: TUMMY_TUCK_SEO.title,
    description: TUMMY_TUCK_SEO.description,
    alternates: { canonical: `${base}${TUMMY_TUCK_PATH}` },
  };
}

export default async function TummyTuckPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <TummyTuckTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
