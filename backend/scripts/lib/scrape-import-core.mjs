/**
 * Shared scrape → PostgreSQL import logic (legacyPath-first).
 */
import {
  normalizeLegacyPath,
  legacyPathFromUrl,
  slugFromLegacyPath,
  categoryIdFromLegacyPath,
} from "./legacy-path.mjs";
import { htmlToPortableText, resetPortableKeys } from "./html-to-portable.mjs";
import { portableTextFromBody, ensureFaqs } from "./sanity-portable.mjs";
import { inferCategory, defaultPriceForCategory } from "./scrape-pdf-parse.mjs";
import { createImageResolver } from "./wp-image-import.mjs";

const relatedByCategory = {
  "cat-hair": "svc-hair-transplant",
  "cat-face": "svc-rhinoplasty",
  "cat-body": "svc-liposuction",
  "cat-skin-vitiligo": "svc-vitiligo-treatment",
  "cat-therapies": "svc-hbot",
};

const SKIP_LEGACY_PATHS = new Set(["/", "/blog"]);

/**
 * Normalize scrape preview or PDF parse result into import input.
 * @param {Record<string, unknown>} raw
 */
export function resolveImportMeta(raw) {
  const url = String(raw.url ?? "");
  const legacyPath = normalizeLegacyPath(
    raw.legacyPath ? String(raw.legacyPath) : legacyPathFromUrl(url),
  );
  const slug = slugFromLegacyPath(legacyPath);
  const id = `svc-${slug}`;
  return { url, legacyPath, slug, id };
}

/**
 * @param {Record<string, unknown>} preview
 * @param {{ resolveImage: (url: string, alt: string) => Promise<{ url: string, mediaId?: string | null } | null> }} deps
 */
export async function buildServicePayload(preview, deps) {
  const { legacyPath, slug, id } = resolveImportMeta(preview);
  resetPortableKeys();

  const title =
    String(preview.h1 ?? preview.title ?? "")
      .replace(/\s*\|\s*Care Well.*$/i, "")
      .trim() || slug.replace(/-/g, " ");

  const categoryId =
    categoryIdFromLegacyPath(legacyPath) ??
    inferCategory(slug, String(preview.title ?? ""), String(preview.h1 ?? ""));

  let whatIsBody;
  if (preview.bodyHtml && String(preview.bodyHtml).trim().length > 40) {
    whatIsBody = await htmlToPortableText(String(preview.bodyHtml), {
      resolveImage: deps.resolveImage,
    });
  }
  if (!whatIsBody?.length) {
    const plain = preview.bodyText ?? preview.fullBody ?? "";
    whatIsBody = portableTextFromBody(String(plain));
  }

  const faqs = ensureFaqs(
    Array.isArray(preview.faqs) ? preview.faqs : [],
    String(preview.bodyText ?? preview.fullBody ?? ""),
    title,
  );

  const rel = relatedByCategory[categoryId] || "svc-hair-transplant";
  const price = defaultPriceForCategory(categoryId);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "").replace(/\/$/, "");
  const canonical = siteUrl ? `${siteUrl}${legacyPath}/` : null;

  let heroImageId = null;
  const heroUrl = preview.heroImageUrl ? String(preview.heroImageUrl) : null;
  if (heroUrl) {
    const hero = await deps.resolveImage(heroUrl, title);
    heroImageId = hero?.mediaId ?? null;
  }

  return {
    id,
    slug,
    legacyPath,
    locale: "en",
    title,
    categoryId,
    tagline: `${title} — expert guidance at Care Well Medical Centre, South Delhi.`,
    whatIsBody,
    heroImageId,
    insightPoints: [
      "Content reviewed for patient education — confirm treatment plans in clinic.",
      "Individual results depend on medical history and examination findings.",
      "Book a consultation for personalised advice from Dr. Sandeep Bhasin.",
    ],
    pricingFromInr: price,
    pricingFactors: ["Clinical complexity", "Extent of treatment", "Technique and materials used"],
    pricingEmiNote:
      "EMI options may be available for eligible treatment plans — ask during your consultation.",
    valueStack: ["Doctor-led consultation", "Treatment planning", "Structured follow-up guidance"],
    candidateGood: [
      "Seeking medically supervised care in Delhi NCR",
      "Ready to follow pre- and post-care instructions",
    ],
    candidatePoor: [
      "Uncontrolled conditions without medical clearance",
      "Expecting outcomes without professional assessment",
    ],
    treatmentDropdownLabel: title,
    seoTitle: preview.title
      ? `${String(preview.title).replace(/\s*\|\s*Care Well.*$/i, "").trim()} | Care Well`
      : `${title} | Care Well Medical Centre`,
    seoDescription:
      String(preview.metaDescription ?? "").trim() ||
      `${title} — information and treatment options at Care Well Medical Centre, Delhi.`,
    seoCanonicalUrl: canonical,
    quickFacts: [
      { label: "Consultation", value: "Free initial assessment" },
      { label: "Location", value: "Chittaranjan Park, South Delhi" },
    ],
    howItWorksSteps: [
      { title: "Consultation", description: "Discuss your goals and medical history." },
      { title: "Assessment", description: "Clinical evaluation and suitability check." },
      { title: "Treatment plan", description: "Personalised plan with risks and expectations explained." },
      { title: "Follow-up", description: "Aftercare instructions and progress reviews as needed." },
    ],
    faqs,
    relatedServiceId: rel,
  };
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function upsertImportedService(prisma, payload) {
  const { id, relatedServiceId, quickFacts, howItWorksSteps, faqs, ...data } = payload;

  await prisma.$transaction(async (tx) => {
    await tx.service.upsert({
      where: { id },
      create: { id, ...data },
      update: data,
    });

    await tx.serviceQuickFact.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < quickFacts.length; i++) {
      await tx.serviceQuickFact.create({
        data: { serviceId: id, sortOrder: i, label: quickFacts[i].label, value: quickFacts[i].value },
      });
    }

    await tx.serviceHowItWorksStep.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < howItWorksSteps.length; i++) {
      const s = howItWorksSteps[i];
      await tx.serviceHowItWorksStep.create({
        data: { serviceId: id, sortOrder: i, title: s.title, description: s.description },
      });
    }

    await tx.serviceFaq.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      await tx.serviceFaq.create({
        data: {
          serviceId: id,
          sortOrder: i,
          question: f.question,
          answer: f.answer || "Discuss your case with our doctors during consultation.",
        },
      });
    }

    await tx.serviceRelated.deleteMany({ where: { fromServiceId: id } });
    if (relatedServiceId) {
      const relatedExists = await tx.service.findUnique({
        where: { id: relatedServiceId },
        select: { id: true },
      });
      if (relatedExists) {
        await tx.serviceRelated.create({
          data: { fromServiceId: id, toServiceId: relatedServiceId, sortOrder: 0 },
        });
      }
    }

    const from = `/services/${payload.slug}`;
    const to = `${payload.legacyPath}/`;
    await tx.redirect.upsert({
      where: { fromPath: from },
      create: { fromPath: from, toPath: to, statusCode: 301 },
      update: { toPath: to, statusCode: 301 },
    });
  });
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {Record<string, unknown>} preview
 */
export async function importScrapePreview(prisma, preview) {
  const { legacyPath } = resolveImportMeta(preview);
  if (SKIP_LEGACY_PATHS.has(legacyPath)) {
    return { skipped: true, reason: "hub path", legacyPath };
  }

  const resolveImage = createImageResolver(prisma);
  const payload = await buildServicePayload(preview, { resolveImage });
  await upsertImportedService(prisma, payload);
  return { skipped: false, legacyPath, slug: payload.slug, id: payload.id };
}

export { SKIP_LEGACY_PATHS };
