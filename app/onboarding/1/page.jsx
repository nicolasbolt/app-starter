import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import OnboardingUserData from '@/components/onboarding/OnboardingUserData'

const OnboardingPage1 = async ({ searchParams }) => {
    const session = await auth()
    const priceId = await searchParams?.priceId;

    if (!session) {
    redirect('/signin?callbackUrl=/onboarding/1' + (priceId ? `?priceId=${priceId}` : ''))
    }

    return (
        <>
        <OnboardingUserData session={session} />
        </>
    )
}

export default OnboardingPage1
