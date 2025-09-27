"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QueueItem } from "../lib/types"
import { youtubeThumbUrl } from "../lib/youtube"

type Props = {
    items: QueueItem[]
    onVote: (id: string, delta: 1 | -1) => void
}

function sortQueue(items: QueueItem[]) {
    return [...items].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.submittedAt - b.submittedAt
    })
}

export function QueueList({ items, onVote }: Props) {
    const sorted = React.useMemo(() => sortQueue(items), [items])

    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="text-pretty">Up next (votes)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {sorted.length === 0 ? <p className="text-sm text-muted-foreground">No requests yet — be the first!</p> : null}

                <ul className="space-y-2">
                    {sorted.map((item) => (
                        <li key={item.id} className="flex items-center gap-3 rounded-lg border bg-background p-2">
                            <img
                                src={youtubeThumbUrl(item.videoId) || "/placeholder.svg"}
                                alt="Video thumbnail"
                                className="h-14 w-24 flex-none rounded object-cover"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{item.title || "YouTube video"}</p>
                                <p className="truncate font-mono text-xs text-muted-foreground">{item.videoId}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="secondary" aria-label="Upvote" onClick={() => onVote(item.id, 1)}>
                                    {"▲ "}
                                    {item.upVotes ?? Math.max(item.score, 0)}
                                </Button>
                                <Button size="sm" variant="secondary" aria-label="Downvote" onClick={() => onVote(item.id, -1)}>
                                    {"▼ "}
                                    {item.downVotes ?? Math.max(-item.score, 0)}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
