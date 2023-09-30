"use client"

import { SessionProvider } from "next-auth/react"
import TokenRenewal from "./TokenRenewal"
import { Suspense } from "react"

export const NextAuthProvider = ({ children }) => {
    return (
    <SessionProvider refetchOnWindowFocus={false}>
        <Suspense fallback={<></>}>
            {children}
        </Suspense>
        <TokenRenewal />
    </SessionProvider>
    )
}
  
