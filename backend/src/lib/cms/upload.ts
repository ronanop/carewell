import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import {
  CLOUDINARY_PATH_PREFIX,
  deleteFromCloudinary,
  isCloudinaryEnabled,
  parseCloudinaryPublicId,
  uploadToCloudinary,
} from "@/lib/cloudinary";
import { getFrontendPublicDir, getUploadsDir } from "@/lib/cms/paths";

export { getFrontendPublicDir, getUploadsDir };

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "mp4", "webm"]);

function validateUpload(file: File, ext: string): void {
  const isImageMime = file.type.startsWith("image/");
  const isVideoMime = file.type === "video/mp4" || file.type === "video/webm";
  if (file.type && !isImageMime && !isVideoMime) {
    throw new Error("Only images, GIFs, and MP4/WebM videos are allowed.");
  }
  if (!ALLOWED_EXT.has(ext)) {
    throw new Error(`File type .${ext} is not supported.`);
  }
}

export async function saveUploadedFile(file: File): Promise<{ id: string; url: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = (file.name.includes(".") ? file.name.split(".").pop() : "bin")?.toLowerCase() ?? "bin";
  validateUpload(file, ext);

  if (isCloudinaryEnabled()) {
    const uploaded = await uploadToCloudinary(buffer, file.name, file.type || `image/${ext}`);
    const media = await prisma.media.create({
      data: {
        filename: file.name || uploaded.publicId.split("/").pop() || "upload",
        path: `${CLOUDINARY_PATH_PREFIX}${uploaded.publicId}`,
        url: uploaded.url,
        mimeType: uploaded.mimeType,
        size: uploaded.size,
        width: uploaded.width ?? null,
        height: uploaded.height ?? null,
      },
    });
    return { id: media.id, url: media.url };
  }

  const year = new Date().getFullYear();
  const base = randomBytes(8).toString("hex");
  const filename = `${base}.${ext}`;
  const relPath = `uploads/${year}/${filename}`;
  const absDir = getUploadsDir(year);
  await mkdir(absDir, { recursive: true });
  await writeFile(join(absDir, filename), buffer);
  const url = `/${relPath}`;
  const media = await prisma.media.create({
    data: {
      filename: file.name || filename,
      path: relPath,
      url,
      mimeType: file.type || null,
      size: buffer.length,
    },
  });
  return { id: media.id, url: media.url };
}

export async function deleteStoredMedia(media: {
  path: string;
  mimeType?: string | null;
}): Promise<void> {
  const publicId = parseCloudinaryPublicId(media.path);
  if (publicId) {
    await deleteFromCloudinary(publicId, media.mimeType);
    return;
  }

  // Local files are left on disk; only the DB row is removed (existing behaviour).
}
