export type MediaItem = {
  id: string;
  url: string;
  filename: string;
  alt?: string | null;
  mimeType?: string | null;
  createdAt: string;
};

export const MEDIA_ACCEPT = "image/*,.gif,video/mp4,video/webm";
