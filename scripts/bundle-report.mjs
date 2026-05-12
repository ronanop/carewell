import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const CHUNK_DIR = path.join(process.cwd(), ".next", "static", "chunks");
if (!fs.existsSync(CHUNK_DIR)) {
  console.error("Build output not found. Run `npm run build` first.");
  process.exit(1);
}

const files = fs.readdirSync(CHUNK_DIR).filter((f) => f.endsWith(".js"));
const rows = files.map((file) => {
  const abs = path.join(CHUNK_DIR, file);
  const raw = fs.readFileSync(abs);
  const gzip = zlib.gzipSync(raw).length;
  return {
    file,
    rawKb: (raw.length / 1024).toFixed(1),
    gzipKb: (gzip / 1024).toFixed(1),
  };
});

rows.sort((a, b) => Number(b.gzipKb) - Number(a.gzipKb));
console.table(rows.slice(0, 25));

const offenders = rows.filter((r) => Number(r.gzipKb) > 100);
if (offenders.length) {
  console.error("Found chunks >100KB gzip:");
  console.table(offenders);
  if (process.env.STRICT_BUNDLE_BUDGET === "1") {
    process.exit(1);
  }
}

console.log("Bundle report complete.");

