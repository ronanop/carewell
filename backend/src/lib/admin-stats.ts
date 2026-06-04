import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getAdminStats, getSeoIssues as getSeoIssuesFromDb } from "@/lib/cms/queries";
import { isPrismaCmsEnabled } from "@/lib/cms/provider";
import { getLeadPipelineStatus } from "@/lib/admin-auth";
import { buildMetadataSitemap } from "@/lib/site-sitemap";
import { getSiteUrl } from "@/lib/site";
import { getRepoRoot } from "@/lib/repo-root";
import { sanityFetch } from "@/sanity/client";
import type { EnvCheck, RecentDoc, SeoIssue } from "@/lib/admin-stats-types";

export type { EnvCheck, RecentDoc, SeoIssue };

export type AdminWebsiteStats = {
  siteUrl: string;
  sitemapUrlCount: number;
  staticPageCount: number;
  services: {
    total: number;
    en: number;
    hi: number;
    missingSeo: number;
    missingFaq: number;
  };
  blog: { total: number; missingSeo: number; featured: number };
  categories: number;
  gallery: number;
  testimonials: number;
  hyperlocal: number;
  redirects: {
    sanity: number;
    migration: number;
    legacyMap: number;
  };
  recentServices: RecentDoc[];
  recentBlog: RecentDoc[];
  byCategory: { title: string; count: number }[];
};

export type AdminDashboardSnapshot = AdminWebsiteStats & {
  leadsConfigured: number;
  leadsTotal: number;
  envChecks: EnvCheck[];
  deployScore: { ok: number; total: number };
};

const adminStatsQuery = `{
  "servicesTotal": count(*[_type == "service"]),
  "servicesEn": count(*[_type == "service" && locale == "en"]),
  "servicesHi": count(*[_type == "service" && locale == "hi"]),
  "servicesMissingSeo": count(*[_type == "service" && (!defined(seo.title) || seo.title == "" || !defined(seo.description) || seo.description == "")]),
  "servicesMissingFaq": count(*[_type == "service" && count(faq) < 8]),
  "blogTotal": count(*[_type == "blogPost"]),
  "blogMissingSeo": count(*[_type == "blogPost" && (!defined(seo.title) || seo.title == "" || !defined(seo.description) || seo.description == "")]),
  "blogFeatured": count(*[_type == "blogPost" && featured == true]),
  "categories": count(*[_type == "serviceCategory"]),
  "gallery": count(*[_type == "galleryItem"]),
  "testimonials": count(*[_type == "testimonial"]),
  "hyperlocal": count(*[_type == "hyperlocalPage"]),
  "redirectsSanity": count(*[_type == "redirect"]),
  "recentServices": *[_type == "service"]|order(_updatedAt desc)[0...6]{
    title,
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "recentBlog": *[_type == "blogPost"]|order(_updatedAt desc)[0...5]{
    title,
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "byCategory": *[_type == "serviceCategory"]|order(title asc){
    title,
    "count": count(*[_type == "service" && references(^._id) && locale != "hi"])
  }
}`;

type SanityStatsRow = {
  servicesTotal: number;
  servicesEn: number;
  servicesHi: number;
  servicesMissingSeo: number;
  servicesMissingFaq: number;
  blogTotal: number;
  blogMissingSeo: number;
  blogFeatured: number;
  categories: number;
  gallery: number;
  testimonials: number;
  hyperlocal: number;
  redirectsSanity: number;
  recentServices: { title?: string; slug?: string; _updatedAt?: string }[];
  recentBlog: { title?: string; slug?: string; _updatedAt?: string }[];
  byCategory: { title?: string; count?: number }[];
};

function readJsonCount(filePath: string, key: string): number {
  if (!existsSync(filePath)) return 0;
  try {
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    if (key === "services" && Array.isArray(data.services)) return data.services.length;
    if (Array.isArray(data)) return data.length;
    return 0;
  } catch {
    return 0;
  }
}

function mapRecent(
  rows: { title?: string; slug?: string; _updatedAt?: string }[] | undefined,
): RecentDoc[] {
  return (rows ?? [])
    .filter((r) => r.slug)
    .map((r) => ({
      title: r.title ?? r.slug ?? "Untitled",
      slug: r.slug!,
      updatedAt: r._updatedAt ?? "",
    }));
}

export function getEnvChecks(): EnvCheck[] {
  const checks: EnvCheck[] = [
    {
      key: "SITE_URL",
      label: "Production site URL",
      status: process.env.SITE_URL ? "ok" : "warn",
      hint: "Used for sitemap and canonical URLs",
    },
    {
      key: "DATABASE_URL",
      label: "PostgreSQL (CMS)",
      status: process.env.DATABASE_URL ? "ok" : "missing",
      hint: "npm run db:up && npm run db:migrate",
    },
    {
      key: "CMS_REVALIDATE",
      label: "Publish webhook (ISR)",
      status: process.env.SANITY_REVALIDATE_SECRET ? "ok" : "warn",
      hint: "Set SANITY_REVALIDATE_SECRET — POST /api/revalidate on content save",
    },
    {
      key: "ADMIN",
      label: "Admin session",
      status: process.env.ADMIN_SESSION_SECRET ? "ok" : "missing",
    },
    {
      key: "GTM",
      label: "Google Tag Manager",
      status: process.env.NEXT_PUBLIC_GTM_ID ? "ok" : "warn",
      hint: "Optional — also editable in siteSettings",
    },
    {
      key: "LEADS",
      label: "Lead pipeline",
      status: Object.values(getLeadPipelineStatus()).some((s) => s === "configured") ? "ok" : "warn",
      hint: "At least one lead sink recommended",
    },
  ];
  return checks;
}

export async function fetchAdminWebsiteStats(): Promise<AdminWebsiteStats> {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const root = getRepoRoot();

  const [raw, sitemap] = await Promise.all([
    isPrismaCmsEnabled()
      ? getAdminStats().catch(() => null)
      : sanityFetch<SanityStatsRow>(adminStatsQuery),
    buildMetadataSitemap(siteUrl).catch(() => []),
  ]);

  const s = raw ?? {
    servicesTotal: 0,
    servicesEn: 0,
    servicesHi: 0,
    servicesMissingSeo: 0,
    servicesMissingFaq: 0,
    blogTotal: 0,
    blogMissingSeo: 0,
    blogFeatured: 0,
    categories: 0,
    gallery: 0,
    testimonials: 0,
    hyperlocal: 0,
    redirectsSanity: 0,
    recentServices: [],
    recentBlog: [],
    byCategory: [],
  };

  const serviceUrls = (sitemap ?? []).filter((e) => e.url.includes("/services/")).length;
  const blogUrls = (sitemap ?? []).filter((e) => e.url.includes("/blog/")).length;
  const staticCount = (sitemap?.length ?? 0) - serviceUrls - blogUrls;

  return {
    siteUrl,
    sitemapUrlCount: sitemap?.length ?? 0,
    staticPageCount: Math.max(0, staticCount),
    services: {
      total: s.servicesTotal,
      en: s.servicesEn,
      hi: s.servicesHi,
      missingSeo: s.servicesMissingSeo,
      missingFaq: s.servicesMissingFaq,
    },
    blog: {
      total: s.blogTotal,
      missingSeo: s.blogMissingSeo,
      featured: s.blogFeatured,
    },
    categories: s.categories,
    gallery: s.gallery,
    testimonials: s.testimonials,
    hyperlocal: s.hyperlocal,
    redirects: {
      sanity: s.redirectsSanity,
      migration: readJsonCount(join(root, "db", "redirects.migration.json"), "array"),
      legacyMap: readJsonCount(join(root, "db", "seed", "legacy-url-map.json"), "services"),
    },
    recentServices: mapRecent(s.recentServices),
    recentBlog: mapRecent(s.recentBlog),
    byCategory: (s.byCategory ?? [])
      .filter((c) => c.title)
      .map((c) => ({ title: c.title!, count: c.count ?? 0 })),
  };
}

export async function fetchAdminDashboardSnapshot(): Promise<AdminDashboardSnapshot> {
  const website = await fetchAdminWebsiteStats();
  const leads = getLeadPipelineStatus();
  const envChecks = getEnvChecks();
  const leadsConfigured = Object.values(leads).filter((s) => s === "configured").length;

  const deployScore = {
    ok: envChecks.filter((c) => c.status === "ok").length,
    total: envChecks.length,
  };

  return {
    ...website,
    leadsConfigured,
    leadsTotal: Object.keys(leads).length,
    envChecks,
    deployScore,
  };
}

const seoIssuesQuery = `{
  "services": *[_type == "service" && locale != "hi" && (
    !defined(seo.title) || seo.title == "" ||
    !defined(seo.description) || seo.description == "" ||
    count(faq) < 8
  )]|order(title asc)[0...40]{
    title,
    "slug": slug.current,
    "hasSeoTitle": defined(seo.title) && seo.title != "",
    "hasSeoDesc": defined(seo.description) && seo.description != "",
    "faqCount": count(faq)
  },
  "blogs": *[_type == "blogPost" && (
    !defined(seo.title) || seo.title == "" ||
    !defined(seo.description) || seo.description == ""
  )]|order(title asc)[0...20]{
    title,
    "slug": slug.current,
    "hasSeoTitle": defined(seo.title) && seo.title != "",
    "hasSeoDesc": defined(seo.description) && seo.description != ""
  }
}`;

function mapSeoIssues(raw: {
  services: {
    title?: string;
    slug?: string;
    hasSeoTitle?: boolean;
    hasSeoDesc?: boolean;
    faqCount?: number;
  }[];
  blogs: { title?: string; slug?: string; hasSeoTitle?: boolean; hasSeoDesc?: boolean }[];
}): SeoIssue[] {
  const issues: SeoIssue[] = [];

  for (const s of raw.services ?? []) {
    if (!s.slug) continue;
    const parts: string[] = [];
    if (!s.hasSeoTitle) parts.push("missing title");
    if (!s.hasSeoDesc) parts.push("missing description");
    if ((s.faqCount ?? 0) < 8) parts.push(`FAQs: ${s.faqCount ?? 0}/8`);
    if (parts.length === 0) continue;
    issues.push({
      type: "service",
      title: s.title ?? s.slug,
      slug: s.slug,
      issue: parts.join(", "),
    });
  }

  for (const b of raw.blogs ?? []) {
    if (!b.slug) continue;
    const parts: string[] = [];
    if (!b.hasSeoTitle) parts.push("missing title");
    if (!b.hasSeoDesc) parts.push("missing description");
    if (parts.length === 0) continue;
    issues.push({
      type: "blog",
      title: b.title ?? b.slug,
      slug: b.slug,
      issue: parts.join(", "),
    });
  }

  return issues;
}

export async function fetchSeoIssues(): Promise<SeoIssue[]> {
  if (isPrismaCmsEnabled()) {
    const raw = await getSeoIssuesFromDb().catch(() => null);
    if (raw) return mapSeoIssues(raw);
  }

  const raw = await sanityFetch<{
    services: {
      title?: string;
      slug?: string;
      hasSeoTitle?: boolean;
      hasSeoDesc?: boolean;
      faqCount?: number;
    }[];
    blogs: { title?: string; slug?: string; hasSeoTitle?: boolean; hasSeoDesc?: boolean }[];
  }>(seoIssuesQuery);

  return mapSeoIssues(raw ?? { services: [], blogs: [] });
}
