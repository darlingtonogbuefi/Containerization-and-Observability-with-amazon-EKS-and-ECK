// src/app/api/transcripts/download/route.ts

import "@/lib/apm"; // Elastic APM monitoring

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sanitizeHtml from "sanitize-html";
import { extractVideoId } from "@/lib/transcript/extractVideoId";

// Create Supabase client inside the request handler (server-only)
function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }
  if (!process.env.SUPABASE_SERVICE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_KEY environment variable");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

export async function GET(req: Request) {
  const supabase = getSupabaseClient();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const rawUrl = searchParams.get("url");
  const format = searchParams.get("format") || "txt";

  const allowedFormats = ["txt", "json", "srt", "vtt", "md", "csv"];
  if (!allowedFormats.includes(format)) {
    return NextResponse.json(
      { error: `Invalid format '${format}'. Allowed: ${allowedFormats.join(", ")}` },
      { status: 400 }
    );
  }

  if (!id && !rawUrl) {
    return NextResponse.json(
      { error: "Missing required parameter: id or url" },
      { status: 400 }
    );
  }

  let query;
  if (id) {
    query = supabase
      .from("transcripts")
      .select("transcript_text, video_title")
      .eq("id", id)
      .maybeSingle();
  } else {
    let videoId;
    try {
      videoId = extractVideoId(decodeURIComponent(rawUrl!));
    } catch {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    query = supabase
      .from("transcripts")
      .select("transcript_text, video_title")
      .eq("video_id", videoId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Transcript not found" }, { status: 404 });
  }

  const { transcript_text, video_title } = data;

  const safeTranscript = sanitizeHtml(transcript_text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const safeTitle = (video_title || "transcript")
    .replace(/[^\w\d]/g, "_")
    .slice(0, 100);

  let content = safeTranscript;
  let mime = "text/plain";

  switch (format) {
    case "json":
      content = JSON.stringify({ transcript: safeTranscript }, null, 2);
      mime = "application/json";
      break;
    case "srt":
      content = textToSRT(safeTranscript);
      mime = "application/x-subrip";
      break;
    case "vtt":
      content = textToVTT(safeTranscript);
      mime = "text/vtt";
      break;
    case "md":
      content = `## Transcript\n\n${safeTranscript}`;
      mime = "text/markdown";
      break;
    case "csv":
      content = `line\n"${safeTranscript.replace(/\n/g, '"\n"')}"`;
      mime = "text/csv";
      break;
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename="${safeTitle}.${format}"`,
    },
  });
}

function textToSRT(text: string): string {
  const lines = text.split("\n").filter(Boolean);
  return lines
    .map((line, i) => {
      const start = formatTime(i * 3);
      const end = formatTime(i * 3 + 2);
      return `${i + 1}\n${start} --> ${end}\n${line}\n`;
    })
    .join("\n");
}

function textToVTT(text: string): string {
  return "WEBVTT\n\n" + textToSRT(text);
}

function formatTime(seconds: number): string {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${hrs}:${mins}:${secs},000`;
}
