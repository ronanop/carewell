import type { Metadata } from "next";
import { BreastAugmentationTreatmentPageSections } from "@/components/services/BreastAugmentationTreatmentPageSections";
import { BREAST_AUGMENTATION_PATH, BREAST_AUGMENTATION_SEO } from "@/data/breast-augmentation-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: BREAST_AUGMENTATION_SEO.title,
    description: BREAST_AUGMENTATION_SEO.description,
    alternates: { canonical: `${base}${BREAST_AUGMENTATION_PATH}` },
  };
}

export default async function BreastAugmentationPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <BreastAugmentationTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
