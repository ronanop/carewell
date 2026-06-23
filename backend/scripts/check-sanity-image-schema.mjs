import { createClient } from "@sanity/client";
import { loadEnvFiles } from "./lib/load-env.mjs";
import { repoRoot } from "./lib/repo-root.mjs";

loadEnvFiles(repoRoot(import.meta.url));
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const svc = await client.fetch(
  `*[_type=="service" && legacyPath=="/hair-transplant-in-delhi/beard"][0]{
    "imgInBody": count(whatIsBody[_type=="image"]),
    "sampleTypes": whatIsBody[0...5]._type
  }`,
);
console.log("Service:", svc);

const blog = await client.fetch(
  `*[_type=="blogPost" && legacyPath=="/hair-transplant-techniques-comparison"][0]{
    _id,
    "imgInBody": count(body[_type=="image"]),
    "sampleTypes": body[0...8]._type
  }`,
);
console.log("Blog:", blog);

const testBody = [
  ...(await client.fetch(`*[_id==$id][0].body`, { id: blog._id })),
  {
    _type: "image",
    _key: "testimg1",
    asset: { _type: "reference", _ref: "image-441aed7fa44fc9555573584dcfb72ebc01b76c91-1024x857-webp" },
    alt: "test image patch",
  },
];

const patched = await client.patch(blog._id).set({ body: testBody }).commit();
const verify = await client.fetch(`*[_id==$id][0]{ "imgCount": count(body[_type=="image"]) }`, {
  id: blog._id,
});
console.log("After patch imgCount:", verify?.imgCount);

// revert - remove test image
const revertedBody = testBody.filter((b) => b._key !== "testimg1");
await client.patch(blog._id).set({ body: revertedBody }).commit();
console.log("Reverted test patch");
