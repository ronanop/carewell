/**
 * Set youtubeVideoId on a service by slug (requires SANITY_API_WRITE_TOKEN).
 * Usage: node scripts/set-service-youtube.mjs <slug> <youtubeVideoId>
 * Example: node scripts/set-service-youtube.mjs hair-transplant J2tW5o82WK0
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvFiles() {
  const root = join(__dirname, "..");
  for (const name of [".env.local", ".env"]) {
    const p = join(root, name);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnvFiles();

const slug = process.argv[2] || "hair-transplant";
const youtubeVideoId = process.argv[3] || "J2tW5o82WK0";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Need NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const docId = await client.fetch(
  `*[_type == "service" && slug.current == $slug][0]._id`,
  { slug },
);

if (!docId) {
  console.error(`No service found with slug: ${slug}`);
  process.exit(1);
}

await client.patch(docId).set({ youtubeVideoId }).commit();
console.log(`Updated ${docId}: youtubeVideoId = ${youtubeVideoId}`);
console.log(`Open: http://localhost:3000/services/${slug}`);
