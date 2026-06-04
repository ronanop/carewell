import type { Metadata } from "next";
import { CosmeticTreatmentsPageSections } from "@/components/services/CosmeticTreatmentsPageSections";
import {
  COSMETIC_TREATMENTS_PATH,
  COSMETIC_TREATMENTS_SEO,
} from "@/data/cosmetic-treatments-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: COSMETIC_TREATMENTS_SEO.title,
    description: COSMETIC_TREATMENTS_SEO.description,
    alternates: { canonical: `${base}${COSMETIC_TREATMENTS_PATH}` },
  };
}

export default async function CosmeticTreatmentsInDelhiPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <CosmeticTreatmentsPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
    />
  );
}
