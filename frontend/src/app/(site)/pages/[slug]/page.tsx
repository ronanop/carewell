import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichContentBody } from "@/components/content/RichContentBody";
import { getPageBySlug, getPageSlugs } from "@carewell/backend/lib/cms/queries";
import { getSiteSettings } from "@carewell/backend/lib/cms/queries";
import { getSiteUrl } from "@carewell/backend/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = await getPageSlugs();
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  const settings = await getSiteSettings();
  if (!page) return { title: "Page not found" };

  const title = page.seoTitle ?? page.title ?? settings?.globalSeoTitle ?? "Care Well";
  const description = page.seoDescription ?? page.excerpt ?? settings?.globalSeoDescription ?? undefined;

  return {
    title,
    description: description ?? undefined,
    robots: page.seoNoindex ? { index: false, follow: false } : undefined,
    alternates: { canonical: `${getSiteUrl()}/pages/${slug}` },
  };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const body = page.body as never;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-navy">{page.title}</h1>
        {page.excerpt ? <p className="mt-4 text-lg text-navy/80">{page.excerpt}</p> : null}
      </div>
      {body ? (
        <div className="prose prose-navy mt-10 max-w-none">
          <RichContentBody value={body} />
        </div>
      ) : null}
    </div>
  );
}
