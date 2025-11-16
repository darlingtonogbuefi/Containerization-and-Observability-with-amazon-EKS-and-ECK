import { TranscriptProvider } from "./TranscriptProvider";
import he from "he"; // Install with: npm install he

function cleanTranscript(rawTranscript: string, stripTimestamps = true): string {
  const decoded = he.decode(rawTranscript); // Decode HTML entities

  if (stripTimestamps) {
    return decoded
      .split("\n")
      .map((line: string) => line.replace(/^\d{2}:\d{2} -\s*/, "")) // Remove timestamps like "00:00 -"
      .join("\n")
      .trim();
  }

  return decoded.trim();
}

export class DumplingAIProvider implements TranscriptProvider {
  async getTranscript(videoId: string, url: string) {
    try {
      const response = await fetch("https://app.dumplingai.com/api/v1/get-youtube-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DUMPLINGAI_API_KEY}`,
        },
        body: JSON.stringify({ videoUrl: url }),
      });

      if (!response.ok) {
        console.warn("DumplingAI response not OK:", response.status);
        return { text: null, source: "dumplingai" };
      }

      const json = await response.json();

      if (!json.transcript) {
        return { text: null, source: "dumplingai" };
      }

      const cleanedText = cleanTranscript(json.transcript); // Clean it here
      return { text: cleanedText, source: "dumplingai" };
    } catch (err) {
      console.error("DumplingAI API error:", err);
      return { text: null, source: "dumplingai" };
    }
  }
}
