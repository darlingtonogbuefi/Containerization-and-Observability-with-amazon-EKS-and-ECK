"use client"

"use client";

import Link from "next/link";
import { signInWithGoogleIdToken } from "@/app/actions";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignUpPage() {
  const handleSignUpWithGoogle = async (response: any) => {
    const token = response.credential;
    try {
      await signInWithGoogleIdToken(token);
    } catch (err) {
      console.error(err);
      alert("Failed to sign up with Google.");
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Sign up</h1>
        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link href="/sign-in" style={styles.link}>
            Sign in
          </Link>
        </p>

        <GoogleAuthButton mode="signup" callback={handleSignUpWithGoogle} />

        <p style={styles.note}>
          We only use Google for authentication. Your Google data is safe and secure.
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
