import { PrismaClient } from "@prisma/client";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Set DATABASE_URL");
  process.exit(1);
}

const prisma = new PrismaClient({ datasources: { db: { url } } });

const blog = await prisma.blogPost.findFirst({
  where: { legacyPath: "/penile-vitiligo-can-be-treated-see-how" },
  select: { title: true, body: true, excerpt: true },
});
const svc = await prisma.service.findFirst({
  where: { legacyPath: "/skin-treatments-in-delhi/microneedling" },
  select: { title: true, whatIsBody: true },
});

console.log({
  blogTitle: blog?.title,
  blogBodyBlocks: Array.isArray(blog?.body) ? blog.body.length : 0,
  blogExcerpt: blog?.excerpt?.slice(0, 60),
  serviceTitle: svc?.title,
  serviceBodyBlocks: Array.isArray(svc?.whatIsBody) ? svc.whatIsBody.length : 0,
});

await prisma.$disconnect();
