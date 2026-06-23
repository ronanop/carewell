import type { PortableTextBlock } from "@portabletext/types";
import type { ServiceDoc } from "@/types/service";

type SanityServiceRow = {
  title?: string;
  slug?: { current?: string };
  tagline?: string;
  locale?: string;
  heroImageUrl?: string | null;
  whatIsBody?: PortableTextBlock[];
  whatIsIllustrationUrl?: string | null;
  insightPoints?: string[];
  howItWorksSteps?: { title?: string; description?: string }[];
  youtubeVideoId?: string;
  beforeAfterCases?: ServiceDoc["beforeAfterCases"];
  candidateGood?: string[];
  candidatePoor?: string[];
  pricingFromInr?: number;
  pricingFactors?: string[];
  pricingEmiNote?: string;
  valueStack?: string[];
  faq?: { question?: string; answer?: string }[];
  relatedServices?: { title?: string; slug?: { current?: string }; treatmentDropdownLabel?: string }[];
  treatmentDropdownLabel?: string;
  seo?: ServiceDoc["seo"];
  category?: { title?: string; slug?: { current?: string }; megaMenuKey?: string };
  ogImageUrl?: string;
};

export function mapSanityService(row: SanityServiceRow | null): (ServiceDoc & Record<string, unknown>) | null {
  if (!row?.title || !row.slug?.current) return null;

  return {
    title: row.title,
    slug: { current: row.slug.current },
    tagline: row.tagline,
    locale: row.locale,
    heroImageUrl: row.heroImageUrl ?? null,
    quickFacts: undefined,
    whatIsBody: row.whatIsBody,
    whatIsIllustrationUrl: row.whatIsIllustrationUrl ?? null,
    insightPoints: row.insightPoints,
    howItWorksSteps: row.howItWorksSteps,
    youtubeVideoId: row.youtubeVideoId,
    beforeAfterCases: row.beforeAfterCases,
    candidateGood: row.candidateGood,
    candidatePoor: row.candidatePoor,
    pricingFromInr: row.pricingFromInr,
    pricingFactors: row.pricingFactors,
    pricingEmiNote: row.pricingEmiNote,
    valueStack: row.valueStack,
    faq: row.faq,
    relatedServices: row.relatedServices,
    treatmentDropdownLabel: row.treatmentDropdownLabel,
    seo: row.seo,
    category: row.category
      ? {
          title: row.category.title,
          slug: { current: row.category.slug?.current ?? "" },
          megaMenuKey: row.category.megaMenuKey,
        }
      : undefined,
    ogImageUrl: row.ogImageUrl ?? row.seo?.ogImageUrl,
  };
}

type SanityBlogRow = {
  title?: string;
  slug?: string | { current?: string };
  excerpt?: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
  updatedAt?: string;
  readTimeMinutes?: number;
  coverUrl?: string;
  ogImageUrl?: string;
  author?: { name?: string; credentials?: string; imageUrl?: string | null };
  relatedPosts?: {
    title?: string;
    slug?: string | { current?: string };
    legacyPath?: string | null;
    excerpt?: string | null;
    readTimeMinutes?: number | null;
    coverUrl?: string;
  }[];
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    noindex?: boolean;
  };
};

function slugValue(slug: string | { current?: string } | undefined): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current ?? "";
}

export function mapSanityBlogPost(row: SanityBlogRow | null) {
  if (!row?.title) return null;
  const slug = slugValue(row.slug);

  return {
    title: row.title,
    slug,
    excerpt: row.excerpt,
    body: row.body,
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt,
    readTimeMinutes: row.readTimeMinutes ?? 5,
    coverUrl: row.coverUrl ?? row.ogImageUrl ?? row.seo?.ogImageUrl,
    author: row.author,
    relatedPosts: (row.relatedPosts ?? []).map((p) => ({
      title: p.title,
      slug: slugValue(p.slug),
      legacyPath: p.legacyPath,
      excerpt: p.excerpt,
      readTimeMinutes: p.readTimeMinutes,
      coverUrl: p.coverUrl,
    })),
    seo: row.seo,
  };
}
