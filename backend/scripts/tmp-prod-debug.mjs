import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const slug = "penile-vitiligo-can-be-treated-see-how";
const rows = await prisma.blogPost.findMany({
  where: {
    OR: [{ slug }, { legacyPath: `/${slug}` }, { id: `blog-${slug}` }],
  },
  select: { id: true, slug: true, legacyPath: true, title: true, body: true },
});

for (const r of rows) {
  console.log({
    id: r.id,
    slug: r.slug,
    legacyPath: r.legacyPath,
    title: r.title,
    bodyBlocks: Array.isArray(r.body) ? r.body.length : r.body == null ? "null" : typeof r.body,
  });
}

const withBody = await prisma.$queryRaw`
  SELECT id, slug, "legacyPath", title, jsonb_array_length(body::jsonb) AS blocks
  FROM "BlogPost"
  WHERE body IS NOT NULL AND body::text != 'null'
  LIMIT 5
`;
console.log("sample with body:", withBody);

const count = await prisma.$queryRaw`
  SELECT COUNT(*)::int AS n FROM "BlogPost"
  WHERE body IS NOT NULL AND jsonb_typeof(body::jsonb) = 'array' AND jsonb_array_length(body::jsonb) > 0
`;
console.log("posts with body:", count);

await prisma.$disconnect();
