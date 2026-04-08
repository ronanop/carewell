import Link from "next/link";
import { Suspense } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { TreatmentFinderQuiz } from "@/components/leads/TreatmentFinderQuiz";
import { ExitIntentLead } from "@/components/leads/ExitIntentLead";
import { GoogleReviewsStatic } from "@/components/social/GoogleReviewsStatic";
import { LatestVideos } from "@/components/media/LatestVideos";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery, testimonialsQuery } from "@/sanity/queries";

export const revalidate = 60;

type Settings = {
  patientCounterLabel?: string;
  patientCounterValue?: number;
};

export default async function HomePage() {
  const settings = (await sanityFetch<Settings>(siteSettingsQuery)) ?? {};
  const testimonials =
    (await sanityFetch<{ quote: string; attribution?: string; rating?: number }[]>(testimonialsQuery)) ??
    [];

  const counterLabel = settings.patientCounterLabel ?? "Patients treated this month";
  const counterValue = settings.patientCounterValue ?? 120;

  return (
    <>
      <ExitIntentLead />
      <section className="relative min-h-[65vh] overflow-hidden bg-navy">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #1557A0 0%, transparent 50%), radial-gradient(circle at 80% 30%, #0B7B6B 0%, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center gap-8 px-4 py-24 md:px-6 md:py-32 lg:flex-row lg:items-center">
          <div className="max-w-xl text-white">
            <p className="text-sm font-medium uppercase tracking-wider text-teal">Chittaranjan Park, South Delhi</p>
            <h1 className="font-heading mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Trusted cosmetic surgery & vitiligo care in Delhi NCR
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Led by Dr. Sandeep Bhasin — natural results, transparent guidance, and a team focused on your safety.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation" variant="secondary">
                Book Free Consultation
              </Button>
              <Button href="/contact" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy">
                Call the clinic
              </Button>
            </div>
          </div>
          <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 backdrop-blur-md lg:ml-auto">
            <p className="text-sm text-white/80">{counterLabel}</p>
            <p className="font-heading mt-2 text-4xl font-bold text-white">{counterValue}+</p>
            <p className="mt-4 text-sm text-white/85">
              Update this figure monthly in the CMS — no developer required.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <FadeIn>
          <h2 className="font-heading text-center text-3xl font-bold text-navy">Why patients choose Care Well</h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Delhi NCR expertise",
              body: "Focused protocols for hair restoration, facial surgery, body contouring, and vitiligo — under one roof.",
            },
            {
              title: "Clear, ethical pricing",
              body: "Ranges and personalized quotes — no surprise billing. EMI options discussed upfront.",
            },
            {
              title: "Privacy first",
              body: "Discreet consultations and a calm, professional environment from first visit to recovery.",
            },
          ].map((c) => (
            <FadeIn key={c.title} className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-navy">{c.title}</h3>
              <p className="mt-3 text-navy/80">{c.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">Find the right treatment</h2>
              <p className="mt-3 text-navy/80">
                Answer five quick questions — we&apos;ll suggest the most relevant service and you can book a free slot.
              </p>
              <TreatmentFinderQuiz className="mt-8" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">Patient stories</h2>
              <ul className="mt-6 space-y-6">
                {(testimonials.length ? testimonials : [{ quote: "Professional team and honest advice throughout.", attribution: "A.K.", rating: 5 }]).map(
                  (t, i) => (
                    <li key={i} className="rounded-xl bg-white p-5 shadow-sm">
                      <p className="text-navy/90">&ldquo;{t.quote}&rdquo;</p>
                      {t.attribution && <p className="mt-2 text-sm font-medium text-primary">— {t.attribution}</p>}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-10">
                <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-surface" />}>
                  <GoogleReviewsStatic />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl">
          <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-surface" />}>
            <LatestVideos />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="font-heading text-center text-2xl font-bold text-navy">Explore services</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/treatments/hair" variant="outline">
            Hair
          </Button>
          <Button href="/treatments/skin-vitiligo" variant="outline">
            Skin & Vitiligo
          </Button>
          <Button href="/treatments/face" variant="outline">
            Face
          </Button>
          <Button href="/treatments/body" variant="outline">
            Body
          </Button>
          <Button href="/treatments/therapies" variant="outline">
            Therapies
          </Button>
        </div>
        <p className="mt-8 text-center text-sm text-navy/70">
          Connect a clinic-owned hero photo from Sanity for production — use <code className="rounded bg-surface px-1">next/image</code> with WebP under 150KB.
        </p>
      </section>

      <section className="bg-navy py-16 text-center text-white md:py-24">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Ready for your free consultation?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Same-day callbacks during working hours. No spam — your details stay private.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/book-consultation" variant="secondary">
            Claim My Free Slot
          </Button>
          <Link href="/contact" className="text-sm font-semibold text-white underline underline-offset-4">
            Or contact us first
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalClinic", "LocalBusiness"],
            name: "Care Well Medical Centre",
            address: {
              "@type": "PostalAddress",
              addressLocality: "New Delhi",
              addressRegion: "Delhi",
              addressCountry: "IN",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "120",
            },
          }),
        }}
      />
    </>
  );
}
