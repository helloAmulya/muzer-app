"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { extractYouTubeId, youtubeEmbedUrl, youtubeThumbUrl, fetchYouTubeTitle } from "../lib/youtube"
import type { QueueItem } from "../lib/types"
import { cn } from "@/lib/utils"

type Props = {
  onAdd: (item: QueueItem) => void
  isDuplicate?: (videoId: string) => boolean
}

export function SubmitForm({ onAdd, isDuplicate }: Props) {
  const [url, setUrl] = React.useState("")
  const [touched, setTouched] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const videoId = extractYouTubeId(url)
  const isValid = Boolean(videoId)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!videoId || submitting) return
    setSubmitting(true)
    let title: string | undefined = undefined
    try {
      const t = await fetchYouTubeTitle(videoId)
      if (t) title = t
    } catch {
      // ignore title failures
    }
    const item: QueueItem = {
      id: crypto.randomUUID(),
      url,
      videoId,
      title,
      score: 0,
      submittedAt: Date.now(),
      upVotes: 0,
      downVotes: 0,
    }
    onAdd(item)
    setUrl("")
    setTouched(false)
    setSubmitting(false)
  }

  const duplicate = videoId && isDuplicate?.(videoId)

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-pretty">Request a song</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-3">
        <CardContent className="space-y-3">
          <label htmlFor="yt-url" className="sr-only">
            YouTube link
          </label>
          <Input
            id="yt-url"
            placeholder="Paste a YouTube link (watch, shorts, youtu.be)…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => setTouched(true)}
            className={cn(!isValid && touched && "ring-2 ring-destructive")}
            inputMode="url"
            aria-invalid={!isValid && touched ? true : undefined}
            aria-describedby={!isValid && touched ? "yt-url-error" : undefined}
          />
          {!isValid && touched ? (
            <p id="yt-url-error" className="text-sm text-muted-foreground">
              Enter a valid YouTube URL.
            </p>
          ) : null}

          {videoId ? (
            <div className="overflow-hidden rounded-lg border bg-muted">
              {/* Preview uses privacy-enhanced embed */}
              <div className="aspect-video">
                <iframe
                  title="YouTube preview"
                  src={youtubeEmbedUrl(videoId)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-3 p-3">
                <img
                  src={youtubeThumbUrl(videoId) || "/placeholder.svg"}
                  alt="YouTube thumbnail preview"
                  className="h-10 w-16 rounded object-cover"
                />
                <div className="text-xs text-muted-foreground">
                  Video ID: <span className="font-mono">{videoId}</span>
                </div>
                {duplicate ? <span className="ml-auto text-xs text-destructive">Already in queue</span> : null}
              </div>
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={!isValid || Boolean(duplicate) || submitting}>
            {submitting ? "Adding…" : "Add to queue"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
