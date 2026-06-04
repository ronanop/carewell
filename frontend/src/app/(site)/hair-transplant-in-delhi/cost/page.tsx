import type { Metadata } from "next";
import { HairTransplantCostPageSections } from "@/components/services/HairTransplantCostPageSections";
import { HAIR_TRANSPLANT_COST_PATH, HT_COST_SEO } from "@/data/hair-transplant-cost-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: HT_COST_SEO.title,
    description: HT_COST_SEO.description,
    alternates: { canonical: `${base}${HAIR_TRANSPLANT_COST_PATH}` },
  };
}

export default async function HairTransplantCostPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <HairTransplantCostPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
