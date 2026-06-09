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
  BODY_CONTOURING_CLINIC,
  BODY_CONTOURING_COST_ROWS,
  BODY_CONTOURING_FAQS,
  BODY_CONTOURING_IMAGES,
  BODY_CONTOURING_JOURNEY,
  BODY_CONTOURING_NON_SURGICAL,
  BODY_CONTOURING_PAGE,
  BODY_CONTOURING_PATH,
  BODY_CONTOURING_SURGICAL,
  type BodyContouringTreatment,
} from "@/data/body-contouring-in-delhi";
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
      <Button href="/book-consultation" variant="primary">{label ?? "Book Your Appointment Now"}</Button>
      <a href={`tel:${tel}`} className="inline-flex min-h-11 items-center rounded-button border border-navy/20 px-6 py-3 text-sm font-semibold text-navy">
        Call {phone}
      </a>
    </div>
  );
}

function TreatmentCard({ item }: { item: BodyContouringTreatment }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <SectionImage src={item.image} alt={item.imageAlt} aspect="wide" />
      <div className="p-5 md:p-6">
        <h3 className="font-heading text-xl font-bold text-navy md:text-2xl">{item.title}</h3>
        <p className="mt-3 text-base text-navy/85">{item.description}</p>
        <p className="mt-3 text-sm text-navy/85">
          <strong>Best for:</strong> {item.bestFor}
        </p>
        {item.href && item.linkLabel && (
          <Link href={item.href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            {item.linkLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export function BodyContouringPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = BODY_CONTOURING_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? BODY_CONTOURING_CLINIC.phone;
  const wa = whatsapp ? whatsappHref(whatsapp, "Hi, I'm interested in body contouring in Delhi.") : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BODY_CONTOURING_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${BODY_CONTOURING_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Body Contouring in Delhi", path: BODY_CONTOURING_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Body Contouring in Delhi" }]} />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[28px] font-bold leading-[1.12] text-white sm:text-[36px] md:text-[40px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={BODY_CONTOURING_IMAGES.hero.src} alt={BODY_CONTOURING_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-consultation" variant="secondary">Book Your Appointment Now</Button>
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
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">{page.introHeading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whatIsBody}</p>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">{page.benefitsHeading}</h3>
            <CheckList items={page.benefits} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <div className="mt-6"><SectionImage src={BODY_CONTOURING_IMAGES.whyChoose.src} alt={BODY_CONTOURING_IMAGES.whyChoose.alt} aspect="wide" /></div>
            <p className="mt-4 text-base text-navy/85">{page.whyChooseIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Surgical and Non-Surgical Options Available</h3>
            <p className="mt-2 text-sm font-semibold text-navy">{page.surgicalOptionsHeading}</p>
            <CheckList items={page.surgicalOptions} variant="do" />
            <p className="mt-4 text-sm font-semibold text-navy">{page.nonSurgicalOptionsHeading}</p>
            <CheckList items={page.nonSurgicalOptions} variant="do" />
            <p className="mt-4 text-sm text-navy/85">{page.optionsNote}</p>
            <p className="mt-2 text-sm text-navy/85">{page.pricingNote}</p>
            <p className="mt-4 text-sm text-navy/80">
              Explore surgical options on our{" "}
              <Link href="/plastic-surgery-in-delhi" className="font-semibold text-primary hover:underline">
                plastic surgery in Delhi
              </Link>{" "}
              hub, including{" "}
              <Link href="/plastic-surgery-in-delhi/gynecomastia" className="font-semibold text-primary hover:underline">
                gynecomastia surgery
              </Link>.
            </p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.typesIntro}</p>
            <h3 className="mt-8 font-heading text-xl font-bold text-navy">{page.nonSurgicalSectionHeading}</h3>
            <div className="mt-6 space-y-8">
              {BODY_CONTOURING_NON_SURGICAL.map((item) => (
                <TreatmentCard key={item.title} item={item} />
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-teal/25 bg-teal/5 p-6">
              <h3 className="font-heading text-lg font-bold text-navy">{page.coolshapeHeading}</h3>
              <p className="mt-3 text-base text-navy/85">{page.coolshapeBody}</p>
              <div className="mt-6"><SectionImage src={BODY_CONTOURING_IMAGES.coolshape.src} alt={BODY_CONTOURING_IMAGES.coolshape.alt} /></div>
            </div>
            <h3 className="mt-10 font-heading text-xl font-bold text-navy">{page.surgicalSectionHeading}</h3>
            <p className="mt-2 text-base text-navy/85">{page.surgicalSectionIntro}</p>
            <div className="mt-6 space-y-8">
              {BODY_CONTOURING_SURGICAL.map((item) => (
                <TreatmentCard key={item.title} item={item} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.journeyHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.journeyIntro}</p>
            <div className="mt-6"><SectionImage src={BODY_CONTOURING_IMAGES.journey.src} alt={BODY_CONTOURING_IMAGES.journey.alt} aspect="wide" /></div>
            <ol className="mt-8 space-y-5">
              {BODY_CONTOURING_JOURNEY.map((step) => (
                <li key={step.title} className="rounded-xl border border-surface bg-white p-5">
                  <p className="font-heading font-bold text-navy">{step.step}</p>
                  <p className="mt-2 text-sm text-navy/85">{step.body}</p>
                </li>
              ))}
            </ol>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.safetyHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.safetyIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.preTreatmentHeading}</h3>
            <CheckList items={page.preTreatment} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.nonSurgicalSideEffectsHeading}</h3>
            <CheckList items={page.nonSurgicalSideEffects} variant="dont" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.surgicalSideEffectsHeading}</h3>
            <CheckList items={page.surgicalSideEffects} variant="dont" />
            <p className="mt-4 text-sm text-navy/80">{page.sideEffectsNote}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.postCareHeading}</h3>
            <CheckList items={page.postCare} variant="do" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <DataTable
              headers={["Treatment Type", "Estimated Cost (INR)"]}
              keys={["treatment", "range"]}
              rows={[...BODY_CONTOURING_COST_ROWS]}
            />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.costFactorsHeading}</h3>
            <CheckList items={page.costFactors} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.costClosing}</p>
            <CtaRow phone={displayPhone} label="Get My Quote" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.doctorHeading}</SectionTitle>
            <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={BODY_CONTOURING_IMAGES.doctor.src} alt={BODY_CONTOURING_IMAGES.doctor.alt} aspect="square" />
              <div>
                <p className="text-base leading-relaxed text-navy/85">{page.doctorBio}</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full doctor profile →
                </Link>
              </div>
            </div>
            <h3 className="mt-8 font-heading text-base font-bold text-navy">Qualifications & Training</h3>
            <CheckList items={page.qualifications} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Certifications & Affiliations</h3>
            <CheckList items={page.certifications} variant="do" />
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <CheckList items={page.candidateItems} variant="do" />
            <h3 className="mt-8 font-heading text-base font-bold text-navy">{page.avoidHeading}</h3>
            <p className="mt-2 text-sm text-navy/85">{page.avoidIntro}</p>
            <CheckList items={page.avoidItems} variant="dont" />
            <p className="mt-4 text-sm font-medium text-navy/85">{page.avoidNote}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.beforeAfterHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.beforeAfterIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BODY_CONTOURING_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <CtaRow phone={displayPhone} label="Book Your Consultation Today" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say About Their Body Contouring Experience</SectionTitle>
            <p className="mt-2 text-sm text-navy/70">Verified Google Reviews · Rated 4.2+ by real patients</p>
            <div className="mt-6"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Watch: How Body Contouring Works at Care Well Medical Centre</SectionTitle>
            <p className="mt-4 text-sm text-navy/85">
              See how our surgical and non-surgical treatments help patients achieve a sculpted, toned body.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={BODY_CONTOURING_IMAGES.videoPoster.src} alt={BODY_CONTOURING_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
            </div>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.readyHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.readyIntro}</p>
              <div className="mt-6 space-y-2 text-sm text-navy/85">
                <p className="font-semibold text-navy">{BODY_CONTOURING_CLINIC.name}</p>
                <p>{BODY_CONTOURING_CLINIC.address}</p>
                <p>
                  <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">{displayPhone}</a>
                </p>
                <p>
                  <Link href="/contact" className="text-primary underline">Book online at our contact page</Link>
                </p>
              </div>
              <CheckList items={page.readyPerks} variant="do" />
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Visit Care Well Medical Centre – South Delhi</SectionTitle>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8"><ServiceFaq items={BODY_CONTOURING_FAQS} /></div>
            <p className="mt-6 text-sm text-navy/80">
              Related:{" "}
              <Link href="/plastic-surgery-in-delhi" className="font-semibold text-primary hover:underline">Plastic Surgery</Link>
              {", "}
              <Link href={`${BODY_CONTOURING_PATH}/cryolipolysis`} className="font-semibold text-primary hover:underline">Cryolipolysis</Link>
              {", "}
              <Link href="/cosmetic-treatments-in-delhi" className="font-semibold text-primary hover:underline">Cosmetic Treatments</Link>.
            </p>
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
                <LeadForm defaultTreatment={treatment} source="body-contouring-sidebar" />
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
