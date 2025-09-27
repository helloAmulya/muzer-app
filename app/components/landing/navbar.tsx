"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { signIn, signOut, useSession } from "next-auth/react"

export function Navbar() {
  const session = useSession()

  const [open, setOpen] = useState(false)
  return (
    <header className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-mono text-sm tracking-widest">
          FANQUEUE
        </Link>

        <nav className={cn("hidden items-center gap-6 md:flex")}>
          <Link href="#features" className="text-sm hover:text-primary">
            Features
          </Link>
          <Link href="#how" className="text-sm hover:text-primary">
            How it works
          </Link>
          <Link href="#press" className="text-sm hover:text-primary">
            Press
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div>
            {session.data?.user && <button className='m-2 p-2 text-sm underline-offset-4 hover:underline' onClick={() => signOut()}> Log Out</button>}
            {!session.data?.user && <button className='m-2 p-2 text-sm underline-offset-4 hover:underline' onClick={() => signIn()}> Sign In</button>}
          </div>
          <Button asChild>
            <Link href="#cta">Start as creator</Link>
          </Button>
        </div>

        <button
          className="md:hidden rounded-md border border-border px-3 py-2 text-sm"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            <Link href="#features" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="#how" onClick={() => setOpen(false)}>
              How it works
            </Link>
            <Link href="#press" onClick={() => setOpen(false)}>
              Press
            </Link>
            <div className="flex gap-2 pt-2">
              <div>
                {session.data?.user && <button className='m-2 p-2 text-sm underline-offset-4 hover:underline' onClick={() => signOut()}> Log Out</button>}
                {!session.data?.user && <button className='m-2 p-2 text-sm underline-offset-4 hover:underline' onClick={() => signIn()}> Sign In</button>}
              </div>
              <Button asChild className="w-full">
                <Link href="#cta">Start as creator</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
