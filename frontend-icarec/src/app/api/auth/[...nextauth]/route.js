import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../utils/mongodb.js"
import { updateAccount } from "../../../../../utils/apiBackend.js"

const handler = NextAuth({
  secret:"secret123",
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
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
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
          console.log("El valor de credentials: ", credentials)
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
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
    pages: {
      signIn:'/',
    },
    session: {
      strategy: "jwt",
      maxAge: 900,
    },
    callbacks: {
      async signIn({ user, account, credentials}) {
        console.log("Se hace el signIn con los siguientes datos:", user)
        console.log("Se hace el signIn con los siguientes datos 2:", account)
        console.log("Credentials en el signin: ",credentials )
       if(!user){
        return false
       }
        /* let currentUserEmail = null
        let currentAccountProvider = null
        if(user){
          currentUserEmail = user.email
        }
        if(account){
          currentAccountProvider = account.provider
        } */
        if(user && account){
          console.log("El user email: ", user.email)
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/verifyUserExistsWithoutCredentials?email=${user.email}&providerType=${account.provider}`, {
            method: 'GET',
            headers: {
              'Content-Type':'application/json'
            },
            
          })
          const data = await res.json()
          if(data.found){
            const res = await updateAccount( data.userId, false, data.isRegistered )
            if (res.status === 200) { 
              account.newAccount = false
              account.isRegistered = data.isRegistered
            }
            //Definir mejor que pasaria si la res no es true
            return true
          }

          if(!data.found){
            account.newAccount = true
            account.isRegistered = false
            return true
          } else {
            account.newAccount = data.newAccount
            account.isRegistered = data.isRegistered
            return true
          }
        }
      },
       async jwt({ token, account, user, trigger, session }) {
        if(trigger === 'update'){
          return {...token, ...session.user}
        }
        if (account) {
          token.providerType = account.provider
          token.newAccount = account.newAccount
          token.isRegistered = account.isRegistered      
          if (account.type === 'credentials') {
            if(user && user?._id){
              token.userId = user._id
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/generateAccessAndRefreshTokens/${user._id}`, {
                method: 'POST',
                headers: {
                  'Content-Type':'application/json'
                },
              })
              const data = await res.json()
              token.userToken = data.token
            }
          }else {
            if(token?.sub){
              token.userId = token.sub
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/generateToken/${token.sub}`, {
                method: 'POST',
                headers: {
                  'Content-Type':'application/json'
                },
              })
              const data = await res.json()
              token.userToken = data.token
            }
          }  
        }

        return token
      }, 
      async session({ session, token, user }) {
        session.user.providerType = token.providerType 
        session.user.newAccount = token.newAccount 
        session.user.isRegistered = token.isRegistered
        session.user.token = token.userToken
        session.user.userId = token.userId
        
        return session
      },
    },
})

export { handler as GET, handler as POST}
