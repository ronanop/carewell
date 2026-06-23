import { htmlToPortableText, resetPortableKeys } from "./html-to-portable.mjs";
import { slugFromLegacyPath, categoryIdFromLegacyPath } from "./legacy-path.mjs";
import { sanitizeWpContentHtml } from "./wp-sanitize.mjs";

function decodeHtmlEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtmlTags(html) {
  return decodeHtmlEntities(String(html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function extractFaqsFromYoast(yoast) {
  const graph = yoast?.schema?.["@graph"];
  if (!Array.isArray(graph)) return [];
  return graph
    .filter((node) => {
      if (!node || typeof node !== "object") return false;
      const t = node["@type"];
      return t === "Question" || (Array.isArray(t) && t.includes("Question"));
    })
    .map((node) => ({
      question: String(node.name ?? "").trim(),
      answer: String(node.acceptedAnswer?.text ?? "").trim(),
    }))
    .filter((f) => f.question.length > 0);
}

function extractYoutubeId(html) {
  const match =
    html.match(/data-videoid=["']([a-zA-Z0-9_-]{11})["']/i) ||
    html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i) ||
    html.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  return match?.[1];
}

function readTimeFromYoast(yoast) {
  const raw = yoast?.twitter_misc?.["Est. reading time"];
  if (!raw) return undefined;
  const match = raw.match(/(\d+)/);
  return match ? Number(match[1]) : undefined;
}

function buildSeoBlock(yoast, ogImageField) {
  if (!yoast && !ogImageField) return undefined;
  const title = yoast?.title?.trim();
  const description = yoast?.description?.trim();
  if (!title && !description && !yoast?.canonical && !ogImageField) return undefined;

  return {
    _type: "seo",
    title: title || undefined,
    description: description || undefined,
    canonicalUrl: yoast?.canonical || undefined,
    ogTitle: yoast?.og_title || undefined,
    ogDescription: yoast?.og_description || undefined,
    ogImage: ogImageField,
    noindex: yoast?.robots?.index === "noindex",
  };
}

/**
 * @param {import('./sanity-asset-upload.mjs').SanityAssetUploader} uploader
 */
export async function wpPageToSanityDoc(page, legacyPath, uploader) {
  const yoast = page.yoast_head_json;
  const rawHtml = page.content?.rendered ?? "";
  const sanitized = sanitizeWpContentHtml(rawHtml);
  const title = decodeHtmlEntities(page.title?.rendered ?? "Care Well");
  const slug = slugFromLegacyPath(legacyPath);
  const categoryRef = categoryIdFromLegacyPath(legacyPath) ?? "cat-body";
  const heroUrl = yoast?.og_image?.[0]?.url ?? null;

  resetPortableKeys();
  const rawPortable = await htmlToPortableText(sanitized, {
    resolveImage: async (url, alt) => {
      const assetRef = await uploader.uploadFromUrl(url, alt);
      return assetRef ? { assetRef } : null;
    },
  });
  const whatIsBody = await uploader.normalizePortableImages(rawPortable);

  const heroImage = heroUrl ? await uploader.imageField(heroUrl, title) : undefined;
  const seo = buildSeoBlock(yoast, heroImage);

  const faqs = extractFaqsFromYoast(yoast).map((f) => ({
    _type: "faqItem",
    _key: `faq-${f.question.slice(0, 40).replace(/\W+/g, "-")}`,
    question: f.question,
    answer: f.answer,
  }));

  const tagline = yoast?.description?.trim() || stripHtmlTags(page.excerpt?.rendered ?? "") || undefined;

  return {
    _id: `svc-wp-${page.id}`,
    _type: "service",
    title,
    slug: { _type: "slug", current: slug },
    legacyPath,
    locale: "en",
    category: { _type: "reference", _ref: categoryRef },
    tagline,
    treatmentDropdownLabel: title,
    whatIsBody,
    youtubeVideoId: extractYoutubeId(rawHtml),
    heroImage,
    faq: faqs.length ? faqs : undefined,
    seo,
    wpSourceId: page.id,
    wpSourceLink: page.link,
  };
}

export async function wpPostToSanityDoc(post, legacyPath, uploader) {
  const yoast = post.yoast_head_json;
  const rawHtml = post.content?.rendered ?? "";
  const sanitized = sanitizeWpContentHtml(rawHtml);
  const title = decodeHtmlEntities(post.title?.rendered ?? "Blog");
  const slug = post.slug || slugFromLegacyPath(legacyPath);
  const coverUrl = yoast?.og_image?.[0]?.url ?? null;

  resetPortableKeys();
  const rawPortable = await htmlToPortableText(sanitized, {
    resolveImage: async (url, alt) => {
      const assetRef = await uploader.uploadFromUrl(url, alt);
      return assetRef ? { assetRef } : null;
    },
  });
  const body = await uploader.normalizePortableImages(rawPortable);

  const coverImage = coverUrl ? await uploader.imageField(coverUrl, title) : undefined;
  const seo = buildSeoBlock(yoast, coverImage);

  return {
    _id: `blog-wp-${post.id}`,
    _type: "blogPost",
    title,
    slug: { _type: "slug", current: slug },
    legacyPath,
    excerpt: stripHtmlTags(post.excerpt?.rendered ?? "") || undefined,
    body,
    publishedAt: post.date ? new Date(post.date).toISOString() : undefined,
    updatedAt: post.modified ? new Date(post.modified).toISOString() : undefined,
    readTimeMinutes: readTimeFromYoast(yoast) ?? 5,
    coverImage,
    seo,
    wpSourceId: post.id,
    wpSourceLink: post.link,
  };
}

export const SERVICE_CATEGORIES = [
  { _id: "cat-hair", title: "Hair", slug: "hair", key: "hair" },
  { _id: "cat-skin-vitiligo", title: "Skin & Vitiligo", slug: "skin-vitiligo", key: "skinVitiligo" },
  { _id: "cat-face", title: "Face", slug: "face", key: "face" },
  { _id: "cat-body", title: "Body", slug: "body", key: "body" },
  { _id: "cat-therapies", title: "Therapies", slug: "therapies", key: "therapies" },
];

export function categorySeedDoc(cat) {
  return {
    _id: cat._id,
    _type: "serviceCategory",
    title: cat.title,
    slug: { _type: "slug", current: cat.slug },
    megaMenuKey: cat.key,
    heroSubtitle: `${cat.title} treatments at Care Well Medical Centre.`,
    seo: {
      _type: "seo",
      title: `${cat.title} Treatments in Delhi | Care Well`,
      description: `${cat.title} treatment options in Delhi NCR by Care Well Medical Centre.`,
    },
  };
}
