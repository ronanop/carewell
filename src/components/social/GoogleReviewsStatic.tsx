import { readReviewsSnapshot } from "@/lib/reviews";

export async function GoogleReviewsStatic() {
  const snap = await readReviewsSnapshot();
  return (
    <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
      <p className="font-heading text-lg font-bold text-navy">Google reviews</p>
      <p className="mt-2 text-3xl font-bold text-primary">{snap.rating}★</p>
      <p className="text-sm text-navy/70">{snap.reviewCount} reviews (static snapshot at build)</p>
      <ul className="mt-4 space-y-3 text-sm text-navy/85">
        {snap.reviews.slice(0, 3).map((r) => (
          <li key={r.id}>&ldquo;{r.text}&rdquo; — {r.author}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-navy/50">
        Set <code className="rounded bg-surface px-1">GOOGLE_PLACES_JSON</code> or Places API fetch in{" "}
        <code className="rounded bg-surface px-1">src/lib/reviews.ts</code> for live data.
      </p>
    </div>
  );
}
