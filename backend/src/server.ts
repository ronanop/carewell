import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { discoverApiRoutes } from "@/lib/route-registry";
import { dispatchApiRequest } from "@/lib/api-dispatch";
import { loadRepoEnv } from "@/lib/load-repo-env";
import { isCloudinaryEnabled } from "@/lib/cloudinary";

loadRepoEnv(join(dirname(fileURLToPath(import.meta.url)), "..", ".."));

const port = Number(process.env.API_PORT ?? process.env.BACKEND_PORT ?? 4000);
const frontendOrigin =
  process.env.FRONTEND_URL?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "http://localhost:3000";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);

app.get("/health", (c) => c.json({ ok: true, service: "@carewell/backend" }));

const routes = await discoverApiRoutes();

app.all("/api/*", async (c) => {
  try {
    return await dispatchApiRequest(c.req.raw);
  } catch (err) {
    console.error("[api]", c.req.method, c.req.path, err);
    return Response.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
});

console.info(`[api] ${routes.length} route modules on :${port}`);
console.info(`[api] CORS origin: ${frontendOrigin}`);
console.info(`[api] Media storage: ${isCloudinaryEnabled() ? "cloudinary" : "local disk"}`);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.info(`[api] listening http://localhost:${info.port}`);
  },
);
