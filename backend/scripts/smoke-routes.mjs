#!/usr/bin/env node
/** Quick HTTP smoke test for stakeholder demo routes. */
const base = process.argv[2] || "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/contact",
  "/book-consultation",
  "/hair-transplant-in-delhi",
  "/cosmetic-treatments-in-delhi",
  "/gallery",
  "/blog",
  "/faq",
  "/skin-scan",
  "/admin/login",
  "/admin",
  "/admin/content/forms",
  "/admin/content/pages",
  "/admin/content/services",
];

async function check(path) {
  try {
    const res = await fetch(`${base}${path}`, { redirect: "follow" });
    const finalPath = new URL(res.url).pathname.replace(/\/+$/, "") || "/";
    const expected = path.replace(/\/+$/, "") || "/";
    const isAdminGate = path.startsWith("/admin") && path !== "/admin/login" && finalPath === "/admin/login";
    const ok = res.status === 200 && (finalPath === expected || isAdminGate);
    return { path, status: res.status, finalPath, ok };
  } catch (e) {
    return { path, status: 0, ok: false, error: e.message };
  }
}

const results = await Promise.all(routes.map(check));
const failed = results.filter((r) => !r.ok);

for (const r of results) {
  const detail = r.ok ? "" : r.finalPath ? ` -> ${r.finalPath}` : "";
  console.log(`${r.ok ? "OK" : "FAIL"} ${r.status}\t${r.path}${detail}${r.error ? ` (${r.error})` : ""}`);
}

if (failed.length) {
  console.error(`\n${failed.length} route(s) failed`);
  process.exit(1);
}

console.log(`\nAll ${results.length} routes OK`);
