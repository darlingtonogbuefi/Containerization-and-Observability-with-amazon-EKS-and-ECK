import { TranscriptProvider } from "./TranscriptProvider";

export class TranscriptIOProvider implements TranscriptProvider {
  async getTranscript(videoId: string): Promise<{ text: string | null; source: string }> {
    try {
      const res = await fetch("https://www.youtube-transcript.io/api/transcripts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.TRANSCRIPT_IO_API_KEY}`,
        },
        body: JSON.stringify({ ids: [videoId] }),
      });

      if (!res.ok) return { text: null, source: "transcript.io" };

      const data = await res.json();
      const transcriptPieces = data?.[0]?.tracks?.[0]?.transcript;

      if (!Array.isArray(transcriptPieces)) return { text: null, source: "transcript.io" };

      const text = transcriptPieces.map((p: any) => p.text).join(" ");
      return { text, source: "transcript.io" };
    } catch (e) {
      console.error("Transcript.io error:", e);
      return { text: null, source: "transcript.io" };
    }
  }
}
