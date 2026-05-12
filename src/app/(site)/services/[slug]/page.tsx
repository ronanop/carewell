import type { Metadata } from "next";
import { ServicePageSections } from "@/components/services/ServicePageSections";
import { mapSanityService } from "@/lib/map-service";
import { serviceLanguageAlternates } from "@/lib/service-hreflang";
import { getSiteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/client";
import { serviceBySlugQuery, servicesSlugsQuery, siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 60;

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function generateStaticParams() {
  const rows = (await sanityFetch<{ slug: string; locale?: string }[]>(servicesSlugsQuery)) ?? [];
  return rows
    .filter((r) => r.slug && r.locale !== "hi" && r.slug !== "hair-transplant")
    .map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  if (raw && (raw as { locale?: string }).locale === "hi") return { title: "Service" };
  const doc = raw ? mapSanityService(raw) : null;
  if (!doc || !raw) return { title: "Service" };
  const base = getSiteUrl();
  const locale = typeof raw.locale === "string" ? raw.locale : "en";
  const alternate = raw.alternateLocaleService as { slug?: { current?: string } } | undefined;
  const languages = serviceLanguageAlternates(base, locale, slug, alternate);
  return {
    title: doc.seo?.title ?? `${doc.title} in Delhi | Care Well`,
    description: doc.seo?.description,
    alternates: {
      canonical: `${base}/services/${slug}`,
      languages,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = await sanityFetch<Record<string, unknown>>(serviceBySlugQuery, { slug });
  if (raw && (raw as { locale?: string }).locale === "hi") {
    return (
      <main className="container section-pad">
        <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-8">
          <h1 className="text-display-sm text-navy">Service Page Coming Soon</h1>
          <p className="mt-3 text-body-md text-text-secondary">
            This service page is being prepared and will be available shortly.
          </p>
        </div>
      </main>
    );
  }
  const doc = raw ? mapSanityService(raw) : null;
  if (!doc) {
    return (
      <main className="container section-pad">
        <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-8">
          <h1 className="text-display-sm text-navy">Service Page Coming Soon</h1>
          <p className="mt-3 text-body-md text-text-secondary">
            This service page is being prepared and will be available shortly.
          </p>
        </div>
      </main>
    );
  }

  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};

  return (
    <ServicePageSections
      doc={doc}
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
