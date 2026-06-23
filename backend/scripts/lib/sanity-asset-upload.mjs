import { extname } from "path";

const DEFAULT_EXT = ".jpg";

function extFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = extname(pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext)) return ext;
  } catch {
    /* ignore */
  }
  return DEFAULT_EXT;
}

function contentTypeForExt(ext) {
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "image/jpeg";
}

function normalizeImageUrl(url) {
  if (!url?.trim()) return null;
  let u = url.trim();
  if (u.startsWith("//")) u = `https:${u}`;
  if (u.startsWith("/")) {
    const base =
      process.env.WORDPRESS_API_URL?.trim() ||
      process.env.SCRAPER_BASE_URL?.trim() ||
      "https://www.carewellmedicalcentre.com";
    return `${base.replace(/\/$/, "")}${u}`;
  }
  try {
    const parsed = new URL(u);
    if (parsed.hostname === "test.carewellmedicalcentre.com") {
      parsed.hostname = "www.carewellmedicalcentre.com";
      parsed.protocol = "https:";
      return parsed.toString();
    }
  } catch {
    return null;
  }
  return u;
}

/** Upload remote images to Sanity with in-memory deduplication. */
export class SanityAssetUploader {
  /** @param {import('@sanity/client').SanityClient} client */
  constructor(client) {
    this.client = client;
    /** @type {Map<string, string>} */
    this.refByUrl = new Map();
  }

  /**
   * @param {string} url
   * @param {string} [alt]
   * @returns {Promise<string | null>} Sanity image asset document id
   */
  async uploadFromUrl(url, alt = "") {
    const normalized = normalizeImageUrl(url);
    if (!normalized) return null;
    if (this.refByUrl.has(normalized)) return this.refByUrl.get(normalized);

    try {
      const res = await fetch(normalized, {
        headers: { Accept: "image/*" },
        signal: AbortSignal.timeout(30_000),
      });
      if (!res.ok) return null;

      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("text/html")) return null;

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length < 64) return null;

      const ext = extFromUrl(normalized);
      const filename = `wp-${Buffer.from(normalized).toString("base64url").slice(0, 24)}${ext}`;
      const asset = await this.client.assets.upload("image", buffer, {
        filename,
        contentType: contentTypeForExt(ext),
      });

      this.refByUrl.set(normalized, asset._id);
      if (alt) this.refByUrl.set(`${normalized}::alt`, alt);
      return asset._id;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} url
   * @param {string} [alt]
   */
  async imageField(url, alt = "") {
    const ref = await this.uploadFromUrl(url, alt);
    if (!ref) return undefined;
    return {
      _type: "image",
      asset: { _type: "reference", _ref: ref },
      alt: alt || undefined,
    };
  }

  /** @param {unknown[]} blocks */
  async normalizePortableImages(blocks) {
    if (!Array.isArray(blocks)) return blocks;
    const out = [];
    for (const block of blocks) {
      if (block?._type === "image" && block.assetRef) {
        out.push({
          _type: "image",
          _key: block._key,
          asset: { _type: "reference", _ref: block.assetRef },
          alt: block.alt?.trim() || "Image",
        });
        continue;
      }
      if (block?._type === "image" && block.url && !block.asset) {
        const field = await this.imageField(block.url, block.alt ?? "");
        if (field) {
          out.push({
            _type: "image",
            _key: block._key,
            ...field,
            alt: field.alt || block.alt?.trim() || "Image",
          });
          continue;
        }
      }
      out.push(block);
    }
    return out;
  }
}
