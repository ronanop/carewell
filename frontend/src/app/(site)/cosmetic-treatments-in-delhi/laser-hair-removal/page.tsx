import type { Metadata } from "next";
import { LaserHairRemovalTreatmentPageSections } from "@/components/services/LaserHairRemovalTreatmentPageSections";
import { LASER_HAIR_REMOVAL_PATH, LASER_HAIR_REMOVAL_SEO } from "@/data/laser-hair-removal-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: LASER_HAIR_REMOVAL_SEO.title,
    description: LASER_HAIR_REMOVAL_SEO.description,
    alternates: { canonical: `${base}${LASER_HAIR_REMOVAL_PATH}` },
  };
}

export default async function LaserHairRemovalTreatmentPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <LaserHairRemovalTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
