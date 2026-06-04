import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

/** Raw SQL accessors for Service.legacyPath (works before Prisma client is regenerated). */

export async function findServiceIdByLegacyPath(legacyPath: string): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "Service" WHERE "legacyPath" = ${legacyPath} LIMIT 1
  `;
  return rows[0]?.id ?? null;
}

export async function findLegacyPathBySlug(slug: string, locale = "en"): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ legacyPath: string | null }[]>`
    SELECT "legacyPath" FROM "Service"
    WHERE slug = ${slug} AND locale = ${locale}
    LIMIT 1
  `;
  return rows[0]?.legacyPath ?? null;
}

export async function getLegacyPathByServiceId(id: string): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ legacyPath: string | null }[]>`
    SELECT "legacyPath" FROM "Service" WHERE id = ${id} LIMIT 1
  `;
  return rows[0]?.legacyPath ?? null;
}

export async function listServiceIdsForAdmin(search?: string): Promise<string[]> {
  if (search?.trim()) {
    const pattern = `%${search.trim()}%`;
    const rows = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "Service"
      WHERE title ILIKE ${pattern}
         OR slug ILIKE ${pattern}
         OR "legacyPath" ILIKE ${pattern}
      ORDER BY "legacyPath" ASC NULLS LAST
      LIMIT 500
    `;
    return rows.map((r) => r.id);
  }
  const rows = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "Service"
    ORDER BY "legacyPath" ASC NULLS LAST
    LIMIT 500
  `;
  return rows.map((r) => r.id);
}

export async function listLegacyPathsFromDb(): Promise<string[]> {
  const rows = await prisma.$queryRaw<{ legacyPath: string }[]>`
    SELECT "legacyPath" FROM "Service"
    WHERE "legacyPath" IS NOT NULL
    ORDER BY "legacyPath" ASC
  `;
  return rows.map((r) => r.legacyPath);
}

export async function getLegacyPathsByServiceIds(ids: string[]): Promise<Map<string, string | null>> {
  if (!ids.length) return new Map();
  const rows = await prisma.$queryRaw<{ id: string; legacyPath: string | null }[]>`
    SELECT id, "legacyPath" FROM "Service" WHERE id IN (${Prisma.join(ids)})
  `;
  return new Map(rows.map((r) => [r.id, r.legacyPath]));
}

export async function setServiceLegacyPath(serviceId: string, legacyPath: string | null): Promise<void> {
  await prisma.$executeRaw`
    UPDATE "Service" SET "legacyPath" = ${legacyPath} WHERE id = ${serviceId}
  `;
}

/** Raw SQL accessors for BlogPost.legacyPath (works before Prisma client is regenerated). */

export async function findBlogIdByLegacyPath(legacyPath: string): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "BlogPost" WHERE "legacyPath" = ${legacyPath} LIMIT 1
  `;
  return rows[0]?.id ?? null;
}

export async function findLegacyPathByBlogSlug(slug: string): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ legacyPath: string | null }[]>`
    SELECT "legacyPath" FROM "BlogPost" WHERE slug = ${slug} LIMIT 1
  `;
  return rows[0]?.legacyPath ?? null;
}

export async function getLegacyPathByBlogId(id: string): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ legacyPath: string | null }[]>`
    SELECT "legacyPath" FROM "BlogPost" WHERE id = ${id} LIMIT 1
  `;
  return rows[0]?.legacyPath ?? null;
}

export async function listBlogIdsForAdmin(search?: string): Promise<string[]> {
  if (search?.trim()) {
    const pattern = `%${search.trim()}%`;
    const rows = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "BlogPost"
      WHERE title ILIKE ${pattern}
         OR slug ILIKE ${pattern}
         OR "legacyPath" ILIKE ${pattern}
      ORDER BY "legacyPath" ASC NULLS LAST
      LIMIT 500
    `;
    return rows.map((r) => r.id);
  }
  const rows = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "BlogPost"
    ORDER BY "legacyPath" ASC NULLS LAST
    LIMIT 500
  `;
  return rows.map((r) => r.id);
}

export async function listLegacyBlogPathsFromDb(): Promise<string[]> {
  const rows = await prisma.$queryRaw<{ legacyPath: string }[]>`
    SELECT "legacyPath" FROM "BlogPost"
    WHERE "legacyPath" IS NOT NULL
    ORDER BY "legacyPath" ASC
  `;
  return rows.map((r) => r.legacyPath);
}

export async function getLegacyPathsByBlogIds(ids: string[]): Promise<Map<string, string | null>> {
  if (!ids.length) return new Map();
  const rows = await prisma.$queryRaw<{ id: string; legacyPath: string | null }[]>`
    SELECT id, "legacyPath" FROM "BlogPost" WHERE id IN (${Prisma.join(ids)})
  `;
  return new Map(rows.map((r) => [r.id, r.legacyPath]));
}

export async function setBlogLegacyPath(blogId: string, legacyPath: string | null): Promise<void> {
  await prisma.$executeRaw`
    UPDATE "BlogPost" SET "legacyPath" = ${legacyPath} WHERE id = ${blogId}
  `;
}
