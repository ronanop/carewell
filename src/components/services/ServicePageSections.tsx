import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { PortableBody } from "@/components/content/PortableBody";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/leads/LeadForm";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { TreatmentFinderQuiz } from "@/components/leads/TreatmentFinderQuiz";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import type { ServiceDoc } from "@/lib/demo-service";
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/treatments/hair" },
          { name: doc.title, path: `/services/${slug}` },
        ]}
      />
      <section className="relative min-h-[65vh] bg-navy">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #1557A0 0%, transparent 40%), radial-gradient(circle at 70% 60%, #0B7B6B 0%, transparent 35%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1fr_280px] md:px-6 lg:py-28">
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/treatments/hair" },
                { label: doc.title },
              ]}
            />
            <h1 className="font-heading mt-6 text-4xl font-bold text-white md:text-5xl">
              {doc.title} in Delhi
            </h1>
            {doc.tagline && <p className="mt-4 max-w-xl text-lg text-white/90">{doc.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              {wa && (
                <Button href={wa} variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy">
                  WhatsApp
                </Button>
              )}
            </div>
          </div>
          <aside className="hidden md:block">
            <div className="sticky top-28 rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
              <p className="font-heading text-sm font-bold">Quick facts</p>
              <ul className="mt-4 space-y-3 text-sm text-white/90">
                {(doc.quickFacts ?? []).map((q, i) => (
                  <li key={i}>
                    <span className="text-white/70">{q.label}:</span> {q.value}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-32 md:px-6 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 lg:pb-24">
        <article className="max-w-3xl lg:max-w-none">
          <section className="py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="font-heading text-2xl font-bold text-navy">What is {doc.title.toLowerCase()}?</h2>
                <div className="mt-6">
                  <PortableBody value={doc.whatIsBody} />
                </div>
                {doc.insightPoints && doc.insightPoints.length > 0 && (
                  <div className="mt-8 rounded-xl border border-teal/30 bg-surface p-5">
                    <p className="text-sm font-semibold text-teal">Key insights</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-navy/85">
                      {doc.insightPoints.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative aspect-square max-h-80 w-full overflow-hidden rounded-2xl bg-surface lg:justify-self-end">
                {doc.whatIsIllustrationUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={doc.whatIsIllustrationUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-navy/50">Illustration from CMS</div>
                )}
              </div>
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">How it works</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-5">
              {(doc.howItWorksSteps ?? []).map((s, i) => (
                <li key={i} className="rounded-xl border border-surface bg-white p-4 text-center shadow-sm">
                  <p className="text-xs font-bold text-primary">Step {i + 1}</p>
                  <p className="mt-2 font-heading font-semibold text-navy">{s.title}</p>
                  <p className="mt-2 text-xs text-navy/75">{s.description}</p>
                </li>
              ))}
            </ol>
            {doc.youtubeVideoId && (
              <div className="mt-10 max-w-3xl">
                <LiteVideo id={doc.youtubeVideoId} title={`${doc.title} explained`} />
              </div>
            )}
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">Before &amp; after</h2>
            <div className="mt-8">
              <BeforeAfterSliders cases={doc.beforeAfterCases ?? []} />
            </div>
            <div className="mt-8">
              <Button href="/gallery" variant="outline">
                Get Similar Results →
              </Button>
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
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
          </section>

          <section className="border-t border-surface py-16 md:py-24">
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
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation" variant="primary">
                Get Personalized Quote
              </Button>
              <Button href="/cost-estimator" variant="outline">
                Cost estimator
              </Button>
            </div>
            <div className="mt-8 max-w-md">
              <EMICalculator />
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
            <h2 className="font-heading text-2xl font-bold text-navy">FAQ</h2>
            <div className="mt-8">
              <ServiceFaq items={doc.faq ?? []} />
            </div>
          </section>

          <section className="border-t border-surface py-16 md:py-24">
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

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-surface" />}>
              <LeadForm defaultTreatment={treatment} />
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
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-surface bg-white p-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-white"
          >
            Call
          </a>
        )}
        {wa && (
          <a href={wa} className="flex flex-1 items-center justify-center rounded-lg bg-teal py-3 text-sm font-semibold text-white">
            WhatsApp
          </a>
        )}
        <Link
          href="/book-consultation"
          className="flex flex-1 items-center justify-center rounded-lg border border-primary py-3 text-sm font-semibold text-primary"
        >
          Book Now
        </Link>
      </div>

      <section className="bg-gradient-to-r from-navy to-teal py-16 text-center text-white md:py-20">
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
    </>
  );
}
