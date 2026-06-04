import { prisma } from "@/lib/db";
import { legacyPathWithTrailingSlash, normalizeLegacyPath } from "@/lib/legacy-path";
import { setBlogLegacyPath, setServiceLegacyPath } from "@/lib/legacy-path-db";
import type { Prisma } from "@prisma/client";

export type ServiceAdminPayload = {
  id?: string;
  slug: string;
  legacyPath?: string | null;
  locale?: string;
  title: string;
  tagline?: string | null;
  categoryId?: string | null;
  heroImageId?: string | null;
  whatIsIllustrationId?: string | null;
  youtubeVideoId?: string | null;
  treatmentDropdownLabel?: string | null;
  pricingFromInr?: number | null;
  pricingEmiNote?: string | null;
  insightPoints?: string[];
  candidateGood?: string[];
  candidatePoor?: string[];
  pricingFactors?: string[];
  valueStack?: string[];
  whatIsBody?: Prisma.InputJsonValue;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonicalUrl?: string | null;
  seoNoindex?: boolean;
  quickFacts?: { label: string; value: string }[];
  howItWorksSteps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
};

export async function upsertServiceFromAdmin(payload: ServiceAdminPayload) {
  const id = payload.id ?? `svc-${payload.slug}`;
  const legacyPath = payload.legacyPath ? normalizeLegacyPath(payload.legacyPath) : null;
  const siteBase = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const defaultCanonical =
    legacyPath && siteBase ? `${siteBase}${legacyPathWithTrailingSlash(legacyPath)}` : undefined;

  const data = {
    slug: payload.slug,
    locale: payload.locale ?? "en",
    title: payload.title,
    tagline: payload.tagline ?? null,
    categoryId: payload.categoryId ?? null,
    heroImageId: payload.heroImageId ?? null,
    whatIsIllustrationId: payload.whatIsIllustrationId ?? null,
    youtubeVideoId: payload.youtubeVideoId ?? null,
    treatmentDropdownLabel: payload.treatmentDropdownLabel ?? null,
    pricingFromInr: payload.pricingFromInr ?? null,
    pricingEmiNote: payload.pricingEmiNote ?? null,
    insightPoints: payload.insightPoints ?? [],
    candidateGood: payload.candidateGood ?? [],
    candidatePoor: payload.candidatePoor ?? [],
    pricingFactors: payload.pricingFactors ?? [],
    valueStack: payload.valueStack ?? [],
    whatIsBody: payload.whatIsBody ?? undefined,
    seoTitle: payload.seoTitle ?? null,
    seoDescription: payload.seoDescription ?? null,
    seoCanonicalUrl: payload.seoCanonicalUrl ?? defaultCanonical ?? null,
    seoNoindex: payload.seoNoindex ?? false,
  };

  await prisma.$transaction(async (tx) => {
    await tx.service.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });
    await tx.serviceQuickFact.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (payload.quickFacts ?? []).length; i++) {
      const f = payload.quickFacts![i];
      await tx.serviceQuickFact.create({
        data: { serviceId: id, sortOrder: i, label: f.label, value: f.value },
      });
    }
    await tx.serviceHowItWorksStep.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (payload.howItWorksSteps ?? []).length; i++) {
      const s = payload.howItWorksSteps![i];
      await tx.serviceHowItWorksStep.create({
        data: { serviceId: id, sortOrder: i, title: s.title, description: s.description },
      });
    }
    await tx.serviceFaq.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (payload.faqs ?? []).length; i++) {
      const f = payload.faqs![i];
      await tx.serviceFaq.create({
        data: { serviceId: id, sortOrder: i, question: f.question, answer: f.answer },
      });
    }
  });

  await setServiceLegacyPath(id, legacyPath);

  return id;
}

export async function upsertSiteSettings(
  data: Omit<Prisma.SiteSettingsUpdateInput, "id"> & { id?: never },
) {
  const rest = { ...data } as Prisma.SiteSettingsUpdateInput;
  delete (rest as { id?: string }).id;
  return prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...(rest as Prisma.SiteSettingsUncheckedCreateInput) },
    update: rest,
  });
}

export async function upsertNavigation(data: {
  items?: Prisma.InputJsonValue;
  footerColumns?: Prisma.InputJsonValue;
}) {
  return prisma.navigation.upsert({
    where: { id: "default" },
    create: { id: "default", items: data.items, footerColumns: data.footerColumns },
    update: { items: data.items, footerColumns: data.footerColumns },
  });
}

export async function upsertRedirect(fromPath: string, toPath: string, statusCode = 301) {
  return prisma.redirect.upsert({
    where: { fromPath },
    create: { fromPath, toPath, statusCode },
    update: { toPath, statusCode },
  });
}

export async function deleteRedirect(fromPath: string) {
  return prisma.redirect.delete({ where: { fromPath } });
}

export async function upsertBlogPost(payload: {
  id?: string;
  slug: string;
  legacyPath?: string | null;
  title: string;
  excerpt?: string | null;
  category?: string | null;
  featured?: boolean;
  body?: Prisma.InputJsonValue;
  publishedAt?: string | null;
  readTimeMinutes?: number | null;
  coverImageId?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}) {
  const id = payload.id ?? `blog-${payload.slug}`;
  const legacyPath = payload.legacyPath ? normalizeLegacyPath(payload.legacyPath) : null;
  const siteBase = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const defaultCanonical =
    legacyPath && siteBase ? `${siteBase}${legacyPathWithTrailingSlash(legacyPath)}` : undefined;

  const data = {
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt ?? null,
    category: payload.category ?? null,
    featured: payload.featured ?? false,
    body: payload.body ?? undefined,
    publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
    readTimeMinutes: payload.readTimeMinutes ?? null,
    coverImageId: payload.coverImageId ?? null,
    seoTitle: payload.seoTitle ?? null,
    seoDescription: payload.seoDescription ?? null,
    seoCanonicalUrl: defaultCanonical ?? undefined,
  };
  await prisma.blogPost.upsert({ where: { id }, create: { id, ...data }, update: data });
  await setBlogLegacyPath(id, legacyPath);
  return id;
}

export async function upsertCategory(payload: {
  id?: string;
  slug: string;
  title: string;
  megaMenuKey?: string | null;
  heroSubtitle?: string | null;
  intro?: Prisma.InputJsonValue;
  seoTitle?: string | null;
  seoDescription?: string | null;
}) {
  const id = payload.id ?? `cat-${payload.slug}`;
  const data = {
    slug: payload.slug,
    title: payload.title,
    megaMenuKey: payload.megaMenuKey ?? null,
    heroSubtitle: payload.heroSubtitle ?? null,
    intro: payload.intro ?? undefined,
    seoTitle: payload.seoTitle ?? null,
    seoDescription: payload.seoDescription ?? null,
  };
  await prisma.serviceCategory.upsert({ where: { id }, create: { id, ...data }, update: data });
  return id;
}

export async function upsertPage(payload: {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: Prisma.InputJsonValue;
  published?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoNoindex?: boolean;
}) {
  const id = payload.id ?? `page-${payload.slug}`;
  const data = {
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt ?? null,
    body: payload.body ?? undefined,
    published: payload.published ?? false,
    seoTitle: payload.seoTitle ?? null,
    seoDescription: payload.seoDescription ?? null,
    seoNoindex: payload.seoNoindex ?? false,
  };
  await prisma.page.upsert({ where: { id }, create: { id, ...data }, update: data });
  return id;
}

export async function upsertGalleryItem(payload: {
  id?: string;
  title: string;
  category?: string | null;
  treatmentDetail?: string | null;
  consentOnFile?: boolean;
  beforeImageId?: string | null;
  afterImageId?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}) {
  const id = payload.id ?? `gallery-${payload.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`;
  const data = {
    title: payload.title,
    category: payload.category ?? null,
    treatmentDetail: payload.treatmentDetail ?? null,
    consentOnFile: payload.consentOnFile ?? false,
    seoTitle: payload.seoTitle ?? null,
    seoDescription: payload.seoDescription ?? null,
  };
  await prisma.galleryItem.upsert({
    where: { id },
    create: {
      id,
      ...data,
      ...(payload.beforeImageId ? { beforeImage: { connect: { id: payload.beforeImageId } } } : {}),
      ...(payload.afterImageId ? { afterImage: { connect: { id: payload.afterImageId } } } : {}),
    },
    update: {
      ...data,
      ...(payload.beforeImageId ? { beforeImage: { connect: { id: payload.beforeImageId } } } : {}),
      ...(payload.afterImageId ? { afterImage: { connect: { id: payload.afterImageId } } } : {}),
    },
  });
  return id;
}

export async function upsertTestimonial(payload: {
  id?: string;
  quote: string;
  attribution?: string | null;
  rating?: number | null;
  sortOrder?: number;
}) {
  const id = payload.id ?? undefined;
  if (id) {
    await prisma.testimonial.update({
      where: { id },
      data: {
        quote: payload.quote,
        attribution: payload.attribution ?? null,
        rating: payload.rating ?? null,
        sortOrder: payload.sortOrder ?? 0,
      },
    });
    return id;
  }
  const row = await prisma.testimonial.create({
    data: {
      quote: payload.quote,
      attribution: payload.attribution ?? null,
      rating: payload.rating ?? null,
      sortOrder: payload.sortOrder ?? 0,
    },
  });
  return row.id;
}

export async function upsertHyperlocalPage(payload: {
  id?: string;
  slug: string;
  title: string;
  areaName?: string | null;
  serviceFocus?: string | null;
  distanceFromClinic?: string | null;
  body?: Prisma.InputJsonValue;
  linkedServiceId?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}) {
  const id = payload.id ?? `loc-${payload.slug}`;
  const data = {
    slug: payload.slug,
    title: payload.title,
    areaName: payload.areaName ?? null,
    serviceFocus: payload.serviceFocus ?? null,
    distanceFromClinic: payload.distanceFromClinic ?? null,
    body: payload.body ?? undefined,
    linkedServiceId: payload.linkedServiceId ?? null,
    seoTitle: payload.seoTitle ?? null,
    seoDescription: payload.seoDescription ?? null,
  };
  await prisma.hyperlocalPage.upsert({ where: { id }, create: { id, ...data }, update: data });
  return id;
}

export async function updateMedia(id: string, data: { alt?: string | null; filename?: string }) {
  return prisma.media.update({ where: { id }, data });
}

export async function createAdminUser(payload: {
  email: string;
  name: string;
  passwordHash: string;
  role?: string;
}) {
  return prisma.adminUser.create({
    data: {
      email: payload.email.toLowerCase().trim(),
      name: payload.name,
      passwordHash: payload.passwordHash,
      role: payload.role ?? "editor",
    },
  });
}

export async function updateAdminUser(
  id: string,
  data: Partial<{ name: string; role: string; active: boolean; passwordHash: string }>,
) {
  return prisma.adminUser.update({ where: { id }, data });
}

export async function saveFormSubmission(data: {
  formType?: string;
  name: string;
  phone: string;
  email?: string | null;
  treatment?: string | null;
  message?: string | null;
  pageUrl?: string | null;
  source?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  ip?: string | null;
  payload?: Prisma.InputJsonValue;
}) {
  return prisma.formSubmission.create({
    data: {
      formType: data.formType ?? "lead",
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      treatment: data.treatment ?? null,
      message: data.message ?? null,
      pageUrl: data.pageUrl ?? null,
      source: data.source ?? null,
      utmSource: data.utmSource ?? null,
      utmMedium: data.utmMedium ?? null,
      utmCampaign: data.utmCampaign ?? null,
      ip: data.ip ?? null,
      payload: data.payload ?? undefined,
    },
  });
}
