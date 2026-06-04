import Image from "next/image";
import Link from "next/link";
import type { HighlightedBlog } from "@carewell/backend/lib/cms/embed-sections";

export function HighlightedBlogsSection({ posts }: { posts: HighlightedBlog[] }) {
  if (!posts.length) return null;

  return (
    <section className="my-12 rounded-2xl border border-surface bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">Latest from our blog</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy/70 sm:text-base">
            Patient education, recovery guides and clinical insights from Care Well Medical Centre.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden whitespace-nowrap text-sm font-semibold text-primary underline-offset-4 hover:underline sm:inline-flex sm:items-center sm:gap-1.5"
        >
          View all articles
        </Link>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                {post.coverUrl ? (
                  <Image
                    src={post.coverUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-navy/40">No cover image</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                {post.category ? (
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/80">{post.category}</p>
                ) : null}
                <p className="mt-1 font-heading text-base font-bold leading-snug text-navy group-hover:text-primary">
                  {post.title}
                </p>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-sm text-navy/70">{post.excerpt}</p>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
