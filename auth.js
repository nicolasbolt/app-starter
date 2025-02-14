import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const providers = [Google]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      console.log(provider.name)
      return { id: provider.id, name: provider.name }
    }
  })
    // TODO add to this: magic links
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, signIn, signOut, auth } = NextAuth({
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