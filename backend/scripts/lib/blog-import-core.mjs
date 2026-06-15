/**
 * Shared scrape → BlogPost import logic (legacyPath-first).
 */
import {
  normalizeLegacyPath,
  legacyPathFromUrl,
  slugFromLegacyPath,
} from "./legacy-path.mjs";
import { htmlToPortableText, resetPortableKeys } from "./html-to-portable.mjs";
import { portableTextFromBody } from "./sanity-portable.mjs";
import { createImageResolver } from "./wp-image-import.mjs";

const SKIP_LEGACY_PATHS = new Set(["/", "/blog"]);

/**
 * @param {Record<string, unknown>} raw
 */
export function resolveBlogImportMeta(raw) {
  const url = String(raw.url ?? "");
  const legacyPath = normalizeLegacyPath(
    raw.legacyPath ? String(raw.legacyPath) : legacyPathFromUrl(url),
  );
  const slug = slugFromLegacyPath(legacyPath);
  const id = `blog-${slug}`;
  return { url, legacyPath, slug, id };
}

function estimateReadMinutes(text) {
  const words = String(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function excerptFromPreview(preview, title) {
  const meta = String(preview.metaDescription ?? "").trim();
  if (meta.length > 40) return meta.slice(0, 320);
  const plain = String(preview.bodyText ?? preview.fullBody ?? "").trim();
  if (plain.length > 40) return plain.slice(0, 320);
  return `${title} — Care Well Medical Centre, Delhi.`;
}

/**
 * @param {Record<string, unknown>} preview
 * @param {{ resolveImage: (url: string, alt: string) => Promise<{ url: string, mediaId?: string | null } | null> }} deps
 */
export async function buildBlogPayload(preview, deps) {
  const { legacyPath, slug, id } = resolveBlogImportMeta(preview);
  resetPortableKeys();

  const title =
    String(preview.h1 ?? preview.title ?? "")
      .replace(/\s*\|\s*Care Well.*$/i, "")
      .trim() || slug.replace(/-/g, " ");

  let body;
  if (preview.bodyHtml && String(preview.bodyHtml).trim().length > 40) {
    body = await htmlToPortableText(String(preview.bodyHtml), {
      resolveImage: deps.resolveImage,
    });
  }
  if (!body?.length) {
    const plain = preview.bodyText ?? preview.fullBody ?? "";
    body = portableTextFromBody(String(plain));
  }

  const plainBody = String(preview.bodyText ?? preview.fullBody ?? "");
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "").replace(/\/$/, "");
  const canonical = siteUrl ? `${siteUrl}${legacyPath}/` : null;

  let coverImageId = null;
  const heroUrl = preview.heroImageUrl ? String(preview.heroImageUrl) : null;
  if (heroUrl) {
    const hero = await deps.resolveImage(heroUrl, title);
    coverImageId = hero?.mediaId ?? null;
  }

  return {
    id,
    slug,
    legacyPath,
    title,
    excerpt: excerptFromPreview(preview, title),
    body,
    coverImageId,
    featured: false,
    readTimeMinutes: estimateReadMinutes(plainBody),
    seoTitle: preview.title
      ? `${String(preview.title).replace(/\s*\|\s*Care Well.*$/i, "").trim()} | Care Well`
      : `${title} | Care Well Medical Centre`,
    seoDescription:
      String(preview.metaDescription ?? "").trim() ||
      excerptFromPreview(preview, title),
    seoCanonicalUrl: canonical,
  };
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function upsertImportedBlog(prisma, payload) {
  const { id, ...data } = payload;

  await prisma.$transaction(async (tx) => {
    await tx.blogPost.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });

    const from = `/blog/${payload.slug}`;
    const to = `${payload.legacyPath}/`;
    await tx.redirect.upsert({
      where: { fromPath: from },
      create: { fromPath: from, toPath: to, statusCode: 301 },
      update: { toPath: to, statusCode: 301 },
    });
  });
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {Record<string, unknown>} preview
 */
export async function importBlogScrapePreview(prisma, preview) {
  const { legacyPath } = resolveBlogImportMeta(preview);
  if (SKIP_LEGACY_PATHS.has(legacyPath)) {
    return { skipped: true, reason: "hub path", legacyPath };
  }

  const resolveImage = createImageResolver(prisma);
  const payload = await buildBlogPayload(preview, { resolveImage });
  await upsertImportedBlog(prisma, payload);
  return { skipped: false, legacyPath, slug: payload.slug, id: payload.id };
}

export { SKIP_LEGACY_PATHS as SKIP_BLOG_LEGACY_PATHS };
