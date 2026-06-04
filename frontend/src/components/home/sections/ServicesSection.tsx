import Link from "next/link";
import { TreatmentsScroller } from "@/components/home/TreatmentsScroller";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { HOMEPAGE_SERVICES, SERVICES_SECTION } from "@/data/homepage";

type ServiceInput = {
  title: string;
  slug: string;
  heroImageUrl?: string | null;
  description?: string | null;
  href?: string;
};

export function ServicesSection({ services }: { services: ServiceInput[] }) {
  const items = services.length ? services : HOMEPAGE_SERVICES;

  return (
    <SectionShell variant="surface" aria-labelledby="services-heading">
      <div className="container">
        <SectionHeader
          id="services-heading"
          eyebrow={SERVICES_SECTION.eyebrow}
          title={SERVICES_SECTION.title}
          description={SERVICES_SECTION.description}
        />

        <div className="mt-8 sm:mt-10">
          <TreatmentsScroller
            services={items.map((s) => ({
              title: s.title,
              slug: s.slug,
              heroImageUrl: s.heroImageUrl,
              description: s.description,
              href: "href" in s && s.href ? s.href : `/services/${s.slug}`,
            }))}
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
          <p className="text-center text-body-sm text-text-secondary sm:text-body-md">
            {SERVICES_SECTION.footerCta}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/book-consultation" variant="primary">
              Book Doctor Consultation
            </Button>
            <Link
              href="/services"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
