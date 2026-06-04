import { API_HTTP_METHODS, dispatchApiRequest } from "@carewell/backend/lib/api-dispatch";

export const dynamic = "force-dynamic";

async function handle(req: Request): Promise<Response> {
  try {
    return await dispatchApiRequest(req);
  } catch (err) {
    console.error("[api]", req.method, new URL(req.url).pathname, err);
    return Response.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}

/** Ensure Next bundles all HTTP verbs used by backend routes. */
void API_HTTP_METHODS;
