import * as cheerio from "cheerio";

const STRIP_SELECTORS = [
  "script",
  "style",
  "noscript",
  "form",
  ".wpcf7",
  ".ti-widget",
  "pre.ti-widget",
  "[data-src*='trustindex']",
  ".wp-block-buttons",
  ".schema-faq",
  ".wp-block-yoast-faq-block",
].join(", ");

/** Remove WP-only widgets and scripts before portable-text conversion. */
export function sanitizeWpContentHtml(html: string): string {
  if (!html?.trim()) return "";
  const $ = cheerio.load(`<div id="wp-sanitize-root">${html}</div>`, { decodeEntities: false });
  $(STRIP_SELECTORS).remove();
  $("iframe[src*='google.com/maps']").remove();
  return $("#wp-sanitize-root").html()?.trim() ?? "";
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripHtmlTags(html: string): string {
  if (!html?.trim()) return "";
  return decodeHtmlEntities(cheerio.load(html).text());
}
