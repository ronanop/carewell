"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Redirect = { fromPath: string; toPath: string; statusCode: number };

export function RedirectsManager({ initial }: { initial: Redirect[] }) {
  const router = useRouter();
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [statusCode, setStatusCode] = useState(301);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/content/redirects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromPath, toPath, statusCode }),
    });
    setFromPath("");
    setToPath("");
    router.refresh();
  }

  async function remove(path: string) {
    await fetch("/api/admin/content/redirects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromPath: path }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="flex flex-wrap gap-3 rounded-card border border-border bg-white p-4">
        <input
          className="min-w-[140px] flex-1 rounded-button border border-border px-3 py-2 text-sm"
          placeholder="/old-path"
          value={fromPath}
          onChange={(e) => setFromPath(e.target.value)}
          required
        />
        <input
          className="min-w-[140px] flex-1 rounded-button border border-border px-3 py-2 text-sm"
          placeholder="/new-path"
          value={toPath}
          onChange={(e) => setToPath(e.target.value)}
          required
        />
        <select
          className="rounded-button border border-border px-3 py-2 text-sm"
          value={statusCode}
          onChange={(e) => setStatusCode(Number(e.target.value))}
        >
          <option value={301}>301</option>
          <option value={302}>302</option>
        </select>
        <button type="submit" className="rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white">
          Add
        </button>
      </form>
      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {initial.map((r) => (
              <tr key={r.fromPath} className="border-b border-border/50">
                <td className="px-4 py-2 font-mono text-xs">{r.fromPath}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.toPath}</td>
                <td className="px-4 py-2">{r.statusCode}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    className="text-xs text-alert hover:underline"
                    onClick={() => void remove(r.fromPath)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
