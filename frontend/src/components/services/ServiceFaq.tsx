export function ServiceFaq({ items }: { items: { question?: string; answer?: string }[] }) {
  return (
    <div className="divide-y divide-surface rounded-2xl border border-surface bg-white">
      {items.map((item, i) => (
        <details key={i} className="group px-4 py-3 md:px-6 open:bg-surface/40">
          <summary className="cursor-pointer list-none font-heading text-base font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-primary group-open:hidden">+</span>
              <span className="hidden text-primary group-open:inline">−</span>
            </span>
          </summary>
          {item.answer && <p className="mt-3 text-sm leading-relaxed text-navy/80">{item.answer}</p>}
        </details>
      ))}
    </div>
  );
}
