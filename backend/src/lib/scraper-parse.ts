import * as cheerio from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";

export type TreatmentCard = {
  title: string;
  excerpt?: string;
  href?: string;
  image?: string;
};

export type FaqItem = {
  question: string;
  answer?: string;
};

export type ContentSection = {
  heading: string;
  paragraphs: string[];
};

export type ScrapePreview = {
  url: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  headings: string[];
  /** @deprecated Use introParagraphs or bodyText — kept for backward compatibility */
  bodySnippet: string | null;
  introParagraphs: string[];
  sections: ContentSection[];
  treatmentCards: TreatmentCard[];
  faqs: FaqItem[];
  bodyText: string;
  /** Cleaned entry-content HTML (images, lists, tables preserved) for CMS import. */
  bodyHtml: string | null;
  /** og:image or first in-content image — used as hero during import. */
  heroImageUrl: string | null;
  /** All image URLs found in body (for Cloudinary migration). */
  contentImageUrls: string[];
  breadcrumbs?: string[];
};

const BODY_SNIPPET_MAX = 480;
const MIN_PARAGRAPH_LEN = 30;
const EXCLUDED_CONTENT_SELECTORS =
  "script, style, noscript, nav, header, footer, aside, .site-footer, #colophon, .widget, .rishi-footer-widgets-one, .rishi-footer-widgets-two, .rishi-footer-widgets-three, #breadcrumbs, #crumbs, .rishi-breadcrumb-main-wrap";

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'");
}

function normalizeText(text: string): string {
  return decodeEntities(text.replace(/\s+/g, " ").trim());
}

function resolveImgSrc($: CheerioAPI, img: Cheerio<AnyNode>): string | undefined {
  if (!img.length) return undefined;
  const candidates = [img.attr("data-src"), img.attr("data-lazy-src"), img.attr("src")];
  for (const raw of candidates) {
    if (!raw) continue;
    if (raw.startsWith("data:")) continue;
    return raw;
  }
  return undefined;
}

function absoluteUrl(raw: string | undefined, pageUrl: string): string | null {
  if (!raw || raw.startsWith("data:")) return null;
  try {
    return new URL(raw, pageUrl).href;
  } catch {
    return null;
  }
}

const BODY_HTML_STRIP_SELECTORS = [
  ...EXCLUDED_CONTENT_SELECTORS.split(", "),
  ".schema-faq",
  ".wp-block-yoast-faq-block",
  ".schema-faq-section",
  "script",
  "style",
  "noscript",
  ".yt-lite-wrap",
  "#cookie-banner",
].join(", ");

function extractBodyHtml($: CheerioAPI, root: Cheerio<AnyNode>): string | null {
  const clone = root.clone();
  clone.find(BODY_HTML_STRIP_SELECTORS).remove();
  clone.find("h1.entry-title, h1").first().remove();

  const html = clone.html()?.trim() ?? "";
  if (html.length < 40) return null;
  return html;
}

function collectContentImageUrls(
  $: CheerioAPI,
  root: Cheerio<AnyNode>,
  pageUrl: string,
): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];

  root.find("img").each((_, el) => {
    const src = resolveImgSrc($, $(el));
    const abs = absoluteUrl(src, pageUrl);
    if (!abs || seen.has(abs)) return;
    seen.add(abs);
    urls.push(abs);
  });

  return urls;
}

function extractHeroImageUrl(
  $: CheerioAPI,
  root: Cheerio<AnyNode>,
  pageUrl: string,
  contentImageUrls: string[],
): string | null {
  const og =
    $('meta[property="og:image"]').attr("content") ??
    $('meta[name="twitter:image"]').attr("content");
  const fromOg = absoluteUrl(og, pageUrl);
  if (fromOg) return fromOg;

  const featured = root.find("img.wp-post-image, .post-thumbnail img").first();
  const fromFeatured = absoluteUrl(resolveImgSrc($, featured), pageUrl);
  if (fromFeatured) return fromFeatured;

  return contentImageUrls[0] ?? null;
}

function collectJsonLdNodes(data: unknown): Record<string, unknown>[] {
  if (!data || typeof data !== "object") return [];
  const record = data as Record<string, unknown>;
  if (Array.isArray(record["@graph"])) {
    return record["@graph"] as Record<string, unknown>[];
  }
  if (Array.isArray(data)) {
    return data.filter((item): item is Record<string, unknown> => !!item && typeof item === "object");
  }
  return [record];
}

function jsonLdNodeType(node: Record<string, unknown>): string | string[] | undefined {
  return node["@type"] as string | string[] | undefined;
}

function isType(node: Record<string, unknown>, type: string): boolean {
  const t = jsonLdNodeType(node);
  if (!t) return false;
  return Array.isArray(t) ? t.includes(type) : t === type;
}

function answerFromJsonLd(node: Record<string, unknown>): string | undefined {
  const accepted = node.acceptedAnswer as Record<string, unknown> | undefined;
  if (!accepted) return undefined;
  const text = accepted.text;
  return typeof text === "string" ? normalizeText(text) : undefined;
}

function findMainContent($: CheerioAPI): Cheerio<AnyNode> {
  const selectors = [
    "article .entry-content",
    ".entry-content",
    ".post-content",
    ".page-content",
    "main#primary article",
    "main#primary",
    "main article",
    "main.site-main",
    "main",
    "#main",
    ".site-main",
    ".content-area",
    "#content",
    "#primary",
    ".rishi-container",
  ];
  for (const selector of selectors) {
    const el = $(selector).first();
    if (el.length && normalizeText(el.text()).length > 80) return el;
  }
  for (const selector of selectors) {
    const el = $(selector).first();
    if (el.length) return el;
  }
  return $("body");
}

function extractTitle($: CheerioAPI): string | null {
  const og = $('meta[property="og:title"]').attr("content");
  if (og) return normalizeText(og);
  const title = $("title").first().text();
  return title ? normalizeText(title) : null;
}

function extractMetaDescription($: CheerioAPI): string | null {
  const meta =
    $('meta[name="description"]').attr("content") ??
    $('meta[property="og:description"]').attr("content");
  return meta ? normalizeText(meta) : null;
}

function extractH1($: CheerioAPI, root: Cheerio<AnyNode>): string | null {
  const fromArticle = $("article .entry-title, h1.entry-title").first().text();
  if (fromArticle) return normalizeText(fromArticle);
  const fromRoot = root.find("h1").first().text();
  return fromRoot ? normalizeText(fromRoot) : null;
}

function extractBreadcrumbs($: CheerioAPI): string[] {
  const crumbs: string[] = [];

  $("#breadcrumbs a, .rishi-breadcrumbs a, #crumbs a").each((_, el) => {
    const text = normalizeText($(el).text());
    if (text) crumbs.push(text);
  });

  $("script[type='application/ld+json']").each((_, script) => {
    try {
      const raw = $(script).html();
      if (!raw) return;
      const data = JSON.parse(raw) as unknown;
      for (const node of collectJsonLdNodes(data)) {
        if (!isType(node, "BreadcrumbList")) continue;
        const items = node.itemListElement;
        if (!Array.isArray(items)) continue;
        for (const item of items) {
          if (!item || typeof item !== "object") continue;
          const record = item as Record<string, unknown>;
          const name = typeof record.name === "string" ? normalizeText(record.name) : "";
          if (name) crumbs.push(name);
        }
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  });

  const deduped: string[] = [];
  const seen = new Set<string>();
  for (const crumb of crumbs) {
    if (seen.has(crumb)) continue;
    seen.add(crumb);
    deduped.push(crumb);
  }
  return deduped;
}

function pushFaq(faqs: FaqItem[], seen: Set<string>, question: string, answer?: string) {
  if (!question || question.length < 8 || seen.has(question)) return;
  seen.add(question);
  faqs.push({ question, answer: answer || undefined });
}

function extractJsonLdFaqs($: CheerioAPI): FaqItem[] {
  const faqs: FaqItem[] = [];
  const seen = new Set<string>();

  $("script[type='application/ld+json']").each((_, script) => {
    try {
      const raw = $(script).html();
      if (!raw) return;
      const data = JSON.parse(raw) as unknown;
      for (const node of collectJsonLdNodes(data)) {
        if (isType(node, "FAQPage")) {
          const mainEntity = node.mainEntity;
          const items = Array.isArray(mainEntity) ? mainEntity : mainEntity ? [mainEntity] : [];
          for (const item of items) {
            if (!item || typeof item !== "object") continue;
            const qNode = item as Record<string, unknown>;
            if (!isType(qNode, "Question")) continue;
            const question = typeof qNode.name === "string" ? normalizeText(qNode.name) : "";
            pushFaq(faqs, seen, question, answerFromJsonLd(qNode));
          }
        }
        if (isType(node, "Question")) {
          const question = typeof node.name === "string" ? normalizeText(node.name) : "";
          pushFaq(faqs, seen, question, answerFromJsonLd(node));
        }
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  });

  return faqs;
}

function extractHtmlFaqs($: CheerioAPI, root: Cheerio<AnyNode>): FaqItem[] {
  const faqs: FaqItem[] = [];
  const seen = new Set<string>();

  const push = (question: string, answer?: string) => {
    if (!question || seen.has(question)) return;
    seen.add(question);
    faqs.push({ question, answer: answer || undefined });
  };

  root.find(".schema-faq-section, .wp-block-yoast-faq-block .schema-faq-section").each((_, section) => {
    const $section = $(section);
    const question = normalizeText($section.find(".schema-faq-question").first().text());
    const answer = normalizeText($section.find(".schema-faq-answer").first().text());
    push(question, answer);
  });

  root.find(".wp-block-yoast-faq-block h3, .yoast-faq-question").each((_, el) => {
    const $el = $(el);
    const question = normalizeText($el.text());
    const answer = normalizeText($el.next(".schema-faq-answer, .yoast-faq-answer, p, div").first().text());
    push(question, answer);
  });

  root.find("details").each((_, detail) => {
    const $detail = $(detail);
    const question = normalizeText($detail.find("summary").first().text());
    const answer = normalizeText($detail.find("p").first().text());
    push(question, answer);
  });

  root.find(".faq, .accordion, [class*='faq']").each((_, block) => {
    const $block = $(block);
    $block.find("h3, h4, button, .faq-question, [class*='question']").each((__, qEl) => {
      const question = normalizeText($(qEl).text());
      const answer = normalizeText($(qEl).next("p, div").first().text());
      push(question, answer);
    });
  });

  return faqs;
}

function extractFaqs($: CheerioAPI, root: Cheerio<AnyNode>): FaqItem[] {
  const seen = new Set<string>();
  const faqs: FaqItem[] = [];
  const merge = (items: FaqItem[]) => {
    for (const item of items) {
      pushFaq(faqs, seen, item.question, item.answer);
    }
  };
  merge(extractHtmlFaqs($, root));
  merge(extractJsonLdFaqs($));
  return faqs;
}

function pickColumnLink($: CheerioAPI, col: Cheerio<AnyNode>): string | undefined {
  let best: string | undefined;
  col.find("a[href]").each((_, anchor) => {
    const href = $(anchor).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return;
    if (!best || href.includes("carewell")) best = href;
  });
  return best;
}

function extractTreatmentCards($: CheerioAPI, root: Cheerio<AnyNode>): TreatmentCard[] {
  const cards: TreatmentCard[] = [];
  const seen = new Set<string>();

  const pushCard = (card: TreatmentCard) => {
    if (!card.title || seen.has(card.title)) return;
    seen.add(card.title);
    cards.push(card);
  };

  root.find(".wp-block-column").each((_, col) => {
    const $col = $(col);
    const heading = $col.find("h2, h3, h4").first();
    if (!heading.length) return;
    const title = normalizeText(heading.text());
    if (!title) return;
    pushCard({
      title,
      excerpt: normalizeText($col.find("p").first().text()) || undefined,
      href: pickColumnLink($, $col),
      image: resolveImgSrc($, $col.find("img").first()),
    });
  });

  if (cards.length >= 3) return cards;

  root.find("a[href]").each((_, anchor) => {
    const $anchor = $(anchor);
    const linkText = normalizeText($anchor.text()).toLowerCase();
    if (!linkText.includes("read more") && !linkText.includes("learn more")) return;

    const container = $anchor.closest(".wp-block-column, article, .card, .elementor-column, li, div");
    const heading = container.find("h2, h3, h4").first();
    if (!heading.length) return;
    const title = normalizeText(heading.text());
    pushCard({
      title,
      excerpt: normalizeText(container.find("p").first().text()) || undefined,
      href: $anchor.attr("href"),
      image: resolveImgSrc($, container.find("img").first()),
    });
  });

  return cards;
}

function extractHeadings($: CheerioAPI, root: Cheerio<AnyNode>, h1: string | null): string[] {
  const headings: string[] = [];
  const seen = new Set<string>();

  root.find("h2, h3").each((_, el) => {
    const text = normalizeText($(el).text());
    if (!text || text === h1 || seen.has(text)) return;
    seen.add(text);
    headings.push(text);
  });

  return headings.slice(0, 24);
}

function extractIntroParagraphs(
  $: CheerioAPI,
  root: Cheerio<AnyNode>,
  h1: string | null,
): string[] {
  const paragraphs: string[] = [];
  const seen = new Set<string>();

  root.find("p").each((_, el) => {
    if (paragraphs.length >= 4) return false;
    const text = normalizeText($(el).text());
    if (text.length < MIN_PARAGRAPH_LEN || text === h1 || seen.has(text)) return;
    seen.add(text);
    paragraphs.push(text);
    return undefined;
  });

  return paragraphs;
}

function collectBlockText($: CheerioAPI, el: Cheerio<AnyNode>, seen: Set<string>): string[] {
  const out: string[] = [];
  const add = (text: string) => {
    if (text.length < MIN_PARAGRAPH_LEN || seen.has(text)) return;
    seen.add(text);
    out.push(text);
  };

  if (el.is("p, li, blockquote, figcaption, td")) {
    add(normalizeText(el.text()));
    return out;
  }

  el.find("p, li, blockquote, figcaption").each((_, node) => {
    add(normalizeText($(node).text()));
  });

  if (out.length === 0) {
    const text = normalizeText(el.text());
    if (text.length >= MIN_PARAGRAPH_LEN && !el.is("h1, h2, h3, h4, h5, h6")) {
      add(text);
    }
  }

  return out;
}

function extractSections($: CheerioAPI, root: Cheerio<AnyNode>): ContentSection[] {
  const sections: ContentSection[] = [];

  root.find("h2").each((_, h2) => {
    const heading = normalizeText($(h2).text());
    if (!heading) return;

    const paragraphs: string[] = [];
    const seen = new Set<string>();

    $(h2)
      .nextUntil("h2")
      .each((__, node) => {
        const $node = $(node);
        if ($node.is("h3, h4")) {
          const sub = normalizeText($node.text());
          if (sub.length >= MIN_PARAGRAPH_LEN) {
            addParagraph(seen, paragraphs, sub);
          }
        }
        for (const text of collectBlockText($, $node, seen)) {
          paragraphs.push(text);
        }
      });

    sections.push({ heading, paragraphs });
  });

  return sections;
}

function addParagraph(seen: Set<string>, paragraphs: string[], text: string) {
  if (seen.has(text)) return;
  seen.add(text);
  paragraphs.push(text);
}

function stripBreadcrumbPrefix(text: string, breadcrumbs: string[]): string {
  if (breadcrumbs.length === 0) return text;
  let result = text;
  for (const crumb of breadcrumbs) {
    const prefix = `${crumb} » `;
    if (result.startsWith(prefix)) {
      result = result.slice(prefix.length);
    }
  }
  return result.replace(/^(Home\s*»\s*)+/i, "").trim();
}

function extractBodyText(
  $: CheerioAPI,
  root: Cheerio<AnyNode>,
  breadcrumbs: string[],
): string {
  const clone = root.clone();
  clone.find(EXCLUDED_CONTENT_SELECTORS).remove();
  clone.find(".schema-faq, .wp-block-yoast-faq-block, .schema-faq-section").remove();

  const blocks: string[] = [];
  const seen = new Set<string>();

  clone.find("h1, h2, h3, h4, h5, h6, p, li, figcaption, blockquote, td").each((_, el) => {
    const text = normalizeText($(el).text());
    if (text.length < 3 || seen.has(text)) return;
    seen.add(text);
    blocks.push(text);
  });

  // Capture text in leaf containers (e.g. div-only WP blocks) not already picked up above.
  clone.find("div, span, section, article").each((_, el) => {
    const $el = $(el);
    if ($el.find("p, li, h1, h2, h3, h4, h5, h6, blockquote, td, figcaption").length > 0) return;
    const text = normalizeText($el.text());
    if (text.length < MIN_PARAGRAPH_LEN || seen.has(text)) return;
    seen.add(text);
    blocks.push(text);
  });

  return stripBreadcrumbPrefix(blocks.join("\n\n"), breadcrumbs);
}

function buildBodySnippet(introParagraphs: string[], bodyText: string): string | null {
  const source = introParagraphs[0] ?? bodyText;
  if (!source) return null;
  if (source.length <= BODY_SNIPPET_MAX) return source;
  return `${source.slice(0, BODY_SNIPPET_MAX)}…`;
}

export function parseHtmlPreview(html: string, url: string): ScrapePreview {
  const $ = cheerio.load(html);
  const root = findMainContent($);
  root.find(EXCLUDED_CONTENT_SELECTORS).remove();

  const title = extractTitle($);
  const metaDescription = extractMetaDescription($);
  const h1 = extractH1($, root);
  const breadcrumbs = extractBreadcrumbs($);
  const introParagraphs = extractIntroParagraphs($, root, h1);
  const sections = extractSections($, root);
  const treatmentCards = extractTreatmentCards($, root);
  const faqs = extractFaqs($, root);
  const headings = extractHeadings($, root, h1);
  const bodyText = extractBodyText($, root, breadcrumbs);
  const bodySnippet = buildBodySnippet(introParagraphs, bodyText);
  const bodyHtml = extractBodyHtml($, root);
  const contentImageUrls = collectContentImageUrls($, root, url);
  const heroImageUrl = extractHeroImageUrl($, root, url, contentImageUrls);

  return {
    url,
    title,
    metaDescription,
    h1,
    headings,
    bodySnippet,
    introParagraphs,
    sections,
    treatmentCards,
    faqs,
    bodyText,
    bodyHtml,
    heroImageUrl,
    contentImageUrls,
    breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : undefined,
  };
}

/*
 * Sanity check (cosmetic-treatments-in-delhi sample HTML):
 * - treatmentCards: 12 (.wp-block-column cards with h4 titles)
 * - faqs: 18 (.schema-faq-section or Yoast JSON-LD Question nodes)
 * - headings: entry-content h2/h3 only (no footer widget titles)
 */
