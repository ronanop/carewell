import { MapEmbed } from "@/components/layout/MapEmbed";
import { LeadForm } from "@/components/leads/LeadForm";
import { SectionShell } from "@/components/ui/SectionShell";
import { LOCATION_SECTION } from "@/data/homepage";

type Props = {
  mapEmbedUrl?: string;
};

export function LocationLeadSection({ mapEmbedUrl }: Props) {
  return (
    <SectionShell aria-labelledby="location-heading">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="rounded-xl bg-surface p-5 sm:p-6">
            <h2 id="location-heading" className="font-heading text-heading-lg text-navy sm:text-xl">
              {LOCATION_SECTION.title}
            </h2>
            <p className="mt-2 text-body-sm text-text-secondary sm:mt-3 sm:text-body-md">
              {LOCATION_SECTION.description}
            </p>
            <div className="mt-4">
              <MapEmbed
                embedSrc={mapEmbedUrl}
                title="Clinic location in Chittaranjan Park, New Delhi"
                frameClassName="h-52 w-full sm:h-72"
              />
            </div>
          </div>
          <LeadForm defaultTreatment="General consultation" source="homepage-location-card" />
        </div>
      </div>
    </SectionShell>
  );
}
