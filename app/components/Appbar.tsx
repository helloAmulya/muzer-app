"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export const Appbar = () => {
    const session = useSession()
    return (
        <div className='flex justify-between border-b border-2 border-lime-400'>
            <div>FANQUEUE</div>
            <div>
                {session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={() => signOut()}> Log Out</button>}
                {!session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={() => signIn()}> Sign In</button>}
            </div>
        </div>
    )
}
    