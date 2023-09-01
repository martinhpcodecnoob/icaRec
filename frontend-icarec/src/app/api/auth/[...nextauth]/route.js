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
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        //Definir propiedades al momento de crear la cuenta, una vez creada las propiedades no se modifican a no ser que entremos y modifiquemos la base de datos
        let currentUserEmail = null
        let currentAccountProvider = null
        if(user){
          currentUserEmail = user.email
        }
        if(account){
          currentAccountProvider = account.provider
        }
        //ANTES DE HACER LA PETICION VERIFICAR EL ACCOUNT POR LA PROPIEDAD DE NEWUSER HABER SI ES TRUE O FALSE, REVISAR LA BASE DE DATOS
        if(currentUserEmail !== null && currentAccountProvider !== null){
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/verifyUserExistsWithoutCredentials?email=${currentUserEmail}&providerType=${currentAccountProvider}`, {
            method: 'GET',
            headers: {
              'Content-Type':'application/json'
            },
            
          })
          const data = await res.json()
          /* if(data.newAccount ) {
            account.nuevaPropAlcrear = data.isRegistered
            account.newAccount = false
            return true
          } */
          //Podria definir un if más para que a la segunda interacion del usuario actualizar el newAccount en la db
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
          /* else {
            account.newAccount = true
            account.isRegistered = false
            return true
          } */
        }
      },
/*       async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) {
          return '/registro1'
        }
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      }, */
       async jwt({ token, account, user, trigger, session }) {
        if(trigger === 'update'){
          return {...token, ...session.user}
        }
        if (account) {
          token.providerType = account.provider
          token.newAccount = account.newAccount
          token.isRegistered = account.isRegistered
          token.userId = user.id

          console.log("token, token: ", token)        
          console.log("token, account: ", account)
          console.log("token, user: ", user)  

          if (account.type === 'credentials') {
            if(user && user?._id){
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/generateToken/${user._id}`, {
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
         /* console.log("session, session: ", session)
        console.log("session, token: ", token)   */
        return session
      },
    },
})

export { handler as GET, handler as POST}
