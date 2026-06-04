import { notFound } from "next/navigation";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { CategoryEditForm } from "@/components/admin/content/CategoryEditForm";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminCategoryEditPage({ params }: { params: { slug: string } }) {
  const cat = await prisma.serviceCategory.findUnique({ where: { slug: params.slug } });
  if (!cat) notFound();

  return (
    <div>
      <AdminContentHeader title={cat.title} backHref="/admin/content/categories" />
      <CategoryEditForm
        initial={{
          id: cat.id,
          slug: cat.slug,
          title: cat.title,
          megaMenuKey: cat.megaMenuKey,
          heroSubtitle: cat.heroSubtitle,
          intro: cat.intro,
          seoTitle: cat.seoTitle,
          seoDescription: cat.seoDescription,
        }}
      />
    </div>
  );
}
