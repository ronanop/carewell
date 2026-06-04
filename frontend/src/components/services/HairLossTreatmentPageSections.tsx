import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  HAIR_LOSS_AREAS_NCR,
  HAIR_LOSS_AREAS_SOUTH_DELHI,
  HAIR_LOSS_CAUSE_ROWS,
  HAIR_LOSS_CLINIC,
  HAIR_LOSS_COMPARE_ROWS,
  HAIR_LOSS_FEMALE_TREATMENT_ROWS,
  HAIR_LOSS_GROWTH_CYCLE_ROWS,
  HAIR_LOSS_HOURS_TIME,
  HAIR_LOSS_NON_SURGICAL,
  HAIR_LOSS_NORWOOD_ROWS,
  HAIR_LOSS_OPENING_HOURS,
  HAIR_LOSS_OTHER_TYPE_ROWS,
  HAIR_LOSS_OVERVIEW_TREATMENTS,
  HAIR_LOSS_PRICING_ROWS,
  HAIR_LOSS_PROCESS_STEPS,
  HAIR_LOSS_REPUTATION,
  HAIR_LOSS_RESULTS_ROWS,
  HAIR_LOSS_SURGICAL_ROWS,
  HAIR_LOSS_TREATMENT_CARDS,
  HAIR_LOSS_TREATMENTS_FAQS,
  HAIR_LOSS_TREATMENTS_PAGE,
  HAIR_LOSS_TREATMENTS_PATH,
  HAIR_LOSS_WHY_CHOOSE_ROWS,
} from "@/data/hair-loss-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

import { CheckList, DataTable, SectionTitle } from "@/components/services/hub-page-table";

const CLINIC_PHONE_DISPLAY = "+91-9667-977-499";

export function HairLossTreatmentPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = HAIR_LOSS_TREATMENTS_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? CLINIC_PHONE_DISPLAY;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in hair loss treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HAIR_LOSS_TREATMENTS_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: page.h1,
    description: page.tagline,
    url: `${getSiteUrl()}${HAIR_LOSS_TREATMENTS_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.h1, path: HAIR_LOSS_TREATMENTS_PATH },
        ]}
      />

      <section className="relative min-h-[58svh] overflow-hidden bg-navy md:min-h-[65vh]">
        <div
          className="absolute inset-0 bg-cover bg-[center_35%] bg-no-repeat"
          style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #1557A0 0%, transparent 40%), radial-gradient(circle at 70% 60%, #0B7B6B 0%, transparent 35%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/62" />
        <div className="relative mx-auto grid min-h-[58svh] max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 md:min-h-[65vh] md:grid-cols-[1fr_312px] md:items-start md:gap-10 md:px-6 md:py-20 lg:py-24">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.h1 }]} />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[34px] font-bold leading-[1.1] text-white sm:text-[42px] md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">{HAIR_LOSS_CLINIC.location}</p>
            <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">{page.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 md:mt-8">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          <aside className="hidden w-full min-w-0 shrink-0 md:block md:w-[312px]">
            <div className="sticky top-28">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/10" aria-hidden />}>
                <ServiceHeroBookingForm defaultTreatment={treatment} />
              </Suspense>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-32 md:px-6 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:pb-24">
        <article className="max-w-3xl lg:max-w-none">
          {/* Overview */}
          <section className="pb-12 pt-10 md:pb-16 md:pt-12">
            <SectionTitle>{page.introHeading}</SectionTitle>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
              <h3 className="font-heading text-lg font-bold text-navy">{page.ledByHeading}</h3>
              <p className="mt-2 text-lg font-semibold text-primary">{page.ledByName}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-navy/80">
                {page.ledByCredentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Treatments Available</h3>
            <DataTable
              headers={["Treatment", "Purpose"]}
              keys={["treatment", "purpose"]}
              rows={HAIR_LOSS_OVERVIEW_TREATMENTS}
            />
            <p className="mt-6 rounded-xl border border-teal/30 bg-teal/5 px-4 py-3 text-sm font-semibold text-navy">
              Special Offer: {page.specialOffer}
            </p>
          </section>

          {/* Treatment cards */}
          <section className="section-y border-t border-surface">
            <SectionHeader
              align="left"
              title={page.portfolioHeading}
              className="max-w-none text-left"
              titleClassName="text-2xl md:text-3xl"
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HAIR_LOSS_TREATMENT_CARDS.map((card) => (
                <li key={card.title}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-white shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                      <Image src={card.image} alt={card.title} fill sizes="320px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                      <h3 className="font-heading text-lg font-bold text-navy">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-navy/75 line-clamp-4">{card.excerpt}</p>
                      <span className="mt-auto pt-2 text-sm font-semibold text-primary">Learn more →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Why choose */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyTrustHeading}</SectionTitle>
            <DataTable
              headers={["Feature", "Details"]}
              keys={["feature", "details"]}
              rows={HAIR_LOSS_WHY_CHOOSE_ROWS}
            />
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Reputation</h3>
            <DataTable headers={["Metric", "Value"]} keys={["metric", "value"]} rows={HAIR_LOSS_REPUTATION} />
          </section>

          {/* Causes */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.causesHeading}</SectionTitle>
            <DataTable headers={["Cause", "Description"]} keys={["cause", "description"]} rows={HAIR_LOSS_CAUSE_ROWS} />
          </section>

          {/* Norwood */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.norwoodHeading}</SectionTitle>
            <DataTable headers={["Stage", "Description"]} keys={["stage", "description"]} rows={HAIR_LOSS_NORWOOD_ROWS} />
            <p className="mt-4 text-sm leading-relaxed text-navy/80">{page.norwoodVariantNote}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <Image
                src="/images/hair-transplant-baldness-grades.png"
                alt="Norwood scale stages of male pattern baldness"
                width={900}
                height={500}
                className="h-auto w-full"
              />
            </div>
          </section>

          {/* Other types */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.otherTypesHeading}</SectionTitle>
            <DataTable headers={["Type", "Description"]} keys={["type", "description"]} rows={HAIR_LOSS_OTHER_TYPE_ROWS} />
          </section>

          {/* Growth cycle */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.growthCycleHeading}</SectionTitle>
            <DataTable headers={["Stage", "Function"]} keys={["stage", "function"]} rows={HAIR_LOSS_GROWTH_CYCLE_ROWS} />
            <p className="mt-4 text-base leading-relaxed text-navy/85">{page.growthCycleNote}</p>
          </section>

          {/* When to see doctor */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whenDoctorHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">Consult a specialist if you experience:</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-base text-navy/85">
              {page.whenDoctorItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold text-navy">{page.whenDoctorNote}</p>
          </section>

          {/* Treatments offered */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.treatmentsHeading}</SectionTitle>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">{page.nonSurgicalHeading}</h3>
            <div className="mt-6 space-y-8">
              {HAIR_LOSS_NON_SURGICAL.map((item) => (
                <div key={item.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm">
                  {"href" in item && item.href ? (
                    <Link href={item.href} className="font-heading text-lg font-bold text-primary hover:underline">
                      {item.title}
                    </Link>
                  ) : (
                    <h4 className="font-heading text-lg font-bold text-navy">{item.title}</h4>
                  )}
                  {"rows" in item && item.rows && (
                    <dl className="mt-4 space-y-2 text-sm">
                      {item.rows.map((r) => (
                        <div key={r.label} className="flex flex-wrap gap-2">
                          <dt className="font-semibold text-navy">{r.label}:</dt>
                          <dd className="text-navy/80">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {"bullets" in item && item.bullets && (
                    <ul className="mt-3 list-inside list-disc text-sm text-navy/80">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {"benefits" in item && item.benefits && (
                    <ul className="mt-3 list-inside list-disc text-sm text-navy/80">
                      {item.benefits.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-heading text-xl font-bold text-navy">{page.surgicalHeading}</h3>
            <DataTable
              headers={["Method", "Procedure", "Recovery", "Results"]}
              keys={["method", "procedure", "recovery", "results"]}
              rows={HAIR_LOSS_SURGICAL_ROWS}
            />
            <h4 className="mt-6 font-heading text-lg font-bold text-navy">{page.surgicalIdealHeading}</h4>
            <ul className="mt-3 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.surgicalIdealItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-10 font-heading text-xl font-bold text-navy">{page.femaleHeading}</h3>
            <p className="mt-3 text-base text-navy/85">Common conditions treated:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.femaleConditions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <DataTable
              headers={["Treatment", "Purpose"]}
              keys={["treatment", "purpose"]}
              rows={HAIR_LOSS_FEMALE_TREATMENT_ROWS}
            />
          </section>

          {/* Pricing */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.pricingHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.pricingIntro}</p>
            <DataTable
              headers={["Treatment", "Starting Price", "Details"]}
              keys={["treatment", "price", "details"]}
              rows={HAIR_LOSS_PRICING_ROWS}
            />
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.pricingBenefitsHeading}</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.pricingBenefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          {/* Comparison */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.compareHeading}</SectionTitle>
            <DataTable
              headers={["Treatment", "Best For", "Sessions", "Results", "Cost", "Downtime"]}
              keys={["treatment", "bestFor", "sessions", "results", "cost", "downtime"]}
              rows={HAIR_LOSS_COMPARE_ROWS}
            />
          </section>

          {/* Process */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.processHeading}</SectionTitle>
            <ol className="mt-8 space-y-6">
              {HAIR_LOSS_PROCESS_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-navy/80">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Results timeline */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <DataTable
              headers={["Treatment", "Visible Results", "Full Results"]}
              keys={["treatment", "visible", "full"]}
              rows={HAIR_LOSS_RESULTS_ROWS}
            />
          </section>

          {/* Areas served */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">Patients commonly visit from:</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">South Delhi</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {HAIR_LOSS_AREAS_SOUTH_DELHI.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">NCR Regions</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {HAIR_LOSS_AREAS_NCR.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.travelHeading}</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.travelReasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          {/* Clinic info */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.clinicHeading}</SectionTitle>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{HAIR_LOSS_CLINIC.name}</p>
              <p>
                <span className="font-semibold">Address:</span> {HAIR_LOSS_CLINIC.address}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href={`tel:${HAIR_LOSS_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {HAIR_LOSS_CLINIC.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${HAIR_LOSS_CLINIC.email}`} className="text-primary underline">
                  {HAIR_LOSS_CLINIC.email}
                </a>
              </p>
            </div>
          </section>

          {/* Hours */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.hoursHeading}</SectionTitle>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-surface/80">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-navy">Day</th>
                    <th className="px-4 py-3 font-semibold text-navy">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {HAIR_LOSS_OPENING_HOURS.map((day) => (
                    <tr key={day} className="border-t border-surface">
                      <td className="px-4 py-3 text-navy">{day}</td>
                      <td className="px-4 py-3 text-navy/85">{HAIR_LOSS_HOURS_TIME}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reviews */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <DataTable headers={["Rating", "Reviews"]} keys={["metric", "value"]} rows={HAIR_LOSS_REPUTATION} />
            <p className="mt-4 font-semibold text-navy">Highlights:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.reviewsHighlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.appointmentHeading}</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/85">{page.appointmentBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-consultation" variant="primary">
                  Book Free Consultation
                </Button>
                <Button href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`} variant="outline">
                  Call {displayPhone}
                </Button>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={HAIR_LOSS_TREATMENTS_FAQS} />
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-navy/10 bg-surface/60 p-4 sm:p-5">
              <p className="text-xs leading-relaxed text-navy/70 sm:text-sm">
                <span className="font-semibold text-navy/85">Disclaimer:</span> All medical information reviewed
                and verified by Dr Sandeep Bhasin, Senior Cosmetic Surgeon, Delhi. Individual results vary.
              </p>
            </div>
          </section>
        </article>

        <aside className="hidden overflow-x-clip lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="service-sidebar" />
              </Suspense>
              <a
                href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
                className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white"
              >
                Call clinic
              </a>
              {wa && (
                <a
                  href={wa}
                  className="block w-full rounded-xl border-2 border-teal py-3 text-center text-sm font-semibold text-teal"
                >
                  WhatsApp
                </a>
              )}
              <div className="rounded-xl border border-surface bg-white p-4 text-sm text-navy/80">
                <p className="font-semibold text-navy">Clinic hours</p>
                <p className="mt-2">Mon–Sat · {HAIR_LOSS_HOURS_TIME}</p>
              </div>
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] lg:hidden">
        <a
          href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
          className="flex flex-1 items-center justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
        >
          Call
        </a>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl bg-[#25D366] py-3 text-[13px] font-semibold text-white"
          >
            WhatsApp
          </a>
        )}
        <Link href="/book-consultation" className="flex flex-1 items-center justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">
          Book Free
        </Link>
      </div>

      <section className="bg-navy py-16 text-center text-white md:py-20">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Book your free consultation</h2>
        <p className="mx-auto mt-4 max-w-lg text-white/90">Speak with our team — no obligation, private, and fast callbacks.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/book-consultation" variant="secondary">
            Book Free Consultation
          </Button>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
