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
  MTF_SURGERY_CLINIC,
  MTF_SURGERY_COST_ROWS,
  MTF_SURGERY_FAQS,
  MTF_SURGERY_IMAGES,
  MTF_SURGERY_JOURNEY,
  MTF_SURGERY_PAGE,
  MTF_SURGERY_PATH,
  MTF_SURGERY_TRUST_ROWS,
  MTF_SURGERY_TYPES,
  type MtfSurgeryType,
} from "@/data/male-to-female-surgery-in-delhi";
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
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" priority={priority} />
      </div>
      {caption && (
        <figcaption className="border-t border-surface px-4 py-2 text-center text-xs text-navy/70">{caption}</figcaption>
      )}
    </figure>
  );
}

function CtaRow({ phone, label }: { phone: string; label?: string }) {
  const tel = phone.replace(/\s/g, "");
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button href="/book-consultation" variant="primary">{label ?? "Book Confidential Consultation"}</Button>
      <a href={`tel:${tel}`} className="inline-flex min-h-11 items-center rounded-button border border-navy/20 px-6 py-3 text-sm font-semibold text-navy">
        Call {phone}
      </a>
    </div>
  );
}

function SurgeryTypeCard({ item }: { item: MtfSurgeryType }) {
  return (
    <article className="rounded-xl border border-surface bg-white p-5">
      <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
      <p className="mt-2 text-sm text-navy/85">{item.body}</p>
      {item.href && item.linkLabel && (
        <Link href={item.href} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
          {item.linkLabel} →
        </Link>
      )}
    </article>
  );
}

export function MaleToFemaleSurgeryTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = MTF_SURGERY_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? MTF_SURGERY_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'd like a confidential consultation about male to female surgery in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MTF_SURGERY_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${MTF_SURGERY_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Male to Female Surgery", path: MTF_SURGERY_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: page.parentLabel, href: page.parentPath },
                { label: "Male to Female Surgery" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[32px] md:text-[36px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={MTF_SURGERY_IMAGES.hero.src} alt={MTF_SURGERY_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">Book Confidential Consultation</Button>
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white">WhatsApp</a>
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
          <section className="pb-12 pt-10 md:pb-16 md:pt-12">
            <div className="space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm font-medium text-navy/85">{page.introCta}</p>
            <CtaRow phone={displayPhone} label="Book Your Appointment Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.understandingHeading}</SectionTitle>
            <div className="mt-6"><SectionImage src={MTF_SURGERY_IMAGES.understanding.src} alt={MTF_SURGERY_IMAGES.understanding.alt} aspect="wide" /></div>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.understandingParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyChooseIntro}</p>
            <div className="mt-6"><SectionImage src={MTF_SURGERY_IMAGES.whyChoose.src} alt={MTF_SURGERY_IMAGES.whyChoose.alt} aspect="wide" /></div>
            <div className="mt-8 space-y-5">
              {page.whyChooseItems.map((item) => (
                <article key={item.title} className="rounded-xl border border-surface bg-white p-5">
                  <h3 className="font-heading text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-navy/85">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.typesIntro}</p>
            <div className="mt-6"><SectionImage src={MTF_SURGERY_IMAGES.types.src} alt={MTF_SURGERY_IMAGES.types.alt} /></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {MTF_SURGERY_TYPES.map((item) => (
                <SurgeryTypeCard key={item.title} item={item} />
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/80">{page.typesClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.costTableHeading}</h3>
            <DataTable
              headers={["Procedure Type", "Approximate Cost (₹)", "Notes"]}
              keys={["procedure", "cost", "notes"]}
              rows={[...MTF_SURGERY_COST_ROWS]}
            />
            <p className="mt-4 text-sm text-navy/80">{page.costNote}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.costGuidanceHeading}</h3>
            <p className="mt-2 text-sm text-navy/85">{page.costGuidance}</p>
            <p className="mt-4 text-sm text-navy/80">{page.costClosing}</p>
            <p className="mt-2 text-sm font-medium text-navy/85">{page.costCta}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.journeyHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.journeyIntro}</p>
            <div className="mt-6"><SectionImage src={MTF_SURGERY_IMAGES.journey.src} alt={MTF_SURGERY_IMAGES.journey.alt} aspect="wide" /></div>
            <h3 className="mt-8 font-heading text-base font-bold text-navy">Step-by-Step Journey</h3>
            <ol className="mt-6 space-y-4">
              {MTF_SURGERY_JOURNEY.map((step, i) => (
                <li key={step.title} className="rounded-xl border border-surface bg-white p-5">
                  <p className="font-heading font-bold text-navy">
                    {i + 1}. {step.title}
                  </p>
                  <p className="mt-2 text-sm text-navy/85">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm font-medium text-navy/85">{page.journeyRecoveryNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.safetyHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.safetyIntro}</p>
            <div className="mt-6"><SectionImage src={MTF_SURGERY_IMAGES.safety.src} alt={MTF_SURGERY_IMAGES.safety.alt} aspect="wide" /></div>
            <CheckList items={page.safetyMeasures} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.safetyClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.eligibilityHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.eligibilityIntro}</p>
            <div className="mt-6"><SectionImage src={MTF_SURGERY_IMAGES.eligibility.src} alt={MTF_SURGERY_IMAGES.eligibility.alt} aspect="square" /></div>
            <p className="mt-4 text-sm text-navy/85">{page.eligibilityAge}</p>
            <CheckList items={page.eligibilityCandidates} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.eligibilityClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.doctorHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={MTF_SURGERY_IMAGES.doctor.src} alt={MTF_SURGERY_IMAGES.doctor.alt} aspect="square" />
              <div>
                <p className="text-base text-navy/85">{page.doctorBio}</p>
                <h3 className="mt-4 font-heading text-sm font-bold text-navy">Qualifications &amp; Credentials</h3>
                <CheckList items={page.doctorQualifications} variant="do" />
                <p className="mt-4 text-sm text-navy/80">{page.doctorClosing}</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full profile of Dr. Sandeep Bhasin →
                </Link>
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videoHeading}</SectionTitle>
            <p className="mt-2 text-sm font-semibold text-navy">{page.videoTitle}</p>
            <p className="mt-3 text-sm text-navy/85">{page.videoBody}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={MTF_SURGERY_IMAGES.videoPoster.src} alt={MTF_SURGERY_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.trustHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.trustIntro}</p>
            <DataTable
              headers={["Aspect", "Care Well Medical Centre, Delhi", "Typical Clinics"]}
              keys={["aspect", "carewell", "typical"]}
              rows={[...MTF_SURGERY_TRUST_ROWS]}
            />
            <p className="mt-4 text-sm italic text-navy/80">{page.trustQuote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {MTF_SURGERY_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Google Reviews</SectionTitle>
            <div className="mt-6"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.locationHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.locationIntro}</p>
            <div className="mt-4 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{MTF_SURGERY_CLINIC.name}</p>
              <p>{page.locationAddress}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">{displayPhone}</a>
              </p>
              <p>
                <a href={`mailto:${page.locationEmail}`} className="text-primary underline">{page.locationEmail}</a>
              </p>
              <p className="text-sm text-navy/80">Clinic hours: {page.locationHours}</p>
            </div>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
            <p className="mt-4 text-sm text-navy/80">
              Back to{" "}
              <Link href={page.parentPath} className="font-semibold text-primary hover:underline">
                Plastic Surgery in Delhi
              </Link>
              {" · "}
              <Link href="/intimate-surgery-in-delhi" className="font-semibold text-primary hover:underline">
                Intimate Surgery
              </Link>
              .
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8"><ServiceFaq items={MTF_SURGERY_FAQS} /></div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.consultationBody}</p>
              <CtaRow phone={displayPhone} label="Book Your Appointment Now" />
              {wa && (
                <p className="mt-4 text-sm text-navy/85">
                  Or{" "}
                  <a href={wa} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                    speak with Dr. Bhasin&apos;s team on WhatsApp
                  </a>
                  .
                </p>
              )}
              <p className="mt-3 text-sm text-navy/80">{page.consultationClosing}</p>
            </div>
          </section>

          <section className="pb-8">
            <p className="text-sm leading-relaxed text-navy/70">
              <strong>Disclaimer.</strong> {page.disclaimer}
            </p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="mtf-surgery-sidebar" />
              </Suspense>
              <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white">Call clinic</a>
              {wa && (
                <a href={wa} className="block w-full rounded-xl border-2 border-teal py-3 text-center text-sm font-semibold text-teal">WhatsApp</a>
              )}
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 lg:hidden">
        <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="flex flex-1 justify-center rounded-xl bg-navy py-3 text-[13px] font-semibold text-white">Call</a>
        <Link href="/book-consultation" className="flex flex-1 justify-center rounded-xl bg-primary py-3 text-[13px] font-semibold text-white">Book Now</Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
