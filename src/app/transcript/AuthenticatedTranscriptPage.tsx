
// src/app/transcript/AuthenticatedTranscriptPage.tsx

// src/app/transcript/AuthenticatedTranscriptPage.tsx

"use client";

import type { User } from "@supabase/supabase-js";
import TranscriptSearch from "@/components/TranscriptSearch";

export default function AuthenticatedTranscriptPage({ user }: { user: User }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome {user.email}, Get Your YouTube Transcript
      </h1>

      <TranscriptSearch userId={user.id} />
    </div>
  );
}

