"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const TABS = ["All", "Hair", "Vitiligo", "Face", "Body", "Therapies", "Anti-Aging", "Hindi"] as const;

export type BlogCard = {
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  featured?: boolean;
  publishedAt?: string;
  readTimeMinutes?: number;
  author?: { name?: string };
  coverUrl?: string;
};

export function BlogExplorer({ initialPosts }: { initialPosts: BlogCard[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    return initialPosts.filter((p) => {
      const cat = (p.category ?? "").toLowerCase();
      const tabOk =
        tab === "All" ||
        (tab === "Anti-Aging" && cat === "anti-aging") ||
        cat === tab.toLowerCase();
      const qOk =
        !q ||
        (p.title ?? "").toLowerCase().includes(q.toLowerCase()) ||
        (p.excerpt ?? "").toLowerCase().includes(q.toLowerCase());
      return tabOk && qOk;
    });
  }, [initialPosts, q, tab]);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div className="mt-10">
      <input
        type="search"
        placeholder="Search articles"
        className="w-full max-w-md rounded-xl border border-surface px-4 py-2 text-sm"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              tab === t ? "bg-primary text-white" : "bg-surface text-navy"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {featured && (
        <article className="mt-10 grid gap-8 rounded-2xl border border-surface bg-white p-6 shadow-sm lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">Featured</p>
            <h2 className="font-heading mt-2 text-2xl font-bold text-navy">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="mt-3 text-navy/80">{featured.excerpt}</p>
            <p className="mt-4 text-xs text-navy/55">
              {featured.author?.name} · {featured.readTimeMinutes} min read
            </p>
          </div>
          <div className="min-h-40 rounded-xl bg-surface" aria-hidden />
        </article>
      )}

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, visible).map((p) => (
            <article key={p.slug} className="flex flex-col rounded-xl border border-surface bg-white p-4 shadow-sm">
              <span className="text-xs font-semibold uppercase text-primary">{p.category}</span>
              <h3 className="font-heading mt-2 text-lg font-bold text-navy">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-navy/75">{p.excerpt}</p>
              <p className="mt-3 text-xs text-navy/50">
                {p.author?.name} · {p.readTimeMinutes} min
              </p>
            </article>
          ))}
        </div>
        <aside className="space-y-8">
          <div className="rounded-xl border border-surface bg-surface/50 p-5">
            <p className="font-heading font-bold text-navy">Popular posts</p>
            <ul className="mt-4 space-y-3 text-sm">
              {initialPosts.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-primary hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-surface bg-white p-5">
            <p className="font-heading font-bold text-navy">Dr. Sandeep Bhasin</p>
            <p className="mt-2 text-sm text-navy/75">
              Cosmetic surgeon — focused on natural outcomes and patient education.
            </p>
            <Link href="/book-consultation" className="mt-4 inline-block text-sm font-semibold text-primary">
              Book CTA →
            </Link>
          </div>
        </aside>
      </div>

      {visible < rest.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            className="rounded-full border border-primary px-6 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
            onClick={() => setVisible((v) => v + 9)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
