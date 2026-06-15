import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export const CLOUDINARY_PATH_PREFIX = "cloudinary:" as const;

let configured = false;

function ensureConfigured(): void {
  if (configured) return;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured (CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET).");
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
  configured = true;
}

export function isCloudinaryEnabled(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function cloudinaryFolder(): string {
  return process.env.CLOUDINARY_FOLDER?.trim() || "carewell-media";
}

export type CloudinaryUploadResult = {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  mimeType: string | null;
  size: number;
};

export async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  mimeType: string,
): Promise<CloudinaryUploadResult> {
  ensureConfigured();
  const folder = cloudinaryFolder();
  const resourceType = mimeType.startsWith("video/") ? "video" : "image";

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        filename_override: filename.replace(/\.[^.]+$/, "") || undefined,
      },
      (error, uploadResult) => {
        if (error) reject(error);
        else if (!uploadResult) reject(new Error("Empty Cloudinary response"));
        else resolve(uploadResult);
      },
    );
    stream.end(buffer);
  });

  const resolvedMime =
    result.resource_type === "video"
      ? `video/${result.format ?? "mp4"}`
      : result.format
        ? `image/${result.format}`
        : mimeType || null;

  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
    mimeType: resolvedMime,
    size: result.bytes ?? buffer.length,
  };
}

export function parseCloudinaryPublicId(path: string): string | null {
  if (!path.startsWith(CLOUDINARY_PATH_PREFIX)) return null;
  return path.slice(CLOUDINARY_PATH_PREFIX.length);
}

export async function deleteFromCloudinary(publicId: string, mimeType?: string | null): Promise<void> {
  ensureConfigured();
  const resourceType = mimeType?.startsWith("video/") ? "video" : "image";
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
}
