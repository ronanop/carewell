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
  LIP_ANATOMY_AREAS,
  LIP_AUGMENTATION_CLINIC,
  LIP_AUGMENTATION_COST_ROWS,
  LIP_AUGMENTATION_FAQS,
  LIP_AUGMENTATION_IMAGES,
  LIP_AUGMENTATION_PAGE,
  LIP_AUGMENTATION_PATH,
  LIP_COMPARISON_ROWS,
  LIP_ENHANCEMENT_OPTIONS,
  LIP_FILLER_TYPES,
  type LipEnhancementOption,
} from "@/data/lip-augmentation-treatment-in-delhi";
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

function OptionCard({ item }: { item: LipEnhancementOption }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <SectionImage src={item.image} alt={item.imageAlt} aspect="wide" />
      <div className="p-5 md:p-6">
        <h3 className="font-heading text-xl font-bold text-navy md:text-2xl">{item.title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-navy/85">
          {item.bullets.map((b) => (
            <li key={b.slice(0, 40)} className="flex gap-2">
              <span className="text-teal" aria-hidden>✓</span>
              {b}
            </li>
          ))}
        </ul>
        {item.idealFor && item.idealFor.length > 0 && (
          <>
            <p className="mt-4 text-sm font-semibold text-navy">Ideal for those who:</p>
            <CheckList items={item.idealFor} variant="do" />
          </>
        )}
        {item.note && <p className="mt-3 text-sm font-medium text-teal">{item.note}</p>}
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

export function LipAugmentationTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = LIP_AUGMENTATION_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? LIP_AUGMENTATION_CLINIC.phone;
  const wa = whatsapp ? whatsappHref(whatsapp, "Hi, I'm interested in lip augmentation in Delhi.") : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LIP_AUGMENTATION_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${LIP_AUGMENTATION_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Lip Augmentation", path: LIP_AUGMENTATION_PATH },
        ]}
      />

      <section className="relative min-h-[52svh] overflow-hidden bg-navy md:min-h-[58vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/service-hero-theatre-bg.png)" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
        <div className="relative mx-auto grid min-h-[52svh] max-w-7xl items-center gap-8 px-4 py-12 md:min-h-[58vh] md:grid-cols-[1fr_312px] md:px-6 md:py-16">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.parentLabel, href: page.parentPath }, { label: "Lip Augmentation" }]} />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[28px] font-bold leading-[1.12] text-white sm:text-[36px] md:text-[40px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6">
              <Image src={LIP_AUGMENTATION_IMAGES.hero.src} alt={LIP_AUGMENTATION_IMAGES.hero.alt} width={170} height={170} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
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
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-6"><SectionImage src={LIP_AUGMENTATION_IMAGES.whatIs.src} alt={LIP_AUGMENTATION_IMAGES.whatIs.alt} /></div>
            <div className="mt-6 space-y-4 text-base text-navy/85">
              {page.whatIsParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 font-heading text-lg font-bold text-navy">Key Lip Anatomy We Consider</h3>
            <ul className="mt-4 space-y-3">
              {LIP_ANATOMY_AREAS.map((area) => (
                <li key={area.title} className="rounded-xl border border-surface bg-white p-4">
                  <p className="font-semibold text-navy">{area.title}</p>
                  <p className="mt-1 text-sm text-navy/85">{area.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <div className="mt-4 space-y-4 text-base text-navy/85">
              {page.whyChooseParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <div className="mt-6"><SectionImage src={LIP_AUGMENTATION_IMAGES.benefits.src} alt={LIP_AUGMENTATION_IMAGES.benefits.alt} /></div>
            <p className="mt-4 text-base text-navy/85">{page.benefitsIntro}</p>
            <CheckList items={page.benefits} variant="do" />
            <p className="mt-4 text-base text-navy/85">{page.benefitsClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.optionsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.optionsIntro}</p>
            <div className="mt-8 space-y-8">
              {LIP_ENHANCEMENT_OPTIONS.map((item) => (
                <OptionCard key={item.title} item={item} />
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.fillerTypesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.fillerTypesIntro}</p>
            <div className="mt-6"><SectionImage src={LIP_AUGMENTATION_IMAGES.fillerTypes.src} alt={LIP_AUGMENTATION_IMAGES.fillerTypes.alt} /></div>
            <div className="mt-8 space-y-6">
              {LIP_FILLER_TYPES.map((type, i) => (
                <div key={type.title} className="rounded-xl border border-surface bg-white p-5">
                  <h3 className="font-heading text-base font-bold text-navy">
                    {i + 1}. {type.title}
                  </h3>
                  <CheckList items={type.bullets} variant="do" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/80">{page.fillerTypesClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.rightOptionHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.rightOptionIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Temporary vs Permanent Results</h3>
            <DataTable
              headers={["Feature", "Temporary Fillers (HA)", "Fat Grafting / Lip Implants"]}
              keys={["feature", "temporary", "permanent"]}
              rows={[...LIP_COMPARISON_ROWS]}
            />
            <h3 className="mt-8 font-heading text-base font-bold text-navy">First-Time vs Return Patients</h3>
            <p className="mt-3 text-base text-navy/85">{page.firstTimeNote}</p>
            <p className="mt-3 text-base text-navy/85">{page.returnNote}</p>
            <p className="mt-4 text-sm font-medium text-navy">{page.rightOptionClosing}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.procedureHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.procedureIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.nonSurgicalStepsHeading}</h3>
            <p className="mt-2 text-sm text-navy/80">{page.nonSurgicalStepsIntro}</p>
            <ol className="mt-4 space-y-3">
              {page.nonSurgicalSteps.map((step, i) => (
                <li key={step.slice(0, 32)} className="flex gap-3 text-base text-navy/85">
                  <span className="font-bold text-teal">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <h3 className="mt-8 font-heading text-base font-bold text-navy">{page.surgicalStepsHeading}</h3>
            <p className="mt-2 text-sm text-navy/80">{page.surgicalStepsIntro}</p>
            <CheckList items={page.surgicalSteps} variant="do" />
            <h3 className="mt-8 font-heading text-base font-bold text-navy">{page.comfortHeading}</h3>
            <CheckList items={page.comfortPoints} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.comfortClosing}</p>
            <CtaRow phone={displayPhone} label="Book a consultation with Dr. Sandeep Bhasin" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.recoveryHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.recoveryIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">After Treatment</h3>
            <CheckList items={page.afterTreatment} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">For a Smooth Recovery</h3>
            <CheckList items={page.aftercareTips} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.recoveryClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <DataTable
              headers={["Treatment Type", "Estimated Cost (INR)"]}
              keys={["treatment", "range"]}
              rows={[...LIP_AUGMENTATION_COST_ROWS]}
            />
            <p className="mt-4 text-sm text-navy/80">{page.costNote}</p>
            <p className="mt-2 text-sm text-navy/80">{page.costHelp}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.permanentHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.permanentIntro}</p>
            <CheckList items={page.permanentRisks} variant="dont" />
            <p className="mt-4 text-base text-navy/85">{page.permanentClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.injectionsVsFillersHeading}</SectionTitle>
            <div className="mt-4 space-y-4 text-base text-navy/85">
              {page.injectionsVsFillersParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyClinicIntro}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.doctorHeading}</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-[200px_1fr]">
              <SectionImage src={LIP_AUGMENTATION_IMAGES.doctor.src} alt={LIP_AUGMENTATION_IMAGES.doctor.alt} aspect="square" />
              <div>
                <p className="text-base leading-relaxed text-navy/85">{page.doctorBio}</p>
                <Link href="/about/dr-bhasin" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  View full doctor profile →
                </Link>
              </div>
            </div>
            <h3 className="mt-8 font-heading text-base font-bold text-navy">{page.personalizedHeading}</h3>
            <p className="mt-3 text-base text-navy/85">{page.personalizedBody}</p>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.fdaHeading}</h3>
            <p className="mt-3 text-base text-navy/85">{page.fdaBody}</p>
            <p className="mt-4 text-base text-navy/85">{page.clinicReputation}</p>
            <p className="mt-4 text-sm text-navy/80">
              Explore more{" "}
              <Link href="/cosmetic-treatments-in-delhi" className="font-semibold text-primary hover:underline">
                cosmetic treatments in Delhi
              </Link>
              {" "}— from skin rejuvenation to anti-aging solutions.
            </p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.beforeAfterHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.beforeAfterIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LIP_AUGMENTATION_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">What You Can Expect</h3>
            <CheckList items={page.beforeAfterExpect} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.beforeAfterClosing}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>What Our Patients Say</SectionTitle>
            <div className="mt-6"><HairTransplantReviews /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.directionsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.directionsIntro}</p>
            <div className="mt-6 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{LIP_AUGMENTATION_CLINIC.name}</p>
              <p>{LIP_AUGMENTATION_CLINIC.address}</p>
            </div>
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Nearby Landmarks</h3>
            <CheckList items={page.nearbyLandmarks} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Nearest Metro Stations</h3>
            <CheckList items={page.metroStations} variant="do" />
            <p className="mt-4 text-sm text-navy/85">{page.publicTransport}</p>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.consultationHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.consultationBody}</p>
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <div className="mt-8"><ServiceFaq items={LIP_AUGMENTATION_FAQS} /></div>
            <p className="mt-6 text-sm text-navy/80">
              Related:{" "}
              <Link href="/cosmetic-treatments-in-delhi/dermal-fillers" className="font-semibold text-primary hover:underline">Dermal Fillers</Link>
              {", "}
              <Link href="/cosmetic-treatments-in-delhi/botox" className="font-semibold text-primary hover:underline">Botox</Link>
              {", "}
              <Link href="/cosmetic-treatments-in-delhi/anti-aging" className="font-semibold text-primary hover:underline">Anti-Aging</Link>.
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
                <LeadForm defaultTreatment={treatment} source="lip-augmentation-sidebar" />
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
