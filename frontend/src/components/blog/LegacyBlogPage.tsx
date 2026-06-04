import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { BlogArticleToc, BlogArticleTocMobile } from "@/components/blog/BlogArticleToc";
import { BlogScrollAsideTitle } from "@/components/blog/BlogScrollAsideTitle";
import { BlogShareRow } from "@/components/blog/BlogShareRow";
import { RichContentBody } from "@/components/content/RichContentBody";
import { LeadForm } from "@/components/leads/LeadForm";
import { getBlogPostByLegacyPath } from "@carewell/backend/lib/cms/queries";
import { extractH2Sections } from "@carewell/backend/lib/portable-h2";
import { legacyPathWithTrailingSlash } from "@carewell/backend/lib/legacy-path";
import { getSiteUrl } from "@carewell/backend/lib/site";

export async function LegacyBlogPage({ legacyPath }: { legacyPath: string }) {
  const post = await getBlogPostByLegacyPath(legacyPath);

  if (!post) {
    return (
      <main className="container section-pad">
        <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-8">
          <h1 className="text-display-sm text-navy">Article Coming Soon</h1>
          <p className="mt-3 text-body-md text-text-secondary">
            This post is being prepared and will match the legacy site URL shortly.
          </p>
        </div>
      </main>
    );
  }

  const title = post.title;
  const author = post.author;
  const body = post.body as unknown as PortableTextBlock[] | null | undefined;
  const related = post.relatedPosts ?? [];
  const publishedAt = post.publishedAt ?? "";
  const updatedAt = post.updatedAt;
  const readTimeMinutes = post.readTimeMinutes ?? 5;
  const coverUrl = post.coverUrl;
  const headings = extractH2Sections(post.body);
  const site = getSiteUrl();
  const pageUrl = `${site.replace(/\/$/, "")}${legacyPathWithTrailingSlash(legacyPath)}`;

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
            {publishedAt ? (
              <>
                <span>·</span>
                <time dateTime={publishedAt}>
                  Published {new Date(publishedAt).toLocaleDateString("en-IN")}
                </time>
              </>
            ) : null}
            {updatedAt ? (
              <>
                <span>·</span>
                <time dateTime={updatedAt}>
                  Updated {new Date(updatedAt).toLocaleDateString("en-IN")}
                </time>
              </>
            ) : null}
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
            <RichContentBody value={body} />
          </div>
          <aside className="mt-10 lg:mt-0">
            <div className="sticky top-28 space-y-6">
              <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-surface" />}>
                <LeadForm
                  defaultTreatment="General consultation"
                  submitLabel="Get Free Consultation"
                  source="blog-sidebar"
                />
              </Suspense>
              <BlogScrollAsideTitle />
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <footer className="mx-auto mt-16 max-w-article border-t border-surface pt-12">
            <h2 className="font-heading text-xl font-bold text-navy">You might also read</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="rounded-lg border border-surface p-4 hover:border-primary"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </footer>
        ) : null}
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
