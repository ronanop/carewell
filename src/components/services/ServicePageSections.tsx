import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortableBody } from "@/components/content/PortableBody";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceHeroBookingForm } from "@/components/leads/ServiceHeroBookingForm";
import { HowItWorksStepsAnimated } from "@/components/services/HowItWorksStepsAnimated";
import { ServiceSidebarReveal } from "@/components/services/ServiceSidebarReveal";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { TreatmentFinderQuiz } from "@/components/leads/TreatmentFinderQuiz";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import type { ServiceDoc } from "@/types/service";
import { whatsappHref } from "@/lib/whatsapp";
import { getSiteUrl } from "@/lib/site";

const BeforeAfterSliders = dynamic(
  () => import("@/components/services/BeforeAfterSliders").then((m) => m.BeforeAfterSliders),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-xl bg-surface" /> },
);

const LiteVideo = dynamic(
  () => import("@/components/services/LiteVideo").then((m) => m.LiteVideo),
  { ssr: false, loading: () => <div className="aspect-video animate-pulse rounded-xl bg-surface" /> },
);

const EMICalculator = dynamic(
  () => import("@/components/widgets/EMICalculator").then((m) => m.EMICalculator),
  { ssr: false, loading: () => <div className="h-32 animate-pulse rounded-xl bg-surface" /> },
);

const HairTransplantTechniques = dynamic(
  () =>
    import("@/components/services/HairTransplantTechniques").then(
      (m) => m.HairTransplantTechniques,
    ),
  { ssr: false, loading: () => <div className="h-40 animate-pulse rounded-2xl bg-surface" /> },
);

const HAIR_TRANSPLANT_CANDIDACY = {
  title: "Is Hair Transplant Right for You?",
  intro:
    "We recommend a hair transplant when medicines and non-surgical treatments no longer improve visible hair loss and bald areas continue to progress.",
  bullets: [
    "Suitable for Grade 2–6 baldness",
    "Permanent hair restoration",
    "Customised natural hairline design",
    "Surgery performed personally by the doctor, not technicians",
  ],
};

/** Overview embed under the hero for English + Hindi hair transplant service pages. */
const HAIR_TRANSPLANT_OVERVIEW_YOUTUBE_ID = "J2tW5o82WK0";

/** Static before/after composite when no individual Sanity cases yet (consent on file for this asset). */
const HAIR_TRANSPLANT_BEFORE_AFTER_FALLBACK = {
  src: "/images/hair-transplant-before-after-promo.jpg",
  alt: "Hair transplant before and after — side profile and front view, Care Well Medical Centre",
  width: 1024,
  height: 537,
  belowCaptionParagraphs: [
    "Struggling with hair baldness due to heredity, illness, or any other reasons? Seeking the best-in-class hair transplant experience to overcome this issue? Welcome to Care Well Medical Centre, where treatment meets precision. Under the supervision of Dr. Sandeep Bhasin, a surgeon with around two decades of excellent healthcare track record, the clinic has become the go-to option for hair transplant in Delhi.",
    "You find a well-rounded medical team that is professional yet empathetic. Finding the root cause and implementing the custom and cost-effective solution with a 99% success rate make patients trust Care Well Medical Centre for this treatment.",
    "Dr. Sandeep Bhasin personally plans and supervises every procedure to ensure safe, natural outcomes.",
  ],
} as const;

export function ServicePageSections({
  doc,
  whatsapp,
  phone,
}: {
  doc: ServiceDoc;
  whatsapp?: string;
  phone?: string;
}) {
  const slug = doc.slug?.current ?? "service";
  const overviewYoutubeId =
    slug === "hair-transplant" || slug === "hair-transplant-hi"
      ? HAIR_TRANSPLANT_OVERVIEW_YOUTUBE_ID
      : doc.youtubeVideoId;
  const whatIsIllustrationSrc = doc.whatIsIllustrationUrl ?? null;
  const whatIsIllustrationAlt = whatIsIllustrationSrc ? `Illustration supporting ${doc.title}` : "";
  const treatment = doc.treatmentDropdownLabel ?? doc.title;
  const wa = whatsapp
    ? whatsappHref(whatsapp, `Hi, I'm interested in ${doc.title} (${slug}).`)
    : undefined;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (doc.faq ?? []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: doc.title,
    description: doc.seo?.description,
    url: `${getSiteUrl()}/services/${slug}`,
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/treatments/hair" },
          { name: doc.title, path: `/services/${slug}` },
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
        <div className="absolute inset-0 bg-black/5" aria-hidden />
        <div className="relative mx-auto grid min-h-[58svh] max-w-7xl items-center gap-8 px-4 py-12 sm:py-14 md:min-h-[65vh] md:grid-cols-[1fr_312px] md:items-start md:gap-10 md:px-6 md:py-20 lg:py-24">
          <div className="min-w-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/treatments/hair" },
                { label: doc.title },
              ]}
            />
            <h1 className="font-heading mt-5 text-[34px] font-bold leading-[1.1] text-white sm:text-[42px] md:mt-6 md:text-5xl">
              {doc.title} in Delhi
            </h1>
            {doc.tagline && (
              <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
                {doc.tagline}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 md:mt-8">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)] transition-transform duration-150 ease-out hover:scale-[1.01] hover:bg-[#1FB959] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] motion-reduce:transform-none"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  </svg>
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

      {overviewYoutubeId && (
        <section className="border-b border-surface bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
            {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
              <h2 className="font-heading mx-auto max-w-3xl text-center text-2xl font-bold leading-tight text-navy md:text-3xl">
                Best Hair Transplant in Delhi – Cost, Before & After Results by Expert Surgeons & Clinic
              </h2>
            ) : (
              <p className="font-heading text-center text-lg font-semibold text-navy md:text-xl">
                Watch: {doc.title}
              </p>
            )}
            <div className="mx-auto mt-6 max-w-4xl">
              <LiteVideo id={overviewYoutubeId} title={`${doc.title} — overview video`} />
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-32 md:px-6 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:pb-24">
        <article className="max-w-3xl lg:max-w-none">
          <section className="pb-12 pt-10 md:pb-16 md:pt-12">
            <div
              className={clsx(
                "grid gap-10",
                whatIsIllustrationSrc ? "lg:grid-cols-2 lg:items-start" : "lg:grid-cols-1",
              )}
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-navy">What is {doc.title.toLowerCase()}?</h2>
                <div className="mt-6">
                  <PortableBody value={doc.whatIsBody} />
                </div>
                {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
                  <div className="mt-8 rounded-xl border border-teal/30 bg-surface p-5 md:p-6">
                    <p className="font-heading text-lg font-bold text-navy md:text-xl">{HAIR_TRANSPLANT_CANDIDACY.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy/85 md:text-[15px]">{HAIR_TRANSPLANT_CANDIDACY.intro}</p>
                    <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm text-navy/85 md:text-[15px]">
                      {HAIR_TRANSPLANT_CANDIDACY.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  doc.insightPoints &&
                  doc.insightPoints.length > 0 && (
                    <div className="mt-8 rounded-xl border border-teal/30 bg-surface p-5">
                      <p className="text-sm font-semibold text-teal">Key insights</p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/85">
                        {doc.insightPoints.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
              {whatIsIllustrationSrc ? (
                <div className="relative aspect-square max-h-80 w-full overflow-hidden rounded-2xl bg-surface lg:justify-self-end">
                  <Image
                    src={whatIsIllustrationSrc}
                    alt={whatIsIllustrationAlt}
                    fill
                    className="object-contain object-center p-1"
                    sizes="(min-width: 1024px) 400px, 90vw"
                  />
                </div>
              ) : null}
            </div>
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold text-navy">How it works</h2>
            <HowItWorksStepsAnimated
              steps={doc.howItWorksSteps ?? []}
              belowStepsImageSrc={
                slug === "hair-transplant" || slug === "hair-transplant-hi"
                  ? "/images/hair-transplant-process-infographic.png"
                  : undefined
              }
              belowStepsImageAlt="Infographic: The 4-step hair transplant process — graft extraction, hairline design, graft implantation, and healing timeline"
              showStepsDetailAside={slug === "hair-transplant" || slug === "hair-transplant-hi"}
            />
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold text-navy">Before &amp; after</h2>
            <div className="mt-8">
              <BeforeAfterSliders
                cases={doc.beforeAfterCases ?? []}
                emptyFallback={
                  slug === "hair-transplant" || slug === "hair-transplant-hi"
                    ? HAIR_TRANSPLANT_BEFORE_AFTER_FALLBACK
                    : undefined
                }
              />
            </div>
            <div className="mt-8">
              <Button href="/gallery" variant="outline">
                Get Similar Results →
              </Button>
            </div>
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
              <>
                <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  When Doctors Recommend Hair Transplant
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">
                  We advise a hair transplant after proper medical evaluation when non-surgical
                  options no longer provide meaningful improvement.
                </p>

                <div className="mt-8 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                  <div className="relative aspect-square w-full bg-white sm:aspect-[5/4] md:aspect-[4/3] lg:aspect-[4/3]">
                    <Image
                      src="/images/hair-transplant-baldness-grades.png"
                      alt="Baldness grade progression chart — hair transplant is usually considered from Grade 2 onwards, with donor hair availability shown for suitable and not suitable candidates"
                      fill
                      sizes="(min-width: 1024px) 720px, (min-width: 640px) 90vw, 100vw"
                      className="object-contain p-3 sm:p-4 md:p-5"
                    />
                  </div>
                </div>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Grade 2–6 baldness with visible thinning or bald patches",
                    "Adequate donor hair available for transplantation",
                    "Realistic expectations regarding density and growth timeline",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-xl border border-teal/25 bg-teal/5 p-4 text-sm leading-relaxed text-navy/85"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className="mt-0.5 shrink-0 text-teal"
                        aria-hidden
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"
                    aria-hidden
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 12a9 9 0 11-9-9 9 9 0 019 9z" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed text-navy/85">
                    <span className="font-semibold text-navy">At Care Well Medical Centre,</span>{" "}
                    we recommend surgery only when it offers a clear and lasting benefit.
                  </p>
                </div>

                <div className="mt-10 sm:mt-12">
                  <HairTransplantTechniques />
                </div>

                <div className="mt-10 max-w-md sm:mt-12">
                  <p className="text-sm text-navy/80">Still unsure? Try the treatment finder quiz.</p>
                  <TreatmentFinderQuiz className="mt-4" />
                </div>
              </>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold text-navy">Am I a candidate?</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-teal/40 bg-teal/5 p-6">
                    <p className="font-heading font-bold text-teal">Often a good fit</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy/85">
                      {(doc.candidateGood ?? []).map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-alert/40 bg-alert/5 p-6">
                    <p className="font-heading font-bold text-alert">May not be ideal (yet)</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-navy/85">
                      {(doc.candidatePoor ?? []).map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 max-w-md">
                  <p className="text-sm text-navy/80">Still unsure? Try the treatment finder quiz.</p>
                  <TreatmentFinderQuiz className="mt-4" />
                </div>
              </>
            )}
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            {slug === "hair-transplant" || slug === "hair-transplant-hi" ? (
              <>
                <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  Hair Transplant Cost in Delhi
                </h2>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-teal">
                  Quick snapshot
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/10 via-white to-white p-4 shadow-sm sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-teal/80 sm:text-xs">
                      Per graft cost
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                      ₹25 – ₹50
                    </p>
                  </div>
                  <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-white to-white p-4 shadow-sm sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 sm:text-xs">
                      Typical total cost
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                      ₹40,000 – ₹2,00,000
                    </p>
                    <p className="mt-1 text-xs text-navy/60">approximate range</p>
                  </div>
                  <div className="rounded-2xl border border-alert/25 bg-gradient-to-br from-alert/10 via-white to-white p-4 shadow-sm sm:col-span-2 sm:p-5 lg:col-span-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-alert/80 sm:text-xs">
                      5000 grafts cost
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-navy sm:text-2xl md:text-3xl">
                      ₹1,25,000 – ₹2,00,000
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-surface bg-surface/60 p-5">
                  <p className="text-sm leading-relaxed text-navy/85">
                    <span className="font-semibold text-navy">Note:</span>{" "}
                    We confirm the final cost after a detailed scalp analysis
                    and graft estimation — we never quote fixed package prices online.
                  </p>
                </div>

                {doc.pricingFactors && doc.pricingFactors.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
                        aria-hidden
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M3 12h4l3 8 4-16 3 8h4" />
                        </svg>
                      </span>
                      <h3 className="font-heading text-base font-bold text-navy md:text-lg">
                        What affects your price
                      </h3>
                    </div>
                    <ul className="mt-4 grid gap-2.5 text-sm text-navy/85 sm:grid-cols-2">
                      {doc.pricingFactors.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {doc.pricingEmiNote && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-teal/20 bg-teal/5 p-4">
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal"
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="6" width="20" height="13" rx="2" />
                        <path d="M2 11h20" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-navy/85">{doc.pricingEmiNote}</p>
                  </div>
                )}

                {doc.valueStack && doc.valueStack.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-teal/25 bg-gradient-to-br from-teal/5 via-white to-white p-5 shadow-sm md:p-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal/15 text-teal"
                        aria-hidden
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <h3 className="font-heading text-base font-bold text-navy md:text-lg">
                        What&apos;s included
                      </h3>
                    </div>
                    <ul className="mt-4 grid gap-2.5 text-sm text-navy/85 sm:grid-cols-2">
                      {doc.valueStack.map((v) => (
                        <li key={v} className="flex items-start gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            className="mt-0.5 shrink-0 text-teal"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold text-navy">Pricing</h2>
                <p className="mt-4 text-2xl font-bold text-primary">
                  Starting from ₹{doc.pricingFromInr?.toLocaleString("en-IN") ?? "—"}
                </p>
                <p className="mt-2 text-sm text-navy/70">Final cost depends on assessment — we never quote fixed package prices online.</p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-navy/85">
                  {(doc.pricingFactors ?? []).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {doc.pricingEmiNote && <p className="mt-4 text-sm text-navy/80">{doc.pricingEmiNote}</p>}
                <div className="mt-6 rounded-xl border border-surface bg-white p-5">
                  <p className="text-sm font-semibold text-navy">What&apos;s included</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-navy/80">
                    {(doc.valueStack ?? []).map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation" variant="primary">
                Get Personalized Quote
              </Button>
              <Button href="/cost-estimator" variant="outline">
                Cost estimator
              </Button>
            </div>
            <div className="mt-8">
              <EMICalculator />
            </div>
          </section>

          {(slug === "hair-transplant" || slug === "hair-transplant-hi") && (
            <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
              <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">
                Meet the Best Hair Transplant Surgeon in Delhi
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/85">
                Dr. Sandeep Bhasin ranks among the top hair transplant surgeon in Delhi &amp;
                Cosmetic surgeons in India with a 99% success rate. Employing advanced
                technologies, he has successfully executed hair transplants, anti-aging treatments
                and skin aesthetics over two decades. Patients often experience long-lasting hair
                restoration with natural-looking outcomes.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                <div className="grid gap-0 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
                  <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-primary/10 via-white to-teal/10 md:aspect-auto md:min-h-[360px]">
                    <Image
                      src="/demo/doctor-profile-feature-vertical.png"
                      alt="Dr Sandeep Bhasin, senior cosmetic and aesthetic surgeon at Care Well Medical Centre in Delhi"
                      fill
                      sizes="(min-width: 768px) 260px, 100vw"
                      className="object-cover object-top md:object-center"
                    />
                  </div>

                  <div className="flex flex-col gap-4 p-5 sm:p-6 md:p-7">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80 sm:text-xs">
                        Why patients trust Dr Sandeep Bhasin
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-bold leading-tight text-navy sm:text-xl">
                        Hair Transplant Surgeon in Delhi
                      </h3>
                      <p className="mt-1 text-xs text-navy/60 sm:text-sm">
                        Dr Sandeep Bhasin, senior cosmetic and aesthetic surgeon at Care Well
                        Medical Centre in Delhi
                      </p>
                    </div>

                    <blockquote className="relative rounded-xl border-l-4 border-primary/60 bg-primary/5 p-4 text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="absolute -top-3 left-3 text-primary/40"
                        aria-hidden
                      >
                        <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H4v2h1a4 4 0 004-4V7zm11 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V7z" />
                      </svg>
                      <p>
                        Every patient I see has a different pattern of hair loss, expectations, and
                        long-term goals. My role is not to recommend surgery to everyone, but to
                        determine whether a hair transplant is truly appropriate for that stage of
                        hair loss.
                      </p>
                    </blockquote>

                    <p className="text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                      I focus on{" "}
                      <span className="font-semibold text-navy">donor hair safety</span>, realistic
                      density, and natural hairline planning, rather than aggressive graft numbers.
                      If surgery is unlikely to deliver a meaningful or lasting result, I advise
                      waiting or choosing non-surgical options first. This honest discussion helps
                      patients make informed, pressure-free decisions about their treatment.
                    </p>

                    <ul className="grid gap-2 sm:grid-cols-3">
                      {[
                        "Donor hair safety",
                        "Natural hairline planning",
                        "Honest, pressure-free advice",
                      ].map((chip) => (
                        <li
                          key={chip}
                          className="flex items-start gap-2 rounded-lg bg-surface/60 px-3 py-2 text-xs font-medium text-navy/80 sm:text-sm"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            className="mt-0.5 shrink-0 text-teal"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>{chip}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <p className="text-sm text-navy/75 sm:text-[15px]">
                        You can learn more about my experience, qualifications, and surgical
                        approach here:
                      </p>
                      <Link
                        href="/about/dr-bhasin"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        <span aria-hidden>👉</span>
                        Know Your Doctor — Dr Sandeep Bhasin
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal/25 bg-teal/5 p-4 sm:p-5">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/15 text-teal"
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-navy/85 sm:text-[15px]">
                  <span className="font-semibold text-navy">Dr Sandeep Bhasin</span> follows a
                  patient-first philosophy and performs every hair transplant at Care Well Medical
                  Centre with full transparency, ethical care, and medical accountability.
                </p>
              </div>
            </section>
          )}

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold text-navy">FAQ</h2>
            <div className="mt-8">
              <ServiceFaq items={doc.faq ?? []} />
            </div>
          </section>

          <section className="border-t border-surface pb-12 pt-10 md:pb-16 md:pt-12">
            <h2 className="font-heading text-2xl font-bold text-navy">Related services</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {(doc.relatedServices ?? []).map((s) => (
                <Link
                  key={s.slug?.current}
                  href={`/services/${s.slug?.current}`}
                  className="rounded-xl border border-surface bg-white p-5 shadow-sm transition hover:border-primary"
                >
                  <p className="font-heading font-semibold text-navy">{s.title}</p>
                  <p className="mt-2 text-sm text-primary">View service →</p>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <aside className="hidden overflow-x-clip lg:block">
          <div className="sticky top-28">
            <ServiceSidebarReveal>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment={treatment} source="service-sidebar" />
              </Suspense>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block w-full rounded-xl bg-navy py-3 text-center text-sm font-semibold text-white"
                >
                  Call clinic
                </a>
              )}
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
                <p className="mt-2">Mon–Sat · 10:00 – 19:00</p>
              </div>
            </ServiceSidebarReveal>
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA bar — sits above every other fixed element */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-surface bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] lg:hidden"
      >
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-navy py-3 text-[13px] font-semibold text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.05z" />
            </svg>
            Call
          </a>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-[13px] font-semibold text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>
            WhatsApp
          </a>
        )}
        <Link
          href="/book-consultation"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-[13px] font-semibold text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
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
          {phone && (
            <Button href={`tel:${phone.replace(/\s/g, "")}`} variant="outline" className="!border-white !text-white">
              Call Now
            </Button>
          )}
        </div>
        {wa && (
          <a href={wa} className="mt-6 inline-block text-sm font-medium text-white underline">
            Continue on WhatsApp
          </a>
        )}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
    </div>
  );
}
