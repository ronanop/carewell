import Link from "next/link";
import { TreatmentsScroller } from "@/components/home/TreatmentsScroller";
import { Button } from "@/components/ui/Button";
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
    <SectionShell aria-labelledby="services-heading" className="bg-white">
      <div className="container">
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D9E8FF] sm:w-16" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0A3A75]/55">
              {SERVICES_SECTION.eyebrow}
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D9E8FF] sm:w-16" aria-hidden />
          </div>
          <h2
            id="services-heading"
            className="mt-6 font-heading text-3xl font-bold leading-tight text-[#0A3A75] md:text-4xl lg:text-[2.65rem]"
          >
            {SERVICES_SECTION.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#0A3A75]/55 md:mt-6 md:text-lg">
            {SERVICES_SECTION.description}
          </p>
        </header>

        <div className="mt-10 sm:mt-12 lg:mt-14">
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

        <div className="mt-12 flex flex-col items-center gap-6 sm:mt-14 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-sm text-center text-sm leading-relaxed text-[#0A3A75]/55 lg:text-left lg:text-base">
            {SERVICES_SECTION.footerCta}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button
              href="/book-consultation"
              variant="primary"
              size="lg"
              className="shadow-[0_6px_24px_rgba(10,58,117,0.2)]"
            >
              Book Doctor Consultation
            </Button>
            <Link
              href="/services"
              className="text-sm font-semibold text-[#0A3A75] underline-offset-4 transition hover:text-primary hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
