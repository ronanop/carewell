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
  VITILIGO_AFFECTED,
  VITILIGO_BODY_AREAS,
  VITILIGO_CLINIC,
  VITILIGO_COMPREHENSIVE,
  VITILIGO_COST_ROWS,
  VITILIGO_DOCTOR,
  VITILIGO_EARLY_BENEFITS,
  VITILIGO_EARLY_SIGNS,
  VITILIGO_EFFECTS,
  VITILIGO_FAQS,
  VITILIGO_FUTURE,
  VITILIGO_HERO_GRID,
  VITILIGO_HOME_PROTECT,
  VITILIGO_HOME_REMEDIES,
  VITILIGO_HOME_SUPPORT,
  VITILIGO_IDEAL_CANDIDATES,
  VITILIGO_IMAGES,
  VITILIGO_LOCATION,
  VITILIGO_MANAGEMENT,
  VITILIGO_MELANIN_CAUSES,
  VITILIGO_MYTHS_ROWS,
  VITILIGO_NOT_IDEAL,
  VITILIGO_PAGE,
  VITILIGO_PATH,
  VITILIGO_PROTOCOL_STEPS,
  VITILIGO_TATTOO_RISKS,
  VITILIGO_TREATMENT_CATEGORIES,
  VITILIGO_TYPES,
  VITILIGO_VIDEO_TOPICS,
  VITILIGO_WHY_CLINIC,
} from "@/data/vitiligo-treatment-in-delhi";
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

export function VitiligoTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = VITILIGO_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? VITILIGO_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in vitiligo treatment in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VITILIGO_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${VITILIGO_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Vitiligo Treatment", path: VITILIGO_PATH },
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
                { label: "Vitiligo Treatment" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.15] text-white sm:text-[32px] md:text-[36px]">
              {page.h1}
            </h1>
            <p className="mt-2 text-sm text-white/80">{VITILIGO_CLINIC.location}</p>
            <div className="mt-6">
              <Image
                src={VITILIGO_IMAGES.hero.src}
                alt={VITILIGO_IMAGES.hero.alt}
                width={360}
                height={200}
                className="max-h-44 w-full rounded-2xl border-2 border-white/20 object-cover shadow-lg"
                priority
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {VITILIGO_HERO_GRID.map((item) => {
                const img = VITILIGO_IMAGES[item.key];
                return (
                  <Image
                    key={item.key}
                    src={img.src}
                    alt={img.alt}
                    width={120}
                    height={80}
                    className="h-16 w-full rounded-lg border border-white/20 object-cover"
                  />
                );
              })}
            </div>
            <p className="mt-4 text-sm font-semibold text-white">{page.introHeading}</p>
            <p className="mt-2 text-sm text-white/90">{page.introBody}</p>
            <ul className="mt-3 grid gap-1 text-sm text-white/90 sm:grid-cols-2">
              {page.treatmentOptions.map((t) => (
                <li key={t}>✅ {t}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-white/85">{page.introClosing}</p>
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
          <section className="section-y">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.awareness.src} alt={VITILIGO_IMAGES.awareness.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">{page.whatIsBody}</p>
            <p className="mt-4 text-base text-navy/85">As a result:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {VITILIGO_EFFECTS.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-navy/85">Vitiligo can affect men, women, children, and all skin types.</p>
            <h3 className="mt-6 font-semibold text-navy">Commonly Affected Areas</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {VITILIGO_AFFECTED.map((a) => (
                <li key={a} className="rounded-full bg-surface px-3 py-1 text-sm text-navy/85">
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.understandingHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.melanin.src} alt={VITILIGO_IMAGES.melanin.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">
              Vitiligo occurs when the body loses melanocytes, resulting in pigment loss.
            </p>
            <h3 className="mt-4 font-semibold text-navy">What Happens?</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              <li>Melanin production decreases</li>
              <li>Skin loses color</li>
              <li>White patches gradually appear</li>
            </ul>
            <h3 className="mt-6 font-semibold text-navy">Early Treatment Matters</h3>
            <p className="mt-2 text-base text-navy/85">Early diagnosis and treatment can:</p>
            <CheckList items={VITILIGO_EARLY_BENEFITS} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.advancedHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.technologies.src} alt={VITILIGO_IMAGES.technologies.alt} aspect="wide" />
            </div>
            <div className="mt-8 space-y-10">
              {VITILIGO_TREATMENT_CATEGORIES.map((cat, i) => {
                const img = VITILIGO_IMAGES[cat.imageKey];
                return (
                  <article key={cat.title} className="rounded-2xl border border-surface bg-white p-5 shadow-sm md:p-6">
                    <h3 className="font-heading text-xl font-bold text-navy">
                      {i + 1}. {cat.title}
                    </h3>
                    <div className="mt-4">
                      <SectionImage src={img.src} alt={img.alt} />
                    </div>
                    <p className="mt-4 text-base text-navy/85">{cat.description}</p>
                    {"options" in cat && cat.options && (
                      <>
                        <p className="mt-3 text-sm font-semibold text-navy/70">Treatment Options</p>
                        <ul className="mt-1 list-inside list-disc text-sm text-navy/85">
                          {cat.options.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {"procedures" in cat && cat.procedures && (
                      <div className="mt-4 space-y-3">
                        {cat.procedures.map((proc) => (
                          <div key={proc.name} className="rounded-xl border border-surface bg-surface/30 p-4">
                            <h4 className="font-semibold text-navy">{proc.name}</h4>
                            <p className="mt-1 text-sm text-navy/85">{proc.detail}</p>
                            <Link href={proc.href} className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
                              Learn more →
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="mt-3 text-sm font-semibold text-navy/70">Benefits</p>
                    <CheckList items={cat.benefits} variant="do" />
                    <Link href={cat.href} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
                      View treatment details →
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.doctorHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[180px_1fr]">
              <Image
                src={VITILIGO_IMAGES.drBhasin.src}
                alt={VITILIGO_IMAGES.drBhasin.alt}
                width={180}
                height={220}
                className="rounded-2xl border border-surface shadow-sm"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy">{VITILIGO_DOCTOR.name}</h3>
                <p className="mt-1 font-medium text-primary">{VITILIGO_DOCTOR.role}</p>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Credentials</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                  {VITILIGO_DOCTOR.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Experience</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                  {VITILIGO_DOCTOR.experience.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Expertise</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                  {VITILIGO_DOCTOR.expertise.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-navy/70">Achievements</h4>
                <CheckList items={VITILIGO_DOCTOR.achievements} variant="do" />
                <Link href={VITILIGO_DOCTOR.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  View profile →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.protocolHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.protocol.src} alt={VITILIGO_IMAGES.protocol.alt} aspect="wide" />
            </div>
            <div className="mt-8 space-y-10">
              {VITILIGO_PROTOCOL_STEPS.map((step) => {
                const img = VITILIGO_IMAGES[step.imageKey];
                return (
                  <div key={step.step}>
                    <h3 className="font-heading text-xl font-bold text-navy">
                      Step {step.step} – {step.title}
                    </h3>
                    <div className="mt-4">
                      <SectionImage src={img.src} alt={img.alt} />
                    </div>
                    <ul className="mt-3 list-inside list-disc text-base text-navy/85">
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {"goal" in step && step.goal && (
                      <p className="mt-3 text-sm font-medium text-navy">Goal: {step.goal}</p>
                    )}
                    {"note" in step && step.note && <p className="mt-3 text-sm text-navy/75">{step.note}</p>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.candidate.src} alt={VITILIGO_IMAGES.candidate.alt} />
            </div>
            <h3 className="mt-6 font-semibold text-navy">Ideal Candidates</h3>
            <CheckList items={VITILIGO_IDEAL_CANDIDATES} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Not Ideal Candidates</h3>
            <CheckList items={VITILIGO_NOT_IDEAL} variant="dont" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.mythsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.myths.src} alt={VITILIGO_IMAGES.myths.alt} />
            </div>
            <DataTable
              headers={["Myth", "Fact"]}
              keys={["myth", "fact"]}
              rows={VITILIGO_MYTHS_ROWS.map((r) => ({ myth: r.myth, fact: r.fact }))}
            />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.areasHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.bodyAreas.src} alt={VITILIGO_IMAGES.bodyAreas.alt} />
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {VITILIGO_BODY_AREAS.map((a) => (
                <li key={a} className="text-base text-navy/85">
                  • {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.causesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.melaninCauses.src} alt={VITILIGO_IMAGES.melaninCauses.alt} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {VITILIGO_MELANIN_CAUSES.map((c) => (
                <div key={c.title} className="rounded-xl border border-surface bg-white p-4 shadow-sm">
                  <h4 className="font-semibold text-navy">{c.title}</h4>
                  <p className="mt-1 text-sm text-navy/85">{c.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.earlySignsHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.earlySigns.src} alt={VITILIGO_IMAGES.earlySigns.alt} />
            </div>
            <ul className="mt-4 list-inside list-disc text-base text-navy/85">
              {VITILIGO_EARLY_SIGNS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.types.src} alt={VITILIGO_IMAGES.types.alt} />
            </div>
            <div className="mt-6 space-y-4">
              {VITILIGO_TYPES.map((t) => (
                <div key={t.name} className="rounded-xl border border-surface bg-surface/30 p-4">
                  <h4 className="font-heading font-bold text-navy">{t.name}</h4>
                  <p className="mt-1 text-sm text-navy/85">{t.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.managementHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.management.src} alt={VITILIGO_IMAGES.management.alt} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {VITILIGO_MANAGEMENT.map((m) => (
                <div key={m.category} className="rounded-xl border border-surface bg-white p-4 shadow-sm">
                  <h4 className="font-semibold text-navy">{m.category}</h4>
                  <ul className="mt-2 list-inside list-disc text-sm text-navy/85">
                    {m.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.comprehensiveHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.protocolFlow.src} alt={VITILIGO_IMAGES.protocolFlow.alt} />
            </div>
            <CheckList items={VITILIGO_COMPREHENSIVE} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.tattooHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.tattooing.src} alt={VITILIGO_IMAGES.tattooing.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">
              Micropigmentation may improve appearance but has limitations:
            </p>
            <h3 className="mt-4 font-semibold text-navy">Risks</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {VITILIGO_TATTOO_RISKS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-navy/75">{page.tattooNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.futureHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.future.src} alt={VITILIGO_IMAGES.future.alt} />
            </div>
            <p className="mt-4 text-base text-navy/85">Research is exploring:</p>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {VITILIGO_FUTURE.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.homeCareHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.selfCare.src} alt={VITILIGO_IMAGES.selfCare.alt} />
            </div>
            <h3 className="mt-4 font-semibold text-navy">Protect Your Skin</h3>
            <CheckList items={VITILIGO_HOME_PROTECT} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Skin Support</h3>
            <CheckList items={VITILIGO_HOME_SUPPORT} variant="do" />
            <h3 className="mt-6 font-semibold text-navy">Natural Supportive Remedies</h3>
            <ul className="mt-2 list-inside list-disc text-base text-navy/85">
              {VITILIGO_HOME_REMEDIES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-navy/75">
              <strong>Note:</strong> {page.homeRemediesNote}
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.cost.src} alt={VITILIGO_IMAGES.cost.alt} />
            </div>
            <DataTable
              headers={["Treatment", "Estimated Cost"]}
              keys={["treatment", "range"]}
              rows={VITILIGO_COST_ROWS.map((r) => ({ treatment: r.treatment, range: r.range }))}
            />
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="font-semibold text-navy">Important Note</p>
              <p className="mt-1 text-sm text-navy/80">Final pricing depends on:</p>
              <ul className="mt-2 list-inside list-disc text-sm text-navy/80">
                {page.costNoteFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <h3 className="mt-2 font-heading text-lg font-bold text-navy">{page.whyClinicSubheading}</h3>
            <div className="mt-6">
              <SectionImage src={VITILIGO_IMAGES.clinic.src} alt={VITILIGO_IMAGES.clinic.alt} />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {VITILIGO_WHY_CLINIC.map((item) => (
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
            <SectionTitle>{page.galleryHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {VITILIGO_IMAGES.gallery.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="font-semibold text-navy">Important Note</p>
              <p className="mt-1 text-sm text-navy/80">Results vary based on:</p>
              <ul className="mt-2 list-inside list-disc text-sm text-navy/80">
                {page.galleryNoteFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videosHeading}</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {VITILIGO_VIDEO_TOPICS.map((topic) => (
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
            <SectionTitle>{page.testimonialsHeading}</SectionTitle>
            <p className="mt-2 text-base text-navy/85">{page.testimonialsSubheading}</p>
            <div className="mt-6">
              <HairTransplantReviews />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <div className="mt-6">
              <MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre location" />
            </div>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">📍 {VITILIGO_CLINIC.name}</p>
              <p>
                House No. 1, NRI Complex, Chittaranjan Park
                <br />
                Near Mandakini Enclave &amp; Alaknanda Market
                <br />
                New Delhi – 110019
              </p>
              <p>🚇 {VITILIGO_LOCATION.metro}</p>
              <p>🚗 {VITILIGO_LOCATION.parking}</p>
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
                <SectionImage src={VITILIGO_IMAGES.ctaBanner.src} alt={VITILIGO_IMAGES.ctaBanner.alt} aspect="wide" />
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
              <ServiceFaq items={VITILIGO_FAQS} />
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
                <LeadForm defaultTreatment={treatment} source="vitiligo-sidebar" />
              </Suspense>
              <Link
                href={`${VITILIGO_PATH}/melanocytes-transplant`}
                className="block w-full rounded-xl border-2 border-teal py-3 text-center text-sm font-semibold text-teal"
              >
                Melanocyte transplant
              </Link>
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
