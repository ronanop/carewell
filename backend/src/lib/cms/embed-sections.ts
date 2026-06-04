import type { PortableTextBlock } from "@portabletext/types";
import type { ServiceDoc } from "@/types/service";
import { getBlogPostsList, getGalleryItems, getServiceBySlug } from "@/lib/cms/queries";

export type PageSectionType =
  | "pricing"
  | "emi-calculator"
  | "candidate"
  | "how-it-works"
  | "before-after"
  | "faq"
  | "highlighted-blogs";

export type EmbedSectionBlock = {
  _type: "embedSection";
  _key: string;
  sectionType: PageSectionType;
  serviceSlug?: string | null;
};

export type HighlightedBlog = {
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  category?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
};

export type BeforeAfterCase = {
  beforeUrl?: string | null;
  afterUrl?: string | null;
  patientInitials?: string;
  subtype?: string;
};

export type ResolvedEmbedSection = {
  service: ServiceDoc | null;
  blogs: HighlightedBlog[];
  galleryCases: BeforeAfterCase[];
};

const SECTION_TYPES = new Set<string>([
  "pricing",
  "emi-calculator",
  "candidate",
  "how-it-works",
  "before-after",
  "faq",
  "highlighted-blogs",
]);

function isEmbedBlock(block: PortableTextBlock): boolean {
  if (block._type !== "embedSection") return false;
  const sectionType = String((block as unknown as EmbedSectionBlock).sectionType ?? "");
  return SECTION_TYPES.has(sectionType);
}

export async function resolveEmbedSectionContext(
  blocks: PortableTextBlock[] | null | undefined,
): Promise<Record<string, ResolvedEmbedSection>> {
  if (!blocks?.length) return {};

  const embedBlocks = blocks.filter(isEmbedBlock) as unknown as EmbedSectionBlock[];
  if (!embedBlocks.length) return {};

  const serviceSlugs = Array.from(
    new Set(embedBlocks.map((b) => b.serviceSlug).filter(Boolean) as string[]),
  );
  const serviceMap = new Map<string, ServiceDoc | null>();
  await Promise.all(
    serviceSlugs.map(async (slug) => {
      serviceMap.set(slug, await getServiceBySlug(slug));
    }),
  );

  let blogsCache: HighlightedBlog[] | null = null;
  let galleryCache: BeforeAfterCase[] | null = null;

  const result: Record<string, ResolvedEmbedSection> = {};

  for (const block of embedBlocks) {
    const service = block.serviceSlug ? (serviceMap.get(block.serviceSlug) ?? null) : null;

    if (block.sectionType === "highlighted-blogs" && !blogsCache) {
      const posts = await getBlogPostsList();
      blogsCache = posts
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
        .slice(0, 3)
        .map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt ?? undefined,
          coverUrl: p.coverUrl,
          category: p.category ?? undefined,
          publishedAt: p.publishedAt ?? undefined,
          readTimeMinutes: p.readTimeMinutes ?? undefined,
        }));
    }

    if (block.sectionType === "before-after" && !service?.beforeAfterCases?.length && !galleryCache) {
      const gallery = await getGalleryItems();
      galleryCache = gallery.map((g) => ({
        beforeUrl: g.beforeUrl ?? null,
        afterUrl: g.afterUrl ?? null,
        patientInitials: g.title,
        subtype: g.category ?? undefined,
      }));
    }

    result[block._key] = {
      service,
      blogs: blogsCache ?? [],
      galleryCases: galleryCache ?? [],
    };
  }

  return result;
}