import { notFound } from "next/navigation";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { ServiceEditFormLazy } from "@/components/admin/content/ServiceEditFormLazy";
import { ADMIN_SERVICE_PAGES } from "@/config/admin-content-routes";
import { getServiceForAdmin } from "@carewell/backend/lib/cms/queries";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminServicePageEditPage({ params }: { params: { id: string } }) {
  const service = await getServiceForAdmin(params.id);
  if (!service) notFound();

  const categories = await prisma.serviceCategory.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, slug: true },
  });

  return (
    <div>
      <AdminContentHeader
        title={service.title}
        description={
          service.legacyPath
            ? `Legacy URL · ${service.legacyPath}/`
            : `Service page · /services/${service.slug}`
        }
        backHref={ADMIN_SERVICE_PAGES}
      />
      <ServiceEditFormLazy
        categories={categories}
        initial={{
          id: service.id,
          slug: service.slug,
          legacyPath: service.legacyPath,
          locale: service.locale,
          title: service.title,
          tagline: service.tagline,
          categoryId: service.categoryId,
          heroImageId: service.heroImageId,
          heroImageUrl: service.heroImage?.url ?? null,
          youtubeVideoId: service.youtubeVideoId,
          treatmentDropdownLabel: service.treatmentDropdownLabel,
          pricingFromInr: service.pricingFromInr,
          pricingEmiNote: service.pricingEmiNote,
          whatIsBody: service.whatIsBody,
          seoTitle: service.seoTitle,
          seoDescription: service.seoDescription,
          insightPoints: service.insightPoints,
          quickFacts: service.quickFacts.map((f) => ({ label: f.label, value: f.value })),
          howItWorksSteps: service.howItWorksSteps.map((s) => ({
            title: s.title,
            description: s.description,
          })),
          faqs: service.faqs.map((f) => ({ question: f.question, answer: f.answer })),
        }}
      />
    </div>
  );
}
