// src/lib/transcript/saveTranscriptToSupabase.ts

import { createServerSupabaseClient } from '@/lib/supabaseServer'
import sanitizeHtml from 'sanitize-html'
import { TablesInsert } from '@/types/supabase'

type Metadata = {
  title: string
  channel: string
  thumbnail: string
  views: number
  date: string
}

type SaveTranscriptParams = {
  userId: string | null
  guestId?: string | null
  videoId: string
  url: string
  metadata: Metadata
  transcript: string
  source: string
}

export async function saveTranscriptToSupabase({
  userId,
  guestId,
  videoId,
  url,
  metadata,
  transcript,
  source,
}: SaveTranscriptParams) {
  const supabase = createServerSupabaseClient()

  const safeMetadata = {
    title: sanitizeHtml(metadata.title, { allowedTags: [], allowedAttributes: {} }),
    channel: sanitizeHtml(metadata.channel, { allowedTags: [], allowedAttributes: {} }),
    thumbnail: metadata.thumbnail,
    views: metadata.views,
    date: sanitizeHtml(metadata.date, { allowedTags: [], allowedAttributes: {} }),
  }

  const safeTranscript = sanitizeHtml(transcript, { allowedTags: [], allowedAttributes: {} })

  const baseData: TablesInsert<'transcripts'> = {
    video_id: videoId,
    video_url: url,
    video_title: safeMetadata.title,
    video_channel: safeMetadata.channel,
    video_thumbnail: safeMetadata.thumbnail,
    video_views: safeMetadata.views,
    video_date: safeMetadata.date,
    transcript_text: safeTranscript,
    transcript_source: source,
  }

  let data: TablesInsert<'transcripts'>

  if (userId) {
    data = {
      ...baseData,
      user_id: userId,
      guest_id: null,
    }
  } else {
    if (!guestId) {
      throw new Error('guestId is required when userId is null')
    }

    data = {
      ...baseData,
      guest_id: guestId,
      user_id: undefined, // to be explicit
    }
  }

  const { error } = await supabase.from('transcripts').insert([data])

  if (error) {
    throw new Error('Failed to save transcript: ' + error.message)
  }
}
