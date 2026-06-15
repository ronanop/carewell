import { isErrorResponse } from "@/lib/http";
import { requireAdminApi } from "@/lib/require-admin-api";
import { saveUploadedFile } from "@/lib/cms/upload";
import { isCloudinaryEnabled } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "No file" }, { status: 400 });
  }

  try {
    const media = await saveUploadedFile(file);
    return Response.json({
      ok: true,
      storage: isCloudinaryEnabled() ? "cloudinary" : "local",
      media,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
