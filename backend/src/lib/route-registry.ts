import { readdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const routesRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "routes");

/** Next-only routes (draft mode, ISR); served by the frontend app. */
const NEXT_ONLY_SEGMENTS = new Set(["draft", "disable-draft", "revalidate"]);

export type RouteHandler = (
  req: Request,
  ctx?: { params: Record<string, string> },
) => Response | Promise<Response>;

export type RouteModule = Partial<Record<"GET" | "POST" | "PUT" | "PATCH" | "DELETE", RouteHandler>>;

export type RegisteredRoute = {
  methods: Array<keyof RouteModule>;
  pattern: string;
  modulePath: string;
  load: () => Promise<RouteModule>;
};

function segmentToPattern(segment: string): string {
  if (segment.startsWith("[...") && segment.endsWith("]")) {
    const name = segment.slice(4, -1);
    return `:${name}{.+}`;
  }
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return `:${segment.slice(1, -1)}`;
  }
  return segment;
}

function filePathToApiPattern(rel: string): string {
  const withoutRoute = rel.replace(/\/route\.ts$/, "").replace(/\\/g, "/");
  const segments = withoutRoute.split("/").filter(Boolean);
  const patternSegments = segments.map(segmentToPattern);
  return `/api/${patternSegments.join("/")}`;
}

async function collectRouteFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectRouteFiles(full)));
      continue;
    }
    if (entry.isFile() && entry.name === "route.ts") {
      files.push(full);
    }
  }
  return files;
}

export async function discoverApiRoutes(): Promise<RegisteredRoute[]> {
  const files = await collectRouteFiles(routesRoot);
  const routes: RegisteredRoute[] = [];

  for (const file of files) {
    const rel = relative(routesRoot, file).replace(/\\/g, "/");
    const top = rel.split("/")[0];
    if (top && NEXT_ONLY_SEGMENTS.has(top)) continue;

    const pattern = filePathToApiPattern(rel);
    const moduleUrl = pathToFileURL(file).href;
    const load = () => import(moduleUrl) as Promise<RouteModule>;
    const mod = await load();
    const methods = (["GET", "POST", "PUT", "PATCH", "DELETE"] as const).filter((m) => typeof mod[m] === "function");
    if (methods.length === 0) continue;
    routes.push({ methods, pattern, modulePath: file, load });
  }

  routes.sort((a, b) => b.pattern.length - a.pattern.length);
  return routes;
}
