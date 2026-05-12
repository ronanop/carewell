import bundleAnalyzer from "@next/bundle-analyzer";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMigrationRedirects() {
  const filePath = join(__dirname, "redirects.migration.json");
  if (!existsSync(filePath)) return [];
  try {
    const raw = JSON.parse(readFileSync(filePath, "utf8"));
    if (!Array.isArray(raw)) return [];
    return raw.map((r) => ({
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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
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
};

export default withBundleAnalyzer(nextConfig);
