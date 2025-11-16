// supabase/server.ts

import "@/lib/apm"; // Elastic APM monitoring

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export const createClient = () => {
  const cookieStore = cookies();

  const cookieHandler = {
    getAll() {
      return cookieStore.getAll().map(({ name, value }) => ({
        name,
        value,
      }));
    },
    setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
      // Next.js cookies() from next/headers is read-only.
      // Setting cookies must be done by modifying response headers in your API/route handlers.
      // This is a no-op placeholder; implement setting cookies in your response logic as needed.
      console.warn(
        "Warning: Attempted to set cookies, but Next.js cookies() is read-only here. Implement cookie setting via response headers."
      );
    },
  };

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieHandler,
    }
  );
};
