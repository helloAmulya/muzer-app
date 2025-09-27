import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cta-title" className="text-pretty text-2xl font-semibold md:text-3xl">
              Ready to move your stream with culture?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Spin up FanQueue in minutes. Your audience picks the soundtrack—while you stay in control.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button size="lg">Start as creator</Button>
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-muted">
              Try a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
