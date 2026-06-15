/**
 * Download WordPress images and upload to Cloudinary (or hotlink when not configured).
 */
import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_PREFIX = "cloudinary:";

let cloudinaryReady = false;

export function isCloudinaryEnabled() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function ensureCloudinary() {
  if (cloudinaryReady) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  cloudinaryReady = true;
}

function cloudinaryFolder() {
  return process.env.CLOUDINARY_FOLDER?.trim() || "carewell-media";
}

function guessFilename(url) {
  try {
    const name = new URL(url).pathname.split("/").pop() || "image.jpg";
    return name.includes(".") ? name : `${name}.jpg`;
  } catch {
    return "image.jpg";
  }
}

function guessMime(filename) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "jpg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  if (ext === "svg") return "image/svg+xml";
  return "image/jpeg";
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "CareWellImageMigrator/1.0", Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) throw new Error("Image too small");
  return buf;
}

async function uploadToCloudinary(buffer, filename, mimeType) {
  ensureCloudinary();
  const folder = cloudinaryFolder();
  const resourceType = mimeType.startsWith("video/") ? "video" : "image";

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        filename_override: filename.replace(/\.[^.]+$/, "") || undefined,
      },
      (error, result) => {
        if (error) reject(error);
        else if (!result) reject(new Error("Empty Cloudinary response"));
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export function createImageResolver(prisma) {
  /** @type {Map<string, { url: string, mediaId: string | null }>} */
  const cache = new Map();

  return async function resolveImage(sourceUrl, alt = "Image") {
    if (!sourceUrl || sourceUrl.startsWith("data:")) return null;

    let absolute = sourceUrl;
    try {
      absolute = new URL(sourceUrl).href;
    } catch {
      return null;
    }

    if (cache.has(absolute)) return cache.get(absolute);

    const filename = guessFilename(absolute);
    const mimeType = guessMime(filename);

    try {
      if (isCloudinaryEnabled()) {
        const buffer = await downloadBuffer(absolute);
        const uploaded = await uploadToCloudinary(buffer, filename, mimeType);
        const resolvedMime =
          uploaded.resource_type === "video"
            ? `video/${uploaded.format ?? "mp4"}`
            : uploaded.format
              ? `image/${uploaded.format}`
              : mimeType;

        const media = await prisma.media.create({
          data: {
            filename: filename || uploaded.public_id.split("/").pop() || "imported",
            path: `${CLOUDINARY_PREFIX}${uploaded.public_id}`,
            url: uploaded.secure_url,
            alt: alt || null,
            mimeType: resolvedMime,
            size: uploaded.bytes ?? buffer.length,
            width: uploaded.width ?? null,
            height: uploaded.height ?? null,
          },
        });

        const result = { url: media.url, mediaId: media.id };
        cache.set(absolute, result);
        return result;
      }

      const result = { url: absolute, mediaId: null };
      cache.set(absolute, result);
      return result;
    } catch (err) {
      console.warn(`  Image skip: ${absolute} (${err instanceof Error ? err.message : err})`);
      return null;
    }
  };
}
