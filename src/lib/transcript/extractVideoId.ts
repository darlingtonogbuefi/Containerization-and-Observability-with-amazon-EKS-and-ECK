// src/lib/transcript/extractVideoId.ts


export function extractVideoId(inputUrl: string): string {
  try {
    const parsed = new URL(inputUrl.trim());
    let id = "";

    if (parsed.hostname.includes("youtu.be")) {
      // Shortened URL, video ID is path without leading slash
      id = parsed.pathname.slice(1);
      // Remove any query parameters after id (e.g. uMIOcyZtl04?t=1s)
      if (id.includes("?")) id = id.split("?")[0];
    } else if (parsed.hostname.includes("youtube.com")) {
      // Standard, shorts, or embed URLs
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v") || "";
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1];
        if (id.includes("?")) id = id.split("?")[0];
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1];
        if (id.includes("?")) id = id.split("?")[0];
      }
    }

    // Validate ID length (YouTube video IDs are 11 characters)
    if (!id || id.length !== 11) {
      throw new Error("Invalid YouTube URL");
    }

    return id;
  } catch {
    throw new Error("Invalid YouTube URL");
  }
}
