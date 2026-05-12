/**
 * Build-time helper: fetch Google Places Details (reviews) and write data/reviews-snapshot.json
 * Requires: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID in env
 * Run: node scripts/fetch-google-reviews.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "data", "reviews-snapshot.json");

const key = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!key || !placeId) {
  console.error("Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.");
  process.exit(1);
}

const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,user_ratings_total,reviews&key=${key}`;

const res = await fetch(url);
if (!res.ok) {
  console.error("Places API error", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const r = data.result;
if (!r) {
  console.error("No result", data);
  process.exit(1);
}

const snapshot = {
  rating: String(r.rating ?? "4.9"),
  reviewCount: String(r.user_ratings_total ?? "0"),
  reviews: (r.reviews ?? []).slice(0, 5).map((rev, i) => ({
    id: rev.time ? String(rev.time) : String(i),
    text: rev.text ?? "",
    author: rev.author_name ?? "Google user",
  })),
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(snapshot, null, 2), "utf8");
console.log("Wrote", outPath);
