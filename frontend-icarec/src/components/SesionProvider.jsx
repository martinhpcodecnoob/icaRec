"use client"

import { SessionProvider } from "next-auth/react"
import TokenRenewal from "./TokenRenewal"
import { Suspense } from "react"
import LoadingScreen from "./LoadingScreen"

export const NextAuthProvider = ({ children }) => {
    return (
    <SessionProvider refetchOnWindowFocus={false}>
        <Suspense fallback={<LoadingScreen />}>
            {children}
        </Suspense>
    </SessionProvider>
    )
}
  
