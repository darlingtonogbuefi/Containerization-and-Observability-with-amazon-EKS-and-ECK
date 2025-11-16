// src/app/transcript/page.tsx


"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient"; // Import the factory function
import GuestTranscriptPage from "./GuestTranscriptPage";
import AuthenticatedTranscriptPage from "./AuthenticatedTranscriptPage";
import type { User } from "@supabase/supabase-js";

export default function TranscriptPage() {
  const supabase = createClient(); // Create supabase client instance here
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user on mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return user ? (
    <AuthenticatedTranscriptPage user={user} />
  ) : (
    <GuestTranscriptPage />
  );
}
