import { prisma } from "@/lib/db";
import { mediaPublicUrl } from "@/lib/media-url";
import { buildSeoObject } from "@/lib/cms/seo";
import { mapPrismaService } from "@/lib/cms/map-service";
import { isWordpressCmsEnabled, isSanityCmsEnabled } from "@/lib/cms/provider";
import { getSanityClient } from "@/lib/cms/client";
import { mapSanityBlogPost, mapSanityService } from "@/lib/cms/map-sanity";
import {
  blogPostByLegacyPathQuery,
  legacyBlogPathsQuery,
  legacyServicePathsQuery,
  serviceByLegacyPathQuery,
} from "@/lib/cms/groq-queries";
import {
  getCachedWpBlogPostByLegacyPath,
  getCachedWpPagePaths,
  getCachedWpPostPaths,
  getCachedWpServiceByLegacyPath,
} from "@/lib/cms/wordpress/cached";
import { normalizeLegacyPath } from "@/lib/legacy-path";
import {
  findBlogIdByLegacyPath,
  findServiceIdByLegacyPath,
  getLegacyPathByBlogId,
  getLegacyPathByServiceId,
  getLegacyPathsByBlogIds,
  getLegacyPathsByServiceIds,
  listBlogIdsForAdmin,
  listLegacyBlogPathsFromDb,
  listLegacyPathsFromDb,
  listServiceIdsForAdmin,
} from "@/lib/legacy-path-db";

const serviceInclude = {
  heroImage: true,
  whatIsIllustration: true,
  seoOgImage: true,
  category: true,
  alternateLocaleService: true,
  quickFacts: { orderBy: { sortOrder: "asc" as const } },
  howItWorksSteps: { orderBy: { sortOrder: "asc" as const } },
  beforeAfterCases: {
    orderBy: { sortOrder: "asc" as const },
    include: { beforeImage: true, afterImage: true },
  },
  faqs: { orderBy: { sortOrder: "asc" as const } },
  relatedFrom: {
    orderBy: { sortOrder: "asc" as const },
    include: { toService: true },
  },
} as const;

function whatsappFromIntegrations(integrations: unknown): string | undefined {
  if (!integrations || typeof integrations !== "object") return undefined;
  const n = (integrations as Record<string, unknown>).whatsappNumber;
  return typeof n === "string" && n.trim() ? n.trim() : undefined;
}

export async function getSiteSettings() {
  const row = await prisma.siteSettings.findUnique({
    where: { id: "default" },
    include: { heroImage: true },
  });
  if (!row) return null;
  const whatsappNumber = row.whatsappNumber?.trim() || whatsappFromIntegrations(row.integrations);
  return {
    ...row,
    whatsappNumber,
    heroImageUrl: row.heroImage?.url ? mediaPublicUrl(row.heroImage.url) : undefined,
    heroImageAlt: row.heroImage?.alt ?? undefined,
  };
}

export async function getNavigation() {
  return prisma.navigation.findUnique({ where: { id: "default" } });
}

export async function getRedirects() {
  return prisma.redirect.findMany({
    select: { fromPath: true, toPath: true, statusCode: true },
  });
}

export async function getServiceSlugs() {
  const rows = await prisma.service.findMany({
    where: { slug: { not: "" } },
    select: { slug: true, locale: true },
  });
  return rows.map((r) => ({ slug: r.slug, locale: r.locale }));
}

export async function getServiceBySlug(slug: string) {
  const row = await prisma.service.findFirst({
    where: { slug, locale: "en" },
    include: serviceInclude,
  });
  if (!row) {
    const hi = await prisma.service.findFirst({
      where: { slug },
      include: serviceInclude,
    });
    if (!hi) return null;
    return mapPrismaService(hi);
  }
  return mapPrismaService(row);
}

export async function getServiceByLegacyPath(path: string) {
  if (isWordpressCmsEnabled()) {
    try {
      return await getCachedWpServiceByLegacyPath(path);
    } catch {
      return null;
    }
  }

  if (isSanityCmsEnabled()) {
    const client = getSanityClient();
    if (!client) return null;
    try {
      const legacyPath = normalizeLegacyPath(path);
      const doc = await client.fetch(serviceByLegacyPathQuery, { path: legacyPath });
      return mapSanityService(doc);
    } catch {
      return null;
    }
  }

  const legacyPath = normalizeLegacyPath(path);
  const id = await findServiceIdByLegacyPath(legacyPath);
  if (!id) return null;
  const row = await prisma.service.findUnique({
    where: { id },
    include: serviceInclude,
  });
  if (!row) return null;
  return mapPrismaService(row);
}

export async function listLegacySitemapPaths(): Promise<string[]> {
  if (isWordpressCmsEnabled()) {
    try {
      return await getCachedWpPagePaths();
    } catch {
      return [];
    }
  }

  if (isSanityCmsEnabled()) {
    const client = getSanityClient();
    if (!client) return [];
    try {
      const paths = await client.fetch<string[]>(legacyServicePathsQuery);
      return (paths ?? []).map((p) => normalizeLegacyPath(p)).sort();
    } catch {
      return [];
    }
  }

  return listLegacyPathsFromDb();
}

export async function getCategorySlugs() {
  const rows = await prisma.serviceCategory.findMany({ select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function getCategoriesWithServices() {
  const cats = await prisma.serviceCategory.findMany({
    orderBy: { title: "asc" },
    include: {
      heroImage: true,
      services: {
        orderBy: { title: "asc" },
        include: { heroImage: true },
      },
    },
  });
  return cats.map((c) => ({
    _id: c.id,
    title: c.title,
    slug: c.slug,
    megaMenuKey: c.megaMenuKey,
    heroSubtitle: c.heroSubtitle,
    intro: c.intro,
    comparisonRows: c.comparisonRows,
    services: c.services.map((s) => ({
      title: s.title,
      slug: s.slug,
      treatmentDropdownLabel: s.treatmentDropdownLabel,
      heroImageUrl: s.heroImage?.url ? mediaPublicUrl(s.heroImage.url) : undefined,
      tagline: s.tagline,
    })),
  }));
}

export async function getCategoryBySlug(slug: string) {
  const cat = await prisma.serviceCategory.findUnique({
    where: { slug },
    include: {
      heroImage: true,
      seoOgImage: true,
      services: { orderBy: { title: "asc" }, select: { title: true, slug: true, treatmentDropdownLabel: true } },
      faqs: { orderBy: { sortOrder: "asc" } },
      beforeAfter: {
        orderBy: { sortOrder: "asc" },
        include: { beforeImage: true, afterImage: true },
      },
      relatedBlogs: {
        orderBy: { sortOrder: "asc" },
        include: {
          blogPost: {
            include: { author: true, coverImage: true },
          },
        },
      },
    },
  });
  if (!cat) return null;
  return {
    _id: cat.id,
    title: cat.title,
    slug: cat.slug,
    megaMenuKey: cat.megaMenuKey,
    heroSubtitle: cat.heroSubtitle,
    intro: cat.intro,
    comparisonRows: cat.comparisonRows,
    heroImageUrl: cat.heroImage?.url ? mediaPublicUrl(cat.heroImage.url) : undefined,
    services: cat.services.map((s) => ({
      title: s.title,
      slug: s.slug,
      treatmentDropdownLabel: s.treatmentDropdownLabel,
    })),
    relatedBlogPosts: cat.relatedBlogs.map((rb) => {
      const p = rb.blogPost;
      return {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        publishedAt: p.publishedAt?.toISOString(),
        readTimeMinutes: p.readTimeMinutes,
        author: p.author ? { name: p.author.name } : undefined,
        coverUrl: p.coverImage?.url ? mediaPublicUrl(p.coverImage.url) : undefined,
      };
    }),
    beforeAfterCases: cat.beforeAfter.map((c) => ({
      beforeUrl: c.beforeImage?.url ? mediaPublicUrl(c.beforeImage.url) : undefined,
      afterUrl: c.afterImage?.url ? mediaPublicUrl(c.afterImage.url) : undefined,
      patientInitials: c.patientInitials,
      age: c.age,
      gender: c.gender,
      monthsPostProcedure: c.monthsPostProcedure,
      subtype: c.subtype,
    })),
    faq: cat.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    seo: buildSeoObject({ ...cat, seoOgImage: cat.seoOgImage }),
  };
}

export async function getBlogPostsList() {
  const posts = await prisma.blogPost.findMany({
    where: { slug: { not: "" } },
    orderBy: { publishedAt: "desc" },
    include: { author: true, coverImage: true },
  });
  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    excerpt: p.excerpt,
    featured: p.featured,
    publishedAt: p.publishedAt?.toISOString(),
    readTimeMinutes: p.readTimeMinutes,
    author: p.author ? { name: p.author.name } : undefined,
    coverUrl: p.coverImage?.url ? mediaPublicUrl(p.coverImage.url) : undefined,
  }));
}

export async function getBlogSlugs() {
  const rows = await prisma.blogPost.findMany({ select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function getBlogPostByLegacyPath(path: string) {
  if (isWordpressCmsEnabled()) {
    try {
      return await getCachedWpBlogPostByLegacyPath(path);
    } catch {
      return null;
    }
  }

  if (isSanityCmsEnabled()) {
    const client = getSanityClient();
    if (!client) return null;
    try {
      const legacyPath = normalizeLegacyPath(path);
      const doc = await client.fetch(blogPostByLegacyPathQuery, { path: legacyPath });
      return mapSanityBlogPost(doc);
    } catch {
      return null;
    }
  }

  const legacyPath = normalizeLegacyPath(path);
  const id = await findBlogIdByLegacyPath(legacyPath);
  if (!id) return null;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return null;
  return getBlogPostBySlug(post.slug);
}

export async function listLegacyBlogSitemapPaths(): Promise<string[]> {
  if (isWordpressCmsEnabled()) {
    try {
      return await getCachedWpPostPaths();
    } catch {
      return [];
    }
  }

  if (isSanityCmsEnabled()) {
    const client = getSanityClient();
    if (!client) return [];
    try {
      const paths = await client.fetch<string[]>(legacyBlogPathsQuery);
      return (paths ?? []).map((p) => normalizeLegacyPath(p)).sort();
    } catch {
      return [];
    }
  }

  return listLegacyBlogPathsFromDb();
}

export async function listBlogPostsForAdmin(search?: string) {
  const ids = await listBlogIdsForAdmin(search);
  if (!ids.length) return [];
  const [posts, pathMap] = await Promise.all([
    prisma.blogPost.findMany({ where: { id: { in: ids } } }),
    getLegacyPathsByBlogIds(ids),
  ]);
  const byId = new Map(posts.map((p) => [p.id, p]));
  return ids.flatMap((id) => {
    const row = byId.get(id);
    if (!row) return [];
    return [{ ...row, legacyPath: pathMap.get(id) ?? null }];
  });
}

export async function getBlogPostForAdmin(slug: string) {
  const row = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      coverImage: true,
      relatedFrom: {
        orderBy: { sortOrder: "asc" },
        take: 3,
        include: { toPost: { select: { id: true, slug: true, title: true } } },
      },
    },
  });
  if (!row) return null;
  const legacyPath = await getLegacyPathByBlogId(row.id);
  return {
    ...row,
    legacyPath,
    suggestedPostSlugs: row.relatedFrom.map((r) => r.toPost.slug),
  };
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: { include: { image: true } },
      coverImage: true,
      seoOgImage: true,
      pillarPost: { select: { title: true, slug: true } },
      linkedService: { select: { title: true, slug: true } },
      relatedFrom: {
        orderBy: { sortOrder: "asc" },
        take: 3,
        include: { toPost: { include: { coverImage: true } } },
      },
    },
  });
  if (!post) return null;
  return {
    ...post,
    slug: post.slug,
    body: post.body,
    publishedAt: post.publishedAt?.toISOString(),
    updatedAt: post.updatedAt?.toISOString(),
    author: post.author
      ? {
          name: post.author.name,
          credentials: post.author.credentials,
          image: post.author.image,
          imageUrl: post.author.image?.url ? mediaPublicUrl(post.author.image.url) : undefined,
        }
      : undefined,
    relatedPosts: post.relatedFrom.map((r) => ({
      title: r.toPost.title,
      slug: r.toPost.slug,
      legacyPath: r.toPost.legacyPath,
      excerpt: r.toPost.excerpt,
      readTimeMinutes: r.toPost.readTimeMinutes,
      coverUrl: r.toPost.coverImage?.url ? mediaPublicUrl(r.toPost.coverImage.url) : undefined,
    })),
    pillarPost: post.pillarPost
      ? { title: post.pillarPost.title, slug: post.pillarPost.slug }
      : undefined,
    linkedService: post.linkedService
      ? { title: post.linkedService.title, slug: post.linkedService.slug }
      : undefined,
    coverUrl: post.coverImage?.url ? mediaPublicUrl(post.coverImage.url) : undefined,
    seo: buildSeoObject({ ...post, seoOgImage: post.seoOgImage }),
  };
}

export async function getGalleryItems() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    include: { beforeImage: true, afterImage: true },
  });
  return items.map((g) => ({
    _id: g.id,
    title: g.title,
    category: g.category,
    treatmentDetail: g.treatmentDetail,
    consentOnFile: g.consentOnFile,
    beforeUrl: g.beforeImage?.url ? mediaPublicUrl(g.beforeImage.url) : undefined,
    afterUrl: g.afterImage?.url ? mediaPublicUrl(g.afterImage.url) : undefined,
    seo: buildSeoObject(g),
  }));
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getHyperlocalSlugs() {
  const rows = await prisma.hyperlocalPage.findMany({ select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function getHyperlocalBySlug(slug: string) {
  const page = await prisma.hyperlocalPage.findUnique({
    where: { slug },
    include: { linkedService: true, seoOgImage: true },
  });
  if (!page) return null;
  return {
    ...page,
    slug: page.slug,
    linkedService: page.linkedService
      ? { title: page.linkedService.title, slug: page.linkedService.slug }
      : undefined,
    seo: buildSeoObject({ ...page, seoOgImage: page.seoOgImage }),
  };
}

export async function getAdminStats() {
  const [
    servicesTotal,
    servicesEn,
    servicesHi,
    blogTotal,
    blogFeatured,
    categories,
    gallery,
    testimonials,
    hyperlocal,
    redirectsDb,
    recentServices,
    recentBlog,
    cats,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.service.count({ where: { locale: "en" } }),
    prisma.service.count({ where: { locale: "hi" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { featured: true } }),
    prisma.serviceCategory.count(),
    prisma.galleryItem.count(),
    prisma.testimonial.count(),
    prisma.hyperlocalPage.count(),
    prisma.redirect.count(),
    prisma.service.findMany({
      orderBy: { updatedAt: "desc" },
      take: 6,
      select: { title: true, slug: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      orderBy: { cmsUpdatedAt: "desc" },
      take: 5,
      select: { title: true, slug: true, cmsUpdatedAt: true },
    }),
    prisma.serviceCategory.findMany({
      orderBy: { title: "asc" },
      include: { _count: { select: { services: true } } },
    }),
  ]);

  const services = await prisma.service.findMany({
    select: { seoTitle: true, seoDescription: true, locale: true, faqs: { select: { id: true } } },
  });
  const servicesMissingSeo = services.filter(
    (s) => !s.seoTitle?.trim() || !s.seoDescription?.trim(),
  ).length;
  const servicesMissingFaq = services.filter((s) => s.faqs.length < 8).length;

  const blogs = await prisma.blogPost.findMany({
    select: { seoTitle: true, seoDescription: true },
  });
  const blogMissingSeo = blogs.filter((b) => !b.seoTitle?.trim() || !b.seoDescription?.trim()).length;

  const byCategory = await Promise.all(
    cats.map(async (c) => ({
      title: c.title,
      count: await prisma.service.count({
        where: { categoryId: c.id, locale: { not: "hi" } },
      }),
    })),
  );

  return {
    servicesTotal,
    servicesEn,
    servicesHi,
    servicesMissingSeo,
    servicesMissingFaq,
    blogTotal,
    blogMissingSeo,
    blogFeatured,
    categories,
    gallery,
    testimonials,
    hyperlocal,
    redirectsSanity: redirectsDb,
    recentServices: recentServices.map((s) => ({
      title: s.title,
      slug: s.slug,
      _updatedAt: s.updatedAt.toISOString(),
    })),
    recentBlog: recentBlog.map((b) => ({
      title: b.title,
      slug: b.slug,
      _updatedAt: b.cmsUpdatedAt.toISOString(),
    })),
    byCategory,
  };
}

export async function getSeoIssues() {
  const services = await prisma.service.findMany({
    where: { locale: { not: "hi" } },
    orderBy: { title: "asc" },
    take: 40,
    select: {
      title: true,
      slug: true,
      seoTitle: true,
      seoDescription: true,
      faqs: { select: { id: true } },
    },
  });
  const blogs = await prisma.blogPost.findMany({
    orderBy: { title: "asc" },
    take: 20,
    select: { title: true, slug: true, seoTitle: true, seoDescription: true },
  });

  return {
    services: services.map((s) => ({
      title: s.title,
      slug: s.slug,
      hasSeoTitle: Boolean(s.seoTitle?.trim()),
      hasSeoDesc: Boolean(s.seoDescription?.trim()),
      faqCount: s.faqs.length,
    })),
    blogs: blogs.map((b) => ({
      title: b.title,
      slug: b.slug,
      hasSeoTitle: Boolean(b.seoTitle?.trim()),
      hasSeoDesc: Boolean(b.seoDescription?.trim()),
    })),
  };
}

export async function listServicesForAdmin(search?: string) {
  const ids = await listServiceIdsForAdmin(search);
  if (!ids.length) return [];
  const [services, pathMap] = await Promise.all([
    prisma.service.findMany({
      where: { id: { in: ids } },
      include: { category: true },
    }),
    getLegacyPathsByServiceIds(ids),
  ]);
  const byId = new Map(services.map((s) => [s.id, s]));
  return ids.flatMap((id) => {
    const row = byId.get(id);
    if (!row) return [];
    return [{ ...row, legacyPath: pathMap.get(id) ?? null }];
  });
}

export async function getServiceForAdmin(id: string) {
  const [row, legacyPath] = await Promise.all([
    prisma.service.findUnique({
      where: { id },
      include: {
        ...serviceInclude,
        category: true,
      },
    }),
    getLegacyPathByServiceId(id),
  ]);
  if (!row) return null;
  return { ...row, legacyPath };
}

export async function getPageSlugs() {
  return prisma.page.findMany({
    where: { published: true },
    select: { slug: true },
  });
}

export async function getPageBySlug(slug: string) {
  return prisma.page.findFirst({
    where: { slug, published: true },
  });
}
