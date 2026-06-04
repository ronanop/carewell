import type { Metadata } from "next";
import { HairTransplantBeforeAfterPageSections } from "@/components/services/HairTransplantBeforeAfterPageSections";
import { HAIR_TRANSPLANT_BEFORE_AFTER_PATH, HT_BA_SEO } from "@/data/hair-transplant-before-after-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: HT_BA_SEO.title,
    description: HT_BA_SEO.description,
    alternates: { canonical: `${base}${HAIR_TRANSPLANT_BEFORE_AFTER_PATH}` },
  };
}

export default async function HairTransplantBeforeAfterPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <HairTransplantBeforeAfterPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
