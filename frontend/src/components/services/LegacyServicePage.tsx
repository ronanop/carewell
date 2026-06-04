import { ServicePageSections } from "@/components/services/ServicePageSections";
import { getServiceByLegacyPath } from "@carewell/backend/lib/cms/queries";
import type { ServiceDoc } from "@/types/service";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { legacyPathWithTrailingSlash } from "@carewell/backend/lib/legacy-path";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { siteSettingsQuery } from "@carewell/backend/sanity/queries";

type Settings = { phone?: string; whatsappNumber?: string; mapEmbedUrl?: string };

export async function LegacyServicePage({ legacyPath }: { legacyPath: string }) {
  const doc = (await getServiceByLegacyPath(legacyPath)) as ServiceDoc | null;

  if (!doc) {
    return (
      <main className="container section-pad">
        <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-8">
          <h1 className="text-display-sm text-navy">Page Coming Soon</h1>
          <p className="mt-3 text-body-md text-text-secondary">
            This page is being prepared and will match the legacy site URL shortly.
          </p>
        </div>
      </main>
    );
  }

  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};
  const base = getSiteUrl().replace(/\/$/, "");
  const canonical = `${base}${legacyPathWithTrailingSlash(legacyPath)}`;
  if (doc.seo) {
    doc.seo.canonicalUrl = doc.seo.canonicalUrl ?? canonical;
  }

  return (
    <ServicePageSections
      doc={doc}
      phone={settings.phone}
      whatsapp={settings.whatsappNumber}
      mapEmbedUrl={settings.mapEmbedUrl}
    />
  );
}
