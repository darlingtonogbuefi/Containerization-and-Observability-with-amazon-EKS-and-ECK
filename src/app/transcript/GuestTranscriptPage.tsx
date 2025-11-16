//   src/app/transcript/GuestTranscriptPage.tsx

// src/app/transcript/GuestTranscriptPage.tsx

"use client";

import TranscriptSearch from "@/components/TranscriptSearch";

export default function GuestTranscriptPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome Guest, Get Your Free YouTube Transcript
      </h1>
      <TranscriptSearch />
    </div>
  );
}
