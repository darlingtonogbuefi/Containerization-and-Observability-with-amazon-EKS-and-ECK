// src/lib/transcript/saveTranscriptHandler.ts

import { saveTranscriptToSupabase } from './saveTranscriptToSupabase'
import { getOrCreateGuestId } from '../../utils/guestId'

type Metadata = {
  title: string
  channel: string
  thumbnail: string
  views: number
  date: string
}

type SaveTranscriptInput = {
  userId: string | null
  videoId: string
  url: string
  metadata: Metadata
  transcript: string
  source: string
}

export async function handleSaveTranscript({
  userId,
  videoId,
  url,
  metadata,
  transcript,
  source,
}: SaveTranscriptInput) {
  // If userId is null, get or create guestId from localStorage
  const guestId = userId ? null : getOrCreateGuestId()

  try {
    await saveTranscriptToSupabase({
      userId,
      guestId,
      videoId,
      url,
      metadata,
      transcript,
      source,
    })
  } catch (error) {
    console.error('Error saving transcript:', error)
    throw error
  }
}
