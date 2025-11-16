//   src\app\api\fetch-metadata\route.ts


import "@/lib/apm"; // Elastic APM monitoring


import { NextResponse } from 'next/server';
import { getYouTubeMetadata } from '@/lib/fetchYouTubeMetadata';

type VideoInfo = {
  title: string;
  channel: string;
  thumbnail: string;
  views: number;
  likes?: number;
  date: string;
};

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid URL' }, { status: 400 });
    }

    const videoInfo = await getYouTubeMetadata(url);

    // likes are not provided by YouTube API here, so keep it optional and null
    return NextResponse.json({ ...videoInfo, likes: null });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
