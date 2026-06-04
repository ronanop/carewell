import type { PortableTextBlock } from "@portabletext/types";
import type { ServiceDoc } from "@/types/service";
import { mediaPublicUrl } from "@/lib/media-url";
import { buildSeoObject } from "@/lib/cms/seo";
import type { Prisma } from "@prisma/client";

type ServiceWithRelations = Prisma.ServiceGetPayload<{
  include: {
    heroImage: true;
    whatIsIllustration: true;
    seoOgImage: true;
    category: true;
    alternateLocaleService: true;
    quickFacts: true;
    howItWorksSteps: true;
    beforeAfterCases: { include: { beforeImage: true; afterImage: true } };
    faqs: true;
    relatedFrom: { include: { toService: true } };
  };
}>;

export function mapPrismaService(row: ServiceWithRelations): ServiceDoc & Record<string, unknown> {
  const relatedServices = row.relatedFrom
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((r) => ({
      title: r.toService.title,
      slug: { current: r.toService.slug },
      treatmentDropdownLabel: r.toService.treatmentDropdownLabel ?? undefined,
    }));

  return {
    title: row.title,
    slug: { current: row.slug },
    tagline: row.tagline ?? undefined,
    locale: row.locale,
    heroImageUrl: row.heroImage?.url ? mediaPublicUrl(row.heroImage.url) : null,
    quickFacts: row.quickFacts
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((f) => ({ label: f.label, value: f.value })),
    whatIsBody: (row.whatIsBody as unknown as PortableTextBlock[] | null) ?? undefined,
    whatIsIllustrationUrl: row.whatIsIllustration?.url
      ? mediaPublicUrl(row.whatIsIllustration.url)
      : null,
    insightPoints: row.insightPoints,
    howItWorksSteps: row.howItWorksSteps
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ title: s.title, description: s.description })),
    youtubeVideoId: row.youtubeVideoId ?? undefined,
    beforeAfterCases: row.beforeAfterCases
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({
        beforeUrl: c.beforeImage?.url ? mediaPublicUrl(c.beforeImage.url) : null,
        afterUrl: c.afterImage?.url ? mediaPublicUrl(c.afterImage.url) : null,
        patientInitials: c.patientInitials ?? undefined,
        age: c.age ?? undefined,
        gender: c.gender ?? undefined,
        monthsPostProcedure: c.monthsPostProcedure ?? undefined,
        subtype: c.subtype ?? undefined,
      })),
    candidateGood: row.candidateGood,
    candidatePoor: row.candidatePoor,
    pricingFromInr: row.pricingFromInr ?? undefined,
    pricingFactors: row.pricingFactors,
    pricingEmiNote: row.pricingEmiNote ?? undefined,
    valueStack: row.valueStack,
    faq: row.faqs
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((f) => ({ question: f.question, answer: f.answer })),
    relatedServices,
    treatmentDropdownLabel: row.treatmentDropdownLabel ?? undefined,
    seo: buildSeoObject({ ...row, seoOgImage: row.seoOgImage }),
    category: row.category
      ? {
          title: row.category.title,
          slug: { current: row.category.slug },
          megaMenuKey: row.category.megaMenuKey ?? undefined,
        }
      : undefined,
    alternateLocaleService: row.alternateLocaleService
      ? { slug: row.alternateLocaleService.slug, locale: row.alternateLocaleService.locale }
      : undefined,
    ogImageUrl: row.seoOgImage?.url ? mediaPublicUrl(row.seoOgImage.url) : undefined,
  };
}
