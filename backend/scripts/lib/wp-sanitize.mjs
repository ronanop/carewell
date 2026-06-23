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
  "nav",
  ".breadcrumb",
  ".breadcrumbs",
  ".wp-block-post-author",
  ".jp-relatedposts",
  ".related-posts",
  ".post-navigation",
  ".navigation",
].join(", ");

export function sanitizeWpContentHtml(html) {
  if (!html?.trim()) return "";
  const $ = cheerio.load(`<div id="wp-sanitize-root">${html}</div>`, { decodeEntities: false });
  $(STRIP_SELECTORS).remove();
  $("iframe[src*='google.com/maps']").remove();
  return $("#wp-sanitize-root").html()?.trim() ?? "";
}
