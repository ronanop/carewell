import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { getFrontendPublicDir, getUploadsDir } from "@/lib/cms/paths";

export { getFrontendPublicDir, getUploadsDir };

export async function saveUploadedFile(file: File): Promise<{ id: string; url: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = (file.name.includes(".") ? file.name.split(".").pop() : "bin")?.toLowerCase() ?? "bin";
  const allowedExt = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "mp4", "webm"]);
  const isImageMime = file.type.startsWith("image/");
  const isVideoMime = file.type === "video/mp4" || file.type === "video/webm";
  if (file.type && !isImageMime && !isVideoMime) {
    throw new Error("Only images, GIFs, and MP4/WebM videos are allowed.");
  }
  if (!allowedExt.has(ext)) {
    throw new Error(`File type .${ext} is not supported.`);
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
