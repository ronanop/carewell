import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogArticleToc, BlogArticleTocMobile } from "@/components/blog/BlogArticleToc";
import { BlogScrollAsideTitle } from "@/components/blog/BlogScrollAsideTitle";
import { BlogShareRow } from "@/components/blog/BlogShareRow";
import { PortableBody } from "@/components/content/PortableBody";
import { LeadForm } from "@/components/leads/LeadForm";
import { sanityFetch } from "@/sanity/client";
import { blogPostBySlugQuery } from "@/sanity/queries";
import { extractH2Sections } from "@/lib/portable-h2";
import { getSiteUrl } from "@/lib/site";
import Image from "next/image";

export const revalidate = 60;

export async function generateStaticParams() {
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
  const post = await sanityFetch<Record<string, unknown>>(blogPostBySlugQuery, { slug });

  if (!post) notFound();

  const title = post.title as string;
  const author = post.author as { name?: string; credentials?: string; imageUrl?: string | null };
  const body = post.body as never;
  const related = (post.relatedPosts as { title?: string; slug?: { current?: string } }[]) ?? [];
  const publishedAt = typeof post.publishedAt === "string" ? post.publishedAt : "";
  const updatedAt = typeof post.updatedAt === "string" ? post.updatedAt : undefined;
  const readTimeMinutes = typeof post.readTimeMinutes === "number" ? post.readTimeMinutes : 5;
  const coverUrl = typeof post.coverUrl === "string" ? post.coverUrl : undefined;
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
        <nav className="text-sm text-navy/60">
          <Link href="/blog">Blog</Link> / <span className="text-navy">{title}</span>
        </nav>
        <header className="mx-auto mt-6 max-w-article">
          <h1 className="font-heading text-4xl font-bold text-navy md:text-5xl">{title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy/70">
            {author?.imageUrl && (
              <Image
                src={author.imageUrl}
                alt={author?.name ? `${author.name} photo` : "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <span className="font-medium text-navy">{author?.name}</span>
            <span>·</span>
            <time dateTime={publishedAt}>Published {publishedAt ? new Date(publishedAt).toLocaleDateString("en-IN") : ""}</time>
            {updatedAt && (
              <>
                <span>·</span>
                <time dateTime={updatedAt}>Updated {new Date(updatedAt).toLocaleDateString("en-IN")}</time>
              </>
            )}
            <span>·</span>
            <span>{readTimeMinutes} min read</span>
          </div>
          <BlogShareRow title={title} url={pageUrl} />
        </header>

        <div className="mt-12 lg:grid lg:grid-cols-[200px_1fr_280px] lg:gap-10">
          <aside className="mb-10 hidden lg:block">
            <BlogArticleToc headings={headings} />
          </aside>
          <div className="mx-auto max-w-article text-[17px] leading-relaxed text-navy/90">
            <BlogArticleTocMobile headings={headings} />
            <PortableBody value={body} />
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
          <h2 className="font-heading mt-12 text-xl font-bold text-navy">You might also read</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {(related.length ? related : []).map((r) => (
              <Link key={r.slug?.current} href={`/blog/${r.slug?.current}`} className="rounded-lg border border-surface p-4 hover:border-primary">
                {r.title}
              </Link>
            ))}
          </div>
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
