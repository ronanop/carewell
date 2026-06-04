import type { Metadata } from "next";
import { BeardTransplantPageSections } from "@/components/services/BeardTransplantPageSections";
import { BEARD_TRANSPLANT_PATH, BEARD_TRANSPLANT_SEO } from "@/data/beard-transplant-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: BEARD_TRANSPLANT_SEO.title,
    description: BEARD_TRANSPLANT_SEO.description,
    alternates: { canonical: `${base}${BEARD_TRANSPLANT_PATH}` },
  };
}

export default async function BeardTransplantPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <BeardTransplantPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
