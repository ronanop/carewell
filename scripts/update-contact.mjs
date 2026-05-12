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
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadEnvFiles();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing Sanity credentials in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-03-01",
  useCdn: false,
});

const NEW_PHONE = "+91 96679 77499";
const NEW_WHATSAPP = "919667977499";
const NEW_EMAIL = "queries@carewellmedicalcentre.in";

async function main() {
  const updated = await client
    .patch("site-settings")
    .set({ phone: NEW_PHONE, whatsappNumber: NEW_WHATSAPP, email: NEW_EMAIL })
    .commit();

  console.log("Updated site-settings:");
  console.log("  phone:         ", updated.phone);
  console.log("  whatsappNumber:", updated.whatsappNumber);
  console.log("  email:         ", updated.email);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
