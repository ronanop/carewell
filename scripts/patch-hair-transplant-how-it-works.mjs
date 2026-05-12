/**
 * Patch howItWorksSteps on Hair Transplant services from the 4-step infographic copy.
 * Requires SANITY_API_WRITE_TOKEN + NEXT_PUBLIC_SANITY_* in .env.local
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

const STEPS_EN = [
  {
    _type: "howItWorksStep",
    _key: "step-graft-extraction",
    title: "Graft extraction",
    description:
      "Gentle removal of healthy follicular units from the dense donor area using a fine tool.",
  },
  {
    _type: "howItWorksStep",
    _key: "step-hairline-design",
    title: "Hairline design",
    description:
      "Customised planning with natural contours and precise symmetry for age-appropriate results.",
  },
  {
    _type: "howItWorksStep",
    _key: "step-graft-implantation",
    title: "Graft implantation",
    description:
      "Precise placement of grafts at natural angles and spacing for optimal density and direction.",
  },
  {
    _type: "howItWorksStep",
    _key: "step-healing-growth",
    title: "Healing and growth",
    description: "Timeline of recovery and progressive, natural hair growth over 12 months.",
  },
];

const STEPS_HI = [
  {
    _type: "howItWorksStep",
    _key: "step-graft-extraction-hi",
    title: "ग्राफ्ट निष्कर्षण",
    description:
      "बारीक उपकरण का उपयोग करके घने डोनर क्षेत्र से स्वस्थ फॉलिकुलर यूनिट्स की सावधानीपूर्वक निकासी।",
  },
  {
    _type: "howItWorksStep",
    _key: "step-hairline-design-hi",
    title: "हेयरलाइन डिज़ाइन",
    description:
      "उम्र के अनुकूल परिणामों के लिए प्राकृतिक रूपरेखा और सटीक समरूपता के साथ व्यक्तिगत योजना।",
  },
  {
    _type: "howItWorksStep",
    _key: "step-graft-implantation-hi",
    title: "ग्राफ्ट इम्प्लांटेशन",
    description:
      "इष्टतम घनत्व और दिशा के लिए प्राकृतिक कोणों और अंतराल पर ग्राफ्ट का सटीक प्लेसमेंट।",
  },
  {
    _type: "howItWorksStep",
    _key: "step-healing-growth-hi",
    title: "उपचार और वृद्धि",
    description: "12 महीनों में रिकवरी और प्रगतिशील, प्राकृतिक बाल वृद्धि का समयसारणी।",
  },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const rows = await client.fetch(
  `*[_type == "service" && slug.current in ["hair-transplant", "hair-transplant-hi"]]{ _id, "slug": slug.current }`,
);

for (const row of rows) {
  const steps = row.slug === "hair-transplant-hi" ? STEPS_HI : STEPS_EN;
  await client.patch(row._id).set({ howItWorksSteps: steps }).commit();
  console.log(`Updated ${row._id} (${row.slug})`);
}

if (!rows?.length) {
  console.warn("No hair-transplant / hair-transplant-hi documents found.");
}
