import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const items = [
    {
      title: "Live voting",
      desc: "Let chat decide the next track with instant, low-latency polls.",
      img: "/live-voting-ui.jpg",
    },
    {
      title: "Requests & queue",
      desc: "Collect song requests, auto-build a queue, and spotlight fan picks.",
      img: "/song-requests-queue.jpg",
    },
    {
      title: "Safe & in control",
      desc: "Block explicit tracks, set caps, and approve before playback.",
      img: "/moderation-controls.jpg",
    },
    {
      title: "Overlay ready",
      desc: "Drop in a clean overlay for OBS, Streamlabs, or Browser Source.",
      img: "/obs-overlay.jpg",
    },
  ]

  return (
    <section id="features" aria-labelledby="features-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 id="features-title" className="text-pretty text-2xl font-semibold md:text-3xl">
          Built for streams, powered by fans
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Everything you need to turn your audience into collaborators—without losing control of your sound.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <Card key={f.title} className="h-full">
              <CardHeader className="space-y-3">
                <img
                  src={f.img || "/placeholder.svg"}
                  alt={f.title}
                  className="aspect-video w-full rounded-md border border-border object-cover"
                />
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
