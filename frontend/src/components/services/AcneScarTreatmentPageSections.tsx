import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MapEmbed } from "@/components/layout/MapEmbed";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { CheckList, DataTable, SectionTitle } from "@/components/services/hub-page-table";
import { Button } from "@/components/ui/Button";
import {
  ACNE_CAUSE_GROUPS,
  ACNE_SCAR_AVOID_ITEMS,
  ACNE_SCAR_CLINIC,
  ACNE_SCAR_COST_ROWS,
  ACNE_SCAR_EXPERTS,
  ACNE_SCAR_FAQS,
  ACNE_SCAR_IMAGES,
  ACNE_SCAR_LOCATION,
  ACNE_SCAR_PAGE,
  ACNE_SCAR_PATH,
  ACNE_SCAR_PREVENT,
  ACNE_SCAR_TREATMENTS,
  ACNE_SCAR_TYPES,
  ACNE_SCAR_VIDEO_TOPICS,
  ACNE_SCAR_WHY_CLINIC,
  ACNE_SCAR_AFTERCARE,
} from "@/data/acne-scar-treatment-in-delhi";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { whatsappHref } from "@carewell/backend/lib/whatsapp";

const HairTransplantReviews = dynamic(
  () => import("@/components/services/HairTransplantReviews").then((m) => m.HairTransplantReviews),
  { loading: () => <div className="h-64 animate-pulse rounded-2xl bg-surface" aria-hidden /> },
);

function SectionImage({
  src,
  alt,
  caption,
  priority,
  aspect = "video",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "video" | "square" | "wide";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";
  return (
    <figure className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <div className={`relative w-full ${aspectClass} bg-surface`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="border-t border-surface px-4 py-2 text-center text-xs text-navy/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function AcneScarTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = ACNE_SCAR_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? ACNE_SCAR_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in acne scar treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ACNE_SCAR_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: page.h1,
    description: page.subtitle,
    url: `${getSiteUrl()}${ACNE_SCAR_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Acne Scar Treatment", path: ACNE_SCAR_PATH },
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
                { label: "Acne Scar Treatment" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.15] text-white sm:text-[32px] md:text-[36px]">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">{ACNE_SCAR_CLINIC.location}</p>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.introQuestion}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Image
                src={ACNE_SCAR_IMAGES.hero.src}
                alt={ACNE_SCAR_IMAGES.hero.alt}
                width={280}
                height={180}
                className="max-h-36 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
                priority
              />
              <Image
                src={ACNE_SCAR_IMAGES.trustBadge.src}
                alt={ACNE_SCAR_IMAGES.trustBadge.alt}
                width={280}
                height={120}
                className="max-h-36 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
              />
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {page.whyChoose.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/90">
                  <span aria-hidden>✅</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">
                Book Your Consultation Today
              </Button>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center rounded-button border border-white/40 px-5 py-3 text-sm font-semibold text-white"
              >
                Call: {displayPhone}
              </a>
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
            <p className="text-base leading-relaxed text-navy/85">{page.introBody}</p>
            <p className="mt-4 font-medium text-navy">Whether you are struggling with:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-base text-navy/85">
              {page.scarConcerns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">{page.introClosing}</p>
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
              <h2 className="font-heading text-lg font-bold text-navy">{page.expertsHeading}</h2>
              <ul className="mt-3 space-y-2 text-base text-navy/85">
                <li>👨‍⚕️ <strong>Dr. Sandeep Bhasin</strong> — Senior Cosmetic &amp; Laser Surgeon</li>
                <li>👨‍⚕️ <strong>Dr. Riyaz</strong> — Dermatologist &amp; Skin Specialist</li>
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {ACNE_SCAR_IMAGES.gallery.map((img) => (
                <SectionImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.causesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.causes.src} alt={ACNE_SCAR_IMAGES.causes.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.causesIntro}</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.causesList.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-base font-medium text-navy">{page.causesNote}</p>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">{page.commonCausesHeading}</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {ACNE_CAUSE_GROUPS.map((group) => (
                <div key={group.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm">
                  <h4 className="font-heading font-bold text-navy">{group.title}</h4>
                  <ul className="mt-3 list-inside list-disc text-sm text-navy/85">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.symptomsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.scarTypes.src} alt={ACNE_SCAR_IMAGES.scarTypes.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.symptomsIntro}</p>
            <h3 className="mt-4 font-semibold text-navy">Common Signs</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.symptomsSigns.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">{page.typesHeading}</h3>
            <div className="mt-6 space-y-8">
              {[ACNE_SCAR_TYPES.depressed, ACNE_SCAR_TYPES.raised].map((group) => (
                <div key={group.title}>
                  <h4 className="font-heading text-lg font-bold text-navy">{group.title}</h4>
                  <div className="mt-4 space-y-4">
                    {group.kinds.map((kind) => (
                      <div key={kind.name} className="rounded-xl border border-surface bg-surface/30 p-4">
                        <h5 className="font-semibold text-navy">{kind.name}</h5>
                        <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                          {kind.traits.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.flatSpotsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.pih.src} alt={ACNE_SCAR_IMAGES.pih.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.flatSpotsIntro}</p>
            <p className="mt-4 font-medium text-navy">These may appear as:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.pihAppearances.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="mt-4 font-medium text-navy">Treatment Options</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.pihTreatments.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-navy/75">{page.pihNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.itchHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.symptoms.src} alt={ACNE_SCAR_IMAGES.symptoms.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.itchBody}</p>
            <p className="mt-2 text-base text-navy/85">This is more common with:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.itchCommon.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.specialistsHeading}</SectionTitle>
            <div className="mt-8 space-y-10">
              {ACNE_SCAR_EXPERTS.map((doc) => {
                const img = ACNE_SCAR_IMAGES[doc.imageKey];
                return (
                  <div key={doc.name} className="grid gap-6 md:grid-cols-[180px_1fr] md:items-start">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={180}
                      height={220}
                      className="rounded-2xl border border-surface shadow-sm"
                    />
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-navy">{doc.name}</h3>
                      <p className="mt-1 text-primary font-medium">{doc.role}</p>
                      {doc.credentials.length > 0 && (
                        <>
                          <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">
                            Credentials
                          </h4>
                          <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                            {doc.credentials.map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Expertise</h4>
                      <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                        {doc.expertise.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                      <Link href={doc.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                        Learn more →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.treatmentsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.technologies.src} alt={ACNE_SCAR_IMAGES.technologies.alt} aspect="wide" />
            </div>
            <div className="mt-8 space-y-8">
              {ACNE_SCAR_TREATMENTS.map((tx, i) => (
                <article key={tx.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm md:p-6">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    {i + 1}. {tx.title}
                  </h3>
                  <p className="mt-2 text-base text-navy/85">{tx.description}</p>
                  <DataTable
                    headers={["Details", "Information"]}
                    keys={["label", "value"]}
                    rows={tx.details.map((d) => ({ label: d.label, value: d.value }))}
                  />
                  <Link href={tx.href} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
                    Learn more →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.rightTreatmentHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.comparison.src} alt={ACNE_SCAR_IMAGES.comparison.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.rightTreatmentBody}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.avoidHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.eligibility.src} alt={ACNE_SCAR_IMAGES.eligibility.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.avoidIntro}</p>
            <CheckList items={ACNE_SCAR_AVOID_ITEMS} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.preventHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.prevention.src} alt={ACNE_SCAR_IMAGES.prevention.alt} />
            </div>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{ACNE_SCAR_PREVENT.early.title}</h3>
                <CheckList items={ACNE_SCAR_PREVENT.early.do} variant="do" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{ACNE_SCAR_PREVENT.avoid.title}</h3>
                <CheckList items={ACNE_SCAR_PREVENT.avoid.dont} variant="dont" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{ACNE_SCAR_PREVENT.protect.title}</h3>
                <CheckList items={ACNE_SCAR_PREVENT.protect.do} variant="do" />
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.cost.src} alt={ACNE_SCAR_IMAGES.cost.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Acne Scar Treatment Cost Guide</h3>
            <DataTable
              headers={["Treatment", "Estimated Cost"]}
              keys={["treatment", "range"]}
              rows={ACNE_SCAR_COST_ROWS.map((r) => ({ treatment: r.treatment, range: r.range }))}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.aftercareHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.aftercare.src} alt={ACNE_SCAR_IMAGES.aftercare.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">After treatment:</p>
            <CheckList items={ACNE_SCAR_AFTERCARE} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <h3 className="mt-2 font-heading text-lg font-bold text-navy">{page.whyClinicSubheading}</h3>
            <div className="mt-6">
              <SectionImage src={ACNE_SCAR_IMAGES.whyChoose.src} alt={ACNE_SCAR_IMAGES.whyChoose.alt} />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {ACNE_SCAR_WHY_CLINIC.map((item) => (
                <li key={item} className="flex gap-2 text-sm font-medium text-navy">
                  <span className="text-teal" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say</SectionTitle>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.testimonialsHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ACNE_SCAR_VIDEO_TOPICS.map((topic) => (
                <div
                  key={topic}
                  className="flex aspect-video items-center justify-center gap-2 rounded-2xl border border-dashed border-surface bg-surface/40 p-4 text-center text-sm text-navy/70"
                >
                  <span aria-hidden>🎥</span>
                  {topic}
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6">
              <MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre location" />
            </div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">📍 {ACNE_SCAR_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park
                <br />
                Near Mandakini Enclave &amp; Alaknanda Market
                <br />
                New Delhi – 110019
              </p>
              <p>🚇 {ACNE_SCAR_LOCATION.metro}</p>
              <p>🚗 {ACNE_SCAR_LOCATION.parking}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">
                  📞 {displayPhone}
                </a>
              </p>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <div className="mt-6">
                <SectionImage src={ACNE_SCAR_IMAGES.ctaBanner.src} alt={ACNE_SCAR_IMAGES.ctaBanner.alt} aspect="wide" />
              </div>
              <p className="mt-4 text-base text-navy/85">{page.ctaBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${displayPhone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white"
                >
                  Call Now: {displayPhone}
                </a>
                <Button href="/book-consultation" variant="primary">
                  Book Your Consultation Today
                </Button>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
                  >
                    WhatsApp Us
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8">
              <ServiceFaq items={ACNE_SCAR_FAQS} />
            </div>
          </section>

          <section className="pb-8">
            <p className="text-sm leading-relaxed text-navy/70">
              <strong>Medical Disclaimer.</strong> {page.disclaimer}
            </p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="acne-scar-sidebar" />
              </Suspense>
              <Link
                href={page.parentPath}
                className="block w-full rounded-xl border-2 border-primary py-3 text-center text-sm font-semibold text-primary"
              >
                All skin treatments
              </Link>
              <a
                href={`tel:${displayPhone.replace(/\s/g, "")}`}
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
          href={`tel:${displayPhone.replace(/\s/g, "")}`}
          className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
        >
          Call
        </a>
        <Link href="/book-consultation" className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">
          Book Now
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
