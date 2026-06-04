import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ABOUT_PAGE } from "@/data/about-page";
import { getSiteUrl } from "@carewell/backend/lib/site";

export const metadata: Metadata = {
  title: ABOUT_PAGE.seoTitle,
  description: ABOUT_PAGE.seoDescription,
  alternates: { canonical: `${getSiteUrl()}/about` },
};

export default function AboutPage() {
  return (
    <article>
      <header className="border-b border-surface bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-navy/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-navy/40">
                /
              </li>
              <li className="font-medium text-navy">About</li>
            </ol>
          </nav>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-[2.5rem]">
            {ABOUT_PAGE.title}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={ABOUT_PAGE.clinicImageSrc}
              alt={ABOUT_PAGE.clinicImageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        <p className="mt-10 font-heading text-xl font-semibold text-primary md:text-2xl">{ABOUT_PAGE.tagline}</p>
        <p className="mt-4 text-lg leading-relaxed text-navy/85">{ABOUT_PAGE.intro}</p>

        <section className="mt-12 border-t border-surface pt-10">
          <h2 className="text-center font-heading text-2xl font-bold text-navy md:text-3xl">
            {ABOUT_PAGE.treatmentsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-navy/80">{ABOUT_PAGE.treatmentsIntro}</p>
          <ul className="mx-auto mt-8 max-w-xl space-y-3">
            {ABOUT_PAGE.treatments.map((item) => (
              <li key={item} className="flex items-start gap-3 text-navy/85">
                <span
                  className="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-4 border-t border-surface pt-10 text-navy/85">
          {ABOUT_PAGE.historyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="leading-relaxed">
              {paragraph.split("Dr. Sandeep Bhasin").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <Link href="/about/dr-bhasin" className="font-semibold text-primary hover:underline">
                      Dr. Sandeep Bhasin
                    </Link>
                  </span>
                ) : (
                  part
                ),
              )}
            </p>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-8 text-center md:px-10">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-primary md:text-2xl">
            {ABOUT_PAGE.mottoTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy/85">{ABOUT_PAGE.motto}</p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/about/dr-bhasin" variant="primary">
            Meet Dr. Sandeep Bhasin
          </Button>
          <Button href="/book-consultation" variant="outline">
            Book consultation
          </Button>
          <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
            Contact us →
          </Link>
        </div>
      </div>
    </article>
  );
}
