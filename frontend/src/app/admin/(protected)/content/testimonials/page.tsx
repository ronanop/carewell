import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { TestimonialsAdminList } from "@/components/admin/content/CmsLists";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminContentHeader title="Testimonials" description="Patient quotes shown on the homepage and trust sections." />
      <TestimonialsAdminList
        initial={items.map((t) => ({
          id: t.id,
          quote: t.quote,
          attribution: t.attribution,
          rating: t.rating,
        }))}
      />
    </div>
  );
}
