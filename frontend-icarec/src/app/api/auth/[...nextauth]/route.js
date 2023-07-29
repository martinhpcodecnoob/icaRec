import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../utils/mongodb.js"

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
      }),
      FacebookProvider({
        clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: "DeTodo",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "Introduze tu email ..." },
          password: { label: "Password", type: "password", placeholder: "Contraseña ..." }
        },
        async authorize(credentials, req) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })
          const data = await res.json()
          if (data) {
            return data.user
          } else {
            return null
          }
        }
      })
    ],
    secret: "secret123",
    session: {
      strategy: "jwt",
    }, 
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
          //if (account.provider === "google") {
          /* const tokenData = {
            providerType: account.provider,
            accessToken: credentials.accessToken,
          }
          await saveAccessTokenInDatabase(user.id, tokenData) */
        //}  
        return true
      },
       async jwt({ token, account, user }) {
        if (account) {
          token.providerType = account.provider
        }
        return token
      }, 
      async session({ session, token, user }) {
        
        session.user.providerType = token.providerType 
        
        return session
      },
    },
})

export { handler as GET, handler as POST}
