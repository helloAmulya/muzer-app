"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QueueItem } from "../lib/types"
import { youtubeEmbedUrl } from "../lib/youtube"

type Props = {
  current: QueueItem | null
  onStartTop: () => void
  onSkip: () => void
}

export function CurrentPlayer({ current, onStartTop, onSkip }: Props) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-pretty">Now Playing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
          {current ? (
            <iframe
              title="Now playing"
              src={youtubeEmbedUrl(current.videoId)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">No video playing</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        {!current ? (
          <Button onClick={onStartTop}>Start top song</Button>
        ) : (
          <Button variant="secondary" onClick={onSkip}>
            Skip to next
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
