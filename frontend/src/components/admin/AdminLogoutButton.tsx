"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className={`inline-flex items-center rounded-button border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-60 md:border-navy/15 md:bg-surface md:text-navy md:hover:bg-primary-light ${className}`}
    >
      {loading ? "Signing out…" : "Log out"}
    </button>
  );
}
