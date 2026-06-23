import {
  clearWordpressCmsCache,
  getWpLinkIndex,
  getWpServiceByLegacyPath,
  listWpPagePaths,
} from "../src/lib/cms/wordpress/client.ts";

const PROTECTED_TREATMENT_PATHS = [
  "/hair-transplant-in-delhi",
  "/hair-transplant-in-delhi/beard",
  "/hair-transplant-in-delhi/eyebrow",
  "/hair-transplant-in-delhi/female",
  "/hair-transplant-in-delhi/cost",
  "/hair-transplant-in-delhi/before-and-after",
  "/hair-loss-treatment-in-delhi",
  "/hair-loss-treatment-in-delhi/prp",
  "/hair-loss-treatment-in-delhi/growth-factor-concentrate",
  "/cosmetic-treatments-in-delhi",
  "/cosmetic-treatments-in-delhi/botox",
  "/cosmetic-treatments-in-delhi/dermal-fillers",
  "/cosmetic-treatments-in-delhi/anti-aging",
  "/cosmetic-treatments-in-delhi/lip-augmentation",
  "/cosmetic-treatments-in-delhi/laser-hair-removal",
  "/skin-treatments-in-delhi",
  "/skin-treatments-in-delhi/acne-scar",
  "/skin-treatments-in-delhi/skin-whitening",
  "/skin-treatments-in-delhi/dark-circles",
  "/skin-treatments-in-delhi/vitiligo",
  "/plastic-surgery-in-delhi",
  "/plastic-surgery-in-delhi/liposuction",
  "/plastic-surgery-in-delhi/rhinoplasty",
  "/plastic-surgery-in-delhi/breast-augmentation",
  "/plastic-surgery-in-delhi/facelift",
  "/plastic-surgery-in-delhi/tummy-tuck",
  "/plastic-surgery-in-delhi/male-to-female-surgery",
  "/intimate-surgery-in-delhi",
  "/body-contouring-in-delhi",
  "/body-contouring-in-delhi/cryolipolysis",
];

async function main() {
  clearWordpressCmsCache();
  const paths = await listWpPagePaths();
  console.log("page count:", paths.length);

  const index = await getWpLinkIndex();
  let missing = 0;

  for (const path of PROTECTED_TREATMENT_PATHS) {
    const entry = index.byPath.get(path);
    const doc = await getWpServiceByLegacyPath(path);
    const status = doc ? "OK" : entry ? `WRONG_KIND(${entry.kind})` : "MISSING";
    if (!doc) missing += 1;
    console.log(status, path, doc?.title?.slice(0, 55) ?? "");
  }

  console.log("\nmissing:", missing, "of", PROTECTED_TREATMENT_PATHS.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
