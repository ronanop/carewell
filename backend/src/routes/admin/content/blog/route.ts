import { isErrorResponse } from "@/lib/http";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";
import { findLegacyPathByBlogSlug } from "@/lib/legacy-path-db";
import { requireAdminApi } from "@/lib/require-admin-api";
import { upsertBlogPost } from "@/lib/cms/admin-write";
import { getBlogPostsList } from "@/lib/cms/queries";
export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const posts = await getBlogPostsList();
  return Response.json({ ok: true, posts });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;
  const body = await req.json();
  if (!body.slug || !body.title) {
    return Response.json({ ok: false, error: "slug and title required" }, { status: 400 });
  }
  const id = await upsertBlogPost(body);
  const legacyPath = body.legacyPath ?? (await findLegacyPathByBlogSlug(body.slug));
  await revalidateBlogPaths(legacyPath, body.slug);
  return Response.json({ ok: true, id });
}
