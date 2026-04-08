import { fetchLatestVideos } from "@/lib/youtube";

export async function LatestVideos() {
  const videos = await fetchLatestVideos();
  return (
    <div className="rounded-2xl border border-surface bg-white p-6">
      <p className="font-heading text-lg font-bold text-navy">Latest videos</p>
      <ul className="mt-4 space-y-3 text-sm">
        {videos.map((v) => (
          <li key={v.id}>
            <a href={`https://www.youtube.com/watch?v=${v.id}`} className="text-primary hover:underline" target="_blank" rel="noreferrer">
              {v.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
