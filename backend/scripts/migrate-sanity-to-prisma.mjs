/**
 * One-time export: Sanity → PostgreSQL (Prisma) + local images in public/uploads.
 *
 *   npm run db:migrate
 *   npm run cms:import-sanity
 *   npm run cms:import-sanity -- --dry-run
 */
import { createClient } from "@sanity/client";
import { PrismaClient } from "@prisma/client";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";
import { loadEnvFiles } from "./lib/load-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

const DRY_RUN = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const prisma = new PrismaClient();
const mediaByRef = new Map();
const year = new Date().getFullYear();

function slugId(prefix, slug) {
  return `${prefix}-${String(slug || "untitled").replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;
}

function assetRef(image) {
  if (!image?.asset?._ref) return null;
  return image.asset._ref;
}

function extFromMime(mime) {
  if (!mime) return "jpg";
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  return "jpg";
}

/** Build cdn.sanity.io URL from asset _ref (image-{id}-{WxH}-{format}). */
function cdnUrlFromRef(ref) {
  const body = ref.replace(/^image-/, "");
  const m = body.match(/^(.+)-(\d+x\d+)-(\w+)$/);
  if (m) {
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${m[1]}-${m[2]}.${m[3]}`;
  }
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${body}`;
}

function resolveDownloadUrl(image, ref) {
  if (image?.asset?.url) return image.asset.url;
  return cdnUrlFromRef(ref);
}

async function downloadToFile(url, destPath) {
  if (existsSync(destPath)) return;
  mkdirSync(dirname(destPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  await pipeline(res.body, createWriteStream(destPath));
}

async function ensureMedia(image, altFallback = "") {
  const ref = assetRef(image);
  if (!ref) return null;
  if (mediaByRef.has(ref)) return mediaByRef.get(ref);

  const assetId = ref.replace(/^image-/, "").split("-")[0];
  const url = resolveDownloadUrl(image, ref);
  let ext = extname(new URL(url).pathname);
  if (!ext || ext === ".") ext = `.${extFromMime(image?.asset?.mimeType)}`;
  const filename = `${assetId}${ext}`;
  const relPath = `uploads/${year}/${filename}`;
  const absPath = join(root, "public", relPath);
  const publicUrl = `/${relPath.replace(/\\/g, "/")}`;

  if (!DRY_RUN) {
    try {
      await downloadToFile(url, absPath);
    } catch (err) {
      console.warn(`  Image skip ${assetId}:`, err.message);
      return null;
    }
    await prisma.media.upsert({
      where: { id: `media-${assetId}` },
      create: {
        id: `media-${assetId}`,
        filename,
        path: relPath,
        url: publicUrl,
        alt: image?.alt || altFallback || null,
        mimeType: image?.asset?.mimeType ?? null,
      },
      update: {
        filename,
        path: relPath,
        url: publicUrl,
        alt: image?.alt || altFallback || null,
      },
    });
  }

  const mediaId = `media-${assetId}`;
  mediaByRef.set(ref, mediaId);
  return mediaId;
}

function rewritePortable(value) {
  if (!Array.isArray(value)) return value;
  return value.map((block) => {
    if (block?._type === "image" && block.asset?._ref) {
      const mediaId = mediaByRef.get(block.asset._ref);
      const url = mediaId ? mediaByRef.get(`${block.asset._ref}:url`) : null;
      return { ...block, url: url || block.url };
    }
    return block;
  });
}

async function fetchAll() {
  const [
    settings,
    navigation,
    redirects,
    categories,
    services,
    authors,
    blogPosts,
    gallery,
    testimonials,
    hyperlocal,
  ] = await Promise.all([
    sanity.fetch(`*[_type == "siteSettings"][0]`),
    sanity.fetch(`*[_type == "navigation"][0]`),
    sanity.fetch(`*[_type == "redirect"]`),
    sanity.fetch(`*[_type == "serviceCategory"]`),
    sanity.fetch(`*[_type == "service"]{
      ...,
      "categoryId": category._ref,
      "alternateId": alternateLocaleService._ref,
      "relatedIds": relatedServices[]._ref,
      heroImage{..., "asset": asset->{url, mimeType}},
      whatIsIllustration{..., "asset": asset->{url, mimeType}},
      "seoOg": seo.ogImage{..., "asset": asset->{url, mimeType}},
      beforeAfterCases[]{
        beforeImage{..., "asset": asset->{url, mimeType}},
        afterImage{..., "asset": asset->{url, mimeType}}
      }
    }`),
    sanity.fetch(`*[_type == "author"]{..., image{..., asset->}}`),
    sanity.fetch(`*[_type == "blogPost"]{
      ...,
      "authorId": author._ref,
      "pillarId": pillarPost._ref,
      "linkedServiceId": linkedService._ref,
      "relatedIds": relatedPosts[]._ref,
      coverImage{..., asset->},
      "seoOg": seo.ogImage{..., asset->}
    }`),
    sanity.fetch(`*[_type == "galleryItem"]{
      ...,
      beforeImage{..., asset->},
      afterImage{..., asset->},
      "seoOg": seo.ogImage{..., asset->}
    }`),
    sanity.fetch(`*[_type == "testimonial"]`),
    sanity.fetch(`*[_type == "hyperlocalPage"]{
      ...,
      "linkedServiceId": linkedService._ref,
      "seoOg": seo.ogImage{..., asset->}
    }`),
  ]);
  return {
    settings,
    navigation,
    redirects,
    categories,
    services,
    authors,
    blogPosts,
    gallery,
    testimonials,
    hyperlocal,
  };
}

async function preloadImages(docs) {
  const images = [];
  const push = (img) => img?.asset && images.push(img);
  for (const s of docs.services) {
    push(s.heroImage);
    push(s.whatIsIllustration);
    push(s.seoOg);
    for (const c of s.beforeAfterCases ?? []) {
      push(c.beforeImage);
      push(c.afterImage);
    }
  }
  for (const c of docs.categories) {
    push(c.heroImage);
    push(c.seo?.ogImage);
    for (const ba of c.beforeAfterCases ?? []) {
      push(ba.beforeImage);
      push(ba.afterImage);
    }
  }
  for (const a of docs.authors) push(a.image);
  for (const b of docs.blogPosts) {
    push(b.coverImage);
    push(b.seoOg);
  }
  for (const g of docs.gallery) {
    push(g.beforeImage);
    push(g.afterImage);
    push(g.seoOg);
  }
  push(docs.settings?.heroImage);
  for (const h of docs.hyperlocal) push(h.seoOg);

  console.log(`Downloading ${images.length} images…`);
  for (const img of images) {
    const id = await ensureMedia(img);
    const ref = assetRef(img);
    if (id && ref) {
      const row = await prisma.media.findUnique({ where: { id } }).catch(() => null);
      if (row) mediaByRef.set(`${ref}:url`, row.url);
    }
  }
}

function seoFields(seo) {
  if (!seo) return {};
  return {
    seoTitle: seo.title ?? null,
    seoDescription: seo.description ?? null,
    seoCanonicalUrl: seo.canonicalUrl ?? null,
    seoOgTitle: seo.ogTitle ?? null,
    seoOgDescription: seo.ogDescription ?? null,
    seoNoindex: Boolean(seo.noindex),
  };
}

async function importData(docs) {
  const counts = {};

  if (docs.settings && !DRY_RUN) {
    const heroImageId = await ensureMedia(docs.settings.heroImage);
    await prisma.siteSettings.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        siteName: docs.settings.siteName,
        phone: docs.settings.phone,
        whatsappNumber: docs.settings.whatsappNumber,
        email: docs.settings.email,
        address: docs.settings.address,
        mapEmbedUrl: docs.settings.mapEmbedUrl,
        mbbsRegNo: docs.settings.mbbsRegNo,
        medicalDisclaimer: docs.settings.medicalDisclaimer,
        helloBarMessages: docs.settings.helloBarMessages ?? [],
        trustBadges: docs.settings.trustBadges ?? [],
        seoFooterCities: docs.settings.seoFooterCities ?? undefined,
        patientCounterLabel: docs.settings.patientCounterLabel,
        patientCounterValue: docs.settings.patientCounterValue,
        gtmId: docs.settings.gtmId,
        ga4MeasurementId: docs.settings.ga4MeasurementId,
        clarityProjectId: docs.settings.clarityProjectId,
        hours: docs.settings.hours ?? [],
        socialLinks: docs.settings.socialLinks ?? undefined,
        heroImageId,
      },
      update: {
        siteName: docs.settings.siteName,
        phone: docs.settings.phone,
        whatsappNumber: docs.settings.whatsappNumber,
        email: docs.settings.email,
        address: docs.settings.address,
        mapEmbedUrl: docs.settings.mapEmbedUrl,
        mbbsRegNo: docs.settings.mbbsRegNo,
        medicalDisclaimer: docs.settings.medicalDisclaimer,
        helloBarMessages: docs.settings.helloBarMessages ?? [],
        trustBadges: docs.settings.trustBadges ?? [],
        seoFooterCities: docs.settings.seoFooterCities ?? undefined,
        patientCounterLabel: docs.settings.patientCounterLabel,
        patientCounterValue: docs.settings.patientCounterValue,
        gtmId: docs.settings.gtmId,
        ga4MeasurementId: docs.settings.ga4MeasurementId,
        clarityProjectId: docs.settings.clarityProjectId,
        hours: docs.settings.hours ?? [],
        socialLinks: docs.settings.socialLinks ?? undefined,
        heroImageId,
      },
    });
    counts.siteSettings = 1;
  }

  if (docs.navigation && !DRY_RUN) {
    await prisma.navigation.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        title: docs.navigation.title ?? "Main navigation",
        items: docs.navigation.items ?? [],
        footerColumns: docs.navigation.footerColumns ?? [],
      },
      update: {
        title: docs.navigation.title ?? "Main navigation",
        items: docs.navigation.items ?? [],
        footerColumns: docs.navigation.footerColumns ?? [],
      },
    });
    counts.navigation = 1;
  }

  for (const cat of docs.categories) {
    const slug = cat.slug?.current ?? cat._id;
    const id = cat._id || slugId("cat", slug);
    const heroImageId = await ensureMedia(cat.heroImage);
    const seoOgImageId = await ensureMedia(cat.seo?.ogImage);
    if (DRY_RUN) {
      counts.categories = (counts.categories ?? 0) + 1;
      continue;
    }
    await prisma.serviceCategory.upsert({
      where: { id },
      create: {
        id,
        slug,
        title: cat.title,
        megaMenuKey: cat.megaMenuKey,
        heroSubtitle: cat.heroSubtitle,
        intro: cat.intro ?? undefined,
        comparisonRows: cat.comparisonRows ?? undefined,
        heroImageId,
        seoOgImageId,
        ...seoFields(cat.seo),
      },
      update: {
        title: cat.title,
        megaMenuKey: cat.megaMenuKey,
        heroSubtitle: cat.heroSubtitle,
        intro: cat.intro ?? undefined,
        comparisonRows: cat.comparisonRows ?? undefined,
        heroImageId,
        seoOgImageId,
        ...seoFields(cat.seo),
      },
    });
    await prisma.categoryFaq.deleteMany({ where: { categoryId: id } });
    for (let i = 0; i < (cat.faq ?? []).length; i++) {
      const f = cat.faq[i];
      await prisma.categoryFaq.create({
        data: { categoryId: id, sortOrder: i, question: f.question, answer: f.answer },
      });
    }
    await prisma.categoryBeforeAfterCase.deleteMany({ where: { categoryId: id } });
    for (let i = 0; i < (cat.beforeAfterCases ?? []).length; i++) {
      const c = cat.beforeAfterCases[i];
      await prisma.categoryBeforeAfterCase.create({
        data: {
          categoryId: id,
          sortOrder: i,
          beforeImageId: await ensureMedia(c.beforeImage),
          afterImageId: await ensureMedia(c.afterImage),
          patientInitials: c.patientInitials,
          age: c.age,
          gender: c.gender,
          monthsPostProcedure: c.monthsPostProcedure,
          subtype: c.subtype,
        },
      });
    }
    counts.categories = (counts.categories ?? 0) + 1;
  }

  const authorIds = new Set();
  for (const a of docs.authors) {
    const slug = a.slug?.current ?? a._id;
    const id = a._id || slugId("author", slug);
    const imageId = await ensureMedia(a.image);
    if (!DRY_RUN) {
      const row = await prisma.author.upsert({
        where: { slug },
        create: {
          id,
          slug,
          name: a.name,
          credentials: a.credentials,
          bio: a.bio ?? undefined,
          imageId,
        },
        update: {
          name: a.name,
          credentials: a.credentials,
          bio: a.bio ?? undefined,
          imageId,
        },
      });
      authorIds.add(row.id);
    } else {
      authorIds.add(id);
    }
    counts.authors = (counts.authors ?? 0) + 1;
  }

  for (const s of docs.services) {
    const slug = s.slug?.current;
    if (!slug) continue;
    const id = s._id || slugId("svc", slug);
    const heroImageId = await ensureMedia(s.heroImage);
    const whatIsIllustrationId = await ensureMedia(s.whatIsIllustration);
    const seoOgImageId = await ensureMedia(s.seoOg);
    const categoryId = s.categoryId ? String(s.categoryId) : null;

    if (DRY_RUN) {
      counts.services = (counts.services ?? 0) + 1;
      continue;
    }

    await prisma.service.upsert({
      where: { id },
      create: {
        id,
        slug,
        locale: s.locale ?? "en",
        title: s.title,
        tagline: s.tagline,
        whatIsBody: rewritePortable(s.whatIsBody) ?? undefined,
        insightPoints: s.insightPoints ?? [],
        candidateGood: s.candidateGood ?? [],
        candidatePoor: s.candidatePoor ?? [],
        pricingFromInr: s.pricingFromInr,
        pricingFactors: s.pricingFactors ?? [],
        pricingEmiNote: s.pricingEmiNote,
        valueStack: s.valueStack ?? [],
        youtubeVideoId: s.youtubeVideoId,
        treatmentDropdownLabel: s.treatmentDropdownLabel,
        categoryId,
        heroImageId,
        whatIsIllustrationId,
        seoOgImageId,
        alternateLocaleServiceId: s.alternateId ?? null,
        ...seoFields(s.seo),
      },
      update: {
        title: s.title,
        tagline: s.tagline,
        whatIsBody: rewritePortable(s.whatIsBody) ?? undefined,
        insightPoints: s.insightPoints ?? [],
        candidateGood: s.candidateGood ?? [],
        candidatePoor: s.candidatePoor ?? [],
        pricingFromInr: s.pricingFromInr,
        pricingFactors: s.pricingFactors ?? [],
        pricingEmiNote: s.pricingEmiNote,
        valueStack: s.valueStack ?? [],
        youtubeVideoId: s.youtubeVideoId,
        treatmentDropdownLabel: s.treatmentDropdownLabel,
        heroImageId,
        whatIsIllustrationId,
        seoOgImageId,
        ...seoFields(s.seo),
      },
    });

    await prisma.serviceQuickFact.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (s.quickFacts ?? []).length; i++) {
      const f = s.quickFacts[i];
      await prisma.serviceQuickFact.create({
        data: { serviceId: id, sortOrder: i, label: f.label, value: f.value },
      });
    }
    await prisma.serviceHowItWorksStep.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (s.howItWorksSteps ?? []).length; i++) {
      const step = s.howItWorksSteps[i];
      await prisma.serviceHowItWorksStep.create({
        data: { serviceId: id, sortOrder: i, title: step.title, description: step.description },
      });
    }
    await prisma.serviceBeforeAfterCase.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (s.beforeAfterCases ?? []).length; i++) {
      const c = s.beforeAfterCases[i];
      await prisma.serviceBeforeAfterCase.create({
        data: {
          serviceId: id,
          sortOrder: i,
          beforeImageId: await ensureMedia(c.beforeImage),
          afterImageId: await ensureMedia(c.afterImage),
          patientInitials: c.patientInitials,
          age: c.age,
          gender: c.gender,
          monthsPostProcedure: c.monthsPostProcedure,
          subtype: c.subtype,
        },
      });
    }
    await prisma.serviceFaq.deleteMany({ where: { serviceId: id } });
    for (let i = 0; i < (s.faq ?? []).length; i++) {
      const f = s.faq[i];
      await prisma.serviceFaq.create({
        data: { serviceId: id, sortOrder: i, question: f.question, answer: f.answer },
      });
    }
    await prisma.serviceRelated.deleteMany({ where: { fromServiceId: id } });
    for (let i = 0; i < (s.relatedIds ?? []).length; i++) {
      const toId = s.relatedIds[i];
      if (!toId) continue;
      await prisma.serviceRelated.create({
        data: { fromServiceId: id, toServiceId: toId, sortOrder: i },
      }).catch(() => {});
    }
    counts.services = (counts.services ?? 0) + 1;
  }

  for (const b of docs.blogPosts) {
    const slug = b.slug?.current;
    if (!slug) continue;
    const id = b._id || slugId("blog", slug);
    const coverImageId = await ensureMedia(b.coverImage);
    const seoOgImageId = await ensureMedia(b.seoOg);
    let authorId = b.authorId && authorIds.has(b.authorId) ? b.authorId : null;
    if (!authorId && b.authorId && !DRY_RUN) {
      const refAuthor = await sanity.fetch(`*[_id == $id][0]{ _id, name, slug, credentials, bio }`, {
        id: b.authorId,
      });
      if (refAuthor?.slug?.current) {
        const slug = refAuthor.slug.current;
        const row = await prisma.author.upsert({
          where: { slug },
          create: {
            id: refAuthor._id,
            slug,
            name: refAuthor.name ?? "Author",
            credentials: refAuthor.credentials,
            bio: refAuthor.bio ?? undefined,
          },
          update: { name: refAuthor.name ?? "Author", credentials: refAuthor.credentials },
        });
        authorId = row.id;
        authorIds.add(row.id);
      }
    }
    const pillarPostId = b.pillarId
      ? (await prisma.blogPost.findUnique({ where: { id: b.pillarId } }))?.id ?? null
      : null;
    const linkedServiceId = b.linkedServiceId
      ? (await prisma.service.findUnique({ where: { id: b.linkedServiceId } }))?.id ?? null
      : null;
    if (DRY_RUN) {
      counts.blog = (counts.blog ?? 0) + 1;
      continue;
    }
    await prisma.blogPost.upsert({
      where: { id },
      create: {
        id,
        slug,
        title: b.title,
        category: b.category,
        featured: Boolean(b.featured),
        excerpt: b.excerpt,
        body: rewritePortable(b.body) ?? undefined,
        publishedAt: b.publishedAt ? new Date(b.publishedAt) : null,
        updatedAt: b.updatedAt ? new Date(b.updatedAt) : null,
        readTimeMinutes: b.readTimeMinutes,
        midArticleCtaTitle: b.midArticleCtaTitle,
        midArticleCtaHref: b.midArticleCtaHref,
        clusterRole: b.clusterRole,
        authorId,
        pillarPostId,
        linkedServiceId,
        coverImageId,
        seoOgImageId,
        ...seoFields(b.seo),
      },
      update: {
        title: b.title,
        category: b.category,
        featured: Boolean(b.featured),
        excerpt: b.excerpt,
        body: rewritePortable(b.body) ?? undefined,
        publishedAt: b.publishedAt ? new Date(b.publishedAt) : null,
        updatedAt: b.updatedAt ? new Date(b.updatedAt) : null,
        readTimeMinutes: b.readTimeMinutes,
        coverImageId,
        seoOgImageId,
        ...seoFields(b.seo),
      },
    });
    counts.blog = (counts.blog ?? 0) + 1;
  }

  for (const g of docs.gallery) {
    const id = g._id ?? slugId("gallery", g.title);
    if (DRY_RUN) {
      counts.gallery = (counts.gallery ?? 0) + 1;
      continue;
    }
    const beforeImageId = await ensureMedia(g.beforeImage);
    const afterImageId = await ensureMedia(g.afterImage);
    const seoOgImageId = await ensureMedia(g.seoOg);
    const seo = seoFields(g.seo);
    const base = {
      title: g.title,
      category: g.category,
      treatmentDetail: g.treatmentDetail,
      consentOnFile: Boolean(g.consentOnFile),
      seoTitle: seo.seoTitle ?? null,
      seoDescription: seo.seoDescription ?? null,
      seoNoindex: seo.seoNoindex ?? false,
    };
    const mediaConnect = {};
    if (beforeImageId) mediaConnect.beforeImage = { connect: { id: beforeImageId } };
    if (afterImageId) mediaConnect.afterImage = { connect: { id: afterImageId } };
    if (seoOgImageId) mediaConnect.seoOgImage = { connect: { id: seoOgImageId } };
    await prisma.galleryItem.upsert({
      where: { id },
      create: { id, ...base, ...mediaConnect },
      update: { ...base, ...mediaConnect },
    });
    counts.gallery = (counts.gallery ?? 0) + 1;
  }

  for (let i = 0; i < docs.testimonials.length; i++) {
    const t = docs.testimonials[i];
    if (DRY_RUN) {
      counts.testimonials = docs.testimonials.length;
      break;
    }
    await prisma.testimonial.upsert({
      where: { id: t._id },
      create: {
        id: t._id,
        quote: t.quote,
        attribution: t.attribution,
        rating: t.rating,
        sortOrder: t.order ?? i,
      },
      update: {
        quote: t.quote,
        attribution: t.attribution,
        rating: t.rating,
        sortOrder: t.order ?? i,
      },
    });
  }
  if (!DRY_RUN) counts.testimonials = docs.testimonials.length;

  for (const h of docs.hyperlocal) {
    const slug = h.slug?.current;
    if (!slug) continue;
    const id = h._id ?? slugId("loc", slug);
    const seoOgImageId = await ensureMedia(h.seoOg);
    if (DRY_RUN) {
      counts.hyperlocal = (counts.hyperlocal ?? 0) + 1;
      continue;
    }
    await prisma.hyperlocalPage.upsert({
      where: { id },
      create: {
        id,
        slug,
        title: h.title,
        areaName: h.areaName,
        serviceFocus: h.serviceFocus,
        distanceFromClinic: h.distanceFromClinic,
        directions: h.directions ?? undefined,
        body: rewritePortable(h.body) ?? undefined,
        linkedServiceId: h.linkedServiceId ?? null,
        seoOgImageId,
        ...seoFields(h.seo),
      },
      update: {
        title: h.title,
        areaName: h.areaName,
        serviceFocus: h.serviceFocus,
        distanceFromClinic: h.distanceFromClinic,
        directions: h.directions ?? undefined,
        body: rewritePortable(h.body) ?? undefined,
        linkedServiceId: h.linkedServiceId ?? null,
        seoOgImageId,
        ...seoFields(h.seo),
      },
    });
    counts.hyperlocal = (counts.hyperlocal ?? 0) + 1;
  }

  for (const r of docs.redirects) {
    if (!r.fromPath || !r.toPath) continue;
    if (DRY_RUN) {
      counts.redirects = (counts.redirects ?? 0) + 1;
      continue;
    }
    await prisma.redirect.upsert({
      where: { fromPath: r.fromPath },
      create: {
        fromPath: r.fromPath,
        toPath: r.toPath,
        statusCode: r.statusCode ?? 301,
      },
      update: { toPath: r.toPath, statusCode: r.statusCode ?? 301 },
    });
    counts.redirects = (counts.redirects ?? 0) + 1;
  }

  return counts;
}

async function main() {
  console.log(DRY_RUN ? "DRY RUN — no database writes" : "Importing Sanity → Prisma…");
  const docs = await fetchAll();
  console.log({
    services: docs.services.length,
    categories: docs.categories.length,
    blog: docs.blogPosts.length,
    redirects: docs.redirects.length,
  });
  if (!DRY_RUN) await preloadImages(docs);
  const counts = await importData(docs);
  console.log("Done:", counts);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
