'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ThemeProvider } from 'next-themes'
import React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
            >
                {children}
            </ThemeProvider>
        </UserProvider>
    )
}
