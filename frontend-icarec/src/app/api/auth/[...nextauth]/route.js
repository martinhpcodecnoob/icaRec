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
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        /* const isAllowedToSignIn = true
        if (isAllowedToSignIn) {
          console.log("Usuario paso el signIn, habilitado para entrar")
          console.log("user:", user)
          console.log("account:", account)
          console.log("profile:", profile)
          console.log("email:", email)
          console.log("credentials:", credentials)
          //Verificar si usuario existe, si existe modificar valores segun el form
          return true
        } */

         if (account.provider === "google") {
          console.log("account:",account)
          console.log("user:",user)
          console.log("profile:",profile)
          console.log("credentials:",credentials)
          console.log("userid:",account.userId)
          const response = await checkIfFirstLogin(user.id)
          const isFirstLogin = !(response.found)
          console.log("isFirstLogin:", isFirstLogin)
        if (isFirstLogin) {
          // Devuelve la URL del componente de formulario para completar más datos
          return "/completar-primer-registro"
        } 
        return true
        
        }
        
         else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        } 

      }
    },
})

export { handler as GET, handler as POST}
