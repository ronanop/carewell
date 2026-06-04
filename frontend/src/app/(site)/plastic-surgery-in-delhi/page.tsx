import type { Metadata } from "next";
import { PlasticSurgeryPageSections } from "@/components/services/PlasticSurgeryPageSections";
import {
  PLASTIC_SURGERY_PATH,
  PLASTIC_SURGERY_SEO,
} from "@/data/plastic-surgery-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: PLASTIC_SURGERY_SEO.title,
    description: PLASTIC_SURGERY_SEO.description,
    alternates: { canonical: `${base}${PLASTIC_SURGERY_PATH}` },
  };
}

export default async function PlasticSurgeryInDelhiPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <PlasticSurgeryPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
    />
  );
}
