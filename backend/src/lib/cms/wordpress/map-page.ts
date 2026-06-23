import { htmlToPortableText, resetPortableKeys } from "../../../../scripts/lib/html-to-portable.mjs";
import { slugFromLegacyPath } from "@/lib/legacy-path";
import { extractFaqsFromYoast, mapYoastToSeo } from "@/lib/cms/wordpress/yoast";
import { decodeHtmlEntities, sanitizeWpContentHtml } from "@/lib/cms/wordpress/sanitize-html";
import type { ServiceDoc } from "@/types/service";
import type { WpPage } from "@/lib/cms/wordpress/types";

function extractYoutubeId(html: string): string | undefined {
  const match =
    html.match(/data-videoid=["']([a-zA-Z0-9_-]{11})["']/i) ||
    html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i) ||
    html.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  return match?.[1];
}

export async function mapWpPageToService(
  page: WpPage,
  legacyPath: string,
): Promise<ServiceDoc & Record<string, unknown>> {
  const yoast = page.yoast_head_json;
  const rawHtml = page.content?.rendered ?? "";
  const sanitized = sanitizeWpContentHtml(rawHtml);

  resetPortableKeys();
  const whatIsBody = await htmlToPortableText(sanitized);
  const faqs = extractFaqsFromYoast(yoast);
  const heroImageUrl = yoast?.og_image?.[0]?.url ?? null;

  return {
    title: decodeHtmlEntities(page.title?.rendered ?? "Care Well"),
    slug: { current: page.slug || slugFromLegacyPath(legacyPath) },
    heroImageUrl,
    whatIsBody,
    faq: faqs.length ? faqs.map((f) => ({ question: f.question, answer: f.answer })) : undefined,
    youtubeVideoId: extractYoutubeId(rawHtml),
    seo: mapYoastToSeo(yoast),
    ogImageUrl: heroImageUrl ?? undefined,
  };
}
