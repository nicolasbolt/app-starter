import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import OnboardingUserData from '@/components/onboarding/OnboardingUserData'

const OnboardingPage1 = async () => {
    const session = await auth()

    if (!session) {
    redirect('/signin?callbackUrl=/onboarding/1')
    }

    return (
        <>
        <OnboardingUserData session={session} />
        </>
    )
}

export default OnboardingPage1
