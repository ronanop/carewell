import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { BLOG_SECTION, blogCardFallbackImages } from "@/data/homepage";

type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  category?: string;
};

export function BlogPreviewSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <SectionShell aria-labelledby="blog-preview-heading">
      <div className="container">
        <SectionHeader
          id="blog-preview-heading"
          eyebrow={BLOG_SECTION.eyebrow}
          title={BLOG_SECTION.title}
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="overflow-hidden rounded-card border-2 border-navy bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/9] bg-surface">
                <Image
                  src={post.coverUrl || blogCardFallbackImages[index % blogCardFallbackImages.length]}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <p className="text-overline uppercase text-teal">{post.category || "Article"}</p>
                <h3 className="mt-2 font-heading text-heading-md text-navy">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-body-sm text-text-secondary">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
