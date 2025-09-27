"use client"

import useSWR from "swr"

const fetcher = async (key: string) => {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : null
}

export function useLocalSWR<T>(key: string, initial: T) {
  const { data, mutate, isLoading } = useSWR<T>(key, fetcher, {
    fallbackData: initial,
  })

  // Always present a non-null value to consumers
  const value = (data ?? initial) as T

  const set = (nextOrUpdater: T | ((prev: T) => T)) => {
    const current = value // coalesced non-null
    const next = typeof nextOrUpdater === "function" ? (nextOrUpdater as (prev: T) => T)(current) : nextOrUpdater
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(next))
    }
    mutate(next, false)
  }

  return { data: value, set, mutate, isLoading }
}
