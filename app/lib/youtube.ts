export function extractYouTubeId(input: string): string | null {
  try {

    const url = input.trim()

    // Direct ID (11 chars typical) — basic guard
    if (/^[\w-]{10,12}$/.test(url)) return url

    // Common patterns
    const patterns = [
      /(?:v=|vi=)([A-Za-z0-9_-]{11})/, // youtube.com/watch?v=...
      /youtu\.be\/([A-Za-z0-9_-]{11})/, // youtu.be/ID
      /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/, // /embed/ID
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/, // /shorts/ID
    ]

    for (const re of patterns) {
      const m = url.match(re)
      if (m && m[1]) return m[1]
    }

    // Fallback: try URL parsing for v param
    const u = new URL(url)
    const v = u.searchParams.get("v")
    if (v && /^[\w-]{10,12}$/.test(v)) return v
  } catch {
    // ignore
  }
  return null
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`
}

export function youtubeThumbUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export async function fetchYouTubeTitle(videoId: string): Promise<string | null> {
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    const res = await fetch(url, { headers: { Accept: "application/json" } })
    if (!res.ok) return null
    const data = (await res.json()) as { title?: string }
    return data?.title ?? null
  } catch {
    return null
  }
}
