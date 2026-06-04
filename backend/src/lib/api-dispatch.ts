import { discoverApiRoutes, type RouteModule, type RegisteredRoute } from "@/lib/route-registry";
import { runWithRequest } from "@/lib/request-context";

let routesPromise: Promise<RegisteredRoute[]> | null = null;

function loadRoutes(): Promise<RegisteredRoute[]> {
  if (!routesPromise) routesPromise = discoverApiRoutes();
  return routesPromise;
}

type PatternMatch = { params: Record<string, string> };

function patternToRegex(pattern: string): { regex: RegExp; paramNames: string[] } {
  const paramNames: string[] = [];
  const segments = pattern.split("/").filter(Boolean);
  let source = "^";
  for (const segment of segments) {
    source += "/";
    if (segment.startsWith(":")) {
      const greedy = segment.endsWith("{.+}");
      const name = greedy ? segment.slice(1, -4) : segment.slice(1);
      paramNames.push(name);
      source += greedy ? "(.+)" : "([^/]+)";
      continue;
    }
    source += segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  source += "/?$";
  return { regex: new RegExp(source), paramNames };
}

function matchRoute(pathname: string, pattern: string): PatternMatch | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const { regex, paramNames } = patternToRegex(pattern);
  const match = normalized.match(regex);
  if (!match) return null;

  const params: Record<string, string> = {};
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1] ?? "";
  });
  return { params };
}

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export async function dispatchApiRequest(req: Request): Promise<Response> {
  const pathname = new URL(req.url).pathname;
  const routes = await loadRoutes();

  for (const route of routes) {
    const matched = matchRoute(pathname, route.pattern);
    if (!matched) continue;

    const mod = await route.load();
    const method = req.method.toUpperCase() as keyof RouteModule;
    const handler = mod[method];
    if (!handler) {
      return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
    }

    return runWithRequest(req, () => handler(req, { params: matched.params }));
  }

  return Response.json({ ok: false, error: "Not found" }, { status: 404 });
}

export async function listRegisteredApiRoutes(): Promise<RegisteredRoute[]> {
  return loadRoutes();
}

export { METHODS as API_HTTP_METHODS };
