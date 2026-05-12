import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableBody } from "@/components/content/PortableBody";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/sanity/client";
import { categoriesWithServicesQuery, categoryBySlugQuery } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = (await sanityFetch<{ slug: string }[]>(`*[_type == "serviceCategory" && defined(slug.current)]{"slug":slug.current}`)) ?? [];
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await sanityFetch<{ title?: string; seo?: { title?: string; description?: string } }>(
    categoryBySlugQuery,
    { slug },
  );
  const title = cat?.seo?.title ?? cat?.title ?? slug;
  return {
    title: `${title} | Care Well`,
    description: cat?.seo?.description,
    alternates: { canonical: `${getSiteUrl()}/treatments/${slug}` },
  };
}

export default async function CategoryHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await sanityFetch<Record<string, unknown>>(categoryBySlugQuery, { slug });
  const allCats = (await sanityFetch<Record<string, unknown>[]>(categoriesWithServicesQuery)) ?? [];

  if (!cat) notFound();

  const title =
    (cat?.title as string) ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const services =
    (cat?.services as { title?: string; slug?: { current?: string } }[]) ??
    (allCats.find((c) => (c.slug as string) === slug)?.services as { title?: string; slug?: { current?: string } }[]) ??
    [];

  const faq = (cat?.faq as { question?: string; answer?: string }[]) ?? [
    { question: `Which ${title} option is right for me?`, answer: "Book a consultation for a personalized plan." },
    { question: "How to book at Care Well?", answer: "Use the booking page or WhatsApp — Chittaranjan Park, South Delhi." },
  ];

  const blogs =
    (cat?.relatedBlogPosts as { title?: string; slug?: { current?: string }; excerpt?: string }[]) ?? [];

  return (
    <>
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm font-medium text-teal">Treatment hub</p>
          <h1 className="font-heading mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Explore sub-services, compare options, and book a free consultation — all content editable in Sanity.
          </p>
          <Button href="/book-consultation" variant="secondary" className="mt-8">
            Book Free Consultation
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="font-heading text-2xl font-bold text-navy">Services in this category</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(
            (s) => (
              <Link
                key={s.slug?.current}
                href={`/services/${s.slug?.current}`}
                className="flex flex-col rounded-2xl border border-surface bg-white p-6 shadow-sm transition hover:border-primary"
              >
                <span className="text-2xl" aria-hidden>
                  ✦
                </span>
                <p className="mt-3 font-heading text-lg font-semibold text-navy">{s.title}</p>
                <span className="mt-2 text-sm text-primary">View service →</span>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-navy">Which is right for me?</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy/10">
                  <th className="py-3 pr-4 font-heading text-navy">Treatment</th>
                  <th className="py-3 pr-4 font-heading text-navy">Best for</th>
                  <th className="py-3 font-heading text-navy">Typical downtime</th>
                </tr>
              </thead>
              <tbody>
                {(
                  (cat?.comparisonRows as { treatment?: string; bestFor?: string; downtime?: string }[]) ?? []
                ).map((row, i) => (
                  <tr key={i} className="border-b border-navy/5">
                    <td className="py-3 pr-4 font-medium text-navy">{row.treatment}</td>
                    <td className="py-3 pr-4 text-navy/80">{row.bestFor}</td>
                    <td className="py-3 text-navy/80">{row.downtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {cat?.intro && (
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <PortableBody value={cat.intro as never} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="font-heading text-2xl font-bold text-navy">FAQ</h2>
        <div className="mt-8 max-w-3xl">
          <ServiceFaq items={faq} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold text-navy">Related articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {blogs.map(
              (b) => (
                <Link
                  key={b.slug?.current}
                  href={`/blog/${b.slug?.current}`}
                  className="rounded-xl border border-surface p-5 hover:border-primary"
                >
                  <p className="font-heading font-semibold text-navy">{b.title}</p>
                  <p className="mt-2 text-sm text-navy/70">{b.excerpt}</p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
