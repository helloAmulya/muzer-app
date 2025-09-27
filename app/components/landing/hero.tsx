import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* Invert for bold, music-forward look without changing global theme */}
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h1 id="hero-title" className="text-pretty text-4xl font-semibold tracking-tight md:text-5xl">
                Let your fans choose the music on your stream
              </h1>
              <p className="text-balance text-sm/6 text-muted-foreground md:text-base">
                FanQueue turns your audience into the DJ. Collect requests, run live voting, and pipe the winning tracks
                straight to your broadcast overlay—with moderation built in.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg">Start free</Button>
                <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-muted">
                  See it in action
                </Button>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground md:grid-cols-3">
                <li>Real-time voting</li>
                <li>OBS/Streamlabs overlay</li>
                <li>Requests & tipping</li>
              </ul>
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border">
              <img
                src="/music-stream-dashboard-preview.jpg"
                alt="Preview of FanQueue overlay with live voting"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
