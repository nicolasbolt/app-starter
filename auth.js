import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Sendgrid from "next-auth/providers/sendgrid"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from '@/lib/db'

const providers = [Google({allowDangerousEmailAccountLinking: true}), Sendgrid({
  allowDangerousEmailAccountLinking: true,
  from: 'hello@fluentburst.com'
})]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "sendgrid")

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: providers,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        authorized: async ({ auth }) => {
          // Logged in users are authenticated, otherwise redirect to login page
          return !!auth
        },
      },
})