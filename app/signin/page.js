import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
import { Button } from "@/components/ui/button"
import { providerLogoMap } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
 
export default async function SignInPage({searchParams}) {
  return (
    <Card className="flex flex-col gap-2 mt-5 md:w-4/12 w-11/12 mx-auto">
        <CardHeader>
            <CardTitle className='text-3xl font-medium text-center'>Sign In</CardTitle>
            <CardDescription className='text-center'>To Continue To Your Account</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="mx-auto text-center mt-5">
        <form
        action={async (formData) => {
          "use server"
          try {
            await signIn("credentials", formData)
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
            }
            throw error
          }
        }}
      >
        <div className="flex flex-col w-full">
          <input name="email" placeholder='Email' className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" />
        </div>
        {/* <div className="flex flex-col w-full mt-3">
          <input name="password" placeholder="Password" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  id="password" />
        </div> */}
        <Button className='mt-3 w-full' type="submit">Sign in</Button>
      </form>
        </div>

        <div className="flex items-center justify-center my-5">
          <hr className='w-1/4' />
          <p className="mx-2">or</p>
          <hr className='w-1/4' />
        </div>
      
      <div className="mx-auto text-center">
        {Object.values(providerMap).map((provider) => (
            <form
            action={async () => {
                "use server"
                try {
                await signIn(provider.id, {
                    redirectTo: searchParams?.callbackUrl ?? "",
                })
                } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                }
    
                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error
                }
            }}
            >
          <Button className='w-full' variant='outline' type="submit">
            <span>{providerLogoMap[provider.id]}</span>
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
      
      </CardContent>
    </Card>
  )
}
