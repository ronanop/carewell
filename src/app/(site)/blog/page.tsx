import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { sanityFetch } from "@/sanity/client";
import { blogPostsListQuery } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Expert Insights by Dr. Sandeep Bhasin",
  description: "Hair, vitiligo, face, body, therapies, and anti-aging — evidence-led articles from Care Well Medical Centre.",
  alternates: { canonical: `${getSiteUrl()}/blog` },
};

export default async function BlogPage() {
  const posts =
    (await sanityFetch<
      {
        title?: string;
        slug?: string;
        category?: string;
        excerpt?: string;
        featured?: boolean;
        publishedAt?: string;
        readTimeMinutes?: number;
        author?: { name?: string };
        coverUrl?: string;
      }[]
    >(blogPostsListQuery)) ?? [];

  const demo =
    posts.length ?
      posts
    : [
        {
          title: "Hair transplant in Delhi: what to expect",
          slug: "hair-transplant-delhi-guide",
          category: "hair",
          excerpt: "Planning, recovery, and candidacy — a practical overview.",
          featured: true,
          publishedAt: new Date().toISOString(),
          readTimeMinutes: 8,
          author: { name: "Dr. Sandeep Bhasin" },
        },
      ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-medium text-primary">Blog</p>
      <h1 className="font-heading mt-2 text-4xl font-bold text-navy">Expert Insights by Dr. Sandeep Bhasin</h1>
      <Suspense fallback={<div className="mt-10 h-64 animate-pulse rounded-xl bg-surface" />}>
        <BlogExplorer initialPosts={demo} />
      </Suspense>
      <p className="mt-12 text-center text-sm text-navy/60">
        <Link href="/book-consultation" className="font-semibold text-primary">
          Book a free consultation
        </Link>
      </p>
    </div>
  );
}
