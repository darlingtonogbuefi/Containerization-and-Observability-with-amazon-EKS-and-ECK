// src\app\actions.ts

// src/app/actions.ts
"use server"

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabaseServer"

// Google sign-in via ID token (server-side, CORS-proof)
export const signInWithGoogleIdToken = async (idToken: string) => {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  })

  if (error) {
    console.error("Google sign-in error:", error)
    throw new Error("Failed to sign in with Google.")
  }

  return redirect("/dashboard")
}

// Sign out (server-side)
export const signOutAction = async () => {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  return redirect("/sign-in")
}
