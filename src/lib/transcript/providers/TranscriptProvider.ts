export interface TranscriptProvider {
  getTranscript(videoId: string, url: string): Promise<{ text: string | null; source: string }>;
}
