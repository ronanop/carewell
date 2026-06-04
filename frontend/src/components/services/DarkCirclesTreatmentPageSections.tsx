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
  DARK_CIRCLES_AFTERCARE_DO,
  DARK_CIRCLES_AFTERCARE_DONT,
  DARK_CIRCLES_CANDIDATE,
  DARK_CIRCLES_CLINIC,
  DARK_CIRCLES_COST_ROWS,
  DARK_CIRCLES_DOWNTIME_ROWS,
  DARK_CIRCLES_DURING,
  DARK_CIRCLES_FAQS,
  DARK_CIRCLES_IMAGES,
  DARK_CIRCLES_LOCATION,
  DARK_CIRCLES_MAJOR_CAUSES,
  DARK_CIRCLES_PAGE,
  DARK_CIRCLES_PATH,
  DARK_CIRCLES_PIGMENTATION_CAUSES,
  DARK_CIRCLES_PIGMENTATION_TYPES,
  DARK_CIRCLES_SIGNS,
  DARK_CIRCLES_TREATMENTS,
  DARK_CIRCLES_VIDEO_TOPICS,
  DARK_CIRCLES_WHY_CLINIC,
} from "@/data/dark-circles-treatment-in-delhi";
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

export function DarkCirclesTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = DARK_CIRCLES_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? DARK_CIRCLES_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in dark circles removal treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DARK_CIRCLES_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${DARK_CIRCLES_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Dark Circles Removal", path: DARK_CIRCLES_PATH },
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
                { label: "Dark Circles Removal" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.15] text-white sm:text-[32px] md:text-[36px]">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">{DARK_CIRCLES_CLINIC.location}</p>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.introQuestion}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Image
                src={DARK_CIRCLES_IMAGES.hero.src}
                alt={DARK_CIRCLES_IMAGES.hero.alt}
                width={280}
                height={180}
                className="max-h-36 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
                priority
              />
              <Image
                src={DARK_CIRCLES_IMAGES.heroBanner.src}
                alt={DARK_CIRCLES_IMAGES.heroBanner.alt}
                width={280}
                height={180}
                className="max-h-36 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
              />
            </div>
            <p className="mt-4 text-sm text-white/85">Whether your dark circles are caused by:</p>
            <ul className="mt-2 grid gap-1 text-sm text-white/85 sm:grid-cols-2">
              {page.causes.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-white/90">{page.introClosing}</p>
            <p className="mt-4 text-sm font-semibold text-white">Treatments Available</p>
            <ul className="mt-2 grid gap-1 text-sm text-white/90 sm:grid-cols-2">
              {page.treatmentsAvailable.map((t) => (
                <li key={t}>✅ {t}</li>
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
            <SectionTitle>{page.tiredHeading}</SectionTitle>
            <h3 className="mt-2 font-heading text-lg font-bold text-navy">{page.tiredSubheading}</h3>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.tired.src} alt={DARK_CIRCLES_IMAGES.tired.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Dark circles can make you appear:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.tiredEffects.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">At Care Well Medical Centre, our treatments target both:</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-surface bg-surface/30 p-4">
                <h4 className="font-semibold text-navy">Symptoms</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                  {page.symptoms.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-surface bg-surface/30 p-4">
                <h4 className="font-semibold text-navy">Root Causes</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                  {page.rootCauses.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-base text-navy/85">{page.tiredNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatAreHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.whatAre.src} alt={DARK_CIRCLES_IMAGES.whatAre.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.whatAreBody}</p>
            <p className="mt-4 text-base text-navy/85">They may develop gradually due to:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.whatAreDevelop.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.pigmentationHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.types.src} alt={DARK_CIRCLES_IMAGES.types.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Dark circles may be:</p>
            <div className="mt-4 space-y-3">
              {DARK_CIRCLES_PIGMENTATION_TYPES.map((t) => (
                <div key={t.name} className="rounded-xl border border-surface bg-white p-4 shadow-sm">
                  <h4 className="font-semibold text-navy">{t.name}</h4>
                  <p className="mt-1 text-sm text-navy/85">{t.description}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-6 font-semibold text-navy">Common Causes</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {DARK_CIRCLES_PIGMENTATION_CAUSES.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.signsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.signs.src} alt={DARK_CIRCLES_IMAGES.signs.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">You may notice:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {DARK_CIRCLES_SIGNS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.majorCausesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.causesMain.src} alt={DARK_CIRCLES_IMAGES.causesMain.alt} />
            </div>
            <div className="mt-8 space-y-10">
              {DARK_CIRCLES_MAJOR_CAUSES.map((block) => {
                const img = DARK_CIRCLES_IMAGES[block.imageKey];
                return (
                  <div key={block.title}>
                    <h3 className="font-heading text-xl font-bold text-navy">{block.title}</h3>
                    <div className="mt-4">
                      <SectionImage src={img.src} alt={img.alt} />
                    </div>
                    {"body" in block && block.body && <p className="mt-4 text-base text-navy/85">{block.body}</p>}
                    {"items" in block && block.items && (
                      <ul className="mt-3 list-inside list-disc text-base text-navy/85">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {"note" in block && block.note && (
                      <p className="mt-3 text-sm text-navy/75">{block.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.treatmentsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage
                src={DARK_CIRCLES_IMAGES.technologies.src}
                alt={DARK_CIRCLES_IMAGES.technologies.alt}
                aspect="wide"
              />
            </div>
            <div className="mt-8 space-y-10">
              {DARK_CIRCLES_TREATMENTS.map((tx, i) => (
                <article key={tx.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm md:p-6">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    {i + 1}. {tx.title}
                  </h3>
                  {tx.description && <p className="mt-2 text-base text-navy/85">{tx.description}</p>}
                  {tx.ingredients && (
                    <>
                      <p className="mt-3 text-sm font-semibold text-navy/70">Common Ingredients</p>
                      <ul className="mt-1 list-inside list-disc text-sm text-navy/85">
                        {tx.ingredients.map((ing) => (
                          <li key={ing}>{ing}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {tx.peelTypes && (
                    <>
                      <p className="mt-3 text-sm font-semibold text-navy/70">Types Used</p>
                      <ul className="mt-1 list-inside list-disc text-sm text-navy/85">
                        {tx.peelTypes.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-3 text-sm font-semibold text-navy/70">Benefits</p>
                  <CheckList items={tx.benefits} variant="do" />
                  {tx.bestFor && (
                    <>
                      <p className="mt-3 text-sm font-semibold text-navy/70">Best For</p>
                      <ul className="mt-1 list-inside list-disc text-sm text-navy/85">
                        {tx.bestFor.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {tx.extra?.map((row) => (
                    <p key={row.label} className="mt-2 text-sm text-navy/85">
                      <strong>{row.label}:</strong> {row.value}
                    </p>
                  ))}
                  <Link href={tx.href} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
                    Learn more →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.candidate.src} alt={DARK_CIRCLES_IMAGES.candidate.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">You may be a suitable candidate if:</p>
            <CheckList items={DARK_CIRCLES_CANDIDATE} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.expectHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.journey.src} alt={DARK_CIRCLES_IMAGES.journey.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.painfulHeading}</h3>
            <p className="mt-2 text-base text-navy/85">{page.painfulNote}</p>
            <p className="mt-3 font-medium text-navy">During Treatment</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {DARK_CIRCLES_DURING.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">{page.downtimeHeading}</h3>
            <DataTable
              headers={["Treatment", "Downtime"]}
              keys={["treatment", "downtime"]}
              rows={DARK_CIRCLES_DOWNTIME_ROWS.map((r) => ({ treatment: r.treatment, downtime: r.downtime }))}
            />
            <p className="mt-4 text-sm text-navy/75">Most patients return to routine activities quickly.</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.aftercareHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.aftercare.src} alt={DARK_CIRCLES_IMAGES.aftercare.alt} />
            </div>
            <h3 className="mt-4 font-semibold text-navy">Recommended</h3>
            <CheckList items={DARK_CIRCLES_AFTERCARE_DO} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Avoid</h3>
            <CheckList items={DARK_CIRCLES_AFTERCARE_DONT} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {DARK_CIRCLES_IMAGES.gallery.map((img) => (
                <SectionImage key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Expected Improvements</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {page.galleryImprovements.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={DARK_CIRCLES_IMAGES.cost.src} alt={DARK_CIRCLES_IMAGES.cost.alt} />
            </div>
            <h3 className="mt-6 font-heading text-lg font-bold text-navy">Treatment Price Guide</h3>
            <DataTable
              headers={["Treatment", "Sessions", "Cost Per Session"]}
              keys={["treatment", "sessions", "cost"]}
              rows={DARK_CIRCLES_COST_ROWS.map((r) => ({
                treatment: r.treatment,
                sessions: r.sessions,
                cost: r.cost,
              }))}
            />
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="font-semibold text-navy">Important Note</p>
              <p className="mt-1 text-sm text-navy/80">Final cost depends on:</p>
              <ul className="mt-2 list-inside list-disc text-sm text-navy/80">
                {page.costNoteFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[180px_1fr]">
              <Image
                src={DARK_CIRCLES_IMAGES.drBhasin.src}
                alt={DARK_CIRCLES_IMAGES.drBhasin.alt}
                width={180}
                height={220}
                className="rounded-2xl border border-surface shadow-sm"
              />
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{page.expertHeading}</h3>
                <p className="mt-2 text-base text-navy/85">{page.expertBody}</p>
                <h3 className="mt-6 font-heading text-lg font-bold text-navy">Why Patients Trust Us</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {DARK_CIRCLES_WHY_CLINIC.map((item) => (
                    <li key={item} className="flex gap-2 text-sm font-medium text-navy">
                      <span className="text-teal" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/about/dr-bhasin" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  View Dr. Bhasin profile →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.reviewsHeading}</SectionTitle>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {DARK_CIRCLES_VIDEO_TOPICS.map((topic) => (
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
              <p className="font-semibold text-navy">📍 {DARK_CIRCLES_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park (C.R. Park)
                <br />
                NRI Colony, Mandakini Enclave Colony, Alaknanda
                <br />
                New Delhi – 110019
              </p>
              <p>🚇 {DARK_CIRCLES_LOCATION.metro}</p>
              <p>🚗 {DARK_CIRCLES_LOCATION.access}</p>
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
                <SectionImage src={DARK_CIRCLES_IMAGES.ctaBanner.src} alt={DARK_CIRCLES_IMAGES.ctaBanner.alt} aspect="wide" />
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
                  Schedule Your Consultation
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
              <ServiceFaq items={DARK_CIRCLES_FAQS} />
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
                <LeadForm defaultTreatment={treatment} source="dark-circles-sidebar" />
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
