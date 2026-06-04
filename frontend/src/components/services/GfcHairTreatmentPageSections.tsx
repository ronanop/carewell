import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import {
  GFC_BENEFIT_ROWS,
  GFC_CLINIC,
  GFC_CONDITIONS,
  GFC_COST_ROWS,
  GFC_IMAGES,
  GFC_PAGE,
  GFC_PREFER_ITEMS,
  GFC_PRECAUTIONS,
  GFC_PROCEDURE_STEPS,
  GFC_SIDE_EFFECTS,
  GFC_TREATMENT_PATH,
  GFC_TREATMENTS_FAQS,
  GFC_WHY_CHOOSE_ROWS,
} from "@/data/gfc-hair-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const CLINIC_PHONE_DISPLAY = "+91-9667-977-499";

export function GfcHairTreatmentPageSections({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const page = GFC_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? CLINIC_PHONE_DISPLAY;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in GFC hair treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GFC_TREATMENTS_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${GFC_TREATMENT_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "GFC Hair Treatment", path: GFC_TREATMENT_PATH },
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
                { label: "GFC Hair Treatment" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">Non-Surgical · {GFC_CLINIC.location}</p>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image
                src={GFC_IMAGES.hero.src}
                alt={GFC_IMAGES.hero.alt}
                width={320}
                height={200}
                className="max-h-40 w-auto rounded-2xl border-2 border-white/20 shadow-lg"
                priority
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white"
                >
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
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-navy/85">{page.whatIsBody}</p>
            <p className="mt-4 font-medium text-navy">GFC treatment is:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.whatIsTraits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.whatIsNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <div className="mt-4 space-y-4 text-base text-navy/85">
              {page.benefitsIntro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Key Benefits of GFC Therapy</h3>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(240px,360px)] lg:items-start">
              <DataTable headers={["Benefit", "Description"]} keys={["benefit", "description"]} rows={GFC_BENEFIT_ROWS} />
              <figure className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                <Image
                  src={GFC_IMAGES.benefits.src}
                  alt={GFC_IMAGES.benefits.alt}
                  width={360}
                  height={240}
                  className="h-auto w-full"
                />
              </figure>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.procedureIntro}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <Image
                src={GFC_IMAGES.procedure.src}
                alt={GFC_IMAGES.procedure.alt}
                width={640}
                height={400}
                className="mx-auto h-auto w-full max-w-2xl"
              />
            </div>
            <ol className="mt-8 space-y-8">
              {GFC_PROCEDURE_STEPS.map((step) => (
                <li key={step.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-base text-navy/85">{step.description}</p>
                  {"bullets" in step && step.bullets && (
                    <ul className="mt-2 list-inside list-disc text-base text-navy/85">
                      {step.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.conditionsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.conditionsIntro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {GFC_CONDITIONS.map((c) => (
                <div key={c.title} className="rounded-xl border border-surface bg-white p-4 shadow-sm">
                  <h3 className="font-heading font-bold text-navy">{c.title}</h3>
                  <p className="mt-2 text-sm text-navy/80">{c.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.sideEffectsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.sideEffectsIntro}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Potential Side Effects</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-base text-navy/85">
              {GFC_SIDE_EFFECTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-navy/75">These effects usually subside within a few days.</p>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Precautions</h3>
            <p className="mt-2 text-sm text-navy/75">Before undergoing treatment:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-base text-navy/85">
              {GFC_PRECAUTIONS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Average Cost</h3>
            <DataTable headers={["Treatment", "Cost"]} keys={["treatment", "cost"]} rows={GFC_COST_ROWS} />
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.costNoteHeading}</h3>
            <p className="mt-2 text-base text-navy/85">
              It is essential to consult with Care Well Medical Centre for:
            </p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.costNoteItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.costNoteBody}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyChooseIntro}</p>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Here&apos;s Why Patients Trust Us</h3>
            <DataTable headers={["Feature", "Advantage"]} keys={["feature", "advantage"]} rows={GFC_WHY_CHOOSE_ROWS} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.preferHeading}</SectionTitle>
            <div className="mt-6 space-y-6">
              {GFC_PREFER_ITEMS.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-base text-navy/85">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.journeyHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.journeyBody}</p>
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
            <SectionTitle>FAQs – GFC Hair Treatment in Delhi</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={GFC_TREATMENTS_FAQS} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>About Care Well Medical Centre</SectionTitle>
            <p className="mt-4 text-base text-navy/85">
              Care Well Medical Centre is a leading cosmetic surgery clinic in Delhi, offering advanced aesthetic and
              reconstructive treatments with expert care.
            </p>
            <div className="mt-6 space-y-3 text-base text-navy/85">
              <p>
                <span className="font-semibold text-navy">Address:</span>
                <br />
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                NRI Colony, Mandakini Enclave Colony, Alaknanda
                <br />
                New Delhi – 110019
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href={`tel:${GFC_CLINIC.phone.replace(/\s/g, "")}`} className="text-primary underline">
                  {GFC_CLINIC.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${GFC_CLINIC.email}`} className="text-primary underline">
                  {GFC_CLINIC.email}
                </a>
              </p>
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="gfc-sidebar" />
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
        <a
          href={`tel:${displayPhone.replace(/[^\d+]/g, "")}`}
          className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
        >
          Call
        </a>
        <Link
          href="/book-consultation"
          className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white"
        >
          Book Free
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
