"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { btnPrimary, inputClass, selectClass } from "@/components/admin/content/AdminFormFields";

export function TeamManager({
  initial,
}: {
  initial: {
    id: string;
    email: string;
    name: string;
    role: string;
    active: boolean;
    lastLoginAt: string | null;
  }[];
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [saving, setSaving] = useState(false);

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password, role }),
    });
    setSaving(false);
    if (res.ok) {
      setEmail("");
      setName("");
      setPassword("");
      router.refresh();
    }
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch("/api/admin/team", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={addUser} className="max-w-lg space-y-3 rounded-card border border-border bg-white p-5">
        <h2 className="font-semibold text-navy">Add team member</h2>
        <input className={inputClass} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={inputClass} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className={inputClass} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select className={selectClass} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Adding…" : "Add user"}
        </button>
      </form>

      <div className="overflow-hidden rounded-card border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface/50 text-xs uppercase text-navy/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {initial.map((u) => (
              <tr key={u.id} className="border-b border-border/50">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => void toggleActive(u.id, !u.active)}
                  >
                    {u.active ? "Active" : "Disabled"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {initial.length === 0 ? (
          <p className="p-6 text-sm text-navy/60">
            No team users yet. Add editors above, or continue using env-based admin login.
          </p>
        ) : null}
      </div>
    </div>
  );
}
