// src\components\TranscriptSearch.tsx

"use client";

import { useEffect, useState } from "react";
import { getOrCreateGuestId } from "@/utils/guestId";
import SearchBar from "./SearchBar";
import YouTubePreviewCard from "./YouTubePreviewCard";

type CachedTranscript = {
  transcript: string;
  metadata: {
    title: string;
    channel: string;
    thumbnail: string;
    views: number;
    likes?: number;
    date: string;
    url?: string;
  };
  source: string;
};

type TranscriptSearchProps = {
  userId?: string | null;
};

export default function TranscriptSearch({ userId = null }: TranscriptSearchProps) {
  const [guestId, setGuestId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<CachedTranscript["metadata"] | null>(null);

  useEffect(() => {
    if (!userId) {
      const id = getOrCreateGuestId();
      setGuestId(id);
    }
  }, [userId]);

  function getCacheKey(url: string) {
    if (userId) return `user_transcript_cache_${userId}_${url}`;
    if (guestId) return `guest_transcript_cache_${guestId}_${url}`;
    return `transcript_cache_unknown_${url}`;
  }

  async function fetchTranscript(url: string) {
    if (!userId && !guestId) {
      return;
    }

    setLoading(true);
    setError(null);
    setTranscript(null);
    setVideoTitle(null);
    setMetadata(null);
    setVideoUrl(url);

    const cacheKey = getCacheKey(url);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed: CachedTranscript = JSON.parse(cached);
        setTranscript(parsed.transcript);
        setVideoTitle(parsed.metadata?.title || null);
        setMetadata(parsed.metadata || null);
        setLoading(false);
        return;
      } catch {
        // ignore parse errors
      }
    }

    try {
      const response = await fetch("/api/transcripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, guestId, userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch transcript");
      }

      setTranscript(data.transcript);
      setVideoTitle(data.metadata?.title || null);
      setMetadata(data.metadata || null);

      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setTranscript(null);
    setError(null);
    setVideoTitle(null);
    setMetadata(null);
    setVideoUrl("");
  }

  function downloadLink(format: string) {
    return `/api/transcripts/download?url=${encodeURIComponent(
      videoUrl
    )}&format=${format}`;
  }

  return (
    <section className="bg-gray-100 rounded-xl shadow max-w-4xl mx-auto mt-6 p-6 pb-6 px-12 relative">
      <div className="mb-3 -mt-2">
        <p className="text-lg font-bold text-gray-700">YouTube Video/Playlist URL</p>
        <p className="text-xs text-gray-500">
          <span className="text-gray-400 font-semibold">E.g: </span>
          <span style={{ color: "#EF4444" }}>
            www.youtube.com/watch?v=...{" "}
            <span className="text-gray-400 font-semibold">,</span>{" "}
            www.youtu.be/...{" "}
            <span className="text-gray-400 font-semibold">or</span>{" "}
            www.youtube.com/watch?v=a12b3clist=...
          </span>
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-[700px] max-w-full mx-auto mt-6">
          <SearchBar onSubmit={fetchTranscript} onClear={handleClear} />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
      )}

      {loading && (
        <div className="text-center my-8">
          <svg
            className="animate-spin mx-auto h-10 w-10 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <p className="mt-4 text-gray-600">
            Transcribing video, please wait...
          </p>
        </div>
      )}

      {transcript && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Transcript{videoTitle ? `: ${videoTitle}` : ""}
          </h2>
          <pre className="whitespace-pre-wrap p-4 rounded border max-h-96 overflow-auto">
            {transcript}
          </pre>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {["txt", "json", "srt", "vtt", "md", "csv"].map((format) => (
              <a
                key={format}
                href={downloadLink(format)}
                className="text-xs px-2 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 rounded text-center transition w-full"
                download={`transcript.${format}`}
              >
                {format.toUpperCase()}
              </a>
            ))}
          </div>
        </section>
      )}

      {metadata && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Video Preview</h2>
          <YouTubePreviewCard
            title={metadata.title}
            channel={metadata.channel}
            thumbnail={metadata.thumbnail}
            views={metadata.views}
            likes={metadata.likes}
            date={metadata.date}
            url={metadata.url || videoUrl}
          />
        </section>
      )}
    </section>
  );
}
