#!/usr/bin/env node
import { writeFileSync } from "fs";
import { join } from "path";
import { repoRoot } from "./lib/repo-root.mjs";

const RAW = `
https://www.carewellmedicalcentre.com/blog/
https://www.carewellmedicalcentre.com/is-eyelid-lifting-blepharoplasty-safe-procedure/
https://www.carewellmedicalcentre.com/vitiligo-in-genital-areas-females/
https://www.carewellmedicalcentre.com/penile-vitiligo-treatment-step-by-step-guide/
https://www.carewellmedicalcentre.com/does-applying-hair-dye-turn-hair-grey/
https://www.carewellmedicalcentre.com/what-causes-vitiligo-is-it-hereditary/
https://www.carewellmedicalcentre.com/methods-to-reverse-gray-hair/
https://www.carewellmedicalcentre.com/fatty-liver-guide-prevention-treatment/
https://www.carewellmedicalcentre.com/rosemary-oil-and-minoxidil-5-usage-safety/
https://www.carewellmedicalcentre.com/laser-carbon-peel-simple-guide/
https://www.carewellmedicalcentre.com/is-birthmark-really-dangerous/
https://www.carewellmedicalcentre.com/how-to-get-rid-of-birthmarks/
https://www.carewellmedicalcentre.com/facelift-surgery-cost-in-india/
https://www.carewellmedicalcentre.com/liposuction-of-flanks/
https://www.carewellmedicalcentre.com/vitiligo-types-symptoms-causes-diagnose-complication-treatment/
https://www.carewellmedicalcentre.com/diet-plan-after-liposuction/
https://www.carewellmedicalcentre.com/5-best-non-surgical-treatments-improve-jawline-neck/
https://www.carewellmedicalcentre.com/regain-lost-confidence-due-gynecomastia/
https://www.carewellmedicalcentre.com/how-effective-is-laser-toning/
https://www.carewellmedicalcentre.com/how-do-i-know-if-i-have-gynecomastia-can-foods-cause-gynecomastia/
https://www.carewellmedicalcentre.com/is-nose-surgery-painful-facts-and-myths/
https://www.carewellmedicalcentre.com/how-painful-is-breast-implant-surgery/
https://www.carewellmedicalcentre.com/penile-vitiligo-can-be-treated-see-how/
https://www.carewellmedicalcentre.com/liposuction-risk-and-side-effects-that-you-need-to-know/
https://www.carewellmedicalcentre.com/is-it-safe-to-get-breast-implants-in-2023/
https://www.carewellmedicalcentre.com/laser-toning-treatment-procedure-benefits-side-effects-cost/
https://www.carewellmedicalcentre.com/dermabrasion-treatment-for-tattoo-removal/
https://www.carewellmedicalcentre.com/hidden-side-of-breast-implants-understanding-psychological-impact/
https://www.carewellmedicalcentre.com/understanding-skin-whitening-treatment-how-it-works/
https://www.carewellmedicalcentre.com/what-is-double-eyelid/
https://www.carewellmedicalcentre.com/psoriasis-unveiled-causes-types-symptoms-and-solutions/
https://www.carewellmedicalcentre.com/how-to-get-rid-of-puffy-nipples-in-men/
https://www.carewellmedicalcentre.com/lip-reduction-surgery-safety/
https://www.carewellmedicalcentre.com/what-is-brazilian-butt-lift-surgery/
https://www.carewellmedicalcentre.com/tattoo-removal-by-surgery/
https://www.carewellmedicalcentre.com/does-penile-enlargement-surgery-work-and-is-it-worth-it/
https://www.carewellmedicalcentre.com/glutathione-injections-for-skin-whitening/
https://www.carewellmedicalcentre.com/alopecia-areata-latest-treatment-baldness-2024/
https://www.carewellmedicalcentre.com/does-coolsculpting-really-work/
https://www.carewellmedicalcentre.com/gfc-hair-treatment-strong-shiny-healthy-hair/
https://www.carewellmedicalcentre.com/cosmetic-surgery-types-benefits-side-effects-and-cost/
https://www.carewellmedicalcentre.com/how-to-fix-gummy-smile-correction-know-best-treatment/
https://www.carewellmedicalcentre.com/how-to-microblading-procedure-for-eyebrows-treatment-benefits-cost/
https://www.carewellmedicalcentre.com/breast-augmentation-cost-in-india/
https://www.carewellmedicalcentre.com/alopecia-treatment-for-baldness/
https://www.carewellmedicalcentre.com/nipples-during-breast-reduction-surgery/
https://www.carewellmedicalcentre.com/8-simple-effective-ways-naturally-reduce-breast-size/
https://www.carewellmedicalcentre.com/hymenoplasty-benefits/
https://www.carewellmedicalcentre.com/what-is-done-in-rhinoplasty/
https://www.carewellmedicalcentre.com/benefits-of-microdermabrasion/
https://www.carewellmedicalcentre.com/vaginal-dryness-in-women/
https://www.carewellmedicalcentre.com/how-to-choose-best-rhinoplasty-surgeon-in-delhi-ncr/
https://www.carewellmedicalcentre.com/acne-causes-symptoms-risks-treatment/
https://www.carewellmedicalcentre.com/effective-wart-removal-treatments-causes-diagnosis/
https://www.carewellmedicalcentre.com/factors-affecting-hair-transplant-cost-in-india/
https://www.carewellmedicalcentre.com/ultra-dhi-hair-transplant-natural-hair-fall-remedy/
https://www.carewellmedicalcentre.com/automated-hair-analysis-and-more/
https://www.carewellmedicalcentre.com/finasteride-uses-precautions-side-effects-benefits/
https://www.carewellmedicalcentre.com/find-best-hair-transplant-clinic-in-delhi/
https://www.carewellmedicalcentre.com/minoxidil-side-effects-what-you-need-to-know/
https://www.carewellmedicalcentre.com/new-treatment-for-visible-linear-scars-on-scalp/
https://www.carewellmedicalcentre.com/hair-transplant-cost-in-india/
https://www.carewellmedicalcentre.com/hair-serum-benefits-types-use/
https://www.carewellmedicalcentre.com/hesitation-cut-marks-scar-removal-treatments-delhi/
https://www.carewellmedicalcentre.com/hair-peptides-for-hair-regrowth/
https://www.carewellmedicalcentre.com/laser-nail-fungus-treatment-in-delhi/
https://www.carewellmedicalcentre.com/best-rhinoplasty-techniques/
https://www.carewellmedicalcentre.com/bb-glow-treatment-benefits/
https://www.carewellmedicalcentre.com/what-is-rhinoplasty/
https://www.carewellmedicalcentre.com/how-much-does-rhinoplasty-nose-job-cost-in-india/
https://www.carewellmedicalcentre.com/hair-transplant-techniques-cost-breakdown-india/
https://www.carewellmedicalcentre.com/jodhpur-technique-vitiligo-treatment/
https://www.carewellmedicalcentre.com/phototherapy-changing-vitiligo-treatment/
https://www.carewellmedicalcentre.com/hair-transplant-donor-area-everything-you-need-to-know/
https://www.carewellmedicalcentre.com/how-long-does-scalp-micropigmentation-last/
https://www.carewellmedicalcentre.com/best-vitiligo-treatments/
https://www.carewellmedicalcentre.com/how-can-you-change-shape-of-your-nose/
https://www.carewellmedicalcentre.com/beard-transplant-solve-undeveloped-beard-and-mustache-problem/
https://www.carewellmedicalcentre.com/best-foods-diet-to-eat-after-hair-transplant/
https://www.carewellmedicalcentre.com/is-breast-implants-safe-now/
https://www.carewellmedicalcentre.com/liposuction-cost-in-india/
https://www.carewellmedicalcentre.com/how-to-fix-dark-circles-before-wedding/
https://www.carewellmedicalcentre.com/bridal-body-polishing/
https://www.carewellmedicalcentre.com/skin-grafting-for-tattoo-removal/
https://www.carewellmedicalcentre.com/laser-hair-removal-cost-in-india/
https://www.carewellmedicalcentre.com/what-is-hyperbaric-oxygen-therapy/
https://www.carewellmedicalcentre.com/hair-transplant-techniques-comparison/
https://www.carewellmedicalcentre.com/what-is-fue-hair-transplant/
https://www.carewellmedicalcentre.com/is-hair-transplant-surgery-permanent/
https://www.carewellmedicalcentre.com/after-hair-transplant-care-tips/
https://www.carewellmedicalcentre.com/pre-bridal-treatments-delhi/
https://www.carewellmedicalcentre.com/how-to-cure-acne-permanently/
https://www.carewellmedicalcentre.com/10-early-signs-of-hair-loss-that-can-help-prevent-baldness/
https://www.carewellmedicalcentre.com/can-finasteride-regrow-hair/
https://www.carewellmedicalcentre.com/do-beard-hair-transplants-leave-scars/
https://www.carewellmedicalcentre.com/complete-guide-hair-weaving/
https://www.carewellmedicalcentre.com/hair-transplant-in-summer/
https://www.carewellmedicalcentre.com/how-long-does-hair-transplant-last/
https://www.carewellmedicalcentre.com/hair-transplant-results-timeline/
https://www.carewellmedicalcentre.com/depleted-donor-hair-causes-solutions/
https://www.carewellmedicalcentre.com/success-rate-hair-transplant/
https://www.carewellmedicalcentre.com/what-are-the-causes-of-death-from-hair-transplants/
https://www.carewellmedicalcentre.com/what-not-to-do-after-prp-hair-treatment/
https://www.carewellmedicalcentre.com/prp-treatment-for-hair-how-it-works-and-what-to-expect/
https://www.carewellmedicalcentre.com/platelet-rich-plasma-prp-injection-uses-treatment-benefits-side-effects-cost/
https://www.carewellmedicalcentre.com/gfc-vs-prp-hair-loss-treatment/
https://www.carewellmedicalcentre.com/is-gfc-hair-treatment-good-for-hair-thinning/
https://www.carewellmedicalcentre.com/how-effective-is-laser-hair-removal-procedure/
https://www.carewellmedicalcentre.com/body-parts-involved-in-laser-hair-removal-treatment/
https://www.carewellmedicalcentre.com/why-get-laser-hair-removal/
https://www.carewellmedicalcentre.com/8-best-hair-removal-methods/
https://www.carewellmedicalcentre.com/pre-bridal-laser-hair-removal-guide/
https://www.carewellmedicalcentre.com/botox-how-they-work-benefits-side-effects-more/
https://www.carewellmedicalcentre.com/botox-injection-prices-india/
https://www.carewellmedicalcentre.com/scarless-facelift-permanent-non-surgical-techniques/
https://www.carewellmedicalcentre.com/how-long-does-vampire-facelift-last/
https://www.carewellmedicalcentre.com/pre-wedding-anti-aging-guide/
https://www.carewellmedicalcentre.com/amazing-benefits-of-chemical-peel-treatment/
https://www.carewellmedicalcentre.com/chemical-peels-what-surprising-things-you-should-know-before-go/
https://www.carewellmedicalcentre.com/tips-for-skin-care-after-chemical-peels/
https://www.carewellmedicalcentre.com/hydrafacial-treatment-all-you-need-to-know/
https://www.carewellmedicalcentre.com/benefits-of-hydrafacial-treatment/
https://www.carewellmedicalcentre.com/is-liposuction-painful/
https://www.carewellmedicalcentre.com/is-liposuction-safe-procedure/
https://www.carewellmedicalcentre.com/is-hymenoplasty-legal-in-india/
https://www.carewellmedicalcentre.com/is-hymenoplasty-painful-or-risky/
https://www.carewellmedicalcentre.com/what-is-hymenoplasty-surgery/
https://www.carewellmedicalcentre.com/diagnosis-of-hair-loss-in-women/
https://www.carewellmedicalcentre.com/hbot-explained-simple-medical-terms/
https://www.carewellmedicalcentre.com/oxygen-delivery-and-healing/
https://www.carewellmedicalcentre.com/normal-oxygen-therapy-vs-hbot/
https://www.carewellmedicalcentre.com/does-hymenoplasty-guarantee-bleeding/
https://www.carewellmedicalcentre.com/factors-affecting-hymenoplasty-cost-delhi/
https://www.carewellmedicalcentre.com/can-white-hair-turn-black-again/
https://www.carewellmedicalcentre.com/failed-hymenoplasty-revision-surgery/
https://www.carewellmedicalcentre.com/why-women-choose-hymenoplasty/
https://www.carewellmedicalcentre.com/how-to-become-virgin-again/
https://www.carewellmedicalcentre.com/hymenoplasty-recovery-timeline/
https://www.carewellmedicalcentre.com/hymenoplasty-before-marriage-timing/
https://www.carewellmedicalcentre.com/best-hair-transplant-clinic-in-delhi-ncr/
https://www.carewellmedicalcentre.com/can-hair-transplant-fail-causes-and-how-to-avoid-it/
https://www.carewellmedicalcentre.com/non-invasive-cosmetic-treatments-trending-in-india-2026/
https://www.carewellmedicalcentre.com/why-celebrities-and-cricketers-opt-for-hair-transplant-in-2026/
https://www.carewellmedicalcentre.com/best-hair-transplant-in-delhi-fue-vs-fut-which-one-is-right-for-you/
https://www.carewellmedicalcentre.com/hymenoplasty-vs-other-hymen-reconstruction-methods-what-actually-works/
https://www.carewellmedicalcentre.com/vitiligo-in-children-causes-symptoms-treatment-latest-cure-guide/
https://www.carewellmedicalcentre.com/yo-yo-honey-singh-reveals-baldness-wig-bipolar-disorder-battle/
https://www.carewellmedicalcentre.com/is-there-a-permanent-cure-for-vitiligo-latest-2026-treatment-explained/
`;

function normalizeLegacyPath(path) {
  let p = path.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

const urls = RAW.trim().split(/\s+/).filter(Boolean);
const postPaths = [...new Set(urls.map((u) => normalizeLegacyPath(new URL(u).pathname)))].filter(
  (p) => p !== "/blog",
);

const root = repoRoot(import.meta.url);
const out = join(root, "db", "seed", "legacy-sitemap-posts.json");
const manifest = {
  description: "Legacy blog post URLs from Yoast sitemap (root paths, no /blog/ prefix on articles).",
  source: "Yoast blog sitemap 2026-06-02",
  paths: ["/blog", ...postPaths],
};
writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${postPaths.length} post paths (+ /blog index) to ${out}`);
