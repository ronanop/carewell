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
  BREAST_AUGMENTATION_CLINIC,
  BREAST_AUGMENTATION_COMPARE_ROWS,
  BREAST_AUGMENTATION_COST_ROWS,
  BREAST_AUGMENTATION_FAQS,
  BREAST_AUGMENTATION_IMAGES,
  BREAST_AUGMENTATION_PAGE,
  BREAST_AUGMENTATION_PATH,
  BREAST_AUGMENTATION_PROCEDURE_TYPES,
  type BreastAugProcedureType,
} from "@/data/breast-augmentation-in-delhi";
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

function ProcedureTypeCard({ item }: { item: BreastAugProcedureType }) {
  return (
    <article className="rounded-xl border border-surface bg-white p-5">
      <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
      <p className="mt-2 text-sm text-navy/85">{item.body}</p>
      <CheckList items={item.bullets} variant="do" />
    </article>
  );
}

export function BreastAugmentationTreatmentPageSections({
  phone,
  whatsapp,
  mapEmbedUrl,
}: {
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string | null;
}) {
  const page = BREAST_AUGMENTATION_PAGE;
  const treatment = page.treatmentDropdownLabel;
  const displayPhone = phone ?? BREAST_AUGMENTATION_CLINIC.phone;
  const wa = whatsapp
    ? whatsappHref(whatsapp, "Hi, I'm interested in breast augmentation in Delhi.")
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BREAST_AUGMENTATION_FAQS.map((f) => ({
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
    url: `${getSiteUrl()}${BREAST_AUGMENTATION_PATH}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: page.parentLabel, path: page.parentPath },
          { name: "Breast Augmentation", path: BREAST_AUGMENTATION_PATH },
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
                { label: "Breast Augmentation" },
              ]}
            />
            <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/75">{page.subtitle}</p>
            <h1 className="font-heading mt-2 text-[26px] font-bold leading-[1.12] text-white sm:text-[32px] md:text-[36px]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-base text-white/90">{page.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Image src={BREAST_AUGMENTATION_IMAGES.hero.src} alt={BREAST_AUGMENTATION_IMAGES.hero.alt} width={140} height={140} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
              <Image src={BREAST_AUGMENTATION_IMAGES.heroSecondary.src} alt={BREAST_AUGMENTATION_IMAGES.heroSecondary.alt} width={140} height={140} className="rounded-2xl border-2 border-white/20 object-cover shadow-lg" priority />
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
            <div className="space-y-4 text-base leading-relaxed text-navy/85">
              {page.introParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/85">
              {page.relatedProceduresIntro}{" "}
              <Link href={page.breastLiftHref} className="font-semibold text-primary hover:underline">Breast Lift Surgery</Link>
              {page.relatedProceduresMid}{" "}
              <Link href={page.breastReductionHref} className="font-semibold text-primary hover:underline">Breast Reduction Surgery</Link>.
            </p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyChooseHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyChooseIntro}</p>
            <CheckList items={page.whyChooseBenefits} variant="do" />
            <p className="mt-4 text-sm text-navy/80">
              Care Well Medical Centre&apos;s{" "}
              <Link href={page.breastLiftHref} className="font-semibold text-primary hover:underline">Breast Lift Surgery</Link>
              {" and "}
              <Link href={page.breastReductionHref} className="font-semibold text-primary hover:underline">Breast Reduction Surgery</Link>
              {" are ideal for women with sagging or overly large breasts. These complementary procedures help women feel wonderful with an improved body shape."}
            </p>
            <p className="mt-2 text-sm text-navy/80">{page.whyChooseClosing}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whatIsHeading}</SectionTitle>
            <div className="mt-4 space-y-4 text-base text-navy/85">
              {page.whatIsParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.howWorksHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.howWorksIntro}</p>
            <div className="mt-6 space-y-6">
              <article className="rounded-xl border border-surface bg-white p-5">
                <h3 className="font-heading text-lg font-bold text-navy">{page.implantTechnique.title}</h3>
                <p className="mt-2 text-sm text-navy/85"><strong>Benefits:</strong> {page.implantTechnique.benefits}</p>
                <p className="mt-1 text-sm text-navy/85"><strong>Best For:</strong> {page.implantTechnique.bestFor}</p>
                <p className="mt-1 text-sm text-navy/85"><strong>Recovery:</strong> {page.implantTechnique.recovery}</p>
                <p className="mt-2 text-sm text-navy/80">{page.implantTechnique.note}</p>
              </article>
              <article className="rounded-xl border border-surface bg-white p-5">
                <h3 className="font-heading text-lg font-bold text-navy">{page.fatTransferTechnique.title}</h3>
                <p className="mt-2 text-sm text-navy/85"><strong>Benefits:</strong> {page.fatTransferTechnique.benefits}</p>
                <p className="mt-1 text-sm text-navy/85"><strong>Best For:</strong> {page.fatTransferTechnique.bestFor}</p>
                <p className="mt-1 text-sm text-navy/85"><strong>Recovery:</strong> {page.fatTransferTechnique.recovery}</p>
              </article>
            </div>
            <h3 className="mt-8 font-heading text-base font-bold text-navy">{page.compareHeading}</h3>
            <DataTable
              headers={["Feature", "Breast Implants", "Fat Transfer"]}
              keys={["feature", "implants", "fatTransfer"]}
              rows={[...BREAST_AUGMENTATION_COMPARE_ROWS]}
            />
            <p className="mt-4 text-sm text-navy/85">{page.reconstructionNote}</p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.whyClinicHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.whyClinicIntro}</p>
            <p className="mt-3 text-sm text-navy/85">{page.dualPlaneIntro}</p>
            <CheckList items={page.dualPlaneBenefits} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.whyClinicClosing}</p>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.typesHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.typesIntro}</p>
            <div className="mt-8 space-y-4">
              {BREAST_AUGMENTATION_PROCEDURE_TYPES.map((item) => (
                <ProcedureTypeCard key={item.title} item={item} />
              ))}
            </div>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.benefitsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.benefitsIntro}</p>
            <CheckList items={page.benefitsItems} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.benefitsClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.candidateHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.candidateIntro}</p>
            <CheckList items={page.candidateItems} variant="do" />
            <p className="mt-4 text-sm text-navy/80">{page.candidateClosing}</p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.processHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.processIntro}</p>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{page.consultationStep.title}</h3>
                <p className="mt-2 text-sm text-navy/85">{page.consultationStep.intro}</p>
                <CheckList items={page.consultationStep.bullets} variant="do" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{page.surgeryStep.title}</h3>
                <CheckList items={page.surgeryStep.bullets} variant="do" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">{page.recoveryStep.title}</h3>
                <CheckList items={page.recoveryStep.timeline} variant="do" />
                <p className="mt-3 text-sm text-navy/80">{page.recoveryStep.closing}</p>
              </div>
            </div>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.costHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.costIntro}</p>
            <p className="mt-3 text-sm font-semibold text-navy">Package includes:</p>
            <CheckList items={page.costPackageIncludes} variant="do" />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">{page.costTableHeading}</h3>
            <DataTable headers={["Procedure Type", "Estimated Cost (INR)"]} keys={["procedure", "cost"]} rows={[...BREAST_AUGMENTATION_COST_ROWS]} />
            <h3 className="mt-6 font-heading text-base font-bold text-navy">Common Questions About Breast Augmentation Cost</h3>
            <div className="mt-4 space-y-4">
              {page.costQuestions.map((q) => (
                <div key={q.question}>
                  <p className="text-sm font-semibold text-navy">{q.question}</p>
                  <p className="mt-1 text-sm text-navy/85">{q.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-navy/85">
              {page.costFinancingNote}{" "}
              <Link href="/book-consultation" className="font-semibold text-primary hover:underline">Contact us here</Link>.
            </p>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.recoveryHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.recoveryIntro}</p>
            <CheckList items={page.recoveryPrecautions} variant="do" />
            <p className="mt-4 text-sm font-medium italic text-navy/80">{page.recoveryTip}</p>
            <p className="mt-3 text-sm text-navy/80">{page.recoveryTeamNote}</p>
            <div className="mt-6"><SectionImage src={BREAST_AUGMENTATION_IMAGES.recovery.src} alt={BREAST_AUGMENTATION_IMAGES.recovery.alt} /></div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.resultsHeading}</SectionTitle>
            <p className="mt-4 text-base text-navy/85">{page.resultsIntro}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BREAST_AUGMENTATION_IMAGES.beforeAfter.map((img) => (
                <SectionImage key={img.caption} src={img.src} alt={img.alt} caption={img.caption} />
              ))}
            </div>
            <CtaRow phone={displayPhone} />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.trustHeading}</SectionTitle>
            <CheckList items={page.trustItems} variant="do" />
            <div className="mt-8"><HairTransplantReviews /></div>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-primary/5 p-6 md:p-8">
              <SectionTitle>{page.ctaHeading}</SectionTitle>
              <p className="mt-4 text-base text-navy/85">{page.ctaBody}</p>
              <CtaRow phone={displayPhone} />
            </div>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.videoHeading}</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-surface">
              <div className="relative aspect-video">
                <Image src={BREAST_AUGMENTATION_IMAGES.videoPoster.src} alt={BREAST_AUGMENTATION_IMAGES.videoPoster.alt} fill className="object-cover" sizes="720px" />
              </div>
            </div>
            <CtaRow phone={displayPhone} label="Call Now" />
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>Visit Care Well Medical Centre – CR Park, Delhi</SectionTitle>
            <div className="mt-4 space-y-2 text-base text-navy/85">
              <p className="font-semibold text-navy">{BREAST_AUGMENTATION_CLINIC.name}</p>
              <p>{BREAST_AUGMENTATION_CLINIC.address}</p>
              <p>
                <a href={`tel:${displayPhone.replace(/\s/g, "")}`} className="text-primary underline">{displayPhone}</a>
              </p>
            </div>
            <div className="mt-6"><MapEmbed embedSrc={mapEmbedUrl} title="Care Well Medical Centre on Google Maps" /></div>
            <p className="mt-4 text-sm text-navy/80">
              Back to{" "}
              <Link href={page.parentPath} className="font-semibold text-primary hover:underline">
                Plastic Surgery in Delhi
              </Link>.
            </p>
          </section>

          <section className="section-y border-t border-surface">
            <SectionTitle>{page.faqHeading}</SectionTitle>
            <p className="mt-4 text-sm text-navy/85">{page.faqIntro}</p>
            <div className="mt-8"><ServiceFaq items={BREAST_AUGMENTATION_FAQS} /></div>
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
                <LeadForm defaultTreatment={treatment} source="breast-augmentation-sidebar" />
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
