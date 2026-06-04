import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { CheckList, DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import {
  PRP_BLOOD_COMPONENT_ROWS,
  PRP_CLINIC,
  PRP_COST_ROWS,
  PRP_DIFFERENT_ROWS,
  PRP_EVIDENCE_BENEFITS,
  PRP_EXPECT_ROWS,
  PRP_GROWTH_BENEFITS,
  PRP_IMAGES,
  PRP_MEDICATION_ROWS,
  PRP_NEARBY,
  PRP_PAGE,
  PRP_PROCEDURE_STEPS,
  PRP_RESULTS_TIMELINE,
  PRP_SESSION_ROWS,
  PRP_TREATMENT_BENEFITS,
  PRP_TREATMENT_PATH,
  PRP_TREATMENTS_FAQS,
  PRP_TRUST_ITEMS,
  PRP_WHY_WORKS_ROWS,
} from "@/data/prp-hair-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const CLINIC_PHONE_DISPLAY = "+91-9667-977-499";

export function PrpHairTreatmentPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = PRP_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? CLINIC_PHONE_DISPLAY;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in PRP hair treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRP_TREATMENTS_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: `${page.h1} for Hair Loss`,
    description: page.tagline,
    url: `${getSiteUrl()}${PRP_TREATMENT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: page.h1, path: PRP_TREATMENT_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: page.parentLabel, href: page.parentPath },
                { label: "PRP Hair Treatment" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[32px] font-bold leading-[1.1] text-white sm:text-[40px]">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">Safe, Non-Surgical · {PRP_CLINIC.location}</p>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Image
                src={PRP_IMAGES.hero.src}
                alt={PRP_IMAGES.hero.alt}
                width={170}
                height={170}
                className="rounded-2xl border-2 border-white/20 shadow-lg"
                priority
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          <aside className="hidden md:block md:w-[312px]">
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
          <section className="pb-12 pt-10">
            <SectionTitle>{page.introHeading}</SectionTitle>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.whyPopularHeading}</h3>
            <ul className="mt-4 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.whyPopularItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6 grid gap-8 md:grid-cols-[1fr_minmax(200px,280px)] md:items-start">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{page.whatIsSubheading}</h3>
                <p className="mt-3 text-base leading-relaxed text-navy/85">{page.whatIsBody}</p>
                <h4 className="mt-6 font-semibold text-navy">How It Works</h4>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-base text-navy/85">
                  {page.howItWorksSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="mt-4 text-base text-navy/85">The growth factors present in platelets help:</p>
                <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                  {page.growthFactorsBenefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <figure className="overflow-hidden rounded-2xl border border-surface bg-white p-3 shadow-sm">
                <Image
                  src={PRP_IMAGES.procedure.src}
                  alt={PRP_IMAGES.procedure.alt}
                  width={300}
                  height={300}
                  className="mx-auto h-auto w-full max-w-[280px]"
                />
                <figcaption className="mt-2 text-center text-xs text-navy/70">{PRP_IMAGES.procedure.alt}</figcaption>
              </figure>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyWorksHeading}</SectionTitle>
            <DataTable headers={["Benefit", "Result"]} keys={["benefit", "result"]} rows={PRP_WHY_WORKS_ROWS} />
            <p className="mt-4 text-sm text-navy/75">
              Since PRP is derived from your own blood, it is considered one of the safest hair restoration procedures available.
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyChooseIntro}</p>
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="font-heading text-lg font-bold text-navy">Led By {page.ledByName}</p>
              <ul className="mt-2 list-inside list-disc text-sm text-navy/80">
                {page.ledByCredentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.differentHeading}</h3>
            <DataTable headers={["Feature", "Benefit"]} keys={["feature", "benefit"]} rows={PRP_DIFFERENT_ROWS} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.idealHeading}</h3>
            <p className="mt-2 text-base text-navy/85">{page.idealIntro}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.idealItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.avoidHeading}</h3>
            <p className="mt-2 text-base text-navy/85">{page.avoidIntro}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.avoidItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-navy">{page.avoidNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface bg-surface/30">
              <Image
                src={PRP_IMAGES.procedure.src}
                alt={PRP_IMAGES.procedure.alt}
                width={300}
                height={300}
                className="mx-auto h-auto w-full max-w-md"
              />
            </div>
            <ol className="mt-8 space-y-6">
              {PRP_PROCEDURE_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-base text-navy/80">{step.description}</p>
                    {step.title === "Plasma Separation" && (
                      <DataTable
                        headers={["Blood Component", "Function"]}
                        keys={["component", "function"]}
                        rows={PRP_BLOOD_COMPONENT_ROWS}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.sessionHeading}</SectionTitle>
            <DataTable headers={["Parameter", "Details"]} keys={["parameter", "details"]} rows={PRP_SESSION_ROWS} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.beforeHeading}</SectionTitle>
            <h3 className="mt-4 font-semibold text-navy">Recommended</h3>
            <CheckList items={page.beforeRecommended} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Avoid Before Treatment</h3>
            <CheckList items={page.beforeAvoid} variant="dont" />
            <h3 className="mt-6 font-semibold text-navy">Medications to Avoid</h3>
            <p className="mt-2 text-sm text-navy/75">Consult your doctor regarding:</p>
            <DataTable headers={["Medication Type", "Examples"]} keys={["type", "examples"]} rows={PRP_MEDICATION_ROWS} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.afterHeading}</SectionTitle>
            <h3 className="mt-4 font-semibold text-navy">Recommended After Treatment</h3>
            <CheckList items={page.afterRecommended} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Avoid After Treatment</h3>
            <CheckList items={page.afterAvoid} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.expectHeading}</SectionTitle>
            <DataTable headers={["Symptom", "Duration"]} keys={["symptom", "duration"]} rows={PRP_EXPECT_ROWS} />
            <p className="mt-4 text-sm text-navy/75">These reactions are normal and temporary.</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <DataTable headers={["Treatment Detail", "Cost / Information"]} keys={["detail", "info"]} rows={PRP_COST_ROWS} />
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.includedHeading}</h3>
            <ul className="mt-3 list-inside list-disc text-base text-navy/85">
              {page.includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.resultsIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {PRP_IMAGES.beforeAfter.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                  <div className="relative aspect-[16/9] w-full bg-surface">
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain" />
                  </div>
                  {img.caption && (
                    <figcaption className="border-t border-surface px-4 py-2 text-center text-sm text-navy/75">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {PRP_RESULTS_TIMELINE.map((r) => (
                <div key={r.phase} className="rounded-xl border border-surface bg-white p-4">
                  <p className="font-semibold text-navy">{r.phase}</p>
                  <p className="mt-1 text-sm text-navy/80">{r.outcome}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/75">
              Results vary depending on age, genetics, scalp condition, and treatment consistency.
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <h3 className="mt-6 font-semibold text-navy">Hair Growth Benefits</h3>
            <CheckList items={PRP_GROWTH_BENEFITS} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Treatment Benefits</h3>
            <CheckList items={PRP_TREATMENT_BENEFITS} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.evidenceHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.evidenceBody}</p>
            <ul className="mt-4 list-inside list-disc text-base text-navy/85">
              {PRP_EVIDENCE_BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p className="font-semibold text-navy">{PRP_CLINIC.name}</p>
              <p>
                <span className="font-semibold">Address:</span>
                <br />
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                NRI Colony, Mandakini Enclave Colony, Alaknanda
                <br />
                New Delhi – 110019
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href={`tel:${PRP_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {PRP_CLINIC.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${PRP_CLINIC.email}`} className="text-primary underline">
                  {PRP_CLINIC.email}
                </a>
              </p>
            </div>
            <h3 className="mt-6 font-semibold text-navy">Nearby Metro Station</h3>
            <p className="mt-2 text-base text-navy/85">{PRP_NEARBY.metro}</p>
            <h3 className="mt-4 font-semibold text-navy">Nearby Landmarks</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {PRP_NEARBY.landmarks.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <h3 className="mt-4 font-semibold text-navy">Parking Availability</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {PRP_NEARBY.parking.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.trustHeading}</SectionTitle>
            <ul className="mt-4 list-inside list-disc space-y-1 text-base text-navy/85">
              {PRP_TRUST_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.appointmentHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.appointmentBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-consultation" variant="primary">
                  Book Free Consultation
                </Button>
                <Link
                  href={page.parentPath}
                  className="inline-flex min-h-11 items-center rounded-button border-2 border-navy px-6 py-3 text-sm font-semibold text-navy"
                >
                  All Hair Loss Treatments
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>FAQs – PRP Hair Treatment in Delhi</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={PRP_TREATMENTS_FAQS} />
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="prp-sidebar" />
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
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 lg:hidden">
        <a href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`} className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white">
          Call
        </a>
        <Link href="/book-consultation" className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">
          Book Free
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
