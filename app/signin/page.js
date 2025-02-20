import { signIn, auth, providerMap } from "@/auth"
import { Button } from "@/components/ui/button"
import { providerLogoMap } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
 
export default async function SignInPage() {
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
            const email = formData.get("email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
            throw new Error("Invalid email address");
            }
          await signIn("sendgrid", formData)
      }}
      >
        <input type="hidden" name="redirectTo" value="/" />
        <div className="flex flex-col w-full">
          <input name="email" placeholder='Email' className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" />
        </div>
        {/* <div className="flex flex-col w-full mt-3">
          <input name="password" type="password" placeholder="Password" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  id="password" />
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
                await signIn(provider.id, { redirectTo: "/" })
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
