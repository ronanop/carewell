import Image from "next/image";
import Link from "next/link";
import { BlogArticleCover } from "@/components/blog/BlogArticleCover";
import { BlogShareRow } from "@/components/blog/BlogShareRow";

type BlogArticleHeaderProps = {
  title: string;
  coverUrl?: string | null;
  author?: { name?: string; credentials?: string; imageUrl?: string | null };
  publishedAt?: string;
  updatedAt?: string;
  readTimeMinutes?: number;
  pageUrl: string;
};

export function BlogArticleHeader({
  title,
  coverUrl,
  author,
  publishedAt,
  updatedAt,
  readTimeMinutes = 5,
  pageUrl,
}: BlogArticleHeaderProps) {
  return (
    <>
      <nav className="text-sm text-navy/60">
        <Link href="/blog">Blog</Link> / <span className="text-navy">{title}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
        <header className="min-w-0">
          <h1 className="font-heading text-4xl font-bold text-navy md:text-5xl">{title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy/70">
            {author?.imageUrl ? (
              <Image
                src={author.imageUrl}
                alt={author?.name ? `${author.name} photo` : "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : null}
            {author?.name ? <span className="font-medium text-navy">{author.name}</span> : null}
            {publishedAt ? (
              <>
                <span>·</span>
                <time dateTime={publishedAt}>Published {new Date(publishedAt).toLocaleDateString("en-IN")}</time>
              </>
            ) : null}
            {updatedAt ? (
              <>
                <span>·</span>
                <time dateTime={updatedAt}>Updated {new Date(updatedAt).toLocaleDateString("en-IN")}</time>
              </>
            ) : null}
            <span>·</span>
            <span>{readTimeMinutes} min read</span>
          </div>
          <BlogShareRow title={title} url={pageUrl} />
        </header>

        {coverUrl ? (
          <div className="min-w-0 lg:justify-self-end">
            <BlogArticleCover src={coverUrl} alt={title} />
          </div>
        ) : null}
      </div>
    </>
  );
}
