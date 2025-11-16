"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function TryForFreeHandler() {
  const searchParams = useSearchParams();
  const tryForFree = searchParams.get("tryForFree");

  useEffect(() => {
    if (tryForFree === "1") {
      const input = document.getElementById("search-input");
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          (input as HTMLInputElement).focus();
        }, 500);
      }
    }
  }, [tryForFree]);

  return null;
}
