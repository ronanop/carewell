import type { PortableTextBlock } from "@portabletext/types";
import { Suspense } from "react";
import { BlogArticleHeader } from "@/components/blog/BlogArticleHeader";
import { BlogArticleToc, BlogArticleTocMobile } from "@/components/blog/BlogArticleToc";
import { BlogScrollAsideTitle } from "@/components/blog/BlogScrollAsideTitle";
import { BlogSuggestedPosts } from "@/components/blog/BlogSuggestedPosts";
import { RichContentBody } from "@/components/content/RichContentBody";
import { LeadForm } from "@/components/leads/LeadForm";
import { getBlogPostByLegacyPath } from "@carewell/backend/lib/cms/queries";
import { resolveBlogCoverUrl } from "@carewell/backend/lib/cms/blog-cover";
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
  const coverUrl = resolveBlogCoverUrl({
    coverUrl: post.coverUrl,
    ogImageUrl: post.seo?.ogImageUrl,
    seo: post.seo,
    body: post.body,
  });
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

        <BlogSuggestedPosts posts={related} />
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
