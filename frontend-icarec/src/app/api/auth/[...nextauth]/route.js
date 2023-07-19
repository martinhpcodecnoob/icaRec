import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import clientPromise from "../../../../../utils/mongodb"
import { checkIfFirstLogin } from "../../../../../utils/databaseAPI"

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      accounts: "custom-accounts-collection",
      sessions: "custom-sessions-collection",
      users: "custom-users-collection",
      verificationTokens: "custom-verification-tokens-collection",
    },
    databaseName: "test",
  }),
    providers: [
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
      })
    ],
    /* callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true       
      }
    }, */
})

export { handler as GET, handler as POST}
