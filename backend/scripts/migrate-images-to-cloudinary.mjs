#!/usr/bin/env node
/**
 * Upload public + WordPress images to Cloudinary and rewrite frontend source URLs.
 * Skips hero images (hero blocks, theatre bg, homepage hero assets).
 *
 * Usage:
 *   npm run images:migrate
 *   npm run images:migrate -- --dry-run
 *   npm run images:migrate -- --cms   # also re-import scrape JSON to DB
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from "fs";
import { join, relative, extname, basename } from "path";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

const root = repoRoot(import.meta.url);
loadEnvFiles(root);

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  );
}

const DRY_RUN = process.argv.includes("--dry-run");
const RUN_CMS = process.argv.includes("--cms");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"]);
const MANIFEST_PATH = join(root, "db", "seed", "cloudinary-asset-map.json");
const PUBLIC_DIR = join(root, "frontend", "public");
const SRC_DIR = join(root, "frontend", "src");

const HERO_PATH_PATTERNS = [
  /service-hero-theatre/i,
  /hero-background/i,
  /hero-figure/i,
  /home-hero/i,
  /how-it-works-bg/i,
  /treatments-row-fallback/i,
  /navbar-logo/i,
  /carewell-logo/i,
  /whatsapp-icon/i,
  /google-icon/i,
];

function isHeroPublicPath(webPath) {
  const p = webPath.replace(/\\/g, "/");
  return HERO_PATH_PATTERNS.some((re) => re.test(p));
}

function cloudinaryFolder() {
  return process.env.CLOUDINARY_FOLDER?.trim() || "carewell-media";
}

async function getCloudinary() {
  const { v2 } = await import("cloudinary");
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return v2;
}

const MAX_DIRECT_BYTES = 10 * 1024 * 1024;

async function shrinkBufferIfNeeded(buffer, filename) {
  if (buffer.length <= MAX_DIRECT_BYTES) return buffer;
  try {
    const sharp = (await import("sharp")).default;
    let quality = 85;
    let out = await sharp(buffer).jpeg({ quality, mozjpeg: true }).toBuffer();
    while (out.length > MAX_DIRECT_BYTES && quality > 40) {
      quality -= 10;
      out = await sharp(buffer).jpeg({ quality, mozjpeg: true }).toBuffer();
    }
    if (out.length > MAX_DIRECT_BYTES) {
      out = await sharp(buffer).resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    }
    if (out.length > MAX_DIRECT_BYTES) {
      throw new Error(`Could not compress ${filename} below 10MB`);
    }
    console.log(`  compressed ${filename}: ${buffer.length} → ${out.length} bytes`);
    return out;
  } catch (e) {
    throw new Error(
      `File size too large (${buffer.length} bytes) and compression failed: ${e instanceof Error ? e.message : e}`,
    );
  }
}

async function uploadBuffer(cloudinary, buffer, { folder, filename }) {
  const prepared = await shrinkBufferIfNeeded(buffer, filename);
  const mime = guessMime(filename);
  const baseName = basename(filename).replace(/\.[^.]+$/, "") || undefined;
  const opts = {
    folder,
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    filename_override: baseName,
  };

  const dataUri = `data:${mime};base64,${prepared.toString("base64")}`;
  return cloudinary.uploader.upload(dataUri, opts);
}

function guessMime(filename) {
  const ext = extname(filename).toLowerCase();
  const map = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".avif": "image/avif",
  };
  return map[ext] ?? "image/jpeg";
}

function walkImages(dir, base = dir) {
  /** @type {string[]} */
  const out = [];
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) {
      if (name === "_next") continue;
      out.push(...walkImages(abs, base));
      continue;
    }
    if (IMAGE_EXT.has(extname(name).toLowerCase())) {
      out.push(abs);
    }
  }
  return out;
}

const WP_BASE = "https://www.carewellmedicalcentre.com/wp-content/uploads";
const SITE_BASE = "https://www.carewellmedicalcentre.com";

function collectWpUrlsFromDir(dir) {
  /** @type {Set<string>} */
  const urls = new Set();
  const re = /https:\/\/www\.carewellmedicalcentre\.com\/wp-content\/uploads\/[^"'\s)]+/g;
  function walk(d) {
    for (const name of readdirSync(d)) {
      const abs = join(d, name);
      if (statSync(abs).isDirectory()) {
        walk(abs);
        continue;
      }
      if (!/\.(ts|tsx|js|jsx|mjs)$/.test(name)) continue;
      const text = readFileSync(abs, "utf8");
      for (const m of text.matchAll(re)) urls.add(m[0]);
    }
  }
  walk(dir);
  return [...urls];
}

function collectCmsUploadPathsFromDir(dir) {
  /** @type {Set<string>} */
  const paths = new Set();
  const re = /"(\/uploads\/\d{4}\/[^"]+\.(?:webp|jpg|jpeg|png|gif|svg|avif))"/gi;
  function walk(d) {
    for (const name of readdirSync(d)) {
      const abs = join(d, name);
      if (statSync(abs).isDirectory()) {
        walk(abs);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(name)) continue;
      const text = readFileSync(abs, "utf8");
      for (const m of text.matchAll(re)) paths.add(m[1]);
    }
  }
  walk(dir);
  return [...paths];
}

function splitPreservingHeroBlocks(content) {
  const re = /\b(hero(?:Banner|Image|ImageUrl|Face|Legs|Cheek|Glow)?)\s*:\s*\{/g;
  /** @type {{ start: number, end: number }[]} */
  const heroRanges = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    const open = m.index;
    let depth = 1;
    let i = re.lastIndex;
    while (i < content.length && depth > 0) {
      if (content[i] === "{") depth++;
      else if (content[i] === "}") depth--;
      i++;
    }
    heroRanges.push({ start: open, end: i });
  }
  return heroRanges;
}

function isInHeroBlock(pos, ranges) {
  return ranges.some((r) => pos >= r.start && pos < r.end);
}

function isHeroLine(line) {
  return (
    /\bhero(?:Banner|Image|ImageUrl|Face|Legs|Cheek|Glow)?\s*:/.test(line) ||
    /\bheroImageUrl\s*:/.test(line) ||
    /service-hero-theatre/.test(line) ||
    /hero-background/.test(line) ||
    /hero-figure/.test(line) ||
    /home-hero/.test(line) ||
    /backgroundImage:.*service-hero-theatre/.test(line)
  );
}

function resolveMapUrl(from, map) {
  const entry = map[from];
  return entry && !entry.skipHero && entry.url?.startsWith("http") ? entry.url : null;
}

function transformSourceLine(line, map) {
  let out = line;
  let changed = false;

  out = out.replace(/\$\{WP\}(\/[^`"']+)/g, (match, suffix) => {
    const url = resolveMapUrl(`${WP_BASE}${suffix}`, map);
    if (url) {
      changed = true;
      return url;
    }
    return match;
  });

  out = out.replace(
    /"(https:\/\/www\.carewellmedicalcentre\.com\/wp-content\/uploads\/[^"]+)"/g,
    (match, full) => {
      const url = resolveMapUrl(full, map);
      if (url) {
        changed = true;
        return `"${url}"`;
      }
      return match;
    },
  );

  out = out.replace(/"(\/[^"]+\.(?:webp|jpg|jpeg|png|gif|svg|avif))"/gi, (match, localPath) => {
    if (localPath.startsWith("//")) return match;
    const url = resolveMapUrl(localPath, map);
    if (url) {
      changed = true;
      return `"${url}"`;
    }
    return match;
  });

  return { out, changed };
}

function applyMapToSourceFiles(map) {
  let filesChanged = 0;

  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name);
      if (statSync(abs).isDirectory()) {
        walk(abs);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(name)) continue;

      const content = readFileSync(abs, "utf8");
      const heroRanges = splitPreservingHeroBlocks(content);
      const lines = content.split("\n");
      let changed = false;
      let offset = 0;

      const newLines = lines.map((line) => {
        const lineStart = offset;
        offset += line.length + 1;
        if (isHeroLine(line) || isInHeroBlock(lineStart, heroRanges)) return line;
        const result = transformSourceLine(line, map);
        if (result.changed) changed = true;
        return result.out;
      });

      if (changed) {
        const next = newLines.join("\n");
        if (!DRY_RUN) writeFileSync(abs, next, "utf8");
        filesChanged++;
        console.log(`  updated ${relative(root, abs)}`);
      }
    }
  }

  walk(SRC_DIR);
  return filesChanged;
}

function isValidImageBuffer(buffer) {
  if (!buffer || buffer.length < 200) return false;
  const h = buffer;
  if (h[0] === 0xff && h[1] === 0xd8) return true;
  if (h[0] === 0x89 && h[1] === 0x50 && h[2] === 0x4e && h[3] === 0x47) return true;
  if (h[0] === 0x47 && h[1] === 0x49 && h[2] === 0x46) return true;
  if (h[0] === 0x52 && h[1] === 0x49 && h[2] === 0x46 && h[3] === 0x46) return true;
  if (h.length > 12 && h[8] === 0x57 && h[9] === 0x45 && h[10] === 0x42 && h[11] === 0x50) return true;
  return false;
}

function localPathCandidates(webPath) {
  const rel = webPath.replace(/^\//, "");
  return [
    join(root, rel),
    join(root, "frontend", "public", rel),
    join(root, "uploads", rel.replace(/^uploads\//, "")),
  ];
}

function readLocalImage(webPath) {
  for (const abs of localPathCandidates(webPath)) {
    if (!existsSync(abs)) continue;
    const buffer = readFileSync(abs);
    if (isValidImageBuffer(buffer)) return { buffer, abs };
  }
  return null;
}

async function uploadRemoteImage(cloudinary, url, folder, { mapKey } = {}) {
  if (mapKey?.startsWith("/")) {
    const local = readLocalImage(mapKey);
    if (local) {
      const fname = basename(local.abs);
      return uploadBuffer(cloudinary, local.buffer, { folder, filename: fname });
    }
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; CareWellImageMigrator/1.0)",
      Accept: "image/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (!isValidImageBuffer(buffer)) {
    throw new Error("Response is not a valid image (site may be blocking bots)");
  }
  const fname = url.split("/").pop() || "image.jpg";
  return uploadBuffer(cloudinary, buffer, { folder, filename: fname });
}

async function main() {
  if (!isCloudinaryConfigured()) {
    console.error("Cloudinary not configured — set CLOUDINARY_* in frontend/.env.local");
    process.exit(1);
  }

  const cloudinary = await getCloudinary();
  const siteFolder = `${cloudinaryFolder()}/site`;
  const wpFolder = `${cloudinaryFolder()}/wp`;

  /** @type {Record<string, { url: string, publicId: string, skipHero?: boolean }>} */
  const map = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
    : {};

  console.log(DRY_RUN ? "(dry run)\n" : "");
  console.log("1) Uploading frontend/public images…");
  const publicFiles = walkImages(PUBLIC_DIR);
  let uploaded = 0;
  let skippedHero = 0;

  for (const abs of publicFiles) {
    const rel = "/" + relative(PUBLIC_DIR, abs).replace(/\\/g, "/");
    if (isHeroPublicPath(rel)) {
      skippedHero++;
      map[rel] = { url: rel, publicId: "", skipHero: true };
      continue;
    }
    if (map[rel]?.url?.startsWith("http")) {
      continue;
    }
    if (DRY_RUN) {
      console.log(`  would upload ${rel}`);
      uploaded++;
      continue;
    }
    const buffer = readFileSync(abs);
    const sub = relative(PUBLIC_DIR, abs).replace(/\\/g, "/");
    const subDir = sub.includes("/") ? sub.slice(0, sub.lastIndexOf("/")) : "";
    const result = await uploadBuffer(cloudinary, buffer, {
      folder: subDir ? `${siteFolder}/${subDir}` : siteFolder,
      filename: basename(abs),
    });
    map[rel] = { url: result.secure_url, publicId: result.public_id };
    uploaded++;
    process.stdout.write(`\r  public: ${uploaded}/${publicFiles.length - skippedHero}`);
  }
  console.log(`\n  ${uploaded} uploaded, ${skippedHero} hero/static UI skipped`);

  console.log("2) Uploading WordPress URLs from source…");
  const wpUrls = collectWpUrlsFromDir(SRC_DIR);
  let wpOk = 0;
  for (const url of wpUrls) {
    if (map[url]?.url?.startsWith("http")) continue;
    if (DRY_RUN) {
      console.log(`  would upload ${url.slice(0, 80)}…`);
      wpOk++;
      continue;
    }
    try {
      const result = await uploadRemoteImage(cloudinary, url, wpFolder);
      map[url] = { url: result.secure_url, publicId: result.public_id };
      wpOk++;
      process.stdout.write(`\r  wp: ${wpOk}/${wpUrls.length}`);
    } catch (e) {
      const msg =
        e && typeof e === "object" && "message" in e
          ? String(e.message)
          : e instanceof Error
            ? e.message
            : String(e);
      console.warn(`\n  skip ${url}: ${msg}`);
    }
  }
  console.log(`\n  ${wpOk} WordPress images on Cloudinary`);

  console.log("2b) Uploading CMS /uploads paths from source…");
  const cmsPaths = collectCmsUploadPathsFromDir(SRC_DIR);
  const cmsFolder = `${cloudinaryFolder()}/cms`;
  let cmsOk = 0;
  for (const webPath of cmsPaths) {
    if (map[webPath]?.url?.startsWith("http")) continue;
    const remote = `${SITE_BASE}${webPath}`;
    if (DRY_RUN) {
      console.log(`  would upload ${webPath}`);
      cmsOk++;
      continue;
    }
    try {
      const result = await uploadRemoteImage(cloudinary, remote, cmsFolder, { mapKey: webPath });
      map[webPath] = { url: result.secure_url, publicId: result.public_id };
      cmsOk++;
      process.stdout.write(`\r  cms: ${cmsOk}/${cmsPaths.length}`);
    } catch (e) {
      const msg =
        e && typeof e === "object" && "message" in e
          ? String(e.message)
          : e instanceof Error
            ? e.message
            : String(e);
      console.warn(`\n  skip ${webPath}: ${msg}`);
    }
  }
  console.log(`\n  ${cmsOk} CMS upload images on Cloudinary`);

  if (!DRY_RUN) {
    mkdirSync(join(root, "db", "seed"), { recursive: true });
    writeFileSync(MANIFEST_PATH, `${JSON.stringify(map, null, 2)}\n`, "utf8");
    console.log(`  manifest → ${relative(root, MANIFEST_PATH)}`);
  }

  console.log("3) Rewriting frontend/src URLs (non-hero)…");
  const changed = applyMapToSourceFiles(map);
  console.log(`  ${changed} files updated`);

  if (RUN_CMS && !DRY_RUN) {
    console.log("4) Re-importing CMS scrape JSON (body images → Cloudinary, heroes skipped)…");
    const { execSync } = await import("child_process");
    execSync("npm run scrape:import", { cwd: root, stdio: "inherit" });
    execSync("npm run scrape:import-blog", { cwd: root, stdio: "inherit" });
  } else if (!DRY_RUN) {
    console.log("\nRe-import CMS body images with:");
    console.log("  npm run images:migrate -- --cms");
    console.log("  (or: npm run scrape:import && npm run scrape:import-blog)");
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
