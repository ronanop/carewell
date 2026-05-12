import fs from "node:fs";
import path from "node:path";

const BASE = process.env.REDIRECT_AUDIT_BASE_URL || "http://localhost:3000";
const filePath = path.join(process.cwd(), "redirects.migration.json");

if (!fs.existsSync(filePath)) {
  console.error("redirects.migration.json not found");
  process.exit(1);
}

const redirects = JSON.parse(fs.readFileSync(filePath, "utf8"));
if (!Array.isArray(redirects)) {
  console.error("redirects.migration.json must be an array");
  process.exit(1);
}

async function checkOne(item) {
  const source = item.from || item.source;
  const destination = item.to || item.destination;
  if (!source || !destination) return { source, ok: false, reason: "missing from/to" };

  const res = await fetch(`${BASE}${source}`, { redirect: "manual" });
  const loc = res.headers.get("location") || "";
  const expected = destination.startsWith("http") ? destination : `${BASE}${destination}`;
  const statusOk = [301, 302, 307, 308].includes(res.status);
  const locationOk = loc === destination || loc === expected;
  return {
    source,
    status: res.status,
    location: loc,
    expected,
    ok: statusOk && locationOk,
  };
}

async function main() {
  const sample = redirects.slice(0, 200);
  const rows = [];
  for (const r of sample) {
    try {
      rows.push(await checkOne(r));
    } catch (error) {
      rows.push({ source: r.from || r.source, ok: false, reason: String(error) });
    }
  }

  const failed = rows.filter((r) => !r.ok);
  console.table(rows.slice(0, 30));
  console.log(`Checked ${rows.length} redirect(s), failed ${failed.length}.`);
  if (failed.length) process.exit(1);
}

main();

