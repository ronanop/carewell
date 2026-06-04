import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { SURGEON_SPOTLIGHT } from "@/data/homepage";

export function SurgeonSpotlightSection() {
  return (
    <SectionShell variant="surface" aria-labelledby="surgeon-heading">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-white p-2 shadow-card">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <Image
                  src={SURGEON_SPOTLIGHT.imageSrc}
                  alt="Dr. Sandeep Bhasin, senior cosmetic surgeon"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              id="surgeon-heading"
              eyebrow={SURGEON_SPOTLIGHT.eyebrow}
              title={SURGEON_SPOTLIGHT.title}
              align="left"
              className="!mx-0 !max-w-none !text-left"
            />
            <p className="mt-2 font-heading text-display-sm text-navy sm:text-2xl">{SURGEON_SPOTLIGHT.name}</p>
            <p className="mt-4 text-body-md leading-relaxed text-text-secondary sm:text-body-lg">
              {SURGEON_SPOTLIGHT.intro}
            </p>
            <p className="mt-4 text-body-sm font-medium text-navy/85 sm:text-body-md">
              {SURGEON_SPOTLIGHT.proceduresNote}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {SURGEON_SPOTLIGHT.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[var(--color-border-light)] bg-white p-4 shadow-sm"
                >
                  <p className="font-heading text-xl font-bold text-navy md:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium leading-snug text-teal sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-heading text-heading-md font-bold text-navy">Key highlights</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {SURGEON_SPOTLIGHT.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-body-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SURGEON_SPOTLIGHT.profileHref} variant="primary" size="lg">
                View Full Doctor Profile
              </Button>
              <Button href="/book-consultation" variant="outline" size="lg">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
