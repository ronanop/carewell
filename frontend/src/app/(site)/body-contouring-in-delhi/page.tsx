import type { Metadata } from "next";
import { BodyContouringPageSections } from "@/components/services/BodyContouringPageSections";
import { BODY_CONTOURING_PATH, BODY_CONTOURING_SEO } from "@/data/body-contouring-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: BODY_CONTOURING_SEO.title,
    description: BODY_CONTOURING_SEO.description,
    alternates: { canonical: `${base}${BODY_CONTOURING_PATH}` },
  };
}

export default async function BodyContouringInDelhiPage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <BodyContouringPageSections
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
