// lib/transcript/getTranscriptFromProviders.ts


import { TranscriptProvider } from "./providers/TranscriptProvider";
import { DumplingAIProvider } from "./providers/DumplingAIProvider";
import { TranscriptIOProvider } from "./providers/TranscriptIOProvider";
//import { AssemblyAIProvider } from "./providers/AssemblyAIProvider";

const providers: TranscriptProvider[] = [
  new TranscriptIOProvider(), // First provider to try 
  new DumplingAIProvider(),    
  //new AssemblyAIProvider(),
];

export async function getTranscriptFromProviders(videoId: string, url: string) {
  for (const provider of providers) {
    const { text, source } = await provider.getTranscript(videoId, url);
    if (text) return { text, source };
  }
  return { text: null, source: "" };
}
