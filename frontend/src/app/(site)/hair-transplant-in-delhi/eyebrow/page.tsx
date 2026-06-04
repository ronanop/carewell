import type { Metadata } from "next";
import { EyebrowTransplantPageSections } from "@/components/services/EyebrowTransplantPageSections";
import { EYEBROW_TRANSPLANT_PATH, EYEBROW_TRANSPLANT_SEO } from "@/data/eyebrow-transplant-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: EYEBROW_TRANSPLANT_SEO.title,
    description: EYEBROW_TRANSPLANT_SEO.description,
    alternates: { canonical: `${base}${EYEBROW_TRANSPLANT_PATH}` },
  };
}

export default async function EyebrowTransplantPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <EyebrowTransplantPageSections phone={settings.phone} whatsapp={settings.whatsappNumber} />
  );
}
