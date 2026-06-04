import type { Metadata } from "next";
import { HairLossTreatmentPageSections } from "@/components/services/HairLossTreatmentPageSections";
import {
  HAIR_LOSS_TREATMENTS_PATH,
  HAIR_LOSS_TREATMENTS_SEO,
} from "@/data/hair-loss-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: HAIR_LOSS_TREATMENTS_SEO.title,
    description: HAIR_LOSS_TREATMENTS_SEO.description,
    alternates: { canonical: `${base}${HAIR_LOSS_TREATMENTS_PATH}` },
  };
}

export default async function HairLossTreatmentInDelhiPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <HairLossTreatmentPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
    />
  );
}
