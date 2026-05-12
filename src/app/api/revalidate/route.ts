import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { paths?: string[]; slug?: string; type?: string };
  const paths = new Set<string>(["/", "/blog", "/gallery"]);

  if (Array.isArray(body.paths)) {
    for (const path of body.paths) paths.add(path);
  }
  if (body.type === "service" && body.slug) paths.add(`/services/${body.slug}`);
  if (body.type === "blogPost" && body.slug) paths.add(`/blog/${body.slug}`);

  for (const path of Array.from(paths)) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: Array.from(paths) });
}
