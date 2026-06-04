import type { Metadata } from "next";
import { FemaleHairTransplantPageSections } from "@/components/services/FemaleHairTransplantPageSections";
import { FEMALE_HAIR_TRANSPLANT_PATH, FEMALE_HT_SEO } from "@/data/female-hair-transplant-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: FEMALE_HT_SEO.title,
    description: FEMALE_HT_SEO.description,
    alternates: { canonical: `${base}${FEMALE_HAIR_TRANSPLANT_PATH}` },
  };
}

export default async function FemaleHairTransplantPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <FemaleHairTransplantPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
