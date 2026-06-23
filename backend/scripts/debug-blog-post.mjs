import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";
import { sanitizeWpContentHtml } from "./lib/wp-sanitize.mjs";
import * as cheerio from "cheerio";

const path = process.argv[2] || "/hair-transplant-techniques-comparison";
const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const post = await client.fetch(`*[_type=="blogPost" && legacyPath==$p][0]{body}`, { p: path });
const index = await getWpLinkIndex();
const wp = await fetchWpItem("post", index.byPath.get(path).id);
const html = sanitizeWpContentHtml(wp.content.rendered);
const $ = cheerio.load(`<div>${html}</div>`);

const imgs = [];
$("img").each((_, el) => {
  const tag = $(el);
  imgs.push({
    src: tag.attr("src"),
    dataSrc: tag.attr("data-src"),
    dataLazySrc: tag.attr("data-lazy-src"),
    alt: tag.attr("alt"),
  });
});

const h2s = [];
$("h2, h3").each((_, el) => {
  h2s.push({ tag: el.tagName, text: $(el).text().trim().slice(0, 80) });
});

console.log("Path:", path);
console.log("WP images:", imgs.length);
console.log(JSON.stringify(imgs.slice(0, 5), null, 2));
console.log("Sanity image blocks:", (post?.body ?? []).filter((b) => b._type === "image").length);
console.log(
  "Sanity h2/h3:",
  (post?.body ?? []).filter((b) => b.style === "h2").length,
  (post?.body ?? []).filter((b) => b.style === "h3").length,
);
console.log("WP headings:", h2s.length);
console.log(h2s.slice(0, 8));

const svc = await client.fetch(
  `*[_type=="service" && legacyPath=="/hair-transplant-in-delhi/beard"][0]{ "imgInBody": count(whatIsBody[_type=="image"]) }`,
);
console.log("Service beard image blocks in body:", svc?.imgInBody);
