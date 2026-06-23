import Image from "next/image";
import Link from "next/link";
import { blogPostPublicHref, type SuggestedBlogPost } from "@/lib/blog-href";

export function BlogSuggestedPosts({
  posts,
  title = "You might also read",
}: {
  posts: SuggestedBlogPost[];
  title?: string;
}) {
  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-16 max-w-article border-t border-surface pt-12">
      <h2 className="font-heading text-xl font-bold text-navy">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={blogPostPublicHref(post)}
            className="group flex flex-col overflow-hidden rounded-xl border border-surface bg-white transition hover:border-primary hover:shadow-sm"
          >
            {post.coverUrl ? (
              <div className="relative aspect-[16/10] bg-surface">
                <Image
                  src={post.coverUrl}
                  alt=""
                  fill
                  className="object-cover transition group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-gradient-to-br from-surface to-teal/10" aria-hidden />
            )}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-heading text-sm font-semibold leading-snug text-navy group-hover:text-primary">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-navy/70">{post.excerpt}</p>
              ) : null}
              {post.readTimeMinutes ? (
                <p className="mt-auto pt-3 text-xs text-navy/50">{post.readTimeMinutes} min read</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
