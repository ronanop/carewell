#!/usr/bin/env node
/**
 * Re-import service page text (and images) from WordPress into Sanity.
 *
 *   npm run cms:reimport-service-bodies
 *   npm run cms:reimport-service-bodies -- --limit=5
 *   npm run cms:reimport-service-bodies -- --path=/about
 */
import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";
import { SanityAssetUploader } from "./lib/sanity-asset-upload.mjs";
import { wpPageToSanityDoc } from "./lib/wp-to-sanity-doc.mjs";
import { fetchWpItem, getWpLinkIndex } from "./lib/wordpress-api.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const PATHS = process.argv
  .filter((a) => a.startsWith("--path="))
  .map((a) => a.slice("--path=".length));

const LIMIT = (() => {
  const arg = process.argv.find((a) => a.startsWith("--limit="));
  return arg ? Math.max(1, Number(arg.split("=")[1]) || 0) : 0;
})();

const SKIP_PATHS = new Set(["/blog"]);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const sanity = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const uploader = new SanityAssetUploader(sanity);

const services = await sanity.fetch(
  `*[_type == "service" && defined(legacyPath) && locale != "hi"]{ _id, legacyPath, title }|order(legacyPath asc)`,
);

const candidates = services.filter((s) => !SKIP_PATHS.has(s.legacyPath));
const slice = PATHS.length
  ? candidates.filter((p) => PATHS.includes(p.legacyPath))
  : LIMIT
    ? candidates.slice(0, LIMIT)
    : candidates;

const index = await getWpLinkIndex();

let ok = 0;
let fail = 0;

console.log(`Re-importing content for ${slice.length} services…`);

for (let i = 0; i < slice.length; i++) {
  const row = slice[i];
  const entry = index.byPath.get(row.legacyPath);
  if (!entry || entry.kind !== "page") {
    console.warn(`  skip no WP page: ${row.legacyPath}`);
    fail += 1;
    continue;
  }

  const wp = await fetchWpItem("page", entry.id);
  if (!wp) {
    console.warn(`  FAIL fetch: ${row.legacyPath}`);
    fail += 1;
    continue;
  }

  try {
    const doc = await wpPageToSanityDoc(wp, row.legacyPath, uploader);
    const imgCount = (doc.whatIsBody ?? []).filter((b) => b._type === "image").length;
    await sanity
      .patch(row._id)
      .set({
        title: doc.title,
        tagline: doc.tagline,
        treatmentDropdownLabel: doc.treatmentDropdownLabel,
        whatIsBody: doc.whatIsBody,
        faq: doc.faq,
        seo: doc.seo,
        heroImage: doc.heroImage,
        youtubeVideoId: doc.youtubeVideoId,
      })
      .commit();
    ok += 1;
    if ((i + 1) % 10 === 0 || i === slice.length - 1) {
      console.log(
        `  ${i + 1}/${slice.length} (${ok} ok, ${fail} fail, ${uploader.refByUrl.size} images uploaded)`,
      );
    }
  } catch (err) {
    console.warn(`  FAIL ${row.legacyPath}:`, err instanceof Error ? err.message : err);
    fail += 1;
  }
}

console.log(`\nDone: ${ok} updated, ${fail} failed`);
