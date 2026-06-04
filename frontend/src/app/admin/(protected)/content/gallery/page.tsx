import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { GalleryHub } from "@/components/admin/content/GalleryHub";
import { ADMIN_GALLERY_NAV_LABEL } from "@/config/admin-nav";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminGalleryPage() {
  const [media, items] = await Promise.all([
    prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
      include: { beforeImage: true, afterImage: true },
    }),
  ]);

  return (
    <div>
      <AdminContentHeader
        title={ADMIN_GALLERY_NAV_LABEL}
        description="Upload images and GIFs once, reuse them on pages, blog posts, and services. Manage before/after gallery cases for the public site."
      />
      <GalleryHub
        media={media.map((m) => ({
          id: m.id,
          url: m.url,
          filename: m.filename,
          alt: m.alt,
          mimeType: m.mimeType,
          createdAt: m.createdAt.toISOString(),
        }))}
        galleryItems={items.map((i) => ({
          id: i.id,
          title: i.title,
          category: i.category,
          treatmentDetail: i.treatmentDetail,
          consentOnFile: i.consentOnFile,
          beforeImageId: i.beforeImageId,
          afterImageId: i.afterImageId,
          beforeUrl: i.beforeImage?.url ?? null,
          afterUrl: i.afterImage?.url ?? null,
        }))}
      />
    </div>
  );
}
