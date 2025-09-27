export type QueueItem = {
  id: string
  url: string
  videoId: string
  title?: string
  score: number
  submittedAt: number
  upVotes?: number
  downVotes?: number
}
