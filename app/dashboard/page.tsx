"use client"

import * as React from "react"
import { SubmitForm } from "../components/submit-form"
import { QueueList } from "../components/queue-list"
import { CurrentPlayer } from "../components/current-player"
import { useLocalSWR } from "@/hooks/use-local-swr"
import type { QueueItem } from "../lib/types"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/components/ui/use-tost"
import { toast } from "sonner"
import { useEffect } from "react"
import axios from "axios"

const QUEUE_KEY = "fanqueue:queue"
const CURRENT_KEY = "fanqueue:current"

const REFRESH_INTERVAL_MS = 10 * 1000;

// async function refreshStreams() {
//     const res = await axios.get(`/api/streams/my`, {
//         withCredentials: true
//     })
//     console.log(res)
// }


function sortQueue(items: QueueItem[]) {
    return [...items].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.submittedAt - b.submittedAt
    })
}

function normalize(item: QueueItem): QueueItem & { upVotes: number; downVotes: number } {
    return {
        ...item,
        upVotes: item.upVotes ?? Math.max(item.score, 0),
        downVotes: item.downVotes ?? Math.max(-item.score, 0),
    }
}


export default function Page() {
    const { data: queue, set: setQueue } = useLocalSWR<QueueItem[]>(QUEUE_KEY, [])
    const { data: current, set: setCurrent } = useLocalSWR<QueueItem | null>(CURRENT_KEY, null)
    // const { toast } = useToast()

    const sortedQueue = React.useMemo(() => sortQueue(queue ?? []), [queue])

    async function refreshStreams() {
        const res = await fetch(`/api/streams/my`, {
            credentials: "include"
        })
        console.log(res)
    }

    useEffect(() => {
        refreshStreams();
        const interval = setInterval(() => {
        }, REFRESH_INTERVAL_MS);
    }, [])

    function addToQueue(item: QueueItem) {
        setQueue((prev) => {
            const exists = prev.find((x) => x.videoId === item.videoId)
            if (exists) {
                const n = normalize(exists)
                return sortQueue(
                    prev.map((x) => (x.id === exists.id ? { ...n, score: n.score + 1, upVotes: n.upVotes + 1 } : x)),
                )
            }
            const seeded = normalize({ ...item })
            return sortQueue([...prev, { ...seeded }])
        })
    }

    function vote(id: string, isUpvote: boolean) {
        setQueue(queue.map(video => video.id === id ? { ...video, upvotes: isUpvote ? video.upVotes + 1 : video.upvotes } : video).sort((a, b) => (b.upvotes) - (a.upvotes)))
    }

    // function vote(id: string, delta: 1 | -1) {
    //     setQueue((prev) =>
    //         sortQueue(
    //             prev.map((x) => {
    //                 if (x.id !== id) return x
    //                 const n = normalize(x)
    //                 return {
    //                     ...n,
    //                     score: n.score + delta,
    //                     upVotes: n.upVotes + (delta === 1 ? 1 : 0),
    //                     downVotes: n.downVotes + (delta === -1 ? 1 : 0),
    //                 }
    //             }),
    //         ),
    //     )
    // }

    function startTop() {
        if (sortedQueue.length === 0) return
        const next = sortedQueue[0]
        setCurrent(next)
        setQueue((prev) => prev.filter((x) => x.id !== next.id))
    }

    function skipToNext() {
        setCurrent(null)
        setTimeout(startTop, 0)
    }

    function isDuplicate(videoId: string) {
        return queue.some((x) => x.videoId === videoId) || current?.videoId === videoId
    }

    // async function sharePage() {
    //     const url = window.location.href
    //     try {
    //         if (navigator.share) {
    //             await navigator.share({ title: document.title || "FanQueue", url })
    //             return
    //         }
    //         await navigator.clipboard.writeText(url)
    //         toast({ description: "Link copied to clipboard" })
    //     } catch {
    //         try {
    //             await navigator.clipboard.writeText(url)
    //             toast({ description: "Link copied to clipboard" })
    //         } catch {
    //             toast({ variant: "destructive", description: "Unable to share or copy link." })
    //         }
    //     }
    // }
    async function sharePage() {
        const url = window.location.href
        try {
            if (navigator.share) {
                await navigator.share({ title: document.title || "FanQueue", url })
                return
            }
            await navigator.clipboard.writeText(url)
            toast("Link copied to clipboard ")
        } catch {
            try {
                await navigator.clipboard.writeText(url)
                toast("Link copied to clipboard ")
            } catch {
                toast.error("Unable to share or copy link.")
            }
        }
    }

    return (
        <main className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
            <header className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                    FanQueue — Creator Dashbfoard
                </h1>
                <div className="md:ml-auto">
                    <Button onClick={sharePage}>Share</Button>
                </div>
            </header>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <CurrentPlayer current={current} onStartTop={startTop} onSkip={skipToNext} />
                    <QueueList items={queue} onVote={vote} />
                </div>

                <div className="md:col-span-1 space-y-6">
                    <SubmitForm onAdd={addToQueue} isDuplicate={isDuplicate} />
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                        • Links are stored locally in your browser for demo purposes.
                        <br />• Duplicate submissions count as an upvote.
                    </div>
                </div>
            </section>
        </main>
    )
}
