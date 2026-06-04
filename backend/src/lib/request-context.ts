import { AsyncLocalStorage } from "node:async_hooks";

const store = new AsyncLocalStorage<Request>();

export function runWithRequest<T>(req: Request, fn: () => T): T {
  return store.run(req, fn);
}

export function getActiveRequest(): Request | undefined {
  return store.getStore();
}
