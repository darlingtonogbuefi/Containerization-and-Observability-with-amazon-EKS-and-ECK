// src\app\(auth)\sign-in\page.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignInWithGoogle = async (response: any) => {
    const token = response.credential;
    const { error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token,
    });

    if (error) {
      console.error("Google sign-in error:", error);
      alert("Failed to sign in with Google.");
      return;
    }

    // Redirect to dashboard immediately after sign-in
    router.push("/dashboard");
  };

  return (
    <main style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link href="/sign-up" style={styles.link}>
            Sign up
          </Link>
        </p>

        <GoogleAuthButton mode="signin" callback={handleSignInWithGoogle} />

        <p style={styles.note}>
          We only use Google for authentication. Your Google data is safe and
          secure.
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  box: {
    border: "2px solid #c8b6ff",
    borderRadius: 12,
    padding: 32,
    maxWidth: 400,
    width: "100%",
    textAlign: "center" as const,
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "bold" as const,
  },
  linkText: {
    marginBottom: 24,
    fontSize: 14,
  },
  link: {
    color: "#7c3aed",
    textDecoration: "underline",
    cursor: "pointer",
  },
  note: {
    marginTop: 24,
    fontSize: 13,
    color: "#6b7280",
  },
};
