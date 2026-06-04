import type { Metadata } from "next";
import { DarkCirclesTreatmentPageSections } from "@/components/services/DarkCirclesTreatmentPageSections";
import { DARK_CIRCLES_PATH, DARK_CIRCLES_SEO } from "@/data/dark-circles-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: DARK_CIRCLES_SEO.title,
    description: DARK_CIRCLES_SEO.description,
    alternates: { canonical: `${base}${DARK_CIRCLES_PATH}` },
  };
}

export default async function DarkCirclesTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <DarkCirclesTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
