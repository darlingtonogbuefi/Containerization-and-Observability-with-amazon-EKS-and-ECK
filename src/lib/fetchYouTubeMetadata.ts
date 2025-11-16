// src/lib/fetchYouTubeMetadata.ts

// src/lib/youtube/fetchYouTubeMetadata.ts

import { extractVideoId } from '@/lib/transcript/extractVideoId';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export type VideoMetadata = {
  title: string;
  channel: string;
  thumbnail: string;
  views: number;
  date: string;
};

export async function getYouTubeMetadata(url: string): Promise<VideoMetadata> {
  const videoId = extractVideoId(url);

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch video info from YouTube API');
  }

  const data = await response.json();
  const item = data.items?.[0];
  if (!item) {
    throw new Error('Video not found');
  }

  const snippet = item.snippet;
  const stats = item.statistics;

  return {
    title: snippet.title,
    channel: snippet.channelTitle,
    thumbnail: snippet.thumbnails?.high?.url || '',
    views: Number(stats.viewCount) || 0,
    date: snippet.publishedAt,
  };
}
