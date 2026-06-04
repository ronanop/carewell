import { notFound } from "next/navigation";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { BlogEditForm } from "@/components/admin/content/BlogEditForm";
import { ADMIN_POSTS } from "@/config/admin-content-routes";
import { getBlogPostForAdmin } from "@carewell/backend/lib/cms/queries";
import { legacyPathWithTrailingSlash } from "@carewell/backend/lib/legacy-path";

export default async function AdminPostEditPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostForAdmin(params.slug);
  if (!post) notFound();

  return (
    <div>
      <AdminContentHeader
        title={post.title}
        description={
          post.legacyPath
            ? `Legacy URL · ${legacyPathWithTrailingSlash(post.legacyPath)}`
            : `Post · /blog/${post.slug}`
        }
        backHref={ADMIN_POSTS}
      />
      <BlogEditForm
        initial={{
          id: post.id,
          slug: post.slug,
          legacyPath: post.legacyPath,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          category: post.category,
          featured: post.featured,
          publishedAt: post.publishedAt?.toISOString() ?? null,
          readTimeMinutes: post.readTimeMinutes,
          coverImageId: post.coverImageId,
          coverImageUrl: post.coverImage?.url ?? null,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
        }}
      />
    </div>
  );
}
