export type YtVideo = { id: string; title: string };

export async function fetchLatestVideos(): Promise<YtVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!key || !channelId) {
    return [
      { id: "dQw4w9WgXcQ", title: "Configure YOUTUBE_API_KEY + YOUTUBE_CHANNEL_ID for live list" },
    ];
  }
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${key}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const json = await res.json();
    const items = json.items as { id: { videoId: string }; snippet: { title: string } }[];
    return items.map((i) => ({ id: i.id.videoId, title: i.snippet.title }));
  } catch {
    return [];
  }
}
