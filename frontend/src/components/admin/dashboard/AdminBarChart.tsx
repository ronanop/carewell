export function AdminBarChart({
  items,
  max,
}: {
  items: { label: string; value: number }[];
  max?: number;
}) {
  const peak = max ?? Math.max(1, ...items.map((i) => i.value));

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const pct = Math.round((item.value / peak) * 100);
        return (
          <li key={item.label}>
            <div className="mb-1 flex items-center justify-between gap-2 text-sm">
              <span className="font-medium text-navy">{item.label}</span>
              <span className="tabular-nums text-text-tertiary">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-primary transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
