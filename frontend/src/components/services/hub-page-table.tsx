export function DataTable({
  headers,
  rows,
  keys,
}: {
  headers: string[];
  keys: string[];
  rows: readonly Record<string, string>[];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-surface">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-surface/80 text-navy">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-surface">
              {keys.map((k) => (
                <td key={k} className="px-4 py-3 text-navy/85">
                  {row[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl">{children}</h2>
  );
}

export function CheckList({ items, variant }: { items: readonly string[]; variant: "do" | "dont" }) {
  return (
    <ul className="mt-3 space-y-2 text-base text-navy/85">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="shrink-0 font-semibold" aria-hidden>
            {variant === "do" ? "✓" : "✗"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
