/**
 * Export service slugs from Sanity for bulk content migration (CSV-friendly).
 * Usage: node scripts/list-services-for-import.mjs
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true });

const q = `*[_type == "service" && defined(slug.current)]|order(title asc){ title, "slug": slug.current, locale }`;

const rows = await client.fetch(q);
console.log(["title", "slug", "locale"].join("\t"));
for (const row of rows) {
  console.log([row.title, row.slug, row.locale ?? "en"].join("\t"));
}
