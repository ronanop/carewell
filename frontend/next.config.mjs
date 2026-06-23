import bundleAnalyzer from "@next/bundle-analyzer";

import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

import { existsSync, readFileSync } from "fs";

import { dirname, join } from "path";

import { fileURLToPath } from "url";



const withBundleAnalyzer = bundleAnalyzer({

  enabled: process.env.ANALYZE === "true",

});



const __dirname = dirname(fileURLToPath(import.meta.url));

const repoRoot = join(__dirname, "..");

loadEnvConfig(repoRoot);

loadEnvConfig(__dirname);



/** First-class App Router pages — legacy migration redirects must not override these. */
const PROTECTED_SITE_PATHS = new Set([
  "/about",
  "/about/dr-bhasin",
  "/contact",
  "/faq",
  "/gallery",
  "/blog",
  "/book-consultation",
  "/cost-estimator",
  "/skin-scan",
  "/thank-you",
]);

function normalizeRedirectSource(source) {
  return source.replace(/\/+$/, "") || "/";
}

function loadMigrationRedirects() {

  const filePath = join(__dirname, "..", "db", "redirects.migration.json");

  if (!existsSync(filePath)) return [];

  try {

    const raw = JSON.parse(readFileSync(filePath, "utf8"));

    if (!Array.isArray(raw)) return [];

    return raw
      .filter((r) => !PROTECTED_SITE_PATHS.has(normalizeRedirectSource(r.from)))
      .map((r) => ({

      source: r.from,

      destination: r.to,

      permanent: r.permanent !== false,

    }));

  } catch {

    return [];

  }

}



/** @type {import('next').NextConfig} */

const nextConfig = {

  transpilePackages: ["@carewell/backend"],

  experimental: {

    serverComponentsExternalPackages: ["cheerio", "@prisma/client", "prisma"],

    optimizePackageImports: ["lucide-react", "@tiptap/react", "@tiptap/starter-kit"],

  },

  webpack: (config, { dev }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/lib/css-health": join(__dirname, "src/lib/css-health.ts"),
      "@/portable-text": join(__dirname, "src/lib/portable-text"),
      "@/lib": join(__dirname, "../backend/src/lib"),
      "@/sanity": join(__dirname, "../backend/src/sanity"),
    };

    // Prefer hoisted workspace deps without overriding Next's compiled React runtime.
    config.resolve.modules = [
      join(repoRoot, "node_modules"),
      ...(config.resolve.modules ?? ["node_modules"]),
    ];

    if (dev) {
      // Avoid filesystem cache — stale module factories break SSR hooks on OneDrive.
      config.cache = false;
      config.snapshot = {
        ...(config.snapshot ?? {}),
        managedPaths: [],
        immutablePaths: [],
      };
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        poll: 1000,
      };
    }

    return config;
  },

  async headers() {
    // Long-lived cache only in production — dev must not cache webpack chunks (stale HMR → "reading 'call'").
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  images: {

    remotePatterns: [

      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },

      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },

      {

        protocol: "https",

        hostname: "www.carewellmedicalcentre.com",

        pathname: "/wp-content/uploads/**",

      },

      {

        protocol: "https",

        hostname: "carewellmedicalcentre.com",

        pathname: "/wp-content/uploads/**",

      },

      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },

    ],

  },

  async redirects() {

    return [

      {

        source: "/services/hair-transplant",

        destination: "/hair-transplant-in-delhi",

        permanent: true,

      },

      ...loadMigrationRedirects(),

    ];

  },

  async rewrites() {
    const apiBase = (process.env.API_URL || process.env.BACKEND_URL || "").replace(/\/$/, "");
    const useExternalApi =
      Boolean(apiBase) &&
      !/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i.test(apiBase);

    const beforeFiles = [
      {
        source: "/uploads/:path*",
        destination: useExternalApi
          ? `${apiBase}/api/serve-upload/:path*`
          : "/api/serve-upload/:path*",
      },
    ];

    if (useExternalApi) {
      return {
        beforeFiles,
        afterFiles: [{ source: "/api/:path*", destination: `${apiBase}/api/:path*` }],
      };
    }

    return { beforeFiles };
  },

};



export default withBundleAnalyzer(nextConfig);

