/**
 * Optional: fetch latest videos from a YouTube channel (Data API v3) for manual paste into Sanity.
 * Usage: YOUTUBE_API_KEY=... YOUTUBE_CHANNEL_ID=... node scripts/youtube-latest-example.mjs
 */
const key = process.env.YOUTUBE_API_KEY;
const channel = process.env.YOUTUBE_CHANNEL_ID;

if (!key || !channel) {
  console.log("Set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID to list latest video IDs.");
  process.exit(0);
}

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(channel)}&maxResults=5&order=date&type=video&key=${key}`;
const res = await fetch(url);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
const data = await res.json();
for (const it of data.items ?? []) {
  console.log(it.id?.videoId, "-", it.snippet?.title);
}
