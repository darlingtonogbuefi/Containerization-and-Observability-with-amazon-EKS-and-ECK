"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleAuthButtonProps {
  mode: "signin" | "signup";
  callback: (response: any) => void;
}

export default function GoogleAuthButton({ mode, callback }: GoogleAuthButtonProps) {
  const googleDivRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const scriptId = "google-identity-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = renderGoogleButton;
      document.body.appendChild(script);
    } else {
      renderGoogleButton();
    }

    function renderGoogleButton() {
      if (window.google && googleDivRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback,
          context: mode,
        });

        window.google.accounts.id.renderButton(googleDivRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: mode === "signin" ? "signin_with" : "signup_with",
          logo_alignment: "left",
        });

        setReady(true);
      }
    }
  }, [mode, callback]);

  return (
    <div
      ref={googleDivRef}
      style={{
        marginTop: 24,
        display: ready ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 240, // large pill width
        minHeight: 40, // button height
      }}
    ></div>
  );
}
