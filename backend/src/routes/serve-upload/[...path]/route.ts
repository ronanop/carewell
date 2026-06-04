import { readFile } from "fs/promises";
import { join, normalize } from "path";
import { getUploadsRoot, mimeFromExt } from "@/lib/cms/paths";

export async function GET(_req: Request, { params }: { params: { path: string } }) {
  const uploadsRoot = normalize(getUploadsRoot());
  const rel = params.path;
  const abs = normalize(join(uploadsRoot, rel));

  if (!abs.startsWith(uploadsRoot)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await readFile(abs);
    const ext = rel.split(".").pop() ?? "";
    return new Response(data, {
      headers: {
        "Content-Type": mimeFromExt(ext),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
