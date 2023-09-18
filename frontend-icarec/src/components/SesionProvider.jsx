"use client"
import { SessionProvider } from "next-auth/react"
import TokenRenewal from "./TokenRenewal"

export const NextAuthProvider = ({ children }) => {
    return (
    <SessionProvider refetchOnWindowFocus={false}>
        {children}
        <TokenRenewal />
    </SessionProvider>
    )
}
  
