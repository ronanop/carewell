import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findLegacyPathByBlogSlug } from "@carewell/backend/lib/legacy-path-db";
import { legacyPathWithTrailingSlash } from "@carewell/backend/lib/legacy-path";
import { Suspense } from "react";
import { BlogArticleHeader } from "@/components/blog/BlogArticleHeader";
import { BlogArticleToc, BlogArticleTocMobile } from "@/components/blog/BlogArticleToc";
import { BlogScrollAsideTitle } from "@/components/blog/BlogScrollAsideTitle";
import { BlogSuggestedPosts } from "@/components/blog/BlogSuggestedPosts";
import type { SuggestedBlogPost } from "@/lib/blog-href";
import { RichContentBody } from "@/components/content/RichContentBody";
import { LeadForm } from "@/components/leads/LeadForm";
import { sanityFetch } from "@carewell/backend/sanity/client";
import { blogPostBySlugQuery } from "@carewell/backend/sanity/queries";
import { extractH2Sections } from "@carewell/backend/lib/portable-h2";
import { resolveBlogCoverUrl } from "@carewell/backend/lib/cms/blog-cover";
import { getSiteUrl } from "@carewell/backend/lib/site";
import { skipDatabaseAtBuildTime } from "@carewell/backend/lib/build-time-db";

export const revalidate = 60;

export async function generateStaticParams() {
  if (skipDatabaseAtBuildTime()) return [];
  const rows = (await sanityFetch<{ slug: string }[]>(`*[_type=="blogPost" && defined(slug.current)]{"slug":slug.current}`)) ?? [];
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<{ title?: string; seo?: { title?: string; description?: string }; slug?: { current?: string } }>(
    blogPostBySlugQuery,
    { slug },
  );
  const title = post?.seo?.title ?? post?.title ?? "Blog";
  return {
    title,
    description: post?.seo?.description,
    alternates: { canonical: `${getSiteUrl()}/blog/${slug}` },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const legacyPath = skipDatabaseAtBuildTime() ? null : await findLegacyPathByBlogSlug(slug);
  if (legacyPath) redirect(legacyPathWithTrailingSlash(legacyPath));

  const post = await sanityFetch<Record<string, unknown>>(blogPostBySlugQuery, { slug });

  if (!post) notFound();

  const title = post.title as string;
  const author = post.author as { name?: string; credentials?: string; imageUrl?: string | null };
  const body = post.body as never;
  const relatedRaw = (post.relatedPosts as { title?: string; slug?: { current?: string }; excerpt?: string; coverUrl?: string }[]) ?? [];
  const related: SuggestedBlogPost[] = relatedRaw
    .map((r) => ({
      title: r.title ?? "",
      slug: r.slug?.current ?? "",
      excerpt: r.excerpt ?? null,
      coverUrl: r.coverUrl,
    }))
    .filter((r) => r.slug && r.title);
  const publishedAt = typeof post.publishedAt === "string" ? post.publishedAt : "";
  const updatedAt = typeof post.updatedAt === "string" ? post.updatedAt : undefined;
  const readTimeMinutes = typeof post.readTimeMinutes === "number" ? post.readTimeMinutes : 5;
  const coverUrl = resolveBlogCoverUrl({
    coverUrl: typeof post.coverUrl === "string" ? post.coverUrl : undefined,
    ogImageUrl: typeof post.ogImageUrl === "string" ? post.ogImageUrl : undefined,
    seo: post.seo as { ogImageUrl?: string } | undefined,
    body: post.body,
  });
  const headings = extractH2Sections(post.body);
  const site = getSiteUrl();
  const pageUrl = `${site}/blog/${slug}`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#blogposting`,
        headline: title,
        ...(coverUrl ? { image: [coverUrl] } : {}),
        author: { "@type": "Person", name: author?.name ?? "Dr. Sandeep Bhasin" },
        publisher: {
          "@type": "Organization",
          name: "Care Well Medical Centre",
          url: site,
        },
        datePublished: publishedAt,
        dateModified: updatedAt ?? publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <article className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <BlogArticleHeader
          title={title}
          coverUrl={coverUrl}
          author={author}
          publishedAt={publishedAt}
          updatedAt={updatedAt}
          readTimeMinutes={readTimeMinutes}
          pageUrl={pageUrl}
        />

        <div className="mt-12 lg:grid lg:grid-cols-[200px_1fr_280px] lg:gap-10">
          <aside className="mb-10 hidden lg:block">
            <BlogArticleToc headings={headings} />
          </aside>
          <div className="mx-auto max-w-article text-[17px] leading-relaxed text-navy/90">
            <BlogArticleTocMobile headings={headings} />
            <RichContentBody value={body} />
            <div className="mt-12 rounded-xl border border-teal/30 bg-teal/5 p-5 text-center">
              <p className="font-heading font-semibold text-navy">{String(post.midArticleCtaTitle ?? "Have questions?")}</p>
              <Link href={String(post.midArticleCtaHref ?? "/book-consultation")} className="mt-2 inline-block text-sm font-semibold text-primary">
                Book a free 15-min consultation →
              </Link>
            </div>
          </div>
          <aside className="mt-10 lg:mt-0">
            <div className="sticky top-28 space-y-6">
              <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm defaultTreatment="General consultation" submitLabel="Get Free Consultation" source="blog-sidebar" />
              </Suspense>
              <BlogScrollAsideTitle />
            </div>
          </aside>
        </div>

        <footer className="mx-auto mt-16 max-w-article border-t border-surface pt-12">
          <div className="rounded-2xl border border-surface bg-surface/40 p-6">
            <p className="font-heading text-xl font-bold text-navy">{author?.name}</p>
            <p className="mt-2 text-sm text-navy/75">{author?.credentials}</p>
            <Link href="/book-consultation" className="mt-4 inline-block font-semibold text-primary">
              Book Consultation →
            </Link>
          </div>
          <BlogSuggestedPosts posts={related} />
        </footer>
      </article>
      <section className="bg-navy py-14 text-center text-white">
        <h2 className="font-heading text-2xl font-bold">Book your free consultation</h2>
        <Link href="/book-consultation" className="mt-4 inline-block rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white">
          Claim My Free Slot
        </Link>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
