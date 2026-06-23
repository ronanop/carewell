import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";
import { sanitizeWpContentHtml } from "./lib/wp-sanitize.mjs";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import * as cheerio from "cheerio";

const path = process.argv[2] || "/hair-transplant-techniques-comparison";
loadEnvFiles(repoRoot(import.meta.url));
const idx = await getWpLinkIndex();
const wp = await fetchWpItem("post", idx.byPath.get(path).id);
const html = sanitizeWpContentHtml(wp.content.rendered);
const $ = cheerio.load(`<div>${html}</div>`);

$("img").each((i, el) => {
  const tag = $(el);
  const parent = tag.parent().prop("tagName");
  const grandparent = tag.parent().parent().prop("tagName");
  console.log(i + 1, parent, grandparent, tag.attr("src")?.slice(-40));
});

// find imgs not in simple figure
const htmlRaw = wp.content.rendered;
const allImgTags = htmlRaw.match(/<img[^>]+>/gi) ?? [];
console.log("\nRaw img tags in HTML:", allImgTags.length);
