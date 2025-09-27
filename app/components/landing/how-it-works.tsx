export function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Connect your music",
      desc: "Link your streaming platform and choose the sources you allow.",
    },
    {
      n: "2",
      title: "Share your link",
      desc: "Fans submit requests and vote from mobile or desktop—no app required.",
    },
    {
      n: "3",
      title: "Go live",
      desc: "Drop our browser overlay into OBS and watch the crowd drive the set.",
    },
  ]

  return (
    <section id="how" aria-labelledby="how-title" className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 id="how-title" className="text-pretty text-2xl font-semibold md:text-3xl">
          Three steps to fan-powered sets
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-lg border border-border p-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                {s.n}
              </div>
              <h3 className="text-base font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
